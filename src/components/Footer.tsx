import { Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-primary-foreground">
      <div className="container-site">
        <div className="border-t border-primary-foreground/10" />
        <div className="py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-display font-semibold tracking-[0.25em] text-sm">NUSSIF</span>
          <p className="font-body text-xs text-primary-foreground/60 text-center max-w-lg">
            The National University of Singapore Student Investment Fund — Singapore
          </p>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
        </div>
        <div className="border-t border-primary-foreground/10 py-6 text-center">
          <p className="font-body text-[11px] text-primary-foreground/40 tracking-wide">
            © NUSSIF. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
