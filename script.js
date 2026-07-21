const bootLines=[
'Initializing Echo...',
'Loading AI Core...',
'Connecting Bluetooth...',
'Starting Systems...',
'Ready!'
];
const btn=document.getElementById('startBtn');
const land=document.getElementById('landing');
const boot=document.getElementById('boot');
const about=document.getElementById('about');
about.style.display='none';
btn.onclick=async()=>{
 const m=document.getElementById('bgMusic');
 m.volume=0.4;
 m.play().catch(()=>{});
 land.style.display='none';
 boot.classList.remove('hidden');
 let t=document.getElementById('terminal');
 for(const l of bootLines){
   t.textContent+=l+'\n';
   await new Promise(r=>setTimeout(r,900));
 }
 boot.style.display='none';
 about.style.display='flex';
};
