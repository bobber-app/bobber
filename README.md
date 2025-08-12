# Bobber
Een cross-platform app die zorgt dat mensen hun drankgewoontes kunnen bijhouden. Zo zie je hoeveel je van alles gedronken hebt en kan je vergelijken met vrienden

## Docker Development Setup

This project uses Docker to provide a consistent development environment. The setup includes:

- Frontend (Ionic/Vue with Vite)
- Backend (NestJS)
- MySQL database

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop/) installed on your machine
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

### Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd bobber
   ```

2. Start the development environment:
   ```bash
   docker-compose up
   ```

This single command will:
- Build and start the frontend, backend, and MySQL services
- Set up the necessary network connections between services
- Mount your local code as volumes for hot reloading
- Expose the services on the following ports:
    - Frontend: http://localhost:5173
    - Backend API: http://localhost:8080
    - MySQL: localhost:3307

### Development Workflow

- The frontend and backend code will automatically reload when you make changes
- Frontend code is in the `app` directory
- Backend code is in the `backend` directory
- Database data is persisted in a Docker volume

### Stopping the Environment

To stop the development environment:

```bash
docker-compose down
```

To stop and remove all containers, networks, and volumes:

```bash
docker-compose down -v
```

## Using pnpm

This repository uses pnpm as the package manager and is configured as a workspace (pnpm-workspace.yaml) with two packages: app (Ionic/Vue) and backend (NestJS).

- Enable Corepack to manage pnpm versions:
  corepack enable
- Install dependencies at the workspace root:
  pnpm install -w

Docker development (recommended):
- Start all services:
  docker-compose up

Run services locally without Docker (optional):
- Backend (NestJS) dev:
  pnpm -C backend start:dev
- Frontend (Vite/Ionic) dev:
  pnpm -C app dev -- --host 0.0.0.0 --port 5173

## naming conventions
### Branch naming rules
a branch should always start with the type, then the issue number and then the description
for example:

feature/12-user-authentication
bugfix/login-redirect-error

### PR naming rules
a PR should always begin with the type, then the description and then the issue number
for example:

Feature: Add OAuth2 authentication (#145)
Bugfix: Fix mobile responsive layout (#298)
Release: Prepare version 2.1.0 (#312)
Hotfix: Resolve SQL injection vulnerability (#456)

## Frontend

Voor de frontend van **Bobber** verkennen we twee krachtige frameworks die beide mobiele én webapplicaties ondersteunen vanuit één codebase: **Quasar** en **Ionic**. Beide zijn geschikt voor PWA's, native apps (via Capacitor), en snelle ontwikkeling met moderne frontend stacks.

---

### Quasar

**Voordelen**
- Eén codebase voor **SPA**, **SSR**, **PWA**, **Mobile (iOS/Android)** én **Desktop (Electron)**.
- Volledige integratie met **Vue.js** – ideaal voor Vue developers.
- Snelle setup via CLI, met veel ingebouwde tooling.
- Zeer goede **PWA**-ondersteuning.
- Mooie standaard UI gebaseerd op **Material Design**.
- Active ondersteuning voor Capacitor en platform targets.

**Nadelen**
- Kleiner ecosysteem dan Ionic, met minder tutorials/templates.
- Kleinere community → minder directe hulp via forums/StackOverflow.
- Sommige **Capacitor-plugins** vereisen handmatige configuratie of integratie.

---

### Ionic

**Voordelen**
- Ondersteunt meerdere frontend frameworks: **Vue**, **React**, én **Angular**.
- Grote community en veel beschikbare plugins/tools.
- Strakke integratie met **Capacitor** voor native device functionaliteit.
- Veel officiële integraties beschikbaar (Firebase, Auth, Payments, enz.).
- Goede documentatie en starters/templates beschikbaar.

**Nadelen**
- UI kan minder 'native' ogen zonder aangepaste styling.
- Werken met **Angular** (indien gekozen) kan complex zijn voor beginners.
- Grotere **bundle size** bij gebruik van veel plugins of 3rd-party componenten.

---

> **Aanbevolen keuze voor Bobber**:  
> **Quasar** is een uitstekende keuze gezien je ervaring met Vue.js, en biedt veel flexibiliteit vanuit één codebase – ideaal voor snelle iteratie en deployment naar meerdere platforms.

## Backend

### Database migrations and seeders
The backend uses MikroORM for migrations and seeders.

- Run pending migrations automatically on app start: already configured in AppModule (runs `migrator.up()` on boot).
- Run migrations manually:
  - pnpm -C backend db:migrate
  - To revert last migration: pnpm -C backend db:migrate:down
- Run seeders manually (runs the default DatabaseSeeder which calls DrinktypeSeeder and UserSeeder):
  - pnpm -C backend db:seed
- Run seeders automatically on app start (optional): set env var SEED=true for the backend service.
  - Example (PowerShell): `$env:SEED='true'; pnpm -C backend start:dev`
  - Example (Docker Compose): add `SEED: "true"` to the backend service environment.

Seeder files live in backend/src/seeders and can be named freely (e.g., UserSeeder.ts). The MikroORM config is set up to discover them and to use DatabaseSeeder as the default.

In dit project verkennen we verschillende backend-opties voor het bouwen van een schaalbare, moderne API voor **Bobber**. De focus ligt op technologieën die goed integreren met een frontend in **Quasar/Ionic** en makkelijk te hosten zijn op **Google Cloud**.

---

### Fastify

**Voordelen**
- Lichtgewicht en zeer performant.
- Volledige TypeScript-ondersteuning.
- Plugin-ecosysteem (Swagger, CORS, JWT, enz.).
- Flexibel en goed geschikt voor serverless omgevingen (Cloud Run, Vercel).
- Lage overhead, ideaal voor API's met veel requests.

**Nadelen**
- Minder structuur: vereisen eigen keuzes qua projectarchitectuur.
- Kleinere community dan NestJS.
- Geavanceerde features (zoals DI) vergen extra setup of libraries.

---

### NestJS

**Voordelen**
- Modulaire architectuur met duidelijke best practices.
- Sterke TypeScript-integratie.
- Grote community, uitstekende documentatie.
- Ondersteuning voor GraphQL, WebSockets, microservices.
- Uitstekend schaalbaar voor grotere projecten of teams.

**Nadelen**
- Meer boilerplate en initiële complexiteit.
- Steilere leercurve door abstracties (modules, providers, interceptors).
- Minder flexibel als je buiten de conventies wil werken.

---

### Laravel

**Voordelen**
- Zeer volwassen framework met alles ingebouwd (ORM, queues, auth, testing).
- Krachtig ecosysteem (Forge, Vapor, Nova).
- Grote community en uitgebreide documentatie.
- Zeer productief voor snelle ontwikkeling.

**Nadelen**
- Gebaseerd op PHP, minder goed afgestemd op een JS/TS frontend stack.
- Minder integratie met moderne serverless/cloud-native Node-omgevingen.
- Geen type safety tussen frontend en backend.

---

### Deno

**Voordelen**
- Moderne runtime met ingebouwde TypeScript ondersteuning.
- Veiligere standaardinstellingen dan Node.js.
- Supersnelle startup-tijden (ideaal voor serverless).
- Geen `node_modules`: clean dependency management via URLs.

**Nadelen**
- Nog jong ecosysteem.
- Minder compatibiliteit met bestaande Node.js libraries.
- Minder tutorials, tooling en community-ondersteuning.

---

### Nitro (van Nuxt-team)

**Voordelen**
- Minimalistische backend-engine, geoptimaliseerd voor serverless.
- Perfect inzetbaar op Cloudflare, GCP, Vercel.
- Volledige TypeScript support.
- Supersnel op te zetten via file-based API (`/api/*.ts` structuur).

**Nadelen**
- Minder geschikt voor complexe backend-logica of grote codebases.
- Geen klassieke MVC-structuur of ingebouwde DI.
- Gericht op Nuxt/JAMstack, minder standalone als backend framework.

---

> **Aanbevolen keuze voor Bobber**:  
> **NestJS** voor zijn schaalbaarheid, structuur en lange termijn onderhoud – met een goed ecosysteem voor groeiende features, realtime ondersteuning en TypeScript integratie.




