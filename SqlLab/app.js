// SQL Lab - GROUP BY App Logic

// 1. Dados das Questões
const questions = [
    {
        id: 1,
        title: "1. Vendas por Categoria",
        difficulty: "fácil",
        description: `Escreva uma consulta SQL que calcule o valor total vendido para cada categoria de produto. 
        Retorne a coluna <code>categoria</code> (da tabela <code>produtos</code>) e o total vendido como <code>total_vendido</code> (soma da coluna <code>valor_total</code> da tabela <code>vendas</code>). 
        Você precisará juntar as tabelas <code>vendas</code> e <code>produtos</code> e agrupar pela categoria.`,
        tip: "Utilize INNER JOIN para relacionar as tabelas vendas e produtos através do id do produto. Use SUM(v.valor_total) e GROUP BY p.categoria.",
        initialQuery: "SELECT \n  \nFROM vendas v\nJOIN produtos p ON v.produto_id = p.id\nGROUP BY ",
        referenceQuery: "SELECT p.categoria, SUM(v.valor_total) AS total_vendido FROM vendas v JOIN produtos p ON v.produto_id = p.id GROUP BY p.categoria;",
        tables: ["vendas", "produtos"]
    },
    {
        id: 2,
        title: "2. Média Salarial por Setor",
        difficulty: "fácil",
        description: `A diretoria precisa de um relatório de RH. Escreva uma consulta que exiba o nome do <code>departamento</code>, a quantidade total de funcionários como <code>total_funcionarios</code> e a média salarial daquele departamento como <code>media_salarial</code>.<br>
        Agrupe o resultado por departamento.`,
        tip: "Use as funções agregadas COUNT(*) para contar os registros e AVG(salario) para obter a média salarial. Agrupe pela coluna departamento.",
        initialQuery: "SELECT \n  \nFROM funcionarios\nGROUP BY ",
        referenceQuery: "SELECT departamento, COUNT(*) AS total_funcionarios, AVG(salario) AS media_salarial FROM funcionarios GROUP BY departamento;",
        tables: ["funcionarios"]
    },
    {
        id: 3,
        title: "3. Departamentos Bem Pagos",
        difficulty: "médio",
        description: `Selecione apenas os departamentos da empresa que tenham uma média salarial dos funcionários superior a 5000.00.<br>
        Retorne o <code>departamento</code> e a sua <code>media_salarial</code> correspondente, ordenando o resultado de forma decrescente pela média salarial.`,
        tip: "Para filtrar resultados agrupados por GROUP BY, você deve utilizar a cláusula HAVING logo após o agrupamento. Ordene as médias de forma decrescente com ORDER BY [coluna] DESC.",
        initialQuery: "SELECT \n  \nFROM funcionarios\nGROUP BY \nHAVING \nORDER BY ",
        referenceQuery: "SELECT departamento, AVG(salario) AS media_salarial FROM funcionarios GROUP BY departamento HAVING AVG(salario) > 5000 ORDER BY media_salarial DESC;",
        tables: ["funcionarios"]
    },
    {
        id: 4,
        title: "4. Compras por Cliente e Produto",
        difficulty: "médio",
        description: `A equipe de marketing quer analisar o comportamento dos clientes. Escreva uma consulta que traga o <code>cliente_id</code>, o <code>produto_id</code> e a soma total das quantidades compradas acumuladas de cada produto por cliente, com o apelido de <code>total_quantidade</code>.<br>
        Ordene o resultado primeiro pelo <code>cliente_id</code> em ordem crescente e, em seguida, pela <code>total_quantidade</code> em ordem decrescente.`,
        tip: "Você pode agrupar por mais de uma coluna passando-as separadas por vírgula no GROUP BY. Ordene usando ORDER BY cliente_id ASC, total_quantidade DESC.",
        initialQuery: "SELECT \n  \nFROM vendas\nGROUP BY \nORDER BY ",
        referenceQuery: "SELECT cliente_id, produto_id, SUM(quantidade) AS total_quantidade FROM vendas GROUP BY cliente_id, produto_id ORDER BY cliente_id, total_quantidade DESC;",
        tables: ["vendas"]
    },
    {
        id: 5,
        title: "5. Filtro e Análise de Preços",
        difficulty: "difícil",
        description: `Faça um levantamento apenas dos produtos que tenham preço unitário superior a 10.00.<br>
        Agrupando por <code>categoria</code>, selecione o nome da categoria, o maior preço encontrado para aquela categoria como <code>preco_maximo</code> e o menor preço encontrado como <code>preco_minimo</code>.`,
        tip: "Use o WHERE antes do GROUP BY para filtrar apenas produtos com preço > 10.00. Em seguida, agrupe por categoria e use as funções MAX(preco) e MIN(preco).",
        initialQuery: "SELECT \n  \nFROM produtos\nWHERE \nGROUP BY ",
        referenceQuery: "SELECT categoria, MAX(preco) AS preco_maximo, MIN(preco) AS preco_minimo FROM produtos WHERE preco > 10.00 GROUP BY categoria;",
        tables: ["produtos"]
    }
];

// 2. Metadados do Esquema de Dados
const schemas = {
    vendas: [
        { name: "id", type: "INTEGER (PK)" },
        { name: "data_venda", type: "TEXT (YYYY-MM-DD)" },
        { name: "cliente_id", type: "INTEGER" },
        { name: "produto_id", type: "INTEGER (FK)" },
        { name: "quantidade", type: "INTEGER" },
        { name: "valor_total", type: "REAL" }
    ],
    produtos: [
        { name: "id", type: "INTEGER (PK)" },
        { name: "nome", type: "TEXT" },
        { name: "categoria", type: "TEXT" },
        { name: "preco", type: "REAL" }
    ],
    funcionarios: [
        { name: "id", type: "INTEGER (PK)" },
        { name: "nome", type: "TEXT" },
        { name: "departamento", type: "TEXT" },
        { name: "salario", type: "REAL" },
        { name: "cargo", type: "TEXT" }
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
        CREATE TABLE produtos (
            id INTEGER PRIMARY KEY,
            nome TEXT NOT NULL,
            categoria TEXT NOT NULL,
            preco REAL NOT NULL
        );
    `);
    
    db.run(`
        CREATE TABLE vendas (
            id INTEGER PRIMARY KEY,
            data_venda TEXT NOT NULL,
            cliente_id INTEGER NOT NULL,
            produto_id INTEGER NOT NULL,
            quantidade INTEGER NOT NULL,
            valor_total REAL NOT NULL,
            FOREIGN KEY (produto_id) REFERENCES produtos(id)
        );
    `);

    db.run(`
        CREATE TABLE funcionarios (
            id INTEGER PRIMARY KEY,
            nome TEXT NOT NULL,
            departamento TEXT NOT NULL,
            salario REAL NOT NULL,
            cargo TEXT NOT NULL
        );
    `);
}

function seedData() {
    // Seed produtos
    db.run(`
        INSERT INTO produtos (id, nome, categoria, preco) VALUES
        (1, 'Notebook Dell Core i7', 'Eletrônicos', 4500.00),
        (2, 'Smartphone Samsung S23', 'Eletrônicos', 2500.00),
        (3, 'Cadeira Ergonômica', 'Móveis', 850.00),
        (4, 'Mesa Regulável Escritório', 'Móveis', 1200.00),
        (5, 'Caneta Gel Azul', 'Papelaria', 2.50),
        (6, 'Caderno Inteligente A4', 'Papelaria', 89.90),
        (7, 'Fone de Ouvido Noise Cancelling', 'Eletrônicos', 799.00),
        (8, 'Teclado Mecânico RGB', 'Eletrônicos', 350.00);
    `);
    
    // Seed vendas
    db.run(`
        INSERT INTO vendas (id, data_venda, cliente_id, produto_id, quantidade, valor_total) VALUES
        (1, '2026-05-10', 101, 1, 1, 4500.00),
        (2, '2026-05-11', 102, 2, 2, 5000.00),
        (3, '2026-05-12', 101, 3, 1, 850.00),
        (4, '2026-05-13', 103, 5, 10, 25.00),
        (5, '2026-05-14', 102, 6, 2, 179.80),
        (6, '2026-05-15', 104, 1, 1, 4500.00),
        (7, '2026-05-16', 101, 2, 1, 2500.00),
        (8, '2026-05-17', 103, 7, 2, 1598.00),
        (9, '2026-05-18', 105, 3, 4, 3400.00),
        (10, '2026-05-19', 102, 5, 4, 10.00),
        (11, '2026-05-20', 104, 8, 1, 350.00),
        (12, '2026-05-21', 101, 8, 2, 700.00);
    `);

    // Seed funcionarios
    db.run(`
        INSERT INTO funcionarios (id, nome, departamento, salario, cargo) VALUES
        (1, 'Ana Clara Silva', 'Tecnologia', 6500.00, 'Desenvolvedora Júnior'),
        (2, 'Bruno Santos', 'Tecnologia', 9200.00, 'Engenheiro de Software Sênior'),
        (3, 'Carla Oliveira', 'Vendas', 4500.00, 'Analista Comercial'),
        (4, 'Diego Costa', 'Vendas', 3800.00, 'Assistente de Vendas'),
        (5, 'Elena Rodrigues', 'Recursos Humanos', 5200.00, 'Analista de DP'),
        (6, 'Fernando Souza', 'Tecnologia', 4200.00, 'Suporte Técnico'),
        (7, 'Gisele Lima', 'Vendas', 6100.00, 'Coordenadora de Vendas'),
        (8, 'Hugo Pereira', 'Recursos Humanos', 8500.00, 'Gerente de RH'),
        (9, 'Juliana Mendes', 'Marketing', 4900.00, 'Designer Gráfico'),
        (10, 'Lucas Rocha', 'Marketing', 5600.00, 'Analista de SEO');
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
    
    // Atualizar tabela de gabarito esperado na segunda aba
    renderExpectedTable(question.referenceQuery);
}

function updateLineNumbers() {
    const lines = sqlEditor.value.split("\n").length;
    lineNumbers.innerHTML = Array(lines).fill(0).map((_, i) => `<span>${i + 1}</span>`).join("");
}

function renderQuestionList() {
    questionListContainer.innerHTML = "";
    questions.forEach(q => {
        const isSolved = solvedQuestions.has(q.id);
        const card = document.createElement("div");
        card.className = `quest-card ${isSolved ? "solved" : ""} ${q.id === activeQuestionId ? "active" : ""}`;
        card.setAttribute("data-id", q.id);
        
        card.innerHTML = `
            <div class="quest-info">
                <span class="quest-title">${q.title}</span>
                <span class="quest-meta">Dificuldade: ${q.difficulty}</span>
            </div>
            <div class="quest-status">
                ${isSolved ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>` : ""}
            </div>
        `;
        
        card.addEventListener("click", () => {
            // Salvar rascunho da questão atual antes de mudar
            saveCurrentDraft();
            loadQuestion(q.id);
        });

        questionListContainer.appendChild(card);
    });
}

function saveCurrentDraft() {
    if (activeQuestionId) {
        localStorage.setItem(`sql_save_q_${activeQuestionId}`, sqlEditor.value);
    }
}

// 6. Visualizador do Esquema do Banco
function updateSchemaViewer(visibleTables = ["vendas", "produtos", "funcionarios"]) {
    schemaTabs.innerHTML = "";
    
    visibleTables.forEach((tableName, index) => {
        const tabBtn = document.createElement("button");
        tabBtn.className = `schema-tab-btn ${index === 0 ? "active" : ""}`;
        tabBtn.textContent = tableName.charAt(0).toUpperCase() + tableName.slice(1);
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
            container.innerHTML = "<tr><td>Tabela vazia.</td></tr>";
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
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
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

    try {
        const result = db.exec(userQuery);
        userResultPlaceholder.style.display = "none";
        userResultTableContainer.style.display = "block";

        if (result.length === 0) {
            userResultTable.innerHTML = "<thead><tr><th>Mensagem</th></tr></thead><tbody><tr><td>Consulta executada com sucesso, mas nenhuma linha foi retornada.</td></tr></tbody>";
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
            <span class="feedback-icon">⚠️</span>
            <div>
                <strong>Erro de Execução SQL:</strong><br>
                <span>${msg}</span>
            </div>
        </div>
    `;
}

// 8. Sistema de Validação da Resposta
function validateAnswer() {
    const userResult = runUserSQL(false);
    if (!userResult) return; // Erro de sintaxe já exibido no console da aba

    const question = questions.find(q => q.id === activeQuestionId);
    if (!question) return;

    try {
        const refResult = db.exec(question.referenceQuery);
        const validation = compareResults(userResult, refResult);

        if (validation.valid) {
            // Sucesso!
            solvedQuestions.add(activeQuestionId);
            saveProgress();
            
            // Render feedback de sucesso na tela de resultados
            userResultPlaceholder.style.display = "flex";
            userResultPlaceholder.innerHTML = `
                <div class="feedback-box success">
                    <span class="feedback-icon">🎉</span>
                    <div>
                        <strong>Resposta Correta! Excelente trabalho!</strong><br>
                        <span>Sua consulta retornou exatamente o conjunto de dados esperado.</span>
                    </div>
                </div>
            `;
            userResultTableContainer.style.display = "block"; // mantém a tabela visível abaixo do balão, reinserindo o balão no topo
            userResultPlaceholder.parentNode.insertBefore(userResultPlaceholder, userResultTableContainer);

            // Atualiza barra de progresso e sidebar
            renderQuestionList();
            updateProgressBar();

            // Verifica se concluiu todas as questões
            if (solvedQuestions.size === questions.length) {
                setTimeout(() => {
                    successModal.style.display = "flex";
                }, 800);
            }
        } else {
            // Falhou na lógica
            userResultPlaceholder.style.display = "flex";
            userResultPlaceholder.innerHTML = `
                <div class="feedback-box error">
                    <span class="feedback-icon">❌</span>
                    <div>
                        <strong>Quase lá! Mas o resultado é diferente do esperado:</strong><br>
                        <span>${validation.message}</span>
                    </div>
                </div>
            `;
            userResultPlaceholder.parentNode.insertBefore(userResultPlaceholder, userResultTableContainer);
        }
        
        switchTab("tab-user-result");
    } catch (e) {
        console.error(e);
        showErrorFeedback("Erro interno ao validar a consulta: " + e.message);
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

    // Verificar quantidade de colunas
    if (uData.columns.length !== rData.columns.length) {
        return { 
            valid: false, 
            message: `A quantidade de colunas retornada está incorreta. Esperava-se ${rData.columns.length} colunas, mas sua query retornou ${uData.columns.length}.`
        };
    }

    // Verificar quantidade de linhas
    if (uData.values.length !== rData.values.length) {
        return {
            valid: false,
            message: `O número de linhas retornado difere do esperado. Sua query retornou ${uData.values.length} linhas, mas o correto seria ${rData.values.length}. Verifique as condições de agrupamento ou filtros.`
        };
    }

    // Verificar nomes das colunas
    for (let i = 0; i < rData.columns.length; i++) {
        if (uData.columns[i].toLowerCase() !== rData.columns[i].toLowerCase()) {
            return {
                valid: false,
                message: `O apelido/nome da coluna na posição ${i+1} está incorreto. Esperava-se "${rData.columns[i]}", mas obteve-se "${uData.columns[i]}". Lembre-se de usar "AS [nome_coluna]" se especificado.`
            };
        }
    }

    // Verificar conteúdo de cada linha e coluna
    for (let r = 0; r < rData.values.length; r++) {
        const uRow = uData.values[r];
        const rRow = rData.values[r];

        for (let c = 0; c < rData.columns.length; c++) {
            const uVal = uRow[c];
            const rVal = rRow[c];

            if (typeof uVal === 'number' && typeof rVal === 'number') {
                // Compara floats com tolerância a arredondamentos
                if (Math.abs(uVal - rVal) > 0.01) {
                    return {
                        valid: false,
                        message: `Dados divergentes na linha ${r+1}, coluna "${rData.columns[c]}". Obteve-se o valor ${uVal.toFixed(2)}, mas o esperado era ${rVal.toFixed(2)}.`
                    };
                }
            } else {
                // Compara strings
                const uStr = uVal === null ? "null" : String(uVal).trim().toLowerCase();
                const rStr = rVal === null ? "null" : String(rVal).trim().toLowerCase();

                if (uStr !== rStr) {
                    return {
                        valid: false,
                        message: `Dados divergentes na linha ${r+1}, coluna "${rData.columns[c]}". Obteve-se o valor "${uVal}", mas o esperado era "${rVal}".`
                    };
                }
            }
        }
    }

    return { valid: true };
}

// 9. Persistência de Progresso (Local Storage)
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
        // Limpar rascunhos do localStorage
        questions.forEach(q => {
            localStorage.removeItem(`sql_save_q_${q.id}`);
        });
        localStorage.removeItem("sql_solved_list");
        localStorage.removeItem("sql_active_id");
        
        solvedQuestions.clear();
        activeQuestionId = 1;
        
        // Reinicializar banco de dados e UI
        db.run("DROP TABLE IF EXISTS vendas;");
        db.run("DROP TABLE IF EXISTS produtos;");
        db.run("DROP TABLE IF EXISTS funcionarios;");
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

// 10. Utilitários de Interface (Abas e Eventos)
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
    // Sincronização de scrolling e números de linha
    sqlEditor.addEventListener("input", () => {
        updateLineNumbers();
        // Salvar rascunho automático ao digitar
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

    // Executar e Validar
    btnRun.addEventListener("click", () => runUserSQL(true));
    btnSubmit.addEventListener("click", validateAnswer);

    // Reiniciar
    btnResetDb.addEventListener("click", resetProgress);

    // Navegação de Abas de Resultados
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            switchTab(btn.getAttribute("data-tab"));
        });
    });

    // Seletor de visualização de dados brutos
    schemaTableSelect.addEventListener("change", updateSchemaDataTab);

    // Fechar modal de parabéns
    btnModalClose.addEventListener("click", () => {
        successModal.style.display = "none";
    });
}

// Executar após carregar o DOM
document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    initDatabase();
});
