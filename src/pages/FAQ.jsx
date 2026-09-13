import { useState } from 'react';
import { Container, CTAButton, Reveal } from '@/components/site/ui';
import PageHero, { LINK_MEDIA } from '@/components/site/PageHero';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQS = [
  {
    q: 'What does Link Marketing Solutions do?',
    a: 'We respond to your leads, qualify the opportunity, follow up, and connect qualified prospects to your sales team — through booked appointments or live transfers.',
  },
  {
    q: 'Do you sell leads?',
    a: 'No. We work the leads you already generate (and can help generate more). We are not a list broker — we turn your inquiries into conversations.',
  },
  {
    q: 'Can you work with leads we already generate?',
    a: 'Yes. Most clients start by having us work their existing lead sources — web forms, calls, ads, and outbound lists.',
  },
  {
    q: 'What is a qualified lead?',
    a: 'A prospect who matches the criteria we define together — the right fit, intent, timeline, and authority to buy. You set the definition; we measure every conversation against it.',
  },
  {
    q: 'What is a live transfer?',
    a: 'A qualified prospect connected to your sales team by phone in real time, ready to talk now — not a name on a list.',
  },
  {
    q: 'Can you schedule appointments?',
    a: 'Yes. We book qualified prospects directly onto your team calendar for consultations, estimates, and discovery calls.',
  },
  {
    q: 'Can you reactivate old leads?',
    a: 'Yes. Database reactivation re-engages leads that went cold and turns them back into active opportunities.',
  },
  {
    q: 'What industries do you support?',
    a: 'Real estate, roofing, HVAC, plumbing, home services, dog training, automotive, legal, insurance, healthcare, and B2B — plus custom programs for unique lead flows.',
  },
  {
    q: 'Do you replace our sales team?',
    a: 'No. We make your sales team more effective by handing them qualified conversations instead of raw leads to chase.',
  },
  {
    q: 'Do you guarantee sales?',
    a: 'No. We guarantee a structured, measured process that delivers qualified opportunities. Closing is still your team job.',
  },
  {
    q: 'How does pricing work?',
    a: 'No retainer, no setup fee. You pay for qualified opportunities delivered. Pricing depends on industry, qualification criteria, lead source, market, volume, and program complexity.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <>
      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Straight Answers About How Link Works"
        subtitle="Understand the service, qualification process, handoff options, program structure, and what your team can expect."
        image={LINK_MEDIA.representative}
        imageAlt="Link representative answering a business inquiry"
        imagePosition="65% center"
      >
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#e0bd55]">The short version</p>
        <p className="mt-4 font-serif text-2xl leading-snug text-white">Your leads. Your criteria. Our trained engagement team.</p>
      </PageHero>

      <section className="pb-24">
        <Container className="max-w-3xl">
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <Reveal key={i} delay={(i % 4) * 0.03}>
                <div className="card-light rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <span className="text-lg font-semibold text-[#04181a] pr-4">{f.q}</span>
                    {open === i ? (
                      <Minus className="h-5 w-5 text-[#d4af37] shrink-0" />
                    ) : (
                      <Plus className="h-5 w-5 text-[#9aa8a9] shrink-0" />
                    )}
                  </button>
                  <div
                    className={cn(
                      'grid transition-all duration-300',
                      open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 text-[#4a5a5c] leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-12 text-center">
              <CTAButton to="/get-started">Build My Lead Program</CTAButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}