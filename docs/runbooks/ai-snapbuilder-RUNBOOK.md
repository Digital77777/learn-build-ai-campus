# RUNBOOK — AI SnapBuilder (detailed)

On-call owner: @Digital77777 (primary); secondary: team-lead@example.com

Summary
- Scope: incidents affecting training jobs, model serving endpoints, data ingestion, or severe safety/moderation spikes.
- Service IDs: snapbuilder-training, snapbuilder-serving, snapbuilder-ingest

SLOs & Alerting thresholds
- Availability SLO: 99.5% monthly for snapbuilder-serving endpoints.
- Latency SLO: p95 <= 250ms (512-token request).
- Error SLO: 1% 5xx error rate tolerated.
- Alert thresholds (examples):
  - High latency: p95 > 350ms for 5 minutes -> SEV2
  - Error rate spike: 5xx rate > 3% for 3 minutes -> SEV1
  - Safety flags: moderation flags > 10% of requests in 10 minutes -> SEV1
  - Training failure: job fails repeatedly (>=3 requeues) -> SEV2

Monitoring queries (Prometheus / Grafana)
- p95 latency:
  - histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket{job="snapbuilder-serving"}[5m])) by (le))
- 5xx error rate:
  - sum(rate(http_requests_total{job="snapbuilder-serving",status=~"5.."}[5m])) / sum(rate(http_requests_total{job="snapbuilder-serving"}[5m]))
- Moderation flag rate:
  - sum(rate(snapbuilder_moderation_flag_total[5m])) / sum(rate(snapbuilder_requests_total[5m]))

Incident triage (SEV1 / SEV2)
1. Acknowledge & assess
   - Acknowledge PagerDuty or Slack alert.
   - Check Grafana dashboards: latency, errors, moderation flags, ingestion pipeline status.
2. Immediate containment
   - For serving outages or high error rates:
     - Check pods/instances: kubectl -n snapbuilder get pods | grep Error
     - If a single node is failing, cordon/drain and failover traffic.
     - If high latency/spike tied to new version, rollback to previous route (see Rollback section).
   - For moderation spikes or safety incidents:
     - Temporarily return a static refusal response or enable strict filter mode by flipping runtime key (feature flag: MODERATION_STRICT=true).
3. Root-cause data
   - Inspect recent deploys: last commits and release notes.
   - Review model registry: confirm artifact integrity (sha256).
   - Review training and ingestion logs: s3://snapbuilder-logs or logging UI.
4. Communications
   - Post incident status to #snapbuilder-ops Slack; update every 30 minutes until resolved.
   - If customer-facing outage, invoke status page update.

Rollback & Canary controls
- Canary + rollback procedure:
  - If canary or percentage rollout causes regression: increase canary to 0% and route 100% to previous stable tag.
  - Use deployment platform: kubectl rollout undo deployment/snapbuilder-serving --to-revision=<stable-revision>
  - Verify rollback reduces error rate and latency within 5 minutes before scaling back to normal.

Post-incident
- Create incident artifact in INCIDENTS.md: time, summary, root cause, timeline, remediation, owners, action items.
- Required postmortem within 3 business days for SEV1 incidents.

Playbooks (common scenarios)
- Serving high latency:
  - Check pod CPU/GPU and queue lengths.
  - Check model size/beam/temperature changes in recent config.
  - Temporarily scale out GPU replicas or enable CPU fallback for low-priority traffic.
- Training job failures:
  - Check dataset snapshot accessibility and staging S3 permissions.
  - Inspect job logs for OOM or data schema errors; re-run with --debug to capture sample inputs.
- Moderation false positives:
  - Gather representative inputs; run through moderation classifier locally.
  - If false-positive classifier drift, revert to last-known-good classifier model and open a retrain ticket.

Escalation
- SEV1 -> notify DG lead and exec via PagerDuty and create EMERGENCY channel.
- SEV2 -> notify team lead during business hours; otherwise create issue and tag on-call rotation.

Recovery & Validation
- Validate by running synthetic traffic against endpoint and verifying p95 latency and error rates.
- Run a sample of previously failing requests through canary/stable to confirm behavior.

Runbook maintenance
- Owner must review this runbook quarterly.
- Update contact and dashboard links in this file whenever changed.

Useful commands
- Check pods: kubectl -n snapbuilder get pods -o wide
- Tail logs: kubectl -n snapbuilder logs -f deployment/snapbuilder-serving
- Check training job: aws s3 ls s3://snapbuilder-logs/training/ | tail -n 50
