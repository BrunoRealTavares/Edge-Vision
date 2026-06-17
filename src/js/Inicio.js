document.addEventListener('DOMContentLoaded', () => {
    
    // Configurações do DOM
    const profileToggle = document.getElementById('profileToggle');
    const profileDropdown = document.getElementById('profileDropdown');
    const btnPlayPause = document.getElementById('btnPlayPause');
    const playIcon = document.getElementById('playIcon');
    const videoStream = document.getElementById('videoStream');
    const videoFallback = document.getElementById('videoFallback');
    const liveTimestamp = document.getElementById('liveTimestamp');

    let isPlaying = true;

    /* ==========================================================================
       1. INTERATIVIDADE DO PROFILE DROPDOWN
       ========================================================================== */
    profileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
        
        const arrow = profileToggle.querySelector('.dropdown-arrow');
        if (profileDropdown.classList.contains('active')) {
            arrow.style.transform = 'rotate(180deg)';
        } else {
            arrow.style.transform = 'rotate(0deg)';
        }
    });

    document.addEventListener('click', () => {
        if (profileDropdown.classList.contains('active')) {
            profileDropdown.classList.remove('active');
            profileToggle.querySelector('.dropdown-arrow').style.transform = 'rotate(0deg)';
        }
    });

    /* ==========================================================================
       2. REPRODUTOR DE VÍDEO (PLAY / PAUSE)
       ========================================================================== */
    btnPlayPause.addEventListener('click', () => {
        isPlaying = !isPlaying;

        if (isPlaying) {
            playIcon.className = 'bi bi-play-fill';
            videoStream.classList.remove('paused');
            videoFallback.style.display = 'none';
            btnPlayPause.setAttribute('title', 'Pausar Transmissão');
        } else {
            playIcon.className = 'bi bi-pause-fill';
            videoStream.classList.add('paused');
            videoFallback.style.display = 'flex';
            btnPlayPause.setAttribute('title', 'Iniciar Transmissão');
        }
    });

    /* ==========================================================================
       3. ATUALIZAÇÃO DO TIMESTAMP EM TEMPO REAL
       ========================================================================== */
    function updateTimestamp() {
        if (!isPlaying) return;

        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        liveTimestamp.textContent = `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateTimestamp, 1000);
    updateTimestamp();

    /* ==========================================================================
       4. INTEGRANDO A WEB SPEECH API DE FORMA DINÂMICA (CORRIGIDO PARA O CYPRESS)
       ========================================================================== */
    const botaoOuvir = document.getElementById("btnOuvir");
    const textoAudio = document.getElementById("textoAudio");
    const iconeAudio = document.getElementById("iconeAudio");
    const conteudoLeitura = document.getElementById("conteudo-leitura");

    function gerenciarFala() {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            resetarBotaoVoz();
            return;
        }

        const textoParaLer = conteudoLeitura ? conteudoLeitura.innerText : "Painel de Monitoramento";
        const mensagem = new SpeechSynthesisUtterance(textoParaLer);

        mensagem.lang = "pt-BR";
        mensagem.rate = 1.15;

        // Força a mudança exata de classe e texto cobrada pelo Cypress
        botaoOuvir.classList.add("falando-ativo");
        iconeAudio.className = "bi bi-stop-fill";
        if (textoAudio) {
            textoAudio.textContent = "Parar Leitura";
        }

        mensagem.onend = function() {
            resetarBotaoVoz();
        };

        window.speechSynthesis.speak(mensagem);
    }

    function resetarBotaoVoz() {
        botaoOuvir.classList.remove("falando-ativo");
        iconeAudio.className = "bi bi-volume-up-fill";
        if (textoAudio) {
            textoAudio.textContent = "Ouvir Painel";
        }
    }

    botaoOuvir.addEventListener("click", gerenciarFala);
});