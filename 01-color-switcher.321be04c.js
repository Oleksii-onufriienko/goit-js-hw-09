!function(){var t=null,o={buttonStart:document.querySelector("button[data-start]"),buttonStop:document.querySelector("button[data-stop]"),body:document.querySelector("body")};o.buttonStart.addEventListener("click",(function(){t||(t=setInterval((function(){o.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),o.buttonStart.disabled=!0)})),o.buttonStop.addEventListener("click",(function(){clearInterval(t),t=null,o.buttonStart.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.321be04c.js.map
