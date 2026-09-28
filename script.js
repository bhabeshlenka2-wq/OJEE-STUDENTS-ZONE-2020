const header=document.getElementById("header");
const progress=document.getElementById("progress");
const glow=document.getElementById("cursorGlow");
const loader=document.getElementById("loader");
const percent=document.getElementById("loaderPercent");
const line=document.querySelector(".loader-line i");

let n=0;
const loadTimer=setInterval(()=>{
  n+=Math.floor(Math.random()*9)+3;
  if(n>=100){n=100;clearInterval(loadTimer);setTimeout(()=>loader.classList.add("done"),350)}
  percent.textContent=n+"%"; line.style.width=n+"%";
},90);

window.addEventListener("scroll",()=>{
  header.classList.toggle("scrolled",scrollY>20);
  const max=document.documentElement.scrollHeight-innerHeight;
  progress.style.width=(max?scrollY/max*100:0)+"%";
},{passive:true});

const menu=document.getElementById("menu"), mobile=document.getElementById("mobileNav");
menu.addEventListener("click",()=>mobile.classList.toggle("open"));
mobile.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mobile.classList.remove("open")));

const particleBox=document.getElementById("particles");
for(let i=0;i<48;i++){
  const p=document.createElement("i");p.className="particle";
  p.style.left=Math.random()*100+"%";p.style.top=(20+Math.random()*100)+"%";
  p.style.animationDuration=(8+Math.random()*14)+"s";p.style.animationDelay=Math.random()*10+"s";
  particleBox.appendChild(p);
}

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

window.addEventListener("pointermove",e=>{
  if(innerWidth>900){glow.style.opacity="1";glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"}
});

document.querySelectorAll(".magnetic").forEach(el=>{
  el.addEventListener("pointermove",e=>{
    if(innerWidth<900)return;
    const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.12,y=(e.clientY-r.top-r.height/2)*.12;
    el.style.transform=`translate(${x}px,${y}px)`;
  });
  el.addEventListener("pointerleave",()=>el.style.transform="");
});

document.querySelectorAll(".button,.icon-card,.nav-button,.pdf-download").forEach(el=>{
  el.addEventListener("pointerdown",e=>{
    const r=el.getBoundingClientRect(),s=document.createElement("i");s.className="ripple";
    const d=Math.max(r.width,r.height)*1.2;s.style.width=d+"px";s.style.height=d+"px";
    s.style.left=e.clientX-r.left-d/2+"px";s.style.top=e.clientY-r.top-d/2+"px";
    el.style.position="relative";el.style.overflow="hidden";el.appendChild(s);setTimeout(()=>s.remove(),700);
  });
});

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
  const id=a.getAttribute("href");if(id.length>1){e.preventDefault();document.querySelector(id)?.scrollIntoView({behavior:"smooth"})}
}));
