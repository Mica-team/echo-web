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
    music.play().catch(()=>{});

    land.style.display = "none";
    boot.classList.remove("hidden");

    const terminal = document.getElementById("terminal");
    terminal.textContent = "";

    for(const line of bootLines){
        terminal.textContent += line + "\n";
        await new Promise(r=>setTimeout(r,900));
    }

    boot.style.display = "none";
    about.style.display = "flex";

    document.querySelectorAll(".card").forEach(card=>{
        card.classList.add("hidden-card");
    });

    const observer = new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add("show-card");
            }
        });
    });

    document.querySelectorAll(".card").forEach(card=>{
        observer.observe(card);
    });
};
