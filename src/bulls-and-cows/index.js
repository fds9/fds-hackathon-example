import BullsAndCows from './BullsAndCows';

const inputBoxEl = document.querySelector('.input-box');
const tryButtonEl = document.querySelector('.input-box__try');
const digitInputEls = document.querySelectorAll('.input-box__digit');
const turnListEl = document.querySelector('.turn-list');
const resetButtonEl = document.querySelector('.reset-button');
const answerEl = document.querySelector('.answer');

let game = new BullsAndCows();

digitInputEls.forEach((el, index) => {
  el.addEventListener('keypress', e => {
    // FIXME: 한글 입력시 적용 안됨
    e.preventDefault();
    if (!/\d/.test(e.key)) {
      return;
    }
    el.value = e.key;
    if (digitInputEls[index + 1]) {
      digitInputEls[index + 1].focus();
    } else {
      tryButtonEl.focus();
    }
  });
});

inputBoxEl.addEventListener('submit', e => {
  e.preventDefault();
  const digits = Array.from(digitInputEls).map(el => el.value);
  const turnResultEl = document.createElement('div');
  const turnResult = game.nextTurn(digits);
  turnResultEl.textContent = digits.join() + ' : ' + JSON.stringify(turnResult); // FIXME
  turnListEl.appendChild(turnResultEl);
  if (turnResult.clear || turnResult.fail) {
    answerEl.textContent = game._answerDigits.join();
    tryButtonEl.setAttribute('disabled', '');
    resetButtonEl.focus();
  } else {
    digitInputEls[0].focus();
  }
});

resetButtonEl.addEventListener('click', e => {
  game = new BullsAndCows();
  digitInputEls.forEach(el => {
    el.value = '';
  })
  turnListEl.textContent = '';
  digitInputEls[0].focus();
  answerEl.textContent = '';
  tryButtonEl.removeAttribute('disabled');
})

/* FIXME */
window.Game = BullsAndCows;
digitInputEls[0].focus();
