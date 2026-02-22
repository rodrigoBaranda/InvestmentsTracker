# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

InvestmentsTracker is a private full-stack investment portfolio dashboard. It allows users to log buy/sell trades, track currency fluctuations, and visualize portfolio gains.

**Planned stack:**
- **Frontend:** React
- **Backend:** Python REST API

## Architecture

The project follows a client-server architecture:
- React frontend communicates with the Python backend via REST endpoints
- The backend handles trade logging, currency tracking, and portfolio calculations
- The frontend renders the dashboard and data visualizations

## Branching

All new work must be done on a feature branch. Never commit directly to `main` or `dev`. Branch naming:
- `feat/<short-description>` for new features
- `fix/<short-description>` for bug fixes
- `test/<short-description>` for test/experiment branches

PRs merge into `dev`; `main` is reserved for stable releases.

## Development Setup

Dependencies are managed with [uv](https://docs.astral.sh/uv/). Environment variables (e.g. `DATABASE_URL`) go in `.env` — see `.env.example` for the expected keys.

## Testing

Every function must have a corresponding unit test.

**Backend** — tests live in `tests/` mirroring the source structure:
```bash
uv run pytest
```

**Frontend** — tests live alongside source files as `*.test.js`, run with:
```bash
cd frontend && npm test
```
