import{S as m}from"./assets/vendor-CWwQENHe.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const d="46065548-5ae4334dfe4b7f7d37f4bc842",h="https://pixabay.com/api/";function p(o,r=1,n=12){const i=`${h}?key=${d}&q=${encodeURIComponent(o)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${n}&page=${r}`;return fetch(i).then(e=>{if(!e.ok)throw new Error("Failed to fetch images");return e.json()}).catch(e=>{throw console.error("Error fetching images:",e),e})}const f=document.querySelector(".gallery");function g(o){const r=o.map(n=>y(n)).join("");f.insertAdjacentHTML("beforeend",r),$()}function y({webformatURL:o,largeImageURL:r,tags:n,likes:i,views:e,comments:t,downloads:s}){return`
    <a href="${r}" class="gallery__item">
      <img src="${o}" alt="${n}" loading="lazy" class="gallery__image" />
      <div class="info">
        <p><b>Likes:</b> ${i}</p>
        <p><b>Views:</b> ${e}</p>
        <p><b>Comments:</b> ${t}</p>
        <p><b>Downloads:</b> ${s}</p>
      </div>
    </a>
  `}function b(){f.innerHTML=""}function a(o){iziToast.error({title:"Error",message:o})}let c;function $(){c?c.refresh():c=new m(".gallery a")}const L=document.querySelector("#search-form"),E=document.querySelector('input[name="searchQuery"]');let u=1,l="";L.addEventListener("submit",P);function P(o){if(o.preventDefault(),l=E.value.trim(),!l){a("Please enter a search query.");return}b(),u=1,p(l,u).then(r=>{if(r.hits.length===0){a("Sorry, there are no images matching your search query. Please try again!"),loadMoreBtn.style.display="none";return}g(r.hits),loadMoreBtn.style.display=r.hits.length<12?"none":"block"}).catch(r=>{a("Failed to fetch images. Please try again later.")})}
//# sourceMappingURL=index.js.map
