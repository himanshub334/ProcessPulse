# SprintSync — Technical Program & Feature Delivery Tracking Platform

A full-stack technical program management platform for coordinating multi-team feature delivery, dependencies, milestones, stakeholder decisions, Jira synchronization, and engineering delivery metrics.

## Stack
React + TypeScript + Tailwind CSS + Recharts · Node.js + Express + TypeScript · PostgreSQL · Jira Cloud REST API · Docker · GitHub Actions

## Features
- Multi-team sprint board with issue status and dependency relationships.
- Dependency DAG with blocked/blocking visualization and cycle-safe traversal.
- Milestones and critical-path highlighting.
- RAG schedule health based on remaining story points vs remaining sprint days.
- Stakeholder communication log for meeting notes, decisions, action items, owners and due dates.
- Jira Cloud synchronization adapter for epics, stories, bugs and velocity.
- Weekly delivery health digest with on-track/at-risk/delayed features and owners.
- Delivery metrics: 8-week velocity trend, cycle time by issue type, deployment frequency.
- PostgreSQL persistence and REST API.
- Responsive React dashboard with Recharts.
- Docker Compose and GitHub Actions CI.

> The sample data and analytics are intentionally synthetic. Do not present the sample bug-underestimation or delivery-improvement figures as measured production outcomes until you run the included data workflow on real data.

## Quick start

```bash
docker compose up --build
```

Frontend: http://localhost:5173  
API: http://localhost:4000/health

The database is seeded automatically by the API container on startup.

### Local development

```bash
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev
```

## Jira integration
Set these variables in `.env`:

```env
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_EMAIL=you@example.com
JIRA_API_TOKEN=replace-me
JIRA_PROJECT_KEY=PROJ
```

Then call `POST /api/jira/sync`. The implementation uses Jira Cloud's REST API and maps issues into SprintSync records. Keep API tokens in environment variables or a secrets manager.

## GitHub

```bash
git init
git add .
git commit -m "Initial commit - SprintSync delivery tracking platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/SprintSync.git
git push -u origin main
```
