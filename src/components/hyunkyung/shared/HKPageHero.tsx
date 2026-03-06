interface HKPageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

export default function HKPageHero({ title, subtitle, breadcrumb }: HKPageHeroProps) {
  return (
    <section className="relative bg-[var(--hk-navy)] py-16 md:py-24 overflow-hidden">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, #C4922A 25%, transparent 25%, transparent 75%, #C4922A 75%)',
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 text-center">
        {breadcrumb && (
          <p className="text-[var(--hk-gold)] text-sm font-medium mb-3 tracking-wider uppercase">
            {breadcrumb}
          </p>
        )}
        <h1 className="!text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
