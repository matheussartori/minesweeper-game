import { type PaintOutputProviderModel } from '../providers/paint-output-provider/model/paint-output-provider-model'
import { displayTerminalBoard, getValidInput, rl } from './utils'
import { Game } from '../../../core/src/core/Game'

export class GameTerminal {
  private readonly game: Game

  constructor (
    private readonly paintOutputProvider: PaintOutputProviderModel
  ) {
    this.game = new Game()
  }

  public async start (): Promise<void> {
    console.clear()
    const bluePaint = (output: any): string => this.paintOutputProvider.paint({ color: '#70c2fb', output })
    const magentaPaint = (output: any): string => this.paintOutputProvider.paint({ color: '#f170c0', output })

    while (true) {
      displayTerminalBoard(this.game.getBoardState())

      const row = await getValidInput(`Enter the ${bluePaint('row')} number (${bluePaint('0')}-${bluePaint(this.game.getGameState().rows - 1)}): `, this.game.getGameState().rows)
      const col = await getValidInput(`Enter the ${magentaPaint('col')} number (${magentaPaint('0')}-${magentaPaint(this.game.getGameState().cols - 1)}): `, this.game.getGameState().cols)

      console.clear()

      const gameEnded = this.game.playRound(row, col)

      if (gameEnded) {
        displayTerminalBoard(this.game.getBoardState())
        break
      }
    }

    rl.close()
  }
}
