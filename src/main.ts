import { Game } from './core/Game'
import { displayTerminalBoard, getValidInput, rl } from './utils'

console.clear()
const game = new Game()

async function main (): Promise<void> {
  while (true) {
    displayTerminalBoard(game.displayBoard())

    const row = await getValidInput(`Enter the row number (0-${game.gameData().rows - 1}): `, game.gameData().rows)
    const col = await getValidInput(`Enter the col number (0-${game.gameData().cols - 1}): `, game.gameData().cols)

    console.clear()

    const gameEnded = game.playRound(row, col)

    if (gameEnded) {
      displayTerminalBoard(game.displayBoard())
      break
    }
  }

  rl.close()
}

void main()
