import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { Button, Checkbox } from "@nextui-org/react";
import { TextReveal } from '../components/ui/TextReveal';
import { MagneticButton } from '../components/ui/MagneticButton';

const Contact: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

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

  const inquiryTypes = [
    { key: 'service', label: 'サービスについて' },
    { key: 'recruit', label: '採用について' },
    { key: 'other', label: 'その他' },
  ];

  const serviceOptions = {
    it: {
      label: 'IT Solution',
      color: 'text-brand-blue',
      items: [
        { key: 'prime-sign', label: 'Prime Sign' },
        { key: 'led-signage', label: 'LEDサイネージ' },
        { key: 'security', label: 'セキュリティ' },
        { key: 'camera', label: 'カメラ' },
      ],
    },
    eco: {
      label: 'Eco Solution',
      color: 'text-brand-green',
      items: [
        { key: 'aircon', label: '業務用空調機器' },
        { key: 'new-power', label: '厨房機器' },
        { key: 'energy-saving', label: '太陽光発電システム' },
        { key: 'energy-saving', label: '新電力' }
      ],
    },
    office: {
      label: 'Office Solution',
      color: 'text-brand-orange',
      items: [
        { key: 'kitchen', label: 'オフィスサプライ' },
        { key: 'oa', label: '電話回線' },
        { key: 'furniture', label: 'インターネット回線' },
      ],
    },
  };

  const offices = [
    {
      name: '東京本社',
      location: 'TOKYO',
      address: '東京都豊島区上池袋1-10-8 エデン上池袋ビル5F',
      phone: '03-3917-3587',
    },
    {
      name: '福岡支社',
      location: 'FUKUOKA',
      address: '福岡県福岡市博多区古門戸1-10 NTF博多ビル7F',
      phone: '092-233-5888',
    },
    {
      name: '仙台支社',
      location: 'SENDAI',
      address: '宮城県仙台市青葉区国分町1-4-9',
      phone: '022-722-1385',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const showServiceOptions = formData.inquiryType === 'service';

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-6"
        >
          <div className="w-24 h-24 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-12 h-12 text-brand-green" />
          </div>
          <h2 className="text-4xl font-black mb-6 tracking-tight">THANK YOU</h2>
          <p className="text-gray-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">
            お問い合わせありがとうございます。<br />
            内容を確認の上、担当者より2営業日以内にご連絡いたします。
          </p>
          <MagneticButton>
            <Button
              className="bg-black text-white dark:bg-white dark:text-black font-bold px-10 py-6 rounded-full text-lg hover:scale-105 transition-transform"
              onClick={() => setIsSubmitted(false)}
            >
              フォームに戻る
            </Button>
          </MagneticButton>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen pt-16 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* Hero Section */}
      <section className="relative py-32 px-6 md:px-20 border-b border-black/10 dark:border-white/10 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gray-100 via-white to-white dark:from-zinc-900 dark:via-black dark:to-black" />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm md:text-base font-mono font-bold tracking-[0.2em] text-gray-400 mb-8 uppercase">
              お問い合わせ
            </h2>
            <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tighter leading-[0.8]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-500 dark:from-white dark:to-gray-500">
                GET IN
              </span>
              <span className="block text-outline-black dark:text-outline-white text-transparent" style={{ WebkitTextStroke: "1px gray" }}>
                TOUCH.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 max-w-xl leading-relaxed font-medium mt-10">
              プロジェクトのご相談、協業のご提案など、<br />
              お気軽にお問い合わせください。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content: Split Layout */}
      <section className="flex flex-col lg:flex-row min-h-screen">

        {/* Left: Sticky Info */}
        <div className="w-full lg:w-2/5 bg-gray-50 dark:bg-zinc-900 border-b lg:border-b-0 lg:border-r border-black/10 dark:border-white/10 p-8 md:p-20">
          <div className="lg:sticky lg:top-32 space-y-16">
            <div>
              <h3 className="text-3xl font-bold mb-8">オフィス</h3>
              <div className="space-y-10">
                {offices.map((office, idx) => (
                  <div key={idx} className="group">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-2 h-2 bg-brand-blue rounded-full" />
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{office.location}</span>
                    </div>
                    <h4 className="text-lg font-bold mb-2">{office.name}</h4>
                    <p className="text-gray-500 text-sm mb-3 font-medium leading-relaxed">{office.address}</p>
                    <a href={`tel:${office.phone}`} className="text-xl font-mono font-bold hover:text-brand-blue transition-colors flex items-center gap-2">
                      <Phone className="w-4 h-4" /> {office.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 bg-white dark:bg-black border border-black/5 dark:border-white/10 rounded-2xl">
              <p className="text-sm text-gray-500 leading-relaxed">
                <span className="font-bold text-black dark:text-white">お急ぎの場合</span><br />
                最寄りの支店まで直接お電話にてお問い合わせください。<br />
                <span className="text-xs mt-2 block opacity-70">平日 9:00 - 18:00 (土日祝除く)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="w-full lg:w-3/5 bg-white dark:bg-black p-8 md:p-20">
          <h2 className="text-4xl font-bold mb-16 tracking-tight">お問い合わせ</h2>

          <form onSubmit={handleSubmit} className="space-y-16 max-w-3xl">

            {/* 1. Category */}
            <div className="space-y-6">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">お問い合わせ種別 <span className="text-brand-orange">*</span></label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {inquiryTypes.map((type) => (
                  <button
                    key={type.key}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, inquiryType: type.key, services: [] });
                    }}
                    className={`relative p-4 rounded-xl border-2 text-left transition-all duration-300 group ${formData.inquiryType === type.key
                      ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                      : 'border-gray-100 text-gray-500 hover:border-gray-300 bg-transparent'
                      }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold">{type.label}</span>
                      {formData.inquiryType === type.key && <CheckCircle className="w-4 h-4" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Service Options (Dynamic) */}
            {showServiceOptions && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                className="space-y-6 overflow-hidden"
              >
                <div className="p-8 bg-gray-50 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 rounded-2xl space-y-8">
                  {Object.entries(serviceOptions).map(([key, category]) => (
                    <div key={key}>
                      <p className={`text-xs font-bold mb-4 uppercase tracking-widest ${category.color} flex items-center gap-2`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {category.label}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                        {category.items.map((item) => (
                          <label key={item.key} className="flex items-center space-x-3 cursor-pointer group p-2 -ml-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <Checkbox value={item.key} size="md" color="default" classNames={{ wrapper: "group-hover:scale-110 transition-transform" }}>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">{item.label}</span>
                            </Checkbox>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 2. User Info */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-brand-blue transition-colors">お名前<span className="text-brand-orange">*</span></label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-gray-200 py-4 text-xl font-medium focus:border-brand-blue focus:outline-none transition-colors placeholder:text-gray-200 dark:placeholder:text-gray-800"
                    placeholder="平和 太郎"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="group space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-brand-blue transition-colors">会社または店舗名</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-gray-200 py-4 text-xl font-medium focus:border-brand-blue focus:outline-none transition-colors placeholder:text-gray-200 dark:placeholder:text-gray-800"
                    placeholder="株式会社ピース・ビズ"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="group space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-brand-blue transition-colors">メールアドレス<span className="text-brand-orange">*</span></label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-gray-200 py-4 text-xl font-medium focus:border-brand-blue focus:outline-none transition-colors placeholder:text-gray-200 dark:placeholder:text-gray-800"
                    placeholder="info@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="group space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-brand-blue transition-colors">電話番号</label>
                  <input
                    type="tel"
                    className="w-full bg-transparent border-b border-gray-200 py-4 text-xl font-medium focus:border-brand-blue focus:outline-none transition-colors placeholder:text-gray-200 dark:placeholder:text-gray-800"
                    placeholder="03-1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* 3. Message */}
            <div className="group space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-brand-blue transition-colors">お問い合わせ内容<span className="text-brand-orange">*</span></label>
              <textarea
                className="w-full bg-transparent border-b border-gray-200 py-4 text-lg focus:border-brand-blue focus:outline-none transition-colors placeholder:text-gray-200 dark:placeholder:text-gray-800 min-h-[150px] resize-none"
                placeholder="ご質問・ご要望など"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            {/* Checkbox Privacy */}
            <div className="flex items-center gap-3">
              <Checkbox defaultSelected size="sm" color="default">
                <span className="text-sm text-gray-500">
                  <a href="#" className="underline hover:text-black">プライバシーポリシー</a> に同意します
                </span>
              </Checkbox>
            </div>

            {/* Submit */}
            <div className="pt-8">
              <MagneticButton>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full md:w-auto px-16 py-8 bg-black text-white dark:bg-white dark:text-black rounded-full text-xl font-bold hover:scale-105 transition-transform"
                >
                  送信<Send className="ml-4 w-5 h-5" />
                </Button>
              </MagneticButton>
            </div>

          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
