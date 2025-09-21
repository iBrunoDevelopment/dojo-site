
const $ = (sel, ctx=document)=>ctx.querySelector(sel);
const $$ = (sel, ctx=document)=>Array.from(ctx.querySelectorAll(sel));

// Theme toggle
function applyThemeFromStorage(){
  const theme = localStorage.getItem("theme") || "light";
  if(theme === "dark") document.documentElement.classList.add("dark");
}
applyThemeFromStorage();
$("#theme-toggle")?.addEventListener("click", ()=>{
  document.documentElement.classList.toggle("dark");
  const dark = document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", dark ? "dark" : "light");
});

// Mark active nav link
(function(){
  const path = location.pathname.split("/").pop() || "index.html";
  $$(".nav-links a").forEach(a=>{
    const href = a.getAttribute("href");
    if(href.endsWith(path)) a.classList.add("active");
  });
})();

// Tabs (if any)
function setActiveTab(id){
  $$(".panel").forEach(p => p.classList.remove("active"));
  const target = $("#"+id); if(target){ target.classList.add("active"); target.scrollIntoView({behavior:"smooth", block:"start"}); }
  $$(".tab").forEach(b => b.setAttribute("aria-selected","false"));
  const tabBtn = $(`.tab[data-target='${id}']`); tabBtn && tabBtn.setAttribute("aria-selected","true");
}
$$(".tab").forEach(btn => btn.addEventListener("click", ()=> setActiveTab(btn.dataset.target)));

// Modal helpers (if present)
const modal = $(".modal");
if(modal){
  const closeBtn = $(".modal .close");
  function openModal(title, content){
    $(".modal h2").textContent = title;
    $(".modal .body").textContent = content;
    modal.classList.add("open");
    closeBtn.focus();
  }
  function closeModal(){ modal.classList.remove("open"); }
  closeBtn?.addEventListener("click", closeModal);
  modal.addEventListener("click", (e)=>{ if(e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e)=>{ if(e.key === "Escape") closeModal(); });

  // Elements with .comment open modal
  $$(".comment").forEach(el=>{
    el.addEventListener("click", ()=> openModal(el.dataset.title || "Nota", el.dataset.content || el.textContent));
  });
}


// Abre modal ao clicar em span.comment
document.querySelectorAll(".comment").forEach(el => {
  el.addEventListener("click", () => {
    document.querySelector(".modal").classList.add("open");
    document.getElementById("modal-title").textContent = el.dataset.title || "Nota";
    document.querySelector(".modal .body").innerHTML = el.dataset.content || "...";
  });
});

// Fecha o modal
document.querySelector(".modal .close").addEventListener("click", () => {
  document.querySelector(".modal").classList.remove("open");
});

// Também fecha ao clicar fora
document.querySelector(".modal").addEventListener("click", (e) => {
  if (e.target.classList.contains("modal")) {
    e.target.classList.remove("open");
  }
});
