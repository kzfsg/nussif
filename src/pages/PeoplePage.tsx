import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';
import PageHero from '@/components/PageHero';
import PersonCard from '@/components/PersonCard';
import TeamCapsule from '@/components/TeamCapsule';
import heroImage from '@/assets/hero-singapore.jpg';

const advisors = [
  {
    num: '01',
    name: 'Adjunct Professor James Cheng',
    role: 'Senior Advisor',
    bio: 'Previously CEO & Senior Advisor to Morgan Stanley Investment Management, and CIO at Invesco Asia.',
  },
  {
    num: '02',
    name: 'Kwan Ng',
    role: 'Senior Advisor',
    bio: 'Currently Portfolio Manager at ExodusPoint. Formerly Senior Portfolio Manager at BlueCrest Capital Management, Head of FX Trading at Barclays, and Trader at Millennium.',
  },
  {
    num: '03',
    name: 'Professor Chen Kan',
    role: 'Senior Advisor',
    bio: 'Quantitative finance veteran and academic. Formerly Executive Director on the proprietary trading desk at JP Morgan, and Portfolio Manager at Capstone Investment Advisors and WorldQuant.',
  },
];

const leadership = [
  { name: 'Sean Wong', role: 'Co-Head of Total Portfolios', email: 'sean_wong@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/sean-wong.jpg' },
  { name: 'Rave Lai', role: 'Co-Head of Total Portfolios', email: 'ravelai@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/rave-lai.jpg' },
];

const investingCapsules = [
  {
    id: 'ls-equities',
    name: 'L/S Equities',
    description:
      'Our Long/Short Equities pod pursues alpha through both long and short positions across Singapore and global equity markets. Combining fundamental analysis with thematic conviction, the team identifies mispriced securities and relative value opportunities, deploying a blend of L/S, Event-Driven, and Relative Value strategies.',
    teamPhoto: '/people/teams/ls-equities.jpg',
    imagePosition: 'center 10%',
    leadersLabel: 'Portfolio Managers',
    leaders: [
      { name: 'Qiyang Ke', role: 'Portfolio Manager, L/S Equities', email: 'ke_qiyang@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/keqiyang/', headshot: '/people/qiyang.jpeg' },
      { name: 'Wong Zhao Yang', role: 'Portfolio Manager, L/S Equities', email: 'wongzhaoyang@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/wongzhaoyang/', headshot: '/people/wong-zhao-yang.jpg' },
    ],
    analysts: [
      { name: 'Zhi Heng', email: 'fong.zhi.heng@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/fongzhiheng/' },
      { name: 'Brandon', email: 'brandonlim@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/brandonlimcy/' },
      { name: 'Yan Xiang', email: 'gian_yanxiang@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/gianyanxiang7/' },
      { name: 'Roghan', email: 'roghan.bharathkumar@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/roghan-bharathkumar/' },
      { name: 'Sunny', email: '1528238@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/s-nishant-vats/' },
      { name: 'Wesley Lim', email: 'wesleylim@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/wesleylimchzelee/' },
      { name: 'Gong Zekai', email: 'Gong@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/zekaigong/' },
      { name: 'Toh Xian Zong', email: 'e1398634@u.nus.edu' },
      { name: 'Lara', email: 'larawong@u.nus.edu' },
      { name: 'Ron', email: 'ronangjy@u.nus.edu' },
    ],
  },
  {
    id: 'global-macro-commodities',
    name: 'Global Macro & Commodities',
    description:
      'The Global Macro & Commodities division combines discretionary macro hedge fund strategies across FICC markets with deep specialisation in energy and metals. The Global Macro pod exercises conviction over fixed income, currencies, and equity index instruments. The Commodities pod deploys trading strategies grounded in both micro and macro fundamentals across energy and metals markets.',
    teamPhoto: '/people/teams/global-macro-commodities.jpg',
    imagePosition: 'center 30%',
    leadersLabel: 'Portfolio Managers',
    leaders: [
      { name: 'Li Jiayun', role: 'Portfolio Manager, Global Macro', email: 'jiayun.li@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/jiayun-li-nus/', headshot: '/people/jiayun.jpeg' },
      { name: 'Atharva Mulik', role: 'Portfolio Manager, Global Macro', email: 'atharvamulik@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/atharvamulik/', headshot: '/people/atharva.jpeg' },
      { name: 'Ian Agustines', role: 'Portfolio Manager, Commodities', email: 'ianagustines.18@gmail.com', linkedIn: 'https://www.linkedin.com/in/ian-agustines/', headshot: '/people/ian_headshot.png' },
    ],
    analysts: [
      { name: 'Davin', email: 'davinchang@u.nus.edu' },
      { name: 'Bernard', email: 'E1408760@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/bernard-kwee/' },
      { name: 'Joash', email: 'e0957928@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/joash-lim-634292223/' },
      { name: 'Gerald', email: 'ce1186154@u.nus.edu' },
      { name: 'Pu Huan', email: 'pzhu@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/zhu-puhuan-hank-a9a839299/' },
    ],
  },
  {
    id: 'systematic-strategies',
    name: 'Systematic Strategies',
    description:
      "The Systematic Strategies pod embeds quantitative and data-driven analysis into the fund's investment and portfolio decisions. The team supports the asset pods by providing a quantitative dimension to market views.",
    teamPhoto: '/people/teams/systematic-strategies.jpg',
    imagePosition: 'center 35%',
    leadersLabel: 'Head',
    leaders: [
      { name: 'Chet Wee', role: 'Head of Systematic Strategies', email: 'chetweepe@gmail.com', linkedIn: 'https://www.linkedin.com/in/cwpe/', headshot: '/people/poo-chet-wee.jpg' },
    ],
    analysts: [
      { name: 'Jun Yang', email: 'limjunyang@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/jun-yang-lim/' },
      { name: 'Qiao En', email: 'e1523469@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/qiao-enn-chew261/' },
      { name: 'Gabriel', email: 'gabrieltang@u.nus.edu' },
      { name: 'Justin Cheong', email: 'justin.cheong@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/justin-cheong-534aa51aa/' },
    ],
  },
];

const operationsCapsule = {
  id: 'operations',
  name: 'Operations',
  description:
    'The backbone of the fund — spanning risk infrastructure, external relations, and fund development to ensure robust operations, institutional-grade oversight, and long-term growth.',
  teamPhoto: '/people/teams/operations.jpg',
  imagePosition: 'center 15%',
  leadersLabel: 'Leadership',
  leaders: [
    { name: 'Senyi', role: 'Head of Risk', email: 'senyi@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/senyi.jpg' },
    { name: 'Enzo Chung', role: 'Head of Developers', email: 'enzo.chung@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/enzochung/', headshot: '/people/enzo-chung.jpg' },
    { name: 'Davin', role: 'Head of Externals', email: 'davinchang@u.nus.edu', headshot: '/people/davin.jpg' },
    { name: 'Helena', role: 'Fund Development Director', email: 'helena.tan@u.nus.edu', headshot: '/people/helena.jpg' },
  ],
  analysts: [
    { name: 'Elina (Ling Xue)', email: 'E1304487@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/elinayilingxue/' },
    { name: 'Samuel', email: 'E1357105@u.nus.edu' },
    { name: 'Daron', email: 'e1121489@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/daron-oh/' },
    { name: 'Wai Hin', email: 'wongwaihin@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/wai-hin-wong26/' },
    { name: 'Kiefer', email: 'kiefer.ong@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/kiefer-ong/' },
    { name: 'Madhu', email: 'madhu_polluru@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/madhu-polluru/' },
    { name: 'Jia Wei', email: 'jiawei.wong21@gmail.com' },
    { name: 'Jason', email: 'jian.li@u.nus.edu' },
    { name: 'Yi Han', email: 'zhangyihan@u.nus.edu' },
    { name: 'Belle', email: 'christabelle.lee@u.nus.edu', linkedIn: 'https://www.linkedin.com/in/christabellelee/' },
    { name: 'Jonathan Goh', email: 'jonathan.goh@u.nus.edu' },
    { name: 'Ariel', email: 'e1354950@u.nus.edu' },
    { name: 'Rui Wen', email: 'e1669001@u.nus.edu' },
    { name: 'Brenda', email: 'brendajchen@u.nus.edu' },
    { name: 'YiFei', email: 'chuayifei@u.nus.edu' },
  ],
};

/* Full-width image divider with true scroll parallax */
function ParallaxDivider({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section ref={ref} className="relative h-[35vh] md:h-[50vh] overflow-hidden">
      <motion.div className="absolute -inset-y-[14%] inset-x-0" style={{ y }}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-navy-deep/40" />
    </section>
  );
}

export default function PeoplePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: pageRef, offset: ['start start', 'end end'] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={pageRef}>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{ scaleX, backgroundColor: 'hsl(var(--gold))' }}
      />

      <PageHero
        image={heroImage}
        title="Our People"
        subtitle="A student-led investment fund's most important asset is the quality and passion of its people."
      />

      {/* Senior Advisors — the board, on deep navy */}
      <section className="bg-navy-deep relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 90% 10%, hsl(37 45% 62% / 0.05), transparent 55%)',
          }}
        />
        <div className="container-site relative">
          <div className="pt-24 pb-28 md:pt-32 md:pb-36">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mb-20"
            >
              <div className="w-12 h-px bg-gold mb-10" />
              <h2 className="heading-section text-primary-foreground mb-4">Senior Advisors</h2>
              <p className="font-body font-light text-primary-foreground/55 leading-[1.7] max-w-2xl" style={{ fontSize: 'var(--text-base)' }}>
                Guided by industry practitioners with decades of experience in global finance.
              </p>
            </motion.div>

            <div>
              {advisors.map((advisor, i) => (
                <motion.div
                  key={advisor.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative border-t border-white/10 last:border-b grid grid-cols-[3rem_1fr] md:grid-cols-[6rem_1.1fr_1.3fr] gap-4 md:gap-12 py-10 md:py-14 transition-colors duration-500 hover:bg-white/[0.03]"
                >
                  <span
                    className="font-display font-light leading-none"
                    style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', color: 'hsl(var(--gold) / 0.5)' }}
                  >
                    {advisor.num}
                  </span>
                  <div>
                    <h3
                      className="font-display font-medium text-primary-foreground leading-snug transition-transform duration-500 group-hover:translate-x-2"
                      style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2.1rem)' }}
                    >
                      {advisor.name}
                    </h3>
                    <p
                      className="mt-3 font-body text-[10px] tracking-[0.3em] uppercase"
                      style={{ color: 'hsl(var(--gold))' }}
                    >
                      {advisor.role}
                    </p>
                  </div>
                  <p className="col-start-2 md:col-start-3 font-body font-light text-sm text-primary-foreground/50 leading-[1.9] transition-colors duration-500 group-hover:text-primary-foreground/75 max-w-xl">
                    {advisor.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="section-padding bg-background scroll-mt-24">
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow block mb-4" style={{ color: 'hsl(var(--gold))' }}>Leadership</span>
            <h2 className="heading-section mb-4">NUSSIF Leadership Team</h2>
            <p className="body-text max-w-3xl mb-20">
              The NUSSIF Leadership Team is responsible for setting the overall strategic and long-term direction of the society, as well as fund performance and risk management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-2xl mx-auto">
            {leadership.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <PersonCard {...m} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width parallax divider */}
      <ParallaxDivider src="/people-investing.jpg" alt="Modern office workspace" />

      {/* Investing Teams */}
      <section id="investing" className="section-padding bg-background scroll-mt-24">
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20"
          >
            <div className="lg:col-span-6">
              <span className="eyebrow block mb-4" style={{ color: 'hsl(var(--gold))' }}>Investing</span>
              <h2 className="heading-section">Investing Teams</h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="body-text">
                Four specialist pods operating across global equities, macro, commodities, and systematic strategies — each pod lean, accountable, and responsible for their own returns.
              </p>
            </div>
          </motion.div>

          <div className="space-y-10">
            {investingCapsules.map((capsule, i) => (
              <motion.div
                key={capsule.id}
                id={capsule.id}
                className="scroll-mt-24"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: i * 0.08, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <TeamCapsule
                  index={String(i + 1).padStart(2, '0')}
                  name={capsule.name}
                  description={capsule.description}
                  teamPhoto={capsule.teamPhoto}
                  imagePosition={capsule.imagePosition}
                  leaders={capsule.leaders}
                  analysts={capsule.analysts}
                  leadersLabel={capsule.leadersLabel}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Operations */}
      <section id="operations" className="section-padding bg-muted/30 scroll-mt-24">
        <div className="container-site">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20"
          >
            <div className="lg:col-span-6">
              <span className="eyebrow block mb-4" style={{ color: 'hsl(var(--gold))' }}>Operations</span>
              <h2 className="heading-section">Operations</h2>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="body-text">
                The backbone of the fund — ensuring robust infrastructure, stakeholder engagement, and long-term fund development.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <TeamCapsule
              index="04"
              name={operationsCapsule.name}
              description={operationsCapsule.description}
              teamPhoto={operationsCapsule.teamPhoto}
              imagePosition={operationsCapsule.imagePosition}
              leaders={operationsCapsule.leaders}
              analysts={operationsCapsule.analysts}
              leadersLabel={operationsCapsule.leadersLabel}
            />
          </motion.div>
        </div>
      </section>

      {/* Trainee note */}
      <section className="py-20 md:py-24 bg-muted/30">
        <div className="container-site text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display italic text-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Outstanding Trainee Analysts from the Execution Track will be invited to join the Investing Teams. Trainee Analyst cohort members are not listed here pending graduation from the programme.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
