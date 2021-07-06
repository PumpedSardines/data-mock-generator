export { collection } from "./src/collection";

import { name } from "./src/generators/name";
import { string } from "./src/generators/string";
import { array } from "./src/generators/array";
import { email } from "./src/generators/email";
import { bool } from "./src/generators/bool";
import { oneOf } from "./src/generators/one-of";

export const types = {
  string,
  name,
  array,
  email,
  bool,
  oneOf
};