import { promises as fs } from "fs";
import fse from "fs-extra";
import { dbRoot } from "./config";
import * as path from "path";
import slugify from "slugify";
import { ICollectionSetting } from "../types/collection";
import { TTemplate } from "../types/template";
import { IRandom, random, TRange } from "../lib/random";
import { genDoc } from "./templating/generate";
import isFunction from "is-function";


interface ICollectionOptions {
  name: string,
  amount: TRange,
  version: string,
  template: TTemplate | ((rand: IRandom) => TTemplate | Promise<TTemplate>)
}

/**
 * Gets the path to collection conf file
 * @param name The name of the collection
 * @returns The path
 */
export const getColFile = (name: string): string => path.resolve(dbRoot, slugify(name, { lower: true }) + ".json");

export const buildCollection = async (seed: string, options: ICollectionOptions): Promise<true> => {
  const rand = random(seed);

  const data = JSON.stringify({
    name: options.name,
    seed
  });

  await fse.ensureDir(dbRoot);

  const colDir = path.resolve(dbRoot, slugify(options.name, { lower: true }));

  await fs.writeFile(getColFile(options.name), data);
  await fse.ensureDir(colDir);


  const indexs = Array.from(new Array(rand.range(options.amount)).fill(0).keys());

  const writes = [];

  for (const index of indexs) {
    const templ = isFunction(options.template) ?
      await (options.template as (rand: IRandom) => (Promise<TTemplate> | TTemplate))(rand) :
      (options.template as TTemplate);

    const doc = await genDoc(rand)(templ);

    writes.push(fs.writeFile(path.resolve(colDir, index + ".json"), JSON.stringify(doc)));

  }

  await Promise.all(writes);

  return true;
};


/**
 * Generates a collection from a seed
 * @param seed Seed to use for random
 * @returns The collection generator
 */
export const collection = async (options: ICollectionOptions): undefined => {
  await fse.ensureDir(dbRoot);

  // Check if DB is already built
  const build: null | ICollectionSetting = await fs.readFile(getColFile(options.name), "utf-8").then(val => JSON.parse(val)).catch(() => null);

  const seed = options.version;

  if (!build) {
    await buildCollection(seed, options);
  } else if (build.seed !== seed) {
    await buildCollection(seed, options);
  }

};