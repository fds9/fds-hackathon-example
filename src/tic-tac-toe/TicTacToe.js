const CROSS = 'CROSS';
const CIRCLE = 'CIRCLE';

class TicTacToe {
  player = CROSS;
  board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];
  winner = null;
  nextTurn({row, col}) {
    let validMove = false;
    if (!this.winner && this.board[row][col] == null) {
      validMove = true;
      this.board[row][col] = this.player;
      this.player = this.player === CROSS ? CIRCLE : CROSS;
      this.winner = this.checkWinner();
    }
    this.prettyPrint();
    return {
      validMove: validMove,
      winner: this.winner
    };
  }
  checkWinner() {
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] != null &&
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2]
      ) {
        return this.board[i][0];
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        this.board[0][i] != null &&
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i]
      ) {
        return this.board[0][i];
      }
    }
    if (
      this.board[0][0] != null &&
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2]
    ) {
      return this.board[0][0];
    }
    if (
      this.board[0][2] != null &&
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0]
    ) {
      return this.board[0][2];
    }
    return null;
  }
  prettyPrint() {
    for (let row of this.board) {
      console.log(row.map(player => {
        switch (player) {
          case CROSS:
            return 'X';
          case CIRCLE:
            return 'O';
          default:
            return '-';
        }
      }).join(' '));
    }
  }
}
