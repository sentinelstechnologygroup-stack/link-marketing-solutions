# Golden Cross Core Bridge Acceptance - 2026-09-23

## Release status

The non-calling Golden Cross core bridge pilot passed. This record does not declare the full LMS platform production-ready because real communications-provider testing, final App Check monitoring, temporary-credential rotation, and the `.com` domain cutover remain open.

## Source and deployment alignment

- Root repository `master`: `1bf0eba` (`Align Agent appointment state with shared contract`)
- Agent CRM source branch: `e474bbe` (`Route appointments through canonical workflow`)
- Customer Portal production deployment: `dpl_849T5rhCJFwJBV8RyGL8VynjVJoV`
- Agent CRM production deployment: `dpl_9KTJGEpLa4r26JCKCJzZmYmXRTE8`
- Firestore rules release: deployed successfully to `linkmarketing-agent-portal-crm` on 2026-09-23
- Production recovery tag: `release/golden-cross-core-pilot-20260923`

## Automated gates

- Customer Portal lint: passed
- Customer Portal production build: passed
- Agent CRM lint: passed
- Agent CRM production build: passed
- Firebase Auth, Firestore, Functions, and Storage emulator suite: 21 of 21 passed
- Customer direct-route HTTP check: 200 with the Vite application shell
- Firestore rule regression: same-tenant customer activity reads allowed; cross-tenant reads and customer writes denied
- Appointment workflow regression: appointment creation advances the canonical lead status to `appointment_scheduled`

## Pilot record

- Lead: `nPo7Py3MPx8uLIE9Akkt`
- Tenant: `tenant-golden-cross-beta`
- Brand: `brand-golden-cross-realty`
- Industry: `real-estate`
- Source: `source-golden-cross-pilot`
- Campaign: `campaign-golden-cross-pilot`
- Test record: yes
- Assigned Agent: `IGQISAALKEPYv8wg69PFUKP6qrt2`
- Routed Client Contact: `4Coo7pmIdPNFYUySIqW7FPVkkz13`
- Qualification: qualified with four required answers recorded
- Call record: one completed synthetic record; no real call was placed
- Appointment: `MeZJ22elGsVl6TVBeTpo`, booked
- Canonical lead status: `appointment_scheduled`
- Customer projection: lead updates and appointment activity visible
- Audit trail: ingestion, Agent updates, and guarded pilot-status repair recorded
- Notifications: recipient-scoped lead, status, and appointment notifications created for authorized users

## Live acceptance evidence

- Server-authorized ingestion ignored browser-supplied tenant and Brand ownership and applied the Golden Cross route contract.
- The assigned Agent Supervisor opened the lead in the production Agent CRM.
- The approved Golden Cross beta script and qualification form rendered correctly.
- The synthetic call record and booked consultation rendered in Agent history.
- The production Customer Portal direct lead URL loaded after a hard refresh.
- The Customer Portal displayed the timeline, all qualification answers, appointment, routed contact, disposition, and notes.
- Customer dashboard metrics displayed 6 leads, 3 completed conversations, 3 qualified opportunities, and 3 appointments, with a 100% qualification rate for the current beta dataset.
- Serialized Firebase timestamps render as relative dates instead of `[object Object]`.
- Customer notifications displayed matching lead and appointment events.
- Production callable requests succeeded with App Check enforcement enabled.
- The permanent Realtor demo was not modified or removed.

## Remaining release gates

- Configure and verify the production Resend sender and API key.
- Configure and verify Twilio calling, transfer, status, and recording callbacks.
- Decide whether SMS is enabled for launch and test it if enabled.
- Run a provider-backed Golden Cross call, transfer, recording, email, and optional SMS pilot with approved test recipients.
- Complete final multi-role production acceptance with dedicated Client Admin, Client Supervisor, Agent, Agent Supervisor, and LMS Super Admin sessions.
- Review App Check production traffic and confirm enforcement readiness for every app surface.
- Rotate or disable temporary acceptance credentials.
- Complete the `.com` DNS, TLS, primary-domain, and `.co` redirect cutover after transfer.
- Perform the final post-provider and post-domain rollback drill.

## Production Storage acceptance - 2026-09-23

- Customer Portal source commit: `efa3da2`
- Vercel production deployment: `dpl_D5WUN1noe9R6SUqctenykHLV9GJR`
- Production alias: `https://customer.linkmarketingservices.co`
- Firebase Storage bucket: `linkmarketing-agent-portal-crm.firebasestorage.app`
- Golden Cross tenant: `tenant-golden-cross-beta`
- Authenticated upload created `lms-golden-cross-storage-acceptance.txt` at a tenant-scoped path.
- Firestore metadata records the matching tenant, storage path, `text/plain` content type, 149-byte size, available status, and authenticated creator UID.
- The live Customer Portal completed the authorized byte fetch and displayed `Download prepared` without the prior CORS failure.
- Independent bucket retrieval confirmed the 149-byte object, SHA-256 `07C4B78BBA6A44DC852CCE24091728E8FD9E8900C79D40EA2E30B0EDB97096A8`, and the expected non-sensitive acceptance marker.
- Tenant audit event `document.metadata.created` targets the matching document ID.
- Bucket CORS is restricted to the LMS website, Customer Portal, Agent Portal, and local development origins for `GET` and `HEAD` only.
- Customer lint and production build passed before deployment.

Storage acceptance: **PASS**.

## Platform acceptance update - 2026-09-23

### Customer Portal release

- Production timestamp normalization was completed in commit `4a67eb3` and deployed as `dpl_3k6LLBCbcaHfwizU28MDGyn79wj1`.
- The live Golden Cross Team & Account route renders profile, business profile, authorized-user, membership, and activity-history sections without the prior Firestore timestamp crash.
- Mobile acceptance covered Leads, Documents, Reports, Appointments, and Team & Account. Tables remain contained, direct routes render, and no page-wide horizontal overflow was observed.
- Protected document upload and download acceptance passed against `tenants/tenant-golden-cross-beta/documents/1790206980281-bca9ca24-1615-4d00-add4-2f7a220df1eb/lms-golden-cross-storage-acceptance.txt`.
- The accepted object is 149 bytes with SHA-256 `07C4B78BBA6A44DC852CCE24091728E8FD9E8900C79D40EA2E30B0EDB97096A8`; its tenant metadata and `document.metadata.created` audit event were confirmed.
- CSV, XLSX, DOCX, PDF, and empty-state export checks passed through `npm run test:exports`.

### Website ingestion acceptance

- The public Website uses same-origin `/api/lead`; the server supplies the route key and webhook secret, and the browser cannot select a tenant, Brand, role, or routing policy.
- Production acceptance lead `A5RpbqBB9VTZRfQ5znEM` was created under `tenant-lms-sales` with Brand `brand-link-marketing-services`, industry `business-services`, source `source-lms-website`, campaign `campaign-lms-website`, routing `routing-lms-sales`, consent `consent-standard`, and retention `retention-standard`.
- The accepted record was created by `server:website-ingestion`, assigned through an active assignment, and produced the expected `lead.ingested` audit and `lead_received` notification.
- Golden Cross bridge lead `nPo7Py3MPx8uLIE9Akkt` remains isolated to `tenant-golden-cross-beta` and `brand-golden-cross-realty`, with Golden Cross routing and policy metadata, a qualified disposition, and an appointment-scheduled status.

### Agent CRM and authorization acceptance

- Agent CRM source and production are aligned at commit `e474bbe542f528f8d26cb967324540b9f8687950`, production deployment `dpl_9KTJGEpLa4r26JCKCJzZmYmXRTE8`.
- The Golden Cross Agent Supervisor dashboard renders the assigned queue and tenant-scoped navigation. The Client Contacts workflow is industry-neutral and uses authorized Brand options and general contact roles.
- Production identity inventory confirms Client, Client Admin, Client Supervisor, Agent, Agent Supervisor, and LMS Super Admin accounts with tenant memberships or Agent assignments as appropriate.
- The Firebase emulator authorization suite passed 21 of 21 tests, including immutable ownership, canonical server routing, all required roles, browser tenant-spoofing denial, cross-tenant and cross-Brand denial, Storage boundaries, workflow artifacts, and LMS Super Admin claim protection.
- Website, Customer Portal, and Agent CRM lint and production builds passed for this acceptance cycle.

### Golden Cross core pilot trace

- Lead `nPo7Py3MPx8uLIE9Akkt` was re-audited from the production database after the release deployments.
- The lead is owned by `tenant-golden-cross-beta` and `brand-golden-cross-realty`, uses the Golden Cross pilot source and campaign, retains the standard consent and retention policies, and was created by `server:website-ingestion`.
- The record is assigned to an existing Agent profile, is qualified, and has status `appointment_scheduled`.
- Related tenant records include booked appointment `MeZJ22elGsVl6TVBeTpo`, completed call record `c5N3tiaFxOUYFmR7NJ9N`, customer activity for lead updates and appointment creation, new/received/appointment notifications, and ingestion and CRM update audit events.
- Every related workflow artifact inspected remains under `tenants/tenant-golden-cross-beta` and carries Golden Cross tenant and Brand ownership where applicable.
- This passes the core data bridge from server-authorized ingestion through Agent workflow and Customer Portal projection. Provider-backed live telephony and external message delivery remain separate release gates.

### Monitoring and open gates

- Bounded Vercel log checks returned no runtime entries for the Website, Customer Portal, or Agent CRM in the queried window. Firebase function history showed no deployment or startup error signal. The Golden Cross pilot must still be observed under active production traffic.
- App Check is enforced for Firestore, Cloud Storage, and Firebase Authentication. The LMS Website, Customer Portal, and Agent CRM each have a separate reCAPTCHA Enterprise registration with a one-hour token TTL.
- Seven-day service metrics showed 162 valid Customer Portal requests and 44 valid Agent CRM authentication requests allowed. Invalid and outdated-token requests were denied. The Website correctly showed no direct Firebase verification traffic because its public ingestion path is server-authorized.
- Live calling, transfers, callbacks, recordings, production email, and optional SMS remain provider-dependent acceptance gates.
- The `.com` primary-domain cutover remains external to this release until the Namecheap transfer and DNS/TLS setup are complete.
- Duplicate legacy Agent assignments exist for selected test identities. They do not broaden tenant or Brand access, but cleanup requires a separately approved production-data maintenance action.

### External readiness recheck

- `https://linkmarketingservices.co`, `https://customer.linkmarketingservices.co`, and `https://agent.linkmarketingservices.co` each completed TLS and returned HTTP 200.
- `linkmarketingservices.com`, `customer.linkmarketingservices.com`, and `agent.linkmarketingservices.com` still resolve to the prior parking infrastructure and did not complete a usable TLS request during this check.
- Deployed Functions `communications`, `twilioWebhook`, and `deliverNotificationEmail` are `ACTIVE` and have the expected Secret Manager bindings.
- `RESEND_API_KEY`, `TWILIO_ACCOUNT_SID`, and `TWILIO_AUTH_TOKEN` remain deliberate `not-configured` placeholder versions. No provider call will be represented as accepted until real credentials, sender identity, phone number, and callback configuration are installed and exercised.

### Live communications implementation boundary

- The Agent CRM currently exposes the preserved call-control workspace, Brand phone-number configuration, recording-policy options, tenant-authorized call initiation, hold/resume/end actions, and routed Client Contact transfer validation.
- Server authorization correctly prevents cross-tenant calls, cross-Brand calls, arbitrary lead-number substitution, and transfers to a number other than the routed Client Contact.
- The current Twilio webhook validates provider signatures but returns connection TwiML only. It does not yet prove provider status synchronization or protected recording ingestion into tenant/Brand Storage.
- The production agent audio path still requires the approved Twilio Flex or Voice connection method, associated Twilio resources, approved calling number, callback URLs, and provider credentials.
- Recording activation must remain disabled until the tenant recording policy, consent capture, jurisdictional requirements, callback ingestion, protected Storage path, retention behavior, and authorized playback/download flow are connected and accepted.
- Therefore telephony, live transfer, and recording are implemented as a guarded integration scaffold, not an accepted production communications channel.

### Current release decision

Core backend, tenant isolation, emulator authorization, Website ingestion, Golden Cross data bridging, Customer Portal reads and writes, exports, Storage, mobile layout, App Check enforcement, and deployment gates pass. Full production readiness is not yet declared because provider-backed live communications and final browser-level production-role revalidation remain open.
