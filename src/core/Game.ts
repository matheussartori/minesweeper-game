import {
  type GetBoardParams,
  type MinesweeperParams,
  Minesweeper
} from './Minesweeper'

export class Game {
  private readonly game: Minesweeper

  constructor () {
    this.game = new Minesweeper()
  }

  playRound (row: number, col: number): boolean {
    const gameEnded = this.game.revealCell(row, col)
    this.game.getBoardState()
    return gameEnded || false
  }

  gameData (): MinesweeperParams {
    return this.game.getMinesweeperState()
  }

  displayBoard (): GetBoardParams {
    return this.game.getBoardState()
  }
}
