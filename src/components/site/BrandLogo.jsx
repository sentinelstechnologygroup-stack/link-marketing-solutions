import { useState } from 'react';
import linkMarketingLogoData from '@/assets/linkMarketingLogoData';

export default function BrandLogo({ className = '' }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <svg
      viewBox="0 0 600 211"
      role="img"
      aria-label="Link Marketing Services"
      className={className}
      preserveAspectRatio="xMinYMid meet"
    >
      <defs>
        <linearGradient id="link-metallic" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff9e9" />
          <stop offset="48%" stopColor="#d9cbb4" />
          <stop offset="100%" stopColor="#9c8e78" />
        </linearGradient>
        <linearGradient id="link-teal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00a6ae" />
          <stop offset="100%" stopColor="#004d55" />
        </linearGradient>
      </defs>

      {imageFailed ? (
        <g>
          <text
            x="8"
            y="145"
            fill="url(#link-metallic)"
            stroke="url(#link-teal)"
            strokeWidth="4"
            paintOrder="stroke"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="176"
            fontWeight="700"
            letterSpacing="3"
          >
            LINK
          </text>
          <rect x="138" y="158" width="326" height="6" rx="3" fill="url(#link-teal)" />
          <text
            x="9"
            y="204"
            fill="#e9deca"
            fontFamily="Arial, sans-serif"
            fontSize="26"
            fontWeight="700"
            letterSpacing="8.2"
          >
            MARKETING SERVICES
          </text>
        </g>
      ) : (
        <image
          href={linkMarketingLogoData}
          x="0"
          y="0"
          width="600"
          height="211"
          preserveAspectRatio="xMinYMid meet"
          onError={() => setImageFailed(true)}
        />
      )}
    </svg>
  );
}
