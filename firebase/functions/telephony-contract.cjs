const RECORDING_POLICIES = new Set(['record_all', 'record_on_consent', 'do_not_record']);
const TERMINAL_CALL_STATUSES = new Set(['completed', 'busy', 'failed', 'no_answer', 'canceled']);

function normalizeRecordingPolicy(value) {
  const policy = String(value || '').trim().toLowerCase().replaceAll('-', '_');
  return RECORDING_POLICIES.has(policy) ? policy : 'do_not_record';
}

function recordingAllowed(policy, consentCaptured) {
  const normalized = normalizeRecordingPolicy(policy);
  return normalized === 'record_all' || (normalized === 'record_on_consent' && consentCaptured === true);
}

function callbackUrl(voiceWebhookUrl, event) {
  const url = new URL(String(voiceWebhookUrl || ''));
  url.searchParams.set('event', event);
  return url.toString();
}

function buildOutboundCallParams({ to, from, voiceWebhookUrl, recordingPolicy, consentCaptured = false }) {
  if (!to || !from || !voiceWebhookUrl) throw new Error('A destination, approved calling number, and voice webhook URL are required.');
  const policy = normalizeRecordingPolicy(recordingPolicy);
  const shouldRecord = recordingAllowed(policy, consentCaptured);
  return {
    params: {
      To: to,
      From: from,
      Url: callbackUrl(voiceWebhookUrl, 'voice'),
      StatusCallback: callbackUrl(voiceWebhookUrl, 'status'),
      StatusCallbackMethod: 'POST',
      ...(shouldRecord ? {
        Record: 'true',
        RecordingChannels: 'dual',
        RecordingStatusCallback: callbackUrl(voiceWebhookUrl, 'recording'),
        RecordingStatusCallbackMethod: 'POST',
        RecordingStatusCallbackEvent: 'completed absent',
      } : {}),
    },
    policy,
    shouldRecord,
  };
}

function normalizeCallStatus(value) {
  return String(value || '').trim().toLowerCase().replaceAll('-', '_') || 'unknown';
}

function terminalCallStatus(value) {
  return TERMINAL_CALL_STATUSES.has(normalizeCallStatus(value));
}

function safePathPart(value, label) {
  const cleaned = String(value || '').trim().replace(/[^a-zA-Z0-9_-]/g, '');
  if (!cleaned) throw new Error(`${label} is required.`);
  return cleaned;
}

function recordingStoragePath({ tenantId, brandId, callSid, recordingSid }) {
  return `tenants/${safePathPart(tenantId, 'tenantId')}/brands/${safePathPart(brandId, 'brandId')}/recordings/${safePathPart(callSid, 'callSid')}/${safePathPart(recordingSid, 'recordingSid')}.mp3`;
}

module.exports = {
  buildOutboundCallParams,
  normalizeCallStatus,
  normalizeRecordingPolicy,
  recordingAllowed,
  recordingStoragePath,
  terminalCallStatus,
};
