import HeroSection from '@/components/HeroSection';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import heroImage from '@/assets/hero-trading.jpg';

const stages = [
  {
    eyebrow: 'Recruitment',
    heading: 'Execution Track — Trainee Analyst',
    body: 'Analysts join NUSSIF through a selective recruitment process into the Execution Track as a Trainee Analyst. Selection is based on intellectual curiosity, financial acumen, and the drive to operate in a professional investment environment.',
  },
  {
    eyebrow: 'Semester One',
    heading: 'Trading Simulation Programme',
    body: 'All incoming Trainee Analysts participate in the Trading Simulation Programme — a structured simulation environment designed to develop trading intuition, decision-making under uncertainty, and investment thesis construction. Simultaneously, each Trainee Analyst selects two Portfolio Managers to shadow on a weekly basis. These sessions are where analysts present their market intuition and analysis directly to the hosting PMs. Position management decisions during these sessions are left to the discretion of the Portfolio Manager.',
  },
  {
    eyebrow: 'Ongoing',
    heading: 'Live Project Allocation',
    body: 'Throughout the semester, each Trainee Analyst is assigned distinct tasks, research projects, and analytical responsibilities. These are allocated by the Portfolio Managers they shadow, ensuring direct exposure to live investment decision-making processes across the fund\'s asset classes.',
  },
  {
    eyebrow: 'Outcome',
    heading: 'Pathway to the Investing Teams',
    body: null,
    callout: 'Outstanding Trainee Analysts will be invited to join the Investing Teams.',
  },
];

const mandateData = [
  { label: 'Strategies', equities: 'Blend of Discretionary & Systematic', macro: 'Blend of Discretionary & Systematic', commodities: 'Blend of Discretionary & Systematic' },
  { label: 'Directional / Relative Value', equities: '~50% / 50%', macro: '~30% / 70%', commodities: '~30% / 70%' },
  { label: 'Instruments', equities: 'Equities, ETFs, Equity & Index Options', macro: 'Mini-Forwards, Futures, Options', commodities: 'Micro / Mini-Futures' },
  { label: 'Geographic Focus', equities: 'Singapore / Global + Thematic', macro: 'Global', commodities: 'Global / Commodity Only' },
  { label: 'Max Instruments', equities: '< 20', macro: '< 45', commodities: '< 20' },
  { label: 'Volatility Target', equities: '~20%', macro: '~10%', commodities: '~10%' },
];

export default function ProgramPage() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      <HeroSection
        image={heroImage}
        title="The NUSSIF Program"
        subtitle="An institutional-grade training experience, built for the next generation of buy-side practitioners."
      />

      {/* Philosophy */}
      <section className="section-padding bg-muted/50">
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="fade-up">
            <p className="font-display italic text-foreground text-2xl md:text-3xl leading-snug">
              "We strive to provide an institutional-grade experience that empowers our members to leverage industry best practices — making decisions with clear ownership and accountability."
            </p>
          </div>
          <div className="fade-up" style={{ transitionDelay: '0.1s' }}>
            <p className="body-text">
              Backed by senior advisors with cumulatively 64 years of experience in global finance, the NUSSIF program is structured to ensure learning is held to the highest standard.
            </p>
          </div>
        </div>
      </section>

      {/* Analyst Pipeline */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <h2 className="heading-section mb-3 fade-up">The Analyst Pipeline</h2>
          <p className="body-text max-w-2xl mb-16 fade-up" style={{ transitionDelay: '0.1s' }}>
            From entry to the investing teams — a structured pathway of growth.
          </p>

          <div className="relative ml-4 md:ml-8">
            {/* Vertical line */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary" />

            {stages.map((stage, i) => (
              <div key={i} className="relative pl-10 md:pl-14 pb-16 last:pb-0 fade-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                {/* Dot */}
                <div className="absolute left-[-4px] top-2 w-[10px] h-[10px] rounded-full bg-primary" />

                <div className="bg-card border border-border p-8 md:p-10">
                  <span className="eyebrow text-gold">{stage.eyebrow}</span>
                  <h3 className="font-display font-medium text-foreground text-xl md:text-2xl mt-3 mb-4">{stage.heading}</h3>
                  {stage.body && <p className="body-text">{stage.body}</p>}
                  {stage.callout && (
                    <div className="border-l-2 border-primary pl-6 mt-4">
                      <p className="font-display italic text-foreground text-lg">{stage.callout}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Mandate */}
      <section className="section-padding bg-muted/50">
        <div className="container-site">
          <h2 className="heading-section mb-3 fade-up">Investment Mandate</h2>
          <p className="body-text max-w-2xl mb-16 fade-up" style={{ transitionDelay: '0.1s' }}>
            A multi-strategy framework combining discretionary and systematic approaches across global markets.
          </p>

          <div className="overflow-x-auto fade-up" style={{ transitionDelay: '0.2s' }}>
            <table className="w-full min-w-[640px] border-collapse">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left p-4 font-display font-medium text-sm tracking-wide" />
                  <th className="text-left p-4 font-display font-medium text-sm tracking-wide">Equities</th>
                  <th className="text-left p-4 font-display font-medium text-sm tracking-wide">Global Macro</th>
                  <th className="text-left p-4 font-display font-medium text-sm tracking-wide">Commodities</th>
                </tr>
              </thead>
              <tbody>
                {mandateData.map((row, i) => (
                  <tr key={row.label} className={`border-b border-border ${i % 2 === 0 ? 'bg-card' : 'bg-muted/30'} hover:bg-muted/60 transition-colors`}>
                    <td className="p-4 font-body font-medium text-sm text-foreground">{row.label}</td>
                    <td className="p-4 font-body text-sm text-muted-foreground">{row.equities}</td>
                    <td className="p-4 font-body text-sm text-muted-foreground">{row.macro}</td>
                    <td className="p-4 font-body text-sm text-muted-foreground">{row.commodities}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
