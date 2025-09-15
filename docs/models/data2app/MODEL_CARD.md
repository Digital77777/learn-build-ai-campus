# MODEL_CARD — Data2App — datapp-forecast-2025-09

- Model name: datapp-forecast-2025-09
- Version / id: v1.1 / sha256:ab12cd34...
- Short description: Time-series forecasting ensemble for small business sales projections and anomaly detection used by Data2App.
- Owner / contact: Beni Badibanga (@Digital77777) — info.dim77@gmail.com
- Created on: 2025-09-15
- License: MIT (model components) / data licenses per dataset

1. Intended Use
- Primary intended use:
  - Short-term (1–30 day) sales forecasting, seasonal adjustments, and anomaly detection on ingestion pipelines.
- Out-of-scope:
  - Regulatory financial reporting; use only for planning and internal insights.

2. Model Details
- Architecture:
  - Ensemble: exponential smoothing + LightGBM on engineered features + LSTM residual model.
- Frameworks: scikit-learn 1.2, LightGBM 4.0, PyTorch 2.x for LSTM.
- Inference runtime: CPU-optimized containers; recommended 4 vCPU, 8GB RAM for batch jobs.

3. Training Data
- Datasets:
  - retail-sales-2016-2024 (snapshot id: rs-2024-12)
  - external-features: holidays-2020-2025, weather-hist-2018-2025
- Preprocessing:
  - Imputation of missing dates, holiday encoding, rolling-window aggregation.
- Data governance:
  - PII: none stored; if customer identifiers present, they are hashed with salted SHA256.

4. Evaluation
- Metrics:
  - MAE: baseline 12.5 -> this model 8.3 (on test set)
  - RMSE: baseline 18.7 -> this model 13.0
  - Anomaly detection AUC: 0.92
- Evaluation datasets: holdout windows stratified by seasonality.

5. Safety, Bias & Ethics
- Bias considerations:
  - Model may underperform for new product categories due to limited historical data. Document limitations in UX.
- Safeguards:
  - Post-processing bounding to avoid unrealistic extrapolations (e.g., negative forecasts clipped).

6. Deployment & Monitoring
- Endpoints:
  - Batch forecasting jobs (daily) and REST endpoint for on-demand forecasts.
- Monitoring:
  - Data drift detection on key features (promotion rate, price, traffic).
  - Forecast quality: live MAE on labeled feedback where available.
- Alerts:
  - Drift score > threshold for 3 days -> retrain evaluation.

7. Reproducibility
- Training config: configs/datapp/ensemble_v1.yaml (commit: 8a19e9e)
- Artifacts:
  - dataset snapshots: rs-2024-12
  - code commit: 8a19e9ee470f3cab568d...
- Seed: 2025

8. Maintenance & Lifecycle
- Retrain cadence: monthly or on drift trigger.
- Owner & SLA:
  - On-call: @Digital77777
  - Batch readiness: daily job completes within 2 hours.

9. Audit & Compliance
- Data lineage: ingestion manifests stored in data-lineage/ with snapshot IDs.
- Regulatory: follow customer data contracts for retention and deletion.

10. Contact & Links
- Registry: registry://data2app/models/datapp-forecast-2025-09:v1.1
- Training logs: s3://data2app-logs/training/2025-09-15/
- Owner: info.dim77@gmail.com
