(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}var r,o={baseUrl:"https://nomoreparties.co/v1/wff-cohort-31",headers:{authorization:"2cd377c0-3859-41d5-99fa-922ec3473d0e","Content-Type":"application/json"}};function c(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}function a(e,t,n,r,o,c,a,i){var u=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),l=u.querySelector(".card__image"),s=u.querySelector(".card__likes"),d=e.link,p=e.name;l.src=e.link,l.alt=e.name,s.textContent=o,u.querySelector(".card__title").textContent=e.name;var f=u.querySelector(".card__delete-button"),_=u.querySelector(".card__like-button"),y=e.likes;return console.log(y),y.forEach((function(e){e._id===i&&_.classList.add("card__like-button_is-active")})),l.addEventListener("click",(function(){r(d,p)})),_.addEventListener("click",(function(){n(_,s,a)})),c?t(u,a):f.classList.add("card__delete-button-disabled"),u}function i(e,t){deleteButton.addEventListener("click",(function(){(function(e){return fetch("".concat(o.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:o.headers,body:JSON.stringify({id:e})}).then(c)})(t).then((function(){e.remove()})).catch((function(e){return console.log(e)}))}))}function u(e,t,n){e.classList.toggle("card__like-button_is-active")?function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:o.headers,body:JSON.stringify({id:e})}).then(c)}(n).then((function(e){t.textContent=e.likes.length})).catch((function(e){return console.log(e)})):function(e){return fetch("".concat(o.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:o.headers,body:JSON.stringify({id:e})}).then(c)}(n).then((function(e){t.textContent=e.likes.length})).catch((function(e){return console.log(e)}))}function l(e,t){var n=e.querySelectorAll(t.inputSelector),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){d(n,e.querySelector("#".concat(n.id,"-error")),t)})),r.classList.add(t.inactiveButtonClass),r.disabled=!0}function s(e){var t=e.dataset.errorMessage,n=document.getElementById("".concat(e.id,"-error"));return e.validity.patternMismatch?(n.textContent=t,n.classList.add("popup__error_visible"),!1):(n.textContent="",n.classList.remove("popup__error_visible"),!0)}function d(e,t,n){e.classList.remove(n.inputErrorClass),t.textContent="",t.classList.remove(n.errorClass)}function p(e,t,n){Array.from(e).some((function(e){return!e.validity.valid||!s(e)}))?(t.classList.add(n.inactiveButtonClass),t.disabled=!0):(t.classList.remove(n.inactiveButtonClass),t.disabled=!1)}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function _(t,n){T.src=t,j.alt=n,j.textContent=n,e(B)}var y={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},m=document.querySelector(".profile__title"),v=document.querySelector(".profile__description"),h=document.querySelector(".profile__image"),S=document.querySelector(".profile__edit-button"),b=document.querySelector(".popup_type_edit"),q=b.querySelector(".popup__close"),g=b.querySelector(".popup__input_type_name"),C=b.querySelector(".popup__input_type_description"),E=b.querySelector(".popup__form"),L=document.querySelector(".places__list"),k=document.querySelector(".profile__add-button"),x=document.querySelector(".popup_type_new-card"),A=x.querySelector(".popup__close"),U=x.querySelector(".popup__form"),O=x.querySelector(".popup__input_type_card-name"),w=x.querySelector(".popup__input_type_url"),B=document.querySelector(".popup_type_image"),T=B.querySelector(".popup__image"),j=B.querySelector(".popup__caption"),N=B.querySelector(".popup__close"),I=document.querySelectorAll(".popup"),J=document.querySelector(".popup_type_avatar-edit"),M=document.querySelector(".profile__image"),P=J.querySelector(".popup__close"),D=J.querySelector(".popup__input"),H=J.querySelector(".popup__form");E.addEventListener("submit",(function(e){!function(e){e.preventDefault();var n=e.target.querySelector(".popup__button"),r=n.textContent;n.textContent="Сохранение...";var a,i,u=g.value,l=C.value;(a=u,i=l,fetch("".concat(o.baseUrl,"/users/me"),{method:"PATCH",headers:o.headers,body:JSON.stringify({name:a,about:i})}).then(c)).then((function(){v.textContent=l,m.textContent=u,t(b)})).catch((function(e){console.error(e)})).finally((function(){n.textContent=r}))}(e)})),H.addEventListener("submit",(function(e){e.preventDefault();var n=e.target.querySelector(".popup__button"),r=n.textContent;n.textContent="Сохранение...";var a=D.value;h.style.backgroundImage="url(".concat(a,")"),function(e){return fetch("".concat(o.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:o.headers,body:JSON.stringify({avatar:e})}).then(c)}(a).then((function(){return t(J)})).catch((function(e){return console.error(e)})).finally((function(){n.textContent=r}))})),S.addEventListener("click",(function(){g.value=m.textContent,C.value=v.textContent,l(E,y),e(b)})),q.addEventListener("click",(function(){t(b)})),N.addEventListener("click",(function(){t(B)})),k.addEventListener("click",(function(){l(U,y),e(x)})),A.addEventListener("click",(function(){t(x)})),U.addEventListener("submit",(function(e){e.preventDefault();var n,l=e.target.querySelector(".popup__button"),s=l.textContent;l.textContent="Создание...",(n={name:O.value,link:w.value},fetch("".concat(o.baseUrl,"/cards"),{method:"POST",headers:o.headers,body:JSON.stringify(n)}).then(c)).then((function(n){var o=a(n,i,u,_,n.likes.length,n.owner._id,n._id,r);L.prepend(o),t(x),e.target.reset()})).catch((function(e){return console.error(e)})).finally((function(){l.textContent=s}))})),M.addEventListener("click",(function(){e(J)})),P.addEventListener("click",(function(){t(J)})),function(e){document.querySelectorAll(e.formSelector).forEach((function(t){!function(e,t){var n=e.querySelectorAll(t.inputSelector),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){var r=e.querySelector("#".concat(t.id,"-error"));t.validity.valid&&s(t)?d(t,r,n):function(e,t,n){e.classList.add(n.inputErrorClass),e.validity.patternMismatch?t.textContent=e.dataset.errorMessage:t.textContent=e.validationMessage,t.classList.add(n.errorClass)}(t,r,n)}(e,o,t),p(n,r,t)}))})),p(n,r,t)}(t,e)}))}(y),I.forEach((function(e){e.addEventListener("click",(function(n){n.target.classList.contains("popup")&&t(e)}))})),Promise.all([fetch("".concat(o.baseUrl,"/users/me"),{headers:o.headers}).then(c),fetch("".concat(o.baseUrl,"/cards"),{headers:o.headers}).then(c)]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],l=o[1];r=c._id,m.textContent=c.name,v.textContent=c.about,h.style.backgroundImage="url(".concat(c.avatar,")"),l.forEach((function(e){var t,n,o,c,l,s;t=e,n=e.likes.length,o=e.owner._id===r,c=e._id,l=document.querySelector(".places__list"),s=a(t,i,u,_,n,o,c,r),l.appendChild(s)}))})).catch((function(e){console.log(e)}))})();