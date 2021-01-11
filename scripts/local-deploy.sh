#!/usr/bin/env bash

gcloud auth activate-service-account audit-patterns@appspot.gserviceaccount.com \
  --key-file=/home/buffolander/.google-cloud/audit-patterns-fc3c482cd289.json \
  --project=audit-patterns

# gcloud builds submit --tag gcr.io/PROJECT-ID/SERVICE-NAME
echo gcloud builds submit --tag=gcr.io/audit-patterns/sessions-v1
gcloud builds submit --tag=gcr.io/audit-patterns/sessions-v1
echo

# gcloud run deploy --image gcr.io/PROJECT-ID/SERVICE-NAME \
echo gcloud beta run deploy sessions-v1 --image=gcr.io/audit-patterns/sessions-v1
gcloud run deploy sessions-v1 --image=gcr.io/audit-patterns/sessions-v1 \
  --region=us-central1 \
  --memory=2Gi \
  --timeout=10s \
  --platform managed \
  --allow-unauthenticated
