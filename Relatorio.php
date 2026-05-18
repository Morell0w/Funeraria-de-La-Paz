<?php

$id = $_GET["id"];

$dados = [

"001" => "Nome: João Silva <br> Idade: 78 <br> Data do falecimento: 10/03/2026",
"002" => "Nome: Maria Oliveira <br> Idade: 83 <br> Data do falecimento: 15/04/2026",
"003" => "Nome: Carlos Souza <br> Idade: 65 <br> Data do falecimento: 02/05/2026"

];

if(isset($dados[$id])){
echo "<div style='background:white;padding:20px;border-radius:8px;width:400px;margin:auto;box-shadow:0 2px 5px rgba(0,0,0,0.2)'>";
echo $dados[$id];
echo "</div>";
}else{
echo "<p style='color:red;'>ID não encontrado</p>";
}

?>