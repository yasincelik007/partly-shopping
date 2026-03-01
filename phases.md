# PARTLY Shopping — Phases & Execution Plan

Status legend: [ ] Pending · [~] In-Progress · [x] Done

This plan translates the high-level vision in README.md into concrete, verifiable build phases. Each phase lists key deliverables and acceptance criteria so we can track progress precisely and ship incrementally.

## Phase 0 — Planning & Repository

- [x] Create this phases.md from README insights
- [x] Commit and push phases.md to remote

Acceptance criteria
- A single phases.md exists at repo root with end-to-end plan
- All later phases reference measurable outcomes and testable criteria

## Phase 1 — Visual Core (Three.js + React Three Fiber)

Deliverables
- [x] React app scaffold with R3F and Three.js
- [ ] WebGPU renderer with WebGL fallback
- [x] GLB loader with Draco/KTX2 support
- [~] Exploded View animation system (GPU-friendly)
- [x] Raycast selection with stable Mesh/Part IDs
- [x] LOD pipeline (LOD0: fine, LOD1: form, LOD2: silhouette)
- [x] Side panel stub that reads selected part metadata

Acceptance criteria
- Load a sample model; toggle Exploded Mode with smooth animation
- Selecting a mesh displays a stable part_id in the UI
- LOD switching maintains ≥ 60 FPS on mid-tier GPU at 1080p

## Phase 2 — Graph Data Model (Neo4j)

Deliverables
- [x] Neo4j schema for products → assemblies → parts
- [x] Constraints for unique IDs and relationships
- [x] Sample dataset (e.g., Ducati hierarchy) loaded
- [x] API adapter to fetch part metadata by mesh/part_id

Acceptance criteria
- Querying a selected part_id returns material, torque, weight, compatibility
- Hierarchical traversal shows related alternatives and compatible models

Status
- [x] Implemented schema constraints and indexes
- [x] Seeded Ducati sample hierarchy
- [x] Implemented GET /part/:id API in server
- [ ] Verified live query against running Neo4j instance (run verify script locally)

## Phase 3 — AI Matching (PARTLY‑Sense)

Deliverables
- [x] Feature extraction pipeline (text inputs, OCR/PDF text supported as strings)
- [x] OEM inference model v1 with confidence scoring
- [ ] Graph relation scan + marketplace query orchestration
- [ ] Reliability and lifecycle estimators (baseline models)

Acceptance criteria
- Given inputs, returns { oem, confidence, lifecycle, price_range, best_offer }
- Confidence calibration validated on a small labeled set

## Phase 4 — Scraper Engine (FastAPI + Workers)

Deliverables
- [x] FastAPI service with worker loop
- [x] Rate-limit adaptive scrapers for Amazon and eBay (stub)
- [x] Normalization layer for price, stock, seller reliability
- [x] 15-minute stock refresh scheduling

Acceptance criteria
- Normalized offers endpoint returns consistent fields across sources
- End-to-end refresh remains within configured time budget

## Phase 5 — API Layer (Core Endpoints)

Deliverables
- [ ] GET /product/:id and /product/:id/exploded
- [ ] GET /part/:id and /part/:id/offers
- [ ] POST /cart/add
- [ ] POST /ai/match
- [ ] API gateway with auth and request tracing

Acceptance criteria
- Endpoints return documented JSON schemas with 200/4xx/5xx handling
- Load tests at P95 meet agreed SLAs for latency and throughput

## Phase 6 — UX Flow (The PARTLY Flow)

Deliverables
- [ ] 3D entry screen with model chooser
- [ ] Exploded Mode toggle and animation controls
- [ ] Smart side panel with material, weight, torque, lifespan, price comparison
- [ ] Cart + checkout integration stub (API-backed)

Acceptance criteria
- Task flow: choose product → explode → select part → see metadata → add to cart
- Usability: click targets and overlays remain responsive at ≥ 60 FPS

## Phase 7 — Security & Scalability

Deliverables
- [ ] JWT-based auth and OAuth connections to marketplaces
- [ ] Service-to-service auth (mTLS or signed tokens)
- [ ] Kubernetes manifests with HPA and resource quotas
- [ ] CDN strategy for 3D asset distribution; edge rendering where applicable

Acceptance criteria
- Security tests: token validation, RBAC checks, dependency scans pass
- Horizontal scaling verified under staged load

## Phase 8 — AR Integration

Deliverables
- [ ] Mobile AR overlay that highlights part locations
- [ ] Live torque/assembly guides aligned to real object
- [ ] Optional: printable/license linkage from AR view

Acceptance criteria
- AR overlay aligns within acceptable positional error margins on target devices

## Phase 9 — 3D Studio

Deliverables
- [ ] User flow to upload STL/GLB
- [ ] Basic validation, normalization, and preview
- [ ] Listing flow for printable licenses with community voting

Acceptance criteria
- Successful round trip: upload → preview → list → purchase test (sandbox)

## Phase 10 — Payments & Marketplace

Deliverables
- [ ] PARTLY‑Pay integration
- [ ] Secondary market for used parts
- [ ] Seller onboarding and KYC hooks

Acceptance criteria
- Test transactions settle in sandbox; refunds and disputes flow documented

## Phase 11 — Observability & DevOps

Deliverables
- [ ] Centralized logs, metrics, traces (e.g., OpenTelemetry)
- [ ] Error budget policy and alerts
- [ ] CI pipelines for lint, test, build, containerize, deploy

Acceptance criteria
- Dashboards show golden signals; on-call playbooks exist

## Roadmap Alignment

Faz 1 — Genesis (Q1–Q2 2026)
- [ ] Master Model Library (Automotive, Drone, Phones, Tablets, etc.)
- [ ] 50 marketplace integrations (scraper coverage baseline)
- [ ] AI OEM Matching v1

Faz 2 — Ecosystem (Q3–Q4 2026)
- [ ] PARTLY‑Pay
- [ ] Second‑hand parts market
- [ ] Printable Part license system

Faz 3 — Industry 4.0 (2027)
- [ ] Target integrations: Tesla, Bosch, Samsung
- [ ] PARTLY ID + digital certification per product
- [ ] Factory‑issued digital twins

## Working Agreement

- Every task above carries a clear status marker.
- We will update this file after each step and maintain a tight commit history.
- Build proceeds top‑down: Visual Core → Data/AI → APIs → UX → Integrations.

