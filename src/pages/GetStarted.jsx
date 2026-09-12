import { useState } from 'react';
import { Container, CTAButton, SectionHeading, Reveal } from '@/components/site/ui';
import { INDUSTRIES } from '@/components/site/industries';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const VOLUMES = ['Less than 50', '50–200', '200–500', '500–1,000', '1,000+'];
const SOURCES = ['Web forms', 'PPC / Ads', 'SEO', 'Social media', 'Outbound', 'Referrals', 'Other'];
const SERVICES = [
  'Lead Generation',
  'Lead Response',
  'Lead Qualification',
  'Appointment Setting',
  'Live Transfers',
  'Lead Nurturing',
  'Database Reactivation',
  'Reporting',
];

const inputCls =
  'w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-[#94A3B8]/60 focus:border-[#00E5FF] focus:outline-none transition-colors';

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#cbd5e1] mb-2">{label}</label>
      {children}
    </div>
  );
}

export default function GetStarted() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    industry: '',
    volume: '',
    name: '',
    company: '',
    website: '',
    email: '',
    phone: '',
    market: '',
    sources: [],
    services: [],
    notes: '',
  });
  const [done, setDone] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggle = (k, v) =>
    setForm((f) => {
      const arr = f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v];
      return { ...f, [k]: arr };
    });

  const canNext = step === 1 ? form.industry : step === 2 ? form.volume : form.name && form.email;

  const submit = (e) => {
    e.preventDefault();
    setDone(true);
  };

  if (done) {
    return (
      <section className="pt-40 pb-32 relative">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <Container className="relative">
          <Reveal className="text-center max-w-2xl mx-auto">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 glow-cyan">
              <Check className="h-8 w-8 text-[#00E5FF]" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Request received.</h1>
            <p className="mt-4 text-lg text-[#94A3B8]">
              Our team is reviewing your {form.industry || 'business'} profile. Prepare for a conversation — we
              will be in touch within one business day.
            </p>
            <div className="mt-10">
              <CTAButton to="/" variant="ghost">
                Back to Home
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section className="pt-36 pb-24 relative">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <Container className="relative max-w-3xl">
        <Reveal>
          <SectionHeading
            eyebrow="Get Started"
            title="Request your program review"
            subtitle="Tell us about your business and lead flow. We will build a program around your definition of a qualified opportunity."
            align="left"
          />
        </Reveal>

        <div className="mt-10 flex items-center gap-2">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={cn(
                'h-1 flex-1 rounded-full transition-colors',
                n <= step ? 'bg-[#00E5FF]' : 'bg-white/10'
              )}
            />
          ))}
        </div>
        <p className="mt-3 text-sm text-[#94A3B8]">Step {step} of 3</p>

        <form onSubmit={submit} className="mt-8">
          {step === 1 && (
            <Reveal>
              <label className="block text-lg font-semibold text-white mb-6">
                Which industry are we scaling?
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {INDUSTRIES.map((ind) => {
                  const Icon = ind.icon;
                  const active = form.industry === ind.name;
                  return (
                    <button
                      type="button"
                      key={ind.slug}
                      onClick={() => set('industry', ind.name)}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl p-4 text-left border transition-all',
                        active
                          ? 'border-[#00E5FF] bg-[#00E5FF]/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      )}
                    >
                      <Icon className={cn('h-5 w-5', active ? 'text-[#00E5FF]' : 'text-[#94A3B8]')} />
                      <span className={cn('text-sm font-medium', active ? 'text-white' : 'text-[#cbd5e1]')}>
                        {ind.name}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-8 flex justify-end">
                <CTAButton type="button" onClick={() => setStep(2)} className={cn(!canNext && 'opacity-40 pointer-events-none')}>
                  Continue <ArrowRight className="h-4 w-4" />
                </CTAButton>
              </div>
            </Reveal>
          )}

          {step === 2 && (
            <Reveal>
              <label className="block text-lg font-semibold text-white mb-6">
                What is your approximate monthly lead volume?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {VOLUMES.map((v) => (
                  <button
                    type="button"
                    key={v}
                    onClick={() => set('volume', v)}
                    className={cn(
                      'rounded-2xl p-4 text-sm font-medium border transition-all',
                      form.volume === v
                        ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-white'
                        : 'border-white/10 bg-white/5 text-[#cbd5e1] hover:border-white/20'
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-between">
                <CTAButton type="button" variant="ghost" onClick={() => setStep(1)}>
                  <ArrowLeft className="h-4 w-4" /> Back
                </CTAButton>
                <CTAButton
                  type="button"
                  onClick={() => setStep(3)}
                  className={cn(!canNext && 'opacity-40 pointer-events-none')}
                >
                  Continue <ArrowRight className="h-4 w-4" />
                </CTAButton>
              </div>
            </Reveal>
          )}

          {step === 3 && (
            <Reveal>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full Name *">
                  <input required value={form.name} onChange={(e) => set('name', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Company">
                  <input value={form.company} onChange={(e) => set('company', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Website">
                  <input value={form.website} onChange={(e) => set('website', e.target.value)} className={inputCls} placeholder="https://" />
                </Field>
                <Field label="Email *">
                  <input type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Phone">
                  <input value={form.phone} onChange={(e) => set('phone', e.target.value)} className={inputCls} />
                </Field>
                <Field label="Market / Location">
                  <input value={form.market} onChange={(e) => set('market', e.target.value)} className={inputCls} />
                </Field>
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-white mb-3">Current lead sources</p>
                <div className="flex flex-wrap gap-2">
                  {SOURCES.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggle('sources', s)}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm border transition-all',
                        form.sources.includes(s)
                          ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-white'
                          : 'border-white/15 text-[#94A3B8] hover:border-white/30'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-white mb-3">Services you need</p>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggle('services', s)}
                      className={cn(
                        'rounded-full px-4 py-2 text-sm border transition-all',
                        form.services.includes(s)
                          ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-white'
                          : 'border-white/15 text-[#94A3B8] hover:border-white/30'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Field label="Notes">
                  <textarea rows={4} value={form.notes} onChange={(e) => set('notes', e.target.value)} className={inputCls} />
                </Field>
              </div>

              <div className="mt-8 flex justify-between">
                <CTAButton type="button" variant="ghost" onClick={() => setStep(2)}>
                  <ArrowLeft className="h-4 w-4" /> Back
                </CTAButton>
                <CTAButton type="submit">
                  Request Program Review <ArrowRight className="h-4 w-4" />
                </CTAButton>
              </div>
            </Reveal>
          )}
        </form>
      </Container>
    </section>
  );
}