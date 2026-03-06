interface HeroSectionProps {
  image: string;
  title: string;
  subtitle: string;
  fullHeight?: boolean;
  children?: React.ReactNode;
}

export default function HeroSection({ image, title, subtitle, fullHeight = false, children }: HeroSectionProps) {
  return (
    <section
      className={`relative ${fullHeight ? 'min-h-screen' : 'min-h-[60vh]'} flex items-center justify-center overflow-hidden`}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-navy-deep/[0.72]" />
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <h1 className="font-display font-medium text-primary-foreground text-4xl md:text-5xl lg:text-6xl tracking-wide leading-tight">
          {title}
        </h1>
        <p className="mt-6 font-body font-light text-primary-foreground/70 text-base md:text-lg">
          {subtitle}
        </p>
        {children}
      </div>
      {fullHeight && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-[1px] h-8 bg-primary-foreground/30" />
        </div>
      )}
    </section>
  );
}
