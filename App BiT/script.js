const viewNames = { inicio: 'Visão geral', vagas: 'Vagas', talentos: 'Talentos', esg: 'Impacto ESG' };
const jobs = [
  { title: 'Analista de Dados Júnior', location: 'Florianópolis, SC', level: 'Júnior', candidates: 27, diversity: 67, status: 'Aberta', color: 'purple-bg' },
  { title: 'Engenheira de Dados Sênior', location: 'Remoto, Brasil', level: 'Sênior', candidates: 43, diversity: 58, status: 'Aberta', color: 'green-bg' },
  { title: 'Product Designer', location: 'Híbrido · São Paulo', level: 'Pleno', candidates: 19, diversity: 72, status: 'Em revisão', color: 'orange-bg' }
];

const navButtons = [...document.querySelectorAll('[data-view]')];
function showView(name) {
  const target = document.getElementById(`view-${name}`);
  if (!target) return;
  document.querySelectorAll('.view').forEach(view => view.classList.toggle('active', view === target));
  navButtons.forEach(button => button.classList.toggle('active', button.dataset.view === name));
  document.getElementById('crumb-current').textContent = viewNames[name] || name;
  history.replaceState(null, '', name === 'inicio' ? '#inicio' : `#${name}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navButtons.forEach(button => button.addEventListener('click', () => showView(button.dataset.view)));
document.querySelectorAll('[data-open="vaga-modal"]').forEach(button => button.addEventListener('click', () => document.getElementById('vaga-modal').showModal()));
document.querySelector('.notice .dismiss').addEventListener('click', event => event.currentTarget.closest('.notice').remove());

function renderJobs(query = '') {
  const list = document.getElementById('jobs-list');
  const filtered = jobs.filter(job => `${job.title} ${job.location}`.toLowerCase().includes(query.toLowerCase()));
  list.innerHTML = filtered.length ? filtered.map(job => `
    <article class="job-card">
      <span class="job-icon ${job.color}">▤</span>
      <div class="job-card-main"><h3>${escapeHTML(job.title)}</h3><p>${escapeHTML(job.location)} · ${escapeHTML(job.level)} · Publicada recentemente</p></div>
      <div class="job-card-stats"><span><b>${job.candidates}</b> candidaturas</span><span class="diversity-pill">${job.diversity}% diversidade</span><span class="status-pill ${job.status === 'Aberta' ? 'open' : 'review'}">● ${job.status}</span></div>
    </article>`).join('') : '<article class="panel"><p>Nenhuma vaga encontrada. Tente outro termo.</p></article>';
}
function escapeHTML(value) { return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])); }
renderJobs();
document.querySelector('.search input').addEventListener('input', event => renderJobs(event.target.value));

document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(filter => filter.classList.remove('active'));
  button.classList.add('active');
  const query = document.querySelector('.search input').value;
  const list = document.getElementById('jobs-list');
  const cards = [...jobs].filter(job => `${job.title} ${job.location}`.toLowerCase().includes(query.toLowerCase())).filter(job => button.textContent.includes('Abertas') ? job.status === 'Aberta' : button.textContent.includes('revisão') ? job.status === 'Em revisão' : true);
  list.innerHTML = cards.length ? cards.map(job => `<article class="job-card"><span class="job-icon ${job.color}">▤</span><div class="job-card-main"><h3>${escapeHTML(job.title)}</h3><p>${escapeHTML(job.location)} · ${escapeHTML(job.level)} · Publicada recentemente</p></div><div class="job-card-stats"><span><b>${job.candidates}</b> candidaturas</span><span class="diversity-pill">${job.diversity}% diversidade</span><span class="status-pill ${job.status === 'Aberta' ? 'open' : 'review'}">● ${job.status}</span></div></article>`).join('') : '<article class="panel"><p>Nenhuma vaga neste filtro.</p></article>';
}));

const jobForm = document.getElementById('job-form');
jobForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(jobForm);
  const title = String(formData.get('title')).trim();
  const location = String(formData.get('location')).trim();
  jobs.unshift({ title, location, level: String(formData.get('level')), candidates: 0, diversity: 0, status: 'Aberta', color: 'blue-bg' });
  renderJobs(document.querySelector('.search input').value);
  jobForm.closest('dialog').close();
  jobForm.reset();
  showView('vagas');
  showSuccess('Vaga publicada com sucesso!', `${title} já está pronta para receber candidaturas.`);
});

function showSuccess(title, copy) {
  document.getElementById('success-title').textContent = title;
  document.getElementById('success-copy').textContent = copy;
  document.getElementById('success-modal').showModal();
}
document.querySelector('#success-modal .modal-close').addEventListener('click', () => document.getElementById('success-modal').close());
document.getElementById('success-close').addEventListener('click', () => document.getElementById('success-modal').close());

document.getElementById('show-shortlist').addEventListener('click', () => {
  document.querySelector('.candidates-panel').scrollIntoView({ behavior: 'smooth', block: 'center' });
});
document.querySelectorAll('.save-candidate').forEach(button => button.addEventListener('click', () => {
  const saved = button.classList.toggle('saved');
  button.textContent = saved ? '♥' : '♡';
  button.setAttribute('aria-pressed', String(saved));
}));

function downloadFile(name, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = name; link.click();
  URL.revokeObjectURL(url);
}
document.getElementById('export-shortlist').addEventListener('click', () => {
  const rows = [['Nome', 'Cidade', 'Experiência', 'Habilidades', 'Compatibilidade'], ['Ana Luiza', 'Florianópolis', '2 anos', 'Power BI; SQL', '96%'], ['Pedro Costa', 'São José', '1 ano', 'Python; SQL', '91%'], ['Sara Martins', 'Palhoça', '3 anos', 'Power BI; Python', '88%']];
  downloadFile('shortlist-analista-de-dados.csv', rows.map(row => row.map(value => `"${value}"`).join(';')).join('\n'), 'text/csv;charset=utf-8');
  showSuccess('Shortlist exportada!', 'O arquivo CSV com os talentos recomendados foi baixado.');
});
document.getElementById('generate-report').addEventListener('click', () => showSuccess('Relatório ESG pronto!', 'Use “Baixar relatório” para gerar uma versão imprimível com os indicadores do trimestre.'));
document.getElementById('download-report').addEventListener('click', () => {
  const report = `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Relatório ESG BiT</title><style>body{font:16px Arial;color:#20214b;max-width:760px;margin:50px auto;padding:24px}h1{color:#09084b}li{padding:8px}small{color:#777}</style><h1>Relatório de impacto ESG · BiT</h1><p>2º trimestre de 2026 · Núcleo Tech</p><h2>Indicadores de inclusão</h2><ul><li>PCD em cargos técnicos: <b>48%</b> (meta 60%)</li><li>Mulheres em liderança: <b>30%</b> (meta atingida)</li><li>Grupos sub-representados: <b>74%</b> (meta 80%)</li><li>Índice de diversidade: <b>62%</b> · crescimento trimestral de 8,2%</li></ul><small>Relatório gerado pela demonstração local do BiT.</small><script>window.print()<\/script></html>`;
  downloadFile('relatorio-esg-bit.html', report, 'text/html;charset=utf-8');
  showSuccess('Relatório preparado!', 'O relatório foi baixado como HTML pronto para imprimir ou salvar em PDF pelo navegador.');
});

document.querySelectorAll('.filter').forEach((button, index) => { if (index === 0) button.click(); });
const initialView = location.hash.replace('#', '');
if (viewNames[initialView]) showView(initialView);
