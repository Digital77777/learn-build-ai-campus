# MODEL_CARD — {MODEL_NAME}

Replace placeholders and keep this file alongside the model artifact in the repo or registry.

## 1. Model Overview
- Model name: {MODEL_NAME}
- Version / id: {vX.Y / artifact-hash}
- Short description: {one-line summary of purpose}
- Owner / contact: {name, email, team slack}
- Created on: {YYYY-MM-DD}
- License: {license}

## 2. Intended Use
- Primary intended use cases:
  - {e.g., generate short explanations for students}
- Primary out-of-scope / not intended for:
  - {e.g., clinical, legal advice}
- Stakeholders & approvers: {names}

## 3. Model Details
- Framework & libs: {e.g., PyTorch 2.1, transformers X.Y}
- Architecture: {e.g., fine-tuned LLaMA-2-13B with prefix-tuning}
- Training compute: {e.g., 4x A100, 12h}
- Model size: {parameters}
- Checkpoint location / artifact link: {registry URL or path}

## 4. Training Data
- Datasets used (names + versions / snapshot ids):
  - {dataset1 — snapshot-id — short description}
- Data provenance & collection date ranges:
  - {sources and collection windows}
- Preprocessing steps (summary):
  - {tokenization, deduplication, filters}
- Sensitive data handling (PII, anonymization):
  - {how PII was detected and handled}

## 5. Evaluation
- Evaluation datasets & snapshot ids:
  - {eval_dataset — snapshot-id}
- Metrics (baseline vs this model):
  - {metric: baseline -> this_model}
- Evaluation date: {YYYY-MM-DD}
- Known failure modes:
  - {e.g., tends to hallucinate on historical dates}
- Calibration & confidence estimation:
  - {e.g., uses softmax temperature 1.0 and a calibrated confidence estimator}

## 6. Safety, Bias & Ethics
- Safety mitigations applied:
  - {content filters, response moderation, refusal policies}
- Bias assessment summary:
  - {tests performed and results; attach detailed report}
- Mitigations and monitoring for harms:
  - {e.g., automated monitoring of flagged outputs}
- Ethical considerations and limitations:
  - {short notes}

## 7. Deployment & Monitoring
- Serving endpoint: {url}
- Inference spec (resources / CPU / GPU / mem):
  - {e.g., 1x GPU G4dn for low-latency}
- Expected latency / throughput targets:
  - {P95, QPS targets}
- Monitoring & alerts:
  - Metrics collected: latency, error rate, input distribution, model performance (if labeled feedback)
  - Dashboards: {link}
  - Alerts: {link to alert runbook}
- Rollout strategy:
  - {shadow / canary / percentage rollout + rollback criteria}

## 8. Reproducibility
- Training config: {link to config file}
- Random seeds: {seeds used}
- Required artifacts to reproduce:
  - training data snapshot id(s)
  - code commit SHA: {sha}
  - environment spec: {requirements.txt / conda env}
- Repro steps (high-level):
  1. Checkout commit {sha}
  2. Restore dataset snapshot {id}
  3. Run `scripts/train.sh --config configs/{config}.yaml`
  4. Compare produced artifact checksum with {artifact-hash}

## 9. Maintenance & Lifecycle
- Retrain triggers:
  - {e.g., drift detected, monthly cadence}
- Owner & SLA:
  - On-call: {name / rotation}
  - SLOs: {availability, latency, error budget}
- End-of-life plan:
  - {how/when model will be retired}

## 10. Audit & Compliance
- Privacy review completed: {Y/N — details / link}
- Security review (dependency & infra): {Y/N — link}
- Regulatory considerations: {GDPR / FERPA notes if applicable}
- Audit logs location: {link}

## 11. Contact & Links
- Model registry entry: {link}
- Training run logs: {link}
- Evaluation reports: {link}
- Owner contact: {name, email, slack}

---
Notes:
- Keep this file updated for each model version.
- If the tool produces many user-models (like AI SnapBuilder), generate a MODEL_CARD.md per published model artifact and keep a summary index in the tool folder.
