const bootSteps = [
    "Powering Systems",
    "Initializing Display",
    "Launching Bluetooth",
    "Connecting Wi-Fi",
    "Loading AI Core",
    "Initializing Motion",
    "Loading Face Engine",
    "Verifying Security",
    "Starting Echo Services",
    "Launching Interface"
];

const $ = id => document.getElementById(id);

const b = $("startBtn");
const l = $("landing");
const boot = $("boot");
const about = $("about");
const stage = $("bootStage");
const task = $("bootTask");
const fill = $("progressFill");
const percent = $("progressText");
const music = $("bgMusic");

/* ===========================
   Boot
=========================== */

b.onclick = async () => {
    music.play().catch(() => {});
    l.style.display = "none";
    boot.style.display = "flex";
    boot.style.opacity = "1";

    for (let i = 0; i < bootSteps.length; i++) {
        stage.textContent = `Stage ${i + 1} / ${bootSteps.length}`;
        task.textContent = bootSteps[i];
        fill.style.width = "0%";
        percent.textContent = "0%";

        for (let p = 0; p <= 100; p++) {
            fill.style.width = p + "%";
            percent.textContent = p + "%";
            await new Promise(r => setTimeout(r, 10));
        }
        await new Promise(r => setTimeout(r, 120));
    }

    stage.textContent = "✓ Boot Complete";
    task.textContent = "Loading Echo...";
    await new Promise(r => setTimeout(r, 700));

    boot.style.opacity = "0";
    await new Promise(r => setTimeout(r, 500));
    boot.style.display = "none";
    about.style.display = "block";
    about.scrollIntoView({ behavior: "smooth" });
};

/* ===========================
   Section Glow
=========================== */

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.target.id === "source") {
            $("source").classList.toggle("glow-active", entry.isIntersecting);
            document.querySelector(".github-btn")?.classList.toggle("glow-active", entry.isIntersecting);
        }
        if (entry.target.id === "community") {
            $("community").classList.toggle("glow-active", entry.isIntersecting);
            document.querySelector(".discord-btn")?.classList.toggle("glow-active", entry.isIntersecting);
        }
    });
}, { threshold: 0.55 });

observer.observe($("source"));
observer.observe($("community"));

/* ===========================
   Menu
=========================== */

const menuBtn = $("menuBtn");
const sideMenu = $("sideMenu");
const backdrop = $("menuBackdrop");
const closeMenu = $("closeMenu");
const homeBtn = $("homeBtn");
const mainPanel = $("mainPanel");
const settingsPanel = $("settingsPanel");
const gamesPanel = $("gamesPanel");

function openMenu() {
    sideMenu.classList.add("open");
    backdrop.classList.add("open");
    sideMenu.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    showMainPanel();
}

function closeEverything() {
    sideMenu.classList.remove("open");
    backdrop.classList.remove("open");
    sideMenu.setAttribute("aria-hidden", "true");
    menuBtn.setAttribute("aria-expanded", "false");
    showMainPanel();
}

function showMainPanel() {
    mainPanel.hidden = false;
    settingsPanel.hidden = true;
    gamesPanel.hidden = true;
}

function showPanel(panel) {
    mainPanel.hidden = true;
    settingsPanel.hidden = panel !== settingsPanel;
    gamesPanel.hidden = panel !== gamesPanel;
}

menuBtn.addEventListener("click", e => {
    e.stopPropagation();
    if (sideMenu.classList.contains("open")) closeEverything();
    else openMenu();
});

closeMenu.addEventListener("click", closeEverything);

document.querySelectorAll(".panel-close").forEach(btn => {
    btn.addEventListener("click", closeEverything);
});

backdrop.addEventListener("click", closeEverything);

document.addEventListener("click", e => {
    if (!sideMenu.contains(e.target) && !menuBtn.contains(e.target)) {
        if (sideMenu.classList.contains("open")) closeEverything();
    }
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeEverything();
});

homeBtn.addEventListener("click", () => {
    closeEverything();
    window.scrollTo({ top: 0, behavior: "smooth" });
});

$("settingsOpen").addEventListener("click", () => showPanel(settingsPanel));
$("gamesOpen").addEventListener("click", () => showPanel(gamesPanel));

/* ===========================
   Settings
=========================== */

const SETTINGS_KEY = "echoSettings";
let settings = {
    theme: "system",
    music: true,
    reduceMotion: false
};

try {
    settings = { ...settings, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}"); }
} catch (e) {}

function applyTheme(theme) {
    const useLight = theme === "light" ||
        (theme === "system" && window.matchMedia("(prefers-color-scheme: light)").matches);
    document.body.classList.toggle("light", useLight);
    document.querySelectorAll(".setting-option").forEach(option => {
        option.classList.toggle("active", option.dataset.theme === theme);
    });
}

function applySettings() {
    applyTheme(settings.theme);
    document.body.classList.toggle("reduce-motion", settings.reduceMotion);
    $("musicToggle").checked = settings.music;
    $("motionToggle").checked = settings.reduceMotion;
    if (!settings.music) {
        music.pause();
        music.volume = 0;
    } else {
        music.volume = 1;
    }
}

function saveSettings() {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    applySettings();
}

document.querySelectorAll(".setting-option").forEach(option => {
    option.addEventListener("click", () => {
        settings.theme = option.dataset.theme;
        saveSettings();
    });
});

$("musicToggle").addEventListener("change", e => {
    settings.music = e.target.checked;
    saveSettings();
    if (settings.music && boot.style.display === "none") music.play().catch(() => {});
});

$("motionToggle").addEventListener("change", e => {
    settings.reduceMotion = e.target.checked;
    saveSettings();
});

window.matchMedia("(prefers-color-scheme: light)").addEventListener?.("change", () => {
    if (settings.theme === "system") applyTheme("system");
});

applySettings();

/* ===========================
   Mini Game: Echo Core
=========================== */

const gameStart = $("gameStart");
const gameCore = $("gameCore");
const gameScore = $("gameScore");
const gameTime = $("gameTime");
const gameMessage = $("gameMessage");

let gameRunning = false;
let score = 0;
let timeLeft = 10;
let timer = null;

function resetGame() {
    clearInterval(timer);
    gameRunning = false;
    score = 0;
    timeLeft = 10;
    gameScore.textContent = score;
    gameTime.textContent = timeLeft;
    gameMessage.textContent = "Ready?";
    gameStart.textContent = "Start Game";
}

function startGame() {
    clearInterval(timer);
    gameRunning = true;
    score = 0;
    timeLeft = 10;
    gameScore.textContent = score;
    gameTime.textContent = timeLeft;
    gameMessage.textContent = "Tap the Echo Core!";
    gameStart.textContent = "Restart";

    timer = setInterval(() => {
        timeLeft--;
        gameTime.textContent = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    gameRunning = false;
    gameMessage.textContent = score >= 10 ? "⚡ Echo Core fully charged!" : `Core charge: ${score}/10`;
    gameStart.textContent = "Play Again";
}

gameStart.addEventListener("click", startGame);
gameCore.addEventListener("click", () => {
    if (!gameRunning) return;
    score++;
    gameScore.textContent = score;
    if (score >= 10) endGame();
});

gameCore.addEventListener("keydown", e => {
    if ((e.key === "Enter" || e.key === " ") && gameRunning) {
        e.preventDefault();
        gameCore.click();
    }
});

resetGame();
