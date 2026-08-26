const questions = [
    { id: 1, text: "Segundo os materiais, o que é infraestrutura de Tecnologia da Informação?", options: ["Apenas os computadores usados pelos funcionários", "O conjunto de recursos físicos, lógicos e humanos para armazenar, processar, proteger e transmitir informações", "Somente os programas instalados nos servidores", "Um serviço contratado exclusivamente pela internet"], correctAnswer: 1, explanation: "A infraestrutura de TI envolve hardware, software, redes, armazenamento, bancos de dados, segurança, backup e pessoas. Ela sustenta o armazenamento, o processamento, a proteção e a transmissão das informações." },
    { id: 2, text: "Em uma arquitetura cliente-servidor, qual é o papel do cliente?", options: ["Fornecer energia elétrica ao datacenter", "Solicitar recursos ou serviços a um servidor", "Executar obrigatoriamente todos os bancos de dados", "Substituir o sistema operacional do servidor"], correctAnswer: 1, explanation: "O cliente é o dispositivo ou programa que faz requisições. O servidor é o computador ou sistema que fornece recursos e serviços em resposta." },
    { id: 3, text: "O que caracteriza uma infraestrutura on-premises?", options: ["Servidores mantidos fisicamente nas instalações da própria organização", "Recursos sempre gratuitos oferecidos por um provedor", "Aplicações acessadas sem qualquer necessidade de rede", "Ambiente sem manutenção, backup ou segurança"], correctAnswer: 0, explanation: "Na infraestrutura on-premises, servidores, armazenamento, switches, firewall, nobreaks e outros componentes ficam no próprio prédio da organização." },
    { id: 4, text: "Qual alternativa apresenta uma vantagem da infraestrutura local on-premises?", options: ["Investimento inicial sempre baixo", "Aumento instantâneo e ilimitado de capacidade", "Maior controle físico sobre os equipamentos", "Dispensa de equipe especializada"], correctAnswer: 2, explanation: "Entre as vantagens citadas estão maior controle físico, possibilidade de personalização e acesso local independente da internet para alguns serviços." },
    { id: 5, text: "Qual é uma desvantagem comum do modelo on-premises?", options: ["Não permitir personalização", "Exigir investimento inicial elevado e manutenção dos equipamentos", "Impossibilitar acesso local", "Eliminar a necessidade de espaço físico"], correctAnswer: 1, explanation: "Os materiais destacam investimento inicial elevado, necessidade de espaço físico, manutenção, dificuldade de crescimento rápido e necessidade de equipe especializada." },
    { id: 6, text: "Como os materiais definem computação em nuvem?", options: ["Compra de servidores para uso interno exclusivo", "Fornecimento de recursos computacionais pela internet conforme a necessidade do usuário", "Uso de computadores sem armazenamento", "Substituição de todos os profissionais de TI por automação"], correctAnswer: 1, explanation: "Computação em nuvem é o fornecimento de processamento, armazenamento, bancos de dados, redes e aplicações pela internet, contratados de um provedor conforme a necessidade." },
    { id: 7, text: "No exemplo dos 10 TB de arquivos, qual ação faz parte da solução em nuvem?", options: ["Comprar todos os discos e instalar o servidor localmente", "Contratar armazenamento de um provedor e enviar os arquivos pela internet", "Substituir manualmente componentes defeituosos", "Planejar fisicamente a expansão do rack"], correctAnswer: 1, explanation: "Na solução em nuvem, a empresa contrata armazenamento, envia arquivos pela internet, ajusta a capacidade e paga conforme plano ou consumo." },
    { id: 8, text: "O que é virtualização?", options: ["Tecnologia que permite criar recursos virtuais usando equipamento físico", "Técnica para desligar servidores ociosos permanentemente", "Método de backup feito apenas em fitas magnéticas", "Processo de remover sistemas operacionais dos computadores"], correctAnswer: 0, explanation: "Virtualização permite que um equipamento físico execute recursos virtuais. Um servidor físico pode executar várias máquinas virtuais, cada uma com seu sistema operacional e aplicações." },
    { id: 9, text: "Qual item é exemplo de tecnologia relacionada a virtualização citado nos materiais?", options: ["Hyper-V Server", "Microsoft Word", "Google Chrome", "Cabo HDMI"], correctAnswer: 0, explanation: "Os materiais citam Hyper-V Server, VMware ESXi e Proxmox VE como exemplos associados a virtualização e hipervisores." },
    { id: 10, text: "O que é uma máquina virtual?", options: ["Um computador criado por software, com processador, memória, armazenamento e sistema operacional virtuais", "Um monitor usado para acessar sistemas web", "Um cabo que conecta servidores ao switch", "Um antivírus instalado em um computador físico"], correctAnswer: 0, explanation: "A máquina virtual simula um computador por software, possuindo recursos virtuais de processamento, memória, armazenamento e sistema operacional." },
    { id: 11, text: "O que é um datacenter?", options: ["Um tipo de planilha para armazenar dados", "Uma instalação preparada para abrigar servidores, rede, armazenamento, refrigeração e energia", "Um aplicativo SaaS de edição de texto", "Uma zona isolada dentro de uma máquina virtual"], correctAnswer: 1, explanation: "Datacenter é a instalação física preparada para manter servidores e equipamentos de rede e armazenamento, com suporte de energia e refrigeração." },
    { id: 12, text: "Em computação em nuvem, o que significa região?", options: ["Uma área geográfica onde o provedor mantém sua infraestrutura", "Um departamento interno da empresa cliente", "Um tipo de firewall de aplicação", "Um plano de pagamento mensal fixo"], correctAnswer: 0, explanation: "Região é uma área geográfica do provedor de nuvem. Ela ajuda a organizar onde os recursos ficam hospedados." },
    { id: 13, text: "Qual é a função de uma zona de disponibilidade?", options: ["Cobrar o uso de CPU por minuto", "Isolar uma divisão dentro de uma região para ajudar a manter serviços ativos em caso de falha", "Transformar arquivos em bancos de dados", "Impedir totalmente o uso de backup"], correctAnswer: 1, explanation: "Zonas de disponibilidade são divisões isoladas dentro de uma região. Usar mais de uma zona aumenta a resiliência quando uma delas apresenta falha." },
    { id: 14, text: "Qual alternativa descreve escalabilidade?", options: ["Capacidade de aumentar ou diminuir os recursos de um sistema", "Obrigação de manter todos os dados em um único servidor", "Bloqueio de acessos não autorizados por senha", "Criação de cópias para restauração"], correctAnswer: 0, explanation: "Escalabilidade é a capacidade de ajustar recursos para cima ou para baixo, como aumentar a memória de um servidor de 4 GB para 16 GB." },
    { id: 15, text: "O que diferencia elasticidade de uma simples ampliação manual de recursos?", options: ["Elasticidade ajusta recursos conforme a demanda, muitas vezes automaticamente", "Elasticidade elimina a necessidade de internet", "Elasticidade significa pagar sempre o mesmo valor", "Elasticidade só existe em infraestrutura local"], correctAnswer: 0, explanation: "Elasticidade é o ajuste de recursos de acordo com a demanda. O exemplo do material mostra uma loja virtual aumentando servidores durante uma promoção e reduzindo depois." },
    { id: 16, text: "O que é alta disponibilidade?", options: ["Capacidade de manter um sistema acessível na maior parte do tempo, mesmo com falhas em componentes", "Garantia de que nenhum usuário acessará a aplicação", "Redução permanente de recursos computacionais", "Compra de hardware sem backup"], correctAnswer: 0, explanation: "Alta disponibilidade busca manter o serviço funcionando mesmo quando algum componente falha, por exemplo usando servidores em diferentes zonas." },
    { id: 17, text: "Qual conceito consiste em manter recursos adicionais para substituir aqueles que apresentarem falhas?", options: ["Redundância", "Latência", "Interface", "Compilação"], correctAnswer: 0, explanation: "Redundância significa manter recursos extras, como cópias de dados em diferentes servidores, para assumir quando outro recurso falhar." },
    { id: 18, text: "No modelo de pagamento conforme o uso, por quais recursos o cliente pode pagar?", options: ["Tempo de processamento, armazenamento, requisições e tráfego de dados", "Apenas pela compra inicial do servidor físico", "Somente pelo teclado e pelo monitor", "Apenas pela instalação elétrica do prédio"], correctAnswer: 0, explanation: "Os materiais citam cobrança por tempo de processamento, espaço de armazenamento, quantidade de requisições e tráfego de dados. Também alertam que recursos esquecidos podem gerar custos desnecessários." },
    { id: 19, text: "Qual alternativa corresponde a uma nuvem híbrida?", options: ["Infraestrutura oferecida por um provedor para diversos clientes", "Infraestrutura dedicada a uma única organização", "Combinação entre infraestrutura local e nuvem pública, como banco local e backup na nuvem", "Aplicativo pronto usado diretamente pelo usuário final"], correctAnswer: 2, explanation: "Nuvem híbrida combina infraestrutura local com nuvem pública. O exemplo apresentado é manter banco local e backup na nuvem." },
    { id: 20, text: "Quais são os principais modelos de serviço em nuvem apresentados nos materiais?", options: ["HTTP, HTML e CSS", "IaaS, PaaS e SaaS", "LAN, MAN e WAN", "CPU, RAM e SSD"], correctAnswer: 1, explanation: "Os modelos de serviço apresentados são IaaS (Infrastructure as a Service), PaaS (Platform as a Service) e SaaS (Software as a Service)." }
];

let studentName = "";
let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);
let uuid = "";
let conclusionDate = "";

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

document.addEventListener("DOMContentLoaded", () => {
    studentNameInput.addEventListener("input", () => {
        if (studentNameInput.value.trim().length >= 3) {
            btnStart.disabled = false;
            nameError.style.display = "none";
        } else {
            btnStart.disabled = true;
        }
    });

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

    btnPrev.addEventListener("click", prevQuestion);
    btnNext.addEventListener("click", nextQuestion);
    initTabSystem();

    document.querySelectorAll("#btn-download-pdf").forEach(btn => btn.addEventListener("click", downloadCertificatePDF));
    document.querySelectorAll("#btn-share-linkedin").forEach(btn => btn.addEventListener("click", shareLinkedIn));
    document.querySelectorAll("#btn-restart").forEach(btn => btn.addEventListener("click", restartQuiz));
});

function startQuiz() {
    screenStart.style.display = "none";
    screenQuiz.style.display = "flex";
    progressHeader.style.display = "flex";
    currentQuestionIndex = 0;
    userAnswers.fill(null);
    renderQuestion();
}

function renderQuestion() {
    const question = questions[currentQuestionIndex];
    questionBadge.textContent = `Questão ${question.id}`;
    questionText.textContent = question.text;

    if (question.code) {
        codeSnippet.innerHTML = question.code;
        questionCodeBlock.style.display = "block";
    } else {
        questionCodeBlock.style.display = "none";
        codeSnippet.innerHTML = "";
    }

    quizWarning.style.display = "none";
    alternativesContainer.innerHTML = "";
    question.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "alternative-option";
        optionElement.classList.toggle("selected", userAnswers[currentQuestionIndex] === index);
        const letter = String.fromCharCode(65 + index);
        optionElement.innerHTML = `<div class="alternative-letter">${letter}</div><div class="alternative-text">${option}</div>`;
        optionElement.addEventListener("click", () => selectOption(index));
        alternativesContainer.appendChild(optionElement);
    });

    btnPrev.disabled = currentQuestionIndex === 0;
    btnNext.innerHTML = currentQuestionIndex === questions.length - 1
        ? `Finalizar <i class="fa-solid fa-flag-checkered"></i>`
        : `Próxima <i class="fa-solid fa-chevron-right"></i>`;

    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    progressText.textContent = `Questão ${currentQuestionIndex + 1} de ${questions.length}`;
}

function selectOption(index) {
    userAnswers[currentQuestionIndex] = index;
    alternativesContainer.querySelectorAll(".alternative-option").forEach((item, i) => {
        item.classList.toggle("selected", i === index);
    });
    quizWarning.style.display = "none";
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    }
}

function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === null) {
        quizWarning.style.display = "inline-flex";
        return;
    }
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    screenQuiz.style.display = "none";
    progressHeader.style.display = "none";
    screenResults.style.display = "block";

    let score = 0;
    questions.forEach((q, index) => {
        if (userAnswers[index] === q.correctAnswer) score++;
    });

    const percent = Math.round((score / questions.length) * 100);
    const grade = (score / questions.length) * 10.0;
    uuid = generateUUID();

    const today = new Date();
    conclusionDate = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

    localStorage.setItem("quiz_cloud_result", JSON.stringify({ studentName, date: conclusionDate, score, percent, grade, uuid }));
    document.getElementById("metric-hits").textContent = `${score}/${questions.length}`;
    document.getElementById("metric-percent").textContent = `${percent}%`;
    document.getElementById("metric-grade").textContent = grade.toFixed(1);
    renderFeedbackUI(score);

    document.getElementById("cert-student-name").textContent = studentName;
    document.getElementById("cert-date").textContent = conclusionDate;
    document.getElementById("cert-percent").textContent = `${percent}%`;
    document.getElementById("cert-grade").textContent = grade.toFixed(1);
    document.getElementById("cert-uuid").textContent = uuid;
    generateQRCode();
    renderReviewUI();
}

function renderFeedbackUI(score) {
    const feedbackWrap = document.getElementById("performance-feedback");
    const iconContainer = document.getElementById("results-icon-container");
    const resultsTitle = document.getElementById("results-title");
    let feedbackText = "";
    let feedbackClass = "";
    let iconHTML = "";
    let titleHTML = "";

    if (score >= 16) {
        feedbackText = "Excelente! Você domina os fundamentos de computação em nuvem.";
        feedbackClass = "excellent";
        iconHTML = `<div class="results-icon success"><i class="fa-solid fa-trophy"></i></div>`;
        titleHTML = "Parabéns! Excelente Desempenho!";
    } else if (score >= 12) {
        feedbackText = "Bom trabalho! Você já compreende os conceitos básicos de infraestrutura e nuvem.";
        feedbackClass = "good";
        iconHTML = `<div class="results-icon success"><i class="fa-solid fa-star"></i></div>`;
        titleHTML = "Muito Bem! Você passou!";
    } else {
        feedbackText = "Continue estudando infraestrutura, modelos de nuvem, escalabilidade, segurança e formas de implantação.";
        feedbackClass = "poor";
        iconHTML = `<div class="results-icon error"><i class="fa-solid fa-circle-exclamation"></i></div>`;
        titleHTML = "Falta Pouco! Continue Estudando!";
    }

    iconContainer.innerHTML = iconHTML;
    resultsTitle.textContent = titleHTML;
    feedbackWrap.innerHTML = `<div class="feedback-box ${feedbackClass}"><i class="fa-solid fa-circle-info"></i><span>${feedbackText}</span></div>`;
}

function renderReviewUI() {
    const reviewContainer = document.getElementById("review-container");
    reviewContainer.innerHTML = "";

    questions.forEach((q, index) => {
        const selectedOpt = userAnswers[index];
        const isCorrect = selectedOpt === q.correctAnswer;
        const reviewItem = document.createElement("div");
        reviewItem.className = `review-item ${isCorrect ? "correct-card" : "incorrect-card"}`;
        let answersHTML = "";

        q.options.forEach((opt, oIdx) => {
            const letter = String.fromCharCode(65 + oIdx);
            let optClass = "";
            if (oIdx === q.correctAnswer) optClass = "correct-ans";
            else if (oIdx === selectedOpt && !isCorrect) optClass = "selected-wrong";
            answersHTML += `<div class="review-ans ${optClass}"><strong>${letter})</strong> ${opt}${oIdx === q.correctAnswer ? ' <i class="fa-solid fa-check" style="color: var(--success)"></i> (Gabarito)' : ''}${oIdx === selectedOpt && !isCorrect ? ' <i class="fa-solid fa-xmark" style="color: var(--error)"></i> (Sua escolha)' : ''}</div>`;
        });

        reviewItem.innerHTML = `
            <div class="review-q-header">
                <span class="review-q-title">Questão ${q.id}</span>
                ${isCorrect ? '<span class="review-badge correct"><i class="fa-solid fa-check"></i> Correta</span>' : '<span class="review-badge incorrect"><i class="fa-solid fa-xmark"></i> Incorreta</span>'}
            </div>
            <p class="review-q-text">${q.text}</p>
            <div class="review-answers-box">${answersHTML}</div>
            <div class="review-explanation"><strong>Explicação teorica:</strong>${q.explanation}</div>
        `;
        reviewContainer.appendChild(reviewItem);
    });
}

function initTabSystem() {
    document.querySelectorAll(".results-tabs .tab-btn").forEach(tab => {
        tab.addEventListener("click", () => {
            document.querySelectorAll(".results-tabs .tab-btn").forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            const targetPaneId = tab.getAttribute("data-target");
            document.querySelectorAll(".tab-pane").forEach(pane => {
                pane.classList.toggle("active", pane.id === targetPaneId);
            });
        });
    });
}

function generateUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generateQRCode() {
    const qrContainer = document.getElementById("cert-qrcode");
    qrContainer.innerHTML = "";
    const scoreVal = userAnswers.filter((ans, idx) => ans === questions[idx].correctAnswer).length;
    const percentVal = Math.round((scoreVal / questions.length) * 100);
    const gradeVal = ((scoreVal / questions.length) * 10.0).toFixed(1);
    const validatorURL = `https://luisvarela.com.br/cloud-computing-quiz/certificate-validator.html?uuid=${uuid}&name=${encodeURIComponent(studentName)}&date=${conclusionDate}&score=${percentVal}&grade=${gradeVal}`;

    try {
        new QRCode(qrContainer, { text: validatorURL, width: 80, height: 80, colorDark: "#0f172a", colorLight: "#ffffff", correctLevel: QRCode.CorrectLevel.M });
    } catch (err) {
        console.error("Erro ao gerar QR Code:", err);
        qrContainer.innerHTML = `<i class="fa-solid fa-qrcode" style="font-size: 3rem; color: var(--text-muted)"></i>`;
    }
}

function downloadCertificatePDF() {
    const element = document.getElementById("certificate-element");
    document.body.style.cursor = "wait";
    const downloadBtn = document.getElementById("btn-download-pdf");
    const originalText = downloadBtn.innerHTML;
    downloadBtn.disabled = true;
    downloadBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Gerando PDF...`;

    html2canvas(element, { scale: 2, useCORS: true, allowTaint: false, logging: false, backgroundColor: "#ffffff" }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
        pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
        pdf.save(`certificado-computação-nuvem-${uuid}.pdf`);
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

function shareLinkedIn() {
    const scoreVal = userAnswers.filter((ans, idx) => ans === questions[idx].correctAnswer).length;
    const percentVal = Math.round((scoreVal / questions.length) * 100);
    const gradeVal = ((scoreVal / questions.length) * 10.0).toFixed(1);
    const shareURL = `https://luisvarela.com.br/cloud-computing-quiz/certificate-validator.html?uuid=${uuid}&name=${encodeURIComponent(studentName)}&date=${conclusionDate}&score=${percentVal}&grade=${gradeVal}`;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareURL)}`, "_blank");
}

function restartQuiz() {
    studentNameInput.value = "";
    btnStart.disabled = true;
    screenResults.style.display = "none";
    screenStart.style.display = "block";
    document.querySelectorAll(".results-tabs .tab-btn").forEach((t, idx) => t.classList.toggle("active", idx === 0));
    document.querySelectorAll(".tab-pane").forEach((p, idx) => p.classList.toggle("active", idx === 0));
}
