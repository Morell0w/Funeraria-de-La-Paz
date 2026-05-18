function buscar() {
    // 1. Pega o ID digitado no campo
    let id = document.getElementById("idFalecido").value;

    // Validação: se o campo estiver vazio, avisa o usuário e para a execução
    if (id.trim() === "") {
        alert("Por favor, digite um ID para buscar.");
        return;
    }

    // 2. MELHORIA: Seleciona a div e mostra um estado de "Carregando..."
    const campoResultado = document.getElementById("resultado");
    campoResultado.innerHTML = "<p style='color: #666; font-style: italic;'>Buscando no banco de dados...</p>";

    // 3. Faz a requisição para o arquivo buscar.php passando o ID
    fetch("buscar.php?id=" + id)
    .then(res => {
        if (!res.ok) {
            throw new Error("Erro na resposta do servidor");
        }
        return res.text();
    })
    .then(data => {
        // 4. Insere a resposta estilizada que vem do PHP dentro da div
        campoResultado.innerHTML = data;
    })
    .catch(error => {
        console.error("Erro na busca:", error);
        campoResultado.innerHTML = "<p style='color: red;'>Não foi possível conectar ao servidor. Tente novamente.</p>";
    });
}

// 5. MELHORIA EXTRA: Evita que a página recarregue se o usuário apertar "Enter" no teclado
document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.querySelector("form");
    
    if (formulario) {
        formulario.addEventListener("submit", function(event) {
            // Impede o HTML de enviar o form para o "Relatorio.php" ao apertar Enter
            event.preventDefault(); 
            // Em vez de recarregar, chama a nossa função de busca
            buscar(); 
        });
    }
});