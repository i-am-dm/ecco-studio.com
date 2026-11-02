import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { readFileSync } from 'node:fs';
import { get } from 'node:http';

const cwd = new URL(process.argv[2] || '../ecco-studio-security/', import.meta.url);
const port = '18843';
const server = spawn(process.execPath, ['server.js'], {
  cwd,
  env: { ...process.env, PORT: port, NODE_ENV: 'production' },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let stderr = '';
server.stderr.on('data', chunk => { stderr += chunk; });
try {
  await Promise.race([
    once(server.stdout, 'data'),
    once(server, 'exit').then(([code]) => { throw new Error(`Server exited ${code}: ${stderr}`); }),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Startup timed out')), 5000).unref()),
  ]);
  const base = `http://127.0.0.1:${port}`;
  const home = await fetch(base);
  assert.equal(home.status, 200);
  assert.match(home.headers.get('content-type'), /text\/html/);
  for (const [name, value] of Object.entries({
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'DENY',
    'x-xss-protection': '1; mode=block',
    'referrer-policy': 'strict-origin-when-cross-origin',
  })) assert.equal(home.headers.get(name), value);
  const html = await home.text();
  assert.equal(html, readFileSync(new URL('build/index.html', cwd), 'utf8'));
  const deep = await fetch(`${base}/ventures/demo`);
  assert.equal(deep.status, 200);
  assert.equal(await deep.text(), html);
  const assetPaths = [...html.matchAll(/(?:src|href)="(\/assets\/[^\"]+)"/g)].map(match => match[1]);
  assert.equal(assetPaths.length, 2);
  for (const assetPath of assetPaths) {
    const asset = await fetch(`${base}${assetPath}`, { headers: { 'Accept-Encoding': 'gzip' } });
    assert.equal(asset.status, 200);
    assert.equal(asset.headers.get('content-encoding'), 'gzip');
    assert.match(asset.headers.get('cache-control'), /max-age=86400/);
    const etag = asset.headers.get('etag');
    assert.ok(etag);
    assert.ok((await asset.arrayBuffer()).byteLength > 1000);
    const cachedStatus = await new Promise((resolve, reject) => {
      get(`${base}${assetPath}`, { headers: { 'If-None-Match': etag } }, response => {
        response.resume();
        resolve(response.statusCode);
      }).on('error', reject);
    });
    assert.equal(cachedStatus, 304);
  }
  assert.equal(stderr, '');
  console.log(`PASS Node ${process.version}: production server startup, homepage, SPA route, ${assetPaths.length} assets, gzip, cache/ETag, security headers`);
} finally {
  if (server.exitCode === null && server.signalCode === null) {
    const exit = once(server, 'exit');
    server.kill('SIGTERM');
    await exit;
  }
}
