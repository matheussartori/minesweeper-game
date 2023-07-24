import { GameTerminal } from './core/GameTerminal'
import { ChalkPaintOutput } from './providers/paint-output-provider/implementations/chalk-paint-output'

async function main (): Promise<void> {
  const chalkPaintOutput = new ChalkPaintOutput()

  const gameTerminal = new GameTerminal(chalkPaintOutput)
  void gameTerminal.start()
}

void main()
