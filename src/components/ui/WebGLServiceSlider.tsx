import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import type { ServiceSectionData } from './animated-service-sections';
import './webgl-service-slider.css';

const ACCENT_GRADIENT: Record<string, string> = {
  'text-brand-blue': 'linear-gradient(135deg, #60c8ff 0%, #0088e0 50%, #006bb6 100%)',
  'text-brand-green': 'linear-gradient(135deg, #6fffb0 0%, #00b84a 50%, #00903b 100%)',
  'text-brand-orange': 'linear-gradient(135deg, #ffd84d 0%, #ff8c30 50%, #ea5712 100%)',
};

const ACCENT_LIGHT: Record<string, string> = {
  'text-brand-blue': '#60c8ff',
  'text-brand-green': '#6fffb0',
  'text-brand-orange': '#ffd84d',
};

const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => HTML_ESCAPE_MAP[char]);

const sanitizePath = (path: string) => (path.startsWith('/') ? path : '/');

const sanitizeExternalUrl = (value?: string) => {
  if (!value) return null;
  try {
    const parsed = new URL(value);
    if (parsed.protocol === 'https:' || parsed.protocol === 'http:') {
      return parsed.href;
    }
  } catch {
    return null;
  }
  return null;
};

/* ───────────── Shaders ───────────── */

const VERT = `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;

const FRAG = `
uniform sampler2D uTex1,uTex2;
uniform float uProgress;
uniform vec2 uRes,uSize1,uSize2;
uniform float uIntensity,uSpeed,uDistortion;
uniform float uRefraction,uChromatic,uClarity,uEdgeGlow,uLiquidFlow;
varying vec2 vUv;

vec2 coverUV(vec2 uv,vec2 ts){
  vec2 s=uRes/ts;float sc=max(s.x,s.y);
  vec2 ss=ts*sc,off=(uRes-ss)*.5;
  return(uv*uRes-off)/ss;
}

vec4 glassEffect(vec2 uv,float p){
  float t=p*5.*uSpeed;
  vec2 uv1=coverUV(uv,uSize1),uv2=coverUV(uv,uSize2);
  float maxR=length(uRes)*.85,br=p*maxR;
  vec2 pt=uv*uRes,c=uRes*.5;
  float d=length(pt-c),nd=d/max(br,.001);
  float mask=smoothstep(br+3.,br-3.,d);
  vec4 img;
  if(mask>0.){
    float ro=.08*uRefraction*uDistortion*uIntensity*pow(smoothstep(.3*uClarity,1.,nd),1.5);
    vec2 dir=(d>0.)?(pt-c)/d:vec2(0.);
    vec2 dUV=uv2-dir*ro;
    dUV+=vec2(sin(t+nd*10.),cos(t*.8+nd*8.))*.015*uLiquidFlow*uSpeed*nd*mask;
    float ca=.02*uChromatic*uIntensity*pow(smoothstep(.3,1.,nd),1.2);
    img=vec4(
      texture2D(uTex2,dUV+dir*ca*1.2).r,
      texture2D(uTex2,dUV+dir*ca*.2).g,
      texture2D(uTex2,dUV-dir*ca*.8).b,1.);
    if(uEdgeGlow>0.){
      float rim=smoothstep(.95,1.,nd)*(1.-smoothstep(1.,1.01,nd));
      img.rgb+=rim*.08*uEdgeGlow*uIntensity;
    }
  }else{img=texture2D(uTex2,uv2);}
  vec4 old=texture2D(uTex1,uv1);
  if(p>.95)img=mix(img,texture2D(uTex2,uv2),(p-.95)/.05);
  return mix(old,img,mask);
}

void main(){gl_FragColor=glassEffect(vUv,uProgress);}
`;

/* ───────────── Component ───────────── */

interface Props {
  sections: ServiceSectionData[];
}

const WebGLServiceSlider: React.FC<Props> = ({ sections }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const w = wrapperRef.current;
    if (!w || sections.length === 0) return;

    /* ── DOM refs ── */
    const canvas = w.querySelector<HTMLCanvasElement>('.wss-canvas')!;
    const titleEl = w.querySelector<HTMLElement>('#wssTitle')!;
    const descEl = w.querySelector<HTMLElement>('#wssDesc')!;
    const labelEl = w.querySelector<HTMLElement>('#wssLabel')!;
    const serviceListEl = w.querySelector<HTMLElement>('#wssServiceList')!;
    const ctaEl = w.querySelector<HTMLElement>('#wssCta')!;
    const navEl = w.querySelector<HTMLElement>('#wssNav')!;
    const numEl = w.querySelector<HTMLElement>('#wssNum')!;
    const totEl = w.querySelector<HTMLElement>('#wssTot')!;
    if (!canvas) return;

    /* ── Config ── */
    const TRANSITION_DUR = 2.5;
    const SLIDE_INTERVAL = 5000;
    const TICK = 50;

    /* ── State ── */
    let idx = 0;
    let busy = false;
    let textures: THREE.Texture[] = [];
    let ready = false;
    let enabled = false;
    let mat: THREE.ShaderMaterial;
    let ren: THREE.WebGLRenderer;
    let scn: THREE.Scene;
    let cam: THREE.OrthographicCamera;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let prog: ReturnType<typeof setInterval> | null = null;
    let disposed = false;

    /* ── Helpers ── */
    const splitChars = (text: string) =>
      text
        .split('')
        .map((c) => `<span class="wss-char">${c === ' ' ? '&nbsp;' : escapeHtml(c)}</span>`)
        .join('');

    const grad = (i: number) => ACCENT_GRADIENT[sections[i].color] ?? 'linear-gradient(135deg, #fff, #ccc)';
    const light = (i: number) => ACCENT_LIGHT[sections[i].color] ?? '#fff';
    const pad = (n: number) => String(n).padStart(2, '0');

    /* ── Navigation ── */
    const buildNav = () => {
      navEl.innerHTML = '';
      sections.forEach((s, i) => {
        const el = document.createElement('div');
        el.className = `wss-nav-item${i === 0 ? ' active' : ''}`;
        el.dataset.i = String(i);
        el.innerHTML = `<div class="wss-progress-line"><div class="wss-progress-fill"></div></div><div class="wss-nav-title">${escapeHtml(s.titleAccent)} ${escapeHtml(s.titleBase)}</div>`;
        el.addEventListener('click', (e) => {
          e.stopPropagation();
          if (!busy && i !== idx) goTo(i);
        });
        navEl.appendChild(el);
      });
    };

    const setActiveNav = (i: number) =>
      w.querySelectorAll('.wss-nav-item').forEach((el, j) => el.classList.toggle('active', j === i));

    const fillProgress = (i: number, pct: number) => {
      const fill = w.querySelectorAll('.wss-nav-item')[i]?.querySelector<HTMLElement>('.wss-progress-fill');
      if (fill) {
        fill.style.width = `${pct}%`;
        fill.style.opacity = '1';
      }
    };
    const fadeProgress = (i: number) => {
      const fill = w.querySelectorAll('.wss-nav-item')[i]?.querySelector<HTMLElement>('.wss-progress-fill');
      if (fill) {
        fill.style.opacity = '0';
        setTimeout(() => {
          fill.style.width = '0%';
        }, 300);
      }
    };
    const resetProgress = (i: number) => {
      const fill = w.querySelectorAll('.wss-nav-item')[i]?.querySelector<HTMLElement>('.wss-progress-fill');
      if (fill) {
        fill.style.transition = 'width 0.2s ease-out';
        fill.style.width = '0%';
        setTimeout(() => {
          fill.style.transition = 'width 0.1s ease, opacity 0.3s ease';
        }, 200);
      }
    };

    const updateCounter = (i: number) => {
      if (numEl) numEl.textContent = pad(i + 1);
      if (totEl) totEl.textContent = pad(sections.length);
    };

    /* ── Content Update ── */
    const setContent = (i: number, initial = false) => {
      const s = sections[i];

      const animateIn = () => {
        labelEl.textContent = pad(i + 1);
        labelEl.style.color = light(i);
        const safePath = sanitizePath(s.path);
        titleEl.innerHTML =
          `<span class="wss-title-accent" style="background-image:${grad(i)}">${escapeHtml(s.titleAccent)}</span>` +
          `<span class="wss-char">\u00A0</span>` +
          `<span class="wss-title-base">${splitChars(s.titleBase)}</span>`;
        descEl.textContent = s.desc;
        ctaEl.dataset.path = safePath;

        serviceListEl.innerHTML = `<div class="wss-service-list">${s.items
          .map((it) => {
            const externalUrl = sanitizeExternalUrl(it.url);
            const safeHoverLabel = escapeHtml(it.labelEn || it.label);
            const safeLabel = escapeHtml(it.label);
            if (externalUrl) {
              return `<a class="wss-service-item" href="${escapeHtml(externalUrl)}" target="_blank" rel="noopener noreferrer"><div class="wss-rolling-text"><div class="wss-rolling-inner"><div class="wss-rolling-line"><span class="wss-service-label">${safeLabel}</span></div><div class="wss-rolling-line"><span class="wss-service-label wss-label-hover">${safeHoverLabel}</span></div></div></div><svg class="wss-service-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>`;
            }
            return `<a class="wss-service-item" data-path="${escapeHtml(safePath)}"><div class="wss-rolling-text"><div class="wss-rolling-inner"><div class="wss-rolling-line"><span class="wss-service-label">${safeLabel}</span></div><div class="wss-rolling-line"><span class="wss-service-label wss-label-hover">${safeHoverLabel}</span></div></div></div><svg class="wss-service-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>`;
          })
          .join('')}</div>`;

        serviceListEl.querySelectorAll<HTMLElement>('.wss-service-item[data-path]').forEach((el) => {
          el.addEventListener('click', (e) => {
            e.preventDefault();
            const p = el.dataset.path;
            if (p) navigate(p);
          });
        });

        const accentEl = titleEl.querySelector('.wss-title-accent');
        const chars = titleEl.querySelectorAll('.wss-char');
        gsap.set(accentEl, { opacity: 0 });
        gsap.set(chars, { opacity: 0 });
        gsap.set(descEl, { y: 20, opacity: 0 });
        gsap.set(serviceListEl, { y: 20, opacity: 0 });
        gsap.set(ctaEl, { y: 10, opacity: 0 });

        const d = initial ? 0.5 : 0;
        switch (i % 3) {
          case 0:
            gsap.set(accentEl, { y: 20 });
            gsap.set(chars, { y: 20 });
            gsap.to(accentEl, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: d });
            gsap.to(chars, { y: 0, opacity: 1, duration: 0.8, stagger: 0.03, ease: 'power3.out', delay: d + 0.1 });
            break;
          case 1:
            gsap.set(accentEl, { filter: 'blur(8px)', scale: 1.4 });
            gsap.set(chars, { filter: 'blur(8px)', scale: 1.4 });
            gsap.to(accentEl, { filter: 'blur(0px)', scale: 1, opacity: 1, duration: 1, ease: 'power2.out', delay: d });
            gsap.to(chars, {
              filter: 'blur(0px)',
              scale: 1,
              opacity: 1,
              duration: 1,
              stagger: { amount: 0.5, from: 'random' },
              ease: 'power2.out',
              delay: d,
            });
            break;
          case 2:
            gsap.set(accentEl, { scale: 0 });
            gsap.set(chars, { scale: 0 });
            gsap.to(accentEl, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)', delay: d });
            gsap.to(chars, { scale: 1, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.5)', delay: d });
            break;
        }
        gsap.to(descEl, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: d + 0.2 });
        gsap.to(serviceListEl, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: d + 0.35 });
        gsap.to(ctaEl, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: d + 0.45 });
      };

      if (initial) {
        animateIn();
      } else {
        const exitAccent = titleEl.querySelector('.wss-title-accent');
        const allChars = titleEl.querySelectorAll('.wss-char');
        gsap.to(exitAccent, { y: -20, opacity: 0, duration: 0.4, ease: 'power2.in' });
        gsap.to(allChars, { y: -20, opacity: 0, duration: 0.4, stagger: 0.015, ease: 'power2.in' });
        gsap.to(descEl, { y: -10, opacity: 0, duration: 0.35, ease: 'power2.in' });
        gsap.to(serviceListEl, { y: -10, opacity: 0, duration: 0.3, ease: 'power2.in' });
        gsap.to(ctaEl, { y: -10, opacity: 0, duration: 0.25, ease: 'power2.in' });
        setTimeout(animateIn, 450);
      }
    };

    /* ── Timer ── */
    const stopTimer = () => {
      if (prog) clearInterval(prog);
      if (timer) clearTimeout(timer);
      prog = null;
      timer = null;
    };
    const startTimer = () => {
      if (!ready || !enabled || disposed) return;
      stopTimer();
      let pct = 0;
      const inc = (100 / SLIDE_INTERVAL) * TICK;
      prog = setInterval(() => {
        if (!enabled || disposed) {
          stopTimer();
          return;
        }
        pct += inc;
        fillProgress(idx, pct);
        if (pct >= 100) {
          if (prog) clearInterval(prog);
          prog = null;
          fadeProgress(idx);
          if (!busy) goTo((idx + 1) % sections.length);
        }
      }, TICK);
    };
    const safeStart = (delay = 0) => {
      stopTimer();
      if (enabled && ready && !disposed) {
        if (delay > 0) timer = setTimeout(startTimer, delay);
        else startTimer();
      }
    };

    /* ── Slide Transition ── */
    const goTo = (target: number) => {
      if (busy || target === idx || disposed) return;
      stopTimer();
      resetProgress(idx);

      const cur = textures[idx];
      const nxt = textures[target];
      if (!cur || !nxt) return;

      busy = true;
      mat.uniforms.uTex1.value = cur;
      mat.uniforms.uTex2.value = nxt;
      mat.uniforms.uSize1.value = cur.userData.size;
      mat.uniforms.uSize2.value = nxt.userData.size;

      setContent(target);
      idx = target;
      updateCounter(idx);
      setActiveNav(idx);

      gsap.fromTo(
        mat.uniforms.uProgress,
        { value: 0 },
        {
          value: 1,
          duration: TRANSITION_DUR,
          ease: 'power2.inOut',
          onComplete: () => {
            mat.uniforms.uProgress.value = 0;
            mat.uniforms.uTex1.value = nxt;
            mat.uniforms.uSize1.value = nxt.userData.size;
            busy = false;
            safeStart(100);
          },
        },
      );
    };

    /* ── Three.js ── */
    const loadTex = (src: string) =>
      new Promise<THREE.Texture>((res, rej) => {
        new THREE.TextureLoader().load(
          src,
          (t) => {
            t.minFilter = t.magFilter = THREE.LinearFilter;
            t.userData = { size: new THREE.Vector2(t.image.width, t.image.height) };
            res(t);
          },
          undefined,
          rej,
        );
      });

    const initGL = async () => {
      scn = new THREE.Scene();
      cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      ren = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
      ren.setSize(w.clientWidth, w.clientHeight);
      ren.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      mat = new THREE.ShaderMaterial({
        uniforms: {
          uTex1: { value: null },
          uTex2: { value: null },
          uProgress: { value: 0 },
          uRes: { value: new THREE.Vector2(w.clientWidth, w.clientHeight) },
          uSize1: { value: new THREE.Vector2(1, 1) },
          uSize2: { value: new THREE.Vector2(1, 1) },
          uIntensity: { value: 1.0 },
          uSpeed: { value: 1.0 },
          uDistortion: { value: 1.0 },
          uRefraction: { value: 1.0 },
          uChromatic: { value: 1.0 },
          uClarity: { value: 1.0 },
          uEdgeGlow: { value: 1.0 },
          uLiquidFlow: { value: 1.0 },
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
      });
      scn.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

      for (const s of sections) {
        try {
          textures.push(await loadTex(s.img));
        } catch {
          console.warn('Failed to load texture:', s.img);
        }
      }

      if (disposed) return;
      if (textures.length >= 2) {
        mat.uniforms.uTex1.value = textures[0];
        mat.uniforms.uTex2.value = textures[1];
        mat.uniforms.uSize1.value = textures[0].userData.size;
        mat.uniforms.uSize2.value = textures[1].userData.size;
        ready = true;
        enabled = true;
        w.classList.add('loaded');
        safeStart(500);
      } else if (textures.length === 1) {
        mat.uniforms.uTex1.value = textures[0];
        mat.uniforms.uTex2.value = textures[0];
        mat.uniforms.uSize1.value = textures[0].userData.size;
        mat.uniforms.uSize2.value = textures[0].userData.size;
        ready = true;
        w.classList.add('loaded');
      }

      const loop = () => {
        if (disposed) return;
        raf = requestAnimationFrame(loop);
        ren.render(scn, cam);
      };
      loop();
    };

    /* ── CTA click ── */
    const onCtaClick = (e: Event) => {
      e.preventDefault();
      const path = ctaEl.dataset.path;
      if (path) navigate(path);
    };
    ctaEl.addEventListener('click', onCtaClick);

    /* ── Resize ── */
    const onResize = () => {
      if (!ren || disposed) return;
      ren.setSize(w.clientWidth, w.clientHeight);
      mat.uniforms.uRes.value.set(w.clientWidth, w.clientHeight);
    };
    window.addEventListener('resize', onResize);

    /* ── Visibility ── */
    const onVis = () => {
      if (document.hidden) stopTimer();
      else if (!busy) safeStart();
    };
    document.addEventListener('visibilitychange', onVis);

    /* ── Init ── */
    buildNav();
    updateCounter(0);
    setContent(0, true);
    initGL();

    /* ── Cleanup ── */
    return () => {
      disposed = true;
      stopTimer();
      cancelAnimationFrame(raf);
      ctaEl.removeEventListener('click', onCtaClick);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      textures.forEach((t) => t.dispose());
      mat?.dispose();
      ren?.dispose();
    };
  }, [sections, navigate]);

  return (
    <div className="wss-sticky-container">
      <div className="wss-wrapper" ref={wrapperRef}>
        <canvas className="wss-canvas" />
        <div className="wss-overlay" />
        <div className="wss-diagonal-band" />

        <div className="wss-counter">
          <span className="wss-counter-current" id="wssNum">
            01
          </span>
          <span className="wss-counter-sep">/</span>
          <span className="wss-counter-total" id="wssTot">
            {String(0).padStart(2, '0')}
          </span>
        </div>

        <div className="wss-content">
          <div className="wss-content-left">
            <span className="wss-label" id="wssLabel" />
            {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
            <h2 className="wss-title" id="wssTitle" aria-label="Service title" />
            <p className="wss-desc" id="wssDesc" />
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="wss-cta" id="wssCta" href="#">
              <span className="wss-cta-text">View Details</span>
              <span className="wss-cta-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
          <div className="wss-content-right" id="wssServiceList" />
        </div>

        <nav className="wss-nav" id="wssNav" />

        <div className="wss-scroll-hint">
          <div className="wss-scroll-indicator">
            <div className="wss-scroll-dot" />
          </div>
          <span>Scroll</span>
        </div>
      </div>
    </div>
  );
};

export default WebGLServiceSlider;
