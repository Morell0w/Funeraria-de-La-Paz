<?php
$USER = "root";
$SERVER = "localhost";
$PASSWORD = "4321";
$DATABASE = "GestaoFuneraria";

$id = $_GET["id"];

// 1. Cria a conexão com o banco de dados MySQL
$conexao = new mysqli($SERVER, $USER, $PASSWORD, $DATABASE);

// Verifica se houve algum erro na conexão
if ($conexao->connect_error) {
    die("<p style='color:red;'>Erro na conexão com o banco de dados: " . $conexao->connect_error . "</p>");
}

// 2. Prepara a consulta SQL 
// (Estou assumindo que sua tabela se chama 'falecidos' e os campos são 'nome', 'idade' e 'data_falecimento')
$sql = "SELECT nome, idade, data_falecimento FROM falecidos WHERE id = ?";
$stmt = $conexao->prepare($sql);

// O "s" indica que o ID é uma string (já que você usa "001", "002"). Se no banco for um número inteiro puro, use "i".
$stmt->bind_param("s", $id); 
$stmt->execute();
$resultado = $stmt->get_result();

// 3. Verifica se o ID foi encontrado no banco de dados
if ($resultado->num_rows > 0) {
    // Transforma o resultado do banco em uma array associativa
    $dados = $resultado->fetch_assoc();

    // Converte a data do padrão do banco (AAAA-MM-DD) para o padrão brasileiro (DD/MM/AAAA)
    $data_formatada = date("d/m/Y", strtotime($dados['data_falecimento']));

    // Exibe o mesmo bloco visual que você tinha antes
    echo "<div style='background:white;padding:20px;border-radius:8px;width:400px;margin:auto;box-shadow:0 2px 5px rgba(0,0,0,0.2)'>";
    echo "Nome: " . htmlspecialchars($dados['nome']) . "<br>";
    echo "Idade: " . htmlspecialchars($dados['idade']) . "<br>";
    echo "Data do falecimento: " . htmlspecialchars($data_formatada);
    echo "</div>";
} else {
    // Se o ID não existir no banco
    echo "<p style='color:red;'>ID não encontrado</p>";
}

// 4. Fecha a pesquisa e a conexão para liberar memória
$stmt->close();
$conexao->close();
?>