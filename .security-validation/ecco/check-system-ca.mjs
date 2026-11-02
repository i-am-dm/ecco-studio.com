import assert from 'node:assert/strict';
import { X509Certificate } from 'node:crypto';
import { readFileSync } from 'node:fs';

// GCP-2026-071: verify the vendor-updated system store by its contents.
// Node's bundled store is protected separately by the 22.23.4 SPKI blocklist.
// Debian bug 1151446 removes G3 and AAA; the unaffected emSign G1 remains valid.
const bundlePath = process.argv[2] || '/etc/ssl/certs/ca-certificates.crt';
const bundle = readFileSync(bundlePath, 'utf8');
const certificates = bundle.match(/-----BEGIN CERTIFICATE-----[\s\S]*?-----END CERTIFICATE-----/g) || [];
assert.ok(certificates.length > 0, `No certificates found in ${bundlePath}`);
// A complete certificate must not hide a truncated or stray PEM block.
for (const marker of ['BEGIN', 'END']) {
  const count = bundle.split(`-----${marker} CERTIFICATE-----`).length - 1;
  assert.equal(count, certificates.length, `Unmatched ${marker} certificate marker in ${bundlePath}`);
}

for (const pem of certificates) {
  const certificate = new X509Certificate(pem);
  assert.doesNotMatch(
    certificate.subject,
    /(?:^|\n)CN=(?:emSign ECC Root CA - G3|AAA Certificate Services)(?:\n|$)/i,
    `Distrusted CA remains in ${bundlePath}: ${certificate.subject}`,
  );
}

console.log(`System CA store verified: ${certificates.length} certificates; no emSign ECC Root CA - G3 or AAA Certificate Services roots.`);
