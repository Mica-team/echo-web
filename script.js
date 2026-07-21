const bootLines = [
    "Initializing Echo...",
    "Loading AI Core...",
    "Connecting Bluetooth...",
    "Starting Systems...",
    "Ready!"
];

const btn = document.getElementById("startBtn");
const land = document.getElementById("landing");
const boot = document.getElementById("boot");
const about = document.getElementById("about");
const music = document.getElementById("bgMusic");

about.style.display = "none";

btn.onclick = async () => {

    music.volume = 0.4;
    music.play().catch(() => {});

    land.style.display = "none";

    boot.classList.remove("hidden");

    const terminal = document.getElementById("terminal");
    terminal.textContent = "";

    for (const line of bootLines) {
        terminal.textContent += line + "\n";
        await new Promise(r => setTimeout(r, 900));
    }

    await new Promise(r => setTimeout(r, 800));

    boot.style.display = "none";
    about.style.display = "flex";

    about.scrollIntoView({
        behavior: "smooth"
    });

};
