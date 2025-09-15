# RUNBOOK — Data2App (detailed)

On-call owner: @Digital77777 (primary); secondary: data-eng@example.com

Summary
- Scope: failures in ingestion, training pipeline errors, major data drift, or inaccurate forecast production impacting customers.

SLOs & Alerts
- Batch job success rate: 99% daily
- Forecast freshness: daily job completes before 06:00 UTC
- Drift alert: feature drift score > 0.3 for 3 consecutive days -> SEV2

Monitoring queries (example)
- Batch job failure:
  - sum(rate(batch_jobs_failed_total{job="data2app"}[1h]))
- Drift score:
  - max_over_time(data2app_drift_score[3d])

Immediate triage
1. Ingestion failure
   - Check ingestion logs for recent runs: data-ingest-ui or S3 manifests.
   - Verify credentials for external sources (e.g., API keys) and S3 bucket permissions.
2. Training job OOM / schema error
   - Inspect job logs for schema mismatch messages; run sample ingestion locally to reproduce.
   - If OOM, reduce batch size or add worker resources.
3. Drift or accuracy drops
   - Compare current feature distributions vs training snapshot using saved snapshots; if drift confirmed, generate retrain ticket and schedule immediate validation retrain.

Containment
- Pause automated forecasts for affected customers by toggling FEATURE_DATAPP_AUTOMATE=false and notify stakeholders.
- Switch to last-known-good model artifact by updating model pointer in registry config.

Escalation
- SEV1: data leak or customer-impacting wrong forecasts — notify execs and open incident channel.
- SEV2: recurring job failures or extended drift — notify data-eng lead.

Post-incident
- Produce postmortem with root cause, corrective actions, and changes to monitoring/alert thresholds.

Useful commands
- View job logs: aws s3 ls s3://data2app-logs/training/ | tail -n 50
- Run sample ingestion: scripts/run_ingest_sample.sh --snapshot rs-2024-12
