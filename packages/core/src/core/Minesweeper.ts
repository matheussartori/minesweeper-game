export interface MinesweeperParams {
  rows: number
  cols: number
  mines: number
}

export interface GetBoardParams {
  cols: number
  rows: number
  fog: Array<Array<number | string>>
}

export class Minesweeper {
  private readonly rows: number
  private readonly cols: number
  private readonly minesCount: number

  private readonly board: Array<Array<number | string>>
  private fog: Array<Array<number | string>>

  constructor ({ rows, cols, mines }: MinesweeperParams = { rows: 8, cols: 8, mines: 10 }) {
    this.rows = rows
    this.cols = cols
    this.minesCount = mines

    this.board = new Array(rows).fill(null).map(() => new Array(cols).fill(0))
    this.fog = new Array(rows).fill(null).map(() => new Array(cols).fill('#'))

    this.initializeBoard()
  }

  getMinesweeperState (): MinesweeperParams {
    return {
      rows: this.rows,
      cols: this.cols,
      mines: this.minesCount
    }
  }

  getBoardState (): GetBoardParams {
    return {
      rows: this.rows,
      cols: this.cols,
      fog: this.fog
    }
  }

  initializeBoard (): void {
    for (let i = 0; i < this.minesCount; i++) {
      const row = Math.floor(Math.random() * this.rows)
      const col = Math.floor(Math.random() * this.cols)

      if (this.board[row][col] !== '*') {
        this.board[row][col] = '*'
      } else {
        i--
      }
    }
    this.populateBoardState()
  }

  private populateBoardState (): void {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.board[row][col] !== '*') {
          let count = 0
          for (let r = Math.max(0, row - 1); r <= Math.min(row + 1, this.rows - 1); r++) {
            for (let c = Math.max(0, col - 1); c <= Math.min(col + 1, this.cols - 1); c++) {
              if (this.board[r][c] === '*') {
                count++
              }
            }
          }
          this.board[row][col] = count
        }
      }
    }
  }

  private checkWinCondition (): boolean {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.board[row][col] !== '*' && this.fog[row][col] === '#') {
          return false
        }
      }
    }
    return true
  }

  private checkLostCondition (row: number, col: number): boolean {
    return this.board[row][col] === '*'
  }

  private revealEndGameBoard (): void {
    this.fog = this.board
  }

  revealCell (row: number, col: number): boolean {
    if (this.checkLostCondition(row, col)) {
      console.log('You lost.')
      this.revealEndGameBoard()
      return true
    }

    if (this.fog[row][col] !== '#') {
      return false
    }

    this.fog[row][col] = this.board[row][col].toString()

    if (this.board[row][col] === 0) {
      for (let r = Math.max(0, row - 1); r <= Math.min(row + 1, this.rows - 1); r++) {
        for (let c = Math.max(0, col - 1); c <= Math.min(col + 1, this.cols - 1); c++) {
          this.revealCell(r, c)
        }
      }
    }

    if (this.checkWinCondition()) {
      console.log('You win.')
      this.revealEndGameBoard()
      return true
    }

    return false
  }
}
