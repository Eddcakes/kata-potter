import { describe, expect, it } from "vitest";
import { calculateTotal, formatPrice } from "./utils";
import { Basket } from "./models";

const baskets = [
  {
    testCase: "one book",
    basket: {
      book1: { quantity: 1, price: 800, name: "Potter 1", sku: "book1" },
    },
    expected: 800,
  },
  {
    testCase: "two unique books, multiple copies",
    basket: {
      book2: { quantity: 1, price: 800, name: "Potter 2", sku: "book2" },
      book3: { quantity: 3, price: 800, name: "Potter 3", sku: "book3" },
    },
    expected: 3120,
  }, // 2*8 * 0.95 + 2*8
  {
    testCase: "several unique books, multiple copies",
    basket: {
      book1: { quantity: 2, price: 800, name: "Potter 1", sku: "book1" },
      book2: { quantity: 2, price: 800, name: "Potter 2", sku: "book2" },
      book3: { quantity: 2, price: 800, name: "Potter 3", sku: "book3" },
      book4: { quantity: 1, price: 800, name: "Potter 4", sku: "book4" },
    },
    expected: 4720,
  }, // 4*8 * 0.8  3* 8 * 0.9
  {
    testCase: "lots of book",
    basket: {
      book1: { quantity: 5, price: 800, name: "Potter 1", sku: "book1" },
      book2: { quantity: 5, price: 800, name: "Potter 2", sku: "book2" },
      book3: { quantity: 6, price: 800, name: "Potter 3", sku: "book3" },
      book4: { quantity: 5, price: 800, name: "Potter 4", sku: "book4" },
      book5: { quantity: 3, price: 800, name: "Potter 5", sku: "book5" },
    },
    expected: 14920,
  }, // 5*3 * 8 * 0.75 [90] 2*4 * 8 * 0.8 [51.2] + 8
  {
    testCase: "one of each book",
    basket: {
      book1: { quantity: 1, price: 800, name: "Potter 1", sku: "book1" },
      book2: { quantity: 1, price: 800, name: "Potter 2", sku: "book2" },
      book3: { quantity: 1, price: 800, name: "Potter 3", sku: "book3" },
      book4: { quantity: 1, price: 800, name: "Potter 4", sku: "book4" },
      book5: { quantity: 1, price: 800, name: "Potter 5", sku: "book5" },
    },
    expected: 3000,
  },
  {
    testCase: "zero books",
    basket: {
      book1: { quantity: 0, price: 800, name: "Potter 1", sku: "book1" },
    },
    expected: 0,
  },
  {
    testCase: "book with 0 quantity",
    basket: {
      book1: { quantity: 0, price: 800, name: "Potter 1", sku: "book1" },
      book4: { quantity: 2, price: 800, name: "Potter 4", sku: "book4" },
    },
    expected: 1600,
  },
  // found edge case
  {
    testCase: "edge case with better than greedy price",
    basket: {
      book1: { quantity: 2, price: 800, name: "Potter 1", sku: "book1" },
      book2: { quantity: 2, price: 800, name: "Potter 2", sku: "book2" },
      book3: { quantity: 2, price: 800, name: "Potter 3", sku: "book3" },
      book4: { quantity: 1, price: 800, name: "Potter 4", sku: "book4" },
      book5: { quantity: 1, price: 800, name: "Potter 5", sku: "book5" },
    },
    expected: 5120,
  },
];

describe("calculateTotal", () => {
  baskets.forEach(({ basket, expected, testCase }) => {
    it(`calculates the total for ${testCase} correctly`, () => {
      expect(calculateTotal(basket as Basket)).toBe(expected);
    });
  });
});

const formatPrices = [
  { price: 800, expected: "€8.00" },
  { price: 2400, expected: "€24.00" },
  { price: 1000, expected: "€10.00" },
  { price: 16000, expected: "€160.00" },
  { price: undefined, expected: "€0.00" },
];

describe("formatPrice", () => {
  formatPrices.forEach(({ price, expected }) => {
    it(`should format price for ${price}`, () => {
      const result = formatPrice(price as number);
      expect(result).toBe(expected);
    });
  });
});
