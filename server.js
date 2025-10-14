import compression from 'compression';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BUILD_DIR = path.join(__dirname, 'build');

const app = express();
const PORT = process.env.PORT || 8080;

// Enable gzip compression
app.use(compression());

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Surface clearer logs when the build output is missing.
if (!fs.existsSync(path.join(BUILD_DIR, 'index.html'))) {
  console.warn('Warning: build/index.html not found. Did you run "npm run build"?');
}

// Serve pre-built static assets
app.use(express.static(BUILD_DIR, {
  maxAge: '1d',
  etag: true
}));

// Serve index.html for SPA routes
app.get('*', (_req, res) => {
  res.sendFile(path.join(BUILD_DIR, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Ecco Studio Labs website running on port ${PORT}`);
});
