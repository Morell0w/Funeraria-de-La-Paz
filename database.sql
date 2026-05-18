
CREATE DATABASE GestaoFuneraria;
USE GestaoFuneraria;

CREATE TABLE Planos (
    id_plano INT PRIMARY KEY AUTO_INCREMENT,
    tipo ENUM('Individual', 'Família', 'Pet') NOT NULL,
    valor_mensal DECIMAL(10, 2),
    descricao TEXT
);

CREATE TABLE Clientes (
    id_cliente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    endereco VARCHAR(255),
    estado_civil VARCHAR(50),
    id_plano INT,
    FOREIGN KEY (id_plano) REFERENCES Planos(id_plano)
);

CREATE TABLE Funcionarios (
    id_funcionario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cargo VARCHAR(50),
    data_nascimento DATE,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    endereco VARCHAR(255),
    estado_civil VARCHAR(50),
    data_admissao DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE Jazigos (
    id_jazigo INT PRIMARY KEY AUTO_INCREMENT,
    identificador_codigo VARCHAR(20) UNIQUE NOT NULL,
    setor VARCHAR(50),
    capacidade_maxima INT DEFAULT 4,
    sobrenome_familia VARCHAR(100) -- Identifica a família dona do jazigo
);

CREATE TABLE Defuntos (
    id_defunto INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE,
    data_falecimento DATE NOT NULL,
    causa_morte VARCHAR(150),
    cpf VARCHAR(14) UNIQUE,
    endereco_anterior VARCHAR(255),
    estado_civil VARCHAR(50),
    id_plano INT,
    id_jazigo INT,
    FOREIGN KEY (id_plano) REFERENCES Planos(id_plano),
    FOREIGN KEY (id_jazigo) REFERENCES Jazigos(id_jazigo)
);

CREATE TABLE Financeiro (
    id_transacao INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    valor DECIMAL(10, 2) NOT NULL,
    tipo_transacao ENUM('Mensalidade', 'Serviço Funerário', 'Manutenção Jazigo'),
    data_pagamento DATETIME DEFAULT CURRENT_TIMESTAMP,
    status_pagamento ENUM('Pago', 'Pendente', 'Atrasado'),
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente)
);

CREATE TABLE Agenda (
    id_evento INT PRIMARY KEY AUTO_INCREMENT,
    id_defunto INT,
    id_funcionario_responsavel INT,
    tipo_evento ENUM('Velório', 'Sepultamento', 'Cremação'),
    data_hora_inicio DATETIME,
    local_sala VARCHAR(50),
    FOREIGN KEY (id_defunto) REFERENCES Defuntos(id_defunto),
    FOREIGN KEY (id_funcionario_responsavel) REFERENCES Funcionarios(id_funcionario)
);

