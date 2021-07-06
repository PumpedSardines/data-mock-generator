import { IRandom } from "../../lib/random";
import { TGenerator, TGeneratorValues, TTemplate } from "../../types/template";
import { getTemplGen } from "../templating/generate";

export const oneOf = (elements: (TGenerator | TTemplate)[]) => async (rand: IRandom): Promise<TGeneratorValues | TTemplate> => {
  return await getTemplGen(rand)(rand.options(elements));
};