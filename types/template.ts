import { IRandom } from "../lib/random";


export type TGeneratorValues = boolean | string | number | TBuiltTemplate | TGeneratorValues[]

export type TGeneratorFunction = (rand: IRandom) => (Promise<TGeneratorValues> | TGeneratorValues)

export type TGenerator = TGeneratorFunction | TGeneratorValues
export type TTemplate = { [key: string]: TGenerator | TTemplate }
export type TBuiltTemplate = { [key: string]: unknown | TBuiltTemplate }
