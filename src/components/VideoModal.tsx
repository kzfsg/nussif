interface VideoModalProps {
  vimeoId?: string;
}

export default function VideoModal({ vimeoId = 'VIDEO_ID' }: VideoModalProps) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-site flex justify-center">
        <div
          className="relative w-full max-w-[1100px] rounded-xl overflow-hidden shadow-[0_10px_36px_rgba(0,0,0,0.14)]"
          style={{ paddingTop: '56.25%' }}
        >
          <iframe
            className="absolute inset-0 w-full h-full border-0"
            src={`https://player.vimeo.com/video/${encodeURIComponent(vimeoId)}?autoplay=1&muted=1&loop=1&title=0&byline=0&portrait=0&controls=1`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
