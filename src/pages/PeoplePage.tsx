import HeroSection from '@/components/HeroSection';
import PersonCard from '@/components/PersonCard';
import AnalystCard from '@/components/AnalystCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import heroImage from '@/assets/hero-singapore.jpg';

const leadership = [
  { name: 'Sean Wong', role: 'Co-Head of Total Portfolios', email: 'sean@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/sean-wong.jpg' },
  { name: 'Rave Lai', role: 'Co-Head of Total Portfolios', email: 'rave@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/rave-lai.jpg' },
  { name: 'Jerry Z', role: 'Leadership', email: 'jerry@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/jerry-z.jpg' },
];

const investingPods = [
  {
    name: 'L/S Equities',
    description: 'Our Long/Short Equities pod pursues alpha through both long and short positions across Singapore and global equity markets. Combining fundamental analysis with thematic conviction, the team identifies mispriced securities and relative value opportunities, deploying a blend of L/S, Event-Driven, and Relative Value strategies.',
    members: [
      { name: 'Abdullah Armain', role: 'Portfolio Manager, L/S Equities', email: 'abdullah@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/abdullah-armain.jpg' },
      { name: 'Wong Zhao Yang', role: 'Portfolio Manager, L/S Equities', email: 'zhaoyang@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/wong-zhao-yang.jpg' },
    ],
    analysts: [
      { name: 'Analyst 1', email: 'analyst1@u.nus.edu', linkedIn: 'https://linkedin.com' },
      { name: 'Analyst 2', email: 'analyst2@u.nus.edu', linkedIn: 'https://linkedin.com' },
    ],
  },
  {
    name: 'Global Macro',
    description: 'The Global Macro pod exercises discretion over the FICC portfolio, deploying macro hedge fund strategies to generate absolute returns across fixed income, currencies, and equity index instruments — regardless of investment climate.',
    members: [
      { name: 'Alvin Yeow', role: 'Portfolio Manager, Global Macro', email: 'alvin@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/alvin-yeow.jpg' },
      { name: 'Ye Wen Jun', role: 'Portfolio Manager, Global Macro', email: 'wenjun@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/ye-wen-jun.jpg' },
      { name: 'Eve', role: 'Analyst, Global Macro', email: 'eve@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/eve.jpg' },
    ],
    analysts: [
      { name: 'Analyst 1', email: 'analyst1@u.nus.edu', linkedIn: 'https://linkedin.com' },
    ],
  },
  {
    name: 'Commodities',
    description: 'The Commodities pod focuses on the identification and execution of trading strategies across energy and metals markets. Grounded in both micro and macro fundamentals, the team brings deep specialisation and dedicated rigour.',
    members: [
      { name: 'Chew Jinn Ming', role: 'Portfolio Manager, Commodities', email: 'jinnming@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/chew-jinn-ming.jpg' },
    ],
    analysts: [
      { name: 'Analyst 1', email: 'analyst1@u.nus.edu', linkedIn: 'https://linkedin.com' },
    ],
  },
  {
    name: 'Systematic Strategies',
    description: 'The Systematic Strategies pod embeds quantitative and data-driven analysis into the fund\'s investment and portfolio decisions. The team supports the asset pods by providing a quantitative dimension to market views.',
    members: [
      { name: 'Poo Chet Wee', role: 'Head of Systematic Strategies', email: 'chetwee@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/poo-chet-wee.jpg' },
    ],
    analysts: [
      { name: 'Analyst 1', email: 'analyst1@u.nus.edu', linkedIn: 'https://linkedin.com' },
    ],
  },
];

const operationsPods = [
  {
    name: 'Risk & Infrastructure',
    members: [
      { name: 'Senyi', role: 'Head of Risk & Infrastructure', email: 'senyi@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/senyi.jpg' },
    ],
  },
  {
    name: 'Externals',
    members: [
      { name: 'Davin', role: 'Head of Externals', email: 'davin@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/davin.jpg' },
      { name: 'Yi Fei', role: 'Analyst, Externals', email: 'yifei@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/yi-fei.jpg' },
    ],
  },
  {
    name: 'Fund Development',
    members: [
      { name: 'Helena', role: 'Head of Fund Development', email: 'helena@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/helena.jpg' },
      { name: 'Brenda', role: 'Analyst, Fund Development', email: 'brenda@u.nus.edu', linkedIn: 'https://linkedin.com', headshot: '/people/brenda.jpg' },
    ],
  },
];

export default function PeoplePage() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      <HeroSection
        image={heroImage}
        title="Our People"
        subtitle="A student-led investment fund's most important asset is the quality and passion of its people."
      />

      {/* Advisors */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <h2 className="heading-section mb-3 fade-up">Senior Advisors</h2>
          <p className="body-text max-w-2xl mb-16 fade-up" style={{ transitionDelay: '0.1s' }}>
            Guided by industry practitioners with decades of experience in global finance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 fade-up" style={{ transitionDelay: '0.2s' }}>
            <div className="space-y-1">
              <h3 className="font-display font-medium text-foreground text-xl">Adjunct Professor James Cheng</h3>
              <p className="eyebrow">Senior Advisor</p>
              <p className="body-text mt-2 text-sm">Previously CEO & Senior Advisor to Morgan Stanley Investment Management, and CIO at Invesco Asia.</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-medium text-foreground text-xl">Kwan Ng</h3>
              <p className="eyebrow">Senior Advisor</p>
              <p className="body-text mt-2 text-sm">Currently Portfolio Manager at ExodusPoint. Formerly Senior Portfolio Manager at BlueCrest Capital Management, Head of FX Trading at Barclays, and Trader at Millennium.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-muted/50">
        <div className="container-site">
          <p className="eyebrow mb-4 fade-up">Leadership</p>
          <h2 className="heading-section mb-3 fade-up">NUSSIF Leadership Team</h2>
          <p className="body-text max-w-3xl mb-16 fade-up" style={{ transitionDelay: '0.1s' }}>
            The NUSSIF Leadership Team is responsible for setting the overall strategic and long-term direction of the society, as well as fund performance and risk management.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 fade-up" style={{ transitionDelay: '0.2s' }}>
            {leadership.map((m) => (
              <PersonCard key={m.name} {...m} />
            ))}
          </div>
        </div>
      </section>

      {/* Investing Teams */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <p className="eyebrow mb-4 fade-up">Investing</p>
          <h2 className="heading-section mb-3 fade-up">Investing Teams</h2>
          <p className="body-text max-w-3xl mb-16 fade-up" style={{ transitionDelay: '0.1s' }}>
            Four specialist pods operating across global equities, macro, commodities, and systematic strategies — each pod lean, accountable, and responsible for their own returns.
          </p>

          {investingPods.map((pod, i) => (
            <div key={pod.name} className="mb-20 last:mb-0 fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
              <h3 className="heading-sub mb-3">{pod.name}</h3>
              <p className="body-text max-w-3xl mb-10">{pod.description}</p>
              
              {/* Portfolio Managers */}
              <p className="eyebrow mb-6 text-gold">Portfolio Managers</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {pod.members.map((m) => (
                  <PersonCard key={m.name} {...m} />
                ))}
              </div>

              {/* Analysts */}
              {pod.analysts && pod.analysts.length > 0 && (
                <div className="mt-10 pt-8 border-t border-border">
                  <p className="eyebrow mb-6">Analysts</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {pod.analysts.map((a, j) => (
                      <AnalystCard key={`${a.name}-${j}`} {...a} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Operations */}
      <section className="section-padding bg-muted/50">
        <div className="container-site">
          <p className="eyebrow mb-4 fade-up">Operations</p>
          <h2 className="heading-section mb-3 fade-up">Operations Teams</h2>
          <p className="body-text max-w-3xl mb-16 fade-up" style={{ transitionDelay: '0.1s' }}>
            The backbone of the fund — ensuring robust infrastructure, stakeholder engagement, and long-term fund development.
          </p>

          {operationsPods.map((pod, i) => (
            <div key={pod.name} className="mb-20 last:mb-0 fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
              <h3 className="heading-sub mb-10">{pod.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {pod.members.map((m) => (
                  <PersonCard key={m.name} {...m} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trainee note */}
      <section className="py-20 bg-muted/30">
        <div className="container-site text-center">
          <p className="font-display italic text-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            "Outstanding Trainee Analysts from the Execution Track will be invited to join the Investing Teams. Trainee Analyst cohort members are not listed here pending graduation from the programme."
          </p>
        </div>
      </section>
    </div>
  );
}
