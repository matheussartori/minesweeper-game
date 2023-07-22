import readline from 'readline'

interface TerminalDisplayParams {
  cols: number
  rows: number
  fog: Array<Array<number | string>>
}

export function displayTerminalBoard ({ cols, rows, fog }: TerminalDisplayParams): void {
  console.log('  ' + [...Array(cols).keys()].join(' '))
  for (let row = 0; row < rows; row++) {
    console.log(`${row} ${fog[row].join(' ')}`)
  }
}

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

export async function getInput (question: string): Promise<string> {
  return await new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

export async function getValidInput (question: string, max: number): Promise<number> {
  while (true) {
    const input = await getInput(question)
    const numberInput = parseInt(input)

    if (Number.isNaN(numberInput) || numberInput < 0 || numberInput > (max - 1)) {
      console.clear()
      console.log('Invalid input. Please enter a valid number.')
    } else {
      return numberInput
    }
  }
}
