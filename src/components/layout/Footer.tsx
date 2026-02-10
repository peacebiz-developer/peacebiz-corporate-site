import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:info@peace-biz.com', label: 'Email' },
  ];

  const footerLinks = [
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/works', label: 'Works' },
    { path: '/contact', label: 'Contact' },
    { path: '/recruit', label: 'Recruit' },
  ];

  const offices = [
    {
      name: '東京本社',
      address: '東京都豊島区上池袋1-10-8 エデン上池袋ビル5F',
      phone: '03-3917-3587',
    },
    {
      name: '福岡支社',
      address: '福岡県福岡市博多区古門戸1-10 NTF博多ビル7F',
      phone: '092-233-5888',
    },
    {
      name: '仙台支社',
      address: '宮城県仙台市青葉区国分町1-4-9',
      phone: '022-722-1385',
    },
  ];

  return (
    <footer className="bg-white dark:bg-black border-t border-black/10 dark:border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6 md:px-20 max-w-[1920px]">

        {/* 1. CTA Cards (Lenz Style) */}
        {/* 1. CTA Cards (Lenz Style) - Compact Height */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 mb-32">
          <Link to="/recruit" className="group relative aspect-[21/9] md:aspect-[3/1] bg-gray-50 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 flex flex-col justify-between p-8 md:p-12 transition-all hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/0 to-brand-blue/5 group-hover:to-brand-blue/20 transition-all duration-500" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 group-hover:translate-x-2 transition-transform text-black dark:text-white">RECRUIT</h3>
              <p className="text-gray-500 font-bold tracking-widest uppercase text-sm">Join the Team</p>
            </div>
            <div className="relative z-10 self-end">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white dark:bg-black flex items-center justify-center group-hover:scale-110 transition-transform text-black dark:text-white shadow-lg">
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
          </Link>
          <Link to="/contact" className="group relative aspect-[21/9] md:aspect-[3/1] bg-gray-50 dark:bg-zinc-900 rounded-3xl overflow-hidden border border-black/5 dark:border-white/5 flex flex-col justify-between p-8 md:p-12 transition-all hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/0 to-brand-orange/5 group-hover:to-brand-orange/20 transition-all duration-500" />
            <div className="relative z-10">
              <h3 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 group-hover:translate-x-2 transition-transform text-black dark:text-white">CONTACT</h3>
              <p className="text-gray-500 font-bold tracking-widest uppercase text-sm">Get in Touch</p>
            </div>
            <div className="relative z-10 self-end">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white dark:bg-black flex items-center justify-center group-hover:scale-110 transition-transform text-black dark:text-white shadow-lg">
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        </div>

        {/* 2. Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-black/10 dark:border-white/10 pb-20">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-4 mb-8">
              {/* Logo */}
              <img src={`${process.env.PUBLIC_URL || ""}/logo.png`} alt="Peace Biz Logo" className="h-10 md:h-14 w-auto object-contain" />
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black dark:text-white">
                Peace Biz Inc.
              </h2>
            </Link>
            <address className="not-italic text-gray-500 dark:text-gray-400 space-y-2 font-medium">
              <p>Tokyo Head Office</p>
              <p>東京都豊島区上池袋1-10-8 エデン上池袋ビル5F</p>
              <p className="mt-4"><a href="tel:03-3917-3587" className="hover:text-brand-blue transition-colors">03-3917-3587</a></p>
            </address>
          </div>

          <div className="col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">Sitemap</h4>
            <ul className="space-y-4 font-bold text-lg">
              <li><Link to="/about" className="hover:text-brand-blue transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-brand-blue transition-colors">Services</Link></li>
              <li><Link to="/works" className="hover:text-brand-blue transition-colors">Works</Link></li>
              <li><Link to="/recruit" className="hover:text-brand-blue transition-colors">Recruit</Link></li>
            </ul>
          </div>
          <div className="col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">Social</h4>
            <ul className="space-y-4 font-bold text-lg">
              <li><a href="#" className="hover:text-brand-orange transition-colors">Facebook</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">X (Twitter)</a></li>
              <li><a href="#" className="hover:text-brand-orange transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>

        {/* 3. Bottom Bar */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center text-xs font-bold text-gray-400 tracking-widest uppercase">
          <p>© {currentYear} Peace Biz Inc.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-black dark:hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;