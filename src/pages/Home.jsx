import { Link } from 'react-router-dom';
import { Container, CTAButton, SectionHeading, Reveal } from '@/components/site/ui';
import { Image } from '@/components/ui/image';
import { INDUSTRIES } from '@/components/site/industries';
import {
  ArrowRight,
  Zap,
  CheckCircle2,
  Phone,
  MessageSquare,
  Mail,
  Calendar,
  PhoneCall,
  Headphones,
  Users,
  Target,
  Repeat,
  Clock,
  UserX,
  PhoneOff,
  AlertTriangle,
  Gauge,
  Network,
  Route,
  Filter,
  Timer,
  MessagesSquare,
  PhoneForwarded,
  RefreshCw,
  Database,
  ListChecks,
  Workflow,
  TrendingUp,
  ShieldCheck,
  Award,
  Handshake,
  Sparkles,
} from 'lucide-react';

const HERO_REP = 'https://media.base44.com/images/public/6aa5d302d571973897221ea3/a4bdc954e_generated_image.png';
const TEAM_IMG = 'https://media.base44.com/images/public/6aa5d302d571973897221ea3/8a35b55aa_generated_image.png';

const FEATURES = [
  { icon: Zap, title: 'Faster Response', desc: 'Minutes, not hours.' },
  { icon: Filter, title: 'Better Qualification', desc: 'Your definition, every call.' },
  { icon: Network, title: 'Smarter Connections', desc: 'Right prospect, right rep.' },
  { icon: Repeat, title: 'Consistent Follow-Up', desc: 'No lead left behind.' },
];

const SERVICES = [
  { icon: PhoneCall, title: 'Lead Response & Qualification', desc: 'Every inquiry contacted fast and measured against your criteria — so your team only sees real opportunities.' },
  { icon: Calendar, title: 'Appointment Setting', desc: 'Qualified prospects booked directly onto your sales team calendar for consultations and estimates.' },
  { icon: PhoneForwarded, title: 'Live Transfers', desc: 'Hot, ready-to-talk prospects connected to your team in real time — not a name on a list.' },
  { icon: Database, title: 'Database Reactivation', desc: 'Old, untouched leads re-engaged and turned back into active opportunities.' },
];

const PROCESS = [
  { n: '1', label: 'Lead Received' },
  { n: '2', label: 'Rapid Response' },
  { n: '3', label: 'Human Conversation' },
  { n: '4', label: 'Qualification' },
  { n: '5', label: 'Appointment or Live Transfer' },
  { n: '6', label: 'Client Sales Team' },
];

const CONVO_POINTS = [
  'Bilingual representatives',
  'Client-approved scripts',
  'Smart routing to the right rep',
  'Structured follow-up sequences',
  'Quality reviewed every call',
];

const PROBLEM_PAINS = [
  { icon: Clock, text: 'Leads sit for hours before anyone responds' },
  { icon: PhoneOff, text: 'Inbound calls go to voicemail' },
  { icon: UserX, text: 'Salespeople are too busy to chase raw leads' },
  { icon: AlertTriangle, text: 'No consistent follow-up process' },
];

const ADVANTAGES = [
  'Every lead contacted within minutes',
  'Real humans on every call',
  'Qualified against your criteria',
  'Appointments booked on your calendar',
  'Live transfers when prospects are ready',
  'Follow-up that never stops',
];

const PROSPECT_FEATURES = [
  'Client-approved scripts',
  'Custom qualification criteria',
  'Scheduling around your calendar',
  'Industry-specific terminology',
  'Routing logic that fits your team',
];

const TRANSFER_PILLARS = [
  { icon: PhoneCall, title: 'Real-Time Connection', desc: 'Prospect and rep on the line together.' },
  { icon: Timer, title: 'Zero Delay', desc: 'Interest is hot, so we act now.' },
  { icon: ShieldCheck, title: 'Pre-Qualified', desc: 'Already measured against your criteria.' },
  { icon: Handshake, title: 'Warm Handoff', desc: 'Context delivered with every transfer.' },
];

const FOLLOWUP_METHODS = [
  { icon: Phone, title: 'Phone', desc: 'Multiple strategic call attempts.' },
  { icon: MessageSquare, title: 'SMS', desc: 'Fast, conversational text outreach.' },
  { icon: Mail, title: 'Email', desc: 'Nurture sequences that stay warm.' },
  { icon: Calendar, title: 'Scheduled Callback', desc: 'Set times that fit the prospect.' },
];

const PIPELINE = [
  { icon: MessagesSquare, label: 'Leads Received' },
  { icon: Zap, label: 'Rapid Response' },
  { icon: Headphones, label: 'Human Qualification' },
  { icon: Calendar, label: 'Appointment Set' },
  { icon: TrendingUp, label: 'Client Outcome' },
];

const WHY_LINK = [
  { icon: MessagesSquare, title: 'Solution Conversations', desc: 'We talk to prospects about their need, not a script read.' },
  { icon: Filter, title: 'Customized Qualification', desc: 'Your definition of qualified drives every call.' },
  { icon: Gauge, title: 'Speed to Lead', desc: 'Measured in minutes, because interest cools fast.' },
  { icon: Route, title: 'Smart Routing', desc: 'The right prospect reaches the right person.' },
  { icon: RefreshCw, title: 'Relentless Follow-Up', desc: 'No lead is contacted once and forgotten.' },
  { icon: TrendingUp, title: 'Measurable Results', desc: 'You see exactly what is working and delivering.' },
];

const INDUSTRY_PICKS = ['real-estate', 'roofing', 'hvac', 'dog-training', 'b2b', 'custom-programs'];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-36 pb-0 md:pt-40 overflow-hidden bg-[#00282d]">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute -top-32 -left-32 h-[30rem] w-[30rem] rounded-full bg-[#d4af37]/8 blur-3xl" />
        <Container className="relative">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-center pb-16">
            <Reveal>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.04]">
                Stop Chasing Leads.
                <br />
                <span className="text-[#d4af37]">Start Talking to Qualified Prospects.</span>
              </h1>
              <p className="mt-7 text-lg text-[#cddede] max-w-xl leading-relaxed">
                We respond, qualify, set appointments, and live-transfer high-intent prospects — so your team
                can focus on closing.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <CTAButton to="/get-started" size="lg">
                  Build My Lead Program
                </CTAButton>
                <CTAButton to="/how-it-works" variant="onDark" size="lg">
                  See How It Works
                </CTAButton>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative flex flex-col items-center lg:items-end">
                <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full overflow-hidden border-4 border-[#d4af37]/30 shadow-2xl glow-cyan">
                  <Image
                    src={HERO_REP}
                    alt="Professional call center representative wearing a headset"
                    fittingType="fill"
                    className="h-full w-full"
                  />
                </div>
                <div className="mt-6 text-center lg:text-right">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
                    Real Conversations.
                  </p>
                  <p className="text-sm uppercase tracking-[0.25em] text-white font-semibold">
                    Real Opportunities.
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.2em] text-[#9fb3b3]">
                    People Make Progress.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>

        {/* FEATURE BAR */}
        <div className="relative border-t border-[#d4af37]/15 bg-[#00363b]">
          <Container className="relative">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#d4af37]/10">
              {FEATURES.map((f, i) => {
                const Icon = f.icon;
                return (
                  <Reveal key={f.title} delay={i * 0.06}>
                    <div className="flex items-center gap-3 px-5 py-7">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/25">
                        <Icon className="h-5 w-5 text-[#d4af37]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{f.title}</p>
                        <p className="text-xs text-[#9fb3b3]">{f.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </Container>
        </div>
      </section>

      {/* FOUR SERVICES */}
      <section className="py-24 bg-[#f4f1ea]">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What We Do"
              title="Four Services. A Stronger Revenue Engine."
              subtitle="Link works the opportunity end-to-end — from the moment an inquiry arrives to a live, qualified conversation."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.title} delay={(i % 4) * 0.06}>
                  <div className="card-surface rounded-xl p-8 h-full hover:border-[#d4af37]/40 transition-all">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/25 mb-6">
                      <Icon className="h-7 w-7 text-[#d4af37]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">{s.title}</h3>
                    <p className="text-sm text-[#9fb3b3] leading-relaxed">{s.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* THE LINK PROCESS */}
      <section className="py-24 bg-[#f4f1ea] border-t border-[#00282d]/8">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="The Link Process" title="From lead received to your sales team" />
          </Reveal>
          <div className="mt-16 relative">
            <div className="hidden lg:block absolute left-0 right-0 top-7 h-px bg-[#00282d]/15" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10 gap-x-4">
              {PROCESS.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.06}>
                  <div className="flex flex-col items-center text-center">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#00282d] border-2 border-[#d4af37] text-[#d4af37] font-bold glow-cyan z-10">
                      {p.n}
                    </div>
                    <p className="mt-4 text-sm font-semibold text-[#04181a] leading-snug max-w-[8rem]">{p.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* HUMAN CONVERSATIONS */}
      <section className="py-24 bg-[#00282d] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15" />
        <Container className="relative">
          <div className="grid lg:grid-cols-3 gap-10 items-center">
            <Reveal>
              <div className="relative rounded-2xl overflow-hidden card-surface aspect-[3/4] glow-cyan">
                <Image
                  src={HERO_REP}
                  alt="Professional representative with a headset"
                  fittingType="fill"
                  className="h-full w-full"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="text-center">
                <div className="inline-flex items-center gap-2.5 mb-5 justify-center">
                  <span className="h-px w-8 bg-[#d4af37]" />
                  <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">Conversations</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Human Conversations.
                  <br />
                  Structured Results.
                </h2>
                <ul className="mt-8 space-y-3 text-left max-w-sm mx-auto">
                  {CONVO_POINTS.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-[#cddede]">
                      <CheckCircle2 className="h-5 w-5 text-[#d4af37] shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden card-surface aspect-[3/4] glow-cyan">
                <Image
                  src={TEAM_IMG}
                  alt="Professional team with headsets"
                  fittingType="fill"
                  className="h-full w-full"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* SPLIT COMPARISON */}
      <section className="bg-[#f4f1ea]">
        <div className="grid lg:grid-cols-2">
          <div className="p-10 md:p-16 lg:p-20">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 mb-5">
                <span className="h-px w-8 bg-[#00838f]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#00838f] font-semibold">The Problem</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#04181a] leading-tight">
                The Problem Between Marketing and Sales
              </h2>
              <p className="mt-5 text-[#4a5a5c] leading-relaxed">
                Marketing generates inquiries. Sales is busy closing. What happens in between is where most
                opportunities quietly disappear.
              </p>
              <div className="mt-8 space-y-4">
                {PROBLEM_PAINS.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div key={p.text} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00282d]/5 border border-[#00282d]/10 shrink-0">
                        <Icon className="h-5 w-5 text-[#00838f]" />
                      </div>
                      <span className="text-[#3a4a4c]">{p.text}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          </div>
          <div className="p-10 md:p-16 lg:p-20 bg-[#00282d]">
            <Reveal delay={0.1}>
              <div className="inline-flex items-center gap-2.5 mb-5">
                <span className="h-px w-8 bg-[#d4af37]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">The Link Advantage</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                The Link Advantage
              </h2>
              <ul className="mt-8 space-y-4">
                {ADVANTAGES.map((a) => (
                  <li key={a} className="flex items-start gap-3 text-[#cddede]">
                    <CheckCircle2 className="h-6 w-6 text-[#d4af37] shrink-0 mt-0.5" />
                    {a}
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <CTAButton to="/get-started">Build My Lead Program</CTAButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-24 bg-[#00282d] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="Industries We Serve"
              onDark
              title="Qualification Built Around Your Business"
              subtitle="We speak the language of your industry and qualify opportunities the way your team needs them."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {INDUSTRY_PICKS.map((slug, i) => {
              const ind = INDUSTRIES.find((x) => x.slug === slug);
              if (!ind) return null;
              const Icon = ind.icon;
              return (
                <Reveal key={slug} delay={(i % 3) * 0.06}>
                  <Link to={`/industries/${ind.slug}`} className="group block h-full">
                    <div className="relative overflow-hidden rounded-xl card-surface h-56 p-8 flex flex-col justify-between hover:border-[#d4af37]/40 transition-all">
                      <div
                        className={`absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${ind.gradient} blur-2xl opacity-70 group-hover:opacity-100 transition-opacity`}
                      />
                      <div className="relative">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/25 mb-4">
                          <Icon className="h-6 w-6 text-[#d4af37]" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">{ind.name}</h3>
                      </div>
                      <div className="relative flex items-center gap-2 text-sm font-medium text-[#d4af37]">
                        Explore <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
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

      {/* YOUR PROSPECT */}
      <section className="py-24 bg-[#f4f1ea]">
        <Container>
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <SectionHeading
                eyebrow="Your Team"
                title="Your Prospect. Your Brand. Our Team."
                align="left"
                subtitle="We represent your business the way you would — with approved scripts, your criteria, and your terminology on every call."
              />
              <ul className="mt-8 space-y-4">
                {PROSPECT_FEATURES.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[#3a4a4c]">
                    <CheckCircle2 className="h-6 w-6 text-[#d4af37] shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative rounded-2xl overflow-hidden border border-[#00282d]/10 shadow-xl aspect-[4/3] bg-white">
                <Image
                  src={TEAM_IMG}
                  alt="Professional team representing your brand"
                  fittingType="fill"
                  className="h-full w-full"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* LIVE TRANSFERS */}
      <section className="py-24 bg-[#00282d] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="Live Transfers"
              onDark
              title="When a prospect is ready, we connect them now."
              subtitle="When a prospect is qualified and ready, we connect them to your team in real time — so momentum never drops."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TRANSFER_PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={(i % 4) * 0.06}>
                  <div className="card-surface rounded-xl p-8 h-full text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/25 mb-5">
                      <Icon className="h-7 w-7 text-[#d4af37]" />
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
                    <p className="text-sm text-[#9fb3b3] leading-relaxed">{p.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* FOLLOW-UP & NURTURING */}
      <section className="py-24 bg-[#f4f1ea]">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Follow-Up & Nurturing"
              title="Not-ready-yet leads stay in motion"
              subtitle="We reach prospects across every channel on a structured cadence — until the timing aligns."
            />
          </Reveal>
          <div className="mt-14 grid lg:grid-cols-2 gap-6">
            <Reveal>
              <div className="grid sm:grid-cols-2 gap-5">
                {FOLLOWUP_METHODS.map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.title} className="card-light rounded-xl p-6 h-full">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00838f]/8 border border-[#00838f]/15 mb-4">
                        <Icon className="h-6 w-6 text-[#00838f]" />
                      </div>
                      <h3 className="text-base font-semibold text-[#04181a] mb-1">{m.title}</h3>
                      <p className="text-sm text-[#4a5a5c]">{m.desc}</p>
                    </div>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card-surface rounded-2xl p-10 h-full flex flex-col justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/25 mb-6">
                  <Database className="h-7 w-7 text-[#d4af37]" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-3">Database Reactivation</h3>
                <p className="text-[#9fb3b3] leading-relaxed">
                  Your old, untouched leads are not dead — they are dormant. We re-engage past inquiries with
                  fresh conversations and turn them back into active opportunities.
                </p>
                <div className="mt-8">
                  <CTAButton to="/get-started">Reactivate My Leads</CTAButton>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PIPELINE */}
      <section className="py-24 bg-[#f4f1ea] border-t border-[#00282d]/8">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The Pipeline"
              title="See what happens between lead creation and client outcome"
            />
          </Reveal>
          <div className="mt-16 relative">
            <div className="hidden lg:block absolute left-0 right-0 top-7 h-px bg-[#00282d]/15" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-4">
              {PIPELINE.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Reveal key={p.label} delay={i * 0.06}>
                    <div className="flex flex-col items-center text-center">
                      <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white border-2 border-[#d4af37]/40 text-[#00838f] z-10">
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="mt-4 text-sm font-semibold text-[#04181a] leading-snug max-w-[10rem]">{p.label}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* WHY LINK */}
      <section id="why" className="py-24 bg-[#f4f1ea] border-t border-[#00282d]/8">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why Link"
              title="Why Link Marketing Services"
              subtitle="The advantages that move your pipeline — and keep your sales team talking to the right people."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_LINK.map((w, i) => {
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

      {/* FINAL CTA */}
      <section className="py-24 bg-[#00282d] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[#d4af37]/12 blur-3xl" />
        <Container className="relative">
          <Reveal>
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-5">
                Part of the Link Business Alliance Ecosystem
              </p>
              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                What happens after your next lead comes in?
              </h2>
              <p className="mt-6 text-lg text-[#9fb3b3] leading-relaxed">
                If the answer depends on whether someone notices the notification, has time to call, and
                remembers to follow up — there is a better system.
              </p>
              <div className="mt-10 flex justify-center">
                <CTAButton to="/get-started" size="lg">
                  Request a Program Review
                </CTAButton>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}