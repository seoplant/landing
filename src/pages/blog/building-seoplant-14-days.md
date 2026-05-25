---
title: "How We Built SEOplant — A 14-Day Dev Log from Idea to Live Product"
date: "2026-05-25"
excerpt: "From a ChatGPT conversation to a deployed SaaS with competitor analysis, SEO engine, programmatic content, and a live dashboard — all in 14 days with AI-assisted development."
tags: ["Build in Public", "SaaS", "AI Development"]
---

# How We Built SEOplant — 14 Days from Idea to Live Product

On May 24, 2026, I had a conversation with ChatGPT about the business models of Base44 and 10Web. Two weeks later, SEOplant was live — an open-source AI Programmatic SEO Platform with a working SaaS backend, deployed to production, with real SEO data flowing through it.

Here's exactly what happened, day by day.

## Day 1-2: Research & Strategy

The initial spark was a simple question: "What if AI didn't just build websites — what if it built SEO strategies?"

We analyzed 30+ competitors across four categories:
- **AI SEO tools** (Byword, Surfer, Frase, MarketMuse)
- **AI website builders** (10Web, Durable, Wix AI, Framer)
- **AI app builders** (Base44, Lovable, Bolt, Replit)
- **Data APIs** (DataForSEO, SEMrush, Ahrefs)

**Key finding:** Nobody connects all four layers — market research → SEO strategy → site building → deployment → monitoring. Every tool is a point solution. Users stitch together 4-6 tools at $300-800/month.

## Day 3-4: Building the Core Pipeline

The existing `website-generator` project had 5 Python modules covering the full pipeline. We renamed everything to SEOplant and enhanced each module:

```
competitor_intel.py  → crawl competitors, analyze SEO signals
seo_engine.py        → keyword expansion, clustering, content calendar
design_intel.py      → extract design tokens from winning sites
site_builder.py      → scaffold Astro static sites with Schema + llms.txt
deployer.py          → one-click deploy to VPS, Vercel, or Cloudflare
```

The deployer got the biggest upgrade — it now SSHs into customer VPSes, bootstraps the server environment, configures Nginx/Caddy, provisions SSL, and deploys. All in one command.

## Day 5-6: Data Layer

Heuristic keyword analysis wasn't going to cut it. We integrated DataForSEO API for real search volume, keyword difficulty, CPC, and competition data.

The `seo_engine.py` now runs in dual mode:
- **Heuristic mode** (offline, no API needed)
- **DataForSEO mode** (real data, automatic when credentials are set)

An SEO plan that used to be templates and guesses now shows actual search volumes, competition scores, and commercial intent.

## Day 7-8: SaaS Backend

The CLI tools were great for developers, but SEO agencies need a dashboard. We built a FastAPI backend with:

- **Auth**: bcrypt + JWT, register/login endpoints
- **Projects**: CRUD with credit tracking per operation
- **SEO pipeline**: REST endpoints wrapping the CLI modules
- **Billing**: Stripe Checkout + webhook for subscriptions
- **Database**: SQLAlchemy + SQLite (swap to PostgreSQL with one config change)

17 new files, 1,400 lines of backend code. Deployed to a UK VPS with nginx reverse proxy and Cloudflare CDN.

## Day 9-10: Landing Page & Deployment

Built the product website using our own `site_builder.py` (dogfooding from day one):

- 8 pages: home, pricing, docs, about, blog, login, register, + 2 blog posts
- Deployed to Cloudflare Pages (unlimited bandwidth, $0 cost)
- Custom domain: seoplant.io
- TLS 1.2+, SSL strict mode, auto HTTPS redirects

The whole site is open source at [github.com/seoplant/landing](https://github.com/seoplant/landing).

## Day 11-12: Programmatic SEO Engine

The core differentiator — a template + dataset engine that generates hundreds of pages from one keyword:

```python
engine = PSEOEngine()
engine.load_dataset("cities.csv")       # 500 cities
engine.use_default_templates("city_landing")
engine.generate("best hotels", "hotels/{slug:city}")
# → 500 pages, each with unique content, schema, internal links, sitemap
```

4 pre-built templates (city landing, product comparison, FAQ, review roundup) with content variation to avoid duplicate content penalties.

## Day 13-14: Polish & Ship

- Created [github.com/seoplant](https://github.com/seoplant) organization
- Clean repo structure, proper .gitignore, MIT license
- 46 files committed, zero sensitive data
- Blog posts published
- API live at app.seoplant.io
- Dashboard at app.seoplant.io/dashboard

## What We Learned

### AI Changes the Speed of Building

Two weeks from idea to deployed SaaS with working auth, billing, and SEO pipeline would have taken a 3-person team 3-4 months in 2023. AI-assisted development compresses that by 10-20x.

### Open Source Is the Right Default

Making the core MIT-licensed builds trust that no amount of marketing copy can match. Users can see exactly what the deploy agent does before installing it on their server.

### Ship Before You're Ready

The dashboard is still rough. Stripe isn't fully wired. The pSEO engine needs more templates. But the product is live, the API works, and real users can sign up today. Everything else is iteration.

## What's Next

- **More pSEO templates**: real estate, job listings, events, recipes
- **LLM content generation**: unique paragraph-level variation at scale
- **Autonomous monitoring**: rank tracking → content refresh → auto-expand clusters
- **Agency features**: white-label reports, client management, team accounts

---

*SEOplant is open source. [Star us on GitHub](https://github.com/seoplant/seoplant) or [try the cloud version](https://app.seoplant.io/dashboard).*
