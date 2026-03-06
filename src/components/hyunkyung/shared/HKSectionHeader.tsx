interface HKSectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}

export default function HKSectionHeader({ badge, title, subtitle, align = 'center' }: HKSectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''}`}>
      {badge && (
        <span className="inline-block px-3 py-1 bg-[var(--hk-gold-light)] text-[var(--hk-gold)] rounded text-sm font-semibold mb-3">
          {badge}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--hk-navy)] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#64748B] text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
