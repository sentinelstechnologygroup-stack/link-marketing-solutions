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
