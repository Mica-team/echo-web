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

about.style.display = "none";

btn.onclick = async ()=>{

    music.volume = 0;
    music.play().catch(()=>{});

    let fade = setInterval(()=>{
        if(music.volume < 0.4){
            music.volume += 0.02;
        }else{
            clearInterval(fade);
        }
    },100);

    landing.style.display="none";
    boot.classList.remove("hidden");

    terminal.innerHTML="";

    for(let i=0;i<steps.length;i++){

        terminal.innerHTML += "> " + steps[i] + "<br>";

        let p = Math.round(((i+1)/steps.length)*100);

        bar.style.width = p + "%";
        percent.innerHTML = p + "%";

        await new Promise(r=>setTimeout(r,1000));
    }

    terminal.innerHTML += "<br><span style='color:white;'>ACCESS GRANTED</span>";

    await new Promise(r=>setTimeout(r,1500));

    boot.style.display="none";
    about.style.display="flex";

    about.scrollIntoView({
        behavior:"smooth"
    });

};
