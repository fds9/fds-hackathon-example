import Gomoku from './Gomoku';

const game = new Gomoku({debug: false});
const rowEls = document.querySelectorAll('.row');
const winnerEl = document.querySelector('.winner');

function draw() {
  rowEls.forEach((rowEl, rowIndex) => {
    rowEl.querySelectorAll('.col').forEach((colEl, colIndex) => {
      switch (game.board[rowIndex][colIndex]) {
        case true:
          colEl.classList.add('black');
          break;
        case false:
          colEl.classList.add('white');
          break;
      }
    });
  });
}

rowEls.forEach((rowEl, rowIndex) => {
  const colEls = rowEl.querySelectorAll('.col');
  colEls.forEach((colEl, colIndex) => {
    colEl.addEventListener('click', e => {
      const {validMove, winner} = game.nextTurn({row: rowIndex, col: colIndex});
      if (validMove) {
        draw();
      }
      if (winner) {
        winnerEl.textContent = `승자: ${winner}`;
      }
    })
  })
})
