import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Container, CTAButton, SectionHeading, Reveal } from './ui';

export default function IndustryPage({ industry }) {
  const Icon = industry.icon;
  return (
    <>
      <section className="relative pt-36 pb-20 overflow-hidden bg-[#00282d]">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div
          className={`absolute -top-20 right-0 h-96 w-96 rounded-full bg-gradient-to-br ${industry.gradient} blur-3xl opacity-50`}
        />
        <Container className="relative">
          <Reveal>
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 text-sm text-[#9fb3b3] hover:text-[#d4af37] mb-8 transition-colors"
            >
              <ArrowRight className="h-4 w-4 rotate-180" /> All Industries
            </Link>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30">
                <Icon className="h-7 w-7 text-[#d4af37]" />
              </div>
              <span className="text-sm uppercase tracking-[0.2em] text-[#9fb3b3]">{industry.name}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-4xl leading-[1.05]">
              {industry.headline}
            </h1>
            <p className="mt-6 text-lg text-[#9fb3b3] max-w-2xl leading-relaxed">{industry.intro}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <CTAButton to="/get-started">Build My Lead Program</CTAButton>
              <CTAButton to="/how-it-works" variant="onDark">
                See How It Works
              </CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20 border-t border-[#00282d]/8">
        <Container>
          <SectionHeading
            eyebrow="What We Handle"
            title={`Link responds, qualifies, and routes ${industry.name.toLowerCase()} inquiries`}
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industry.focusPoints.map((p, i) => (
              <Reveal key={p} delay={(i % 3) * 0.05}>
                <div className="card-light rounded-xl p-6 h-full hover:border-[#d4af37]/40 transition-colors">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[#d4af37] mt-0.5 shrink-0" />
                    <span className="text-[#3a4a4c]">{p}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 border-t border-[#d4af37]/10 bg-[#00282d]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="How We Qualify"
                onDark
                title="Every conversation is measured against your definition of qualified"
                align="left"
              />
              <ul className="mt-8 space-y-3">
                {industry.qualifications.map((q) => (
                  <li key={q} className="flex items-center gap-3 text-[#cddede]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37]" />
                    {q}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionHeading eyebrow="Outcomes" onDark title="What your sales team receives" align="left" />
              <ul className="mt-8 space-y-3">
                {industry.outcomes.map((o) => (
                  <li key={o} className="flex items-center gap-3 text-[#cddede]">
                    <ArrowRight className="h-4 w-4 text-[#d4af37]" />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          {industry.disclaimer && (
            <p className="mt-12 text-sm text-[#9fb3b3] border-l-2 border-[#d4af37]/40 pl-4 max-w-3xl leading-relaxed">
              {industry.disclaimer}
            </p>
          )}
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <Reveal>
            <div className="card-surface rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px pulse-line" />
              <h2 className="text-3xl md:text-4xl font-bold text-white max-w-2xl mx-auto">
                Ready to turn {industry.name.toLowerCase()} inquiries into conversations?
              </h2>
              <p className="mt-4 text-[#9fb3b3] max-w-xl mx-auto">
                Tell us about your lead flow and we will build a program around your definition of a qualified
                opportunity.
              </p>
              <div className="mt-8 flex justify-center">
                <CTAButton to="/get-started">Build My Lead Program</CTAButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}