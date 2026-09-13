// @ts-nocheck
import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import {
  Activity, ArrowRight, BarChart3, Bell, CalendarDays, Check, ChevronRight,
  CircleDollarSign, CreditCard, Download, FileText, Headphones, HelpCircle,
  LayoutDashboard, LockKeyhole, LogOut, Menu, MessageSquareText, Search,
  Settings, ShieldCheck, SlidersHorizontal, Sparkles, Users, X
} from 'lucide-react';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer,
  Tooltip, XAxis, YAxis
} from 'recharts';
import BrandLogo from '@/components/site/BrandLogo';
import PortalMeta from '@/components/portal/PortalMeta';
import { customerPortalClient } from '@/portals/portalClient';

const NAV = [
  ['overview', 'Overview', LayoutDashboard],
  ['leads', 'Lead Activity', Users],
  ['appointments', 'Appointments', CalendarDays],
  ['reports', 'Reports', BarChart3],
  ['billing', 'Billing', CreditCard],
  ['documents', 'Documents', FileText],
  ['support', 'Support', Headphones],
  ['notifications', 'Notifications', Bell],
  ['security', 'Security', ShieldCheck],
  ['account', 'Team & Account', Settings],
];

const LEADS = [
  { name: 'Maria Rodriguez', source: 'Google Ads', stage: 'Appointment set', time: '12 min ago', owner: 'Alicia', score: 92 },
  { name: 'James Thornton', source: 'Website', stage: 'Qualified', time: '34 min ago', owner: 'Marco', score: 86 },
  { name: 'Tina Patel', source: 'Database', stage: 'In conversation', time: '1 hr ago', owner: 'Sofia', score: 74 },
  { name: 'Derek Williams', source: 'Referral', stage: 'Live transferred', time: '2 hrs ago', owner: 'Luis', score: 95 },
  { name: 'Lauren Kim', source: 'Meta Ads', stage: 'Follow-up', time: 'Yesterday', owner: 'Ana', score: 68 },
];

const PERFORMANCE = [
  { day: 'Mon', conversations: 26, qualified: 14 },
  { day: 'Tue', conversations: 34, qualified: 19 },
  { day: 'Wed', conversations: 31, qualified: 18 },
  { day: 'Thu', conversations: 42, qualified: 25 },
  { day: 'Fri', conversations: 47, qualified: 29 },
  { day: 'Sat', conversations: 28, qualified: 17 },
  { day: 'Sun', conversations: 35, qualified: 22 },
];

const SOURCE_DATA = [
  { source: 'Google', leads: 48 },
  { source: 'Website', leads: 39 },
  { source: 'Meta', leads: 31 },
  { source: 'Database', leads: 24 },
  { source: 'Referral', leads: 14 },
];

const APPOINTMENTS = [
  ['Today · 2:00 PM', 'James Thornton', 'Discovery consultation', 'Confirmed'],
  ['Today · 4:30 PM', 'Derek Williams', 'Live handoff follow-up', 'Confirmed'],
  ['Tomorrow · 9:00 AM', 'Maria Rodriguez', 'Program estimate', 'Awaiting confirmation'],
  ['Sep 15 · 11:30 AM', 'Tina Patel', 'Qualification follow-up', 'Confirmed'],
];

const DOCUMENTS = [
  ['Program Qualification Criteria.pdf', 'Program setup', 'Updated Sep 10'],
  ['August Performance Report.pdf', 'Monthly reports', 'Added Sep 2'],
  ['Approved Conversation Script v3.pdf', 'Scripts', 'Updated Aug 28'],
  ['Service Agreement.pdf', 'Legal', 'Signed Aug 15'],
];

const panelClass = 'rounded-2xl border border-[#0b3034]/10 bg-white shadow-[0_18px_50px_-36px_rgba(0,40,45,.42)]';

function PageTitle({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#9a741f]">{eyebrow}</p>
        <h1 className="mt-2 text-3xl text-[#071b1e] sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[#647274]">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function Metric({ label, value, detail, icon: Icon, tone = 'teal' }) {
  return (
    <article className={`${panelClass} p-5`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-[#6b7879]">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-[#071b1e]">{value}</p>
        </div>
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tone === 'gold' ? 'bg-[#d4af37]/13 text-[#a77b19]' : 'bg-[#00838f]/10 text-[#00747d]'}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-xs text-[#7a8586]">{detail}</p>
    </article>
  );
}

function StatusPill({ children }) {
  const gold = /Awaiting|Follow-up/.test(children);
  const green = /Confirmed|Qualified|transferred|set/.test(children);
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${gold ? 'bg-[#d4af37]/12 text-[#8f6a18]' : green ? 'bg-emerald-50 text-emerald-700' : 'bg-[#00838f]/10 text-[#00747d]'}`}>{children}</span>;
}

function SectionCard({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`${panelClass} ${className}`}>
      <header className="flex items-start justify-between gap-4 border-b border-[#071b1e]/8 px-5 py-4 sm:px-6">
        <div>
          <h2 className="text-lg text-[#071b1e]">{title}</h2>
          {subtitle && <p className="mt-1 text-xs text-[#788485]">{subtitle}</p>}
        </div>
        {action}
      </header>
      {children}
    </section>
  );
}

function Overview() {
  return (
    <div className="space-y-6">
      <PageTitle
        eyebrow="Customer workspace"
        title="Good morning, Alex."
        description="Here is what is happening across your lead engagement program."
        action={<button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#071b1e] px-4 py-3 text-xs font-bold text-white">Request support <ArrowRight className="h-4 w-4" /></button>}
      />
      <div className="rounded-xl border border-[#d4af37]/25 bg-[#fff9e8] px-4 py-3 text-xs leading-5 text-[#78601f]">
        <strong>Interface preview:</strong> Sample program data is shown until the production customer API and identity provider are connected.
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Leads received" value="156" detail="+18% from last week" icon={Users} />
        <Metric label="Conversations" value="103" detail="66% contact rate" icon={MessageSquareText} />
        <Metric label="Qualified" value="64" detail="62% qualification rate" icon={Check} tone="gold" />
        <Metric label="Appointments / transfers" value="49" detail="77% handoff rate" icon={CalendarDays} tone="gold" />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <SectionCard title="Program performance" subtitle="Conversations and qualified opportunities · last 7 days">
          <div className="h-[290px] px-2 pb-4 pt-5 sm:px-5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PERFORMANCE}>
                <defs>
                  <linearGradient id="conversationFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00838f" stopOpacity={0.32} />
                    <stop offset="100%" stopColor="#00838f" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e8e3d9" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#718082' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#718082' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, borderColor: '#d8d2c6', fontSize: 12 }} />
                <Area type="monotone" dataKey="conversations" stroke="#00838f" strokeWidth={2.5} fill="url(#conversationFill)" />
                <Area type="monotone" dataKey="qualified" stroke="#d4af37" strokeWidth={2.5} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Lead journey" subtitle="Current conversion through handoff">
          <div className="space-y-5 p-5 sm:p-6">
            {[
              ['Received', 156, '100%'],
              ['Reached', 103, '66%'],
              ['Qualified', 64, '41%'],
              ['Handoff', 49, '31%'],
            ].map(([label, value, width], i) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-xs"><span className="font-semibold text-[#405054]">{label}</span><span className="text-[#7b8788]">{value}</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-[#ece8df]"><div className={`h-full rounded-full ${i === 3 ? 'bg-[#d4af37]' : 'bg-[#00838f]'}`} style={{ width }} /></div>
              </div>
            ))}
            <div className="rounded-xl bg-[#071b1e] p-4 text-white">
              <p className="text-[10px] uppercase tracking-[.17em] text-[#d4af37]">Current outcome</p>
              <p className="mt-2 text-2xl font-semibold">31.4%</p>
              <p className="mt-1 text-xs text-white/55">of received leads reached a sales handoff</p>
            </div>
          </div>
        </SectionCard>
      </div>
      <LeadTable compact />
    </div>
  );
}

function LeadTable({ compact = false }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => LEADS.filter((lead) => lead.name.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <SectionCard
      title={compact ? 'Recent lead activity' : 'Lead activity'}
      subtitle={compact ? 'Latest conversations and handoffs' : 'Track every lead from receipt through final disposition'}
      action={!compact && <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b9697]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search leads" className="w-40 rounded-lg border border-[#071b1e]/10 py-2 pl-9 pr-3 text-xs outline-none focus:border-[#00838f] sm:w-56" /></div>}
    >
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f3f0e9] text-[10px] uppercase tracking-[.13em] text-[#738082]">
            <tr><th className="px-6 py-3">Prospect</th><th className="px-4 py-3">Source</th><th className="px-4 py-3">Stage</th><th className="px-4 py-3">Owner</th><th className="px-4 py-3">Score</th><th className="px-6 py-3 text-right">Updated</th></tr>
          </thead>
          <tbody className="divide-y divide-[#071b1e]/7">
            {filtered.map((lead) => (
              <tr key={lead.name} className="hover:bg-[#faf8f3]">
                <td className="px-6 py-4 font-semibold text-[#243b3e]">{lead.name}</td>
                <td className="px-4 py-4 text-[#657476]">{lead.source}</td>
                <td className="px-4 py-4"><StatusPill>{lead.stage}</StatusPill></td>
                <td className="px-4 py-4 text-[#657476]">{lead.owner}</td>
                <td className="px-4 py-4 font-semibold text-[#00747d]">{lead.score}</td>
                <td className="px-6 py-4 text-right text-xs text-[#879192]">{lead.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="divide-y divide-[#071b1e]/8 md:hidden">
        {filtered.map((lead) => (
          <article key={lead.name} className="p-5">
            <div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-[#243b3e]">{lead.name}</p><p className="mt-1 text-xs text-[#7c8889]">{lead.source} · {lead.owner}</p></div><span className="text-sm font-bold text-[#00747d]">{lead.score}</span></div>
            <div className="mt-4 flex items-center justify-between"><StatusPill>{lead.stage}</StatusPill><span className="text-xs text-[#879192]">{lead.time}</span></div>
          </article>
        ))}
      </div>
      {compact && <Link to="?view=leads" className="flex items-center justify-center gap-2 border-t border-[#071b1e]/8 py-4 text-xs font-bold text-[#00747d]">View all lead activity <ArrowRight className="h-4 w-4" /></Link>}
    </SectionCard>
  );
}

function LeadsView() {
  return <div className="space-y-6"><PageTitle eyebrow="Program activity" title="Lead Activity" description="A transparent record of outreach, qualification, follow-up, and sales handoffs." action={<button className="inline-flex items-center gap-2 rounded-lg border border-[#071b1e]/12 bg-white px-4 py-3 text-xs font-bold"><SlidersHorizontal className="h-4 w-4" /> Filters</button>} /><LeadTable /></div>;
}

function AppointmentsView() {
  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Qualified handoffs" title="Appointments" description="Upcoming meetings and live-transfer outcomes delivered to your team." />
      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <SectionCard title="Upcoming appointments" subtitle="Times shown in Central Time">
          <div className="divide-y divide-[#071b1e]/8">
            {APPOINTMENTS.map(([time, name, type, status]) => <div key={time + name} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div className="flex gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00838f]/10 text-[#00747d]"><CalendarDays className="h-5 w-5" /></div><div><p className="text-xs font-bold uppercase tracking-[.08em] text-[#a0781d]">{time}</p><p className="mt-1 font-semibold text-[#243b3e]">{name}</p><p className="text-xs text-[#7b8788]">{type}</p></div></div><StatusPill>{status}</StatusPill></div>)}
          </div>
        </SectionCard>
        <SectionCard title="This month" subtitle="Appointment quality at a glance">
          <div className="grid grid-cols-2 gap-px bg-[#071b1e]/8">
            {[[38,'Scheduled'],[31,'Confirmed'],[26,'Attended'],['84%','Show rate']].map(([value,label])=><div key={label} className="bg-white p-6 text-center"><p className="text-3xl font-bold text-[#071b1e]">{value}</p><p className="mt-2 text-xs text-[#738082]">{label}</p></div>)}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function ReportsView() {
  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Performance visibility" title="Reports" description="See response, contact, qualification, appointment, transfer, and outcome trends." action={<button className="inline-flex items-center gap-2 rounded-lg bg-[#071b1e] px-4 py-3 text-xs font-bold text-white"><Download className="h-4 w-4" /> Export report</button>} />
      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Lead source volume" subtitle="Qualified activity by source">
          <div className="h-[320px] p-5">
            <ResponsiveContainer width="100%" height="100%"><BarChart data={SOURCE_DATA}><CartesianGrid stroke="#e8e3d9" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="source" tick={{fontSize:11,fill:'#718082'}} axisLine={false} tickLine={false} /><YAxis tick={{fontSize:11,fill:'#718082'}} axisLine={false} tickLine={false} /><Tooltip contentStyle={{borderRadius:12,borderColor:'#d8d2c6',fontSize:12}} /><Bar dataKey="leads" fill="#00838f" radius={[6,6,0,0]} /></BarChart></ResponsiveContainer>
          </div>
        </SectionCard>
        <SectionCard title="Service-level performance" subtitle="Current reporting period">
          <div className="space-y-5 p-6">
            {[['First response under 5 minutes','91%'],['Contact rate','66%'],['Qualification rate','62%'],['Appointment show rate','84%'],['Client acceptance rate','89%']].map(([label,value])=><div key={label}><div className="mb-2 flex justify-between text-sm"><span className="text-[#4b5d60]">{label}</span><span className="font-bold text-[#071b1e]">{value}</span></div><div className="h-2 rounded-full bg-[#ece8df]"><div className="h-full rounded-full bg-gradient-to-r from-[#00616a] to-[#d4af37]" style={{width:value}} /></div></div>)}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

function BillingView() {
  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Account financials" title="Billing" description="Review qualified opportunity charges, invoices, credits, and payment status." />
      <div className="grid gap-4 sm:grid-cols-3"><Metric label="Current balance" value="$3,240" detail="Due September 20" icon={CircleDollarSign} tone="gold" /><Metric label="Qualified opportunities" value="27" detail="Current billing period" icon={Check} /><Metric label="Payment method" value="ACH" detail="Account ending ••4821" icon={CreditCard} /></div>
      <SectionCard title="Invoices" subtitle="Billing documents and payment status">
        <div className="divide-y divide-[#071b1e]/8">
          {[['INV-1048','September 2026','$3,240','Open'],['INV-1032','August 2026','$2,880','Paid'],['INV-1017','July 2026','$2,560','Paid']].map(([id,date,amount,status])=><div key={id} className="grid grid-cols-[1fr_auto] gap-3 p-5 sm:grid-cols-4 sm:items-center sm:px-6"><div><p className="font-semibold text-[#243b3e]">{id}</p><p className="text-xs text-[#7b8788]">{date}</p></div><p className="hidden text-sm text-[#607072] sm:block">Per-qualified-opportunity program</p><p className="font-bold text-[#071b1e]">{amount}</p><div className="flex items-center justify-end gap-3"><StatusPill>{status}</StatusPill><Download className="h-4 w-4 text-[#00747d]" /></div></div>)}
        </div>
      </SectionCard>
    </div>
  );
}

function DocumentsView() {
  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Shared workspace" title="Documents" description="Your approved scripts, qualification standards, reports, agreements, and program files." />
      <SectionCard title="Program files" subtitle="Access is logged and controlled by account role">
        <div className="grid gap-3 p-5 sm:grid-cols-2">
          {DOCUMENTS.map(([name,type,date])=><button key={name} className="flex items-center gap-4 rounded-xl border border-[#071b1e]/9 p-4 text-left transition hover:border-[#00838f]/35 hover:bg-[#faf8f3]"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#d4af37]/12 text-[#9d741a]"><FileText className="h-5 w-5" /></span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-[#243b3e]">{name}</span><span className="mt-1 block text-xs text-[#7b8788]">{type} · {date}</span></span><Download className="h-4 w-4 shrink-0 text-[#00747d]" /></button>)}
        </div>
      </SectionCard>
    </div>
  );
}

function SupportView() {
  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Client success" title="Support" description="Request program changes, report an issue, or start a conversation with your Link account team." action={<button className="inline-flex items-center gap-2 rounded-lg bg-[#d4af37] px-4 py-3 text-xs font-bold text-[#071b1e]"><MessageSquareText className="h-4 w-4" /> New request</button>} />
      <div className="grid gap-6 lg:grid-cols-3">
        {[['Program change','Update scripts, criteria, routing, hours, or follow-up rules.',SlidersHorizontal],['Technical support','Report an integration, notification, calendar, or reporting issue.',HelpCircle],['Account conversation','Talk with your program manager about results, scale, or strategy.',Headphones]].map(([title,body,Icon])=><article key={title} className={`${panelClass} p-6`}><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00838f]/10 text-[#00747d]"><Icon className="h-5 w-5" /></span><h2 className="mt-5 text-xl text-[#071b1e]">{title}</h2><p className="mt-2 text-sm leading-6 text-[#667476]">{body}</p><button className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#00747d]">Start request <ChevronRight className="h-4 w-4" /></button></article>)}
      </div>
      <SectionCard title="Recent requests" subtitle="Updates from your Link account team"><div className="divide-y divide-[#071b1e]/8">{[['#2041','Qualification criteria update','In review','2 hours ago'],['#2018','Calendar routing change','Completed','Sep 8']].map(([id,title,status,time])=><div key={id} className="flex items-center justify-between gap-4 p-5 sm:px-6"><div><p className="text-sm font-semibold text-[#243b3e]">{title}</p><p className="mt-1 text-xs text-[#7b8788]">{id} · {time}</p></div><StatusPill>{status}</StatusPill></div>)}</div></SectionCard>
    </div>
  );
}

function NotificationsView() {
  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Program updates" title="Notifications" description="Control which events generate email, SMS, browser, and in-portal alerts." />
      <SectionCard title="Notification preferences" subtitle="Account owners can set team-wide defaults">
        <div className="divide-y divide-[#071b1e]/8">
          {[['Qualified opportunity delivered','Immediate alerts when a lead meets your criteria.'],['Appointment scheduled','New appointment and confirmation changes.'],['Live transfer outcome','Connection, acceptance, and disposition updates.'],['Weekly performance summary','A concise program performance email each Monday.'],['Billing and invoice activity','Invoices, credits, payment failures, and receipts.'],['Security alerts','New device, password, MFA, and permission changes.']].map(([title,body],i)=><div key={title} className="flex items-center justify-between gap-5 p-5 sm:px-6"><div><p className="text-sm font-semibold text-[#243b3e]">{title}</p><p className="mt-1 text-xs leading-5 text-[#7b8788]">{body}</p></div><button aria-label={`Toggle ${title}`} className={`relative h-6 w-11 shrink-0 rounded-full ${i===4 ? 'bg-[#d8d4cb]' : 'bg-[#00838f]'}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow ${i===4 ? 'left-1' : 'right-1'}`} /></button></div>)}
        </div>
      </SectionCard>
    </div>
  );
}

function SecurityView() {
  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Safety center" title="Security" description="Manage authentication, active sessions, trusted devices, recovery options, and access history." />
      <div className="grid gap-4 md:grid-cols-3"><Metric label="Multi-factor authentication" value="Required" detail="Authenticator app configured" icon={ShieldCheck} /><Metric label="Active sessions" value="2" detail="Last reviewed today" icon={Activity} /><Metric label="Security score" value="Strong" detail="No immediate actions required" icon={LockKeyhole} tone="gold" /></div>
      <div className="grid gap-6 xl:grid-cols-2">
        <SectionCard title="Authentication controls" subtitle="Changes require recent MFA verification"><div className="divide-y divide-[#071b1e]/8">{[['Multi-factor authentication','Authenticator app · enabled','Manage'],['Recovery codes','Generated Sep 1 · 8 unused','Regenerate'],['Password','Last changed 42 days ago','Change'],['Session timeout','30 minutes of inactivity','Adjust']].map(([title,body,action])=><div key={title} className="flex items-center justify-between gap-4 p-5 sm:px-6"><div><p className="text-sm font-semibold text-[#243b3e]">{title}</p><p className="mt-1 text-xs text-[#7b8788]">{body}</p></div><button className="rounded-lg border border-[#071b1e]/10 px-3 py-2 text-xs font-bold text-[#00747d]">{action}</button></div>)}</div></SectionCard>
        <SectionCard title="Active sessions" subtitle="Revoke any session you do not recognize"><div className="divide-y divide-[#071b1e]/8">{[['Chrome on Windows','Magnolia, TX · Current session','Current'],['Safari on iPhone','Magnolia, TX · 38 minutes ago','Revoke']].map(([device,detail,action])=><div key={device} className="flex items-center justify-between gap-4 p-5 sm:px-6"><div><p className="text-sm font-semibold text-[#243b3e]">{device}</p><p className="mt-1 text-xs text-[#7b8788]">{detail}</p></div><button className={`text-xs font-bold ${action==='Current' ? 'text-emerald-700' : 'text-red-600'}`}>{action}</button></div>)}</div></SectionCard>
      </div>
      <SectionCard title="Recent security activity" subtitle="Immutable account access history"><div className="divide-y divide-[#071b1e]/8">{[['Successful sign-in','Chrome on Windows · Magnolia, TX','Today, 9:14 AM'],['MFA challenge completed','Authenticator app','Today, 9:14 AM'],['Report exported','August Performance Report.pdf','Sep 11, 2:32 PM'],['Team permission changed','Jordan Lee · Viewer to Manager','Sep 9, 11:08 AM']].map(([event,detail,time])=><div key={event+time} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"><div><p className="text-sm font-semibold text-[#243b3e]">{event}</p><p className="text-xs text-[#7b8788]">{detail}</p></div><p className="text-xs text-[#8a9495]">{time}</p></div>)}</div></SectionCard>
    </div>
  );
}

function AccountView() {
  return (
    <div className="space-y-6">
      <PageTitle eyebrow="Workspace administration" title="Team & Account" description="Manage your business profile, authorized users, roles, and program contacts." />
      <div className="grid gap-6 xl:grid-cols-[.8fr_1.2fr]">
        <SectionCard title="Business profile" subtitle="Primary account details"><div className="space-y-4 p-6">{[['Company','Northstar Home Services'],['Program','Lead Response + Qualification'],['Primary market','Greater Houston'],['Account owner','Alex Morgan'],['Program manager','Rachel Bennett']].map(([label,value])=><div key={label}><p className="text-[10px] font-bold uppercase tracking-[.12em] text-[#8a9596]">{label}</p><p className="mt-1 text-sm font-semibold text-[#30474a]">{value}</p></div>)}<button className="mt-2 rounded-lg border border-[#071b1e]/12 px-4 py-2.5 text-xs font-bold text-[#00747d]">Edit business profile</button></div></SectionCard>
        <SectionCard title="Authorized users" subtitle="Role-based access is enforced by the identity service" action={<button className="rounded-lg bg-[#071b1e] px-3 py-2 text-xs font-bold text-white">Invite user</button>}><div className="divide-y divide-[#071b1e]/8">{[['Alex Morgan','alex@northstar.example','Owner'],['Jordan Lee','jordan@northstar.example','Manager'],['Priya Shah','priya@northstar.example','Viewer']].map(([name,email,role])=><div key={email} className="flex items-center justify-between gap-4 p-5 sm:px-6"><div className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00838f]/10 text-xs font-bold text-[#00747d]">{name.split(' ').map(x=>x[0]).join('')}</span><div><p className="text-sm font-semibold text-[#243b3e]">{name}</p><p className="text-xs text-[#7b8788]">{email}</p></div></div><StatusPill>{role}</StatusPill></div>)}</div></SectionCard>
      </div>
    </div>
  );
}

const VIEW_COMPONENTS = {
  overview: Overview,
  leads: LeadsView,
  appointments: AppointmentsView,
  reports: ReportsView,
  billing: BillingView,
  documents: DocumentsView,
  support: SupportView,
  notifications: NotificationsView,
  security: SecurityView,
  account: AccountView,
};

export default function CustomerPortalDashboard() {
  const [params, setParams] = useSearchParams();
  const requested = params.get('view') || 'overview';
  const active = VIEW_COMPONENTS[requested] ? requested : 'overview';
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [access, setAccess] = useState(customerPortalClient.isConfigured() ? 'checking' : 'preview');
  const ActiveView = VIEW_COMPONENTS[active];

  useEffect(() => {
    if (!customerPortalClient.isConfigured()) return undefined;
    let mounted = true;
    customerPortalClient.getSession()
      .then(() => mounted && setAccess('authorized'))
      .catch(() => mounted && setAccess('denied'));
    return () => { mounted = false; };
  }, []);

  const choose = (key) => {
    setParams(key === 'overview' ? {} : { view: key });
    setDrawerOpen(false);
  };

  if (access === 'checking') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#071b1e] text-white">
        <PortalMeta title="Customer Portal | Link Marketing Services" />
        <div className="text-center"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[#d4af37]" /><p className="mt-4 text-xs text-white/60">Verifying secure session…</p></div>
      </div>
    );
  }

  if (access === 'denied') return <Navigate to="/customer-portal/sign-in" replace />;

  const Sidebar = ({ mobile = false }) => (
    <aside className={`${mobile ? 'flex' : 'hidden lg:flex'} h-full w-[278px] shrink-0 flex-col border-r border-white/8 bg-[#071b1e] text-white`}>
      <div className="flex h-[76px] items-center border-b border-white/8 px-5"><BrandLogo className="h-[58px] w-[188px]" /></div>
      <div className="px-4 pt-5"><button onClick={() => choose('support')} className="flex w-full items-center gap-3 rounded-xl border border-[#d4af37]/28 bg-[#d4af37]/10 px-4 py-3 text-left text-xs font-bold text-[#ead486]"><Sparkles className="h-4 w-4" /> Start a support request</button></div>
      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto px-3 pb-5" aria-label="Customer portal">
        {NAV.map(([key,label,Icon])=><button key={key} onClick={() => choose(key)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${active===key ? 'bg-white/10 text-white' : 'text-white/58 hover:bg-white/6 hover:text-white'}`}><Icon className={`h-[18px] w-[18px] ${active===key ? 'text-[#d4af37]' : ''}`} /><span className="flex-1">{label}</span>{key==='notifications' && <span className="rounded-full bg-[#d4af37] px-1.5 py-0.5 text-[9px] font-bold text-[#071b1e]">3</span>}</button>)}
      </nav>
      <div className="border-t border-white/8 p-3">
        <div className="flex items-center gap-3 rounded-xl px-3 py-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d4af37] text-xs font-bold text-[#071b1e]">AM</span><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">Alex Morgan</p><p className="truncate text-[10px] text-white/42">Account owner</p></div><Link to="/customer-portal/sign-in" aria-label="Sign out"><LogOut className="h-4 w-4 text-white/45" /></Link></div>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f1ea]">
      <PortalMeta title="Customer Portal | Link Marketing Services" />
      <Sidebar />
      {drawerOpen && <div className="fixed inset-0 z-50 flex lg:hidden"><button aria-label="Close navigation" onClick={() => setDrawerOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm" /><div className="relative h-full"><Sidebar mobile /><button onClick={() => setDrawerOpen(false)} className="absolute right-3 top-3 rounded-lg p-2 text-white/70" aria-label="Close menu"><X className="h-5 w-5" /></button></div></div>}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[70px] shrink-0 items-center justify-between border-b border-[#071b1e]/9 bg-[#fbfaf7]/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setDrawerOpen(true)} className="rounded-lg border border-[#071b1e]/10 bg-white p-2 lg:hidden" aria-label="Open portal navigation"><Menu className="h-5 w-5" /></button>
            <div><p className="text-xs font-semibold text-[#334a4d]">{NAV.find(([key])=>key===active)?.[1]}</p><p className="hidden text-[10px] text-[#879192] sm:block">Northstar Home Services · Customer portal</p></div>
          </div>
          <div className="flex items-center gap-2"><span className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700 sm:inline-flex">Program active</span><button onClick={() => choose('notifications')} className="relative rounded-lg border border-[#071b1e]/10 bg-white p-2.5" aria-label="Notifications"><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#d4af37]" /></button><button onClick={() => choose('account')} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#071b1e] text-[10px] font-bold text-white">AM</button></div>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10"><ActiveView /></div>
        </main>
      </div>
    </div>
  );
}
