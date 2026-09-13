import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import PortalLoginShell from '@/components/portal/PortalLoginShell';
import PortalMeta from '@/components/portal/PortalMeta';
import { customerPortalClient, PortalConfigurationError } from '@/portals/portalClient';

export default function CustomerPortalLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', rememberDevice: false });
  const [status, setStatus] = useState('');
  const [working, setWorking] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setWorking(true);
    setStatus('');
    try {
      const result = await customerPortalClient.signIn(form);
      if (result?.mfa_required) {
        setStatus('Verification required. Continue with your configured MFA method.');
      } else {
        navigate('/customer-portal/dashboard', { replace: true });
      }
    } catch (error) {
      setStatus(error instanceof PortalConfigurationError
        ? 'Customer authentication is ready for connection to the production identity service. No credentials were transmitted.'
        : error.message);
    } finally {
      setWorking(false);
    }
  };

  return (
    <PortalLoginShell
      eyebrow="Customer Portal"
      title="Welcome back."
      subtitle="Sign in to review lead activity, appointments, reports, billing, documents, and program performance."
      badge="Protected customer workspace"
      footer={
        <p className="mt-6 text-center text-xs text-[#6b7677]">
          Need help accessing your account? <Link to="/get-started" className="font-semibold text-[#00747d] hover:text-[#b68a27]">Contact Link support</Link>
        </p>
      }
    >
      <PortalMeta title="Customer Portal Sign In | Link Marketing Services" />
      <form onSubmit={submit} className="space-y-5">
        <div>
          <label htmlFor="customer-email" className="mb-2 block text-sm font-semibold">Business email</label>
          <input
            id="customer-email"
            type="email"
            required
            autoComplete="username"
            value={form.email}
            onChange={(e) => setForm((current) => ({ ...current, email: e.target.value }))}
            className="w-full rounded-lg border border-[#071b1e]/15 px-4 py-3 text-sm outline-none transition focus:border-[#00838f] focus:ring-2 focus:ring-[#00838f]/12"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="customer-password" className="text-sm font-semibold">Password</label>
            <button type="button" className="text-xs font-semibold text-[#00747d] hover:text-[#b68a27]">Forgot password?</button>
          </div>
          <div className="relative">
            <input
              id="customer-password"
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
        <label className="flex items-center gap-3 text-sm text-[#536367]">
          <input
            type="checkbox"
            checked={form.rememberDevice}
            onChange={(e) => setForm((current) => ({ ...current, rememberDevice: e.target.checked }))}
            className="h-4 w-4 rounded border-[#071b1e]/20 accent-[#00838f]"
          />
          Trust this device for 30 days
        </label>
        <button type="submit" disabled={working} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#d4af37] px-5 py-3.5 text-sm font-bold text-[#071b1e] shadow-lg transition hover:bg-[#e0bd55] disabled:opacity-50">
          {working ? 'Connecting securely…' : 'Sign in securely'} <ArrowRight className="h-4 w-4" />
        </button>
        {status && <p role="status" className="rounded-lg bg-[#f2eee6] p-3 text-xs leading-5 text-[#536367]">{status}</p>}
        <div className="border-t border-[#071b1e]/10 pt-5 text-center">
          <Link to="/customer-portal/dashboard" className="text-xs font-semibold text-[#00747d] underline-offset-4 hover:underline">
            Preview the customer dashboard interface
          </Link>
        </div>
      </form>
    </PortalLoginShell>
  );
}
