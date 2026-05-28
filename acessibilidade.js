document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================
    // 1. FUNÇÃO GLOBAL: Lê a memória e aplica no <body>
    // ==========================================================
    function aplicarConfiguracoesSalvas() {
        const body = document.body;
        
        // Aplica o Modo Escuro baseado na memória
        const modoEscuroAtivo = localStorage.getItem('toggle-contraste') === 'true';
        body.classList.toggle('modo-escuro-ativo', modoEscuroAtivo);
        
        // Se o botão de Modo Escuro existir NESTA página específica, deixa ele marcado
        const checkEscuro = document.getElementById('toggle-contraste');
        if (checkEscuro) {
            checkEscuro.checked = modoEscuroAtivo;
        }

        // Aplica a Escala de Fonte baseada na memória (padrão é 'fonte-padrao')
        const fonteSalva = localStorage.getItem('escala-fonte') || 'fonte-padrao';
        
        // Remove qualquer classe antiga de fonte para não acumular
        body.classList.remove('fonte-padrao-ativa', 'fonte-media-ativa', 'fonte-grande-ativa', 'fonte-daniel-ativa');
        // Adiciona a classe correspondente ao tamanho salvo
        body.classList.add(`${fonteSalva}-ativa`);

        // Se os botões de rádio existirem NESTA página específica, deixa o correto marcado
        const radioFonte = document.getElementById(fonteSalva);
        if (radioFonte) {
            radioFonte.checked = true;
        }
    }

    // ==========================================================
    // 2. FUNÇÃO DO PAINEL: Salva as escolhas (Só roda na tela que tem os botões)
    // ==========================================================
    const painel = document.querySelector('.painel-acessibilidade');
    
    // O 'if (painel)' garante que o código de salvar só rode se a página atual tiver o painel físico
    if (painel) {
        painel.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', (e) => {
                
                if (e.target.type === 'checkbox') {
                    // Salva se o modo escuro está true ou false
                    localStorage.setItem(e.target.id, e.target.checked);
                } else if (e.target.type === 'radio') {
                    // Salva o ID do tamanho de fonte escolhido (ex: fonte-media, fonte-daniel...)
                    localStorage.setItem('escala-fonte', e.target.id);
                }
                
                // Força a atualização imediata assim que o usuário clica
                aplicarConfiguracoesSalvas();
            });
        });
    }

    // Executa a aplicação das configurações imediatamente ao carregar QUALQUER página
    aplicarConfiguracoesSalvas();
});