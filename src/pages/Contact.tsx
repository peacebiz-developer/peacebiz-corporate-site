import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Send, CheckCircle, Mail, MapPin, ArrowRight } from 'lucide-react';
import { Checkbox } from "@nextui-org/react";
import { MaskTextReveal } from '../components/ui/MaskTextReveal';

const CONTACT_API_ENDPOINT = (process.env.REACT_APP_CONTACT_API_URL || '').trim();
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const WEB3FORMS_ACCESS_KEY = (process.env.REACT_APP_WEB3FORMS_ACCESS_KEY || '').trim();
const MIN_SUBMIT_DELAY_MS = 1500;
const SUBMIT_COOLDOWN_MS = 10000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeField = (value: string, maxLength: number) =>
  value.replace(/\r\n?/g, '\n').trim().slice(0, maxLength);

const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formInitializedAtRef = useRef<number>(Date.now());
  const lastSubmittedAtRef = useRef<number>(0);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    inquiryType: '',
    services: [] as string[],
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const inquiryTypes = [
    { key: 'service', label: 'サービスについて' },
    { key: 'recruit', label: '採用について' },
    { key: 'other', label: 'その他' },
  ];

  const serviceOptions = {
    it: {
      label: 'IT Solution',
      color: 'text-sky-400',
      items: [
        { key: 'prime-sign', label: 'Prime Sign' },
        { key: 'led-signage', label: 'LEDサイネージ' },
        { key: 'web-design', label: 'HP・LP制作' },
        { key: 'video', label: '動画制作' },
        { key: 'design', label: 'デザイン' },
      ],
    },
    eco: {
      label: 'Eco Solution',
      color: 'text-emerald-400',
      items: [
        { key: 'hvac', label: '業務用空調' },
        { key: 'kitchen', label: '厨房機器' },
        { key: 'solar', label: '太陽光発電' },
        { key: 'battery', label: '蓄電池' },
        { key: 'energy', label: '新電力' },
      ],
    },
    office: {
      label: 'Office Solution',
      color: 'text-orange-400',
      items: [
        { key: 'supply', label: 'オフィスサプライ' },
        { key: 'internet', label: 'ネット回線' },
        { key: 'mobile', label: 'スマホ・タブレット' },
      ],
    },
  };

  const offices = [
    {
      name: '東京本社',
      location: 'TOKYO',
      address: '東京都豊島区上池袋1-10-8 エデン上池袋ビル5F',
      phone: '03-3917-3587',
      mapUrl: 'https://maps.app.goo.gl/HP1rpAtN7AgS6Wo59',
    },
    {
      name: '福岡支社',
      location: 'FUKUOKA',
      address: '福岡県福岡市博多区古門戸1-10 NTF博多ビル7F',
      phone: '092-263-5888',
      mapUrl: 'https://maps.app.goo.gl/yos1MYmWeHzDpF2F7',
    },
    {
      name: '仙台支社',
      location: 'SENDAI',
      address: '宮城県仙台市青葉区国分町1-4-9',
      phone: '022-722-1385',
      mapUrl: 'https://maps.app.goo.gl/Bw2iD4eqb2UNQh839',
    },
  ];

  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError('');
    let timeoutId: number | undefined;

    try {
      const submissionMode = CONTACT_API_ENDPOINT
        ? 'proxy'
        : WEB3FORMS_ACCESS_KEY
          ? 'direct'
          : 'none';

      if (submissionMode === 'none') {
        setSubmitError('フォーム設定エラーが発生しています。時間をおいて再度お試しください。');
        return;
      }

      if (honeypot.trim() !== '') {
        // Silent success for bots.
        setIsSubmitted(true);
        window.scrollTo(0, 0);
        return;
      }

      const now = Date.now();
      if (now - formInitializedAtRef.current < MIN_SUBMIT_DELAY_MS) {
        setSubmitError('入力内容を確認して、もう一度送信してください。');
        return;
      }
      if (now - lastSubmittedAtRef.current < SUBMIT_COOLDOWN_MS) {
        setSubmitError('短時間での連続送信はできません。しばらくしてから再度お試しください。');
        return;
      }

      const inquiryLabel = inquiryTypes.find((t) => t.key === formData.inquiryType)?.label || '';
      const safeName = sanitizeField(formData.name, 100);
      const safeCompany = sanitizeField(formData.company, 120);
      const safeEmail = sanitizeField(formData.email, 254).toLowerCase();
      const safePhone = sanitizeField(formData.phone, 32);
      const safeMessage = sanitizeField(formData.message, 3000);

      if (!safeName || !safeEmail || !safeMessage || !inquiryLabel) {
        setSubmitError('必須項目を入力してください。');
        return;
      }
      if (!EMAIL_PATTERN.test(safeEmail)) {
        setSubmitError('メールアドレスの形式が正しくありません。');
        return;
      }

      const allowedServiceKeys = new Set(
        Object.values(serviceOptions).flatMap((category) => category.items.map((item) => item.key))
      );
      const safeServices = formData.services
        .filter((key) => allowedServiceKeys.has(key))
        .slice(0, 20);

      const controller = new AbortController();
      timeoutId = window.setTimeout(() => controller.abort(), 15000);
      lastSubmittedAtRef.current = now;
      let response: Response;

      if (submissionMode === 'proxy') {
        const payload = {
          name: safeName,
          company: safeCompany,
          email: safeEmail,
          phone: safePhone,
          inquiryType: inquiryLabel,
          services: safeServices,
          message: safeMessage,
          honeypot: '',
        };

        response = await fetch(CONTACT_API_ENDPOINT, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          credentials: 'omit',
          signal: controller.signal,
        });
      } else {
        const submitData = new FormData();
        submitData.append("access_key", WEB3FORMS_ACCESS_KEY);
        submitData.append("subject", `【Peace Biz】お問い合わせ: ${inquiryLabel}`);
        submitData.append("name", safeName);
        submitData.append("email", safeEmail);
        if (safeCompany) submitData.append("company", safeCompany);
        if (safePhone) submitData.append("phone", safePhone);
        submitData.append("inquiry_type", inquiryLabel);
        if (safeServices.length > 0) {
          submitData.append("services", safeServices.join(', '));
        }
        submitData.append("message", safeMessage);
        submitData.append("botcheck", "");

        response = await fetch(WEB3FORMS_ENDPOINT, {
          method: "POST",
          body: submitData,
          signal: controller.signal,
        });
      }

      if (!response.ok) {
        setSubmitError('送信に失敗しました。もう一度お試しください。');
        return;
      }
      const data = await response.json().catch(() => null);

      if (data?.success) {
        setIsSubmitted(true);
        window.scrollTo(0, 0);
      } else {
        setSubmitError('送信に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        setSubmitError('通信がタイムアウトしました。ネットワーク接続を確認してください。');
      } else {
        setSubmitError('通信エラーが発生しました。ネットワーク接続を確認してください。');
      }
    } finally {
      if (typeof timeoutId === 'number') {
        window.clearTimeout(timeoutId);
      }
      setIsSubmitting(false);
    }
  };

  const showServiceOptions = formData.inquiryType === 'service';

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 }
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center overflow-hidden text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center px-6"
        >
          <motion.div
            className="w-24 h-24 rounded-full bg-brand-green/20 border border-brand-green/30 flex items-center justify-center mx-auto mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-12 h-12 text-brand-green" />
          </motion.div>
          <h2 className="text-5xl font-black mb-6 tracking-tighter">THANK YOU</h2>
          <p className="text-white/60 mb-10 max-w-md mx-auto text-lg leading-relaxed">
            お問い合わせありがとうございます。<br />
            内容を確認の上、担当者より2営業日以内にご連絡いたします。
          </p>
          <motion.button
            onClick={() => {
              setIsSubmitted(false);
              setFormData({ name: '', company: '', email: '', phone: '', inquiryType: '', services: [], message: '' });
              setHoneypot('');
              formInitializedAtRef.current = Date.now();
            }}
            className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-full hover:bg-white/15 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            フォームに戻る
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen relative bg-gradient-to-b from-gray-950 via-gray-900 to-neutral-950 text-white overflow-x-hidden selection:bg-white selection:text-black">

      {/* Animated Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-brand-blue/[0.06] via-brand-green/[0.04] to-brand-orange/[0.06]"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: '400% 400%' }}
        />
        <motion.div
          className="absolute top-1/3 left-[20%] w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl"
          animate={{ x: [0, 200, 0], y: [0, 100, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-[20%] w-80 h-80 bg-brand-orange/8 rounded-full blur-3xl"
          animate={{ x: [0, -150, 0], y: [0, -80, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-40 bg-gradient-to-b from-transparent via-white/15 to-transparent"
            style={{ left: `${20 + (i * 15)}%`, top: `${25 + (i * 8)}%`, transform: `rotate(${30 + i * 20}deg)` }}
            animate={{ opacity: [0.15, 0.6, 0.15], scaleY: [1, 1.5, 1] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed w-1.5 h-1.5 bg-white/15 rounded-full pointer-events-none z-0"
          style={{ left: `${10 + (i * 12)}%`, top: `${20 + (i * 10)}%` }}
          animate={{ y: [0, -40, 0], opacity: [0.15, 0.6, 0.15], scale: [1, 1.8, 1] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
        />
      ))}

      {/* Hero Section */}
      <section id="contact-hero" className="relative z-10 pt-40 pb-16 px-6 md:px-16 lg:px-24 overflow-hidden scroll-mt-28">
        <div className="inline-flex flex-col items-start">
          <MaskTextReveal text="問い合わせ" className="text-lg md:text-xl font-bold tracking-widest text-white/50 mb-4 whitespace-nowrap" />
          <h1 className="text-[clamp(3.1rem,11vw,8rem)] font-black leading-none tracking-tighter mb-6 whitespace-nowrap">
            <MaskTextReveal text="GET IN TOUCH" delay={0.05} />
          </h1>
        </div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-16 lg:px-24">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Main Content: Split Layout */}
      <motion.section
        id="contact-form"
        className="relative z-10 flex flex-col lg:flex-row lg:items-stretch px-6 md:px-16 lg:px-24 py-16 md:py-20 gap-10 lg:gap-12 scroll-mt-28"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >

        {/* Left: Office Info — on mobile pushed below form */}
        <motion.div className="w-full lg:w-[38%] order-2 lg:order-1" variants={fadeInUp}>
          <div className="lg:sticky lg:top-32">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-black tracking-tight mb-1">オフィス</h3>
              <p className="text-white/40 text-sm">お近くの拠点までお気軽にどうぞ。</p>
            </div>

            <div className="space-y-4">
              {offices.map((office, idx) => (
                <motion.div
                  key={idx}
                  className="p-5 bg-white/[0.05] backdrop-blur-sm rounded-2xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all group"
                  variants={fadeInUp}
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-brand-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{office.location}</span>
                      <h4 className="text-base font-bold text-white mt-0.5 mb-1.5">{office.name}</h4>
                      <a
                        href={office.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/50 text-sm mb-2 leading-relaxed hover:text-brand-blue transition-colors block"
                      >
                        {office.address}
                      </a>
                      <a href={`tel:${office.phone}`} className="inline-flex items-center gap-2 text-white text-sm font-bold hover:text-brand-blue transition-colors">
                        <Phone className="w-3.5 h-3.5" /> {office.phone}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Common Email */}
              <motion.a
                href="mailto:contact@peace-biz.com"
                className="block p-5 bg-white/[0.05] backdrop-blur-sm rounded-2xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all group"
                variants={fadeInUp}
                whileHover={{ y: -3 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-brand-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">COMMON</span>
                    <h4 className="text-base font-bold text-white mt-0.5 mb-1.5">共通メール窓口</h4>
                    <p className="text-white/50 text-sm leading-relaxed mb-2">お問い合わせはこちらまで</p>
                    <span className="text-white text-sm font-bold break-all group-hover:text-brand-blue transition-colors">contact@peace-biz.com</span>
                  </div>
                </div>
              </motion.a>
            </div>

            {/* Urgent Info */}
            <motion.div
              className="p-5 bg-brand-blue/15 border border-brand-blue/25 backdrop-blur-sm rounded-2xl mt-4"
              variants={fadeInUp}
            >
              <h4 className="text-sm font-bold text-white mb-1.5">お急ぎの場合</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                最寄りの支店まで直接お電話にてお問い合わせください。
              </p>
              <span className="text-white/35 text-xs mt-2 block">平日10:00 - 18:00（土日祝除く）</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Form — on mobile comes first */}
        <motion.div className="w-full lg:w-[62%] order-1 lg:order-2" variants={fadeInUp}>
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-black tracking-tight mb-1">お問い合わせフォーム</h2>
            <p className="text-white/40 text-sm">内容をご記入の上、送信してください。</p>
          </div>

          {/* Form Card */}
          <div className="p-6 md:p-10 bg-white/[0.04] backdrop-blur-sm rounded-3xl border border-white/[0.08]">
            <form onSubmit={handleSubmit} className="space-y-10">
              <input
                type="text"
                name="company_website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
              />

              {/* Inquiry Type */}
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40">お問い合わせ種別 <span className="text-brand-orange">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {inquiryTypes.map((type) => (
                    <motion.button
                      key={type.key}
                      type="button"
                      onClick={() => setFormData({ ...formData, inquiryType: type.key, services: [] })}
                      className={`relative p-4 rounded-xl border text-left transition-all duration-300 ${
                        formData.inquiryType === type.key
                          ? 'border-brand-blue bg-brand-blue/20 text-white'
                          : 'border-white/[0.1] text-white/50 hover:border-white/25 bg-white/[0.03]'
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">{type.label}</span>
                        {formData.inquiryType === type.key && <CheckCircle className="w-4 h-4 text-brand-blue" />}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Service Options */}
              <AnimatePresence>
                {showServiceOptions && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl space-y-6">
                      {Object.entries(serviceOptions).map(([key, category]) => (
                        <div key={key}>
                          <p className={`text-xs font-bold mb-3 uppercase tracking-widest ${category.color} flex items-center gap-2`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            {category.label}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                            {category.items.map((item) => (
                              <label key={item.key} className="flex items-center space-x-3 cursor-pointer group p-2 -ml-2 rounded-lg hover:bg-white/[0.05] transition-colors">
                                <Checkbox
                                  value={item.key}
                                  size="sm"
                                  color="default"
                                  isSelected={formData.services.includes(item.key)}
                                  onValueChange={(checked) => {
                                    setFormData(prev => ({
                                      ...prev,
                                      services: checked
                                        ? [...prev.services, item.key]
                                        : prev.services.filter(s => s !== item.key)
                                    }));
                                  }}
                                  classNames={{ wrapper: "group-hover:scale-110 transition-transform" }}
                                >
                                  <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">{item.label}</span>
                                </Checkbox>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* User Info */}
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 group-focus-within:text-brand-blue transition-colors">お名前<span className="text-brand-orange">*</span></label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-white/15 py-3 text-base font-medium text-white focus:border-brand-blue focus:outline-none transition-colors placeholder:text-white/25"
                      placeholder="平和 太郎"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      maxLength={100}
                      required
                    />
                  </div>
                  <div className="group space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 group-focus-within:text-brand-blue transition-colors">会社または店舗名</label>
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-white/15 py-3 text-base font-medium text-white focus:border-brand-blue focus:outline-none transition-colors placeholder:text-white/25"
                      placeholder="株式会社ピース・ビズ"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      maxLength={120}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="group space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 group-focus-within:text-brand-blue transition-colors">メールアドレス<span className="text-brand-orange">*</span></label>
                    <input
                      type="email"
                      className="w-full bg-transparent border-b border-white/15 py-3 text-base font-medium text-white focus:border-brand-blue focus:outline-none transition-colors placeholder:text-white/25"
                      placeholder="info@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      maxLength={254}
                      required
                    />
                  </div>
                  <div className="group space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/40 group-focus-within:text-brand-blue transition-colors">電話番号</label>
                    <input
                      type="tel"
                      className="w-full bg-transparent border-b border-white/15 py-3 text-base font-medium text-white focus:border-brand-blue focus:outline-none transition-colors placeholder:text-white/25"
                      placeholder="03-1234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      maxLength={32}
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="group space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 group-focus-within:text-brand-blue transition-colors">お問い合わせ内容<span className="text-brand-orange">*</span></label>
                <textarea
                  className="w-full bg-transparent border-b border-white/15 py-3 text-base text-white focus:border-brand-blue focus:outline-none transition-colors placeholder:text-white/25 min-h-[150px] resize-none"
                  placeholder="ご質問・ご要望など"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  maxLength={3000}
                  required
                />
              </div>

              {/* Privacy */}
              <div className="flex justify-center">
                <Checkbox size="sm" color="default">
                  <span className="text-sm text-white/50">
                    <a href="https://www.peace-biz.com/privacy" className="underline decoration-white/20 underline-offset-4 hover:text-white transition-colors">プライバシーポリシー</a> に同意します
                  </span>
                </Checkbox>
              </div>

              {/* Submit */}
              <div className="pt-4">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative group overflow-hidden bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-5 px-6 rounded-full transition-all disabled:opacity-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                  <span className="relative flex items-center justify-center gap-3 text-lg">
                    {isSubmitting ? (
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        送信する
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </motion.button>
                {submitError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-red-400 font-medium text-sm text-center"
                  >
                    {submitError}
                  </motion.p>
                )}
              </div>

            </form>
          </div>
        </motion.div>
      </motion.section>

      {/* Smooth transition to footer */}
      <div className="relative z-10 h-40 bg-gradient-to-b from-transparent to-neutral-950 pointer-events-none" />
    </div>
  );
};

export default Contact;
