import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import HeroSection from "@/components/HeroSection";
import VideoModal from "@/components/VideoModal";
import OrgChart from "@/components/OrgChart";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import heroImage from "@/assets/hero-singapore.jpg";

import citadelLogo from "@/assets/partners/citadel.png";
import citadelSecLogo from "@/assets/partners/citadel-securities.png";
import point72Logo from "@/assets/partners/point72.png";
import massiveLogo from "@/assets/partners/massive.png";
import millenniumLogo from "@/assets/partners/millennium.png";

import bridgewaterLogo from "@/assets/placements/bridgewater.png";
import goldmanLogo from "@/assets/placements/goldman-sachs.png";
import gicLogo from "@/assets/placements/gic.png";
import bofaLogo from "@/assets/placements/bank-of-america.png";
import stonepeakLogo from "@/assets/placements/stonepeak.png";
import moelisLogo from "@/assets/placements/moelis.png";
import morganStanleyLogo from "@/assets/placements/morgan-stanley.png";
import citiLogo from "@/assets/placements/citi.png";
import blueCrestLogo from "@/assets/placements/bluecrest.png";
import point72PlacementLogo from "@/assets/placements/point72.png";
import dymonLogo from "@/assets/placements/dymon-asia.png";
import glencoreLogo from "@/assets/placements/glencore.png";
import axpoLogo from "@/assets/placements/axpo.png";
import nomuraLogo from "@/assets/placements/nomura.png";
import qrtLogo from "@/assets/placements/qrt.png";
import citadelPlacementLogo from "@/assets/placements/citadel.png";
import gardaLogo from "@/assets/placements/garda.png";
import capulaLogo from "@/assets/placements/capula.png";

const values = [
  {
    num: "01",
    title: "Debate",
    desc: "We pride ourselves on the diversity and openness of our platform in allowing everyone to express their views and engage in contestation of ideas.",
  },
  {
    num: "02",
    title: "Evolve",
    desc: "We believe strongly in anchoring to long-term macro rules, yet are always reminded to interrogate our own intersubjectivity and seek new norms.",
  },
  {
    num: "03",
    title: "Efficiency",
    desc: "We operate in lean and dynamic teams, focusing on agility within comprehensive frameworks to motivate active decision-making.",
  },
  {
    num: "04",
    title: "Ownership",
    desc: "Each pod is lean and takes responsibility for their own returns, keeping every member highly involved and committed.",
  },
];

const achievements = [
  { name: "UBS Pan Asia Finance Challenge", result: "Champions" },
  {
    name: "Point72 Oxford University Equity Research Competition",
    result: "Champions",
  },
  { name: "Point72 NTU Stock Pitch Competition", result: "Champion" },
  { name: "CFA Research Challenge (Singapore)", result: "Champions" },
  { name: "Temasek-NUS Stock Pitch Competition", result: "Champion" },
  {
    name: "JPMorgan Asia Asset & Wealth Management Challenge (Singapore)",
    result: "Champions",
  },
];

const placementCategories = [
  "All",
  "L/S Equities",
  "Global Macro",
  "Commodities",
  "Systematic Strategies",
] as const;

const placementFirms = [
  { name: "Bridgewater", logo: bridgewaterLogo, categories: ["L/S Equities"] },
  { name: "Goldman Sachs", logo: goldmanLogo, categories: ["L/S Equities", "Global Macro", "Systematic Strategies"] },
  { name: "GIC", logo: gicLogo, categories: ["L/S Equities"] },
  { name: "Bank of America", logo: bofaLogo, categories: ["L/S Equities", "Global Macro"] },
  { name: "Stonepeak", logo: stonepeakLogo, categories: ["L/S Equities"] },
  { name: "Moelis", logo: moelisLogo, categories: ["L/S Equities"] },
  { name: "Morgan Stanley", logo: morganStanleyLogo, categories: ["Global Macro"] },
  { name: "Citi", logo: citiLogo, categories: ["Global Macro"] },
  { name: "BlueCrest", logo: blueCrestLogo, categories: ["Global Macro"] },
  { name: "Point72", logo: point72PlacementLogo, categories: ["Global Macro"] },
  { name: "Dymon Asia", logo: dymonLogo, categories: ["Global Macro"] },
  { name: "Glencore", logo: glencoreLogo, categories: ["Commodities"] },
  { name: "Axpo", logo: axpoLogo, categories: ["Commodities"] },
  { name: "Nomura", logo: nomuraLogo, categories: ["Systematic Strategies"] },
  { name: "QRT", logo: qrtLogo, categories: ["Systematic Strategies"] },
  { name: "Citadel", logo: citadelPlacementLogo, categories: ["Systematic Strategies"] },
  { name: "Garda Capital Partners", logo: gardaLogo, categories: ["Systematic Strategies"] },
  { name: "Capula", logo: capulaLogo, categories: ["Systematic Strategies"] },
];

const partners = [
  { name: "Citadel", logo: citadelLogo, url: "https://www.citadel.com" },
  {
    name: "Citadel Securities",
    logo: citadelSecLogo,
    url: "https://www.citadelsecurities.com",
  },
  { name: "Point72", logo: point72Logo, url: "https://www.point72.com" },
  { name: "Massive", logo: massiveLogo, url: "https://www.massive.com" },
  { name: "Millennium", logo: millenniumLogo, url: "https://www.mlp.com" },
];

function StatCounter({
  value,
  suffix,
  label,
  description,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  description?: string;
  delay?: number;
}) {
  const { count, ref } = useCountUp(value);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col px-8 py-16 md:py-20"
    >
      <span className="font-display font-light text-primary-foreground text-7xl md:text-8xl leading-none tracking-tight tabular-nums">
        {count}
        <span style={{ color: 'hsl(var(--gold))' }}>{suffix}</span>
      </span>
      <span className="mt-6 font-display font-medium text-white text-xl md:text-2xl tracking-wide">
        {label}
      </span>
      {description && (
        <span className="mt-3 font-body text-sm text-white/50 leading-relaxed max-w-xs">
          {description}
        </span>
      )}
    </motion.div>
  );
}

/* Full-width image break with true scroll parallax */
function ParallaxBreak({ src, alt, heightClass }: { src: string; alt: string; heightClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section ref={ref} className={`relative ${heightClass} overflow-hidden`}>
      <motion.div className="absolute -inset-y-[14%] inset-x-0" style={{ y }}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-[hsl(220,55%,8%,0.45)]" />
    </section>
  );
}

/* Culture value card with cursor-tracking spotlight */
function ValueCard({ value, index }: { value: (typeof values)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-default overflow-hidden"
      style={{
        backgroundColor: 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Cursor spotlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: 'radial-gradient(300px circle at var(--spot-x, 50%) var(--spot-y, 50%), hsl(37 45% 62% / 0.08), transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1px hsl(var(--gold) / 0.2)' }}
      />

      {/* Large gold watermark number */}
      <span
        className="absolute top-6 right-8 font-display font-light select-none transition-all duration-700 group-hover:opacity-[0.45] group-hover:scale-110 pointer-events-none"
        style={{
          fontSize: 'clamp(5rem, 8vw, 8rem)',
          color: 'hsl(var(--gold))',
          opacity: 0.3,
          lineHeight: 1,
        }}
      >
        {value.num}
      </span>

      <div className="relative px-10 py-14 md:py-16">
        {/* Small eyebrow number — full gold */}
        <span
          className="text-[10px] tracking-[0.25em] uppercase font-body transition-colors duration-500"
          style={{ color: 'hsl(var(--gold))' }}
        >
          {value.num}
        </span>

        <h3 className="font-display font-medium text-white text-2xl lg:text-3xl mt-6 mb-4 tracking-wide">
          {value.title}
        </h3>
        <div className="w-0 h-px mb-6 transition-all duration-700 group-hover:w-12" style={{ backgroundColor: 'hsl(var(--gold) / 0.5)' }} />
        <p className="font-body text-sm text-white/40 leading-[1.8] transition-colors duration-500 group-hover:text-white/65 max-w-sm">
          {value.desc}
        </p>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const revealRef = useScrollReveal();
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const { scrollYProgress } = useScroll({ target: pageRef, offset: ['start start', 'end end'] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div ref={(el) => { revealRef.current = el; (pageRef as React.MutableRefObject<HTMLDivElement | null>).current = el; }}>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
        style={{ scaleX, backgroundColor: 'hsl(var(--gold))' }}
      />

      {/* Hero */}
      <HeroSection
        image={heroImage}
        title="NUSSIF"
        subtitle="Asia's premier buy-side structured, multi-strategy student investment fund"
        fullHeight
      >
        <div className="flex items-center justify-center gap-8 mt-10">
          <Link to="/program" className="gold-link">
            → Our Program
          </Link>
          <Link to="/people" className="gold-link">
            → Our People
          </Link>
        </div>
      </HeroSection>

      {/* Stats — dark navy strip */}
      <section className="bg-primary relative overflow-hidden">
        {/* Faint radial gold wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 85% 20%, hsl(37 45% 62% / 0.05), transparent 60%)',
          }}
        />
        <div className="container-site relative">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary-foreground/10">
            <StatCounter value={35} suffix="+" label="Members" delay={0} />
            <StatCounter value={25} suffix="+" label="Analysts" delay={0.1} />
            <div
              className="flex flex-col items-center text-center px-8 py-16 fade-up"
              style={{ transitionDelay: "0.2s" }}
            >
              <span className="font-display font-light text-primary-foreground leading-none tracking-tight">
                <span className="text-7xl md:text-8xl">1</span>
                <span className="text-3xl md:text-4xl mx-3 opacity-40">in</span>
                <span className="text-7xl md:text-8xl">25</span>
              </span>
              <span className="mt-5 text-[10px] tracking-[0.25em] uppercase text-primary-foreground/45 font-body">
                Acceptance Rate
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Video */}
      <VideoModal
        vimeoId="1171285504"
        thumbnailUrl="https://i.vimeocdn.com/video/2130738176-ba696526f900a41a6a9305fe38df112d76e67f15047bd3e1941bbbaba103f600-d_640?region=us"
      />

      {/* Who We Are — pinned statement, scrolling chapters */}
      <section id="who-we-are" className="section-padding bg-background overflow-hidden">
        <div className="container-site">
          <div className="w-12 h-px bg-gold mb-16 fade-up" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4">
              {/* Statement stays pinned while the three chapters scroll past */}
              <div className="lg:sticky lg:top-32 fade-up">
                <p className="font-display font-light italic text-foreground text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.25] tracking-wide">
                  Forging the next generation of NUS and Finance in Asia.
                </p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-10 w-8 h-px origin-left"
                  style={{ backgroundColor: 'hsl(var(--gold) / 0.5)' }}
                />
              </div>
            </div>

            <div
              className="lg:col-span-6 lg:col-start-7 space-y-20 fade-up"
              style={{ transitionDelay: "0.1s" }}
            >
              {[
                {
                  num: "01",
                  title: "Background",
                  text: "NUSSIF was founded by individuals passionate about understanding the world, aiming to bring real, professional investment opportunities to NUS students passionate about careers in the financial industry.",
                },
                {
                  num: "02",
                  title: "Our Purpose",
                  text: "Drawing inspiration from leading global practices and internship experiences across hedge funds and trading desks, we are determined to build a platform for active professional and personal growth through the management of live capital, industry connections, and genuine member ownership.",
                },
                {
                  num: "03",
                  title: "Our Vision",
                  text: "To become an institution where our members are bold, future-ready leaders in industry and government, building a network of illustrious alumni who actively give back to the NUS community.",
                },
              ].map((block, i) => (
                <motion.div
                  key={block.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: i * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative pl-8 border-l-2 border-transparent hover:border-[hsl(var(--gold)/0.4)] transition-all duration-700"
                >
                  {/* Ghost chapter numeral */}
                  <span
                    className="absolute -top-8 right-0 font-display font-light select-none pointer-events-none transition-opacity duration-700 group-hover:opacity-[0.14]"
                    style={{
                      fontSize: 'clamp(4rem, 6vw, 6rem)',
                      color: 'hsl(var(--gold))',
                      opacity: 0.07,
                      lineHeight: 1,
                    }}
                  >
                    {block.num}
                  </span>
                  <p className="text-[10px] tracking-[0.25em] uppercase font-body mb-4" style={{ color: 'hsl(var(--gold))' }}>
                    {block.title}
                  </p>
                  <p className="body-text text-foreground/70 leading-[1.8] group-hover:text-foreground/90 transition-colors duration-500">
                    {block.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Full-width parallax image break */}
      <ParallaxBreak
        src="/about-buildings.jpg"
        alt="Financial district skyline"
        heightClass="h-[50vh] md:h-[60vh]"
      />

      {/* Org Structure */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <h2 className="heading-section mb-3 fade-up">
            Organisational Structure
          </h2>
          <p
            className="body-text max-w-2xl mb-16 fade-up"
            style={{ transitionDelay: "0.1s" }}
          >
            A simple and powerful model, focused on complementary teams
            specialising in specific asset classes.
          </p>
          <OrgChart />
        </div>
      </section>

      {/* Culture */}
      <section id="culture" className="section-padding bg-primary">
        <div className="container-site">
          <div className="mb-20 fade-up">
            <div className="w-12 h-px bg-gold mb-10" />
            <h2 className="font-display font-light text-primary-foreground text-4xl md:text-5xl lg:text-[3.25rem] tracking-wide leading-tight">
              Our Culture
            </h2>
            <p className="mt-5 body-text text-primary-foreground/55 max-w-2xl">
              We push boundaries through diverse perspectives and bold ambition,
              driving learning, leadership, and growth unique to our members.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px]">
            {values.map((v, i) => (
              <ValueCard key={v.num} value={v} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Second full-width parallax image break */}
      <ParallaxBreak
        src="/about-mid.jpg"
        alt="Professional environment"
        heightClass="h-[45vh] md:h-[55vh]"
      />

      {/* Achievements */}
      <section id="achievements" className="section-padding bg-background">
        <div className="container-site">
          <div className="mb-16 fade-up">
            <div className="w-12 h-px bg-gold mb-10" />
            <h2 className="heading-section">
              Recognised on a Regional & Global Stage
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {achievements.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative bg-background px-10 py-14 group cursor-default overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              >
                <span
                  className="absolute top-4 right-6 font-display font-light select-none transition-all duration-700 group-hover:opacity-[0.1]"
                  style={{
                    fontSize: '5rem',
                    color: 'hsl(var(--gold))',
                    opacity: 0.05,
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left"
                  style={{ backgroundColor: 'hsl(var(--gold))' }}
                />
                <p
                  className="text-[10px] tracking-[0.25em] uppercase font-body mb-5"
                  style={{ color: 'hsl(var(--gold))' }}
                >
                  {a.result}
                </p>
                <p className="font-display font-light text-foreground text-xl md:text-2xl leading-snug">
                  {a.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Placements */}
      <section id="placements" className="section-padding bg-background border-t border-border overflow-hidden">
        <div className="container-site">
          <div className="mb-20 fade-up">
            <div className="w-12 h-px bg-gold mb-10" />
            <p className="text-[10px] tracking-[0.25em] uppercase font-body mb-6" style={{ color: 'hsl(var(--gold))' }}>
              Placements 2026
            </p>
            <h2 className="heading-section max-w-4xl">
              Our members place amongst the best in the financial industry
            </h2>
            <p className="mt-5 body-text max-w-2xl">
              Firms our members have received Summer and Graduate placements at for 2026.
            </p>
          </div>

          {/* Filter tabs with sliding active pill */}
          <div className="mb-14 flex justify-center fade-up">
            <div className="relative inline-flex flex-wrap justify-center gap-1 rounded-full border border-border bg-secondary/40 p-1">
              {placementCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="relative px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-body tracking-wide transition-colors duration-200"
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="placementTab"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      activeCategory === cat
                        ? "text-primary-foreground"
                        : "text-foreground/50 hover:text-foreground/80"
                    }`}
                  >
                    {cat}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Logo grid — non-matching firms dim out */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {placementFirms.map((firm, index) => {
              const visible =
                activeCategory === "All" || firm.categories.includes(activeCategory);
              return (
                <motion.div
                  key={firm.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    animate={{ opacity: visible ? 1 : 0.12 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="group relative flex items-center justify-center h-28 md:h-32 px-6 transition-shadow duration-500 hover:shadow-lg"
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left"
                      style={{ backgroundColor: 'hsl(var(--gold))' }}
                    />
                    <img
                      src={firm.logo}
                      alt={firm.name}
                      loading="lazy"
                      className="max-h-10 md:max-h-12 w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners — cinematic marquee */}
      <section
        id="partners"
        className="section-padding bg-background border-t border-border"
      >
        <div className="container-site">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="heading-section text-center mb-4"
          >
            Our Partners
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-16 h-px mx-auto mb-20 origin-center"
            style={{ backgroundColor: 'hsl(var(--gold) / 0.5)' }}
          />
        </div>

        {/* Full-bleed infinite marquee — pauses on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
          className="marquee-mask"
        >
          <div className="marquee-track items-center py-6">
            {[...partners, ...partners, ...partners, ...partners].map((p, i) => (
              <a
                key={`${p.name}-${i}`}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-12 md:mx-16 flex-shrink-0 transition-all duration-500 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </a>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
