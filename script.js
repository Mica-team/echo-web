const lines = [
    "Powering Systems...",
    "Loading AI Core...",
    "Connecting Bluetooth...",
    "System Ready."
];

const b = document.getElementById("startBtn");
const l = document.getElementById("landing");
const boot = document.getElementById("boot");
const t = document.getElementById("terminal");
const a = document.getElementById("about");

b.onclick = async () => {

    const m = document.getElementById("bgMusic");
    m.play().catch(() => {});

    l.style.display = "none";
    boot.style.display = "flex";

    t.textContent = "";

    for (const x of lines) {

        t.textContent += x + "\n";

        await new Promise(r => setTimeout(r, 900));

    }

    await new Promise(r => setTimeout(r, 800));

    boot.style.display = "none";

    a.style.display = "block";

    a.scrollIntoView({
        behavior: "smooth"
    });

};

/* ===========================
   Section Glow
=========================== */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        /* ---------- Source ---------- */

        if (entry.target.id === "source") {

            document.querySelector(".github-btn")
                .classList.toggle("glow-active", entry.isIntersecting);

            document.getElementById("source")
                .classList.toggle("glow-active", entry.isIntersecting);

        }

        /* ---------- Community ---------- */

        if (entry.target.id === "community") {

            document.querySelector(".discord-btn")
                .classList.toggle("glow-active", entry.isIntersecting);

            document.getElementById("community")
                .classList.toggle("glow-active", entry.isIntersecting);

        }

    });

}, {
    threshold: 0.55
});

observer.observe(document.getElementById("source"));
observer.observe(document.getElementById("community"));
