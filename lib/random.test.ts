import { random } from "./random";

test("Same seed", () => {

    /**
     * Since this test is testing random, it sometimes fails, however it should pass 99% of the time.
     */

    const seeds = new Array(10).fill(0).map(_ => Math.random() + "");



    for (const seed of seeds) {
        const int = random(seed).int(-10000, 10000);
        const float = random(seed).float(-10000, 10000);

        expect(int % 1).toBeOneOf([0, -0]);
        expect(int).toBe(random(seed).int(-10000, 10000));



        expect(float).toBe(random(seed).float(-10000, 10000));
        expect(float % 1).not.toBeOneOf([0, -0]); // There's a slim chance that this won't pass, but it should for 99% of tests


    }

    const rand = random(Math.random() + "");
    const floats: number[] = [];
    const ints: number[] = [];

    for (const _ of new Array(10)) {
        const int = rand.int(-10000, 10000);
        const float = rand.float(-10000, 10000);

        expect(ints.includes(int)).toBe(false);
        expect(floats.includes(int)).toBe(false);

        ints.push(int);
        floats.push(float);
    }



});