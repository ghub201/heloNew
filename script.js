const menuButton = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
if (menuButton) {
  menuButton.addEventListener('click', () => navLinks.classList.toggle('open'));
}

const consoleBox = document.querySelector('[data-console]');
const demoButtons = document.querySelectorAll('[data-demo-step]');
const scripts = {
  request: [
    ['muted','> key_request.submit()'],
    ['accent','request_id: HKM-2417'],
    ['green','device_status: registered'],
    ['yellow','action: waiting for policy validation']
  ],
  validate: [
    ['muted','> private_chain.validate(request_id)'],
    ['green','identity: verified'],
    ['green','access_policy: approved'],
    ['accent','private_block: PB-8842 committed']
  ],
  contract: [
    ['muted','> smart_contract.execute_lifecycle_rule()'],
    ['green','rule: active session key allowed'],
    ['accent','operation: generate + distribute'],
    ['yellow','next_rotation: session expiry']
  ],
  proof: [
    ['muted','> public_chain.anchor_proof()'],
    ['accent','proof_hash: 0x7A91...C42F'],
    ['green','audit_status: tamper-resistant proof stored'],
    ['muted','secret_key_exposure: false']
  ],
  revoke: [
    ['muted','> revoke_key(device_id)'],
    ['yellow','revocation_reason: access change'],
    ['green','private_record: updated'],
    ['accent','public_proof: revocation hash anchored']
  ]
};
function renderConsole(step){
  if(!consoleBox) return;
  const lines = scripts[step] || scripts.request;
  consoleBox.innerHTML = lines.map(([cls,text]) => `<div class="code-line code-${cls}">${text}</div>`).join('');
}
if (demoButtons.length) {
  renderConsole('request');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      demoButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderConsole(btn.dataset.demoStep);
    });
  });
}
