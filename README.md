# Ecco Studio Labs Website

Professional venture incubator website for ecco-studio.com

## Deployment

This project uses GitHub Actions to automatically deploy to Google Cloud Run on push to `main`.

### Required GitHub Secrets

Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):

1. **WIF_PROVIDER**
   ```
   projects/896693139975/locations/global/workloadIdentityPools/github-pool/providers/github-provider
   ```

2. **WIF_SERVICE_ACCOUNT**
   ```
   github-actions-ecco-studio@packpilot-461918.iam.gserviceaccount.com
   ```

### Local Development

```bash
npm install
npm start
```

The site will be available at http://localhost:8080

### Manual Deployment

```bash
gcloud run deploy ecco-studio-web \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --min-instances 0 \
  --max-instances 10
```

## Cost Management

The service is configured to scale to zero when not in use, so there's no cost when idle. Cloud Run charges only for:
- Request time (per 100ms)
- Memory used during request handling
- Free tier: 2M requests/month, 360K GB-seconds/month

## Architecture

- **Frontend**: Static HTML/CSS with vanilla JavaScript
- **Backend**: Express.js server for serving static files
- **Hosting**: Google Cloud Run (serverless, auto-scaling)
- **Domain**: ecco-studio.com (custom domain mapped)
- **CI/CD**: GitHub Actions with Workload Identity Federation

## Security

- No service account keys stored in GitHub
- Workload Identity Federation for secure authentication
- Organization policy restricting public access (requires explicit allow)
- HTTPS only with automatic SSL certificate management
