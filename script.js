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

const b = document.getElementById("startBtn");
const l = document.getElementById("landing");
const boot = document.getElementById("boot");
const about = document.getElementById("about");

const stage = document.getElementById("bootStage");
const task = document.getElementById("bootTask");
const fill = document.getElementById("progressFill");
const percent = document.getElementById("progressText");

b.onclick = async () => {

    const music = document.getElementById("bgMusic");
    music.play().catch(() => {});

    l.style.display = "none";
    boot.style.display = "flex";

    for(let i=0;i<bootSteps.length;i++){

        stage.textContent = `Stage ${i+1} / ${bootSteps.length}`;
        task.textContent = bootSteps[i];

        fill.style.width = "0%";
        percent.textContent = "0%";

        for(let p=0;p<=100;p++){

            fill.style.width = p + "%";
            percent.textContent = p + "%";

            await new Promise(r=>setTimeout(r,10));

        }

        await new Promise(r=>setTimeout(r,120));

    }

    stage.textContent = "✓ Boot Complete";
    task.textContent = "Loading Echo...";

    await new Promise(r=>setTimeout(r,700));

    boot.style.opacity = "0";

    await new Promise(r=>setTimeout(r,500));

    boot.style.display = "none";

    about.style.display = "block";

    about.scrollIntoView({
        behavior:"smooth"
    });

};

/* ===========================
   Section Glow
=========================== */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.target.id==="source"){

            document.querySelector(".github-btn")
                .classList.toggle("glow-active",entry.isIntersecting);

            document.getElementById("source")
                .classList.toggle("glow-active",entry.isIntersecting);

        }

        if(entry.target.id==="community"){

            document.querySelector(".discord-btn")
                .classList.toggle("glow-active",entry.isIntersecting);

            document.getElementById("community")
                .classList.toggle("glow-active",entry.isIntersecting);

        }

    });

},{
    threshold:0.55
});

observer.observe(document.getElementById("source"));
observer.observe(document.getElementById("community"));
