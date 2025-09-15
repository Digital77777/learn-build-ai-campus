# PROD_READY Checklist — learn-build-ai-campus

This checklist captures the minimum production-readiness requirements for each AI tool in this repository and common platform items. Use this as a gating checklist before promoting any tool or model to production. Each item includes a short acceptance criterion so it can be used as an objective gate.

## Quick instructions
- For each tool, mark each item Passed/Failed/NA and record evidence (links to dashboards, CI runs, artifacts).
- Create or link required artifacts into the tool folder: README.md, MODEL_CARD.md, RUNBOOK.md, and test results.

---

## Project summary
Tools covered:
- AI SnapBuilder — /tools/ai-snapbuilder (Development)
- PromptPlayground — /tools/prompt-playground (Creative)
- Data2App — /tools/data2app (Analytics)
- AI TutorLab — /tools/ai-tutorlab (Research)

---

## Per-tool production checklist

For each checklist item below, include owner, evidence link, and date verified.

### 1) AI SnapBuilder (mini-model training)
- Data ingestion & validation
  - Required: upload validation (file type, size, min examples), provenance metadata, dataset snapshotting.
  - Acceptance: invalid uploads are rejected with clear error; snapshot id stored for each dataset.
- Training pipeline & reproducibility
  - Required: deterministic training jobs, training config saved, model artifact uploaded to registry.
  - Acceptance: model can be re-trained from stored config to reproduce artifact hash.
- Inference API & quotas
  - Required: authenticated endpoints, quotas/rate-limits, OOD detection on inputs.
  - Acceptance: endpoints return correct codes; OOD returns safe fallback.
- UX & feedback
  - Required: training progress UI, preview results, consent for persisted examples.
  - Acceptance: user sees progress and preview; consent recorded.
- Security & privacy
  - Required: virus/PII scanning, secrets managed, RBAC.
  - Acceptance: no secret in repo; PII flagged and access-restricted.
- Observability
  - Required: training/inference logs, model metrics, alerts for failures.
  - Acceptance: dashboards and alerts exist; failures alert on-call.
- Tests & CI
  - Required: unit tests for transforms, integration test for training on fixture dataset, regression checks.
  - Acceptance: CI passes and regression tests detect model drift.

---

### 2) PromptPlayground (LLM-driven creative UI)
- LLM integration & config management
  - Required: model selection config, default-safe parameters (temp, max tokens), rate-limit handling.
  - Acceptance: calls respect config; fallback model available.
- Cost & quota controls
  - Required: per-user and per-org quotas, cost monitoring.
  - Acceptance: alerts for cost spikes; quotas enforced.
- Safety & moderation
  - Required: moderation filter on inputs/outputs, user-reporting flow.
  - Acceptance: flagged outputs are blocked/sanitized; reports recorded.
- UX & caching
  - Required: responsive slider UI, caching for repeated prompts, side-by-side compare.
  - Acceptance: UI meets latency SLOs; compare view accurate.
- Observability & telemetry
  - Required: per-model usage, latency, error metrics.
  - Acceptance: dashboards and cost alerts present.
- Tests & CI
  - Required: integration tests with mock LLM, E2E tests covering slider behavior.
  - Acceptance: PRs run tests and prevent regressions.

---

### 3) Data2App (spreadsheet → dashboards / export)
- Ingestion & parsing
  - Required: robust CSV/XLSX parsing, schema inference, streaming/chunking for large files.
  - Acceptance: ingestion reports schema and handles large files without OOMs.
- Transformation traceability
  - Required: saved transformation steps, SQL export of pipeline.
  - Acceptance: exported app reproduces original views.
- Export & security
  - Required: secure export process (no secret leak), hosting instructions, auth options.
  - Acceptance: exported app reproduces charts and is access-controlled if required.
- Visualization testing
  - Required: visual regression tests for charts, sample datasets.
  - Acceptance: visual diffs within tolerance.
- Observability
  - Required: ingestion/transform metrics, slow-query alerts.
  - Acceptance: dashboards available; slow-query alerts configured.

---

### 4) AI TutorLab (student Q&A, exercises)
- Knowledge sources & citations
  - Required: source metadata for KB, automatic citation in answers.
  - Acceptance: every factual claim has source or an explicit "I don't know".
- Factuality & guardrails
  - Required: hallucination mitigation, confidence calibration, fallback rule-based answers.
  - Acceptance: hallucination rate measured and below threshold.
- Personalization & progress
  - Required: user-level skill profile, progress tracking, teacher review workflow.
  - Acceptance: progress persists and teacher edits are stored.
- Privacy & compliance
  - Required: consent capture, retention policy, FERPA/GDPR considerations applied where relevant.
  - Acceptance: consent stored; data access logs exist.
- Evaluation & pedagogy QA
  - Required: curriculum-aligned test sets and periodic evaluation.
  - Acceptance: evaluation reports show acceptable quality.

---

## Cross-tool requirements (apply to all tools)
- Authentication & Authorization
  - Implementation: OAuth/OIDC or equivalent; RBAC for admin tasks.
  - Acceptance: unauthorized requests rejected; admin routes require elevated role.
- CI/CD and Testing
  - Implementation: PRs run unit, integration, regression, and smoke tests; canary/blue-green deployment.
  - Acceptance: PRs must pass pipelines before merge; canary metrics validated before full rollout.
- Observability & Alerting
  - Implementation: Prometheus/Grafana or SaaS equivalent; OpenTelemetry traces; centralized logs.
  - Acceptance: dashboards for uptime/latency/error rates; runbooks linked from alerts.
- Secrets & Dependency Security
  - Implementation: secrets manager (Vault/KMS), dependency scanning (Snyk/Trivy), signed container images.
  - Acceptance: no secrets in repo; dependency alerts triaged.
- Documentation & Ownership
  - Requirement: each tool folder contains README.md, MODEL_CARD.md (if models used), RUNBOOK.md, OWNER metadata.
  - Acceptance: artifacts present and up-to-date.
- Rollout Strategy
  - Requirement: shadow testing, canary, automated rollback conditions based on SLOs.
  - Acceptance: rollouts use canary and auto-rollback works.

---

## Required artifacts (per tool)
- README.md (how the tool works, routes, owner)
- MODEL_CARD.md (for any model used or produced)
- RUNBOOK.md (incident steps, contact info)
- TEST_REPORT.md or CI links (test run artifacts)
- DASHBOARD_LINKS.md (links to monitoring dashboards / alerts)
- SECURITY_REVIEW.md (dependency scan + threat model summary)

---

## Acceptance-check quick template (copy into each tool folder)
- dataset snapshot? [Y/N] — evidence:
- model version & metadata? [Y/N] — evidence:
- automated tests in CI? [Y/N] — evidence:
- dashboards and alerts? [Y/N] — evidence:
- canary/shadow deployment? [Y/N] — evidence:
- runbook & on-call owner? [Y/N] — evidence:
- privacy/compliance signoff? [Y/N] — evidence:

---

## Example SLOs and KPIs (adjust per tool)
- Availability: 99.9% API uptime
- Latency: P95 ≤ 500ms for interactive inference; P95 ≤ 200ms for simple UI interactions
- Error rate: <0.5% user-facing errors
- Model quality: No >2% drop vs baseline on validation checks after retrain
- Drift: retrain trigger when KS-statistic exceeds configured threshold

---

## Recommended open-source stack
- Data validation: Great Expectations / Evidently
- Model registry/tracking: MLflow / DVC
- Serving: KServe / BentoML / Seldon
- Orchestration: Kubernetes + Argo Workflows / Airflow / Dagster
- CI/CD: GitHub Actions + ArgoCD
- Monitoring: Prometheus + Grafana, OpenTelemetry, Sentry
- Secrets: HashiCorp Vault or cloud KMS
- Security scanning: Trivy / Snyk

---

## Prioritized first steps
1. Add minimal telemetry (latency, error rates) and a simple dashboard for each tool.
2. Add dataset snapshotting and a MODEL_CARD.md template to any tool that trains or uses models.
3. Add CI checks: data validation and unit tests for parser/transform code.
4. Add RUNBOOK.md stub and define on-call owner.
