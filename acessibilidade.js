document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================
    // 1. FUNÇÃO GLOBAL: Lê memória e aplica no <body>
    // ==========================================================
    function aplicarConfiguracoesSalvas() {
        const body = document.body;
        
        // Aplica o Modo Escuro baseado na memória
        const modoEscuroAtivo = localStorage.getItem('toggle-contraste') === 'true';
        body.classList.toggle('modo-escuro-ativo', modoEscuroAtivo);
        
        // Se o checkbox existir nesta página, deixa marcado
        const checkEscuro = document.getElementById('toggle-contraste');
        if (checkEscuro) {
            checkEscuro.checked = modoEscuroAtivo;
        }

        // Aplica a Escala de Fonte baseada na memória
        const fonteSalva = localStorage.getItem('escala-fonte') || 'fonte-padrao';
        
        // Remove classes antigas de fonte
        body.classList.remove('fonte-padrao-ativa', 'fonte-media-ativa', 'fonte-grande-ativa', 'fonte-daniel-ativa');
        // Adiciona a classe correspondente
        body.classList.add(`${fonteSalva}-ativa`);

        // Se os inputs existirem nesta página, marca o correto
        const radioFonte = document.getElementById(fonteSalva);
        if (radioFonte) {
            radioFonte.checked = true;
        }
    }

    // ==========================================================
    // 2. FUNÇÃO DO PAINEL: Salva as escolhas
    // ==========================================================
    const painel = document.querySelector('.painel-acessibilidade');
    
    if (painel) {
        painel.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', (e) => {
                
                if (e.target.type === 'checkbox') {
                    localStorage.setItem(e.target.id, e.target.checked);
                } else if (e.target.type === 'radio') {
                    localStorage.setItem('escala-fonte', e.target.id);
                }
                
                // Atualização imediata
                aplicarConfiguracoesSalvas();
            });
        });
    }

    // Aplica configurações ao carregar qualquer página
    aplicarConfiguracoesSalvas();
});