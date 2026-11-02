import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { rootCertificates } from 'node:tls';

const gate = resolve(process.argv[2]);
const fixtures = resolve(process.argv[3]);
const safe = readFileSync(join(fixtures, 'emsign-g1.pem'), 'utf8');
const temporary = mkdtempSync(join(tmpdir(), 'ecco-ca-regression-'));
const results = [];
try {
  const cases = [
    ['patched-runtime-bundle', rootCertificates.join('\n'), true],
    ['unaffected-emsign-g1', safe, true],
    ['multiple-valid-certificates', `${safe}\n${rootCertificates[0]}\n`, true],
    ['blocked-emsign-g3', readFileSync(join(fixtures, 'emsign-g3.pem'), 'utf8'), false],
    ['blocked-aaa', readFileSync(join(fixtures, 'aaa.pem'), 'utf8'), false],
    ['empty-bundle', '', false],
    ['malformed-certificate', '-----BEGIN CERTIFICATE-----\nINVALID\n-----END CERTIFICATE-----\n', false],
    ['valid-plus-truncated-certificate', `${safe}\n-----BEGIN CERTIFICATE-----\nINVALID\n`, false],
    ['valid-plus-orphan-end', `${safe}\n-----END CERTIFICATE-----\n`, false],
    ['valid-plus-malformed-certificate', `${safe}\n-----BEGIN CERTIFICATE-----\nINVALID\n-----END CERTIFICATE-----\n`, false],
    ['valid-plus-blocked-g3', `${safe}\n${readFileSync(join(fixtures, 'emsign-g3.pem'), 'utf8')}`, false],
  ];
  for (const [name, content, accepted] of cases) {
    const fixture = join(temporary, `${name}.pem`);
    writeFileSync(fixture, content);
    const run = spawnSync(process.execPath, [gate, fixture], { encoding: 'utf8' });
    assert.equal(run.error, undefined, `${name}: child process failed`);
    assert.equal(run.signal, null, `${name}: child process terminated`);
    assert.equal(run.status, accepted ? 0 : 1, `${name}: unexpected exit status ${run.status}`);
    results.push({ name, expected: accepted ? 'accepted' : 'rejected', status: 'PASS' });
  }
  console.log(JSON.stringify({ runtime: process.version, platform: process.platform, architecture: process.arch, result: 'PASS', checks: results }, null, 2));
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
