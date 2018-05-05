// https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/

function shuffle(arr) {
  const tempArr = arr.slice();
  const newArr = [];
  while (tempArr.length) {
    const randomIndex = Math.floor(Math.random() * tempArr.length);
    newArr.push(...tempArr.splice(randomIndex, 1))
  }
  return newArr;
}

function nudge(arr, index) {
  const newArr = arr.filter(item => item != null);
  newArr.splice(index, 0, null);
  return newArr;
}

function indexToCoord(index) {
  const col = index % 4;
  const row = (index - col) / 4;
  return {row, col};
}

class FifteenPuzzle {
  constructor() {
    this.generateBoard();
  }

  generateBoard() {
    do {
      const arr = new Array(16).fill(0).map((item, index) => index === 0 ? null : index);
      this.board = shuffle(arr);
    } while (!this.isSolvable())
  }

  isSolvable() {
    return (this.rowNumOfBlank % 2) ^ (this.numOfInversion % 2)
  }

  get rowNumOfBlank() {
    return 4 - Math.floor(this.board.indexOf(null) / 4);
  }

  get numOfInversion() {
    let inversionCount = 0;
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i] == null) continue;
      for (let j = i + 1; j < this.board.length; j++) {
        if (this.board[j] == null) continue;
        if (this.board[i] > this.board[j]) {
          inversionCount++;
        }
      }
    }
    return inversionCount;
  }

  nextTurn(index) {
    const blankIndex = this.board.indexOf(null);
    const blankCoord = indexToCoord(blankIndex);
    const targetCoord = indexToCoord(index);
    let moved = false;
    let moves = 0;
    if (blankCoord.row === targetCoord.row) {
      console.log('row change');
      const row = this.getRow(blankCoord.row);
      const newRow = nudge(row, targetCoord.col);
      this.setRow(blankCoord.row, newRow);
      moved = true;
      moves = Math.abs(blankCoord.col - targetCoord.col);
    } else if (blankCoord.col === targetCoord.col) {
      console.log('col change');
      const col = this.getCol(blankCoord.col);
      const newCol = nudge(col, targetCoord.row);
      this.setCol(blankCoord.col, newCol);
      moved = true;
      moves = Math.abs(blankCoord.row - targetCoord.row);
    }
    this.prettyPrint()
    return {
      moved,
      moves,
      clear: this.hasWon()
    };
  }

  getRow(rowNum) {
    const index = rowNum * 4;
    return this.board.slice(index, index + 4);
  }

  getCol(colNum) {
    const indexes = new Array(4).fill(0).map((item, index) => 4 * index + colNum);
    return indexes.map(item => this.board[item]);
  }

  setRow(rowNum, arr) {
    const index = rowNum * 4;
    this.board.splice(index, 4, ...arr);
  }

  setCol(colNum, arr) {
    const indexes = new Array(4).fill(0).map((item, index) => 4 * index + colNum);
    indexes.forEach((item, index) => {
      this.board[item] = arr[index];
    })
  }

  hasWon() {
    return this.board.every((item, index) => item === index + 1 || index === 15);
  }

  prettyPrint() {
    for (let i = 0; i < 4; i++) {
      console.log(this.getRow(i).map(item => {
        const str = item == null ? 'X' : item.toString();
        return str.padEnd(3)
      }).join(''));
    }
  }
}

export default FifteenPuzzle;
