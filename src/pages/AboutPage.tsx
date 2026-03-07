import { Link } from 'react-router-dom';
import HeroSection from '@/components/HeroSection';
import VideoModal from '@/components/VideoModal';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCountUp } from '@/hooks/useCountUp';
import heroImage from '@/assets/hero-singapore.jpg';

const stats = [
  { value: 35, suffix: '+', label: 'MEMBERS' },
  { value: 25, suffix: '+', label: 'ANALYSTS' },
  { value: 64, suffix: '', label: 'YEARS OF COMBINED ADVISOR EXPERIENCE' },
];

const values = [
  { num: '01', title: 'Debate', desc: 'We want to hear everyone\'s viewpoints, and we privilege the rigour of contestation of ideas.' },
  { num: '02', title: 'Evolve', desc: 'We believe strongly in anchoring to long-term macro rules, yet are always reminded to interrogate our own intersubjectivity and seek new norms.' },
  { num: '03', title: 'Efficiency', desc: 'We operate in lean and dynamic teams, focusing on agility within comprehensive frameworks to motivate active decision-making.' },
  { num: '04', title: 'Ownership', desc: 'Each pod is lean and takes responsibility for their own returns, keeping every member — down to the analysts — highly involved and committed.' },
];

const achievements = [
  { name: 'UBS Pan Asia Finance Challenge', result: 'Champions' },
  { name: 'Point72 Oxford University Equity Research Competition', result: 'Champions' },
  { name: 'Point72 NTU Stock Pitch Competition', result: 'Champion' },
  { name: 'CFA Research Challenge (Singapore)', result: 'Champions' },
  { name: 'Temasek-NUS Stock Pitch Competition', result: 'Champion' },
  { name: 'JPMorgan Asia Asset & Wealth Management Challenge (Singapore)', result: 'Champions' },
];

const partners = ['Citadel', 'Citadel Securities', 'S&P Global', 'Point72', 'polygon.io', 'Millennium'];

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="flex flex-col items-center text-center px-6 py-8">
      <span className="font-display font-light text-foreground text-6xl md:text-7xl lg:text-[96px] leading-none">
        {count}{suffix}
      </span>
      <span className="eyebrow mt-4">{label}</span>
    </div>
  );
}

export default function AboutPage() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      {/* Hero */}
      <HeroSection
        image={heroImage}
        title="NUSSIF"
        subtitle="A buy-side structured multi-strategy investment organisation."
        fullHeight
      >
        <div className="flex items-center justify-center gap-8 mt-10">
          <Link to="/program" className="gold-link">→ Our Program</Link>
          <Link to="/people" className="gold-link">→ Our People</Link>
        </div>
      </HeroSection>

      {/* Stats */}
      <section className="bg-card border-b border-border">
        <div className="container-site flex flex-col md:flex-row items-center justify-center divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((s) => (
            <StatCounter key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Video */}
      <VideoModal vimeoId="1171285504" thumbnailUrl="https://i.vimeocdn.com/video/2130738176-ba696526f900a41a6a9305fe38df112d76e67f15047bd3e1941bbbaba103f600-d_640?region=us" />

      {/* Who We Are */}
      <section className="section-padding bg-background">
        <div className="container-site grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          <div className="lg:col-span-2 fade-up">
            <p className="font-display italic text-foreground text-2xl md:text-3xl lg:text-4xl leading-snug">
              "Forging the next generation of NUS and Finance in Asia."
            </p>
          </div>
          <div className="lg:col-span-3 space-y-10 fade-up" style={{ transitionDelay: '0.1s' }}>
            {[
              { title: 'Background', text: 'NUSSIF was founded to bring real, professional investment opportunities to NUS students passionate about careers in buy-side asset management and hedge funds.' },
              { title: 'Our Purpose', text: 'Drawing inspiration from leading global practices and internship experiences across hedge funds and trading desks, we are determined to build a platform for active professional growth — through the management of live capital, industry connections, and genuine member ownership.' },
              { title: 'Our Vision', text: 'To become an institution where our members are bold, future-ready leaders in industry and government, building a network of illustrious alumni who actively give back to the NUS community.' },
            ].map((block) => (
              <div key={block.title} className="border-l-2 border-primary pl-6">
                <h3 className="font-display font-medium text-foreground text-lg mb-2">{block.title}</h3>
                <p className="body-text">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Org Structure */}
      <section className="section-padding bg-muted/50">
        <div className="container-site">
          <h2 className="heading-section mb-3 fade-up">Organisational Structure</h2>
          <p className="body-text max-w-2xl mb-16 fade-up" style={{ transitionDelay: '0.1s' }}>
            A simple and powerful model, focused on complementary teams specialising in specific asset classes.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 fade-up" style={{ transitionDelay: '0.2s' }}>
            {/* Investing Teams */}
            <div>
              <p className="eyebrow mb-6">Investing Teams</p>
              <div className="flex flex-col items-center">
                <div className="bg-primary text-primary-foreground px-6 py-3 font-display text-sm tracking-wide">
                  NUSSIF Leadership
                </div>
                <div className="w-[1px] h-8 bg-border" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['L/S Equities', 'Global Macro', 'Commodities', 'Systematic Strategies'].map((pod) => (
                    <div key={pod} className="border border-primary text-foreground px-4 py-3 text-center font-body text-xs tracking-wide">
                      {pod}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Operations Teams */}
            <div>
              <p className="eyebrow mb-6">Operations Teams</p>
              <div className="flex flex-col items-center">
                <div className="bg-primary text-primary-foreground px-6 py-3 font-display text-sm tracking-wide">
                  NUSSIF Leadership
                </div>
                <div className="w-[1px] h-8 bg-border" />
                <div className="grid grid-cols-3 gap-3">
                  {['Risk & Infrastructure', 'Externals', 'Fund Development'].map((pod) => (
                    <div key={pod} className="border border-primary text-foreground px-4 py-3 text-center font-body text-xs tracking-wide">
                      {pod}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <h2 className="heading-section mb-3 fade-up">Our Culture</h2>
          <p className="body-text max-w-2xl mb-16 fade-up" style={{ transitionDelay: '0.1s' }}>
            We push boundaries through diverse perspectives and bold ambition — driving learning, leadership, and growth unique to NUS.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={v.num} className="card-value fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <span className="eyebrow text-gold">{v.num}</span>
                <h3 className="font-display font-medium text-foreground text-xl mt-3 mb-4">{v.title}</h3>
                <p className="body-text text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section-padding bg-primary">
        <div className="container-site">
          <h2 className="font-display font-medium text-primary-foreground text-3xl md:text-4xl lg:text-[48px] leading-tight mb-16 fade-up">
            Recognised on a Regional & Global Stage
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((a, i) => (
              <div key={i} className="border border-primary-foreground/10 p-8 fade-up" style={{ transitionDelay: `${i * 0.08}s` }}>
                <p className="font-display italic text-primary-foreground text-lg md:text-xl mb-3">{a.name}</p>
                <p className="eyebrow text-primary-foreground/50">{a.result}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <h2 className="heading-section mb-3 fade-up">Senior Advisors</h2>
          <p className="body-text max-w-2xl mb-16 fade-up" style={{ transitionDelay: '0.1s' }}>
            Guided by industry practitioners with a combined 64+ years of experience in global finance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 fade-up" style={{ transitionDelay: '0.2s' }}>
            <div className="flex gap-6 items-start">
              <div className="w-32 h-32 rounded-full bg-muted flex-shrink-0 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="text-muted-foreground/40">
                  <circle cx="24" cy="18" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M6 44c0-9.94 8.06-18 18-18s18 8.06 18 18" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <div>
                <h3 className="font-display font-medium text-foreground text-xl">Adjunct Professor James Cheng</h3>
                <p className="eyebrow mt-1">Senior Advisor</p>
                <p className="body-text mt-3 text-sm">Previously CEO & Senior Advisor to Morgan Stanley Investment Management, and CIO at Invesco Asia.</p>
              </div>
            </div>
            <div className="flex gap-6 items-start">
              <div className="w-32 h-32 rounded-full bg-muted flex-shrink-0 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className="text-muted-foreground/40">
                  <circle cx="24" cy="18" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M6 44c0-9.94 8.06-18 18-18s18 8.06 18 18" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              <div>
                <h3 className="font-display font-medium text-foreground text-xl">Kwan Ng</h3>
                <p className="eyebrow mt-1">Senior Advisor</p>
                <p className="body-text mt-3 text-sm">Currently Portfolio Manager at ExodusPoint. Formerly Senior Portfolio Manager at BlueCrest Capital Management, Head of FX Trading at Barclays, and Trader at Millennium.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-padding bg-muted/50 border-t border-border">
        <div className="container-site">
          <h2 className="heading-section mb-16 text-center fade-up">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 fade-up" style={{ transitionDelay: '0.1s' }}>
            {partners.map((p) => (
              <div key={p} className="bg-card border border-border flex items-center justify-center h-20 px-4 grayscale hover:grayscale-0 transition-all duration-300">
                <span className="font-body text-sm text-muted-foreground font-normal tracking-wide">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
