// ========================================================================
// SCRIPT DE ACESSIBILIDADE COMPLETO - Funerária de La Paz
// Garante que absolutamente tudo seja acessível em WCAG AAA
// ========================================================================

document.addEventListener("DOMContentLoaded", () => {
    console.log("🔧 Script de Acessibilidade Iniciado");

    // =====================================================================
    // 1. APLICAR CONFIGURAÇÕES SALVAS (Modo Escuro + Tamanho de Fonte)
    // =====================================================================
    function aplicarConfiguracoesSalvas() {
        const body = document.body;
        
        // Modo Escuro
        const modoEscuroAtivo = localStorage.getItem('toggle-contraste') === 'true';
        body.classList.toggle('modo-escuro-ativo', modoEscuroAtivo);
        
        const checkEscuro = document.getElementById('toggle-contraste');
        if (checkEscuro) {
            checkEscuro.checked = modoEscuroAtivo;
            checkEscuro.setAttribute('aria-pressed', modoEscuroAtivo);
        }

        // Escala de Fonte
        const fonteSalva = localStorage.getItem('escala-fonte') || 'fonte-padrao';
        body.classList.remove('fonte-padrao-ativa', 'fonte-media-ativa', 'fonte-grande-ativa', 'fonte-daniel-ativa');
        body.classList.add(`${fonteSalva}-ativa`);

        const radioFonte = document.getElementById(fonteSalva);
        if (radioFonte) {
            radioFonte.checked = true;
        }
    }

    // =====================================================================
    // 2. PAINEL DE ACESSIBILIDADE - Salvar Alterações
    // =====================================================================
    const painel = document.querySelector('.painel-acessibilidade');
    
    if (painel) {
        painel.querySelectorAll('input').forEach(input => {
            input.addEventListener('change', (e) => {
                if (e.target.type === 'checkbox') {
                    localStorage.setItem(e.target.id, e.target.checked);
                    e.target.setAttribute('aria-pressed', e.target.checked);
                    anunciarParaLeitor(
                        e.target.checked ? 
                        'Modo escuro ativado' : 
                        'Modo escuro desativado'
                    );
                } else if (e.target.type === 'radio') {
                    localStorage.setItem('escala-fonte', e.target.id);
                    const label = document.querySelector(`label[for="${e.target.id}"] .btn-acessivel`);
                    const tamanho = label ? label.textContent : e.target.id;
                    anunciarParaLeitor(`Tamanho de fonte alterado para: ${tamanho}`);
                }
                
                aplicarConfiguracoesSalvas();
            });
        });
    }

    // =====================================================================
    // 3. FUNÇÃO DE ANÚNCIO PARA LEITORES DE TELA
    // =====================================================================
    function anunciarParaLeitor(mensagem) {
        const anunciador = document.getElementById('aria-live-announcer');
        if (anunciador) {
            anunciador.textContent = mensagem;
            anunciador.setAttribute('aria-live', 'polite');
            anunciador.setAttribute('aria-atomic', 'true');
        }
    }

    // =====================================================================
    // 4. MELHORAR NAVEGAÇÃO POR TECLADO
    // =====================================================================
    function melhorarNavegacaoTeclado() {
        const elementosInterativos = document.querySelectorAll('a, button, input, textarea, select');
        
        elementosInterativos.forEach(el => {
            if (!el.hasAttribute('tabindex')) {
                if (getComputedStyle(el).display === 'none') {
                    el.setAttribute('tabindex', '-1');
                } else {
                    el.setAttribute('tabindex', '0');
                }
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const modaisAbertos = document.querySelectorAll('[role="dialog"][open], .modal.ativo');
                modaisAbertos.forEach(modal => {
                    if (typeof modal.close === 'function') {
                        modal.close();
                    } else {
                        modal.classList.remove('ativo');
                    }
                });
            }
        });
    }

    // =====================================================================
    // 5. VALIDAR E MELHORAR SEMÂNTICA HTML
    // =====================================================================
    function melhorarSemanticaHTML() {
        const mainElement = document.querySelector('main');
        if (mainElement && !mainElement.hasAttribute('role')) {
            mainElement.setAttribute('role', 'main');
        }

        const headers = document.querySelectorAll('header');
        headers.forEach(header => {
            if (!header.hasAttribute('aria-label') && !header.querySelector('h1')) {
                header.setAttribute('aria-label', 'Cabeçalho do site');
            }
        });

        const footers = document.querySelectorAll('footer');
        footers.forEach(footer => {
            if (!footer.hasAttribute('aria-label') && !footer.hasAttribute('role')) {
                footer.setAttribute('role', 'contentinfo');
                footer.setAttribute('aria-label', 'Rodapé do site');
            }
        });

        const navs = document.querySelectorAll('nav');
        navs.forEach(nav => {
            if (!nav.hasAttribute('aria-label')) {
                const breadcrumb = nav.classList.contains('breadcrumb');
                nav.setAttribute('aria-label', breadcrumb ? 'Navegação de caminho' : 'Navegação principal');
            }
        });
    }

    // =====================================================================
    // 6. VALIDAR IMAGENS COM ALT TEXT
    // =====================================================================
    function validarAltText() {
        const imagens = document.querySelectorAll('img');
        let imagensSemAlt = 0;

        imagens.forEach(img => {
            if (!img.hasAttribute('alt') || img.getAttribute('alt').trim() === '') {
                imagensSemAlt++;
                img.setAttribute('alt', 'Imagem');
            }
        });

        if (imagensSemAlt > 0) {
            console.warn(`⚠️ ${imagensSemAlt} imagens sem alt text adequado`);
        }
    }

    // =====================================================================
    // 7. MELHORAR FORMULÁRIOS
    // =====================================================================
    function melhorarFormularios() {
        const formularios = document.querySelectorAll('form');
        
        formularios.forEach(form => {
            if (!form.hasAttribute('aria-label') && !form.querySelector('h2, h3, h4')) {
                form.setAttribute('aria-label', 'Formulário');
            }

            form.querySelectorAll('input, textarea, select').forEach(campo => {
                const id = campo.id;
                if (id) {
                    let label = document.querySelector(`label[for="${id}"]`);
                    if (!label && !campo.hasAttribute('aria-label')) {
                        campo.setAttribute('aria-label', 'Campo de entrada');
                    }
                }

                if (campo.hasAttribute('required')) {
                    campo.setAttribute('aria-required', 'true');
                }

                if (campo.classList.contains('erro') || campo.classList.contains('invalid')) {
                    campo.setAttribute('aria-invalid', 'true');
                }
            });

            form.querySelectorAll('button[type="submit"]').forEach(btn => {
                if (!btn.textContent.trim()) {
                    btn.setAttribute('aria-label', 'Enviar formulário');
                }
            });
        });
    }

    // =====================================================================
    // 8. VALIDAR HIERARQUIA DE HEADINGS
    // =====================================================================
    function validarHierarchiaHeadings() {
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let headingAnterior = 0;
        let errosHierarquia = 0;

        headings.forEach((heading, index) => {
            const nivel = parseInt(heading.tagName[1]);
            
            if (index === 0 && nivel !== 1) {
                errosHierarquia++;
            }
            
            if (index > 0 && nivel > headingAnterior + 1) {
                errosHierarquia++;
            }
            
            headingAnterior = nivel;
        });

        if (errosHierarquia === 0) {
            console.log('✓ Hierarquia de headings válida');
        }
    }

    // =====================================================================
    // 9. VALIDAR LINKS
    // =====================================================================
    function validarLinks() {
        const links = document.querySelectorAll('a');
        let linksProblematicos = 0;

        links.forEach(link => {
            const texto = link.textContent.trim();
            const href = link.getAttribute('href');

            if (!texto && !link.hasAttribute('aria-label')) {
                linksProblematicos++;
                link.setAttribute('aria-label', 'Link');
            }

            if (link.hasAttribute('target') && link.getAttribute('target') === '_blank') {
                if (!texto.includes('(nova aba)') && !link.hasAttribute('aria-label')) {
                    link.setAttribute('aria-label', texto + ' (abre em nova aba)');
                }
            }
        });
    }

    // =====================================================================
    // 10. CRIAR ANUNCIADOR PARA SCREEN READERS
    // =====================================================================
    function criarAnunciador() {
        if (!document.getElementById('aria-live-announcer')) {
            const anunciador = document.createElement('div');
            anunciador.id = 'aria-live-announcer';
            anunciador.setAttribute('aria-live', 'polite');
            anunciador.setAttribute('aria-atomic', 'true');
            anunciador.style.position = 'absolute';
            anunciador.style.left = '-9999px';
            anunciador.style.width = '1px';
            anunciador.style.height = '1px';
            anunciador.style.overflow = 'hidden';
            document.body.appendChild(anunciador);
            console.log('✓ Anunciador de screen reader criado');
        }
    }

    // =====================================================================
    // 11. MELHORAR SKIP LINKS
    // =====================================================================
    function melhorarSkipLinks() {
        const skipLinks = document.querySelectorAll('.skip-link');
        skipLinks.forEach(link => {
            link.setAttribute('tabindex', '1');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                    anunciarParaLeitor('Conteúdo principal focado');
                }
            });
        });
    }

    // =====================================================================
    // 12. ADICIONAR SUPORTE A LEITOR DE TELA
    // =====================================================================
    function melhorarElementosDinamicos() {
        const mensagens = document.querySelectorAll('.alert, .message, .notification');
        mensagens.forEach(msg => {
            if (!msg.hasAttribute('role')) {
                msg.setAttribute('role', 'status');
            }
            if (!msg.hasAttribute('aria-live')) {
                msg.setAttribute('aria-live', 'polite');
            }
        });
    }

    // =====================================================================
    // EXECUTAR TUDO
    // =====================================================================
    aplicarConfiguracoesSalvas();
    criarAnunciador();
    melhorarSemanticaHTML();
    melhorarNavegacaoTeclado();
    melhorarFormularios();
    melhorarSkipLinks();
    melhorarElementosDinamicos();
    validarAltText();
    validarLinks();
    validarHierarchiaHeadings();

    console.log('🎉 Script de Acessibilidade Finalizado!');
});

// ========================================================================
// Detectar preferência de movimento reduzido
// ========================================================================
const prefereReposoReduzido = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefereReposoReduzido.matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    console.log('⚠️ Usuário prefere movimento reduzido');
}

// ========================================================================
// Detectar preferência de cores
// ========================================================================
const preferenciaColorEscura = window.matchMedia('(prefers-color-scheme: dark)');
if (preferenciaColorEscura.matches && localStorage.getItem('toggle-contraste') === null) {
    document.body.classList.add('modo-escuro-ativo');
    localStorage.setItem('toggle-contraste', 'true');
    console.log('✓ Modo escuro ativado por preferência do sistema');
}