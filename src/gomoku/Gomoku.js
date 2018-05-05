class Gomoku {
  blackOrWhite = true;
  constructor({debug = true} = {}) {
    this.generateBoard();
  }
  generateBoard() {
    this.board = new Array(15).fill(null).map(() => {
      return new Array(15).fill(null);
    });
  }
  nextTurn({row, col}) {
    let validMove = false;
    if (this.board[row][col] == null) {
      this.board[row][col] = this.blackOrWhite;
      this.blackOrWhite = !this.blackOrWhite;
      validMove = true;
    }
    this.debug && this.prettyPrint();
    return {
      validMove,
      winner: this.checkWinner()
    }
  }
  prettyPrint() {
    for (let row of this.board) {
      const line = row.map(item => {
        switch (item) {
          case null:
            return '-';
          case true:
            return 'O';
          case false:
            return 'X';
        }
      }).join(' ');
      console.log(line);
    }
  }
  checkWinnerByRow() {
    for (let i = 0; i < 15; i++) {
      let currentPlayer = null;
      let continuousCount = 0;
      for (let j = 0; j < 15; j++) {
        const cell = this.board[i][j]
        if (cell == null) {
          currentPlayer = null;
          continuousCount = 0;
        } else if (cell !== currentPlayer) {
          currentPlayer = cell;
          continuousCount = 1;
        } else {
          continuousCount++;
        }
        if (continuousCount >= 5) {
          return currentPlayer ? 'black' : 'white';
        }
      }
    }
    return false;
  }
  checkWinnerByCol() {
    for (let i = 0; i < 15; i++) {
      let currentPlayer = null;
      let continuousCount = 0;
      for (let j = 0; j < 15; j++) {
        const cell = this.board[j][i];
        if (cell == null) {
          currentPlayer = null;
          continuousCount = 0;
        } else if (cell !== currentPlayer) {
          currentPlayer = cell
          continuousCount = 1;
        } else {
          continuousCount++;
        }
        if (continuousCount >= 5) {
          return currentPlayer ? 'black' : 'white';
        }
      }
    }
    return false;
  }
  checkWinnerByMainDiag() {
    for (let i = -14; i <= 14; i++) {
      let currentPlayer = null;
      let continuousCount = 0;
      const initialRowNum = Math.max(0, i);
      const initialColNum = initialRowNum - i;
      for (let j = 0; j <= 14 - Math.abs(i); j++) {
        const cell = this.board[initialRowNum + j][initialColNum + j];
        if (cell == null) {
          currentPlayer = null;
          continuousCount = 0;
        } else if (cell !== currentPlayer) {
          currentPlayer = cell
          continuousCount = 1;
        } else {
          continuousCount++;
        }
        if (continuousCount >= 5) {
          return currentPlayer ? 'black' : 'white';
        }
      }
    }
    return false;
  }
  checkWinnerByAntiDiag() {
    for (let i = -14; i <= 14; i++) {
      let currentPlayer = null;
      let continuousCount = 0;
      const initialRowNum = Math.max(0, i);
      const initialColNum = Math.min(14, 14 + i);
      for (let j = 0; j <= 14 - Math.abs(i); j++) {
        const cell = this.board[initialRowNum + j][initialColNum - j];
        if (cell == null) {
          currentPlayer = null;
          continuousCount = 0;
        } else if (cell !== currentPlayer) {
          currentPlayer = cell
          continuousCount = 1;
        } else {
          continuousCount++;
        }
        if (continuousCount >= 5) {
          return currentPlayer ? 'black' : 'white';
        }
      }
    }
    return false;
  }
  checkWinner() {
    return (
      this.checkWinnerByRow() ||
      this.checkWinnerByCol() ||
      this.checkWinnerByMainDiag() ||
      this.checkWinnerByAntiDiag()
    );
  }
}

export default Gomoku;
