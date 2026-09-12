import { Link } from 'react-router-dom';
import { Container } from './ui';

const COLS = [
  {
    title: 'Services',
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
      { label: 'All Industries', to: '/industries' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'How It Works', to: '/how-it-works' },
      { label: 'About', to: '/about' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'FAQ', to: '/faq' },
      { label: 'Get Started', to: '/get-started' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
      { label: 'Communications Policy', to: '/communications-policy' },
      { label: 'Accessibility', to: '/accessibility' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080d1a]">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00E5FF]" />
              </span>
              <span className="text-lg font-bold tracking-tight text-white">
                LINK<span className="text-[#00E5FF]">.</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-[#94A3B8] leading-relaxed max-w-xs">
              We help businesses turn leads into real conversations and qualified opportunities.
            </p>
            <p className="mt-6 text-sm font-medium text-white">LinkMarketingServices.com</p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#94A3B8] font-semibold mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-[#cbd5e1] hover:text-[#00E5FF] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <p className="text-xs text-[#94A3B8] leading-relaxed max-w-xl">
            Link Business Alliance LLC d/b/a Link Marketing Solutions. All rights reserved.
          </p>
          <p className="text-xs text-[#94A3B8]">
            &copy; {new Date().getFullYear()} Link Marketing Solutions
          </p>
        </div>
      </Container>
    </footer>
  );
}