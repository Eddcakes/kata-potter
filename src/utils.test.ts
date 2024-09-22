import { describe, expect, it } from "vitest";
import { Basket, calculateTotal } from "./utils";

// 1: 1,
// 2: 0.95,
// 3: 0.9,
// 4: 0.8,
// 5: 0.75,

const baskets = [
  { basket: { book1: 1 }, expected: 8 },
  { basket: { book2: 1, book3: 3 }, expected: 31.2 }, // 2*8 * 0.95 + 2*8
  { basket: { book1: 2, book2: 2, book3: 2, book4: 1 }, expected: 47.2 }, // 4*8 * 0.8  3* 8 * 0.9
  {
    basket: { book1: 5, book2: 5, book3: 6, book4: 5, book5: 3 },
    expected: 149.2,
  }, // 5*3 * 8 * 0.75 [90] 2*4 * 8 * 0.8 [51.2] + 8
];

describe("calculateTotal", () => {
  baskets.forEach(({ basket, expected }) => {
    it(`calculates the total for ${JSON.stringify(basket)} correctly`, () => {
      expect(calculateTotal(basket as Basket)).toBe(expected);
    });
  });
});
