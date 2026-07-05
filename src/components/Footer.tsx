import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  const footerCards = [
    {
      title: "About Us",
      links: [
        { text: "Who We Are", href: "/#who-we-are", internal: true },
        { text: "Our Culture", href: "/#culture", internal: true },
        { text: "Achievements", href: "/#achievements", internal: true },
        { text: "Partners", href: "/#partners", internal: true },
      ],
    },
    {
      title: "Program",
      links: [
        { text: "Philosophy", href: "/program#philosophy", internal: true },
        { text: "Analyst Pipeline", href: "/program#analyst-pipeline", internal: true },
        { text: "Investment Mandate", href: "/program#mandate", internal: true },
      ],
    },
    {
      title: "People",
      links: [
        { text: "Leadership", href: "/people#leadership", internal: true },
        { text: "Investing Teams", href: "/people#investing", internal: true },
        { text: "Operations", href: "/people#operations", internal: true },
        { text: "LinkedIn", href: "https://www.linkedin.com/company/nussif", external: true },
      ],
    },
    {
      title: "Recruitment",
      links: [
        { text: "Investing Roles", href: "/recruitment#investing-roles", internal: true },
        { text: "Operations Roles", href: "/recruitment#operations-roles", internal: true },
        { text: "Apply Now", href: "https://forms.office.com/Pages/ShareFormPage.aspx?id=Xu-lWwkxd06Fvc_rDTR-ghbuzO_hwkFNmR1TLDctiJBUME1NVUdYQzNGNlVOSzdKQkhWSUY3MUI0UC4u&sharetoken=TGc4Xqw46sMkbulMbeRJ", external: true },
      ],
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-navy-deep text-primary-foreground">
      {/* Subtle top border line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[hsl(var(--gold)/0.3)] to-transparent" />

      <div className="container-site py-16 md:py-24">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr] gap-12 lg:gap-0">
          {/* Branding column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between space-y-8 pr-8"
          >
            <div>
              <span className="font-display font-semibold tracking-[0.25em] text-lg text-primary-foreground">
                NUSSIF
              </span>
            </div>

            <div>
              <h3 className="font-display text-lg font-light tracking-tight text-primary-foreground/80 sm:text-xl leading-relaxed">
                Asia's premier live student fund,
                <br />
                built by students
              </h3>
            </div>

            <div className="mt-auto">
              <p className="font-body text-xs text-primary-foreground/40 tracking-wide">
                National University of Singapore
              </p>
            </div>
          </motion.div>

          {/* Link columns */}
          {footerCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden border border-primary-foreground/10 p-8 transition-colors duration-500 hover:bg-primary-foreground/[0.03] ${
                index > 0 ? 'lg:-ml-px' : ''
              }`}
            >
              <h4 className="mb-8 font-body text-[10px] uppercase tracking-[0.2em] text-primary-foreground/40">
                {card.title}
              </h4>
              <ul className="space-y-4">
                {card.links.map((link) => (
                  <li key={link.text}>
                    {link.internal ? (
                      <Link
                        to={link.href}
                        className="inline-flex font-body font-light items-center gap-1 text-sm text-primary-foreground/60 transition-colors duration-300 hover:text-primary-foreground"
                      >
                        {link.text}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex font-body font-light items-center gap-1 text-sm text-primary-foreground/60 transition-colors duration-300 hover:text-primary-foreground"
                      >
                        {link.text}
                        {link.external && <ArrowUpRight className="h-3 w-3" />}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Large NUSSIF wordmark */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="relative flex items-center justify-center overflow-hidden py-12 md:py-20 mt-8"
        >
          <div className="w-full px-4" aria-hidden="true">
            <svg
              viewBox="0 0 600 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="fill-primary-foreground/[0.06]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "72px",
                  fontWeight: 500,
                  letterSpacing: "0.3em",
                }}
              >
                NUSSIF
              </text>
            </svg>
          </div>
        </motion.div>

        {/* Copyright */}
        <div className="border-t border-primary-foreground/[0.06] pt-6 text-center">
          <p className="font-body text-[10px] text-primary-foreground/30 tracking-[0.15em] uppercase">
            &copy; NUSSIF. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
