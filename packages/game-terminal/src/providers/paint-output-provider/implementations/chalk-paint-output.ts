import chalk from 'chalk'
import { type PaintOutputProviderParams } from '../dtos/paint-output-provider-params'
import { type PaintOutputProviderModel } from '../model/paint-output-provider-model'

export class ChalkPaintOutput implements PaintOutputProviderModel {
  paint ({ color, output }: PaintOutputProviderParams): string {
    const painter = chalk.hex(color)
    return painter(output)
  }
}
