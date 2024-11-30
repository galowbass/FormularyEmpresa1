import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Função para criar e popular a tabela Cursos
async function criarEPopularTabelaCursos(descricao) {
    const db = await open({
        filename: './banco.db', // vinculo com o arquivo Banco.db
        driver: sqlite3.Database,
    });

    // Criação da tabela Cursos
    await db.run(
        'CREATE TABLE IF NOT EXISTS Cursos(Id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT NOT NULL)'
    );

    // Inserção de dados na tabela Cursos
    await db.run('INSERT INTO Cursos (descricao) VALUES (?)', [descricao]);
}

// Função para criar e popular a tabela Turmas
async function criarEPopularTabelaTurmas(descricao, curso_Id) {
    const db = await open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });

    // Criação da tabela Turmas
    await db.run(
        'CREATE TABLE IF NOT EXISTS Turmas (Id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT NOT NULL, cursoId INTEGER NOT NULL, CONSTRAINT FK_Turmas_Cursos FOREIGN KEY (cursoId) REFERENCES Cursos(Id) ON DELETE CASCADE)'
    );

    // Inserção de dados na tabela Turmas
    await db.run('INSERT INTO Turmas (descricao, cursoId) VALUES (?, ?)', [descricao, curso_Id]);
}

// Função para criar e popular a tabela Leads
async function criarEPopularTabelaLeads(nome, telefone, email, cursointeresse) {
    const db = await open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });

    // Criação da tabela Leads
    await db.run(
        'CREATE TABLE IF NOT EXISTS Leads (Id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT NOT NULL, telefone TEXT NOT NULL, email TEXT NOT NULL, cursointeresse INTEGER NOT NULL, CONSTRAINT FK_Leads_Cursos FOREIGN KEY (cursointeresse) REFERENCES Cursos(Id) ON DELETE CASCADE)'
    );

    // Inserção de dados na tabela Leads
    await db.run('INSERT INTO Leads (nome, telefone, email, cursointeresse) VALUES (?, ?, ?, ?)', [
        nome, 
        telefone, 
        email, 
        cursointeresse,
    ]);
}

// Função para criar e popular a tabela Alunos
async function criarEPopularTabelaAlunos(CodigoMatriculaId, Nome, Telefone, Email, CursoId, TurmaId, DataCadastro) {
    const db = await open({
        filename: './banco.db',
        driver: sqlite3.Database,
    });

    // Criação da tabela Alunos
    await db.run(
        'CREATE TABLE IF NOT EXISTS Alunos (Id INTEGER PRIMARY KEY AUTOINCREMENT, CodigoMatricula INTEGER NOT NULL UNIQUE, Nome TEXT NOT NULL, Telefone TEXT NOT NULL, Email TEXT NOT NULL, CursoId INTEGER NOT NULL, TurmaId INTEGER NOT NULL, DataCadastro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT FK_Alunos_Cursos FOREIGN KEY (CursoId) REFERENCES Cursos(Id) ON DELETE CASCADE, CONSTRAINT FK_Alunos_Turmas FOREIGN KEY (TurmaId) REFERENCES Turmas(Id) ON DELETE CASCADE)'
    );

    // Inserção de dados na tabela Alunos
    await db.run('INSERT INTO Alunos (CodigoMatricula, Nome, Telefone, Email, CursoId, TurmaId, DataCadastro) VALUES (?, ?, ?, ?, ?, ?, ?)', [
        CodigoMatriculaId, 
        Nome, 
        Telefone, 
        Email, 
        CursoId,  
        TurmaId, 
        DataCadastro,
    ]);
}

// Chamada das funções para criar e popular as tabelas
criarEPopularTabelaCursos('Curso de Programação');
criarEPopularTabelaTurmas('Turma 2024', 1);
criarEPopularTabelaLeads('João Silva', '123456789', 'joao@exemplo.com', 1);
criarEPopularTabelaAlunos(12345, 'Carlos Souza', '987654321', 'carlos@exemplo.com', 1, 1, '2024-11-30');

