const TIME_DELAY = 1000;
let idFunctionInterval = null;

const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.buttonStart.addEventListener('click', () => {
  if (idFunctionInterval) {
    return;
  }

  idFunctionInterval = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, TIME_DELAY);
  refs.buttonStart.disabled = true;
});

refs.buttonStop.addEventListener('click', () => {
  clearInterval(idFunctionInterval);
  idFunctionInterval = null;
  refs.buttonStart.disabled = false;
});
