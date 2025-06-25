// Dados da aplicação
let appData = {
  turmas: [
    {
      id: 1, 
      nome: "7º A", 
      ano: "7º ano", 
      numeroAlunos: 25,
      professor: "Prof. Ana Silva",
      anoLetivo: "2024/2025"
    },
    {
      id: 2, 
      nome: "8º B", 
      ano: "8º ano", 
      numeroAlunos: 23,
      professor: "Prof. Ana Silva", 
      anoLetivo: "2024/2025"
    },
    {
      id: 3, 
      nome: "9º C", 
      ano: "9º ano", 
      numeroAlunos: 21,
      professor: "Prof. Ana Silva",
      anoLetivo: "2024/2025"
    }
  ],
  alunos: [
    {id: 1, nome: "João Santos", turmaId: 1, numeroAluno: 1, email: "joao.santos@exemplo.pt", media: 3.5},
    {id: 2, nome: "Maria Ferreira", turmaId: 1, numeroAluno: 2, email: "maria.ferreira@exemplo.pt", media: 4.2}, 
    {id: 3, nome: "Pedro Costa", turmaId: 1, numeroAluno: 3, email: "pedro.costa@exemplo.pt", media: 2.8},
    {id: 4, nome: "Ana Oliveira", turmaId: 2, numeroAluno: 1, email: "ana.oliveira@exemplo.pt", media: 3.9},
    {id: 5, nome: "Carlos Pereira", turmaId: 2, numeroAluno: 2, email: "carlos.pereira@exemplo.pt", media: 3.2},
    {id: 6, nome: "Sofia Rodrigues", turmaId: 1, numeroAluno: 4, email: "sofia.rodrigues@exemplo.pt", media: 4.5},
    {id: 7, nome: "Miguel Alves", turmaId: 2, numeroAluno: 3, email: "miguel.alves@exemplo.pt", media: 3.7},
    {id: 8, nome: "Beatriz Silva", turmaId: 3, numeroAluno: 1, email: "beatriz.silva@exemplo.pt", media: 4.0},
    {id: 9, nome: "Gonçalo Martins", turmaId: 3, numeroAluno: 2, email: "goncalo.martins@exemplo.pt", media: 3.1},
    {id: 10, nome: "Inês Carvalho", turmaId: 1, numeroAluno: 5, email: "ines.carvalho@exemplo.pt", media: 3.8}
  ],
  dominios: [
    {id: "oralidade", nome: "Oralidade", peso: 20},
    {id: "leitura", nome: "Leitura", peso: 20}, 
    {id: "escrita", nome: "Escrita", peso: 30},
    {id: "educacao_literaria", nome: "Educação Literária", peso: 20},
    {id: "gramatica", nome: "Gramática", peso: 10}
  ],
  avaliacoes: [
    {
      id: 1,
      titulo: "Teste diagnóstico - Outubro",
      tipo: "Avaliação Sumativa", 
      dominio: "escrita",
      turmaId: 1,
      data: "2024-10-15",
      resultados: [
        {alunoId: 1, classificacao: 3.2, observacoes: "Bom desempenho na estrutura textual"},
        {alunoId: 2, classificacao: 4.1, observacoes: "Excelente coesão e coerência"},
        {alunoId: 3, classificacao: 2.8, observacoes: "Necessita melhorar a organização das ideias"}
      ]
    },
    {
      id: 2,
      titulo: "Avaliação da Oralidade - Apresentações",
      tipo: "Avaliação da Oralidade",
      dominio: "oralidade",
      turmaId: 2,
      data: "2024-11-20",
      resultados: [
        {alunoId: 4, classificacao: 4.0, observacoes: "Boa expressividade e fluência"},
        {alunoId: 5, classificacao: 3.5, observacoes: "Melhorar a projeção da voz"}
      ]
    },
    {
      id: 3,
      titulo: "Análise de texto poético",
      tipo: "Avaliação Formativa",
      dominio: "educacao_literaria",
      turmaId: 1,
      data: "2024-11-25",
      resultados: [
        {alunoId: 1, classificacao: 3.7, observacoes: "Boa interpretação dos recursos expressivos"},
        {alunoId: 2, classificacao: 4.3, observacoes: "Excelente análise literária"}
      ]
    }
  ]
};

// Estado da aplicação
let currentSection = 'dashboard';
let sidebarCollapsed = false;

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  setupEventListeners();
  renderDashboard();
  renderTurmas();
  renderAlunos();
  renderAvaliacoes();
  renderRelatorios();
  renderConfiguracoes();
  populateSelects();
  updateStats();
}

// Event Listeners
function setupEventListeners() {
  // Menu toggle
  document.getElementById('menuToggle').addEventListener('click', toggleSidebar);
  
  // Navigation
  document.querySelectorAll('.sidebar__link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.getAttribute('data-section');
      showSection(section);
      setActiveLink(this);
    });
  });
  
  // Close modal on overlay click
  document.querySelectorAll('.modal__overlay').forEach(overlay => {
    overlay.addEventListener('click', function() {
      const modal = this.closest('.modal');
      closeModal(modal.id);
    });
  });
  
  // Form submissions
  document.getElementById('formTurma').addEventListener('submit', function(e) {
    e.preventDefault();
    salvarTurma();
  });
  
  document.getElementById('formAluno').addEventListener('submit', function(e) {
    e.preventDefault();
    salvarAluno();
  });
  
  document.getElementById('formAvaliacao').addEventListener('submit', function(e) {
    e.preventDefault();
    salvarAvaliacao();
  });
}

// Navigation Functions
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main = document.getElementById('mainContent');
  
  sidebarCollapsed = !sidebarCollapsed;
  
  if (sidebarCollapsed) {
    sidebar.classList.add('collapsed');
    main.classList.add('expanded');
  } else {
    sidebar.classList.remove('collapsed');
    main.classList.remove('expanded');
  }
}

function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll('.content-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Show selected section
  document.getElementById(sectionName).classList.add('active');
  currentSection = sectionName;
  
  // Update content if needed
  if (sectionName === 'dashboard') {
    updateStats();
  }
}

function setActiveLink(activeLink) {
  document.querySelectorAll('.sidebar__link').forEach(link => {
    link.classList.remove('active');
  });
  activeLink.classList.add('active');
}

// Modal Functions
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.add('show');
  
  // Reset form if exists
  const form = modal.querySelector('form');
  if (form) {
    form.reset();
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove('show');
}

// Dashboard Functions
function renderDashboard() {
  renderTurmasResumo();
  renderAvaliacoesRecentes();
}

function renderTurmasResumo() {
  const container = document.getElementById('turmasResumo');
  
  if (appData.turmas.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">👥</div>
        <h4 class="empty-state__title">Nenhuma turma criada</h4>
        <p class="empty-state__description">Comece por criar a sua primeira turma</p>
        <button class="btn btn--primary" onclick="showSection('turmas')">Criar Turma</button>
      </div>
    `;
    return;
  }
  
  container.innerHTML = appData.turmas.map(turma => `
    <div class="turma-item">
      <div class="turma-item__info">
        <h4>${turma.nome}</h4>
        <p>${turma.ano} • ${turma.anoLetivo}</p>
      </div>
      <div class="turma-item__stats">
        <span class="turma-item__count">${turma.numeroAlunos}</span>
        <span class="turma-item__label">alunos</span>
      </div>
    </div>
  `).join('');
}

function renderAvaliacoesRecentes() {
  const container = document.getElementById('avaliacoesRecentes');
  const avaliacoesRecentes = appData.avaliacoes
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 5);
  
  if (avaliacoesRecentes.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state__icon">📝</div>
        <p>Nenhuma avaliação registada</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = avaliacoesRecentes.map(avaliacao => {
    const turma = appData.turmas.find(t => t.id === avaliacao.turmaId);
    const dataFormatada = new Date(avaliacao.data).toLocaleDateString('pt-PT');
    
    return `
      <div class="avaliacao-item">
        <div class="avaliacao-item__info">
          <h5>${avaliacao.titulo}</h5>
          <div class="avaliacao-item__meta">
            ${turma ? turma.nome : 'Turma não encontrada'} • ${avaliacao.tipo}
          </div>
        </div>
        <div class="avaliacao-item__date">${dataFormatada}</div>
      </div>
    `;
  }).join('');
}

function updateStats() {
  document.getElementById('totalTurmas').textContent = appData.turmas.length;
  document.getElementById('totalAlunos').textContent = appData.alunos.length;
  document.getElementById('totalAvaliacoes').textContent = appData.avaliacoes.length;
  
  // Calcular média geral
  const medias = appData.alunos.map(aluno => aluno.media || 0);
  const mediaGeral = medias.length > 0 ? 
    (medias.reduce((sum, media) => sum + media, 0) / medias.length).toFixed(1) : 
    '0.0';
  document.getElementById('mediaNacional').textContent = mediaGeral;
}

// Turmas Functions
function renderTurmas() {
  const tbody = document.getElementById('turmasTable');
  
  if (appData.turmas.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">
          Nenhuma turma encontrada
        </td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = appData.turmas.map(turma => `
    <tr>
      <td><strong>${turma.nome}</strong></td>
      <td>${turma.ano}</td>
      <td>${turma.numeroAlunos}</td>
      <td>${turma.anoLetivo}</td>
      <td>
        <button class="btn btn--sm btn--secondary" onclick="editarTurma(${turma.id})">Editar</button>
        <button class="btn btn--sm btn--outline" onclick="eliminarTurma(${turma.id})">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

function salvarTurma() {
  const form = document.getElementById('formTurma');
  const formData = new FormData(form);
  
  const novaTurma = {
    id: appData.turmas.length > 0 ? Math.max(...appData.turmas.map(t => t.id)) + 1 : 1,
    nome: formData.get('nome'),
    ano: formData.get('ano'),
    numeroAlunos: 0, // Será atualizado quando alunos forem adicionados
    professor: "Prof. Ana Silva",
    anoLetivo: formData.get('anoLetivo')
  };
  
  appData.turmas.push(novaTurma);
  renderTurmas();
  renderDashboard();
  populateSelects();
  closeModal('modalTurma');
  
  showNotification('Turma criada com sucesso!', 'success');
}

function editarTurma(id) {
  const turma = appData.turmas.find(t => t.id === id);
  if (!turma) return;
  
  const form = document.getElementById('formTurma');
  form.elements['nome'].value = turma.nome;
  form.elements['ano'].value = turma.ano;
  form.elements['anoLetivo'].value = turma.anoLetivo;
  
  // Store ID for updating
  form.setAttribute('data-edit-id', id);
  
  openModal('modalTurma');
}

function eliminarTurma(id) {
  if (confirm('Tem a certeza que deseja eliminar esta turma?')) {
    appData.turmas = appData.turmas.filter(t => t.id !== id);
    // Também eliminar alunos da turma
    appData.alunos = appData.alunos.filter(a => a.turmaId !== id);
    // Eliminar avaliações da turma
    appData.avaliacoes = appData.avaliacoes.filter(a => a.turmaId !== id);
    
    renderTurmas();
    renderAlunos();
    renderDashboard();
    populateSelects();
    
    showNotification('Turma eliminada com sucesso!', 'success');
  }
}

// Alunos Functions
function renderAlunos() {
  const tbody = document.getElementById('alunosTable');
  const alunos = getFilteredAlunos();
  
  if (alunos.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">
          Nenhum aluno encontrado
        </td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = alunos.map(aluno => {
    const turma = appData.turmas.find(t => t.id === aluno.turmaId);
    return `
      <tr>
        <td>${aluno.numeroAluno}</td>
        <td><strong>${aluno.nome}</strong></td>
        <td>${turma ? turma.nome : 'N/A'}</td>
        <td>${aluno.email}</td>
        <td><span class="status ${getMediaStatus(aluno.media)}">${(aluno.media || 0).toFixed(1)}</span></td>
        <td>
          <button class="btn btn--sm btn--secondary" onclick="verPerfilAluno(${aluno.id})">Ver Perfil</button>
          <button class="btn btn--sm btn--outline" onclick="eliminarAluno(${aluno.id})">Eliminar</button>
        </td>
      </tr>
    `;
  }).join('');
}

function getFilteredAlunos() {
  let alunos = [...appData.alunos];
  
  const filtroTurma = document.getElementById('filtroTurma').value;
  const pesquisa = document.getElementById('pesquisaAluno').value.toLowerCase();
  
  if (filtroTurma) {
    alunos = alunos.filter(aluno => aluno.turmaId == filtroTurma);
  }
  
  if (pesquisa) {
    alunos = alunos.filter(aluno => 
      aluno.nome.toLowerCase().includes(pesquisa) ||
      aluno.email.toLowerCase().includes(pesquisa)
    );
  }
  
  return alunos;
}

function filtrarAlunos() {
  renderAlunos();
}

function getMediaStatus(media) {
  if (media >= 4.5) return 'status--success';
  if (media >= 3.0) return 'status--info';
  if (media >= 2.0) return 'status--warning';
  return 'status--error';
}

function salvarAluno() {
  const form = document.getElementById('formAluno');
  const formData = new FormData(form);
  
  const novoAluno = {
    id: appData.alunos.length > 0 ? Math.max(...appData.alunos.map(a => a.id)) + 1 : 1,
    nome: formData.get('nome'),
    turmaId: parseInt(formData.get('turmaId')),
    numeroAluno: parseInt(formData.get('numeroAluno')),
    email: formData.get('email'),
    media: 0 // Será calculada com base nas avaliações
  };
  
  appData.alunos.push(novoAluno);
  
  // Atualizar número de alunos na turma
  const turma = appData.turmas.find(t => t.id === novoAluno.turmaId);
  if (turma) {
    turma.numeroAlunos = appData.alunos.filter(a => a.turmaId === turma.id).length;
  }
  
  renderAlunos();
  renderTurmas();
  renderDashboard();
  closeModal('modalAluno');
  
  showNotification('Aluno adicionado com sucesso!', 'success');
}

function verPerfilAluno(id) {
  const aluno = appData.alunos.find(a => a.id === id);
  if (!aluno) return;
  
  const turma = appData.turmas.find(t => t.id === aluno.turmaId);
  const avaliacoes = appData.avaliacoes.filter(av => 
    av.resultados && av.resultados.some(r => r.alunoId === id)
  );
  
  alert(`Perfil do Aluno:
Nome: ${aluno.nome}
Turma: ${turma ? turma.nome : 'N/A'}
Email: ${aluno.email}
Média: ${aluno.media.toFixed(1)}
Avaliações: ${avaliacoes.length}`);
}

function eliminarAluno(id) {
  if (confirm('Tem a certeza que deseja eliminar este aluno?')) {
    const aluno = appData.alunos.find(a => a.id === id);
    if (aluno) {
      // Eliminar aluno
      appData.alunos = appData.alunos.filter(a => a.id !== id);
      
      // Atualizar número de alunos na turma
      const turma = appData.turmas.find(t => t.id === aluno.turmaId);
      if (turma) {
        turma.numeroAlunos = appData.alunos.filter(a => a.turmaId === turma.id).length;
      }
      
      // Eliminar resultados do aluno das avaliações
      appData.avaliacoes.forEach(avaliacao => {
        if (avaliacao.resultados) {
          avaliacao.resultados = avaliacao.resultados.filter(r => r.alunoId !== id);
        }
      });
      
      renderAlunos();
      renderTurmas();
      renderDashboard();
      
      showNotification('Aluno eliminado com sucesso!', 'success');
    }
  }
}

// Avaliações Functions
function renderAvaliacoes() {
  const tbody = document.getElementById('avaliacoesTable');
  const avaliacoes = getFilteredAvaliacoes();
  
  if (avaliacoes.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">
          Nenhuma avaliação encontrada
        </td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = avaliacoes.map(avaliacao => {
    const turma = appData.turmas.find(t => t.id === avaliacao.turmaId);
    const dominio = appData.dominios.find(d => d.id === avaliacao.dominio);
    const dataFormatada = new Date(avaliacao.data).toLocaleDateString('pt-PT');
    
    return `
      <tr>
        <td><strong>${avaliacao.titulo}</strong></td>
        <td><span class="status ${getTipoStatus(avaliacao.tipo)}">${avaliacao.tipo}</span></td>
        <td>${dominio ? dominio.nome : 'N/A'}</td>
        <td>${turma ? turma.nome : 'N/A'}</td>
        <td>${dataFormatada}</td>
        <td>
          <button class="btn btn--sm btn--secondary" onclick="verResultados(${avaliacao.id})">Ver Resultados</button>
          <button class="btn btn--sm btn--outline" onclick="eliminarAvaliacao(${avaliacao.id})">Eliminar</button>
        </td>
      </tr>
    `;
  }).join('');
}

function getFilteredAvaliacoes() {
  let avaliacoes = [...appData.avaliacoes];
  
  const filtroTipo = document.getElementById('filtroTipoAvaliacao').value;
  const filtroDominio = document.getElementById('filtroDominio').value;
  
  if (filtroTipo) {
    avaliacoes = avaliacoes.filter(av => av.tipo.toLowerCase().includes(filtroTipo));
  }
  
  if (filtroDominio) {
    avaliacoes = avaliacoes.filter(av => av.dominio === filtroDominio);
  }
  
  return avaliacoes;
}

function filtrarAvaliacoes() {
  renderAvaliacoes();
}

function getTipoStatus(tipo) {
  if (tipo.includes('Formativa')) return 'status--formativa';
  if (tipo.includes('Sumativa')) return 'status--sumativa';
  if (tipo.includes('Rubricas')) return 'status--rubrica';
  if (tipo.includes('Oralidade')) return 'status--oralidade';
  return 'status--info';
}

function criarAvaliacao(tipo) {
  const tipoMap = {
    'formativa': 'Avaliação Formativa',
    'sumativa': 'Avaliação Sumativa',
    'rubrica': 'Avaliação por Rubricas',
    'oralidade': 'Avaliação da Oralidade'
  };
  
  openModal('modalAvaliacao');
  
  // Pre-fill tipo
  const selectTipo = document.querySelector('#formAvaliacao select[name="tipo"]');
  if (selectTipo && tipoMap[tipo]) {
    selectTipo.value = tipoMap[tipo];
  }
}

function salvarAvaliacao() {
  const form = document.getElementById('formAvaliacao');
  const formData = new FormData(form);
  
  const novaAvaliacao = {
    id: appData.avaliacoes.length > 0 ? Math.max(...appData.avaliacoes.map(a => a.id)) + 1 : 1,
    titulo: formData.get('titulo'),
    tipo: formData.get('tipo'),
    dominio: formData.get('dominio'),
    turmaId: parseInt(formData.get('turmaId')),
    data: formData.get('data'),
    resultados: [] // Será preenchido posteriormente
  };
  
  appData.avaliacoes.push(novaAvaliacao);
  renderAvaliacoes();
  renderDashboard();
  closeModal('modalAvaliacao');
  
  showNotification('Avaliação criada com sucesso!', 'success');
}

function verResultados(id) {
  const avaliacao = appData.avaliacoes.find(a => a.id === id);
  if (!avaliacao) return;
  
  const turma = appData.turmas.find(t => t.id === avaliacao.turmaId);
  const dominio = appData.dominios.find(d => d.id === avaliacao.dominio);
  
  let resultadosText = `Avaliação: ${avaliacao.titulo}
Tipo: ${avaliacao.tipo}
Domínio: ${dominio ? dominio.nome : 'N/A'}
Turma: ${turma ? turma.nome : 'N/A'}
Data: ${new Date(avaliacao.data).toLocaleDateString('pt-PT')}

Resultados:`;
  
  if (avaliacao.resultados && avaliacao.resultados.length > 0) {
    avaliacao.resultados.forEach(resultado => {
      const aluno = appData.alunos.find(a => a.id === resultado.alunoId);
      resultadosText += `
• ${aluno ? aluno.nome : 'Aluno não encontrado'}: ${resultado.classificacao} valores`;
      if (resultado.observacoes) {
        resultadosText += ` - ${resultado.observacoes}`;
      }
    });
  } else {
    resultadosText += '\nNenhum resultado registado.';
  }
  
  alert(resultadosText);
}

function eliminarAvaliacao(id) {
  if (confirm('Tem a certeza que deseja eliminar esta avaliação?')) {
    appData.avaliacoes = appData.avaliacoes.filter(a => a.id !== id);
    renderAvaliacoes();
    renderDashboard();
    showNotification('Avaliação eliminada com sucesso!', 'success');
  }
}

// Relatórios Functions
function renderRelatorios() {
  renderGraficoDesempenho();
  renderGraficoEvolucao();
}

function renderGraficoDesempenho() {
  const canvas = document.getElementById('graficoDesempenho');
  const ctx = canvas.getContext('2d');
  
  // Limpar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Dados simulados por domínio
  const dados = appData.dominios.map(dominio => {
    const avaliacoesDominio = appData.avaliacoes.filter(av => av.dominio === dominio.id);
    if (avaliacoesDominio.length === 0) return { nome: dominio.nome, media: 0 };
    
    let totalClassificacoes = 0;
    let numeroClassificacoes = 0;
    
    avaliacoesDominio.forEach(avaliacao => {
      if (avaliacao.resultados) {
        avaliacao.resultados.forEach(resultado => {
          totalClassificacoes += resultado.classificacao;
          numeroClassificacoes++;
        });
      }
    });
    
    const media = numeroClassificacoes > 0 ? totalClassificacoes / numeroClassificacoes : 0;
    return { nome: dominio.nome, media: media };
  });
  
  // Desenhar gráfico de barras simples
  const maxMedia = 5;
  const barWidth = canvas.width / dados.length - 20;
  const barMaxHeight = canvas.height - 60;
  
  ctx.fillStyle = '#626c71';
  ctx.font = '12px Arial';
  
  dados.forEach((item, index) => {
    const x = index * (barWidth + 20) + 10;
    const barHeight = (item.media / maxMedia) * barMaxHeight;
    const y = canvas.height - barHeight - 30;
    
    // Desenhar barra
    ctx.fillStyle = '#21808d';
    ctx.fillRect(x, y, barWidth, barHeight);
    
    // Desenhar valor
    ctx.fillStyle = '#134252';
    ctx.textAlign = 'center';
    ctx.fillText(item.media.toFixed(1), x + barWidth/2, y - 5);
    
    // Desenhar label
    ctx.save();
    ctx.translate(x + barWidth/2, canvas.height - 5);
    ctx.rotate(-Math.PI/4);
    ctx.textAlign = 'right';
    ctx.fillText(item.nome, 0, 0);
    ctx.restore();
  });
}

function renderGraficoEvolucao() {
  const canvas = document.getElementById('graficoEvolucao');
  const ctx = canvas.getContext('2d');
  
  // Limpar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Dados simulados de evolução mensal
  const meses = ['Set', 'Out', 'Nov', 'Dez', 'Jan'];
  const medias = [3.1, 3.3, 3.5, 3.4, 3.6];
  
  const stepX = canvas.width / (meses.length - 1);
  const maxY = canvas.height - 40;
  
  // Desenhar linha
  ctx.strokeStyle = '#21808d';
  ctx.lineWidth = 2;
  ctx.beginPath();
  
  medias.forEach((media, index) => {
    const x = index * stepX;
    const y = maxY - (media / 5) * maxY;
    
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    
    // Desenhar pontos
    ctx.fillStyle = '#21808d';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
    
    // Desenhar valores
    ctx.fillStyle = '#134252';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(media.toFixed(1), x, y - 10);
    
    // Desenhar labels dos meses
    ctx.fillText(meses[index], x, canvas.height - 5);
  });
  
  ctx.stroke();
}

// Configurações Functions
function renderConfiguracoes() {
  const container = document.getElementById('dominiosConfig');
  
  container.innerHTML = appData.dominios.map(dominio => `
    <div class="dominio-item">
      <span class="dominio-item__nome">${dominio.nome}</span>
      <div class="dominio-item__peso">
        <input type="number" class="form-control" value="${dominio.peso}" min="0" max="100" 
               onchange="atualizarPesoDominio('${dominio.id}', this.value)">
        <span>%</span>
      </div>
    </div>
  `).join('');
}

function atualizarPesoDominio(dominioId, novoPeso) {
  const dominio = appData.dominios.find(d => d.id === dominioId);
  if (dominio) {
    dominio.peso = parseInt(novoPeso);
    showNotification('Peso do domínio atualizado!', 'success');
  }
}

// Utility Functions
function populateSelects() {
  // Popular select de turmas para alunos
  const selectTurmaAluno = document.getElementById('selectTurmaAluno');
  selectTurmaAluno.innerHTML = '<option value="">Selecione a turma</option>' +
    appData.turmas.map(turma => `<option value="${turma.id}">${turma.nome}</option>`).join('');
  
  // Popular select de turmas para avaliações
  const selectTurmaAvaliacao = document.getElementById('selectTurmaAvaliacao');
  selectTurmaAvaliacao.innerHTML = '<option value="">Selecione a turma</option>' +
    appData.turmas.map(turma => `<option value="${turma.id}">${turma.nome}</option>`).join('');
  
  // Popular select de domínios
  const selectDominio = document.getElementById('selectDominio');
  selectDominio.innerHTML = '<option value="">Selecione o domínio</option>' +
    appData.dominios.map(dominio => `<option value="${dominio.id}">${dominio.nome}</option>`).join('');
  
  // Popular filtros
  const filtroTurma = document.getElementById('filtroTurma');
  filtroTurma.innerHTML = '<option value="">Todas as turmas</option>' +
    appData.turmas.map(turma => `<option value="${turma.id}">${turma.nome}</option>`).join('');
  
  const filtroDominio = document.getElementById('filtroDominio');
  filtroDominio.innerHTML = '<option value="">Todos os domínios</option>' +
    appData.dominios.map(dominio => `<option value="${dominio.id}">${dominio.nome}</option>`).join('');
}

function showNotification(message, type = 'info') {
  // Criar notificação simples
  const notification = document.createElement('div');
  notification.className = `status status--${type}`;
  notification.textContent = message;
  notification.style.position = 'fixed';
  notification.style.top = '80px';
  notification.style.right = '20px';
  notification.style.zIndex = '3000';
  notification.style.padding = '12px 20px';
  notification.style.borderRadius = '8px';
  notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  
  document.body.appendChild(notification);
  
  // Remover após 3 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 3000);
}

// Responsive behavior
window.addEventListener('resize', function() {
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('mainContent');
    sidebar.classList.add('collapsed');
    main.classList.add('expanded');
    sidebarCollapsed = true;
  }
});

// Initialize responsive state
if (window.innerWidth <= 768) {
  setTimeout(() => {
    const sidebar = document.getElementById('sidebar');
    const main = document.getElementById('mainContent');
    sidebar.classList.add('collapsed');
    main.classList.add('expanded');
    sidebarCollapsed = true;
  }, 100);
}
// ===========================================
// FUNCIONALIDADE PARA ALTERAR NOME DO PROFESOR
// ===========================================

if (typeof window.nomeProfessorAtual === 'undefined') {
    window.nomeProfessorAtual = "Professor(a)";
}

function alterarNomeProfessor() {
    const novoNome = prompt("Introduza o novo nome do professor:", window.nomeProfessorAtual);
    
    if (novoNome !== null && novoNome.trim() !== "") {
        window.nomeProfessorAtual = novoNome.trim();
        localStorage.setItem('nomeProfessorSalvo', novoNome.trim());
        atualizarNomeNaInterface();
        alert("✅ Nome alterado para: " + novoNome.trim());
    }
}

function atualizarNomeNaInterface() {
    const nomeAtual = window.nomeProfessorAtual;
    
    const seletores = ['.nome-professor', '.professor-nome', '[data-professor]', '#nome-professor'];
    
    seletores.forEach(seletor => {
        const elementos = document.querySelectorAll(seletor);
        elementos.forEach(elemento => elemento.textContent = nomeAtual);
    });
    
    if (document.title.toLowerCase().includes('professor')) {
        document.title = `AvaliaPortuguês - ${nomeAtual}`;
    }
    
    const todosElementos = document.querySelectorAll('*');
    todosElementos.forEach(elemento => {
        if (elemento.children.length === 0 && 
            elemento.textContent && 
            elemento.textContent.includes('Professor(a)')) {
            elemento.textContent = elemento.textContent.replace('Professor(a)', nomeAtual);
        }
    });
}

function carregarNomeSalvo() {
    const nomeSalvo = localStorage.getItem('nomeProfessorSalvo');
    if (nomeSalvo) {
        window.nomeProfessorAtual = nomeSalvo;
        atualizarNomeNaInterface();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', carregarNomeSalvo);
} else {
    carregarNomeSalvo();
}

function adicionarBotaoAlterarNome() {
    if (document.getElementById('btn-alterar-nome')) return;
    
    const botao = document.createElement('button');
    botao.id = 'btn-alterar-nome';
    botao.innerHTML = '⚙️ Alterar Nome';
    botao.style.cssText = `
        position: fixed; top: 10px; right: 10px; z-index: 1000;
        padding: 8px 12px; border-radius: 5px; background-color: #6c757d;
        color: white; border: none; cursor: pointer; font-size: 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    `;
    botao.onclick = alterarNomeProfessor;
    document.body.appendChild(botao);
}

setTimeout(adicionarBotaoAlterarNome, 1000);

