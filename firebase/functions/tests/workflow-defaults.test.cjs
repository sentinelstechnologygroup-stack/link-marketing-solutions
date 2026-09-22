const assert = require('node:assert/strict');
const test = require('node:test');
const { buildDefaultWorkflowArtifacts } = require('../workflow-defaults.cjs');

test('provisioned workflow creates resolvable script and qualification artifacts', () => {
  const timestamp = new Date('2026-09-21T00:00:00.000Z');
  const result = buildDefaultWorkflowArtifacts({
    tenantId: 'tenant-a',
    brandId: 'brand-a',
    brandName: 'Example Company',
    industryId: 'general',
    scriptSetId: 'script-a',
    qualificationFormId: 'form-a',
    actorUid: 'admin-a',
    timestamp,
  });

  assert.equal(result.script.tenantId, 'tenant-a');
  assert.equal(result.script.brandId, 'brand-a');
  assert.equal(result.script.scriptSetId, 'script-a');
  assert.equal(result.script.status, 'approved');
  assert.match(result.script.opening_statement, /Example Company/);
  assert.equal(result.qualificationForm.qualificationFormId, 'form-a');
  assert.equal(result.qualificationForm.status, 'active');
  assert.equal(result.qualificationForm.questions.length, 4);
  assert.equal(result.qualificationForm.questions.every((question) => question.required), true);
  assert.equal(result.qualificationForm.questions.reduce((sum, question) => sum + question.score_weight, 0), 100);
});

test('beta workflow is visibly scoped to acceptance testing', () => {
  const result = buildDefaultWorkflowArtifacts({
    tenantId: 'tenant-beta',
    brandId: 'brand-beta',
    brandName: 'Beta Brand',
    industryId: 'real-estate',
    scriptSetId: 'script-beta',
    qualificationFormId: 'form-beta',
    actorUid: 'server:test',
    timestamp: new Date(),
    beta: true,
  });

  assert.equal(result.script.approvalScope, 'beta_acceptance');
  assert.match(result.script.name, /Beta Acceptance/);
  assert.match(result.qualificationForm.description, /production-pilot/);
});
