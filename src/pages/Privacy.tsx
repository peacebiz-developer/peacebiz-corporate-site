import React from 'react';
import { motion } from 'motion/react';

const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">

      {/* Hero */}
      <section className="relative py-32 px-6 md:px-20 border-b border-black/10 dark:border-white/10 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-gray-100 via-white to-white dark:from-zinc-900 dark:via-black dark:to-black" />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm md:text-base font-mono font-bold tracking-[0.2em] text-gray-400 mb-8 uppercase">
              プライバシーポリシー
            </h2>
            <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-[0.85]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-500 dark:from-white dark:to-gray-500">
                PRIVACY POLICY
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-4xl mx-auto space-y-16">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl leading-relaxed text-gray-600 dark:text-gray-300 font-medium">
              株式会社ピース・ビズ（以下「当社」）は、お客様の個人情報の保護を重要な経営課題として認識し、以下のとおりプライバシーポリシーを定め、個人情報の適切な取扱いと保護に努めます。
            </p>
          </motion.div>

          {/* Section 1 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">1.</span>個人情報の定義
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              本ポリシーにおいて「個人情報」とは、個人情報保護法に定義される個人情報を指し、生存する個人に関する情報であって、氏名、生年月日、住所、電話番号、メールアドレス、その他の記述等により特定の個人を識別できるものをいいます。
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">2.</span>個人情報の収集方法
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              当社は、お客様が当社サービスのお問い合わせフォーム、採用応募フォーム等をご利用いただく際に、氏名、メールアドレス、電話番号、会社名等の個人情報をお聞きすることがあります。また、お客様との取引に関連して、お客様から書面・電子メール等でご提供いただく場合があります。
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">3.</span>個人情報の利用目的
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-4">
              当社は、収集した個人情報を以下の目的で利用いたします。
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-medium">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 flex-shrink-0" />
                当社サービスの提供・運営のため
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 flex-shrink-0" />
                お客様からのお問い合わせに対応するため
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 flex-shrink-0" />
                当社サービスに関する新機能、更新情報、キャンペーン等のご案内のため
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 flex-shrink-0" />
                メンテナンス、重要なお知らせ等の連絡のため
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 flex-shrink-0" />
                採用選考・採用に関するご連絡のため
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 flex-shrink-0" />
                利用規約に違反した利用者への対応のため
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2.5 flex-shrink-0" />
                上記利用目的に付随する業務のため
              </li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">4.</span>個人情報の第三者提供
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium mb-4">
              当社は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
            </p>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300 font-medium">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2.5 flex-shrink-0" />
                法令に基づく場合
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2.5 flex-shrink-0" />
                人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難な場合
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2.5 flex-shrink-0" />
                公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難な場合
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-2.5 flex-shrink-0" />
                国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合
              </li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">5.</span>個人情報の安全管理
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              当社は、個人情報の正確性および安全性を確保するため、セキュリティに万全の対策を講じるとともに、個人情報の漏えい、滅失またはき損の防止、その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">6.</span>個人情報の開示・訂正・削除
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              お客様は、当社が保有するご本人の個人情報について、開示・訂正・追加・削除・利用停止または消去を請求することができます。ご請求があった場合、本人確認を行ったうえで、合理的な期間および範囲で対応いたします。ご請求は下記のお問い合わせ窓口までご連絡ください。
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">7.</span>Cookie（クッキー）の使用
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              当社ウェブサイトでは、サービスの利便性向上やアクセス状況の分析のためにCookieを使用する場合があります。Cookie単体では特定の個人を識別することはできませんが、他の情報と組み合わせることで個人を識別できる場合には、個人情報として本ポリシーに従い適切に取り扱います。お客様のブラウザ設定によりCookieの受け取りを拒否することが可能ですが、その場合、一部のサービスをご利用いただけない場合があります。
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">8.</span>プライバシーポリシーの変更
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除き、お客様に通知することなく変更することができるものとします。変更後のプライバシーポリシーは、当社ウェブサイトに掲載した時点から効力を生じるものとします。
            </p>
          </div>

          {/* Section 9 */}
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              <span className="text-brand-blue mr-3">9.</span>お問い合わせ窓口
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
              本ポリシーに関するお問い合わせは、下記までご連絡ください。
            </p>
            <div className="bg-gray-50 dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-2xl p-8 space-y-3 font-medium text-gray-600 dark:text-gray-300">
              <p className="font-black text-black dark:text-white text-lg">株式会社ピース・ビズ</p>
              <p>〒170-0012 東京都豊島区上池袋1-10-8 エデン上池袋ビル5F</p>
              <p>E-Mail: <a href="mailto:contact@peace-biz.com" className="text-brand-blue hover:underline transition-colors">contact@peace-biz.com</a></p>
              <p>受付時間: 平日 9:00 - 18:00（土日祝除く）</p>
            </div>
          </div>

          {/* Effective Date */}
          <div className="pt-8 border-t border-black/10 dark:border-white/10">
            <p className="text-sm text-gray-400 font-medium">
              制定日: 2020年9月15日<br />
              最終改定日: 2026年2月12日
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Privacy;
