import { useState, useCallback, useEffect } from 'react';

interface VideoModalProps {
  vimeoId?: string;
  thumbnailUrl?: string;
  title?: string;
  subtitle?: string;
}

export default function VideoModal({
  vimeoId = 'VIDEO_ID',
  thumbnailUrl,
  title = 'NUSSIF — Speaker Talk',
  subtitle = 'Panel • 2026 • 1:12:00',
}: VideoModalProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, close]);

  return (
    <>
      {/* Thumbnail */}
      <section className="bg-background py-16 md:py-24">
        <div className="container-site flex justify-center">
          <div
            role="button"
            tabIndex={0}
            aria-label="Open video"
            onClick={() => setOpen(true)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(true); } }}
            className="relative w-full max-w-[1100px] rounded-xl overflow-hidden cursor-pointer shadow-[0_10px_36px_rgba(0,0,0,0.14)]"
            style={{ paddingTop: '56.25%', backgroundImage: thumbnailUrl ? `url('${thumbnailUrl}')` : undefined, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: 'hsl(var(--navy-deep))' }}
          >
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-card flex items-center justify-center shadow-lg">
                <svg width="40" height="40" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" fill="hsl(var(--foreground))" />
                </svg>
              </div>
            </div>

            {/* Meta */}
            <div className="absolute left-5 bottom-5 text-left">
              <div className="font-display font-semibold text-lg text-primary-foreground drop-shadow-lg">{title}</div>
              <div className="font-body text-sm text-primary-foreground/90 mt-1 drop-shadow-lg">{subtitle}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-foreground/60 p-5"
          role="dialog"
          aria-label="Video player"
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
        >
          <div className="relative w-full max-w-[1200px] rounded-xl overflow-hidden" style={{ paddingTop: '56.25%', backgroundColor: 'hsl(var(--navy-deep))' }}>
            <button
              onClick={close}
              aria-label="Close video"
              className="absolute top-3 right-3 z-10 bg-card/90 rounded-md px-2 py-1 font-semibold text-foreground cursor-pointer"
            >
              ✕
            </button>
            <iframe
              className="absolute inset-0 w-full h-full border-0"
              src={`https://player.vimeo.com/video/${encodeURIComponent(vimeoId)}?autoplay=1&muted=0&title=0&byline=0&portrait=0`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
