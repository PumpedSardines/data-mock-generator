import { create } from "random-seed";

export interface IRandom {
  int: (min: number, max: number) => number
  float: (min: number, max: number) => number
  range: (range: TRange) => number,
  bool: () => boolean,
  options: <T>(elements: T[]) => T
}
export type TRange = [number, number] | number;

export const random = (seed: string): IRandom => {
  const rand = create(seed);

  return {
    int: rand.intBetween,
    float: rand.floatBetween,
    range: function (range: TRange, float = false) {
      if (typeof range === "number") {
        return range;
      } else {
        return this[float ? "float" : "int"](range[0], range[1]);
      }
    },
    bool: function () {
      return !!this.int(0, 1);
    },
    options: function <T>(elements: T[]): T {
      return elements[this.int(0, elements.length - 1)];
    }
  };

};
