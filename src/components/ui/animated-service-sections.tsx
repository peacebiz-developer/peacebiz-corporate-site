import { useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(Observer, ScrollTrigger, SplitText);

interface ServiceItem {
  label: string;
  labelEn?: string;
  url?: string;
  path?: string;
}

export interface ServiceSectionData {
  id: string;
  titleAccent: string;
  titleBase: string;
  desc: string;
  items: ServiceItem[];
  color: string;
  dotColor: string;
  img: string;
  path: string;
}

interface AnimatedServiceSectionsProps {
  sections: ServiceSectionData[];
  className?: string;
}

const AnimatedServiceSections: React.FC<AnimatedServiceSectionsProps> = ({
  sections,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const observerInstanceRef = useRef<Observer | null>(null);
  const pinTriggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const splitHeadingsRef = useRef<SplitText[]>([]);
  const currentIndexRef = useRef<number>(0);
  const animatingRef = useRef<boolean>(false);
  const scrollPerSectionRef = useRef(0);

  const sectionsRefs = useRef<(HTMLElement | null)[]>([]);
  const imagesRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const innerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const detailsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);

  /* ─── Section transition animation ─── */

  const gotoSection = useCallback(
    (index: number, direction: number) => {
      if (!containerRef.current || animatingRef.current) return;
      if (index < 0 || index >= sections.length) return;

      animatingRef.current = true;
      const dFactor = direction === -1 ? -1 : 1;

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: 'power1.inOut' },
        onComplete: () => {
          animatingRef.current = false;
        },
      });
      timelineRef.current = tl;

      if (currentIndexRef.current >= 0 && currentIndexRef.current !== index) {
        const cs = sectionsRefs.current[currentIndexRef.current];
        const ci = imagesRefs.current[currentIndexRef.current];
        const cd = detailsRefs.current[currentIndexRef.current];
        if (cs) gsap.set(cs, { zIndex: 0 });
        if (ci) tl.to(ci, { xPercent: -15 * dFactor });
        if (cd) tl.to(cd, { opacity: 0, y: 30 * dFactor, duration: 0.5, ease: 'power2.in' }, 0);
        if (cs) tl.set(cs, { autoAlpha: 0 });
      }

      const ns = sectionsRefs.current[index];
      const ni = imagesRefs.current[index];
      const no = outerRefs.current[index];
      const nn = innerRefs.current[index];
      const nd = detailsRefs.current[index];

      if (ns) gsap.set(ns, { autoAlpha: 1, zIndex: 1 });

      if (no && nn) {
        tl.fromTo(
          [no, nn],
          { xPercent: (i: number) => (i ? -100 * dFactor : 100 * dFactor) },
          { xPercent: 0 },
          0,
        );
      }
      if (ni) tl.fromTo(ni, { xPercent: 15 * dFactor }, { xPercent: 0 }, 0);

      const split = splitHeadingsRef.current[index];
      if (split?.lines) {
        gsap.set(split.lines, { opacity: 0, yPercent: 100 });
        tl.to(
          split.lines,
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.8,
            ease: 'power2.out',
            stagger: { each: 0.1, from: 'start' },
          },
          0.4,
        );
      } else if (headingRefs.current[index]) {
        gsap.set(headingRefs.current[index]!, { opacity: 0, y: 40 });
        tl.to(headingRefs.current[index]!, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.4);
      }

      if (nd) {
        gsap.set(nd, { opacity: 0, y: 40 });
        tl.to(nd, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.6);
      }

      if (counterRef.current) {
        const counter = counterRef.current;
        tl.to(
          counter,
          {
            yPercent: -100 * dFactor,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
              counter.textContent = String(index + 1);
              gsap.set(counter, { yPercent: 100 * dFactor, opacity: 0 });
            },
          },
          0.4,
        );
        tl.to(counter, { yPercent: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.75);
      }

      currentIndexRef.current = index;
      setCurrentIndex(index);
    },
    [sections.length],
  );

  /* ─── GSAP: ScrollTrigger pin + Observer ─── */

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const headings = headingRefs.current.filter(Boolean) as HTMLHeadingElement[];
      const outers = outerRefs.current.filter(Boolean) as HTMLDivElement[];
      const inners = innerRefs.current.filter(Boolean) as HTMLDivElement[];

      try {
        splitHeadingsRef.current = headings.map(
          (h) => new SplitText(h, { type: 'lines', linesClass: 'line', mask: 'lines' }),
        );
      } catch {
        splitHeadingsRef.current = [];
      }

      gsap.set(outers, { xPercent: 100 });
      gsap.set(inners, { xPercent: -100 });

      /* Show first section */
      const fs = sectionsRefs.current[0];
      if (fs) gsap.set(fs, { autoAlpha: 1, zIndex: 1 });
      if (outerRefs.current[0]) gsap.set(outerRefs.current[0], { xPercent: 0 });
      if (innerRefs.current[0]) gsap.set(innerRefs.current[0], { xPercent: 0 });
      const s0 = splitHeadingsRef.current[0];
      if (s0?.lines) gsap.set(s0.lines, { opacity: 1, yPercent: 0 });
      if (detailsRefs.current[0]) gsap.set(detailsRefs.current[0], { opacity: 1, y: 0 });
      currentIndexRef.current = 0;
      setCurrentIndex(0);

      /* ScrollTrigger: pin this container at viewport top */
      const pinHeight = (sections.length - 1) * window.innerHeight;
      const scrollPerSection = pinHeight / Math.max(1, sections.length - 1);
      scrollPerSectionRef.current = scrollPerSection;

      pinTriggerRef.current = ScrollTrigger.create({
        trigger: container,
        pin: true,
        pinType: 'transform',
        start: 'top top',
        end: `+=${pinHeight}`,
        pinSpacing: true,
        onEnter: () => {
          window.scrollTo({ top: window.scrollY, behavior: 'auto' });
          observerInstanceRef.current?.enable();
        },
        onEnterBack: () => {
          window.scrollTo({ top: window.scrollY, behavior: 'auto' });
          observerInstanceRef.current?.enable();
        },
        onLeave: () => observerInstanceRef.current?.disable(),
        onLeaveBack: () => observerInstanceRef.current?.disable(),
      });

      /* Observer: discrete section navigation while pinned */
      observerInstanceRef.current = Observer.create({
        target: container,
        type: 'wheel,touch,pointer',
        wheelSpeed: -1,
        onDown: () => {
          if (animatingRef.current) return;
          const prev = currentIndexRef.current - 1;
          if (prev < 0) {
            observerInstanceRef.current?.disable();
            window.scrollBy({ top: -scrollPerSection, behavior: 'smooth' });
            return;
          }
          gotoSection(prev, -1);
          window.scrollBy(0, -scrollPerSection);
        },
        onUp: () => {
          if (animatingRef.current) return;
          const next = currentIndexRef.current + 1;
          if (next >= sections.length) {
            observerInstanceRef.current?.disable();
            window.scrollBy({ top: scrollPerSection, behavior: 'smooth' });
            return;
          }
          gotoSection(next, 1);
          window.scrollBy(0, scrollPerSection);
        },
        tolerance: 10,
        preventDefault: true,
      });

      observerInstanceRef.current.disable();

      return () => {
        observerInstanceRef.current?.kill();
        observerInstanceRef.current = null;
        pinTriggerRef.current?.kill();
        pinTriggerRef.current = null;
        timelineRef.current?.kill();
        timelineRef.current = null;
        splitHeadingsRef.current.forEach((sp) => {
          if (sp && typeof sp.revert === 'function') sp.revert();
        });
        splitHeadingsRef.current = [];
      };
    },
    { scope: containerRef, dependencies: [sections.length] },
  );

  /* ─── Render ─── */

  return (
    <div
      ref={containerRef}
      className={`relative h-screen w-full overflow-hidden bg-black text-white ${className}`}
    >
      {/* Bottom-right: Thumbnails + Counter */}
      <div className="absolute bottom-5 right-6 md:bottom-8 md:right-10 z-30 flex items-center gap-4">
        <div className="flex gap-1.5">
          {sections.map((section, i) => (
            <div
              key={`thumb-${i}`}
              className="w-10 h-7 md:w-12 md:h-8 rounded overflow-hidden relative cursor-pointer transition-transform duration-300 hover:scale-110"
              onClick={() => {
                if (currentIndex !== i && !animatingRef.current) {
                  const delta = (i - currentIndex) * scrollPerSectionRef.current;
                  gotoSection(i, i > currentIndex ? 1 : -1);
                  window.scrollBy(0, delta);
                }
              }}
            >
              <img
                src={section.img}
                alt=""
                width={160}
                height={112}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-black transition-opacity duration-700 ${
                  currentIndex !== i ? 'opacity-60' : 'opacity-0'
                }`}
              />
            </div>
          ))}
        </div>
        <div className="text-[10px] md:text-xs tracking-wider flex items-center gap-1 font-bold tabular-nums">
          <div className="relative overflow-hidden h-[1.2em] leading-[1.2em] min-w-[0.8em]">
            <span ref={counterRef} className="block">
              1
            </span>
          </div>
          <span className="opacity-40">/ {sections.length}</span>
        </div>
      </div>

      {/* Bottom-left: Scroll hint */}
      <div className="absolute bottom-5 left-6 md:bottom-8 md:left-10 z-30 flex items-center gap-2.5 text-white/30">
        <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-0.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
        </div>
        <span className="hidden md:block text-[10px] tracking-[0.25em] font-bold uppercase">
          Scroll
        </span>
      </div>

      {/* Sections */}
      {sections.map((section, i) => (
        <section
          key={section.id}
          className={`absolute top-0 left-0 h-full w-full ${i > 0 ? 'invisible' : ''}`}
          ref={(el) => {
            sectionsRefs.current[i] = el;
          }}
        >
          <div
            className="outer w-full h-full overflow-hidden"
            ref={(el) => {
              outerRefs.current[i] = el;
            }}
          >
            <div
              className="inner w-full h-full overflow-hidden"
              ref={(el) => {
                innerRefs.current[i] = el;
              }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                ref={(el) => {
                  imagesRefs.current[i] = el;
                }}
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.85) 100%), url("${section.img}")`,
                }}
              >
                <div className="h-full flex items-center">
                  <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-20">
                    <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 lg:gap-24">
                      {/* Left: Heading */}
                      <div className="md:w-[38%] flex-shrink-0">
                        <span
                          className={`text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase mb-3 md:mb-5 block ${section.color}`}
                        >
                          0{i + 1}
                        </span>
                        <h2
                          ref={(el) => {
                            headingRefs.current[i] = el;
                          }}
                          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]"
                        >
                          <span className={section.color}>{section.titleAccent}</span>
                          <br />
                          <span className="text-white">{section.titleBase}</span>
                        </h2>
                      </div>

                      {/* Right: Details */}
                      <div
                        className="md:flex-1"
                        ref={(el) => {
                          detailsRefs.current[i] = el;
                        }}
                      >
                        <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-6 md:mb-8 max-w-lg">
                          {section.desc}
                        </p>

                        <ul className="mb-6 md:mb-8">
                          {section.items.map((item, j) => (
                            <li key={j} className="border-b border-white/10 first:border-t">
                              {item.url ? (
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group flex items-center gap-3 md:gap-4 py-3 md:py-4 hover:pl-2 transition-all duration-300"
                                >
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${section.dotColor} flex-shrink-0 group-hover:scale-[2] transition-transform duration-300`}
                                  />
                                  <span className="text-sm md:text-lg font-semibold text-white/90 group-hover:text-white transition-colors flex-1">
                                    {item.label}
                                  </span>
                                  <ArrowRight
                                    className={`w-3.5 h-3.5 ${section.color} opacity-0 group-hover:opacity-100 -rotate-45 transition-all duration-300`}
                                  />
                                </a>
                              ) : (
                                <div className="group flex items-center gap-3 md:gap-4 py-3 md:py-4">
                                  <span
                                    className={`w-1.5 h-1.5 rounded-full ${section.dotColor} flex-shrink-0`}
                                  />
                                  <span className="text-sm md:text-lg font-semibold text-white/90">
                                    {item.label}
                                  </span>
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>

                        <Link to={section.path} className="group inline-flex items-center gap-4">
                          <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white/70 group-hover:text-white transition-colors duration-300">
                            View Details
                          </span>
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/40 transition-all duration-300">
                            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default AnimatedServiceSections;
