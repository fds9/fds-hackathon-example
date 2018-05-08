import TicTacToe, {CROSS, CIRCLE} from './TicTacToe';

const colEls = Array.from(document.querySelectorAll('.board__row')).map(rowEl => {
  return Array.from(rowEl.querySelectorAll('.board__col'));
});
const winnerEl = document.querySelector('.winner');

let game;

function init() {
  game = new TicTacToe({debug: false});
  colEls.forEach(cols => {
    cols.forEach(colEl => {
      colEl.classList.remove('board__col--cross');
      colEl.classList.remove('board__col--circle');
    });
  })
}

function render() {
  game.board.forEach((row, rowIndex) => {
    row.forEach((colPlayer, colIndex) => {
      switch (colPlayer) {
        case CROSS:
          colEls[rowIndex][colIndex].classList.add('board__col--cross');
          break;
        case CIRCLE:
          colEls[rowIndex][colIndex].classList.add('board__col--circle');
          break;
      }
    })
  })
}

colEls.forEach((cols, rowIndex) => {
  cols.forEach((colEl, colIndex) => {
    colEl.addEventListener('click', e => {
      const {winner} = game.nextTurn({row: rowIndex, col: colIndex});
      if (winner) {
        winnerEl.textContent = `승자: ${winner}`;
      }
      render();
    })
  })
})

init();
