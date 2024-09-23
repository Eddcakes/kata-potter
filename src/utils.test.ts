import { describe, expect, it } from "vitest";
import {
  BasicBasket,
  basicCalculateTotal,
  calculateTotal,
  formatPrice,
} from "./utils";
import { Basket } from "./models";

const baskets = [
  {
    basket: {
      book1: { quantity: 1, price: 800, name: "Potter 1", sku: "book1" },
    },
    expected: 800,
  },
  {
    basket: {
      book2: { quantity: 1, price: 800, name: "Potter 2", sku: "book2" },
      book3: { quantity: 3, price: 800, name: "Potter 3", sku: "book3" },
    },
    expected: 3120,
  }, // 2*8 * 0.95 + 2*8
  {
    basket: {
      book1: { quantity: 2, price: 800, name: "Potter 1", sku: "book1" },
      book2: { quantity: 2, price: 800, name: "Potter 2", sku: "book2" },
      book3: { quantity: 2, price: 800, name: "Potter 3", sku: "book3" },
      book4: { quantity: 1, price: 800, name: "Potter 4", sku: "book4" },
    },
    expected: 4720,
  }, // 4*8 * 0.8  3* 8 * 0.9
  {
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
    basket: {
      book1: { quantity: 0, price: 800, name: "Potter 1", sku: "book1" },
    },
    expected: 0,
  },
  {
    basket: {
      book1: { quantity: 0, price: 800, name: "Potter 1", sku: "book1" },
      book4: { quantity: 2, price: 800, name: "Potter 4", sku: "book4" },
    },
    expected: 1600,
  },
  // add more books
  {
    basket: {
      book1: { quantity: 1, price: 800, name: "Potter 1", sku: "book1" },
      book2: { quantity: 1, price: 800, name: "Potter 2", sku: "book2" },
      book3: { quantity: 1, price: 800, name: "Potter 3", sku: "book3" },
      book4: { quantity: 1, price: 800, name: "Potter 4", sku: "book4" },
      book5: { quantity: 1, price: 800, name: "Potter 5", sku: "book5" },
      book6: { quantity: 1, price: 800, name: "Potter 6", sku: "book6" },
    },
    expected: 3600,
  },
  {
    basket: {
      book2: {
        sku: "book2",
        name: "Potter 2",
        price: 800,
        quantity: 4,
      },
      book1: {
        sku: "book1",
        name: "Potter 1",
        price: 800,
        quantity: 3,
      },
    },
    expected: 5360,
  },
];

describe("calculateTotal", () => {
  baskets.forEach(({ basket, expected }) => {
    it(`calculates the total for ${JSON.stringify(basket)} correctly`, () => {
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

const basicBaskets = [
  { basket: { book1: 1 }, expected: 800 },
  { basket: { book2: 1, book3: 3 }, expected: 3120 },
  { basket: { book1: 2, book2: 2, book3: 2, book4: 1 }, expected: 4720 },
  {
    basket: { book1: 5, book2: 5, book3: 6, book4: 5, book5: 3 },
    expected: 14920,
  }, // 5*3 * 8 * 0.75 [90] 2*4 * 8 * 0.8 [51.2] + 8
  {
    basket: { book1: 2, book2: 2, book3: 2, book4: 1, book5: 1 },
    expected: 5120,
  },
  { basket: { book1: 0 }, expected: 0 },
  { basket: { book1: 0, book4: 2 }, expected: 1600 },
];

describe.only("basicCalculateTotal", () => {
  basicBaskets.forEach(({ basket, expected }) => {
    it(`calculates the total for ${JSON.stringify(basket)} correctly`, () => {
      expect(basicCalculateTotal(basket as BasicBasket)).toBe(expected);
    });
  });
});
