document.addEventListener('DOMContentLoaded', () => {
 const form=document.querySelector('[data-catalog-filters]');
 const cards=[...document.querySelectorAll('[data-tour-card]')];
 if(!form || !cards.length) return;
 const region=form.querySelector('[name="region"]'), days=form.querySelector('[name="days"]'), price=form.querySelector('[name="price"]'), type=form.querySelector('[name="type"]'), search=form.querySelector('[name="search"]');
 const empty=document.getElementById('catalogEmpty');
 function apply(){
  const q=(search.value||'').trim().toLocaleLowerCase('ru'); let shown=0;
  cards.forEach(card=>{
   const t=window.getTour(card.dataset.tourCard); if(!t)return;
   const ok=(!region.value||t.region===region.value)&&(!days.value||t.nights>=Number(days.value))&&(!price.value||t.price<=Number(price.value))&&(!type.value||t.type===type.value)&&(!q||[t.name,t.region,t.city,t.type,t.description].join(' ').toLocaleLowerCase('ru').includes(q));
   card.hidden=!ok; if(ok)shown++;
  });
  if(empty)empty.hidden=shown!==0;
 }
 form.addEventListener('submit',e=>{e.preventDefault();apply()});
 form.addEventListener('input',apply); form.addEventListener('change',apply);
 form.addEventListener('reset',()=>setTimeout(apply,0));
 apply();
});
