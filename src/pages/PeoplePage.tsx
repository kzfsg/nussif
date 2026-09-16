import { motion, useScroll, useSpring } from 'motion/react';
import { useRef } from 'react';
import PageHero from '@/components/PageHero';
import TeamDirectory from '@/components/TeamDirectory';
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

export default function PeoplePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={pageRef}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{ scaleX, backgroundColor: 'hsl(var(--gold))' }}
      />

      <PageHero
        image={heroImage}
        title="Our People"
        subtitle="A student-led investment fund's most important asset is the quality and passion of its people."
      />

      <section className="bg-navy-deep relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 90% 10%, hsl(37 45% 62% / 0.05), transparent 55%)',
          }}
        />

        <div className="container-site relative">
          <div className="pt-24 pb-28 md:pt-32 md:pb-36">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-20"
            >
              <div className="w-12 h-px bg-gold mb-10" />
              <h2 className="heading-section text-primary-foreground mb-4">
                Senior Advisors
              </h2>
              <p
                className="font-body font-light text-primary-foreground/55 leading-[1.7] max-w-2xl"
                style={{ fontSize: 'var(--text-base)' }}
              >
                Guided by industry practitioners with decades of experience in
                global finance.
              </p>
            </motion.div>

            <div>
              {advisors.map((advisor, index) => (
                <motion.div
                  key={advisor.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    delay: index * 0.08,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group relative border-t border-white/10 last:border-b grid grid-cols-[3rem_1fr] md:grid-cols-[6rem_1.1fr_1.3fr] gap-4 md:gap-12 py-10 md:py-14 transition-colors duration-500 hover:bg-white/[0.03]"
                >
                  <span
                    className="font-display font-light leading-none"
                    style={{
                      fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                      color: 'hsl(var(--gold) / 0.5)',
                    }}
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

      <TeamDirectory />
    </div>
  );
}
