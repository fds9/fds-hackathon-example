import FifteenPuzzle from './FifteenPuzzle';

const game = new FifteenPuzzle({
  // board: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, null, 15]
});
const colEls = document.querySelectorAll('.col');
const totalMovesEl = document.querySelector('.total-moves');

function draw({clear = false, totalMoves = 0} = {}) {
  totalMovesEl.textContent = (
    clear ?
    `게임 종료! 움직인 횟수: ${totalMoves}` :
    `움직인 횟수: ${totalMoves}`
  );
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
    draw(game.nextTurn(index));
  });
});

draw();
