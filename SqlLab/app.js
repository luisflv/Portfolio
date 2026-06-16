// SQL Lab - App Logic
// Roteiro de Atividades com Alunos, Cursos e Matrículas

// 1. Lista Completa de Questões (21 desafios)
const questions = [
    // 1. Consultas Básicas (SELECT e ORDER BY)
    {
        id: 1,
        section: "1. Consultas Básicas",
        title: "1.1. Consulta uma coluna",
        difficulty: "fácil",
        description: "Escreva uma consulta SQL para retornar apenas os nomes de todos os alunos da tabela <code>Alunos</code>.",
        tip: "Utilize o comando SELECT seguido pelo nome da coluna (nome) e FROM Alunos.",
        initialQuery: "SELECT nome FROM Alunos;",
        referenceQuery: "SELECT nome FROM Alunos;",
        tables: ["Alunos"],
        validationType: "query"
    },
    {
        id: 2,
        section: "1. Consultas Básicas",
        title: "1.2. Múltiplas colunas",
        difficulty: "fácil",
        description: "Escreva uma consulta para retornar o nome e o email de todos os alunos cadastrados.",
        tip: "Separe os nomes das colunas com vírgula: SELECT nome, email FROM Alunos.",
        initialQuery: "SELECT nome, email FROM Alunos;",
        referenceQuery: "SELECT nome, email FROM Alunos;",
        tables: ["Alunos"],
        validationType: "query"
    },
    {
        id: 3,
        section: "1. Consultas Básicas",
        title: "1.3. Todas as colunas",
        difficulty: "fácil",
        description: "Retorne a ficha completa (todas as colunas) de todos os alunos cadastrados.",
        tip: "Utilize o caractere curinga '*' para trazer todas as colunas: SELECT * FROM Alunos.",
        initialQuery: "SELECT * FROM Alunos;",
        referenceQuery: "SELECT * FROM Alunos;",
        tables: ["Alunos"],
        validationType: "query"
    },
    {
        id: 4,
        section: "1. Consultas Básicas",
        title: "1.4. Ordenação Crescente",
        difficulty: "fácil",
        description: "Listar os nomes dos cursos em ordem alfabética (A-Z).",
        tip: "Use ORDER BY nome_curso ASC para ordenar de forma crescente.",
        initialQuery: "SELECT nome_curso FROM Cursos ORDER BY nome_curso ASC;",
        referenceQuery: "SELECT nome_curso FROM Cursos ORDER BY nome_curso ASC;",
        tables: ["Cursos"],
        validationType: "query"
    },
    {
        id: 5,
        section: "1. Consultas Básicas",
        title: "1.5. Ordenação Decrescente",
        difficulty: "fácil",
        description: "Listar o nome e a data de nascimento dos alunos, ordenando do mais velho para o mais novo.",
        tip: "Alunos mais velhos têm datas de nascimento menores. Ordene por data_nascimento de forma decrescente (DESC).",
        initialQuery: "SELECT nome, data_nascimento FROM Alunos ORDER BY data_nascimento DESC;",
        referenceQuery: "SELECT nome, data_nascimento FROM Alunos ORDER BY data_nascimento DESC;",
        tables: ["Alunos"],
        validationType: "query"
    },

    // 2. Filtros e Operadores (WHERE, LIMIT, Lógicos e Relacionais)
    {
        id: 6,
        section: "2. Filtros e Operadores",
        title: "2.1. Operadores Relacionais",
        difficulty: "fácil",
        description: "Encontre o nome e a carga horária de todos os cursos que possuem carga horária maior que 40 horas.",
        tip: "Use a cláusula WHERE carga_horaria > 40.",
        initialQuery: "SELECT nome_curso, carga_horaria FROM Cursos WHERE carga_horaria > 40;",
        referenceQuery: "SELECT nome_curso, carga_horaria FROM Cursos WHERE carga_horaria > 40;",
        tables: ["Cursos"],
        validationType: "query"
    },
    {
        id: 7,
        section: "2. Filtros e Operadores",
        title: "2.2. Operadores Lógicos",
        difficulty: "fácil",
        description: "Encontre os nomes dos alunos que estão com status 'Ativo' E que moram na cidade de 'Lages'.",
        tip: "Use o operador lógico AND para unir as duas condições na cláusula WHERE.",
        initialQuery: "SELECT nome FROM Alunos WHERE status = 'Ativo' AND cidade = 'Lages';",
        referenceQuery: "SELECT nome FROM Alunos WHERE status = 'Ativo' AND cidade = 'Lages';",
        tables: ["Alunos"],
        validationType: "query"
    },
    {
        id: 8,
        section: "2. Filtros e Operadores",
        title: "2.3. Limitação de Resultados",
        difficulty: "fácil",
        description: "Traga apenas os 5 primeiros alunos recém-cadastrados (com os maiores IDs de aluno).",
        tip: "Ordene por id_aluno DESC e limite os resultados usando LIMIT 5.",
        initialQuery: "SELECT nome FROM Alunos ORDER BY id_aluno DESC LIMIT 5;",
        referenceQuery: "SELECT nome FROM Alunos ORDER BY id_aluno DESC LIMIT 5;",
        tables: ["Alunos"],
        validationType: "query"
    },

    // 3. Buscas Avançadas de Padrões e Intervalos (LIKE, IN, BETWEEN)
    {
        id: 9,
        section: "3. Buscas Avançadas",
        title: "3.1. LIKE (%a%)",
        difficulty: "médio",
        description: "Selecione o nome dos alunos que possuem a letra 'a' em qualquer parte do nome.",
        tip: "Use WHERE nome LIKE '%a%' para busca de padrões no meio da string.",
        initialQuery: "SELECT nome FROM Alunos WHERE nome LIKE '%a%';",
        referenceQuery: "SELECT nome FROM Alunos WHERE nome LIKE '%a%';",
        tables: ["Alunos"],
        validationType: "query"
    },
    {
        id: 10,
        section: "3. Buscas Avançadas",
        title: "3.2. LIKE (%a)",
        difficulty: "médio",
        description: "Selecione o nome dos alunos cujo nome termina com a letra 'a'.",
        tip: "Use LIKE '%a' para encontrar registros cujo caractere final é a.",
        initialQuery: "SELECT nome FROM Alunos WHERE nome LIKE '%a';",
        referenceQuery: "SELECT nome FROM Alunos WHERE nome LIKE '%a';",
        tables: ["Alunos"],
        validationType: "query"
    },
    {
        id: 11,
        section: "3. Buscas Avançadas",
        title: "3.3. LIKE (a%)",
        difficulty: "médio",
        description: "Selecione o nome dos alunos cujo nome começa com a letra 'A'.",
        tip: "Use LIKE 'A%' para encontrar registros que começam com a letra A.",
        initialQuery: "SELECT nome FROM Alunos WHERE nome LIKE 'A%';",
        referenceQuery: "SELECT nome FROM Alunos WHERE nome LIKE 'A%';",
        tables: ["Alunos"],
        validationType: "query"
    },
    {
        id: 12,
        section: "3. Buscas Avançadas",
        title: "3.4. Operador IN",
        difficulty: "médio",
        description: "Filtre a tabela de matrículas para retornar o id do aluno e o id do curso apenas para matrículas nos cursos de IDs 1, 3 e 5.",
        tip: "Use WHERE id_curso IN (1, 3, 5).",
        initialQuery: "SELECT id_aluno, id_curso FROM Matriculas WHERE id_curso IN (1, 3, 5);",
        referenceQuery: "SELECT id_aluno, id_curso FROM Matriculas WHERE id_curso IN (1, 3, 5);",
        tables: ["Matriculas"],
        validationType: "query"
    },
    {
        id: 13,
        section: "3. Buscas Avançadas",
        title: "3.5. Operador BETWEEN",
        difficulty: "médio",
        description: "Busque o id da matrícula e a data de matrícula para os registros que ocorreram dentro do primeiro semestre de 2026 (entre '2026-01-01' e '2026-06-30').",
        tip: "Use data_matricula BETWEEN '2026-01-01' AND '2026-06-30'.",
        initialQuery: "SELECT id_matricula, data_matricula FROM Matriculas WHERE data_matricula BETWEEN '2026-01-01' AND '2026-06-30';",
        referenceQuery: "SELECT id_matricula, data_matricula FROM Matriculas WHERE data_matricula BETWEEN '2026-01-01' AND '2026-06-30';",
        tables: ["Matriculas"],
        validationType: "query"
    },

    // 4. Relatórios e Relacionamentos (AGREGAÇÃO e JOIN)
    {
        id: 14,
        section: "4. Relatórios e Relacionamentos",
        title: "4.1. Funções de Agregação",
        difficulty: "médio",
        description: "Conte o total de alunos ativos e exiba o resultado renomeando a coluna resultante para <code>total_alunos</code>.",
        tip: "Use SELECT COUNT(*) AS total_alunos combinando com a condição status = 'Ativo'.",
        initialQuery: "SELECT COUNT(*) AS total_alunos FROM Alunos WHERE status = 'Ativo';",
        referenceQuery: "SELECT COUNT(*) AS total_alunos FROM Alunos WHERE status = 'Ativo';",
        tables: ["Alunos"],
        validationType: "query"
    },
    {
        id: 15,
        section: "4. Relatórios e Relacionamentos",
        title: "4.2. INNER JOIN",
        difficulty: "médio",
        description: "Cruze as tabelas para mostrar o nome do aluno (tabela Alunos) e o nome do curso (tabela Cursos) em que ele está matriculado.",
        tip: "Use INNER JOIN relacionando Alunos com Matriculas (id_aluno) e Matriculas com Cursos (id_curso).",
        initialQuery: "SELECT A.nome, C.nome_curso \nFROM Alunos A\nINNER JOIN Matriculas M ON A.id_aluno = M.id_aluno\nINNER JOIN Cursos C ON M.id_curso = C.id_curso;",
        referenceQuery: "SELECT A.nome, C.nome_curso FROM Alunos A INNER JOIN Matriculas M ON A.id_aluno = M.id_aluno INNER JOIN Cursos C ON M.id_curso = C.id_curso;",
        tables: ["Alunos", "Matriculas", "Cursos"],
        validationType: "query"
    },

    // 5. Estruturas Avançadas de Banco de Dados
    {
        id: 16,
        section: "5. Estruturas Avançadas",
        title: "5.1. Criar uma VIEW",
        difficulty: "difícil",
        description: "Crie uma VIEW chamada <code>vw_alunos_cursos</code> que exiba o nome do aluno (da tabela Alunos), o nome do curso (da tabela Cursos) e a data da matrícula (da tabela Matriculas).",
        tip: "Utilize CREATE VIEW vw_alunos_cursos AS seguido pelo SELECT que faz o JOIN entre as tabelas.",
        initialQuery: "CREATE VIEW vw_alunos_cursos AS\nSELECT A.nome, C.nome_curso, M.data_matricula\nFROM Alunos A\nJOIN Matriculas M ON A.id_aluno = M.id_aluno\nJOIN Cursos C ON M.id_curso = C.id_curso;",
        referenceQuery: "CREATE VIEW vw_alunos_cursos AS SELECT A.nome, C.nome_curso, M.data_matricula FROM Alunos A JOIN Matriculas M ON A.id_aluno = M.id_aluno JOIN Cursos C ON M.id_curso = C.id_curso;",
        tables: ["Alunos", "Matriculas", "Cursos"],
        validationType: "schema"
    },
    {
        id: 17,
        section: "5. Estruturas Avançadas",
        title: "5.2. STORED PROCEDURE",
        difficulty: "difícil",
        description: "Crie uma Stored Procedure chamada <code>sp_RealizarMatricula</code> que recebe p_id_aluno e p_id_curso e insere o registro correspondente na tabela Matriculas.<br><em>Nota: Devido a restrições do SQLite do navegador, validaremos conceitualmente sua query.</em>",
        tip: "Use DELIMITER //, defina a procedure com IN p_id_aluno INT, IN p_id_curso INT, e insira na tabela Matriculas usando CURDATE() para a data.",
        initialQuery: "DELIMITER //\nCREATE PROCEDURE sp_RealizarMatricula(IN p_id_aluno INT, IN p_id_curso INT)\nBEGIN\n    INSERT INTO Matriculas (id_aluno, id_curso, data_matricula)\n    VALUES (p_id_aluno, p_id_curso, CURDATE());\nEND //\nDELIMITER ;",
        referenceQuery: "DELIMITER //\nCREATE PROCEDURE sp_RealizarMatricula(IN p_id_aluno INT, IN p_id_curso INT)\nBEGIN\n    INSERT INTO Matriculas (id_aluno, id_curso, data_matricula)\n    VALUES (p_id_aluno, p_id_curso, CURDATE());\nEND //\nDELIMITER ;",
        tables: ["Matriculas"],
        validationType: "text"
    },
    {
        id: 18,
        section: "5. Estruturas Avançadas",
        title: "5.3. Criar um TRIGGER",
        difficulty: "difícil",
        description: "Crie um Trigger chamado <code>trg_aluno_deletado</code> que insere um registro na tabela <code>Log_Auditoria</code> com a ação 'ALUNO EXCLUIDO', o nome do aluno afetado (OLD.nome) e a data atual (NOW()) após a exclusão de um aluno na tabela <code>Alunos</code>.",
        tip: "Escreva CREATE TRIGGER trg_aluno_deletado AFTER DELETE ON Alunos FOR EACH ROW BEGIN INSERT INTO Log_Auditoria (acao, usuario_afetado, data_acao) VALUES ('ALUNO EXCLUIDO', OLD.nome, NOW()); END;",
        initialQuery: "CREATE TRIGGER trg_aluno_deletado\nAFTER DELETE ON Alunos\nFOR EACH ROW\nINSERT INTO Log_Auditoria (acao, usuario_afetado, data_acao)\nVALUES ('ALUNO EXCLUIDO', OLD.nome, NOW());",
        referenceQuery: "CREATE TRIGGER trg_aluno_deletado AFTER DELETE ON Alunos FOR EACH ROW INSERT INTO Log_Auditoria (acao, usuario_afetado, data_acao) VALUES ('ALUNO EXCLUIDO', OLD.nome, NOW());",
        tables: ["Alunos", "Log_Auditoria"],
        validationType: "schema"
    },
    {
        id: 19,
        section: "5. Estruturas Avançadas",
        title: "5.4. Criar um INDEX",
        difficulty: "difícil",
        description: "Melhore a performance de buscas pelo CPF do aluno criando um índice chamado <code>idx_cpf_aluno</code> na tabela de <code>Alunos</code> (na coluna cpf).",
        tip: "Use a sintaxe: CREATE INDEX idx_cpf_aluno ON Alunos(cpf);",
        initialQuery: "CREATE INDEX idx_cpf_aluno ON Alunos(cpf);",
        referenceQuery: "CREATE INDEX idx_cpf_aluno ON Alunos(cpf);",
        tables: ["Alunos"],
        validationType: "schema"
    },

    // 6. Controle de Acesso e Segurança (DCL)
    {
        id: 20,
        section: "6. Controle de Segurança",
        title: "6.1. Comando GRANT",
        difficulty: "difícil",
        description: "Conceda permissão de leitura (SELECT) e inserção (INSERT) na tabela de <code>Matriculas</code> para o usuário <code>'usuario_secretaria'@'localhost'</code>.<br><em>Nota: Validaremos conceitualmente sua query.</em>",
        tip: "Use a sintaxe: GRANT SELECT, INSERT ON Matriculas TO 'usuario_secretaria'@'localhost';",
        initialQuery: "GRANT SELECT, INSERT ON Matriculas TO 'usuario_secretaria'@'localhost';",
        referenceQuery: "GRANT SELECT, INSERT ON Matriculas TO 'usuario_secretaria'@'localhost';",
        tables: ["Matriculas"],
        validationType: "text"
    },
    {
        id: 21,
        section: "6. Controle de Segurança",
        title: "6.2. Comando REVOKE",
        difficulty: "difícil",
        description: "Remova a permissão de exclusão (DELETE) na tabela de <code>Matriculas</code> do usuário <code>'usuario_secretaria'@'localhost'</code>.<br><em>Nota: Validaremos conceitualmente sua query.</em>",
        tip: "Use a sintaxe: REVOKE DELETE ON Matriculas FROM 'usuario_secretaria'@'localhost';",
        initialQuery: "REVOKE DELETE ON Matriculas FROM 'usuario_secretaria'@'localhost';",
        referenceQuery: "REVOKE DELETE ON Matriculas FROM 'usuario_secretaria'@'localhost';",
        tables: ["Matriculas"],
        validationType: "text"
    }
];

// 2. Metadados do Esquema de Dados
const schemas = {
    Alunos: [
        { name: "id_aluno", type: "INTEGER (PK)" },
        { name: "nome", type: "TEXT" },
        { name: "email", type: "TEXT" },
        { name: "data_nascimento", type: "TEXT (YYYY-MM-DD)" },
        { name: "cidade", type: "TEXT" },
        { name: "status", type: "TEXT" },
        { name: "cpf", type: "TEXT" }
    ],
    Cursos: [
        { name: "id_curso", type: "INTEGER (PK)" },
        { name: "nome_curso", type: "TEXT" },
        { name: "carga_horaria", type: "INTEGER" }
    ],
    Matriculas: [
        { name: "id_matricula", type: "INTEGER (PK)" },
        { name: "id_aluno", type: "INTEGER (FK)" },
        { name: "id_curso", type: "INTEGER (FK)" },
        { name: "data_matricula", type: "TEXT (YYYY-MM-DD)" }
    ],
    Log_Auditoria: [
        { name: "id_log", type: "INTEGER (PK)" },
        { name: "acao", type: "TEXT" },
        { name: "usuario_afetado", type: "TEXT" },
        { name: "data_acao", type: "TEXT" }
    ]
};

// 3. Estado Global da Aplicação
let db = null;
let activeQuestionId = 1;
let solvedQuestions = new Set();

// Elementos do DOM
const sqlEditor = document.getElementById("sql-editor");
const lineNumbers = document.getElementById("line-numbers");
const questionListContainer = document.getElementById("question-list");
const exerciseDifficulty = document.getElementById("exercise-difficulty");
const exerciseTitle = document.getElementById("exercise-title");
const exerciseDescription = document.getElementById("exercise-description");
const exerciseTip = document.getElementById("exercise-tip");
const tipContainer = document.getElementById("tip-container");
const btnShowTip = document.getElementById("btn-show-tip");
const btnRun = document.getElementById("btn-run");
const btnSubmit = document.getElementById("btn-submit");
const btnResetDb = document.getElementById("btn-reset-db");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const schemaTabs = document.getElementById("schema-tabs");
const schemaTableFields = document.getElementById("schema-table-fields");
const schemaTableSelect = document.getElementById("schema-table-select");
const schemaDataTable = document.getElementById("schema-data-table");
const successModal = document.getElementById("success-modal");
const btnModalClose = document.getElementById("btn-modal-close");

// Abas de Resultados
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");
const userResultPlaceholder = document.getElementById("user-result-placeholder");
const userResultTableContainer = document.getElementById("user-result-table-container");
const userResultTable = document.getElementById("user-result-table");
const expectedResultTableContainer = document.getElementById("expected-result-table-container");
const expectedResultTable = document.getElementById("expected-result-table");

// 4. Inicialização do Banco de Dados SQLite em Memória
async function initDatabase() {
    try {
        const config = {
            locateFile: filename => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${filename}`
        };
        const SQL = await initSqlJs(config);
        db = new SQL.Database();
        
        // Criar tabelas e popular dados
        createSchema();
        seedData();
        
        console.log("Banco de dados SQLite inicializado com sucesso em memória!");
        
        // Carrega o estado salvo ou inicializa do zero
        loadProgress();
        renderQuestionList();
        loadQuestion(activeQuestionId);
        updateSchemaViewer();
        updateSchemaDataTab();
    } catch (err) {
        console.error("Falha ao inicializar o banco de dados:", err);
        alert("Erro ao carregar o motor de banco de dados SQL. Por favor, recarregue a página.");
    }
}

function createSchema() {
    db.run(`
        CREATE TABLE Alunos (
            id_aluno INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            data_nascimento TEXT NOT NULL,
            cidade TEXT NOT NULL,
            status TEXT NOT NULL,
            cpf TEXT NOT NULL
        );
    `);
    
    db.run(`
        CREATE TABLE Cursos (
            id_curso INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_curso TEXT NOT NULL,
            carga_horaria INTEGER NOT NULL
        );
    `);

    db.run(`
        CREATE TABLE Matriculas (
            id_matricula INTEGER PRIMARY KEY AUTOINCREMENT,
            id_aluno INTEGER NOT NULL,
            id_curso INTEGER NOT NULL,
            data_matricula TEXT NOT NULL,
            FOREIGN KEY (id_aluno) REFERENCES Alunos(id_aluno),
            FOREIGN KEY (id_curso) REFERENCES Cursos(id_curso)
        );
    `);

    db.run(`
        CREATE TABLE Log_Auditoria (
            id_log INTEGER PRIMARY KEY AUTOINCREMENT,
            acao TEXT NOT NULL,
            usuario_afetado TEXT NOT NULL,
            data_acao TEXT NOT NULL
        );
    `);
}

function seedData() {
    // Seed Alunos
    db.run(`
        INSERT INTO Alunos (id_aluno, nome, email, data_nascimento, cidade, status, cpf) VALUES
        (1, 'Lucas Andrade', 'lucas@email.com', '1998-05-15', 'Lages', 'Ativo', '123.456.789-00'),
        (2, 'Mariana Costa', 'mariana@email.com', '2001-09-20', 'Florianópolis', 'Ativo', '987.654.321-11'),
        (3, 'Ana Souza', 'ana@email.com', '1995-02-10', 'Lages', 'Inativo', '456.123.789-22'),
        (4, 'Carlos Oliveira', 'carlos@email.com', '2003-11-30', 'Lages', 'Ativo', '321.654.987-33'),
        (5, 'Beatriz Santos', 'beatriz@email.com', '2000-07-25', 'Blumenau', 'Ativo', '789.456.123-44'),
        (6, 'Juliana Lima', 'juliana@email.com', '1999-12-05', 'Joinville', 'Ativo', '159.753.486-55'),
        (7, 'Pedro Rocha', 'pedro@email.com', '2002-04-18', 'Lages', 'Ativo', '753.159.846-66');
    `);
    
    // Seed Cursos
    db.run(`
        INSERT INTO Cursos (id_curso, nome_curso, carga_horaria) VALUES
        (1, 'Banco de Dados SQL', 60),
        (2, 'Introdução ao HTML e CSS', 30),
        (3, 'Lógica de Programação', 40),
        (4, 'Desenvolvimento Web com JavaScript', 80),
        (5, 'Algoritmos Estruturados', 45);
    `);

    // Seed Matriculas
    db.run(`
        INSERT INTO Matriculas (id_matricula, id_aluno, id_curso, data_matricula) VALUES
        (1, 1, 1, '2026-02-15'),
        (2, 2, 4, '2026-03-01'),
        (3, 3, 1, '2026-01-10'),
        (4, 4, 3, '2026-02-20'),
        (5, 5, 5, '2026-04-05'),
        (6, 1, 4, '2026-05-10'),
        (7, 6, 2, '2026-01-15'),
        (8, 7, 3, '2026-06-01');
    `);
}

// 5. Controle de Exercícios e Interface
function loadQuestion(id) {
    activeQuestionId = id;
    const question = questions.find(q => q.id === id);
    if (!question) return;

    // Atualizar UI da Questão
    exerciseDifficulty.textContent = question.difficulty;
    exerciseDifficulty.className = `exercise-difficulty ${question.difficulty.toLowerCase()}`;
    exerciseTitle.textContent = question.title;
    exerciseDescription.innerHTML = question.description;
    exerciseTip.textContent = question.tip;

    // Esconder dica por padrão ao mudar de questão
    tipContainer.style.display = "none";
    btnShowTip.textContent = "Ver Dica";

    // Atualizar Editor com código inicial ou código salvo
    const savedQuery = localStorage.getItem(`sql_save_q_${id}`);
    sqlEditor.value = savedQuery ? savedQuery : question.initialQuery;
    updateLineNumbers();

    // Atualizar abas
    resetResultsArea();

    // Atualizar classes ativas na lista de questões
    const listItems = questionListContainer.querySelectorAll(".quest-card");
    listItems.forEach(item => {
        const qId = parseInt(item.getAttribute("data-id"));
        if (qId === id) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    // Atualizar esquema recomendado
    updateSchemaViewer(question.tables);
    
    // Atualizar tabela de gabarito esperado na segunda aba - Apenas se for uma consulta tabular
    if (question.validationType === 'query') {
        renderExpectedTable(question.referenceQuery);
    } else {
        expectedResultTableContainer.style.display = "none";
        expectedResultTable.innerHTML = "<tr><td>Este exercício realiza alterações de estrutura/segurança no banco. Sem resultado tabular esperado.</td></tr>";
    }
}

function updateLineNumbers() {
    const lines = sqlEditor.value.split("\n").length;
    lineNumbers.innerHTML = Array(lines).fill(0).map((_, i) => `<span>${i + 1}</span>`).join("");
}

function renderQuestionList() {
    questionListContainer.innerHTML = "";
    
    // Agrupar questões por seção para visualização limpa e estruturada
    const sections = {};
    questions.forEach(q => {
        if (!sections[q.section]) {
            sections[q.section] = [];
        }
        sections[q.section].push(q);
    });

    for (const [sectionName, sectionQuests] of Object.entries(sections)) {
        // Cabeçalho da Seção
        const sectionHeader = document.createElement("div");
        sectionHeader.className = "sidebar-section-title";
        sectionHeader.textContent = sectionName;
        questionListContainer.appendChild(sectionHeader);

        sectionQuests.forEach(q => {
            const isSolved = solvedQuestions.has(q.id);
            const card = document.createElement("div");
            card.className = `quest-card ${isSolved ? "solved" : ""} ${q.id === activeQuestionId ? "active" : ""}`;
            card.setAttribute("data-id", q.id);
            
            card.innerHTML = `
                <div class="quest-info">
                    <span class="quest-title">${q.title}</span>
                </div>
                <div class="quest-status">
                    ${isSolved ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : ""}
                </div>
            `;
            
            card.addEventListener("click", () => {
                saveCurrentDraft();
                loadQuestion(q.id);
            });

            questionListContainer.appendChild(card);
        });
    }
}

function saveCurrentDraft() {
    if (activeQuestionId) {
        localStorage.setItem(`sql_save_q_${activeQuestionId}`, sqlEditor.value);
    }
}

// 6. Visualizador do Esquema do Banco
function updateSchemaViewer(visibleTables = ["Alunos", "Cursos", "Matriculas", "Log_Auditoria"]) {
    schemaTabs.innerHTML = "";
    
    visibleTables.forEach((tableName, index) => {
        const tabBtn = document.createElement("button");
        tabBtn.className = `schema-tab-btn ${index === 0 ? "active" : ""}`;
        tabBtn.textContent = tableName;
        tabBtn.setAttribute("data-table", tableName);
        
        tabBtn.addEventListener("click", () => {
            const btns = schemaTabs.querySelectorAll(".schema-tab-btn");
            btns.forEach(b => b.classList.remove("active"));
            tabBtn.classList.add("active");
            renderSchemaFields(tableName);
        });
        
        schemaTabs.appendChild(tabBtn);
    });

    if (visibleTables.length > 0) {
        renderSchemaFields(visibleTables[0]);
    } else {
        schemaTableFields.innerHTML = `<div class="text-muted">Nenhum esquema aplicável.</div>`;
    }
}

function renderSchemaFields(tableName) {
    schemaTableFields.innerHTML = "";
    const fields = schemas[tableName];
    if (!fields) return;

    fields.forEach(field => {
        const div = document.createElement("div");
        div.className = "schema-field";
        div.innerHTML = `
            <span class="field-name">${field.name}</span>
            <span class="field-type">${field.type}</span>
        `;
        schemaTableFields.appendChild(div);
    });
}

// Visualizador de Dados em Massa
function updateSchemaDataTab() {
    const tableName = schemaTableSelect.value;
    try {
        const result = db.exec(`SELECT * FROM ${tableName} LIMIT 15;`);
        const container = schemaDataTable;
        container.innerHTML = "";

        if (result.length === 0) {
            container.innerHTML = "<tr><td>Tabela vazia ou sem dados registrados.</td></tr>";
            return;
        }

        const cols = result[0].columns;
        const vals = result[0].values;

        // Render header
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        cols.forEach(col => {
            const th = document.createElement("th");
            th.textContent = col;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        container.appendChild(thead);

        // Render rows
        const tbody = document.createElement("tbody");
        vals.forEach(row => {
            const tr = document.createElement("tr");
            row.forEach(val => {
                const td = document.createElement("td");
                td.textContent = val === null ? "NULL" : (typeof val === 'number' && !Number.isInteger(val) ? val.toFixed(2) : val);
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        container.appendChild(tbody);
    } catch (e) {
        console.error("Erro ao carregar dados brutos:", e);
    }
}

// 7. Renderização e Execução SQL
function resetResultsArea() {
    // Reset aba do usuário
    userResultPlaceholder.style.display = "flex";
    userResultPlaceholder.innerHTML = `
        <p>Execute a consulta para visualizar os resultados aqui.</p>
    `;
    userResultTableContainer.style.display = "none";
    userResultTable.innerHTML = "";

    // Mudar de volta para a primeira aba
    switchTab("tab-user-result");
}

function renderTable(domTable, columns, values) {
    domTable.innerHTML = "";

    // Cabeçalho
    const thead = document.createElement("thead");
    const trHead = document.createElement("tr");
    columns.forEach(col => {
        const th = document.createElement("th");
        th.textContent = col;
        trHead.appendChild(th);
    });
    thead.appendChild(trHead);
    domTable.appendChild(thead);

    // Corpo
    const tbody = document.createElement("tbody");
    values.forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(val => {
            const td = document.createElement("td");
            td.textContent = val === null ? "NULL" : (typeof val === 'number' && !Number.isInteger(val) ? val.toFixed(2) : val);
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
    domTable.appendChild(tbody);
}

function renderExpectedTable(query) {
    try {
        const result = db.exec(query);
        if (result.length > 0) {
            expectedResultTableContainer.style.display = "block";
            renderTable(expectedResultTable, result[0].columns, result[0].values);
        } else {
            expectedResultTableContainer.style.display = "none";
            expectedResultTable.innerHTML = "<tr><td>Sem dados retornados no gabarito.</td></tr>";
        }
    } catch (e) {
        console.error("Erro ao gerar gabarito:", e);
    }
}

function runUserSQL(showSuccessTab = true) {
    const userQuery = sqlEditor.value.trim();
    if (!userQuery) {
        showErrorFeedback("O editor está vazio! Escreva uma query SQL.");
        return null;
    }

    const normalizedQuery = userQuery.replace(/\s+/g, ' ').toLowerCase();

    // Se o usuário tentar rodar comandos de DCL ou Procedure diretamente no SQLite, barramos amigavelmente
    if (normalizedQuery.includes("create procedure") || normalizedQuery.includes("delimiter") || normalizedQuery.includes("grant ") || normalizedQuery.includes("revoke ")) {
        userResultTableContainer.style.display = "none";
        userResultPlaceholder.style.display = "flex";
        showErrorFeedback("O SQLite local não aceita este comando diretamente. Clique em 'Validar Resposta' para realizar a validação conceitual.");
        if (showSuccessTab) switchTab("tab-user-result");
        return null;
    }

    // Para evitar erros de "already exists" na execução múltipla de DDLs
    if (normalizedQuery.includes("create view vw_alunos_cursos")) {
        try { db.run("DROP VIEW IF EXISTS vw_alunos_cursos;"); } catch(e){}
    } else if (normalizedQuery.includes("create trigger trg_aluno_deletado")) {
        try { db.run("DROP TRIGGER IF EXISTS trg_aluno_deletado;"); } catch(e){}
    } else if (normalizedQuery.includes("create index idx_cpf_aluno")) {
        try { db.run("DROP INDEX IF EXISTS idx_cpf_aluno;"); } catch(e){}
    }

    try {
        const result = db.exec(userQuery);
        userResultPlaceholder.style.display = "none";
        userResultTableContainer.style.display = "block";

        if (result.length === 0) {
            userResultTable.innerHTML = "<thead><tr><th>Mensagem</th></tr></thead><tbody><tr><td>Comando executado com sucesso, mas nenhum resultado tabular foi retornado.</td></tr></tbody>";
            if (showSuccessTab) switchTab("tab-user-result");
            return [];
        }

        renderTable(userResultTable, result[0].columns, result[0].values);
        if (showSuccessTab) switchTab("tab-user-result");
        return result;
    } catch (err) {
        userResultTableContainer.style.display = "none";
        userResultPlaceholder.style.display = "flex";
        showErrorFeedback(err.message);
        if (showSuccessTab) switchTab("tab-user-result");
        return null;
    }
}

function showErrorFeedback(msg) {
    userResultPlaceholder.innerHTML = `
        <div class="feedback-box error">
            <div>
                <strong>Erro de Execução SQL:</strong><br>
                <span>${msg}</span>
            </div>
        </div>
    `;
}

// 8. Validador Customizado para SQLite e Atividades do Roteiro
function validateQuestion(id, userQuery, db) {
    const question = questions.find(q => q.id === id);
    if (!question) return { valid: false, message: "Questão não encontrada." };

    const normalizedUser = userQuery.replace(/\s+/g, ' ').trim().toLowerCase();
    const normalizedRef = question.referenceQuery.replace(/\s+/g, ' ').trim().toLowerCase();

    // 8.1. Validação Textual (Para comandos não nativos do SQLite: Procedure, DCL)
    if (question.validationType === 'text') {
        const cleanUser = normalizedUser.replace(/;/g, '').replace(/['"`]/g, '');
        
        if (id === 17) { // sp_RealizarMatricula
            const hasProc = cleanUser.includes("create procedure sp_realizarmatricula") || cleanUser.includes("create procedure `sp_realizarmatricula`") || cleanUser.includes("sp_realizarmatricula(in p_id_aluno int, in p_id_curso int)");
            const hasInsert = cleanUser.includes("insert into matriculas") && cleanUser.includes("id_aluno") && cleanUser.includes("id_curso");
            const hasValues = cleanUser.includes("values") && cleanUser.includes("p_id_aluno") && cleanUser.includes("p_id_curso") && (cleanUser.includes("curdate()") || cleanUser.includes("curdate") || cleanUser.includes("now()") || cleanUser.includes("date("));
            
            if (hasProc && hasInsert && hasValues) {
                return { valid: true };
            }
            return { 
                valid: false, 
                message: "A procedure precisa declarar a assinatura `sp_RealizarMatricula(IN p_id_aluno INT, IN p_id_curso INT)` e realizar o `INSERT INTO Matriculas` contendo as colunas e os parâmetros correspondentes (como CURDATE())." 
            };
        }
        
        if (id === 20) { // GRANT
            const hasGrant = cleanUser.includes("grant select, insert") || cleanUser.includes("grant select,insert") || (cleanUser.includes("grant select") && cleanUser.includes("insert"));
            const hasOn = cleanUser.includes("on matriculas");
            const hasTo = cleanUser.includes("to usuario_secretaria@localhost") || cleanUser.includes("to 'usuario_secretaria'@'localhost'") || cleanUser.includes("to `usuario_secretaria`@`localhost`") || cleanUser.includes("to usuario_secretaria");
            
            if (hasGrant && hasOn && hasTo) {
                return { valid: true };
            }
            return { 
                valid: false, 
                message: "Certifique-se de usar a sintaxe `GRANT SELECT, INSERT ON Matriculas TO 'usuario_secretaria'@'localhost';`" 
            };
        }
        
        if (id === 21) { // REVOKE
            const hasRevoke = cleanUser.includes("revoke delete");
            const hasOn = cleanUser.includes("on matriculas");
            const hasFrom = cleanUser.includes("from usuario_secretaria@localhost") || cleanUser.includes("from 'usuario_secretaria'@'localhost'") || cleanUser.includes("from `usuario_secretaria`@`localhost`") || cleanUser.includes("from usuario_secretaria");
            
            if (hasRevoke && hasOn && hasFrom) {
                return { valid: true };
            }
            return { 
                valid: false, 
                message: "Certifique-se de usar a sintaxe `REVOKE DELETE ON Matriculas FROM 'usuario_secretaria'@'localhost';`" 
            };
        }
    }

    // 8.2. Validação do Esquema Físico (CREATE VIEW, TRIGGER, INDEX)
    if (question.validationType === 'schema') {
        try {
            if (id === 16) { // CREATE VIEW vw_alunos_cursos
                db.run("DROP VIEW IF EXISTS vw_alunos_cursos;");
                db.run(userQuery);
                
                const userRes = db.exec("SELECT * FROM vw_alunos_cursos;");
                const refRes = db.exec("SELECT A.nome, C.nome_curso, M.data_matricula FROM Alunos A JOIN Matriculas M ON A.id_aluno = M.id_aluno JOIN Cursos C ON M.id_curso = C.id_curso;");
                return compareResults(userRes, refRes);
            }
            
            if (id === 18) { // CREATE TRIGGER trg_aluno_deletado
                db.run("DROP TRIGGER IF EXISTS trg_aluno_deletado;");
                db.run("DROP TABLE IF EXISTS Log_Auditoria;");
                db.run(`
                    CREATE TABLE Log_Auditoria (
                        id_log INTEGER PRIMARY KEY AUTOINCREMENT,
                        acao TEXT NOT NULL,
                        usuario_afetado TEXT NOT NULL,
                        data_acao TEXT NOT NULL
                    );
                `);
                
                // Mapear MySQL NOW() para SQLite datetime('now') para poder executar sem erros
                let sqliteTriggerQuery = userQuery.replace(/now\(\)/ig, "datetime('now')");
                db.run(sqliteTriggerQuery);
                
                // Insere Ana Souza para exclusão se necessário
                const checkAluno = db.exec("SELECT nome FROM Alunos WHERE id_aluno = 3;");
                if (checkAluno.length === 0 || checkAluno[0].values.length === 0) {
                    db.run("INSERT INTO Alunos (id_aluno, nome, email, data_nascimento, cidade, status, cpf) VALUES (3, 'Ana Souza', 'ana@email.com', '1995-02-10', 'Lages', 'Inativo', '456.123.789-22');");
                }
                
                db.run("DELETE FROM Alunos WHERE id_aluno = 3;");
                
                const logs = db.exec("SELECT acao, usuario_afetado FROM Log_Auditoria;");
                if (logs.length > 0 && logs[0].values.length > 0) {
                    const row = logs[0].values[0];
                    if (row[0].toUpperCase() === 'ALUNO EXCLUIDO' && row[1] === 'Ana Souza') {
                        return { valid: true };
                    }
                }
                return { 
                    valid: false, 
                    message: "O trigger não inseriu o log correto em Log_Auditoria com a ação 'ALUNO EXCLUIDO' e nome correto do aluno após a deleção." 
                };
            }
            
            if (id === 19) { // CREATE INDEX idx_cpf_aluno
                db.run("DROP INDEX IF EXISTS idx_cpf_aluno;");
                db.run(userQuery);
                
                const indexCheck = db.exec("SELECT name FROM sqlite_master WHERE type='index' AND name='idx_cpf_aluno';");
                if (indexCheck.length > 0 && indexCheck[0].values.length > 0) {
                    return { valid: true };
                }
                return { 
                    valid: false, 
                    message: "Não foi encontrado o índice 'idx_cpf_aluno' criado na tabela Alunos." 
                };
            }
        } catch (e) {
            return { valid: false, message: "Erro de execução da instrução DDL/DML: " + e.message };
        }
    }

    // 8.3. Validação Padrão de Consultas SELECT
    try {
        const refResult = db.exec(question.referenceQuery);
        const userResult = db.exec(userQuery);
        return compareResults(userResult, refResult);
    } catch (e) {
        return { valid: false, message: e.message };
    }
}

// 9. Sistema de Validação da Resposta
function validateAnswer() {
    const userQuery = sqlEditor.value.trim();
    if (!userQuery) {
        showErrorFeedback("O editor está vazio! Escreva uma query SQL.");
        return;
    }

    const question = questions.find(q => q.id === activeQuestionId);
    if (!question) return;

    let userResult = null;
    
    // Apenas executamos runUserSQL no fluxo de validação se for consulta tabular (SELECT),
    // para evitar que DDLs criados repetidamente causem erro visual na aba de resultados.
    if (question.validationType === 'query') {
        userResult = runUserSQL(false);
    } else {
        userResultPlaceholder.style.display = "flex";
        userResultPlaceholder.innerHTML = `
            <div class="feedback-box info">
                <div>
                    <strong>Comando Estrutural:</strong><br>
                    <span>Esta query foi validada logicamente no banco de dados.</span>
                </div>
            </div>
        `;
        userResultTableContainer.style.display = "none";
    }

    try {
        const validation = validateQuestion(activeQuestionId, userQuery, db);

        if (validation.valid) {
            // Sucesso!
            solvedQuestions.add(activeQuestionId);
            saveProgress();
            
            userResultPlaceholder.style.display = "flex";
            userResultPlaceholder.innerHTML = `
                <div class="feedback-box success">
                    <div>
                        <strong>Resposta Correta! Excelente trabalho!</strong><br>
                        <span>Sua consulta retornou exatamente o conjunto de dados esperado.</span>
                    </div>
                </div>
            `;
            if (question.validationType === 'query' && userResult && userResult.length > 0) {
                userResultTableContainer.style.display = "block";
                userResultPlaceholder.parentNode.insertBefore(userResultPlaceholder, userResultTableContainer);
            } else {
                userResultTableContainer.style.display = "none";
            }

            renderQuestionList();
            updateProgressBar();

            if (solvedQuestions.size === questions.length) {
                setTimeout(() => {
                    successModal.style.display = "flex";
                }, 800);
            }
        } else {
            // Falhou
            userResultPlaceholder.style.display = "flex";
            userResultPlaceholder.innerHTML = `
                <div class="feedback-box error">
                    <div>
                        <strong>Quase lá! Mas o resultado é diferente do esperado:</strong><br>
                        <span>${validation.message}</span>
                    </div>
                </div>
            `;
            if (question.validationType === 'query' && userResult && userResult.length > 0) {
                userResultTableContainer.style.display = "block";
                userResultPlaceholder.parentNode.insertBefore(userResultPlaceholder, userResultTableContainer);
            } else {
                userResultTableContainer.style.display = "none";
            }
        }
        
        switchTab("tab-user-result");
    } catch (e) {
        console.error(e);
        showErrorFeedback("Erro ao validar consulta: " + e.message);
    }
}

function compareResults(userRes, refRes) {
    if (!userRes || userRes.length === 0) {
        return { valid: false, message: "Sua consulta não retornou resultados ou a estrutura é inválida." };
    }
    if (!refRes || refRes.length === 0) {
        return { valid: false, message: "Erro no gabarito de validação interna do sistema." };
    }

    const uData = userRes[0];
    const rData = refRes[0];

    // Verificar colunas
    if (uData.columns.length !== rData.columns.length) {
        return { 
            valid: false, 
            message: `Quantidade de colunas incorreta. Esperado: ${rData.columns.length}, Obtido: ${uData.columns.length}.`
        };
    }

    // Verificar linhas
    if (uData.values.length !== rData.values.length) {
        return {
            valid: false,
            message: `Número de linhas divergente. Esperado: ${rData.values.length}, Obtido: ${uData.values.length}.`
        };
    }

    // Verificar nomes das colunas (case-insensitive)
    for (let i = 0; i < rData.columns.length; i++) {
        if (uData.columns[i].toLowerCase() !== rData.columns[i].toLowerCase()) {
            return {
                valid: false,
                message: `Coluna na posição ${i+1} incorreta. Esperado: "${rData.columns[i]}", Obtido: "${uData.columns[i]}". Lembre-se do "AS".`
            };
        }
    }

    // Verificar dados
    for (let r = 0; r < rData.values.length; r++) {
        const uRow = uData.values[r];
        const rRow = rData.values[r];

        for (let c = 0; c < rData.columns.length; c++) {
            const uVal = uRow[c];
            const rVal = rRow[c];

            if (typeof uVal === 'number' && typeof rVal === 'number') {
                if (Math.abs(uVal - rVal) > 0.01) {
                    return {
                        valid: false,
                        message: `Divergência na linha ${r+1}, coluna "${rData.columns[c]}". Esperado: ${rVal.toFixed(2)}, Obtido: ${uVal.toFixed(2)}.`
                    };
                }
            } else {
                const uStr = uVal === null ? "null" : String(uVal).trim().toLowerCase();
                const rStr = rVal === null ? "null" : String(rVal).trim().toLowerCase();

                if (uStr !== rStr) {
                    return {
                        valid: false,
                        message: `Divergência na linha ${r+1}, coluna "${rData.columns[c]}". Esperado: "${rVal}", Obtido: "${uVal}".`
                    };
                }
            }
        }
    }

    return { valid: true };
}

// 10. Persistência de Progresso (Local Storage)
function saveProgress() {
    localStorage.setItem("sql_solved_list", JSON.stringify(Array.from(solvedQuestions)));
    localStorage.setItem("sql_active_id", activeQuestionId);
}

function loadProgress() {
    const savedSolved = localStorage.getItem("sql_solved_list");
    if (savedSolved) {
        const arr = JSON.parse(savedSolved);
        solvedQuestions = new Set(arr);
    }
    
    const savedActive = localStorage.getItem("sql_active_id");
    if (savedActive) {
        activeQuestionId = parseInt(savedActive);
    }
    
    updateProgressBar();
}

function updateProgressBar() {
    const total = questions.length;
    const completed = solvedQuestions.size;
    const percent = Math.round((completed / total) * 100);

    progressBar.style.width = `${percent}%`;
    progressText.textContent = `${completed}/${total} Concluído`;
}

function resetProgress() {
    if (confirm("Tem certeza que deseja reiniciar o seu progresso e limpar todos os rascunhos?")) {
        questions.forEach(q => {
            localStorage.removeItem(`sql_save_q_${q.id}`);
        });
        localStorage.removeItem("sql_solved_list");
        localStorage.removeItem("sql_active_id");
        
        solvedQuestions.clear();
        activeQuestionId = 1;
        
        db.run("DROP TABLE IF EXISTS Alunos;");
        db.run("DROP TABLE IF EXISTS Cursos;");
        db.run("DROP TABLE IF EXISTS Matriculas;");
        db.run("DROP TABLE IF EXISTS Log_Auditoria;");
        db.run("DROP VIEW IF EXISTS vw_alunos_cursos;");
        db.run("DROP TRIGGER IF EXISTS trg_aluno_deletado;");
        db.run("DROP INDEX IF EXISTS idx_cpf_aluno;");
        
        createSchema();
        seedData();
        
        loadQuestion(1);
        renderQuestionList();
        updateProgressBar();
        updateSchemaViewer();
        updateSchemaDataTab();
        
        alert("Progresso reiniciado com sucesso!");
    }
}

// 11. Utilitários de Interface (Abas e Eventos)
function switchTab(tabId) {
    tabBtns.forEach(btn => {
        if (btn.getAttribute("data-tab") === tabId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    tabPanes.forEach(pane => {
        if (pane.id === tabId) {
            pane.classList.add("active");
        } else {
            pane.classList.remove("active");
        }
    });
}

// Configuração dos Event Listeners
function setupEventListeners() {
    sqlEditor.addEventListener("input", () => {
        updateLineNumbers();
        saveCurrentDraft();
    });
    sqlEditor.addEventListener("scroll", () => {
        lineNumbers.scrollTop = sqlEditor.scrollTop;
    });

    // Mostrar Dica
    btnShowTip.addEventListener("click", () => {
        if (tipContainer.style.display === "none") {
            tipContainer.style.display = "block";
            btnShowTip.textContent = "Esconder Dica";
            tipContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            tipContainer.style.display = "none";
            btnShowTip.textContent = "Ver Dica";
        }
    });

    btnRun.addEventListener("click", () => runUserSQL(true));
    btnSubmit.addEventListener("click", validateAnswer);
    btnResetDb.addEventListener("click", resetProgress);

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            switchTab(btn.getAttribute("data-tab"));
        });
    });

    schemaTableSelect.addEventListener("change", updateSchemaDataTab);

    btnModalClose.addEventListener("click", () => {
        successModal.style.display = "none";
    });
}

// Executar após carregar o DOM
document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    initDatabase();
});
