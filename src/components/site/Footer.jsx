import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from './ui';
import linkMarketingLogo from '@/assets/link-marketing-services-logo.png';

const COLS = [
  {
    title: 'Solutions',
    links: [
      { label: 'Lead Response', to: '/services' },
      { label: 'Lead Qualification', to: '/services' },
      { label: 'Appointment Setting', to: '/services' },
      { label: 'Live Transfers', to: '/services' },
      { label: 'Database Reactivation', to: '/services' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Real Estate', to: '/industries/real-estate' },
      { label: 'Roofing', to: '/industries/roofing' },
      { label: 'HVAC', to: '/industries/hvac' },
      { label: 'Dog Training', to: '/industries/dog-training' },
      { label: 'More Industries', to: '/industries' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Why Link', to: '/about' },
      { label: 'Our Process', to: '/how-it-works' },
      { label: 'Resources', to: '/faq' },
      { label: 'Contact', to: '/get-started' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Communications Policy', to: '/communications-policy' },
      { label: 'Accessibility', to: '/accessibility' },
    ],
  },
];

function Wordmark() {
  const [logoFailed, setLogoFailed] = useState(false);

  if (logoFailed) {
    return (
      <span className="flex flex-col leading-none text-white" aria-label="Link Marketing Services">
        <span className="font-serif text-[34px] tracking-[0.08em]">LINK</span>
        <span className="mt-1.5 text-[8px] font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
          Marketing Services
        </span>
      </span>
    );
  }

  return (
    <img
      src={linkMarketingLogo}
      alt="Link Marketing Services"
      className="h-auto w-[190px] object-contain"
      onError={() => setLogoFailed(true)}
    />
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[#d4af37]/20 bg-[#061a1d] text-white">
      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1.45fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" aria-label="Link Marketing Services home"><Wordmark /></Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
              We help businesses turn new inquiries and existing databases into qualified conversations.
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[.15em] text-[#d4af37]">LinkMarketingServices.com</p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-[10px] font-bold uppercase tracking-[.22em] text-[#d4af37]">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-xs text-white/60 transition-colors hover:text-[#e0bd55]">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-7 text-[11px] text-white/40 md:flex-row">
          <p>Link Marketing Services is operated by Link Business Alliance LLC.</p>
          <p>&copy; {new Date().getFullYear()} Link Marketing Services. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
