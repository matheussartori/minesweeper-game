import { Game } from './core/Game'
import { displayTerminalBoard, getValidInput, rl } from './utils'

console.clear()
const game = new Game()

async function main (): Promise<void> {
  while (true) {
    displayTerminalBoard(game.getBoardState())

    const row = await getValidInput(`Enter the row number (0-${game.getGameState().rows - 1}): `, game.getGameState().rows)
    const col = await getValidInput(`Enter the col number (0-${game.getGameState().cols - 1}): `, game.getGameState().cols)

    console.clear()

    const gameEnded = game.playRound(row, col)

    if (gameEnded) {
      displayTerminalBoard(game.getBoardState())
      break
    }
  }

  rl.close()
}

void main()
