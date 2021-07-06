import { TGenerator } from "../../types/template";
import { resolve } from "path";
import fs from "fs";
import { IRandom } from "../../lib/random";

const firstNames = fs.readFileSync(resolve(__dirname, "../../data/first-names.txt"), "utf-8").split("\n");
const lastNames = fs.readFileSync(resolve(__dirname, "../../data/last-names.txt"), "utf-8").split("\n");

export const firstName = () => (rand: IRandom): string => {
  return lastNames[rand.int(0, lastNames.length - 1)];
};

export const lastName = () => (rand: IRandom): string => {
  return firstNames[rand.int(0, firstNames.length - 1)];
};

export const name = (): TGenerator => (rand): string => {
  return `${firstName()(rand)} ${lastName()(rand)}`;
};

