import FifteenPuzzle from './FifteenPuzzle';

const game = new FifteenPuzzle();
const colEls = document.querySelectorAll('.col');

function draw() {
  game.board.forEach((item, index) => {
    colEls[index].textContent = item == null ? 'X' : item;
    if (item == null) {
      colEls[index].classList.add('col--blank');
    }
  });
}

colEls.forEach((el, index) => {
  el.addEventListener('click', e => {
    colEls.forEach(el => {
      el.classList.remove('col--blank');
    })
    console.log(game.nextTurn(index));
    draw();
  });
});

draw();
