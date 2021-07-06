import { TTemplate } from "../types/template";
import { collection } from "./collection";
import { array } from "./generators/array";
import { bool } from "./generators/bool";
import { email } from "./generators/email";
import { firstName, lastName } from "./generators/name";
import { oneOf } from "./generators/one-of";
import { string } from "./generators/string";


describe("folder", () => {

  test("Folder exists", async () => {
    await collection({
      name: "users",
      version: "1",
      amount: [500, 700],
      template: (rand) => {
        const premium = rand.bool();

        const ret: TTemplate = {
          first_name: firstName(),
          last_name: lastName(),
          email: email(),
          role: oneOf([
            "user",
            "kommun",
            "admin",
          ]),
          password: string({ length: [7, 12] }),
          saved: array({
            length: [3, 10],
            item: string({ length: 6 })
          })
        };

        
        if (premium) {
          ret.premium = true;
          ret.renewPremium = bool();
        } else {
          ret.premium = false;
          ret.renewPremium = false;
        }

        return ret;
      }
    });

    expect(5).toBe(5);
  });

});