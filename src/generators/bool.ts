import { IRandom } from "../../lib/random";

export const bool = () => (rand: IRandom): boolean => {
  return rand.bool();
};