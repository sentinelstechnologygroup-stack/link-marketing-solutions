import './brand-logo.css';

export default function BrandLogo({ className = '' }) {
  return (
    <span
      role="img"
      aria-label="Link Marketing Services"
      title="Link Marketing Services"
      className={`relative inline-block shrink-0 ${className}`}
    >
      <span className="brand-logo-art" aria-hidden="true" />
    </span>
  );
}
