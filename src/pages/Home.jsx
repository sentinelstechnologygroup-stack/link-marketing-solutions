import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, CTAButton, SectionHeading, Reveal } from '@/components/site/ui';
import { Image } from '@/components/ui/image';
import { INDUSTRIES } from '@/components/site/industries';
import {
  ArrowRight,
  Clock,
  PhoneOff,
  UserX,
  Repeat,
  Trash2,
  AlertTriangle,
  Zap,
  Users,
  Gauge,
  GitBranch,
  BarChart3,
  MessageSquare,
} from 'lucide-react';

const HERO_IMG = 'https://media.base44.com/images/public/6aa5d302d571973897221ea3/7120c4d99_generated_796187cb.jpg';
const PROBLEM_IMG = 'https://media.base44.com/images/public/6aa5d302d571973897221ea3/80e972364_generated_a11f109f.jpg';

const PROBLEMS = [
  { icon: Clock, text: 'Nobody responds quickly' },
  { icon: PhoneOff, text: 'Calls are missed' },
  { icon: UserX, text: 'Salespeople are busy' },
  { icon: Repeat, text: 'Follow-up is inconsistent' },
  { icon: Trash2, text: 'Leads are contacted once and forgotten' },
  { icon: AlertTriangle, text: 'Poor prospects waste sales time' },
];

const FLOW = [
  { label: 'Lead Comes In' },
  { label: 'Link Responds' },
  { label: 'Link Qualifies' },
  { label: 'Link Follows Up' },
  { label: 'Appointment or Live Transfer' },
  { label: 'Client Sales Team' },
];

const CORE_SERVICES = [
  { name: 'Lead Response', desc: 'Fast contact on every inquiry — within minutes, not hours.' },
  { name: 'Lead Qualification', desc: 'Every conversation measured against your criteria.' },
  { name: 'Appointment Setting', desc: 'Qualified prospects booked onto your team calendar.' },
  { name: 'Live Transfers', desc: 'Ready-to-talk prospects connected to your team in real time.' },
  { name: 'Lead Nurturing', desc: 'Not-ready-yet leads kept warm until timing aligns.' },
  { name: 'Database Reactivation', desc: 'Old leads re-engaged and turned back into opportunities.' },
  { name: 'Lead Generation', desc: 'Targeted campaigns that fill your pipeline with the right fit.' },
  { name: 'Reporting', desc: 'Clear, measurable performance — always know what works.' },
];

const WHY = [
  { icon: MessageSquare, title: 'Human conversations', desc: 'Real people, real calls — not bots, not scripts that read like robots.' },
  { icon: Gauge, title: 'Custom qualification', desc: 'Your definition of qualified drives every conversation we have.' },
  { icon: Zap, title: 'Fast response', desc: 'Speed to lead measured in minutes, because interest cools fast.' },
  { icon: Repeat, title: 'Structured follow-up', desc: 'No lead is contacted once and forgotten. Follow-up is a system.' },
  { icon: GitBranch, title: 'Better routing', desc: 'The right prospect reaches the right person on your team.' },
  { icon: BarChart3, title: 'Measurable performance', desc: 'You see exactly what is working and what is delivering.' },
];

const STEPS = [
  { n: '01', title: 'Define qualified', desc: 'We define together what a qualified opportunity looks like for you.' },
  { n: '02', title: 'Connect lead sources', desc: 'We connect your existing lead sources — forms, calls, ads, lists.' },
  { n: '03', title: 'Link responds & qualifies', desc: 'We contact, qualify, and follow up on every inquiry.' },
  { n: '04', title: 'Your team receives conversations', desc: 'Qualified prospects reach your sales team — ready to talk.' },
];

function LeadLeakCounter() {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const interval = setInterval(() => {
            setCount((c) => c + 7);
          }, 80);
          setTimeout(() => clearInterval(interval), 2400);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex items-baseline gap-2">
      <span className="text-4xl md:text-5xl font-bold text-[#d4af37] tabular-nums">
        ${count.toLocaleString()}
      </span>
      <span className="text-sm text-[#4a5a5c]">lost per second to slow lead response*</span>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-[#00282d]">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-radial-cyan" />
        <div className="absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-[#d4af37]/8 blur-3xl" />
        <Container className="relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#d4af37]/25 bg-white/5 px-4 py-1.5 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#d4af37]" />
                </span>
                <span className="text-xs uppercase tracking-[0.2em] text-[#cddede]">Link Marketing Solutions</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-[0.98]">
                STOP CHASING
                <br />
                LEADS.
                <br />
                <span className="text-[#d4af37]">START TALKING TO QUALIFIED PROSPECTS.</span>
              </h1>
              <p className="mt-8 text-lg text-[#9fb3b3] max-w-xl leading-relaxed">
                Link Marketing Solutions responds to your leads, qualifies the opportunity, follows up, and
                connects the right prospects to your sales team.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <CTAButton to="/get-started" size="lg">
                  Build My Lead Program
                </CTAButton>
                <CTAButton to="/how-it-works" variant="onDark" size="lg">
                  See How It Works
                </CTAButton>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden card-surface aspect-[4/3] glow-cyan">
                <Image
                  src={HERO_IMG}
                  alt="A glowing pulse of light traveling through a network of dark glass conduits"
                  fittingType="fill"
                  className="h-full w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00282d] via-transparent to-transparent" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PROBLEM */}
      <section className="py-24 border-t border-[#00282d]/8 relative overflow-hidden">
        <Container>
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <SectionHeading
                eyebrow="The Problem"
                title="More leads are not always the answer."
                align="left"
              />
              <p className="mt-6 text-lg text-[#4a5a5c] leading-relaxed">
                Most businesses already generate inquiries. The problem is what happens next — or what does
                not happen at all.
              </p>
              <div className="mt-8 space-y-3">
                {PROBLEMS.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.text} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00282d]/5 border border-[#00282d]/10 shrink-0">
                        <Icon className="h-4 w-4 text-[#00838f]" />
                      </div>
                      <span className="text-[#3a4a4c]">{p.text}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-10 pt-6 border-t border-[#00282d]/10">
                <LeadLeakCounter />
                <p className="mt-2 text-xs text-[#4a5a5c]/70">*Illustrative. Based on industry averages for speed-to-lead impact.</p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden border border-[#00282d]/10 shadow-xl aspect-[4/3] bg-white">
                <Image
                  src={PROBLEM_IMG}
                  alt="Chaotic tangled wires representing disorganized lead flow"
                  fittingType="fill"
                  className="h-full w-full"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* SOLUTION FLOW */}
      <section className="py-24 border-t border-[#d4af37]/10 bg-[#00282d] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="The Solution"
              onDark
              title="Link is the bridge between a lead and a conversation"
              subtitle="One clear flow — from the moment an inquiry arrives to the moment your sales team is talking to a qualified prospect."
            />
          </Reveal>
          <div className="mt-16">
            <div className="flex flex-col lg:flex-row items-stretch gap-3 lg:gap-0">
              {FLOW.map((f, i) => (
                <Reveal key={f.label} delay={i * 0.08} className="flex-1">
                  <div className="relative h-full px-4">
                    <div className="card-surface rounded-xl p-6 h-full text-center hover:border-[#d4af37]/40 transition-colors">
                      <span className="text-[#d4af37] text-sm font-mono block mb-3">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-semibold text-white leading-snug block">{f.label}</span>
                    </div>
                    {i < FLOW.length - 1 && (
                      <div className="hidden lg:flex absolute top-1/2 -right-2 -translate-y-1/2 text-[#d4af37] z-10">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CORE SERVICES */}
      <section className="py-24 border-t border-[#00282d]/8">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Core Services"
              title="What Link does for your pipeline"
              subtitle="Eight services that cover the full path from raw inquiry to qualified conversation."
            />
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_SERVICES.map((s, i) => (
              <Reveal key={s.name} delay={(i % 4) * 0.05}>
                <div className="card-surface rounded-xl p-6 h-full hover:border-[#d4af37]/40 transition-all">
                  <h3 className="text-base font-semibold text-white mb-2">{s.name}</h3>
                  <p className="text-sm text-[#9fb3b3] leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CTAButton to="/services" variant="outline">
              See all services <ArrowRight className="h-4 w-4" />
            </CTAButton>
          </div>
        </Container>
      </section>

      {/* INDUSTRIES PREVIEW */}
      <section className="py-24 border-t border-[#d4af37]/10 bg-[#00282d] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="Industries"
              onDark
              title="Built for the way your market sells"
              subtitle="We speak the language of your industry and qualify opportunities the way your team needs them."
            />
          </Reveal>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {INDUSTRIES.map((ind) => {
              const Icon = ind.icon;
              return (
                <Reveal key={ind.slug}>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-3 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/5 transition-all"
                  >
                    <Icon className="h-4 w-4 text-[#d4af37]" />
                    <span className="text-sm font-medium text-[#cddede] group-hover:text-white">{ind.name}</span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <CTAButton to="/industries" variant="onDark">
              Explore all industries <ArrowRight className="h-4 w-4" />
            </CTAButton>
          </div>
        </Container>
      </section>

      {/* WHY LINK */}
      <section className="py-24 border-t border-[#00282d]/8">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Why Link" title="The advantages that move your pipeline" />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY.map((w, i) => {
              const Icon = w.icon;
              return (
                <Reveal key={w.title} delay={(i % 3) * 0.06}>
                  <div className="card-light rounded-xl p-8 h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00838f]/8 border border-[#00838f]/15 mb-5">
                      <Icon className="h-6 w-6 text-[#00838f]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#04181a] mb-2">{w.title}</h3>
                    <p className="text-sm text-[#4a5a5c] leading-relaxed">{w.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 border-t border-[#d4af37]/10 bg-[#00282d] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15" />
        <Container className="relative">
          <Reveal>
            <SectionHeading eyebrow="How It Works" onDark title="Four steps to qualified conversations" />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={(i % 4) * 0.06}>
                <div className="relative card-surface rounded-xl p-8 h-full">
                  <span className="text-5xl font-bold text-[#d4af37]/25 block mb-4">{s.n}</span>
                  <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-sm text-[#9fb3b3] leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CTAButton to="/how-it-works" variant="onDark">
              See the full process <ArrowRight className="h-4 w-4" />
            </CTAButton>
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="py-28">
        <Container>
          <Reveal>
            <div className="relative card-surface rounded-2xl p-10 md:p-20 text-center overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px pulse-line" />
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-[#d4af37]/12 blur-3xl" />
              <div className="relative">
                <h2 className="text-3xl md:text-5xl font-bold text-white max-w-3xl mx-auto leading-[1.1]">
                  What happens after your next lead comes in?
                </h2>
                <p className="mt-6 text-lg text-[#9fb3b3] max-w-2xl mx-auto leading-relaxed">
                  If the answer depends on whether someone notices the notification, has time to call, and
                  remembers to follow up, there is a better system.
                </p>
                <div className="mt-10 flex justify-center">
                  <CTAButton to="/get-started" size="lg">
                    Build My Lead Program
                  </CTAButton>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}