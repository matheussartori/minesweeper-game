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

    return gameEnded
  }

  getGameState (): MinesweeperParams {
    return this.game.getMinesweeperState()
  }

  getBoardState (): GetBoardParams {
    return this.game.getBoardState()
  }
}
