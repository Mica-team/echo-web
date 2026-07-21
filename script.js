const steps = [
    "Powering Systems...",
    "Loading AI Core...",
    "Connecting Bluetooth...",
    "Initializing Motion System...",
    "Loading Echo Services...",
    "System Ready."
];

const btn = document.getElementById("startBtn");
const landing = document.getElementById("landing");
const boot = document.getElementById("boot");
const about = document.getElementById("about");
const terminal = document.getElementById("terminal");
const bar = document.getElementById("bar");
const percent = document.getElementById("percent");
const music = document.getElementById("bgMusic");

// Hide sections on startup
boot.style.display = "none";
about.style.display = "none";

btn.addEventListener("click", async () => {

    // Fade in music
    music.volume = 0;
    music.play().catch(() => {});

    let volume = 0;
    const fade = setInterval(() => {
        volume += 0.02;
        if (volume >= 0.4) {
            volume = 0.4;
            clearInterval(fade);
        }
        music.volume = volume;
    }, 100);

    // Hide landing
    landing.style.display = "none";

    // Show boot screen
    boot.style.display = "flex";

    terminal.innerHTML = "";
    bar.style.width = "0%";
    percent.textContent = "0%";

    for (let i = 0; i < steps.length; i++) {

        terminal.innerHTML += `> ${steps[i]}<br>`;

        const progress = Math.round(((i + 1) / steps.length) * 100);

        bar.style.width = progress + "%";
        percent.textContent = progress + "%";

        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    terminal.innerHTML += "<br><span style='color:#ffffff;'>ACCESS GRANTED</span>";

   
