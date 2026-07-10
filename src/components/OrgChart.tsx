import { Link } from "react-router-dom";
import { motion } from "motion/react";

const investingTeams = [
  { name: "L/S Equities", anchor: "ls-equities" },
  { name: "Global Macro", anchor: "global-macro-commodities" },
  { name: "Commodities", anchor: "global-macro-commodities" },
  { name: "Systematic Strategies", anchor: "systematic-strategies" },
];

const operationsTeams = [
  { name: "Developers", anchor: "operations" },
  { name: "Externals", anchor: "operations" },
  { name: "Fund Development", anchor: "operations" },
];

export default function OrgChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Leadership */}
      <div className="flex flex-col items-center mb-20">
        <p className="eyebrow mb-3" style={{ color: 'hsl(var(--gold))' }}>Leadership</p>
        <Link
          to="/people#leadership"
          className="font-display font-normal text-foreground text-2xl md:text-3xl tracking-tight hover:text-primary transition-colors duration-500"
        >
          NUSSIF Leadership Team
        </Link>
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 w-px h-12 bg-border origin-top"
        />
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Investing Teams */}
        <div className="border-b md:border-b-0 md:border-r border-border pb-14 md:pb-0 md:pr-16 lg:pr-24">
          <p className="eyebrow mb-12" style={{ color: 'hsl(var(--gold))' }}>
            Investing Teams
          </p>
          <ul className="space-y-8">
            {investingTeams.map((team, i) => (
              <motion.li
                key={team.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center gap-5"
              >
                <span className="block h-px w-5 bg-border group-hover:w-10 group-hover:bg-[hsl(var(--gold))] transition-all duration-500 shrink-0" />
                <Link
                  to={`/people#${team.anchor}`}
                  className="font-display text-foreground text-xl md:text-2xl tracking-tight group-hover:text-primary transition-colors duration-500"
                >
                  {team.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Operations Teams */}
        <div className="pt-14 md:pt-0 md:pl-16 lg:pl-24">
          <p className="eyebrow mb-12" style={{ color: 'hsl(var(--gold))' }}>
            Operations Teams
          </p>
          <ul className="space-y-8">
            {operationsTeams.map((team, i) => (
              <motion.li
                key={team.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 + 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center gap-5"
              >
                <span className="block h-px w-5 bg-border group-hover:w-10 group-hover:bg-[hsl(var(--gold))] transition-all duration-500 shrink-0" />
                <Link
                  to={`/people#${team.anchor}`}
                  className="font-display text-foreground text-xl md:text-2xl tracking-tight group-hover:text-primary transition-colors duration-500"
                >
                  {team.name}
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
