const modal = document.getElementById('modalForm');
const modalTitulo = document.getElementById('modal-titulo');
const botoesInscricao = document.querySelectorAll('.btn-abrir');
const botaoFechar = document.querySelector('.close-btn');

// Abrir Modal
botoesInscricao.forEach(botao => {
  botao.addEventListener('click', () => {
    const esporte = botao.getAttribute('data-esporte');
    modalTitulo.innerText = esporte; // Define o nome do esporte no título
    modal.style.display = 'block';
  });
});

// Fechar Modal (no X)
botaoFechar.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Fechar se clicar fora da caixa branca
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});

// Lógica de Envio (Apenas para demonstração)
document.getElementById('inscricaoForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Inscrição enviada com sucesso para ' + modalTitulo.innerText + '!');
  modal.style.display = 'none';
});

const synth = window.speechSynthesis;
let vozes = [];

// Carrega as vozes disponíveis (importante para navegadores como Chrome)
function carregarVozes() {
  vozes = synth.getVoices();
}
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = carregarVozes;
}

const btnLerTudo = document.getElementById('btn-ler-tudo');
const btnParar = document.getElementById('btn-parar-leitura');

btnLerTudo.addEventListener('click', () => {
  // 1. Cancela leituras anteriores
  synth.cancel();

  // 2. Seleciona todos os textos importantes (Títulos, Parágrafos e Labels)
  const elementosParaLer = document.querySelectorAll('h1, h2, h3, p, label, .btn-abrir');
  
  elementosParaLer.forEach((elemento, index) => {
    const texto = elemento.innerText || elemento.textContent;
    const utterance = new SpeechSynthesisUtterance(texto);
    
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;

    // Efeito Visual: Destaca o texto enquanto ele é lido
    utterance.onstart = () => {
      elemento.classList.add('lendo-agora');
      elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    utterance.onend = () => {
      elemento.classList.remove('lendo-agora');
    };

    // Adiciona na fila de reprodução
    synth.speak(utterance);
  });
});

// Botão de pânico para parar a voz imediatamente
btnParar.addEventListener('click', () => {
  synth.cancel();
  // Remove qualquer destaque visual restante
  document.querySelectorAll('.lendo-agora').forEach(el => el.classList.remove('lendo-agora'));
});

// --- CONTROLE DE FONTE ---
let tamanhoAtual = 16; 

function alterarFonte(delta) {
  tamanhoAtual += delta;
  // Limites para não quebrar o layout (entre 12px e 30px)
  if (tamanhoAtual < 12) tamanhoAtual = 12;
  if (tamanhoAtual > 30) tamanhoAtual = 30;
  
  document.documentElement.style.setProperty('--fonte-base', tamanhoAtual + 'px');
}

// --- CONTROLE DE CONTRASTE ---
const btnContraste = document.getElementById('btn-contraste');

btnContraste.addEventListener('click', () => {
  document.body.classList.toggle('alto-contraste');
  
  // Salva a preferência do usuário no navegador
  const modoAtivo = document.body.classList.contains('alto-contraste');
  localStorage.setItem('altoContraste', modoAtivo);
});

// Verifica se o usuário já usou o modo antes ao recarregar a página
window.onload = () => {
  if (localStorage.getItem('altoContraste') === 'true') {
    document.body.classList.add('alto-contraste');
  }
};

function lerManifesto() {
    window.speechSynthesis.cancel();
    const textoCompleto = document.querySelector('.container-texto').innerText.replace("🔊 Ouvir Manifesto Completo", "");
    const utterance = new SpeechSynthesisUtterance(textoCompleto);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
}

// Seletores para Patrocínio
const modalPatrocinio = document.getElementById('modalPatrocinio');
const btnAbrirPatrocinio = document.getElementById('btn-contato-patrocinio');
const btnFecharPatrocinio = document.querySelector('.fechar-modal-patrocinio');

// Abrir o modal de patrocínio
btnAbrirPatrocinio.onclick = function() {
    modalPatrocinio.style.display = "block";
}

// Fechar o modal de patrocínio
btnFecharPatrocinio.onclick = function() {
    modalPatrocinio.style.display = "none";
}

// Fechar se clicar fora da caixa branca
window.addEventListener('click', (event) => {
    if (event.target == modalPatrocinio) {
        modalPatrocinio.style.display = "none";
    }
});

// Mensagem de sucesso ao enviar (simulação)
document.getElementById('formPatrocinio').onsubmit = function(e) {
    e.preventDefault();
    alert("Obrigado pelo interesse! Nossa equipe de captação entrará em contato com a sua empresa em breve.");
    modalPatrocinio.style.display = "none";
}

const modalSugestao = document.getElementById('modalSugestao');
const btnAbrirSugestao = document.getElementById('btn-abrir-sugestao');
const btnFecharSugestao = document.querySelector('.fechar-modal-sugestao');

btnAbrirSugestao.onclick = () => modalSugestao.style.display = "block";
btnFecharSugestao.onclick = () => modalSugestao.style.display = "none";

window.addEventListener('click', (e) => {
    if (e.target == modalSugestao) modalSugestao.style.display = "none";
});

document.getElementById('formSugestao').onsubmit = function(e) {
    e.preventDefault();
    alert("Sua sugestão foi enviada com sucesso! Juntos somos mais fortes.");
    modalSugestao.style.display = "none";
};