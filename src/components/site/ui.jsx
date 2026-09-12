import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Container({ className, children }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-6 md:px-10', className)}>{children}</div>;
}

const BTN_BASE =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none';
const BTN_VARIANTS = {
  primary:
    'bg-[#00E5FF] text-[#0A0F1E] hover:bg-[#5beeff] shadow-[0_0_30px_-6px_rgba(0,229,255,0.55)] hover:shadow-[0_0_45px_-6px_rgba(0,229,255,0.75)]',
  ghost:
    'border border-white/15 text-white bg-white/5 backdrop-blur hover:border-[#00E5FF]/50 hover:text-[#00E5FF]',
  outline:
    'border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF]/10',
};
const BTN_SIZES = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-8 py-4 text-base',
};

export function CTAButton({ to, href, onClick, type = 'button', variant = 'primary', size = 'md', className, children }) {
  const classes = cn(BTN_BASE, BTN_VARIANTS[variant], BTN_SIZES[size], className);
  if (to) return <Link to={to} className={classes}>{children}</Link>;
  if (href) return <a href={href} className={classes}>{children}</a>;
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'center', className }) {
  return (
    <div className={cn(align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left', className)}>
      {eyebrow && (
        <div className={cn('inline-flex items-center gap-2.5 mb-5', align === 'center' && 'justify-center')}>
          <span className="h-px w-8 bg-[#00E5FF]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#00E5FF] font-semibold">{eyebrow}</span>
        </div>
      )}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]">{title}</h2>
      {subtitle && <p className="mt-5 text-lg text-[#94A3B8] leading-relaxed">{subtitle}</p>}
    </div>
  );
}

export function Reveal({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function PulseDivider() {
  return (
    <div className="relative h-px w-full">
      <div className="pulse-line absolute inset-0" />
    </div>
  );
}