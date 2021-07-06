import isObject from "is-object";
import { IRandom } from "../../lib/random";
import { TTemplate, TBuiltTemplate, TGenerator, TGeneratorValues } from "../../types/template";

export const getTemplGen = (rand: IRandom) => async (val: TTemplate | TGenerator): Promise<TGeneratorValues | TBuiltTemplate> => {

  if (!isObject(val)) {
    const gen = val as TGenerator;

    if (typeof gen === "function") {
      return await gen(rand);
    } else {
      return gen;
    }
  }

  const retObj: TBuiltTemplate = {};


  for (const [key, v] of Object.entries(val as TTemplate)) {
    if (isObject(val)) {
      retObj[key] = await genDoc(rand)(v as TTemplate);
    } else {
      const gen = val as TGenerator;

      if (typeof gen === "function") {
        retObj[key] = await gen(rand);
      } else {
        retObj[key] = gen;
      }
    }
  }

  return retObj;

};

export const genDoc = (rand: IRandom) => async (obj: TTemplate): Promise<TBuiltTemplate> => {
  return await getTemplGen(rand)(obj) as TBuiltTemplate;
};