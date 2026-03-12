import { Linkedin } from 'lucide-react';

interface AnalystCardProps {
  name: string;
  email?: string;
  linkedIn?: string;
}

export default function AnalystCard({ name, email, linkedIn }: AnalystCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <h4 className="font-display font-medium text-base text-foreground">{name}</h4>
      <div className="flex items-center gap-3 mt-1">
        {linkedIn && (
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors"
            aria-label={`${name} LinkedIn`}
          >
            <Linkedin size={14} />
          </a>
        )}
        {email && (
          <a
            href={`mailto:${email}`}
            className="font-body text-[11px] text-muted-foreground hover:text-foreground transition-colors"
          >
            {email}
          </a>
        )}
      </div>
    </div>
  );
}
