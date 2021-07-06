import isObject from "is-object";
import isFunction from "is-function";
import { IRandom, TRange } from "../../lib/random";
import { TGenerator, TGeneratorFunction, TGeneratorValues, TTemplate } from "../../types/template";
import { genDoc } from "../templating/generate";

export interface IArrayOptions {
  length: TRange,
  item: TGenerator | TTemplate
}

export const array = (options: IArrayOptions) => async (rand: IRandom): Promise<TGeneratorValues[]> => {

  const length = rand.range(options.length);

  const ret = [];

  for (let i = 0; i < length; i++) {

    if (isObject(options.item)) {
      ret.push(await genDoc(rand)(options.item as TTemplate));
    } else {
      const gen = options.item as TGenerator;

      if(isFunction(gen)) {
        ret.push(await (gen as TGeneratorFunction)(rand));
      } else {
        ret.push(gen as TGeneratorValues);
      }

    }

  }

  return ret;
};