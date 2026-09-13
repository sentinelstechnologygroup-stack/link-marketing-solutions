# Portal production security contract

The portal UI and API adapter are deliberately independent of Base44. Before production data is connected, the external customer and CRM services must enforce these controls server-side.

## Authentication and sessions

- OIDC/OAuth 2.1 or equivalent standards-based identity provider
- MFA required for owners, administrators, billing roles, and CRM agents
- Passwords hashed with Argon2id or provider-managed equivalent
- Secure, HttpOnly, SameSite session cookies; no access tokens in localStorage
- CSRF protection on every state-changing request
- Short idle timeout and absolute session lifetime
- Refresh-token rotation, reuse detection, and global session revocation
- Rate limits, progressive delays, credential-stuffing detection, and lockout protection
- Generic authentication errors that do not disclose whether an account exists
- Recovery flows with single-use, expiring tokens and step-up verification
- Device and new-location notifications

## Authorization and tenancy

- Server-enforced tenant isolation on every query and mutation
- Deny-by-default role permissions: owner, administrator, manager, billing, viewer
- CRM roles managed only by the CRM
- Step-up MFA for billing, user invitations, role changes, exports, and security changes
- No client-supplied tenant ID may be trusted without server-side membership validation
- Signed, expiring URLs for documents and exports

## Data protection

- TLS in transit and encryption at rest
- Secrets stored only in the production secret manager
- Sensitive fields minimized, classified, and redacted from logs
- File type, size, and malware validation before document storage
- Export limits, watermarking where appropriate, and audit records
- Defined retention/deletion schedules and verified backup restoration
- Payment details handled only by the selected PCI-compliant processor

## Monitoring and audit

- Append-only audit trail for sign-ins, exports, billing, permissions, files, and security changes
- Centralized security logging with alerting for anomalous access
- Request IDs across browser, API, and worker logs
- Dependency and container vulnerability scanning
- Incident response, breach notification, and account recovery procedures

## Browser protections

Configure the production host with CSP, HSTS, Referrer-Policy, Permissions-Policy, X-Content-Type-Options, frame-ancestors, and secure cache headers. Portal responses containing customer information must use Cache-Control: no-store.

## Required environment connections

- VITE_CUSTOMER_PORTAL_API_URL
- VITE_CRM_PORTAL_API_URL

The UI must remain in preview mode until the external APIs, identity provider, tenant authorization tests, and security acceptance tests are complete.
