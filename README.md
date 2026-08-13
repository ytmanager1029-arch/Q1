# Quadrick

A production-ready full-stack website for **Quadrick**, a web development studio.

The public site is an editorial marketing experience. The backend stores project inquiries in MongoDB and exposes a protected admin dashboard for managing them.

This is a real application — the contact form, authentication, inquiry management, and audit log are wired end to end.

## Tech stack

| Layer | Stack |
| --- | --- |
| Frontend | React 18, Vite, TypeScript, Tailwind CSS, React Router, Lucide |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB (Atlas in production; in-memory fallback in local dev) |
| Auth | bcrypt password hashing, JWT in HTTP-only cookies |
| Frontend host | Vercel |
| API host | Render |
| Repository | GitHub |

## Folder structure

```
Q1/
├── client/                  # Vite + React frontend
│   ├── public/              # favicon, robots, sitemap, images
│   └── src/
│       ├── components/
│       ├── data/            # editable public content
│       ├── hooks/
│       ├── layouts/
│       ├── lib/
│       ├── pages/
│       └── styles/
├── server/                  # Express API
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── scripts/
│       ├── services/
│       └── utils/
├── .env.example
├── package.json             # npm workspaces
├── render.yaml
└── vercel.json
```

## Local development

Requires Node.js 20+.

```bash
git clone <this-repo>
cd Q1
cp .env.example .env
# set AUTH_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD
npm install
npm run dev
```

- Site: http://localhost:5173
- API: http://localhost:4000
- Admin: http://localhost:5173/admin/login

If `MONGODB_URI` is empty **and** `NODE_ENV` is not `production`, the API uses a local document store at `server/.data/` so you can develop without Atlas. This store is for local development only. Production requires MongoDB Atlas via `MONGODB_URI`.

### Scripts

```bash
npm run dev            # client + server
npm run dev:client
npm run dev:server
npm run build
npm run seed           # seed admin from env
npm test               # server validation tests
```

## Environment variables

See `.env.example`. Never commit `.env`.

| Variable | Where | Purpose |
| --- | --- | --- |
| `PORT` | server | API port (default `4000`) |
| `NODE_ENV` | server | `development` or `production` |
| `MONGODB_URI` | server | Atlas connection string (required in production) |
| `AUTH_SECRET` | server | JWT signing secret (32+ random characters) |
| `AUTH_EXPIRES_DAYS` | server | Session lifetime, default `7` |
| `CLIENT_URL` | server | Allowed frontend origin (Vercel URL) |
| `ADMIN_EMAIL` | server | Seeded admin email |
| `ADMIN_PASSWORD` | server | Seeded admin password (min 12 chars) |
| `ADMIN_RESET` | server | `true` to reset that admin password on boot |
| `VITE_API_URL` | client build | Render API origin. Leave empty locally (Vite proxies `/api`) |
| `VITE_SITE_URL` | client build | Public site origin for canonical / Open Graph tags |

## MongoDB Atlas setup

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user.
3. Allow the Render IP (or `0.0.0.0/0` if you must; tighten later).
4. Copy the `mongodb+srv://…` URI and set `MONGODB_URI`.
5. Use a dedicated database name, e.g. `quadrick`.

The React app never talks to MongoDB. Only the Express server does.

## Admin setup

There is no public registration.

1. Set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in the server environment.
2. Start the server. If that user does not exist, it is created.
3. Sign in at `/admin/login`.
4. Change the password from **Settings** after first login.
5. Set `ADMIN_RESET=true` only if you need to force a password reset, then turn it off.

## Database schema

**Inquiry**

- `name`, `email`, `phone`, `company`, `website`
- `projectType`, `budget`, `timeline`, `message`, `source`
- `priority` — Low | Medium | High | Urgent (default Medium)
- `status` — New | Contacted | In Discussion | Won | Lost | Archived (default New)
- `createdAt`, `updatedAt`

**User**

- `email`, `passwordHash`, `role`, `lastLoginAt`, lockout fields

**AuditLog** (append-only)

- `action`, `entityType`, `entityId`, `adminId`, `metadata`, `timestamp`

## API

Public

- `POST /api/inquiries`
- `GET  /api/health`

Auth

- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET  /api/auth/me`
- `PATCH /api/auth/password`

Admin (cookie required)

- `GET    /api/admin/stats`
- `GET    /api/admin/inquiries`
- `GET    /api/admin/inquiries/:id`
- `PATCH  /api/admin/inquiries/:id`
- `DELETE /api/admin/inquiries/:id`
- `GET    /api/admin/audit-logs`

## Authentication architecture

1. Admin password is hashed with bcrypt (12 rounds).
2. Login sets an HTTP-only cookie (`qrk_session`) containing a JWT.
3. Production cookies are `Secure` and `SameSite=None` so Vercel can call Render with credentials.
4. Admin routes run `requireAuth` and reject missing/invalid sessions with a generic error.
5. Login is rate limited. Accounts lock briefly after repeated failures.
6. Logout clears the cookie and writes an audit event.

## Editing public content

Do not build a CMS. Edit:

- `client/src/data/site.ts`
- `client/src/data/services.ts`
- `client/src/data/projects.ts`
- `client/src/data/faq.ts`
- `client/src/data/testimonials.ts`

Sample work and testimonials are marked as placeholders.

## Vercel (frontend)

1. Import the GitHub repository.
2. Framework: Vite.
3. Root can stay the repository root (uses `vercel.json`) **or** set the project root to `client`.
4. Build command: `npm run build -w client` (root) or `npm run build` (client root).
5. Output: `client/dist` (root) or `dist` (client root).
6. Environment:
   - `VITE_API_URL` = `https://<your-render-service>.onrender.com`
   - `VITE_SITE_URL` = `https://<your-vercel-domain>`
7. Redeploy after changing `VITE_*` variables.

## Render (backend)

1. New Web Service from the same GitHub repo.
2. Root directory: `server`
3. Build: `npm install && npm run build`
4. Start: `npm start`
5. Environment: `NODE_ENV=production`, `MONGODB_URI`, `AUTH_SECRET`, `CLIENT_URL` (your Vercel origin), `ADMIN_EMAIL`, `ADMIN_PASSWORD`
6. Health check: `/api/health`

`CLIENT_URL` must be the exact frontend origin. Production CORS does not allow `*`.

## GitHub

- Default branch is the source of truth.
- Never commit `.env`, `node_modules`, or secrets.
- Pull requests should keep frontend and API compatible.

## Security notes

- Passwords are never stored in plaintext.
- Admin APIs are cookie-authenticated.
- Input is validated on the server with Zod.
- Keys starting with `$` are stripped from request bodies.
- Helmet, compression, and rate limits are enabled.
- Request bodies are capped at 32kb.
- Production 500s do not leak stack traces.
- MongoDB credentials live only in environment variables.

## Local admin (development)

If you use the example values from a private `.env` (not committed):

- Email: the `ADMIN_EMAIL` you set
- Password: the `ADMIN_PASSWORD` you set

Change both before any public deploy.
