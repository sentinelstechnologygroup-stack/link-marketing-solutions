# AGENTS.md

This repository contains the Link Marketing Solutions public website, built with React and Vite for Vercel.

## Project scope

- Public website source lives in `src/`; the lead intake handler lives in `api/`.
- Use Vite and npm workflows. Runtime configuration belongs in Vercel environment variables and local `.env.local` files; never commit secrets.
- The `base44/` directory is retained as an archival/migration reference only. Do not import it into the website or deploy it as an application dependency.
- Firebase-backed website, agent portal, and customer portal work is tracked separately and must not be represented as live until configured and reviewed.
- Production deployments, legal copy changes, and external service configuration require the owner's approval.

## Key files

- `src/App.jsx`: public website routes.
- `src/components/site/Footer.jsx`: portal destinations and site footer.
- `src/pages/GetStarted.jsx`: consented program-review lead form.
- `src/lib/programReviewConsent.js`: versioned consent record shared with the lead handler.
- `api/lead.js`: validated lead relay; requires server-side webhook configuration.
- `vite.config.js`: Vite plugins and source alias.
- `.env.example`: names and safe defaults for runtime configuration.
