# RUNBOOK — AI TutorLab (detailed)

On-call owner: @Digital77777 (primary); secondary: curriculum-sm@example.com

Summary
- Scope: KB ingestion failures, RAG retrieval regressions, surge in hallucinations, or student PII incidents.

SLOs & Alerts
- Citation coverage SLO: >= 85% of factual responses include at least 1 citation (weekly).
- Latency SLO: p95 <= 350ms.
- Hallucination alert: hallucination-proxy > 8% over 1 hour -> SEV1.

Monitoring queries
- Citation coverage:
  - sum(rate(tutorlab_responses_with_citation_total[1h])) / sum(rate(tutorlab_responses_total[1h]))
- Hallucination proxy:
  - sum(rate(tutorlab_factcheck_mismatch_total[1h])) / sum(rate(tutorlab_responses_total[1h]))

Immediate actions
1. Hallucination spike
   - Switch model to citation-only mode (runtime flag: TUTORLAB_FORCE_CITATIONS=true) and route suspicious traffic to human-review.
   - Reduce temperature and length limits in runtime config.
2. KB ingestion failure
   - Check ingestion worker logs and snapshot creation pipeline; re-run ingestion for failed items.
   - Validate KB snapshot checksums and permissions.
3. PII upload incident
   - Quarantine KB snapshot, run erase tool for affected snapshot ids, and notify privacy team.

Containment
- Flip to conservative policy: responses must include citations and low-confidence responses go to human queue.
- Throttle interactive sessions if necessary.

Escalation
- SEV1: suspected data leak or widespread hallucination causing user harm — notify exec channels and initiate full incident response.
- SEV2: partial degradation — notify product and curriculum leads.

Post-incident & Validation
- Run a targeted regression suite of curriculum questions and check citation coverage and correctness.
- Publish incident summary and remediation in INCIDENTS.md.

Useful commands
- Inspect KB snapshots: scripts/list_kb_snapshots.sh
- Re-run ingestion for snapshot: scripts/ingest_kb.sh --snapshot tutorlab-kb-2025-08-snap
- Tail retrieval logs: kubectl -n tutorlab logs -f deployment/tutorlab-retriever
