# RUNBOOK — PromptPlayground (detailed)

On-call owner: @Digital77777 (primary); secondary: team-lead@example.com

Summary
- Scope: incidents involving provider outages, cost spikes, moderation surges, or runaway generation loops creating excessive usage.

SLOs & Alerts
- Availability: provider API reachable 99.9% (subject to provider SLAs).
- Moderation SLO: moderation-flag rate < 2% baseline; alert if > 5% sustained for 10 minutes.
- Cost spike alert: daily cost > 150% of 7-day rolling average -> SEV2.

Monitoring queries (Prometheus/CloudMetrics)
- Token usage rate:
  - sum(rate(prompt_tokens_total[5m])) by (user)
- Moderation flag rate:
  - sum(rate(prompt_moderation_flag_total[5m])) / sum(rate(prompt_requests_total[5m]))

Immediate steps
1. Provider outage / high error rate
   - Check provider status page (OpenAI status) and local provider proxy logs.
   - If provider down and local fallback exists, flip runtime key to use local-fine-tune by setting FEATURE_PROMPTPLAYGROUND_FALLBACK=true.
2. Cost spike
   - Identify offending user(s) via billing logs and throttle or suspend API keys.
   - Apply global rate-limit via gateway: set rate-limit to safe default (e.g., 10 QPS) and notify the user.
3. Safety/moderation surge
   - Temporarily enable strict moderation mode: MODERATION_STRICT=true.
   - If a harmful trend is identified, block the prompt template and create a mitigation ticket.

Diagnostics
- Check API gateway logs, provider request ids, and sample prompts that triggered moderation.
- Reproduce locally using saved prompt and parameter set.

Escalation
- SEV1 (data leak / safety incident): notify execs and open EMERGENCY Slack; generate incident report.
- SEV2 (cost spike / prolonged outage): notify product lead and billing.

Post-incident
- Produce short incident report and recommend changes to defaults or quotas.
- Required follow-up: adjust rate limits, add user education, or improve prompt sanitization.

Useful commands
- Tail gateway logs: kubectl -n prompt-playground logs -f deployment/gateway
- Query billing: internal-billing-cli usage --service prompt-playground --from 24h
