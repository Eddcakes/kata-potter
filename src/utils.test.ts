import { describe, expect, it } from "vitest";
import { calculateTotal } from "./utils";
import { Basket } from "./models";

const baskets = [
  {
    basket: {
      book1: { quantity: 1, price: 8, name: "Potter 1", sku: "book1" },
    },
    expected: 8,
  },
  {
    basket: {
      book2: { quantity: 1, price: 8, name: "Potter 2", sku: "book2" },
      book3: { quantity: 3, price: 8, name: "Potter 3", sku: "book3" },
    },
    expected: 31.2,
  }, // 2*8 * 0.95 + 2*8
  {
    basket: {
      book1: { quantity: 2, price: 8, name: "Potter 1", sku: "book1" },
      book2: { quantity: 2, price: 8, name: "Potter 2", sku: "book2" },
      book3: { quantity: 2, price: 8, name: "Potter 3", sku: "book3" },
      book4: { quantity: 1, price: 8, name: "Potter 4", sku: "book4" },
    },
    expected: 47.2,
  }, // 4*8 * 0.8  3* 8 * 0.9
  {
    basket: {
      book1: { quantity: 5, price: 8, name: "Potter 1", sku: "book1" },
      book2: { quantity: 5, price: 8, name: "Potter 2", sku: "book2" },
      book3: { quantity: 6, price: 8, name: "Potter 3", sku: "book3" },
      book4: { quantity: 5, price: 8, name: "Potter 4", sku: "book4" },
      book5: { quantity: 3, price: 8, name: "Potter 5", sku: "book5" },
    },
    expected: 149.2,
  }, // 5*3 * 8 * 0.75 [90] 2*4 * 8 * 0.8 [51.2] + 8
  {
    basket: {
      book1: { quantity: 1, price: 8, name: "Potter 1", sku: "book1" },
      book2: { quantity: 1, price: 8, name: "Potter 2", sku: "book2" },
      book3: { quantity: 1, price: 8, name: "Potter 3", sku: "book3" },
      book4: { quantity: 1, price: 8, name: "Potter 4", sku: "book4" },
      book5: { quantity: 1, price: 8, name: "Potter 5", sku: "book5" },
    },
    expected: 30,
  },
  {
    basket: {
      book1: { quantity: 0, price: 8, name: "Potter 1", sku: "book1" },
    },
    expected: 0,
  },
  {
    basket: {
      book1: { quantity: 0, price: 8, name: "Potter 1", sku: "book1" },
      book4: { quantity: 2, price: 8, name: "Potter 4", sku: "book4" },
    },
    expected: 16,
  },
  // add more books
  {
    basket: {
      book1: { quantity: 1, price: 8, name: "Potter 1", sku: "book1" },
      book2: { quantity: 1, price: 8, name: "Potter 2", sku: "book2" },
      book3: { quantity: 1, price: 8, name: "Potter 3", sku: "book3" },
      book4: { quantity: 1, price: 8, name: "Potter 4", sku: "book4" },
      book5: { quantity: 1, price: 8, name: "Potter 5", sku: "book5" },
      book6: { quantity: 1, price: 8, name: "Potter 6", sku: "book6" },
    },
    expected: 36,
  },
  {
    basket: {
      book2: {
        sku: "book2",
        name: "Potter 2",
        price: 8,
        quantity: 4,
      },
      book1: {
        sku: "book1",
        name: "Potter 1",
        price: 8,
        quantity: 3,
      },
    },
    expected: 53.6,
  },
];

describe("calculateTotal", () => {
  baskets.forEach(({ basket, expected }) => {
    it(`calculates the total for ${JSON.stringify(basket)} correctly`, () => {
      expect(calculateTotal(basket as Basket)).toBe(expected);
    });
  });
});
