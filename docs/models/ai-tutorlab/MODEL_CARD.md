# MODEL_CARD — AI TutorLab — tutorlab-knowledge-model-2025-09

- Model name: tutorlab-knowledge-model-2025-09
- Version / id: v2.0 / sha256:ef56...9c01
- Short description: Ensemble retrieval-augmented generation (RAG) pipeline combining a 13B LLM with a citation-aware retriever for curriculum-aligned tutoring responses.
- Owner / contact: Beni Badibanga (@Digital77777) — info.dim77@gmail.com
- Created on: 2025-09-15
- License: CC-BY for knowledge sources where allowed; model under Apache-2.0.

1. Intended Use
- Primary intended use:
  - Provide interactive tutoring responses, explanations, and step-by-step worked examples aligned to curriculum content.
- Out-of-scope:
  - High-stakes assessment scoring without human review; professional/legal/medical advice.
- Stakeholders: Product lead @Digital77777; Curriculum SMEs.

2. Model Details
- Architecture:
  - Retriever: dense-sparse hybrid (FAISS + BM25) over curriculum KB snapshots.
  - Generator: 13B decoder LLM with citation injection layer.
- Frameworks: PyTorch 2.x, Haystack, FAISS.

3. Training & KB
- KB snapshots:
  - tutorlab-kb-2025-08-snap (includes curated lesson content, public OERs, chunked paragraphs with metadata).
- Preprocessing:
  - Document chunking with source metadata, citation tokens, and provenance capture.
- Sensitive data:
  - Student PII never stored in KB; PII detection on uploads and automatic redaction.

4. Evaluation
- Benchmarks:
  - CurriculumQA-2025 (human-annotated correctness): accuracy 78%
  - Helpfulness score (human): 87%
- Failure modes:
  - Overconfident answers when KB lacks coverage; stale KB causing outdated citations.

5. Safety, Bias & Ethics
- Safety mitigations:
  - Citation-first responses: model must include sources when claims are factual.
  - Human review queue for flagged or low-confidence outputs.
- Bias assessment:
  - Reviewed sample outputs across grade levels and geographies; catalogue of biases and mitigation plan attached.

6. Deployment & Monitoring
- Serving endpoint: https://api.internal/tutorlab/v2/models/tutorlab-knowledge-model-2025-09
- Monitoring:
  - Citation-coverage metric: percent of responses with at least one high-quality KB citation.
  - Hallucination proxy: auto-fact-check mismatch rate.
- Rollout:
  - Shadow traffic -> 1% -> 10% -> 100% with checks at each step.

7. Reproducibility
- Training config: configs/tutorlab/rag_v2.yaml (commit: 8a19e9e)
- Artifacts:
  - KB snapshot id: tutorlab-kb-2025-08-snap
  - Code commit: 8a19e9ee470f3cab...
- Steps: scripts/reproduce_tutorlab.sh

8. Maintenance & Lifecycle
- Retrain & KB refresh cadence: KB refresh monthly; model retrain every quarter or on major KB update.
- Owner & SLA:
  - On-call: @Digital77777
  - SLOs: citation coverage >= 85%; response p95 latency <= 350ms.

9. Audit & Compliance
- Consent & uploads: upload consent stored with each KB item; retention and erase script available.
- Security: KB storage access controlled via IAM roles.

10. Contact & Links
- KB registry: registry://tutorlab/kb/tutorlab-kb-2025-08-snap
- Evaluation reports: docs/evaluations/tutorlab-v2-report.pdf
- Owner contact: info.dim77@gmail.com
