const { getApps, initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { buildDefaultWorkflowArtifacts } = require('../workflow-defaults.cjs');

if (!getApps().length) initializeApp({ credential: applicationDefault(), projectId: process.env.GCLOUD_PROJECT || 'linkmarketing-agent-portal-crm' });
const db = getFirestore();

async function main() {
  if (process.env.CONFIRM_GOLDEN_CROSS_WORKFLOW !== 'yes') {
    throw new Error('Set CONFIRM_GOLDEN_CROSS_WORKFLOW=yes to backfill only the Golden Cross beta workflow.');
  }

  const tenantId = 'tenant-golden-cross-beta';
  const brandId = 'brand-golden-cross-realty';
  const campaignId = 'campaign-golden-cross-pilot';
  const scriptSetId = 'script-golden-cross-default';
  const qualificationFormId = 'qualification-golden-cross-default';
  const actorUid = 'server:golden-cross-workflow-backfill';
  const now = FieldValue.serverTimestamp();
  const [tenant, brand] = await Promise.all([
    db.doc(`tenants/${tenantId}`).get(),
    db.doc(`tenants/${tenantId}/brands/${brandId}`).get(),
  ]);

  if (!tenant.exists || tenant.data().demo === true || tenant.data().status !== 'beta') {
    throw new Error('Golden Cross beta tenant is missing or is not the isolated production beta tenant.');
  }
  if (!brand.exists || brand.data().tenantId !== tenantId) {
    throw new Error('Golden Cross beta Brand ownership is invalid.');
  }

  const workflow = buildDefaultWorkflowArtifacts({
    tenantId,
    brandId,
    brandName: brand.data().name || 'Golden Cross Realty',
    industryId: 'real-estate',
    scriptSetId,
    qualificationFormId,
    actorUid,
    timestamp: now,
    beta: true,
  });
  const batch = db.batch();
  batch.set(db.doc(`tenants/${tenantId}/campaigns/${campaignId}`), {
    defaultScriptId: scriptSetId,
    default_script_id: scriptSetId,
    defaultQualificationFormId: qualificationFormId,
    default_qualification_form_id: qualificationFormId,
    updatedAt: now,
  }, { merge: true });
  batch.set(db.doc(`tenants/${tenantId}/scripts/${scriptSetId}`), workflow.script, { merge: true });
  batch.set(db.doc(`tenants/${tenantId}/qualificationForms/${qualificationFormId}`), workflow.qualificationForm, { merge: true });
  batch.set(db.collection(`tenants/${tenantId}/auditLogs`).doc(), {
    tenantId,
    actorUid,
    action: 'workflow.defaults.backfilled',
    target: campaignId,
    metadata: { brandId, scriptSetId, qualificationFormId, betaOnly: true },
    occurredAt: now,
    createdAt: now,
  });
  await batch.commit();
  console.log(JSON.stringify({ ok: true, tenantId, brandId, campaignId, scriptSetId, qualificationFormId }));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
