function alternarFormularios() {
    const login = document.getElementById('loginForm');
    const cadastro = document.getElementById('cadastroForm');

    login.classList.toggle('hidden');
    cadastro.classList.toggle('hidden');
}


function realizarCadastro(event) {
    event.preventDefault();

    const nome = document.getElementById('cadNome').value;
    const email = document.getElementById('cadEmail').value;

    alert(`Cadastro realizado com sucesso para: ${nome} (${email})`);


    alternarFormularios();
}

function realizarLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;

    alert(`Login efetuado com o e-mail: ${email}`);
}
