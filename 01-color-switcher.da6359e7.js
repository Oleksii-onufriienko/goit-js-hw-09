let t=null;const o={buttonStart:document.querySelector("button[data-start]"),buttonStop:document.querySelector("button[data-stop]"),body:document.querySelector("body")};function e(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}o.buttonStart.addEventListener("click",(()=>{t||(o.body.style.backgroundColor=e(),t=setInterval((()=>{o.body.style.backgroundColor=e()}),1e3),o.buttonStart.disabled=!0)})),o.buttonStop.addEventListener("click",(()=>{clearInterval(t),t=null,o.buttonStart.disabled=!1}));
//# sourceMappingURL=01-color-switcher.da6359e7.js.map
