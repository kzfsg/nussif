import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import PageHero from '@/components/PageHero';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import heroImage from '@/assets/hero-trading.jpg';

const faqs = [
  {
    q: 'Can I apply to and be considered for more than one team?',
    a: 'Yes, but you will only be allowed entry into one team. Think carefully and choose the role that fits your passions and skills best!',
  },
  {
    q: 'Is financial markets experience or knowledge required?',
    a: 'Financial markets knowledge or experience is advantaged but not strictly necessary, as long as you demonstrate a strong passion and knowledge in a particular domain that is relevant to global affairs, geopolitics, business, history and more. In fact, we highly encourage students who are able to showcase their passions in diverse fields to apply.',
  },
  {
    q: 'Will I be disadvantaged for applying late?',
    a: 'While we filter candidates on a rolling basis, we do not disadvantage students who were unable to apply early. Moreover, we still encourage all to apply as early as you can!',
  },
  {
    q: 'How can I prepare for my interviews?',
    a: 'Our Portfolio Managers and Directors conduct interviews based on the role requirements, as well as the content you have showcased to us on your CVs. Fundamentally, the interview is our opportunity to know more about yourself, so we encourage all applicants to refresh their experiences, because we would ask more about them! Overall, we hope you use the interview to showcase your passions and skillsets to us with confidence, and we look forward to hearing about your stories and experiences that have shaped you into a promising candidate.',
  },
];

const APPLY_URL = 'https://www.google.com';

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
    desc: 'Generate long and short ideas across Singapore and global equity markets — combining fundamental analysis with thematic conviction across L/S, event-driven, and relative value strategies.',
  },
  {
    num: '02',
    title: 'Macro Analyst',
    team: 'Global Macro',
    teamLink: '/people#global-macro-commodities',
    desc: 'Build discretionary macro views across fixed income, currencies, and equity indices — translating global economic narratives into positioned conviction across FICC markets.',
  },
  {
    num: '03',
    title: 'Systematic Strategies Analyst',
    team: 'Systematic Strategies',
    teamLink: '/people#systematic-strategies',
    desc: "Embed quantitative, data-driven analysis into the fund's investment process — researching signals and lending a quantitative dimension to the asset pods' market views.",
  },
  {
    num: '04',
    title: 'Commodities Analyst',
    team: 'Commodities',
    teamLink: '/people#global-macro-commodities',
    desc: 'Trade energy and metals with strategies grounded in both micro and macro fundamentals — from supply-demand balances to positioning, flows, and cross-commodity relative value.',
  },
];

const operationsRoles: Role[] = [
  {
    num: '05',
    title: 'Developer Analyst',
    team: 'Operations',
    teamLink: '/people#operations',
    desc: 'Build and maintain the systems, tooling, and infrastructure that give a live student fund institutional-grade oversight.',
  },
  {
    num: '06',
    title: 'Fund Development Analyst',
    team: 'Operations',
    teamLink: '/people#operations',
    desc: "Drive the fund's long-term growth — partnerships, external relations, and the initiatives that expand NUSSIF's reach, standing, and capital base.",
  },
  {
    num: '07',
    title: 'Marketing & Brand Analyst',
    team: 'Operations',
    teamLink: '/people#operations',
    desc: 'Own how NUSSIF shows up to the world — the brand, content, and communications that reflect the standard of the fund behind them.',
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
              className={`font-display font-medium mb-4 transition-all duration-500 group-hover:translate-x-2 ${
                dark
                  ? 'text-primary-foreground group-hover:text-[hsl(var(--gold))]'
                  : 'text-foreground group-hover:text-primary'
              }`}
              style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3rem)' }}
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

/* ─── FAQ accordion — a single item ─── */
function FaqItem({
  q,
  a,
  index,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="border-t border-border last:border-b"
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="group w-full flex items-start gap-6 md:gap-10 py-7 md:py-9 text-left"
      >
        {/* Plus that rotates into an × */}
        <span
          className={`relative flex-shrink-0 mt-[0.35em] w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? 'rotate-[135deg]' : 'rotate-0'
          }`}
        >
          <span
            className={`absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 transition-colors duration-300 ${
              open ? 'bg-[hsl(var(--gold))]' : 'bg-foreground/70 group-hover:bg-foreground'
            }`}
          />
          <span
            className={`absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 transition-colors duration-300 ${
              open ? 'bg-[hsl(var(--gold))]' : 'bg-foreground/70 group-hover:bg-foreground'
            }`}
          />
        </span>

        <span
          className={`flex-1 font-body font-normal leading-snug transition-colors duration-300 ${
            open ? 'text-primary' : 'text-foreground group-hover:text-primary'
          }`}
          style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.4rem)' }}
        >
          {q}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p
              className="pl-11 md:pl-[3.75rem] pr-4 pb-8 md:pb-10 -mt-1 font-body font-light text-muted-foreground leading-[1.9] max-w-3xl"
              style={{ fontSize: 'var(--text-base)' }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── FAQ section — single-open accordion, Millennium-style ─── */
function RecruitmentFaqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="section-padding bg-background scroll-mt-24">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 md:mb-20"
        >
          <div className="w-12 h-px bg-gold mb-10" />
          <span className="eyebrow block mb-4" style={{ color: 'hsl(var(--gold))' }}>
            FAQ
          </span>
          <h2 className="heading-section">Frequently Asked Questions</h2>
        </motion.div>

        <div>
          {faqs.map((f, i) => (
            <FaqItem
              key={i}
              index={i}
              q={f.q}
              a={f.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RecruitmentPage() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      <PageHero
        image={heroImage}
        title="Recruitment"
        subtitle="Seven analyst seats across two divisions. One application. A live fund from day one."
      >
        <button
          onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
          className="gold-link"
        >
          → Apply Now
        </button>
      </PageHero>

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
                Every member of NUSSIF operates inside a live fund — with real capital, real
                accountability, and mentorship from practitioners across the global buy-side.
                Whether your instincts lean toward markets or toward building the institution
                behind them, there is a seat here designed for you to own.
              </p>
            </motion.div>

            <motion.div
              className="lg:col-span-4 lg:col-start-9"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="space-y-10">
                {[
                  { figure: '07', label: 'Open Positions' },
                  { figure: '02', label: 'Divisions' },
                  { figure: '01', label: 'Application' },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-baseline gap-6 border-b border-border pb-6">
                    <span
                      className="font-display font-light leading-none"
                      style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'hsl(var(--gold))' }}
                    >
                      {stat.figure}
                    </span>
                    <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
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
                  Four specialist pods, each lean and accountable for its own returns. Investing
                  analysts research, debate, and help run live positions across global markets.
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

      {/* Frequently Asked Questions */}
      <RecruitmentFaqs />

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
            However you see yourself contributing — every path into NUSSIF begins with the same
            application.
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
