import { useState } from 'react';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PersonCard from './PersonCard';
import AnalystCard from './AnalystCard';

interface Leader {
  name: string;
  role: string;
  email?: string;
  linkedIn?: string;
  headshot?: string;
}

interface Analyst {
  name: string;
  email?: string;
  linkedIn?: string;
}

interface TeamCapsuleProps {
  name: string;
  description: string;
  teamPhoto?: string;
  imagePosition?: string;
  leaders: Leader[];
  analysts: Analyst[];
  leadersLabel?: string;
  index?: string;
}

export default function TeamCapsule({
  name,
  description,
  teamPhoto,
  imagePosition = 'center top',
  leaders,
  analysts,
  leadersLabel = 'Portfolio Managers',
  index,
}: TeamCapsuleProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="overflow-hidden border border-border/30 transition-all duration-700 hover:border-border/60 group/capsule">
      {/* Header — always visible */}
      <div
        className="relative h-[420px] md:h-[500px] cursor-pointer select-none overflow-hidden"
        onClick={() => setExpanded((v) => !v)}
      >
        {teamPhoto ? (
          <img
            src={teamPhoto}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/capsule:scale-[1.04]"
            style={{ objectPosition: imagePosition }}
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, hsl(220,55%,10%) 0%, hsl(218,55%,22%) 55%, hsl(37,30%,28%) 100%)',
            }}
          />
        )}

        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

        {/* Team index numeral — top left */}
        {index && (
          <div className="absolute top-8 left-8 md:top-10 md:left-12 flex items-center gap-5">
            <span
              className="font-display font-light leading-none select-none"
              style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)', color: 'hsl(var(--gold) / 0.9)' }}
            >
              {index}
            </span>
            <span className="hidden md:block w-12 h-px bg-[hsl(var(--gold)/0.5)]" />
          </div>
        )}

        {/* Bottom bar */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-8 md:px-12 pb-8 md:pb-12 gap-6">
          <div className="flex-1 min-w-0">
            <h3
              className="font-display font-medium text-white tracking-wide leading-[1.05]"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              {name}
            </h3>
            <p
              className={`mt-4 font-body font-light text-white/50 text-sm leading-relaxed line-clamp-2 max-w-2xl transition-all duration-500 ${
                expanded ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              {description}
            </p>
          </div>

          <button
            className={`flex-shrink-0 w-14 h-14 rounded-full border backdrop-blur-sm flex items-center justify-center text-white transition-all duration-500 ${
              expanded
                ? 'rotate-45 border-[hsl(var(--gold)/0.7)] bg-[hsl(var(--gold)/0.15)]'
                : 'border-white/25 bg-white/[0.07] hover:bg-white/15 hover:border-white/40'
            }`}
            aria-label={expanded ? 'Collapse team' : 'Expand team'}
          >
            <Plus size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Expanded members panel */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-background px-8 md:px-12 py-14 border-t border-border/30">
              <div className="w-10 h-px bg-[hsl(var(--gold)/0.6)] mb-8" />
              <p className="body-text max-w-2xl mb-14 text-muted-foreground leading-[1.85]">{description}</p>

              <p className="eyebrow mb-10" style={{ color: 'hsl(var(--gold))' }}>{leadersLabel}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {leaders.map((l) => (
                  <PersonCard key={l.name} {...l} />
                ))}
              </div>

              {analysts.length > 0 && (
                <div className="mt-16 pt-12 border-t border-border/50">
                  <p className="eyebrow mb-10">Analysts</p>
                  {/* Ledger grid — hairline cells */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-t border-l border-border">
                    {analysts.map((a, i) => (
                      <div
                        key={`${a.name}-${i}`}
                        className="bg-background border-r border-b border-border flex items-center justify-center py-7 px-4 transition-colors duration-300 hover:bg-muted/50"
                      >
                        <AnalystCard {...a} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
