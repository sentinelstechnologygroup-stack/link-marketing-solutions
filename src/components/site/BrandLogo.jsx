import linkMarketingLogoData from '@/assets/linkMarketingLogoData';

export default function BrandLogo({ className = '' }) {
  return (
    <svg
      viewBox="0 0 600 211"
      role="img"
      aria-label="Link Marketing Services"
      className={className}
      preserveAspectRatio="xMinYMid meet"
    >
      <title>Link Marketing Services</title>
      <image
        href={linkMarketingLogoData}
        x="0"
        y="0"
        width="600"
        height="211"
        preserveAspectRatio="xMinYMid meet"
      />
    </svg>
  );
}
