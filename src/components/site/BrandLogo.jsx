export default function BrandLogo({ className = '' }) {
  return (
    <span
      role="img"
      aria-label="Link Marketing Services"
      className={`relative inline-flex shrink-0 flex-col justify-center overflow-visible ${className}`}
    >
      <span
        className="relative block font-serif text-[36px] font-bold leading-[0.78] tracking-[0.045em] text-[#f5edde]"
        style={{
          textShadow:
            '-1px -1px 0 #006c75, 1px -1px 0 #006c75, -1px 1px 0 #003940, 1px 1px 0 #003940, 0 2px 5px rgba(0,0,0,.55)',
        }}
      >
        LI<span className="relative">N<span className="absolute -right-[2px] top-[1px] h-[12px] w-[9px] -skew-y-[35deg] bg-[#008b95]" /></span>K
      </span>
      <span className="mt-[7px] block h-[2px] w-full bg-gradient-to-r from-[#00747d] via-[#16a1a8] to-[#00616a] shadow-[0_1px_2px_rgba(0,0,0,.55)]" />
      <span
        className="mt-[5px] block whitespace-nowrap text-[7px] font-bold uppercase leading-none tracking-[0.235em] text-[#e7ddcb]"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,.7)' }}
      >
        Marketing Services
      </span>
      <span className="pointer-events-none absolute right-[5px] top-[21px] h-[19px] w-[8px] rotate-[-38deg] bg-gradient-to-b from-[#0c9da5] to-[#00545d] shadow-[0_1px_2px_rgba(0,0,0,.55)]" />
    </span>
  );
}
