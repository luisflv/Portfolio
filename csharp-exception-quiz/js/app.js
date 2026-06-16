/**
 * Quiz: Tratamento de Exceções em C# - C#Lab Style
 * Desenvolvido por Luís Varela
 * 
 * Lógica da aplicação, navegação de questões, persistência em LocalStorage,
 * geração de PDF de certificado via html2canvas/jsPDF e compartilhamento no LinkedIn.
 */

// Banco de dados de questões
const questions = [
    {
        id: 1,
        text: "Qual é a finalidade principal do bloco try em C#?",
        options: [
            "Declarar variáveis",
            "Capturar exceções",
            "Executar código que pode gerar exceções",
            "Encerrar o programa"
        ],
        correctAnswer: 2, // Resposta C (0-indexed)
        explanation: "O bloco 'try' serve para delimitar um bloco de código que suspeitamos que possa lançar uma exceção durante a execução. O runtime monitora esse bloco e, se algo der errado, busca um manipulador compatível."
    },
    {
        id: 2,
        text: "Qual bloco é responsável por capturar uma exceção?",
        options: [
            "finally",
            "using",
            "throw",
            "catch"
        ],
        correctAnswer: 3, // Resposta D (0-indexed)
        explanation: "O bloco 'catch' é projetado especificamente para interceptar e tratar exceções que são lançadas dentro do bloco 'try' associado."
    },
    {
        id: 3,
        text: "O que acontece quando uma exceção é lançada dentro de um bloco try?",
        options: [
            "O programa é encerrado imediatamente",
            "O fluxo é transferido para um bloco catch compatível",
            "O código continua normalmente",
            "O bloco finally é ignorado"
        ],
        correctAnswer: 1, // Resposta B (0-indexed)
        explanation: "Assim que uma exceção ocorre no bloco 'try', a execução normal dele é interrompida imediatamente e o controle é direcionado para o bloco 'catch' compatível correspondente, se houver um."
    },
    {
        id: 4,
        text: "Qual a função do bloco finally?",
        options: [
            "Criar exceções",
            "Ignorar erros",
            "Executar código independentemente da ocorrência de exceções",
            "Declarar objetos"
        ],
        correctAnswer: 2, // Resposta C (0-indexed)
        explanation: "O bloco 'finally' sempre é executado após a saída dos blocos 'try' e 'catch', independentemente de uma exceção ter sido lançada ou capturada. Ele é ideal para limpeza de recursos, como fechar conexões ou arquivos."
    },
    {
        id: 5,
        text: "Qual instrução é utilizada para lançar manualmente uma exceção?",
        options: [
            "raise",
            "error",
            "throw",
            "exception"
        ],
        correctAnswer: 2, // Resposta C (0-indexed)
        explanation: "A palavra-chave 'throw' é utilizada em C# para sinalizar a ocorrência de uma exceção manualmente, propagando-a na pilha de chamadas."
    },
    {
        id: 6,
        text: "Analise o código abaixo. O que ocorrerá ao executá-lo?",
        code: `<span class="keyword">try</span>
{
    <span class="type">int</span> numero = <span class="type">int</span>.Parse(<span class="string">"abc"</span>);
}
<span class="keyword">catch</span>
{
    Console.WriteLine(<span class="string">"Erro"</span>);
}`,
        options: [
            "O programa trava",
            "Nada acontece",
            "Será exibida a mensagem \"Erro\"",
            "O valor será convertido para zero"
        ],
        correctAnswer: 2, // Resposta C (0-indexed)
        explanation: "O método 'int.Parse(\"abc\")' tentará converter a string \"abc\" em número inteiro, o que falhará lançando uma exceção do tipo FormatException. Como há um bloco 'catch' genérico ativo, a exceção é capturada e a mensagem \"Erro\" é exibida no console."
    }
];

// Estado da Aplicação
let studentName = "";
let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);
let uuid = "";
let conclusionDate = "";

// Elementos do DOM
const screenStart = document.getElementById("screen-start");
const screenQuiz = document.getElementById("screen-quiz");
const screenResults = document.getElementById("screen-results");

const startForm = document.getElementById("start-form");
const studentNameInput = document.getElementById("student-name");
const nameError = document.getElementById("name-error");
const btnStart = document.getElementById("btn-start");

const progressHeader = document.getElementById("header-progress-container");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");

const questionBadge = document.getElementById("question-badge");
const questionText = document.getElementById("question-text");
const questionCodeBlock = document.getElementById("question-code-block");
const codeSnippet = document.getElementById("code-snippet");
const alternativesContainer = document.getElementById("alternatives-container");
const quizWarning = document.getElementById("quiz-warning");

const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    // Escuta de input para habilitar/desabilitar botão iniciar
    studentNameInput.addEventListener("input", () => {
        if (studentNameInput.value.trim().length >= 3) {
            btnStart.disabled = false;
            nameError.style.display = "none";
        } else {
            btnStart.disabled = true;
        }
    });

    // Início da avaliação
    startForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputName = studentNameInput.value.trim();
        if (inputName.length < 3) {
            nameError.style.display = "block";
            return;
        }
        studentName = inputName;
        startQuiz();
    });

    // Navegação entre perguntas
    btnPrev.addEventListener("click", prevQuestion);
    btnNext.addEventListener("click", nextQuestion);

    // Gerenciador de Abas de Resultados
    initTabSystem();

    // Eventos de Certificado e Compartilhamento
    document.querySelectorAll("#btn-download-pdf").forEach(btn => {
        btn.addEventListener("click", downloadCertificatePDF);
    });
    
    document.querySelectorAll("#btn-share-linkedin").forEach(btn => {
        btn.addEventListener("click", shareLinkedIn);
    });

    document.querySelectorAll("#btn-restart").forEach(btn => {
        btn.addEventListener("click", restartQuiz);
    });
});

// Inicia o Quiz
function startQuiz() {
    screenStart.style.display = "none";
    screenQuiz.style.display = "flex";
    progressHeader.style.display = "flex";
    
    currentQuestionIndex = 0;
    userAnswers.fill(null);
    
    renderQuestion();
}

// Renderiza a Questão Atual
function renderQuestion() {
    const question = questions[currentQuestionIndex];
    
    // Altera Badge e Texto
    questionBadge.textContent = `Questão ${question.id}`;
    questionText.textContent = question.text;
    
    // Trata exibição do Bloco de Código
    if (question.code) {
        codeSnippet.innerHTML = question.code;
        questionCodeBlock.style.display = "block";
    } else {
        questionCodeBlock.style.display = "none";
        codeSnippet.innerHTML = "";
    }
    
    // Oculta aviso de validação
    quizWarning.style.display = "none";
    
    // Renderiza as alternativas
    alternativesContainer.innerHTML = "";
    question.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "alternative-option";
        if (userAnswers[currentQuestionIndex] === index) {
            optionElement.classList.add("selected");
        }
        
        const letter = String.fromCharCode(65 + index); // A, B, C, D
        
        optionElement.innerHTML = `
            <div class="alternative-letter">${letter}</div>
            <div class="alternative-text">${option}</div>
        `;
        
        optionElement.addEventListener("click", () => selectOption(index));
        alternativesContainer.appendChild(optionElement);
    });
    
    // Controla estados dos botões
    btnPrev.disabled = currentQuestionIndex === 0;
    if (currentQuestionIndex === questions.length - 1) {
        btnNext.innerHTML = `Finalizar <i class="fa-solid fa-flag-checkered"></i>`;
    } else {
        btnNext.innerHTML = `Próxima <i class="fa-solid fa-chevron-right"></i>`;
    }
    
    // Atualiza Barra de Progresso do Header
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    progressText.textContent = `Questão ${currentQuestionIndex + 1} de ${questions.length}`;
}

// Seleciona Alternativa
function selectOption(index) {
    userAnswers[currentQuestionIndex] = index;
    
    // Atualiza classes selecionadas visualmente
    const items = alternativesContainer.querySelectorAll(".alternative-option");
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.add("selected");
        } else {
            item.classList.remove("selected");
        }
    });
    
    // Oculta aviso se estivesse visível
    quizWarning.style.display = "none";
}

// Retrocede Questão
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

// Avança Questão (ou finaliza)
function nextQuestion() {
    // Valida se respondeu antes de prosseguir
    if (userAnswers[currentQuestionIndex] === null) {
        quizWarning.style.display = "inline-flex";
        return;
    }
    
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        // Finalizar Avaliação
        finishQuiz();
    }
}

// Finaliza Avaliação e processa resultados
function finishQuiz() {
    screenQuiz.style.display = "none";
    progressHeader.style.display = "none";
    screenResults.style.display = "block";
    
    // Calcula Resultados
    let score = 0;
    questions.forEach((q, index) => {
        if (userAnswers[index] === q.correctAnswer) {
            score++;
        }
    });
    
    const percent = Math.round((score / questions.length) * 100);
    const grade = (score / questions.length) * 10.0;
    
    // Gerar UUID e Data de Conclusão
    uuid = generateUUID();
    
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    conclusionDate = `${day}/${month}/${year}`;
    
    // Persistência no LocalStorage
    const certData = {
        studentName: studentName,
        date: conclusionDate,
        score: score,
        percent: percent,
        grade: grade,
        uuid: uuid
    };
    localStorage.setItem("quiz_csharp_result", JSON.stringify(certData));
    
    // Atualiza Métricas no UI
    document.getElementById("metric-hits").textContent = `${score}/${questions.length}`;
    document.getElementById("metric-percent").textContent = `${percent}%`;
    document.getElementById("metric-grade").textContent = grade.toFixed(1);
    
    // Renderiza Feedback
    renderFeedbackUI(score, percent);
    
    // Renderiza Detalhes no Certificado
    document.getElementById("cert-student-name").textContent = studentName;
    document.getElementById("cert-date").textContent = conclusionDate;
    document.getElementById("cert-percent").textContent = `${percent}%`;
    document.getElementById("cert-grade").textContent = grade.toFixed(1);
    document.getElementById("cert-uuid").textContent = uuid;
    
    // Desenha o QR Code
    generateQRCode();
    
    // Renderiza Revisão de Questões
    renderReviewUI();
}

// Renderiza o visual de feedback dependendo do score
function renderFeedbackUI(score, percent) {
    const feedbackWrap = document.getElementById("performance-feedback");
    const iconContainer = document.getElementById("results-icon-container");
    const resultsTitle = document.getElementById("results-title");
    
    let feedbackText = "";
    let feedbackClass = "";
    let iconHTML = "";
    let titleHTML = "";
    
    if (score >= 5) {
        feedbackText = "Excelente! Você domina os fundamentos de tratamento de exceções em C#.";
        feedbackClass = "excellent";
        iconHTML = `<div class="results-icon success"><i class="fa-solid fa-trophy"></i></div>`;
        titleHTML = "Parabéns! Excelente Desempenho! 🎉";
    } else if (score >= 3) {
        feedbackText = "Bom trabalho! Você já compreende os conceitos básicos.";
        feedbackClass = "good";
        iconHTML = `<div class="results-icon success"><i class="fa-solid fa-star"></i></div>`;
        titleHTML = "Muito Bem! Você passou! 👍";
    } else {
        feedbackText = "Continue praticando conceitos de tratamento de exceções em C#.";
        feedbackClass = "poor";
        iconHTML = `<div class="results-icon error"><i class="fa-solid fa-circle-exclamation"></i></div>`;
        titleHTML = "Falta Pouco! Continue Estudando! 📚";
    }
    
    iconContainer.innerHTML = iconHTML;
    resultsTitle.textContent = titleHTML;
    feedbackWrap.innerHTML = `
        <div class="feedback-box ${feedbackClass}">
            <i class="fa-solid fa-circle-info"></i>
            <span>${feedbackText}</span>
        </div>
    `;
}

// Renderiza a Revisão detalhada das respostas do aluno
function renderReviewUI() {
    const reviewContainer = document.getElementById("review-container");
    reviewContainer.innerHTML = "";
    
    questions.forEach((q, index) => {
        const selectedOpt = userAnswers[index];
        const isCorrect = selectedOpt === q.correctAnswer;
        
        const cardClass = isCorrect ? "correct-card" : "incorrect-card";
        const badgeHTML = isCorrect 
            ? `<span class="review-badge correct"><i class="fa-solid fa-check"></i> Correta</span>` 
            : `<span class="review-badge incorrect"><i class="fa-solid fa-xmark"></i> Incorreta</span>`;
            
        const reviewItem = document.createElement("div");
        reviewItem.className = `review-item ${cardClass}`;
        
        // Alternativas na revisão
        let answersHTML = "";
        q.options.forEach((opt, oIdx) => {
            const letter = String.fromCharCode(65 + oIdx);
            let optClass = "";
            
            if (oIdx === q.correctAnswer) {
                optClass = "correct-ans";
            } else if (oIdx === selectedOpt && !isCorrect) {
                optClass = "selected-wrong";
            }
            
            answersHTML += `
                <div class="review-ans ${optClass}">
                    <strong>${letter})</strong> ${opt} 
                    ${oIdx === q.correctAnswer ? ' <i class="fa-solid fa-check" style="color: var(--success)"></i> (Gabarito)' : ''}
                    ${oIdx === selectedOpt && !isCorrect ? ' <i class="fa-solid fa-xmark" style="color: var(--error)"></i> (Sua escolha)' : ''}
                </div>
            `;
        });
        
        reviewItem.innerHTML = `
            <div class="review-q-header">
                <span class="review-q-title">Questão ${q.id}</span>
                ${badgeHTML}
            </div>
            <p class="review-q-text">${q.text}</p>
            <div class="review-answers-box">
                ${answersHTML}
            </div>
            <div class="review-explanation">
                <strong>Explicação teórica:</strong>
                ${q.explanation}
            </div>
        `;
        
        reviewContainer.appendChild(reviewItem);
    });
}

// Sistema de abas
function initTabSystem() {
    const tabs = document.querySelectorAll(".results-tabs .tab-btn");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            
            const targetPaneId = tab.getAttribute("data-target");
            const panes = document.querySelectorAll(".tab-pane");
            panes.forEach(pane => {
                pane.classList.remove("active");
                if (pane.id === targetPaneId) {
                    pane.classList.add("active");
                }
            });
        });
    });
}

// Auxiliar: Gera UUID v4
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Auxiliar: Desenha o QR Code local
function generateQRCode() {
    const qrContainer = document.getElementById("cert-qrcode");
    qrContainer.innerHTML = ""; // Limpa
    
    // URL de validação para o certificado
    const scoreVal = userAnswers.filter((ans, idx) => ans === questions[idx].correctAnswer).length;
    const percentVal = Math.round((scoreVal / questions.length) * 100);
    const gradeVal = ((scoreVal / questions.length) * 10.0).toFixed(1);
    
    const validatorURL = `https://luisvarela.com.br/csharp-exception-quiz/certificate-validator.html?uuid=${uuid}&name=${encodeURIComponent(studentName)}&date=${conclusionDate}&score=${percentVal}&grade=${gradeVal}`;
    
    try {
        new QRCode(qrContainer, {
            text: validatorURL,
            width: 80,
            height: 80,
            colorDark: "#0f172a",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        });
    } catch (err) {
        console.error("Erro ao gerar QR Code:", err);
        qrContainer.innerHTML = `<i class="fa-solid fa-qrcode" style="font-size: 3rem; color: var(--text-muted)"></i>`;
    }
}

// Faz o Download do Certificado em PDF A4 Paisagem
function downloadCertificatePDF() {
    const element = document.getElementById("certificate-element");
    
    // Altera o cursor para indicar progresso
    document.body.style.cursor = "wait";
    const downloadBtn = document.getElementById("btn-download-pdf");
    const originalText = downloadBtn.innerHTML;
    downloadBtn.disabled = true;
    downloadBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Gerando PDF...`;
    
    html2canvas(element, {
        scale: 2, // Aumenta resolução do canvas para impressão de alta qualidade
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: "#ffffff"
    }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        
        // Importa jsPDF de window.jspdf
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4"
        });
        
        // Um papel A4 Paisagem tem 297mm de largura por 210mm de altura.
        // Nossa imagem tem 1000px por 707px.
        // A proporção 1000/707 = 1.41443
        // A proporção 297/210 = 1.41428
        // As proporções são idênticas! Caberá perfeitamente na página inteira.
        pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
        pdf.save(`certificado-csharp-${uuid}.pdf`);
        
        // Restaura estados
        document.body.style.cursor = "default";
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = originalText;
    }).catch(error => {
        console.error("Erro na exportação de PDF:", error);
        alert("Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.");
        document.body.style.cursor = "default";
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = originalText;
    });
}

// Compartilha certificado no LinkedIn
function shareLinkedIn() {
    const scoreVal = userAnswers.filter((ans, idx) => ans === questions[idx].correctAnswer).length;
    const percentVal = Math.round((scoreVal / questions.length) * 100);
    const gradeVal = ((scoreVal / questions.length) * 10.0).toFixed(1);

    // URL com dados parametrizados para scraping no LinkedIn
    const shareURL = `https://luisvarela.com.br/csharp-exception-quiz/certificate-validator.html?uuid=${uuid}&name=${encodeURIComponent(studentName)}&date=${conclusionDate}&score=${percentVal}&grade=${gradeVal}`;
    const urlLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareURL)}`;
    
    window.open(urlLinkedIn, "_blank");
}

// Reinicia o Quiz
function restartQuiz() {
    studentNameInput.value = "";
    btnStart.disabled = true;
    
    screenResults.style.display = "none";
    screenStart.style.display = "block";
    
    // Retorna aba ativa para o padrão
    const tabs = document.querySelectorAll(".results-tabs .tab-btn");
    tabs.forEach((t, idx) => {
        if (idx === 0) t.classList.add("active");
        else t.classList.remove("active");
    });
    document.querySelectorAll(".tab-pane").forEach((p, idx) => {
        if (idx === 0) p.classList.add("active");
        else p.classList.remove("active");
    });
}
