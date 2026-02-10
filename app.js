// ===== Navbar: encolher ao rolar + destacar link ativo =====
(function(){
  // Seleciona a barra de navegação principal
  const nav = document.querySelector('.custom-navbar');
  // Seleciona todos os links de navegação
  const links = document.querySelectorAll('.navbar .nav-link');

  // Função que adiciona ou remove a classe "navbar-shrink"
  // quando o usuário rola a página
  function onScroll(){
    if(window.scrollY > 10){ 
      nav.classList.add('navbar-shrink'); // Encolhe a navbar
    }
    else{ 
      nav.classList.remove('navbar-shrink'); // Restaura a navbar
    }
  }

  // Executa a verificação logo ao carregar
  onScroll();
  // E também a cada evento de rolagem
  window.addEventListener('scroll', onScroll);

  // ==== Atualiza link ativo conforme a rolagem ====
  // Seleciona todas as seções + o header (hero)
  const sections = [...document.querySelectorAll('section, header.hero, footer'),
    document.getElementById('projetos')
  ];
  

  // Cria um observador para monitorar quando as seções entram na tela
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        // Pega o ID da seção que entrou em foco
        const id = entry.target.getAttribute('id');

        // Marca o link correspondente como ativo
        links.forEach(l=>{
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { 
    root:null, // viewport do navegador
    rootMargin:"0px 0px -60% 0px", // margem para ativar antes da seção acabar
    threshold:0.2 // porcentagem visível necessária
  });

  // Observa cada seção
  sections.forEach(s=>obs.observe(s));
})();

// ===== Toggler animado (abre/fecha menu no mobile) =====
(function(){
  const toggler = document.querySelector('.custom-toggler'); // Botão hamburguer
  const collapse = document.getElementById('navbarNav'); // Conteúdo colapsável

  // Se não existir, sai da função
  if(!toggler || !collapse) return;

  // Adiciona classe "open" quando o menu abre
  collapse.addEventListener('show.bs.collapse', ()=> toggler.classList.add('open'));
  // Remove a classe quando o menu fecha
  collapse.addEventListener('hide.bs.collapse', ()=> toggler.classList.remove('open'));

  // Fecha o menu automaticamente quando o usuário clica em um link (modo mobile)
  document.querySelectorAll('.navbar .nav-link').forEach(a=>{
    a.addEventListener('click', ()=> {
      // Recupera ou cria a instância do collapse do Bootstrap
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapse);

      // Fecha somente se o botão toggler estiver visível
      if(window.getComputedStyle(toggler).display !== 'none'){ 
        bsCollapse.hide(); 
      }
    });
  });
})();

// ===== Efeito de digitação (typewriter simples) =====
(function(){
  const el = document.getElementById('typewriter'); // Elemento onde o texto será digitado
  if(!el) return; // Se não existir, sai

  // Frases que irão aparecer alternadamente
  const frases = [
    'Back-end • APIs REST • Autenticação',
    'Front-end • UI limpa • Acessibilidade',
    'Dados • SQL • Integrações',
  ];

  let i = 0,      // Índice da frase atual
      j = 0,      // Índice do caractere atual
      apagando = false; // Controla se está digitando ou apagando

  // Função principal do efeito
  function tick(){
    const alvo = frases[i]; // Frase alvo da vez

    if(!apagando){
      // Escrevendo caractere por caractere
      el.textContent = alvo.slice(0, j++);
      // Após terminar a frase + pausa, começa a apagar
      if(j > alvo.length + 8){ apagando = true; }
    } else {
      // Apagando caractere por caractere
      el.textContent = alvo.slice(0, j--);
      // Quando termina de apagar, troca de frase
      if(j === 0){ 
        apagando = false; 
        i = (i+1) % frases.length; // Vai para a próxima frase
      }
    }
    // Velocidade da digitação e apagamento
    setTimeout(tick, apagando ? 28 : 38);
  }

  // Inicia o efeito
  tick();
})();

// ===== tsParticles: estrelas animadas no topo =====
tsParticles.load("tsparticles", {
  fpsLimit: 60, // Limita FPS para não pesar
  background: { color: "transparent" }, // Fundo transparente
  particles: {
    number: { value: 80 }, // Quantidade de partículas
    color: { value: "#ff0000" }, // Cor das partículas
    shape: { type: "star" }, // Formato: estrela
    opacity: { value: 0.8, random: true }, // Transparência variável
    size: { value: { min: 1, max: 3 } }, // Tamanho mínimo/máximo
    move: { 
      enable: true, 
      speed: 0.5, // Velocidade lenta
      direction: "none", 
      outModes: { default:"bounce" } // Partículas quicam na borda
    }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "repulse" }, // Afasta ao passar o mouse
      onClick: { enable: false } // Clique desativado
    },
    modes: { repulse: { distance: 80 } } // Distância do efeito de repulsão
  },
  detectRetina: true // Ajusta para telas de alta resolução
});

// ===== Footer: formulário com modal de sucesso =====
(function(){
  const form = document.getElementById('footerContactForm'); // Formulário do footer
  const modalEl = document.getElementById('footerSuccessModal'); // Modal de sucesso
  const bsModal = modalEl ? new bootstrap.Modal(modalEl) : null; // Instância do modal

  if(!form) return; // Se não existir, sai

  // Evento ao enviar o formulário
  form.addEventListener('submit', function(e){
    e.preventDefault(); // Evita o recarregamento da página

    // Campos do formulário
    const name = document.getElementById('f-name');
    const email = document.getElementById('f-email');
    const message = document.getElementById('f-message');

    // Validação simples: todos os campos devem estar preenchidos
    if(!name.value.trim() || !email.value.trim() || !message.value.trim()){
      [name,email,message].forEach(i=>{
        if(i && !i.value.trim()){
          i.classList.add('is-invalid'); // Marca campo como inválido
          // Remove a marcação após 1,5s
          setTimeout(()=>i.classList.remove('is-invalid'), 1500);
        }
      });
      return;
    }

    // Se passar na validação, mostra o modal
    if(bsModal) bsModal.show();

    // Reseta o formulário
    form.reset();
  });
})();
