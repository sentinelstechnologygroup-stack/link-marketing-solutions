# LMS production rollback runbook

Last verified: 2026-09-21

## Purpose

This runbook restores the LMS Website, Customer Portal, Agent CRM, and shared
Firebase platform to the final internally accepted release. It preserves all
tenant data, audit history, Storage objects, the permanent Realtor demo, the
Golden Cross demo, and the isolated Golden Cross beta tenant.

Rollback is an application recovery operation. It is never a data-deletion or
demo-removal operation.

## Verified recovery baseline

| Surface | Recovery point | Verification |
| --- | --- | --- |
| Platform and Customer source | `release/internal-ready-20260921` at `f52be0fb4364ae72c85905b749128081f7b02768` | Git tag resolves locally |
| Agent CRM source | `release/agent-lint-clean-20260921` at `5645238c0fa91cec08db953e5781e59a30d872d6` | Git tag resolves in `AgentCRM` |
| Website production | `dpl_H8FJ8yZw1h9GnKKwFRTrztTeDCH5` | Vercel status `Ready`; owns `linkmarketingservices.co` and `www.linkmarketingservices.co` |
| Customer Portal production | `dpl_CKoRKWsC2vWRsvY7nNMUWBkqVvKP` | Vercel status `Ready`; owns `customer.linkmarketingservices.co` |
| Agent CRM production | `dpl_A6NgmKwG3nHkax9RDMv7uP1tweRq` | Vercel status `Ready`; owns `agent.linkmarketingservices.co` |
| Firebase platform | project `linkmarketing-agent-portal-crm` | 37 of 37 deployed Functions report `ACTIVE` |

The Customer Vercel deployment also reserves
`customer.linkmarketingservices.com`. Do not make `.com` primary until its
external DNS and TLS gate passes.

## Supporting Firebase release tags

These tags isolate the principal backend changes if a targeted recovery is
safer than restoring the complete platform baseline.

| Capability | Tag | Commit |
| --- | --- | --- |
| Transactional email | `release/tenant-email-delivery-20260921` | `41b56b927d28be93b32433adcfe5256f26345497` |
| Twilio Secret Manager bindings | `release/twilio-secret-bindings-20260921` | `0048ac9ed38a932d9e0e35aa92595dafb9b2ace4` |
| LMS Super Admin acceptance | `release/lms-super-admin-acceptance-20260921` | `2361a6de6c9beaabee855b6979ef487157950f29` |
| Agent Supervisor acceptance | `release/agent-supervisor-acceptance-20260921` | `2bd7814465142f8f8810c750d1678c8cad80b8d1` |
| Consolidated internal gate | `release/consolidated-internal-gate-20260921` | `f7c29efa4a2f3646e6c352fd0a67fcb920969384` |

## Before changing production

1. Identify the affected surface and the first failing release.
2. Review Vercel and Firebase logs to distinguish a frontend, Function, rules,
   provider, DNS, or data issue.
3. Stop new traffic only when necessary. Disable the affected trusted
   `ingestionRoutes/{routeKey}` route or suspend the affected tenant instead of
   deleting records.
4. Record the current deployment IDs, Function hashes, incident time, affected
   tenants, and operator.
5. Confirm that the selected recovery point predates the regression.
6. Do not rotate or replace secrets as part of a source rollback unless the
   incident specifically involves a compromised secret.

## Website rollback

Inspect the known-good deployment before promoting it:

```powershell
npx --yes vercel inspect dpl_H8FJ8yZw1h9GnKKwFRTrztTeDCH5 --scope patricks-projects-d91b3d9e
```

Restore it only during an approved incident:

```powershell
npx --yes vercel rollback dpl_H8FJ8yZw1h9GnKKwFRTrztTeDCH5 --yes --scope patricks-projects-d91b3d9e
```

Confirm both Website aliases return HTTPS 200 and that lead submission remains
server-authorized before reopening traffic.

## Customer Portal rollback

Inspect the known-good deployment before promoting it:

```powershell
npx --yes vercel inspect dpl_CKoRKWsC2vWRsvY7nNMUWBkqVvKP --scope patricks-projects-d91b3d9e
```

Restore it only during an approved incident:

```powershell
npx --yes vercel rollback dpl_CKoRKWsC2vWRsvY7nNMUWBkqVvKP --yes --scope patricks-projects-d91b3d9e
```

Confirm `customer.linkmarketingservices.co` points to the restored deployment.
Verify sign-in, the dashboard, one tenant-scoped read, one authorized write, a
document download, and one report export.

## Agent CRM rollback

Inspect the known-good deployment before promoting it:

```powershell
npx --yes vercel inspect dpl_A6NgmKwG3nHkax9RDMv7uP1tweRq --scope patricks-projects-d91b3d9e
```

Restore it only during an approved incident:

```powershell
npx --yes vercel rollback dpl_A6NgmKwG3nHkax9RDMv7uP1tweRq --yes --scope patricks-projects-d91b3d9e
```

Confirm `agent.linkmarketingservices.co` points to the restored deployment.
Verify Agent and Supervisor sign-in, assigned tenant selection, Brand filtering,
lead disposition, and appointment access. Confirm the permanent Realtor demo
still operates independently.

## Firebase rules, indexes, Storage, and Functions rollback

Use an isolated worktree so the active workspace and Agent CRM submodule are not
rewritten:

```powershell
git worktree add ..\lms-platform-rollback release/internal-ready-20260921
Set-Location ..\lms-platform-rollback\firebase\functions
npm ci
Set-Location ..
firebase deploy --project linkmarketing-agent-portal-crm --only "firestore:rules,firestore:indexes,storage,functions"
```

After recovery, remove the temporary worktree from the original repository:

```powershell
git worktree remove ..\lms-platform-rollback
```

For a targeted Function recovery, check out the matching supporting tag and
deploy only the affected exported Function names. Do not deploy an older full
Function bundle merely to recover one provider integration.

Secret Manager values are not stored in Git and are not replaced by this
procedure. The currently deployed provider placeholders remain safe until real
Resend and Twilio credentials are approved.

## App Check emergency recovery

If valid production users are blocked by App Check rather than authorization:

1. Change only the affected Firebase service from `ENFORCED` to `UNENFORCED`.
2. Keep tenant memberships, Agent assignments, Brand restrictions, Firestore
   rules, Storage rules, and callable authorization enabled.
3. Verify legitimate Customer and Agent browser attestation.
4. Correct the affected Web App registration or production environment value.
5. Re-enable enforcement after valid tokens are observed.

App Check recovery must never be implemented by weakening tenant or Brand
authorization.

## Data-preservation requirements

- Never delete tenant, lead, appointment, notification, audit, recording,
  document, invoice, membership, assignment, or Storage records during rollback.
- Never delete or repurpose the permanent Realtor demo or
  `tenant-golden-cross-demo`.
- Keep `tenant-golden-cross-beta` isolated from demo and other production
  tenants.
- Preserve immutable `tenantId`, `brandId`, `industryId`, routing, consent,
  retention, and received timestamp ownership fields.
- Disable or suspend a failing route or tenant while retaining its evidence and
  audit history.
- Never point the Website or either portal at the reserved Firebase projects
  `linkmarketing-website` or `linkmarketing-customer-portal`.

## Post-rollback acceptance

1. Confirm the Website, Customer Portal, and Agent CRM `.co` endpoints return
   HTTPS 200.
2. Confirm Firebase health reports `status: ok`.
3. Confirm all expected Functions are `ACTIVE`.
4. Verify Client, Client Admin, Client Supervisor, Agent, Agent Supervisor, and
   LMS Super Admin access boundaries.
5. Verify a user cannot expand access by supplying a tenant, Brand, or role in
   the browser.
6. Verify cross-tenant and cross-Brand read, write, export, and download attempts
   remain denied.
7. Verify the permanent Realtor demo and Golden Cross beta remain separate.
8. Review Vercel, Firebase Function, and Cloud Run error logs before reopening
   traffic.
9. Record the rollback result and the new production deployment identities.

## Non-destructive drill record

The 2026-09-21 drill changed no production state.

- The platform and Agent CRM release tags resolved to the exact commits recorded
  above.
- All three Vercel recovery deployments were inspectable and reported `Ready`.
- The `.co` aliases were attached to the expected recovery deployments.
- Firebase reported 37 deployed Functions, 37 `ACTIVE`, and zero non-active.
- Critical workflow, notification, communications, assignment, industry, lead,
  and appointment Functions reported `ACTIVE`.
- No alias promotion, rules deployment, Function deployment, data write, tenant
  change, secret change, or App Check mode change was performed.

Repeat the drill after real communications providers are activated and again
after the `.com` domain cutover. Those later drills must record the provider and
domain recovery points added at that time.

## Core bridge recovery candidate - 2026-09-23

Use this recovery point for the accepted non-calling Golden Cross core bridge:

- Root source: `1bf0eba`
- Agent CRM source: `e474bbe`
- Customer Portal deployment: `dpl_849T5rhCJFwJBV8RyGL8VynjVJoV`
- Agent CRM deployment: `dpl_9KTJGEpLa4r26JCKCJzZmYmXRTE8`
- Recovery tag: `release/golden-cross-core-pilot-20260923`

If only the latest Customer presentation release must be reversed, promote Customer deployment `dpl_5p9wADGVmbLVrSqLBzmZTTx12hJj`. If only the Agent adapter release must be reversed, promote Agent deployment `dpl_8gg9tbd72X6sRZD2o9s2HndHokGX`. Do not delete or rewrite Golden Cross beta data during an application rollback. The synthetic pilot status repair is preserved by audit event `UsFnyKEu2FNUelQzA0Qv` and may be reversed only through a separately reviewed data correction.

## Customer Portal Storage release - 2026-09-23

- Recovery source commit: `efa3da2`
- Verified deployment: `dpl_D5WUN1noe9R6SUqctenykHLV9GJR`
- Recovery tag: `release/golden-cross-storage-acceptance-20260923`
- Storage CORS rollback: `gcloud storage buckets update gs://linkmarketing-agent-portal-crm.firebasestorage.app --clear-cors`
- If the Customer Portal must be rolled back, promote the previous stable Vercel deployment and restore the matching source tag. Do not delete tenant data, Storage objects, audit records, or permanent demo fixtures during rollback.

## Acceptance recovery point - 2026-09-23

The accepted recovery point includes:

- Root repository commit containing Customer Portal timestamp normalization and the recorded platform acceptance evidence.
- Customer Portal production deployment `dpl_3k6LLBCbcaHfwizU28MDGyn79wj1`.
- Agent CRM production deployment `dpl_9KTJGEpLa4r26JCKCJzZmYmXRTE8` at commit `e474bbe542f528f8d26cb967324540b9f8687950`.
- Existing recovery tags `release/golden-cross-core-pilot-20260923` and `release/golden-cross-storage-acceptance-20260923`.
- Storage bucket `gs://linkmarketing-agent-portal-crm.firebasestorage.app` with the accepted least-privilege CORS policy.

### Application rollback order

1. Preserve current Firebase records and export the affected tenant records before changing production aliases.
2. Restore the Website, Customer Portal, or Agent CRM production alias to its recorded stable deployment in Vercel.
3. Restore Firestore, Storage, index, or Function configuration only when the incident is isolated to that layer; do not roll back tenant data to repair a frontend-only incident.
4. Re-run authenticated direct-route, tenant-isolation, document-access, and ingestion checks after rollback.
5. Record the incident, affected tenant and Brand, deployment IDs, audit events, and final recovery action.

### Storage CORS rollback

If the accepted download CORS policy causes an incident, clear it with:

```powershell
gcloud storage buckets update gs://linkmarketing-agent-portal-crm.firebasestorage.app --clear-cors
```

After clearing the policy, protected browser downloads will stop working until an approved replacement policy is applied. Upload objects and Firestore document metadata are not deleted by this command.

### App Check rollback

- Firestore, Cloud Storage, and Firebase Authentication baseline protection are currently enforced.
- The LMS Website, Customer Portal, and Agent CRM each use a separate reCAPTCHA Enterprise registration with a one-hour token TTL.
- If legitimate production traffic is rejected, disable enforcement only for the affected Firebase product while leaving App Check registration and monitoring intact.
- Verify Website ingestion, authenticated Customer reads, Agent operations, and protected Storage downloads after any enforcement change.
- The Website uses server-authorized ingestion and is not expected to produce direct Firestore, Storage, or Authentication App Check verification traffic.

### Provider and domain rollback boundaries

- Twilio, email-provider, and SMS configuration must be rolled back in the provider console and corresponding server secrets together.
- Do not expose provider credentials in Vercel logs, Firebase logs, browser configuration, or this runbook.
- During the future `.com` cutover, retain working `.co` aliases until HTTPS, authentication, App Check, direct routes, and redirects pass on every application.
## Twilio deployment rollback checkpoint

Recorded September 23, 2026 (CDT).

### Source checkpoints

- Platform pre-Twilio tag: `rollback/pre-twilio-platform-20260923` at `84f9268`.
- Platform deployed tag: `release/twilio-safe-scaffold-platform-20260923` at `cfcfbd9`.
- Agent pre-Twilio tag: `rollback/pre-twilio-agent-20260923` at `e474bbe`.
- Agent deployed tag: `release/twilio-safe-scaffold-agent-20260923` at `fea3537`.

### Deployment checkpoints

- Current Agent production deployment: `https://link-marketing-solutions-agent-9tgnwkw70.vercel.app`.
- Previous Agent production deployment: `https://link-marketing-solutions-agent-4s7v8r4tf.vercel.app`.
- Current Firebase revisions: `communications-00019-quv`, `twiliowebhook-00018-cih`, and `provisionclient-00010-hig`.
- Previous Firebase revisions: `communications-00018-qak`, `twiliowebhook-00017-peg`, and `provisionclient-00009-pid`.

### Restore procedure

1. Immediately disable outbound calling by removing or replacing the deployed Twilio credentials and originating-number configuration if provider traffic must stop.
2. Restore the Agent CRM by promoting the previous production deployment in Vercel, or deploy `rollback/pre-twilio-agent-20260923`.
3. Restore Firebase Functions by deploying the platform source at `rollback/pre-twilio-platform-20260923`. Do not redirect Cloud Run traffic manually unless the corresponding source and environment configuration are confirmed.
4. Confirm the Agent login and preserved CRM layouts still load, then verify that unsigned Twilio webhook traffic is rejected.
5. Review Firebase and Vercel logs before reopening calling. Preserve call, audit, and recording metadata for incident review; do not delete tenant records during rollback.
