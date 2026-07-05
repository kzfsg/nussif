import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import HeroSection from '@/components/HeroSection';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import heroImage from '@/assets/hero-trading.jpg';

const APPLY_URL = 'https://forms.office.com/Pages/ShareFormPage.aspx?id=Xu-lWwkxd06Fvc_rDTR-ghbuzO_hwkFNmR1TLDctiJBUME1NVUdYQzNGNlVOSzdKQkhWSUY3MUI0UC4u&sharetoken=TGc4Xqw46sMkbulMbeRJ';

interface Role {
  num: string;
  title: string;
  team: string;
  teamLink: string;
  desc: string;
}

const investingRoles: Role[] = [
  {
    num: '01',
    title: 'Equities Analyst',
    team: 'L/S Equities',
    teamLink: '/people#ls-equities',
    desc: 'Generates investment ideas and strategies across Singapore and global equity markets, combining fundamental analysis with a keen sense of the structural global and sectoral undercurrents that allow the Equities team to generate excess returns.',
  },
  {
    num: '02',
    title: 'Macro Analyst',
    team: 'Global Macro',
    teamLink: '/people#global-macro-commodities',
    desc: 'Develops a robust first principles understanding of global capital markets and economies, translating economic narratives into positioning across a range of asset classes.',
  },
  {
    num: '03',
    title: 'Systematic Strategies Analyst',
    team: 'Systematic Strategies',
    teamLink: '/people#systematic-strategies',
    desc: "Leverages our range of data partnerships to embed quantitative, data-driven analysis into the fund's investment decisions. Focuses on signal research, generation and bringing a systematic dimension to the Investing teams.",
  },
  {
    num: '04',
    title: 'Commodities Analyst',
    team: 'Commodities',
    teamLink: '/people#global-macro-commodities',
    desc: 'Devises metals and energy market views grounded in both micro and macro fundamentals, as well as supply-demand imbalances, flows and cross-commodity relative value.',
  },
];

const operationsRoles: Role[] = [
  {
    num: '05',
    title: 'Risk & Infrastructure Analyst',
    team: 'Operations',
    teamLink: '/people#operations',
    desc: 'Builds and maintains the risk frameworks, tooling, and infrastructure that gives NUSSIF an institutional-grade oversight.',
  },
  {
    num: '06',
    title: 'Fund Development Analyst',
    team: 'Operations',
    teamLink: '/people#operations',
    desc: "Drive the fund's long-term growth through partnerships, external relations, and the initiatives that expand NUSSIF's reach, standing, and capital base. Fund Development Analysts are responsible for the outreach, event management and relationship building between NUSSIF and senior leaders in industry, allowing them to build their own industry networks concurrently.",
  },
  {
    num: '07',
    title: 'Marketing & Brand Analyst',
    team: 'Operations',
    teamLink: '/people#operations',
    desc: 'Owns how NUSSIF shows up to the world, through an extensive understanding for the brand, content, and communications that reflect the standard of the fund behind them.',
  },
];

/* ─── Cursor-reactive wave field (canvas) ─── */
function WaveField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4 };
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Listen on the parent section so the waves respond even when the
    // cursor is over the headline or button.
    const host = canvas.parentElement ?? canvas;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.tx = -1e4;
      mouse.ty = -1e4;
    };
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);

    const LINES = 22;

    const draw = () => {
      t += 0.005;
      // Ease the cursor position so the water feels viscous, not twitchy
      mouse.x += (mouse.tx - mouse.x) * 0.07;
      mouse.y += (mouse.ty - mouse.y) * 0.07;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < LINES; i++) {
        const p = i / (LINES - 1);
        const baseY = h * 0.16 + p * h * 0.68;
        // Lines near the cursor glow brighter
        const dLine = baseY - mouse.y;
        const glow = Math.exp(-(dLine * dLine) / (2 * 130 * 130));
        const alpha = 0.05 + 0.09 * Math.sin(p * Math.PI) + glow * 0.24;
        ctx.beginPath();
        ctx.strokeStyle = `hsla(37, 45%, 62%, ${alpha})`;
        ctx.lineWidth = 1;

        for (let x = 0; x <= w; x += 6) {
          const wave =
            Math.sin(x * 0.0042 + t * 1.6 + i * 0.32) * 12 +
            Math.sin(x * 0.0019 - t * 1.1 + i * 0.55) * 9;
          // The surface parts gently around the cursor
          const dx = x - mouse.x;
          const dy = baseY - mouse.y;
          const influence = Math.exp(-(dx * dx + dy * dy) / (2 * 150 * 150));
          const dir = dy >= 0 ? 1 : -1;
          const y = baseY + wave + dir * influence * 46;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

/* ─── Magnetic apply button ─── */
function MagneticApply() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 160, damping: 16 });
  const y = useSpring(my, { stiffness: 160, damping: 16 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.28);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.28);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      href={APPLY_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative inline-flex items-center gap-4 border border-white/30 px-10 py-5 overflow-hidden transition-colors duration-500 hover:border-[hsl(var(--gold))]"
    >
      {/* Gold fill sweeps up on hover */}
      <span className="absolute inset-0 bg-[hsl(var(--gold))] translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
      <span className="relative font-body text-xs uppercase tracking-[0.25em] text-white transition-colors duration-500 group-hover:text-navy-deep">
        Apply Now
      </span>
      <ArrowUpRight
        size={16}
        className="relative text-white transition-all duration-500 group-hover:text-navy-deep group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </motion.a>
  );
}

/* ─── Role row with cursor spotlight ─── */
function RoleRow({ role, index, dark = false }: { role: Role; index: number; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  const scrollToApply = () => {
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.06, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        className={`group relative border-t ${dark ? 'border-primary-foreground/10' : 'border-border'}`}
      >
        {/* Spotlight that follows the cursor */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(340px circle at var(--spot-x, 50%) var(--spot-y, 50%), hsl(37 45% 62% / ${dark ? '0.09' : '0.1'}), transparent 70%)`,
          }}
        />

        <div className="relative grid grid-cols-1 md:grid-cols-[5.5rem_1fr_auto] gap-4 md:gap-10 py-10 md:py-14 px-1 md:px-4">
          {/* Number */}
          <span
            className="font-display font-light select-none leading-none transition-colors duration-500"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'hsl(var(--gold) / 0.45)' }}
          >
            {role.num}
          </span>

          {/* Content */}
          <div>
            <span
              className="font-body text-[10px] uppercase tracking-[0.25em] block mb-3"
              style={{ color: 'hsl(var(--gold))' }}
            >
              {role.team}
            </span>
            <h3
              className={`font-display font-medium mb-4 transition-colors duration-500 ${
                dark
                  ? 'text-primary-foreground group-hover:text-[hsl(var(--gold))]'
                  : 'text-foreground group-hover:text-primary'
              }`}
              style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)' }}
            >
              {role.title}
            </h3>
            <p
              className={`font-body font-light leading-[1.8] max-w-2xl ${
                dark ? 'text-primary-foreground/55' : 'text-muted-foreground'
              }`}
              style={{ fontSize: 'var(--text-sm)' }}
            >
              {role.desc}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-10 gap-y-3">
              <Link
                to={role.teamLink}
                className="group/link inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.18em] transition-colors duration-300"
                style={{ color: 'hsl(var(--gold))' }}
              >
                <span className="relative">
                  Meet the {role.team} team
                  <span className="absolute left-0 -bottom-1 h-px w-full origin-left scale-x-0 bg-[hsl(var(--gold))] transition-transform duration-500 group-hover/link:scale-x-100" />
                </span>
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                />
              </Link>

              <button
                onClick={scrollToApply}
                className={`inline-flex items-center gap-2 font-body text-xs uppercase tracking-[0.18em] transition-colors duration-300 ${
                  dark
                    ? 'text-primary-foreground/40 hover:text-primary-foreground'
                    : 'text-muted-foreground/70 hover:text-foreground'
                }`}
              >
                Apply
                <ArrowDown size={13} />
              </button>
            </div>
          </div>

          {/* Trailing arrow */}
          <div className="hidden md:flex items-center pr-2">
            <ArrowUpRight
              size={26}
              strokeWidth={1.25}
              className={`transition-all duration-500 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 ${
                dark ? 'text-[hsl(var(--gold))]' : 'text-primary'
              }`}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function RecruitmentPage() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      <HeroSection
        image={heroImage}
        title="H2'2026 Analyst Recruitment"
      />

      {/* Opening statement + figures */}
      <section className="section-padding bg-background">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="w-16 h-px bg-[hsl(var(--gold))] mb-10" />
              <h2 className="heading-section mb-8">
                We recruit analysts,
                <br />
                not spectators.
              </h2>
              <p className="body-text leading-[1.85]">
                Every member of NUSSIF operates inside a live student fund with the growth and mentorship opportunities from practitioners across the industry.
                Whether your instincts and passions lean toward the financial markets, global affairs, history and geopolitics or toward building the institution
                behind them, there is a seat here designed for you to own.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Investing division */}
      <section id="investing-roles" className="bg-background">
        <div className="container-site">
          <div className="border-t border-border pt-24 pb-28">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="lg:col-span-6">
                <span className="eyebrow block mb-4" style={{ color: 'hsl(var(--gold))' }}>
                  Division 01 — Investing
                </span>
                <h2 className="heading-section">Investing Teams</h2>
              </div>
              <div className="lg:col-span-5 lg:col-start-8 flex items-end">
                <p className="body-text">
                  Our investing teams consist of four distinct departments that specialise in their unique asset classes. An Investment 
                  Analyst researches, debates, and runs live positions across the markets they feel the most passion in.
                </p>
              </div>
            </motion.div>

            <div className="[&>*:last-child>div]:border-b [&>*:last-child>div]:border-b-border">
              {investingRoles.map((role, i) => (
                <RoleRow key={role.num} role={role} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Operations division — deliberately inverted to mark the shift */}
      <section id="operations-roles" className="bg-navy-deep relative overflow-hidden">
        {/* Faint vertical rhythm lines, echoing the Program page closing strip */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, transparent, transparent 150px, rgba(255,255,255,0.12) 150px, rgba(255,255,255,0.12) 151px)',
          }}
        />
        <div className="container-site relative">
          <div className="pt-24 pb-28 md:pt-32 md:pb-36">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="lg:col-span-6">
                <span className="eyebrow block mb-4" style={{ color: 'hsl(var(--gold))' }}>
                  Division 02 — Operations
                </span>
                <h2 className="heading-section text-primary-foreground">Operations Teams</h2>
              </div>
              <div className="lg:col-span-5 lg:col-start-8 flex items-end">
                <p className="font-body font-light text-primary-foreground/55 leading-[1.7]" style={{ fontSize: 'var(--text-base)' }}>
                  The backbone of the fund. Operations analysts build the systems, relationships,
                  and brand that let a student fund run at an institutional standard.
                </p>
              </div>
            </motion.div>

            <div className="[&>*:last-child>div]:border-b [&>*:last-child>div]:border-b-primary-foreground/10">
              {operationsRoles.map((role, i) => (
                <RoleRow key={role.num} role={role} index={i} dark />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* One application note */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container-site text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display italic text-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            We want the most passionate across NUS, no matter what field you might come from. Apply now to discover your fit.
          </motion.p>
        </div>
      </section>

      {/* Closing CTA with cursor-reactive waves */}
      <section id="apply" className="relative overflow-hidden bg-navy-deep">
        <WaveField className="absolute inset-0 w-full h-full" />

        {/* Legibility gradients over the waves */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-transparent to-navy-deep/80 pointer-events-none" />

        <div className="container-site relative py-36 md:py-52 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <div className="w-16 h-px bg-[hsl(var(--gold)/0.6)] mb-10" />
            <h2
              className="font-display font-medium text-white leading-[1.08] mb-12"
              style={{ fontSize: 'clamp(2.75rem, 6vw, 5rem)', letterSpacing: '-0.01em' }}
            >
              Take your seat
              <br />
              at the desk.
            </h2>

            <div className="pointer-events-auto inline-block">
              <MagneticApply />
            </div>

            <p className="mt-10 font-body text-[11px] uppercase tracking-[0.2em] text-white/35">
              One application · All positions
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
