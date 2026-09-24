const assert = require('node:assert/strict');
const test = require('node:test');

const {
  buildOutboundCallParams,
  normalizeCallStatus,
  normalizeRecordingPolicy,
  recordingAllowed,
  recordingStoragePath,
  terminalCallStatus,
} = require('../telephony-contract.cjs');

test('recording policies default to no recording and require consent when configured', () => {
  assert.equal(normalizeRecordingPolicy('record-all'), 'record_all');
  assert.equal(normalizeRecordingPolicy('unexpected'), 'do_not_record');
  assert.equal(recordingAllowed('do_not_record', true), false);
  assert.equal(recordingAllowed('record_on_consent', false), false);
  assert.equal(recordingAllowed('record_on_consent', true), true);
  assert.equal(recordingAllowed('record_all', false), true);
});

test('outbound call parameters use server callback URLs and enable recording only when allowed', () => {
  const withoutConsent = buildOutboundCallParams({
    to: '+15555550100',
    from: '+15555550200',
    voiceWebhookUrl: 'https://example.test/twilioWebhook',
    recordingPolicy: 'record_on_consent',
  });
  assert.equal(withoutConsent.shouldRecord, false);
  assert.equal(withoutConsent.params.Record, undefined);
  assert.match(withoutConsent.params.Url, /event=voice/);
  assert.match(withoutConsent.params.StatusCallback, /event=status/);

  const withConsent = buildOutboundCallParams({
    to: '+15555550100',
    from: '+15555550200',
    voiceWebhookUrl: 'https://example.test/twilioWebhook',
    recordingPolicy: 'record_on_consent',
    consentCaptured: true,
  });
  assert.equal(withConsent.shouldRecord, true);
  assert.equal(withConsent.params.Record, 'true');
  assert.match(withConsent.params.RecordingStatusCallback, /event=recording/);
});

test('status and recording paths normalize provider values without crossing ownership boundaries', () => {
  assert.equal(normalizeCallStatus('no-answer'), 'no_answer');
  assert.equal(terminalCallStatus('no-answer'), true);
  assert.equal(terminalCallStatus('in-progress'), false);
  assert.equal(
    recordingStoragePath({ tenantId: 'tenant-a', brandId: 'brand-a', callSid: 'CA123', recordingSid: 'RE123' }),
    'tenants/tenant-a/brands/brand-a/recordings/CA123/RE123.mp3',
  );
  assert.throws(() => recordingStoragePath({ tenantId: '', brandId: 'brand-a', callSid: 'CA123', recordingSid: 'RE123' }));
});
