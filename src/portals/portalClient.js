// @ts-nocheck
const API_ROOTS = {
  customer: import.meta.env.VITE_CUSTOMER_PORTAL_API_URL || '',
  crm: import.meta.env.VITE_CRM_PORTAL_API_URL || '',
};

export class PortalConfigurationError extends Error {
  constructor(portal) {
    super(`The ${portal} authentication service has not been connected yet.`);
    this.name = 'PortalConfigurationError';
  }
}

async function request(portal, path, options = {}) {
  const root = API_ROOTS[portal];
  if (!root) throw new PortalConfigurationError(portal);

  const csrf = document.querySelector('meta[name="csrf-token"]')?.content || '';
  const response = await fetch(`${root.replace(/\/$/, '')}${path}`, {
    ...options,
    credentials: 'include',
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(csrf ? { 'X-CSRF-Token': csrf } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || 'Unable to complete the secure request.');
  }

  return response.status === 204 ? null : response.json();
}

export const customerPortalClient = {
  isConfigured: () => Boolean(API_ROOTS.customer),
  getSession: () => request('customer', '/auth/session'),
  signIn: (credentials) => request('customer', '/auth/session', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  verifyMfa: (challenge) => request('customer', '/auth/mfa/verify', {
    method: 'POST',
    body: JSON.stringify(challenge),
  }),
  signOut: () => request('customer', '/auth/session', { method: 'DELETE' }),
  getDashboard: () => request('customer', '/dashboard'),
  getLeads: () => request('customer', '/leads'),
  getAppointments: () => request('customer', '/appointments'),
  getReports: () => request('customer', '/reports'),
  getBilling: () => request('customer', '/billing'),
  getDocuments: () => request('customer', '/documents'),
  getNotifications: () => request('customer', '/notifications'),
  getSecurity: () => request('customer', '/security'),
};

export const crmPortalClient = {
  signIn: (credentials) => request('crm', '/auth/session', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  verifyMfa: (challenge) => request('crm', '/auth/mfa/verify', {
    method: 'POST',
    body: JSON.stringify(challenge),
  }),
};
