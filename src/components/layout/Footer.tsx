import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-[1] bg-white dark:bg-neutral-950 pt-20 pb-0 shadow-[0_100vh_0_100vh_white] dark:shadow-[0_100vh_0_100vh_#0a0a0a]">
      <div className="container mx-auto px-6 md:px-20 max-w-[1920px]">

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 mb-32">
          <Link
            to="/recruit"
            className="group relative md:aspect-[3/1] bg-gray-50 dark:bg-white/5 rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 flex flex-col justify-between py-5 px-6 md:p-12 transition-all hover:shadow-2xl md:ml-12 lg:ml-20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/0 to-brand-blue/5 group-hover:to-brand-blue/20 transition-all duration-500" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-5xl font-black tracking-tighter mb-2 md:mb-4 group-hover:translate-x-2 transition-transform text-black dark:text-white">
                RECRUIT
              </h3>
              <p className="text-gray-500 dark:text-gray-400 font-bold tracking-widest uppercase text-xs md:text-sm">Join the Team</p>
            </div>
            <div className="relative z-10 self-end mt-3 md:mt-0">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white dark:bg-black flex items-center justify-center group-hover:scale-110 transition-transform text-black dark:text-white shadow-lg">
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
          </Link>
          <Link
            to="/contact"
            className="group relative md:aspect-[3/1] bg-gray-50 dark:bg-white/5 rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 flex flex-col justify-between py-5 px-6 md:p-12 transition-all hover:shadow-2xl md:mr-12 lg:mr-20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/0 to-brand-orange/5 group-hover:to-brand-orange/20 transition-all duration-500" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-5xl font-black tracking-tighter mb-2 md:mb-4 group-hover:translate-x-2 transition-transform text-black dark:text-white">
                CONTACT
              </h3>
              <p className="text-gray-500 dark:text-gray-400 font-bold tracking-widest uppercase text-xs md:text-sm">Get in Touch</p>
            </div>
            <div className="relative z-10 self-end mt-3 md:mt-0">
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white dark:bg-black flex items-center justify-center group-hover:scale-110 transition-transform text-black dark:text-white shadow-lg">
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
              </div>
            </div>
          </Link>
        </div>

        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-12 max-w-6xl mx-auto">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img
                src={`${process.env.PUBLIC_URL || ''}/logo.png`}
                alt="Peace Biz Logo"
                loading="lazy"
                decoding="async"
                className="h-7 md:h-8 w-auto object-contain"
              />
              <h2 className="text-xl md:text-2xl font-black tracking-tighter text-black dark:text-white">
                Peace Biz Inc.
              </h2>
            </Link>
            <address className="not-italic text-gray-500 dark:text-gray-400 space-y-4 text-sm leading-relaxed">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Tokyo Head Office</p>
                <p>東京都豊島区上池袋1-10-8 エデン上池袋ビル5F</p>
                <p><a href="tel:03-3917-3587" className="hover:text-black dark:hover:text-white transition-colors">03-3917-3587</a></p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Sendai Branch</p>
                <p>宮城県仙台市青葉区国分町1-4-9</p>
                <p><a href="tel:022-722-1385" className="hover:text-black dark:hover:text-white transition-colors">022-722-1385</a></p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">Fukuoka Branch</p>
                <p>福岡県福岡市博多区古門戸1-10 NTF博多ビル7F</p>
                <p><a href="tel:092-263-5888" className="hover:text-black dark:hover:text-white transition-colors">092-263-5888</a></p>
              </div>
            </address>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4">Pages</h4>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">About</Link></li>
                <li><Link to="/services" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">Services</Link></li>
                <li><Link to="/works" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">Works</Link></li>
                <li><Link to="/news" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">News</Link></li>
                <li><Link to="/recruit" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">Recruit</Link></li>
                <li><Link to="/contact" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4">Services</h4>
              <ul className="space-y-3">
                <li><Link to="/services/it-solution" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">IT Solution</Link></li>
                <li><Link to="/services/eco-solution" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">Eco Solution</Link></li>
                <li><Link to="/services/office-solution" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">Office Solution</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4">Social</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://youtube.com/@peacebiz?si=8zAwqGp1JJjAx77X"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-black dark:text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                <li><Link to="/privacy" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/sitepolicy" className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors">Site Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Large Brand Text + Copyright */}
      <div className="mt-10 flex flex-col items-center overflow-hidden">
        <h1 className="text-center text-5xl md:text-7xl lg:text-[10rem] font-black bg-clip-text text-transparent bg-gradient-to-b from-gray-200 to-gray-50 dark:from-white/30 dark:to-white/5 select-none tracking-tighter leading-none">
          PEACE BIZ
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 pb-2">
          © {currentYear} Peace Biz Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
