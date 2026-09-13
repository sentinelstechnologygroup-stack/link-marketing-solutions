import { Link } from 'react-router-dom';
import { ArrowLeft, Check, LockKeyhole, ShieldCheck } from 'lucide-react';
import BrandLogo from '@/components/site/BrandLogo';

export default function PortalLoginShell({
  eyebrow,
  title,
  subtitle,
  badge,
  children,
  footer,
}) {
  return (
    <main className="min-h-screen bg-[#071b1e] text-white lg:grid lg:grid-cols-[1.05fr_.95fr]">
      <section className="relative hidden overflow-hidden border-r border-white/10 lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,131,143,.28),transparent_38%),radial-gradient(circle_at_85%_85%,rgba(212,175,55,.14),transparent_32%)]" />
        <div className="absolute inset-0 opacity-[.08] [background:repeating-linear-gradient(120deg,transparent_0_24px,#d4af37_25px_26px)]" />
        <div className="relative">
          <Link to="/" aria-label="Return to Link Marketing Services">
            <BrandLogo className="h-[74px] w-[230px]" />
          </Link>
        </div>
        <div className="relative max-w-xl">
          <p className="editorial-kicker">Secure access</p>
          <h2 className="mt-5 text-5xl leading-[1.04]">Your program, performance, and conversations—connected.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              'Tenant-isolated workspace',
              'Multi-factor authentication',
              'Encrypted session cookies',
              'Complete access history',
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 border-t border-white/12 pt-4 text-sm text-white/68">
                <Check className="h-4 w-4 text-[#e0bd55]" /> {item}
              </div>
            ))}
          </div>
        </div>
        <p className="relative text-xs text-white/38">Link Marketing Services · Secure portal access</p>
      </section>

      <section className="flex min-h-screen items-center justify-center bg-[#f5f2eb] px-5 py-10 text-[#071b1e] sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-9 flex items-center justify-between lg:hidden">
            <BrandLogo className="h-[60px] w-[190px]" />
            <Link to="/" className="rounded-full border border-[#071b1e]/12 p-2 text-[#385054]" aria-label="Back to website">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>

          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-[#8d6919]">
            <ShieldCheck className="h-3.5 w-3.5" /> {badge}
          </div>
          <p className="text-xs font-bold uppercase tracking-[.22em] text-[#00838f]">{eyebrow}</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-[44px]">{title}</h1>
          <p className="mt-4 text-sm leading-6 text-[#536367]">{subtitle}</p>

          <div className="mt-8 rounded-2xl border border-[#071b1e]/10 bg-white p-5 shadow-[0_24px_70px_-38px_rgba(0,40,45,.45)] sm:p-7">
            {children}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#071b1e]/8 bg-[#ece8df] p-4 text-xs leading-5 text-[#5c6869]">
            <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-[#00838f]" />
            <p>Credentials are never stored in this website. Authentication is delegated to the connected portal service using secure, server-managed sessions.</p>
          </div>
          {footer}
        </div>
      </section>
    </main>
  );
}
