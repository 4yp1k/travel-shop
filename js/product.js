document.addEventListener('DOMContentLoaded',()=>{
 const id=new URLSearchParams(location.search).get('id')||'sochi';
 const t=window.getTour(id),root=document.getElementById('productDetails');
 if(!root||!t)return;
 document.title=t.name+' | ТурМагазин';
 const breadcrumb=document.getElementById('productBreadcrumb');if(breadcrumb)breadcrumb.textContent=t.name;
 const thumbs=t.thumbs||[t.image];
 root.innerHTML=`<nav aria-label="breadcrumb"><ol class="breadcrumb"><li class="breadcrumb-item"><a href="index.html">Главная</a></li><li class="breadcrumb-item"><a href="catalog.html">Каталог</a></li><li class="breadcrumb-item active">${t.name}</li></ol></nav>
 <div class="row g-4"><div class="col-lg-6 product-gallery"><img src="${t.image}" alt="${t.name}" class="mb-3" id="mainTourImage"><div class="row g-2">${thumbs.length>1?thumbs.map((src,i)=>`<div class="col-4"><img src="${src}" alt="Фото ${i+1}: ${t.name}" class="tour-thumb" data-image="${src}" style="cursor:pointer"></div>`).join(''):''}</div></div>
 <div class="col-lg-6"><span class="badge-region">${t.region} · ${t.city}</span><h1 class="mt-2 mb-3">${t.name}</h1><div class="stars mb-2">★★★★★ <span class="text-muted small">${t.rating} · Рейтинг тура</span></div><p class="lead">${t.description}</p><ul class="list-unstyled mb-3">${t.features.map(x=>`<li><i class="bi bi-check-circle-fill text-success me-2"></i>${x}</li>`).join('')}</ul><div class="detail-price mb-3">${t.oldPrice?`<del class="fs-5 text-muted me-2">${window.formatPrice(t.oldPrice)}</del>`:''}${window.formatPrice(t.price)} <small class="fs-6 text-muted">/ чел.</small></div>
 <div class="row g-3 mb-4"><div class="col-sm-6" style="max-width:240px"><label class="form-label small" for="tourDate">Дата заезда</label><input id="tourDate" name="tourDate" type="date" class="form-control"><div class="form-text">Выберите дату начала поездки.</div></div><div class="col-sm-6" style="max-width:200px"><label class="form-label small" for="tourQuantity">Количество путёвок</label><input id="tourQuantity" name="tourQuantity" type="number" class="form-control" min="1" max="20" step="1" value="1"><div class="form-text">От 1 до 20 путёвок.</div></div></div>
 <button class="btn btn-accent btn-lg me-2" data-add-to-cart data-tour-id="${t.id}"><i class="bi bi-cart-plus"></i> В корзину</button><a href="contacts.html" class="btn btn-outline-primary btn-lg">Заказать звонок</a></div></div>
 <section class="mt-5"><h2 class="section-title">Описание тура</h2><p>${t.description}</p><h3>Что входит в стоимость</h3><ul>${t.features.map(x=>`<li>${x}</li>`).join('')}</ul></section>`;
 root.querySelectorAll('.tour-thumb').forEach(img=>img.addEventListener('click',()=>{root.querySelector('#mainTourImage').src=img.dataset.image}));
 const date=root.querySelector('[name="tourDate"]');if(date){const d=new Date();d.setDate(d.getDate()+1);date.min=d.toISOString().slice(0,10)}
});
