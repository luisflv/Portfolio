const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const sections = document.querySelectorAll("main section[id], article[id]");
const aboutLink = document.querySelector('.site-nav a[href="#sobre"]');
const aboutGame = document.querySelector("#about-game");
const gameClose = document.querySelector(".game-close");
const footerEgg = document.querySelector(".footer-egg");
const pongModal = document.querySelector("#pong-game");
const pongClose = document.querySelector(".pong-close");
const pongCanvas = document.querySelector("#pong-canvas");
const pongScore = document.querySelector("#pong-score");
const pongContext = pongCanvas.getContext("2d");
let pongFrame = null;
let playerScore = 0;
let cpuScore = 0;
let upPressed = false;
let downPressed = false;

const pong = {
    playerY: 126,
    cpuY: 126,
    paddleWidth: 10,
    paddleHeight: 68,
    ballX: 280,
    ballY: 160,
    ballSize: 10,
    ballVX: 4,
    ballVY: 3
};

menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menu");
    });
});

const activeLinkObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        const activeId = entry.target.id;
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
        });
    });
}, {
    rootMargin: "-35% 0px -55% 0px",
    threshold: 0
});

sections.forEach((section) => activeLinkObserver.observe(section));

const closeAboutGame = () => {
    aboutGame.classList.remove("show");
    aboutGame.setAttribute("aria-hidden", "true");
};

aboutLink.addEventListener("click", (event) => {
    event.preventDefault();
    aboutGame.classList.remove("show");
    void aboutGame.offsetWidth;
    aboutGame.classList.add("show");
    aboutGame.setAttribute("aria-hidden", "false");
});

gameClose.addEventListener("click", closeAboutGame);

aboutGame.addEventListener("click", (event) => {
    if (event.target === aboutGame) {
        closeAboutGame();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && aboutGame.classList.contains("show")) {
        closeAboutGame();
    }

    if (event.key === "Escape" && pongModal.classList.contains("show")) {
        closePongGame();
    }
});

const resetPongBall = (direction = 1) => {
    pong.ballX = pongCanvas.width / 2;
    pong.ballY = pongCanvas.height / 2;
    pong.ballVX = 4 * direction;
    pong.ballVY = (Math.random() > 0.5 ? 1 : -1) * (2.4 + Math.random() * 2);
};

const drawPong = () => {
    pongContext.fillStyle = "#060914";
    pongContext.fillRect(0, 0, pongCanvas.width, pongCanvas.height);

    pongContext.fillStyle = "rgba(248, 250, 252, 0.28)";
    for (let y = 10; y < pongCanvas.height; y += 24) {
        pongContext.fillRect(pongCanvas.width / 2 - 2, y, 4, 12);
    }

    pongContext.fillStyle = "#34d399";
    pongContext.fillRect(22, pong.playerY, pong.paddleWidth, pong.paddleHeight);

    pongContext.fillStyle = "#f472b6";
    pongContext.fillRect(pongCanvas.width - 32, pong.cpuY, pong.paddleWidth, pong.paddleHeight);

    pongContext.fillStyle = "#facc15";
    pongContext.fillRect(pong.ballX, pong.ballY, pong.ballSize, pong.ballSize);
};

const updatePong = () => {
    const canvasHeight = pongCanvas.height;
    const canvasWidth = pongCanvas.width;

    if (upPressed) {
        pong.playerY -= 6;
    }

    if (downPressed) {
        pong.playerY += 6;
    }

    pong.playerY = Math.max(0, Math.min(canvasHeight - pong.paddleHeight, pong.playerY));

    const cpuCenter = pong.cpuY + pong.paddleHeight / 2;
    const ballCenter = pong.ballY + pong.ballSize / 2;
    pong.cpuY += (ballCenter - cpuCenter) * 0.075;
    pong.cpuY = Math.max(0, Math.min(canvasHeight - pong.paddleHeight, pong.cpuY));

    pong.ballX += pong.ballVX;
    pong.ballY += pong.ballVY;

    if (pong.ballY <= 0 || pong.ballY + pong.ballSize >= canvasHeight) {
        pong.ballVY *= -1;
    }

    const playerHit = pong.ballX <= 32
        && pong.ballX >= 22
        && pong.ballY + pong.ballSize >= pong.playerY
        && pong.ballY <= pong.playerY + pong.paddleHeight;

    const cpuHit = pong.ballX + pong.ballSize >= canvasWidth - 32
        && pong.ballX + pong.ballSize <= canvasWidth - 22
        && pong.ballY + pong.ballSize >= pong.cpuY
        && pong.ballY <= pong.cpuY + pong.paddleHeight;

    if (playerHit || cpuHit) {
        const paddleY = playerHit ? pong.playerY : pong.cpuY;
        const impact = (ballCenter - (paddleY + pong.paddleHeight / 2)) / (pong.paddleHeight / 2);
        pong.ballVX = Math.abs(pong.ballVX) * (playerHit ? 1 : -1);
        pong.ballVY = impact * 4.8;
    }

    if (pong.ballX < -pong.ballSize) {
        cpuScore += 1;
        pongScore.textContent = `${playerScore} : ${cpuScore}`;
        resetPongBall(1);
    }

    if (pong.ballX > canvasWidth + pong.ballSize) {
        playerScore += 1;
        pongScore.textContent = `${playerScore} : ${cpuScore}`;
        resetPongBall(-1);
    }
};

const runPong = () => {
    updatePong();
    drawPong();
    pongFrame = requestAnimationFrame(runPong);
};

const setPlayerFromPointer = (event) => {
    const bounds = pongCanvas.getBoundingClientRect();
    const pointerY = event.clientY - bounds.top;
    pong.playerY = (pointerY / bounds.height) * pongCanvas.height - pong.paddleHeight / 2;
};

const openPongGame = () => {
    playerScore = 0;
    cpuScore = 0;
    pongScore.textContent = "0 : 0";
    pong.playerY = 126;
    pong.cpuY = 126;
    resetPongBall(Math.random() > 0.5 ? 1 : -1);
    pongModal.classList.add("show");
    pongModal.setAttribute("aria-hidden", "false");
    cancelAnimationFrame(pongFrame);
    runPong();
};

function closePongGame() {
    pongModal.classList.remove("show");
    pongModal.setAttribute("aria-hidden", "true");
    cancelAnimationFrame(pongFrame);
    pongFrame = null;
}

footerEgg.addEventListener("click", (event) => {
    event.preventDefault();
    openPongGame();
});

pongClose.addEventListener("click", closePongGame);

pongModal.addEventListener("click", (event) => {
    if (event.target === pongModal) {
        closePongGame();
    }
});

pongCanvas.addEventListener("pointermove", setPlayerFromPointer);
pongCanvas.addEventListener("pointerdown", setPlayerFromPointer);

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
        upPressed = true;
    }

    if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
        downPressed = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
        upPressed = false;
    }

    if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
        downPressed = false;
    }
});
