import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface PageHeroProps {
  image: string;
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}

/**
 * The site's editorial hero: title set at monumental scale along the base
 * of the viewport with a word-by-word masked reveal, the page's thesis
 * pinned top-right behind a gold rule, and a hairline base row.
 */
export default function PageHero({ image, title, subtitle, children }: PageHeroProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, 70]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const words = title.split(' ');

  return (
    <section ref={ref} className="relative h-[92vh] min-h-[560px] overflow-hidden">
      {/* Parallax image with slow settle */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4s] ease-out"
          style={{ transform: visible ? 'scale(1)' : 'scale(1.12)' }}
          loading="eager"
        />
      </motion.div>

      {/* Cinematic grade — heavy at the base where the title sits */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/35 to-navy-deep/55" />
      <div className="absolute inset-0 bg-navy-deep/25" />

      <motion.div className="absolute inset-0" style={{ opacity: contentOpacity, y: contentY }}>
        {/* Thesis block — pinned top right, gold-ruled */}
        <div className="absolute top-28 md:top-36 right-6 md:right-12 lg:right-20 max-w-[17rem] md:max-w-sm text-right">
          <div
            className={`ml-auto mb-6 h-px bg-[hsl(var(--gold)/0.7)] transition-all duration-[1.4s] delay-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              visible ? 'w-14 opacity-100' : 'w-0 opacity-0'
            }`}
          />
          <p
            className={`font-body font-light text-white/85 leading-[1.8] transition-all duration-[1.2s] delay-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ fontSize: 'clamp(0.85rem, 1.05vw, 1rem)' }}
          >
            {subtitle}
          </p>
        </div>

        {/* Monumental title along the base */}
        <div className="absolute inset-x-0 bottom-0 pb-14 md:pb-16">
          <div className="container-wide">
            <h1
              className="font-display font-medium text-white select-none"
              style={{
                fontSize: 'clamp(2.8rem, 8.5vw, 7.5rem)',
                letterSpacing: '0.03em',
                lineHeight: 1,
              }}
            >
              {words.map((word, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-bottom pb-[0.1em] -mb-[0.1em]"
                >
                  <span
                    className="inline-block transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform: visible ? 'translateY(0)' : 'translateY(110%)',
                      transitionDelay: `${0.15 + i * 0.09}s`,
                    }}
                  >
                    {word}
                    {i < words.length - 1 ? '\u00A0' : ''}
                  </span>
                </span>
              ))}
            </h1>

            {/* Base row */}
            <div
              className={`mt-8 flex items-end justify-between border-t border-white/15 pt-6 transition-all duration-[1.2s] delay-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center gap-8 md:gap-12">{children}</div>
              <div className="hidden md:flex items-center gap-3">
                <span className="font-body text-[10px] uppercase tracking-[0.25em] text-white/40">
                  Scroll
                </span>
                <div className="relative w-10 h-px bg-white/15 overflow-hidden">
                  <div className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.8)] to-transparent animate-[pageHeroSweep_2.2s_ease-in-out_infinite]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes pageHeroSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
