import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, Headphones } from 'lucide-react';
import PortalLoginShell from '@/components/portal/PortalLoginShell';
import PortalMeta from '@/components/portal/PortalMeta';
import { crmPortalClient, PortalConfigurationError } from '@/portals/portalClient';

export default function CrmPortalLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: '', password: '', station: '' });
  const [status, setStatus] = useState('');
  const [working, setWorking] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setWorking(true);
    setStatus('');
    try {
      const result = await crmPortalClient.signIn(form);
      setStatus(result?.mfa_required ? 'Complete the MFA challenge in the CRM.' : 'CRM session established.');
    } catch (error) {
      setStatus(error instanceof PortalConfigurationError
        ? 'CRM authentication is not connected in this website preview. No credentials were transmitted or stored.'
        : error.message);
    } finally {
      setWorking(false);
    }
  };

  return (
    <PortalLoginShell
      eyebrow="CRM Agent Portal"
      title="Agent sign in."
      subtitle="Authorized Link representatives can access the calling, lead-response, qualification, and routing workspace here."
      badge="Authorized personnel only"
      footer={
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#6b7677]">
          <Headphones className="h-4 w-4 text-[#00838f]" />
          Access and credentials are managed exclusively by the Link CRM.
        </div>
      }
    >
      <PortalMeta title="CRM Agent Sign In | Link Marketing Services" />
      <form onSubmit={submit} className="space-y-5">
        <div>
          <label htmlFor="agent-username" className="mb-2 block text-sm font-semibold">Agent email or username</label>
          <input
            id="agent-username"
            required
            autoComplete="username"
            value={form.username}
            onChange={(e) => setForm((current) => ({ ...current, username: e.target.value }))}
            className="w-full rounded-lg border border-[#071b1e]/15 px-4 py-3 text-sm outline-none transition focus:border-[#00838f] focus:ring-2 focus:ring-[#00838f]/12"
          />
        </div>
        <div>
          <label htmlFor="agent-station" className="mb-2 block text-sm font-semibold">Station ID <span className="font-normal text-[#7a8586]">(optional)</span></label>
          <input
            id="agent-station"
            autoComplete="off"
            value={form.station}
            onChange={(e) => setForm((current) => ({ ...current, station: e.target.value }))}
            className="w-full rounded-lg border border-[#071b1e]/15 px-4 py-3 text-sm outline-none transition focus:border-[#00838f] focus:ring-2 focus:ring-[#00838f]/12"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="agent-password" className="text-sm font-semibold">Password</label>
            <Link to="/crm-portal/recovery" className="text-xs font-semibold text-[#00747d]">Need access help?</Link>
          </div>
          <div className="relative">
            <input
              id="agent-password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm((current) => ({ ...current, password: e.target.value }))}
              className="w-full rounded-lg border border-[#071b1e]/15 px-4 py-3 pr-11 text-sm outline-none transition focus:border-[#00838f] focus:ring-2 focus:ring-[#00838f]/12"
            />
            <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#647274]" aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <button type="submit" disabled={working} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d4af37] px-5 py-3.5 text-sm font-bold text-[#071b1e] shadow-lg transition hover:bg-[#e0bd55] disabled:opacity-50">
          {working ? 'Connecting to CRM…' : 'Continue to CRM'} <ArrowRight className="h-4 w-4" />
        </button>
        {status && <p role="status" className="rounded-lg bg-[#f2eee6] p-3 text-xs leading-5 text-[#536367]">{status}</p>}
      </form>
    </PortalLoginShell>
  );
}
