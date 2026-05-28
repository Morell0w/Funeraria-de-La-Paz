// Executa o código assim que a página carrega
document.addEventListener("DOMContentLoaded", () => {
    // 1. Monitora cliques em qualquer input do painel de acessibilidade
    document.querySelectorAll('.painel-acessibilidade input').forEach(input => {
        input.addEventListener('change', (e) => {
            // Salva se o checkbox/radio está marcado (true/false ou o id dele)
            if (e.target.type === 'checkbox') {
                localStorage.setItem(e.target.id, e.target.checked);
            } else if (e.target.type === 'radio') {
                localStorage.setItem('escala-fonte', e.target.id);
            }
            atualizarAcessibilidade();
        });
    });

    // 2. Função que lê a memória e aplica as classes no <body>
    function atualizarAcessibilidade() {
        const body = document.body;
        
        // Modo Escuro
        const modoEscuroAtivo = localStorage.getItem('toggle-contraste') === 'true';
        body.classList.toggle('modo-escuro-ativo', modoEscuroAtivo);
        
        // Mantém o checkbox visualmente marcado se o usuário mudar de página
        const checkEscuro = document.getElementById('toggle-contraste');
        if (checkEscuro) checkEscuro.checked = modoEscuroAtivo;

        // Escala de Fonte
        const fonteSalva = localStorage.getItem('escala-fonte') || 'fonte-padrao';
        
        // Remove classes antigas de fonte e aplica a nova
        body.classList.remove('fonte-padrao-ativa', 'fonte-media-ativa', 'fonte-grande-ativa', 'fonte-daniel-ativa');
        body.classList.add(`${fonteSalva}-ativa`);

        // Mantém o botão radio visualmente marcado se o usuário mudar de página
        const radioFonte = document.getElementById(fonteSalva);
        if (radioFonte) radioFonte.checked = true;
    }

    // Carrega as configurações assim que entra na página
    atualizarAcessibilidade();
});