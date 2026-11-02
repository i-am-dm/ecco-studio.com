// Local behavioral test using public fixtures from nodejs/node v22.23.4.
// Run only for verification: node --expose-internals tls-blocklist.cjs
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { once } = require('node:events');
const { createHash, X509Certificate } = require('node:crypto');
const tls = require('node:tls');
const { internalBinding } = require('internal/test/binding');
const { addBlockedSPKIForTesting, clearBlockedSPKIsForTesting } = internalBinding('crypto');
const fixture = name => readFileSync(join(__dirname, 'fixtures', name));

(async () => {
  const server = tls.createServer({ key: fixture('agent6-key.pem'), cert: fixture('agent6-cert.pem') }, socket => socket.end());
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const connect = async () => {
    const client = tls.connect({ host: '127.0.0.1', port: server.address().port, ca: fixture('ca1-cert.pem'), checkServerIdentity() {} });
    try { await once(client, 'secureConnect'); assert.equal(client.authorized, true); }
    finally { client.destroy(); }
  };
  try {
    await connect();
    const spki = new X509Certificate(fixture('ca3-cert.pem')).publicKey.export({ type: 'spki', format: 'der' });
    addBlockedSPKIForTesting(createHash('sha256').update(spki).digest());
    await assert.rejects(connect, { code: 'CERT_REVOKED' });
    clearBlockedSPKIsForTesting();
    await connect();
    console.log(`PASS Node ${process.version}: trusted TLS chain accepted, blocked intermediate rejected as CERT_REVOKED, unaffected chain restored after test block removed`);
  } finally {
    clearBlockedSPKIsForTesting();
    server.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
