import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface HeroSectionProps {
  image: string;
  title: string;
  subtitle: string;
  fullHeight?: boolean;
  noOverlay?: boolean;
  children?: React.ReactNode;
}

export default function HeroSection({ image, title, subtitle, fullHeight = false, noOverlay = false, children }: HeroSectionProps) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: image moves slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  // Scale: subtle zoom out as you scroll
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  // Fade out content as you scroll
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 60]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 350);
    return () => clearTimeout(timer);
  }, []);

  const words = title.split(' ');

  return (
    <section
      ref={containerRef}
      className={`relative ${fullHeight ? 'h-screen' : 'min-h-[70vh]'} flex items-center justify-center overflow-hidden`}
    >
      {/* Parallax background image with Ken Burns */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: imageY, scale: imageScale }}
      >
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] ease-out"
          style={{
            transform: visible ? 'scale(1)' : 'scale(1.15)',
          }}
          loading="eager"
        />
      </motion.div>

      {/* Overlay layers */}
      {!noOverlay && (
        <>
          <div className="absolute inset-0 bg-navy-deep/[0.68]" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/40 via-transparent to-navy-deep/60" />
          {/* Subtle vignette */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, rgba(10,15,30,0.3) 100%)',
            }}
          />
        </>
      )}

      {noOverlay && (
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.5) 0%, transparent 100%)',
          }}
        />
      )}

      {/* Content with parallax fade */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl"
        style={{ opacity: fullHeight ? contentOpacity : 1, y: fullHeight ? contentY : 0 }}
      >
        {/* Eyebrow line */}
        <div
          className={`mx-auto mb-8 h-px bg-[hsl(var(--gold)/0.6)] transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? 'w-16 opacity-100' : 'w-0 opacity-0'
          }`}
        />

        {/* Word-by-word masked rise reveal */}
        <h1
          className="font-display font-medium text-white tracking-[0.08em] leading-[1.1]"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
            >
              <span
                className="inline-block transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: visible ? 'translateY(0)' : 'translateY(115%)',
                  transitionDelay: `${0.1 + i * 0.1}s`,
                }}
              >
                {word}
                {i < words.length - 1 ? '\u00A0' : ''}
              </span>
            </span>
          ))}
        </h1>

        <p
          className={`mt-7 font-body font-light text-white/80 max-w-2xl mx-auto leading-relaxed transition-all duration-[1.2s] delay-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.15rem)' }}
        >
          {subtitle}
        </p>

        {/* Children with delayed reveal */}
        {children && (
          <div
            className={`transition-all duration-[1.2s] delay-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {children}
          </div>
        )}
      </motion.div>

      {/* Scroll indicator */}
      {fullHeight && (
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 delay-[1.5s] ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="font-body text-[10px] uppercase tracking-[0.2em] text-white/40">
            Scroll
          </span>
          <div className="relative w-[1px] h-12 bg-white/10 overflow-hidden">
            <div className="absolute top-0 w-full h-full bg-gradient-to-b from-white/50 to-transparent animate-[scrollLine_2s_ease-in-out_infinite]" />
          </div>
        </div>
      )}

      <style>{`
        @keyframes scrollLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
