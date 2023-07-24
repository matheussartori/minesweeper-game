import { type PaintOutputProviderParams } from '../dtos/paint-output-provider-params'

export interface PaintOutputProviderModel {
  paint: (params: PaintOutputProviderParams) => string
}
