function buildDefaultWorkflowArtifacts({
  tenantId,
  brandId,
  brandName,
  industryId,
  scriptSetId,
  qualificationFormId,
  actorUid,
  timestamp,
  beta = false,
}) {
  const safeBrandName = String(brandName || 'Client').trim() || 'Client';
  const scriptName = beta
    ? `${safeBrandName} Beta Acceptance Script`
    : `${safeBrandName} Lead Qualification Script`;
  const formName = beta
    ? `${safeBrandName} Beta Qualification Form`
    : `${safeBrandName} Lead Qualification Form`;

  const script = {
    tenantId,
    brandId,
    industryId,
    scriptSetId,
    name: scriptName,
    purpose: 'outbound',
    language: 'en',
    version: 1,
    version_number: 1,
    status: 'approved',
    opening_statement: `Hello, this is a representative calling on behalf of ${safeBrandName}. Is now a good time for a brief conversation?`,
    qualification_questions: 'Confirm the prospect identity, current need, expected timing, and willingness to take the agreed next step.',
    objection_responses: 'Acknowledge the concern, clarify that the conversation is brief, and never pressure the prospect. Honor every opt-out immediately.',
    transfer_language: `With your permission, I can connect you with the appropriate ${safeBrandName} contact now.`,
    appointment_language: `Let us find a time for the appropriate ${safeBrandName} contact to follow up with you.`,
    opt_out_language: 'Understood. We will record your request and will not continue this outreach.',
    escalation_instructions: 'Escalate legal, safety, privacy, protected-health-information, or consent concerns to a supervisor without collecting additional sensitive details.',
    approvalScope: beta ? 'beta_acceptance' : 'provisioned_default',
    approvedBy: actorUid,
    approved_by: actorUid,
    approvedAt: timestamp,
    approved_date: timestamp,
    effectiveDate: new Date().toISOString().slice(0, 10),
    effective_date: new Date().toISOString().slice(0, 10),
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  const questions = [
    {
      id: 'identity-confirmed',
      label: 'Did you confirm you are speaking with the intended prospect?',
      field_type: 'yes_no',
      required: true,
      options: [],
      customer_facing: true,
      internal_only: false,
      score_weight: 10,
    },
    {
      id: 'need-confirmed',
      label: 'Did the prospect confirm a need that matches this program?',
      field_type: 'yes_no',
      required: true,
      options: [],
      customer_facing: true,
      internal_only: false,
      score_weight: 30,
    },
    {
      id: 'timing-confirmed',
      label: 'Did the prospect confirm an actionable timeframe?',
      field_type: 'yes_no',
      required: true,
      options: [],
      customer_facing: true,
      internal_only: false,
      score_weight: 25,
    },
    {
      id: 'next-step-approved',
      label: 'Did the prospect agree to an appointment, transfer, or defined follow-up?',
      field_type: 'yes_no',
      required: true,
      options: [],
      customer_facing: true,
      internal_only: false,
      score_weight: 35,
    },
  ];

  const qualificationForm = {
    tenantId,
    brandId,
    industryId,
    qualificationFormId,
    name: formName,
    description: beta
      ? 'Synthetic production-pilot qualification form. Replace with the client-approved production form before paid traffic.'
      : 'Initial qualification form created during tenant provisioning. Review with the client before paid traffic.',
    status: 'active',
    version: 1,
    qualificationThreshold: 70,
    qualification_threshold: 70,
    questions,
    createdBy: actorUid,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  return { script, qualificationForm };
}

module.exports = { buildDefaultWorkflowArtifacts };
