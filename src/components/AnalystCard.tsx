import { Linkedin } from 'lucide-react';

interface AnalystCardProps {
  name: string;
  email?: string;
  linkedIn?: string;
  photo?: string;
}

export default function AnalystCard({ name, email, linkedIn, photo }: AnalystCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-muted mb-3">
        {photo ? (
          <img src={photo} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-2xl font-display">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <h4 className="font-display font-medium text-base text-foreground">{name}</h4>
      <div className="flex items-center gap-3 mt-2">
        {linkedIn && (
          <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors" aria-label={`${name} LinkedIn`}>
            <Linkedin size={14} />
          </a>
        )}
        {email && (
          <a href={`mailto:${email}`} className="font-body text-[11px] text-muted-foreground hover:text-foreground transition-colors">
            {email}
          </a>
        )}
      </div>
    </div>
  );
}
