import { IRandom, TRange } from "../../lib/random";

export interface IStringOptions {
    letters?: string,
    length: TRange,
    casing?: "mixed" | "upper" | "lower",
}

export const string = (options: IStringOptions) => (rand: IRandom): string => {

    const defOptions: IStringOptions = {
        letters: "abcdefghijklmnopqrstuvwxyz",
        length: 10,
        casing: "mixed",
    };

    // TODO Add casing
    //const casing = options.casing ?? defOptions.letters as string;

    const letters = (options.letters ?? defOptions.letters as string);

    let length = rand.range(options.length);


    let str = "";
    while(length) {

        str += letters[rand.int(0, letters.length - 1)];

        length--;
    }

    return str;
};