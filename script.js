const steps = [
  {speech:"I have something to tell you... 🥺", heading:"I'm really sorry", message:"I never wanted to make you feel bad. You matter to me, and I hope you can hear me out.", panda:"🐼", button:"Go on... ❤️"},
  {speech:"I feel so bad... 😭", heading:"Please hear me out", message:"I never ever meant to hurt your feelings. You are important to me, and knowing that I upset you makes me sad.", panda:"🥺", button:"Go on... ❤️"},
  {speech:"For you 💌", heading:"A little letter for you", message:"Please open this small envelope. I put my whole heart into writing this for you.", panda:"🐼", button:"One more thing... ⭐", envelope:true},
  {speech:"Do you forgive me? 🥺", heading:"Can we make things okay?", message:"I hope we can move forward. Your feelings matter, and I'll do my best to do better.", panda:"🥹", final:true},
  {speech:"You made my day! 💗", heading:"Thank you for forgiving me!", message:"Your forgiveness means a lot. I'll remember this and keep trying to be better. Sending you lots of happiness! 🐼💗", panda:"🥰", thankYou:true}
];
let current = 0;
const $ = id => document.getElementById(id);
function render(){
  const s=steps[current];
  $("speech").textContent=s.speech;
  $("heading").textContent=s.heading;
  $("message").textContent=s.message;
  $("panda").textContent=s.panda;
  $("progress").style.width=((current+1)/steps.length*100)+"%";
  $("stepCount").textContent=`${current+1} / ${steps.length}`;
  $("backBtn").disabled=current===0;
  $("nextBtn").textContent=s.button || "";
  $("nextBtn").classList.toggle("hidden",!!(s.final || s.thankYou));
  $("envelopeArea").classList.toggle("hidden",!s.envelope);
  $("actions").classList.toggle("hidden",!!s.thankYou);
  $("message").classList.remove("hidden");
  $("finalChoices")?.remove();

  if(s.final){
    $("message").classList.remove("hidden");
    const choices=document.createElement("div");
    choices.id="finalChoices";
    choices.className="choices";
    choices.innerHTML='<button class="btn btn-next forgive">Yes, I forgive you! 🥰</button><button class="btn btn-back no">No 😔</button>';
    $("actions").before(choices);
    choices.querySelector(".forgive").addEventListener("click",()=>{
      current=4;
      render();
    });
    choices.querySelector(".no").addEventListener("click",()=>{
      showToast("That's okay. Take your time. This page will stay here. 💜");
    });
  }
  if(s.thankYou){
    $("backBtn").disabled=false;
  }
}
function showToast(message){
  const t=$("toast");
  t.textContent=message;
  t.classList.remove("hidden");
  clearTimeout(window.toastTimer);
  window.toastTimer=setTimeout(()=>t.classList.add("hidden"),2800);
}
$("nextBtn").addEventListener("click",()=>{
  if(current<3){current++;render();}
});
$("backBtn").addEventListener("click",()=>{
  if(current>0){current--;render();}
});
$("openLetter").addEventListener("click",()=>{
  $("openLetter").classList.add("open");
  setTimeout(()=>$("letter").classList.remove("hidden"),180);
});
$("closeLetter").addEventListener("click",()=>$("letter").classList.add("hidden"));
const hearts=$(".hearts");
for(let i=0;i<16;i++){
  const h=document.createElement("span");
  h.textContent=Math.random()>.5?"♡":"♥";
  h.style.left=Math.random()*100+"%";
  h.style.animationDelay=(Math.random()*12)+"s";
  h.style.animationDuration=(10+Math.random()*9)+"s";
  hearts.appendChild(h);
}
render();
