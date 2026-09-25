# 832401306 Calculator Frontend

## Project introduction

This repository contains the browser client for a front-end/back-end separation
calculator system. Users can enter arithmetic expressions, view results, load
calculation history, and delete individual history records.

The frontend does not calculate final results or store history locally. Pressing
`=` sends the expression to the backend, and all history data comes from the
backend SQLite database.

## Public deployment

- Frontend: `https://chenzy3034-ux.github.io/832401306_calculator_frontend/`
- Backend API: `https://chenzy.pythonanywhere.com`

The frontend is deployed free of charge with GitHub Pages. The GitHub Actions
workflow installs the locked npm dependencies, runs the production build, and
publishes `dist/`. The production build uses the PythonAnywhere backend URL
through `VITE_API_BASE_URL` and requires no payment information.

## Technology stack

- React 19
- Vite 8
- JavaScript (ES modules and JSX)
- CSS
- Browser Fetch API

## Runtime environment

- Node.js `20.19.0` or later in the Node 20 line, or Node.js `22.12.0` or later
- npm
- A modern desktop browser
- A running calculator backend API

The project was developed and verified on macOS with Apple Silicon using
Node.js `24.15.0` and npm `11.12.1`.

Check the installed versions:

```sh
node --version
npm --version
```

## Installation

Run all commands in this repository's root directory:

```sh
cd 832401306_calculator_frontend
npm install
```

`npm install` reads `package-lock.json` and installs the dependencies into the
local `node_modules` directory.

## Configuration

The frontend reads the backend base URL from `VITE_API_BASE_URL`. Without an
environment file, it uses this default:

```text
http://127.0.0.1:8000
```

For local development with the default backend address, no configuration is
required. To use a different backend, copy the example file and edit `.env`:

```sh
cp .env.example .env
```

Example `.env`:

```dotenv
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Use only the origin in this value; do not append `/api`. Restart the Vite
development server after changing `.env`. Vite exposes only variables whose
names begin with `VITE_` to browser code, so this value must not contain a
secret.

The backend must allow the frontend origin through CORS. Its default
configuration allows `http://localhost:5173` and
`http://127.0.0.1:5173`.

## Database initialization

The frontend does not create or access the database directly. Database setup
belongs to the backend repository. When the FastAPI service starts, it
automatically creates the SQLite file and the `calculation_history` table if
they do not already exist. Follow the backend README for the database path and
initialization details before starting this frontend.

## Startup

Start the backend first by following the backend repository README. Then, in a
separate terminal, start this frontend:

```sh
cd 832401306_calculator_frontend
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`. Keep both the
frontend and backend terminals running while using the application.

The page loads history from the backend when it opens. Enter an expression by
typing or using the keypad, then press `=`. The interface displays `×` and `÷`,
and sends them to the API as `*` and `/`.

If the backend is unavailable, the interface remains usable for editing an
expression but cannot produce a new result or load or delete history.

## Production build

Create an optimized static build:

```sh
npm run build
```

The output is written to `dist/`. To inspect the built application locally:

```sh
npm run preview
```

When deploying the static files, set `VITE_API_BASE_URL` before running the
build so the generated application points to the deployed backend. The value is
embedded at build time.

## GitHub Pages deployment

The repository includes `.github/workflows/deploy.yml` with the production
configuration:

- build command: `npm ci && npm run build`
- deployed artifact: `dist`
- backend URL: `https://chenzy.pythonanywhere.com`

Pushes to `main` trigger the workflow and publish the site to GitHub Pages over
HTTPS. If the backend address changes, update `VITE_API_BASE_URL` in the
workflow, commit the change, and redeploy.

The Vite production base path is `/832401306_calculator_frontend/` because this
is a GitHub project site. A failed backend request is shown as an error in the
calculator; the browser does not calculate a fallback result.

## Frontend/backend connection

The frontend uses these backend endpoints:

| User action | Request | Purpose |
| --- | --- | --- |
| Press `=` | `POST /api/calculate` | Calculate and save a valid expression |
| Open or refresh the page | `GET /api/history` | Load persisted history |
| Delete one history item | `DELETE /api/history/{id}` | Delete the selected record |

Example calculation request sent by the frontend:

```json
{
  "expression": "(1+2)*3"
}
```

The frontend expects the backend's unified JSON format. A successful response
has `success: true` and the payload in `data`; an error response has
`success: false` and error details in `error`.

## Project structure

```text
.
├── src/
│   ├── components/          # Calculator and history UI components
│   ├── services/            # Backend API client
│   ├── styles/              # Application styles
│   ├── App.jsx              # Application state and request flow
│   └── main.jsx             # React entry point
├── .env.example             # Backend URL example
├── codestyle.md             # Project JavaScript style rules
├── index.html               # Vite HTML entry point
├── package.json             # Scripts and dependencies
├── package-lock.json        # Locked dependency versions
├── .github/workflows/       # GitHub Pages deployment workflow
└── vite.config.js           # Vite configuration
```

## Run checklist

1. Confirm the backend is available at `http://127.0.0.1:8000/health`, or set
   `VITE_API_BASE_URL` to its actual address.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the URL shown by Vite.
5. Enter `1 + 2` and press `=`. The result should be `3`, and a new history
   record should appear.

This directory is designed to be maintained as an independent frontend GitHub
repository.
