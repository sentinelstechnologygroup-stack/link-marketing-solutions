import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { CTAButton } from './ui';
import { cn } from '@/lib/utils';

const NAV = [
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Services', to: '/services' },
  { label: 'Industries', to: '/industries' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'FAQ', to: '/faq' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled ? 'glass border-b border-[#00282d]/10 shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-60 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#d4af37]" />
            </span>
            <span className="text-lg font-bold tracking-tight text-[#04181a]">
              LINK<span className="text-[#00838f]">.</span>
            </span>
            <span className="hidden sm:inline text-[11px] uppercase tracking-[0.2em] text-[#4a5a5c] ml-1">
              Marketing Solutions
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-[#4a5a5c] hover:text-[#00838f] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5">
            <span className="flex items-center gap-2 text-sm font-medium text-[#4a5a5c] cursor-not-allowed select-none">
              Client Login
              <span className="rounded-full bg-[#00282d]/8 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#4a5a5c]">
                Soon
              </span>
            </span>
            <CTAButton to="/get-started" size="sm">
              Build My Program
            </CTAButton>
          </div>

          <button
            className="lg:hidden text-[#04181a] p-2 -mr-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-[#00282d]/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="py-3 text-base font-medium text-[#04181a] hover:text-[#00838f] border-b border-[#00282d]/8"
                >
                  {item.label}
                </Link>
              ))}
              <div className="py-3 text-base font-medium text-[#4a5a5c] flex items-center gap-2">
                Client Login
                <span className="rounded-full bg-[#00282d]/8 px-2 py-0.5 text-[10px] uppercase tracking-wider">
                  Soon
                </span>
              </div>
              <CTAButton to="/get-started" className="mt-4">
                Build My Program
              </CTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}