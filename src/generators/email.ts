import { TGenerator } from "../../types/template";
import { string } from "./string";

const topLevelDomains = [
  "com",
  "net",
  "org",
];

export const email = (): TGenerator => (rand): string => {

  const firstPart = string({
    length: [5, 10]
  })(rand);

  const secondPart = string({
    length: [5, 10]
  })(rand);

  const thirdPart = topLevelDomains[rand.int(0, topLevelDomains.length - 1)];

  return `${firstPart}@${secondPart}.${thirdPart}`;
};