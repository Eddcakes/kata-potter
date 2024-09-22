export interface Basket {
  [bookSku: string]: number;
}

// 8 EUR each
const BOOK_PRICE = 8;
// 5% discount for 2 different books
// 10% discount for 3 different books
// 20% discount for 4 different books
// 25% discount for 5 different books
const OFFER_MULTIPLIER: { [key: number]: number } = {
  1: 1,
  2: 0.95,
  3: 0.9,
  4: 0.8,
  5: 0.75,
};

// could initialise with all the books at 0 as we know this constraint
const globalBasket: Basket = {};

// could pass in the basket to avoid using a global, but we will refactor to react state if we create a ui anyway
const addToBasket = (bookSku: string, quantity: number) => {
  if (globalBasket[bookSku]) {
    globalBasket[bookSku] += quantity;
  } else {
    globalBasket[bookSku] = quantity;
  }
};

export const calculateTotal = (basket: Basket): number => {
  // do we have at least one of each book?
  // ^ count unique keys
  const uniqueBooks = Object.keys(basket).length;
  // get lowest count of each book
  const lowestCount = Math.min(...Object.values(basket));
  // minus the lowest count of each book from the basket and calculate the offer price from # uniqueBooks
  const total =
    uniqueBooks * lowestCount * BOOK_PRICE * OFFER_MULTIPLIER[uniqueBooks];
  const nextBasket = {} as Basket; // whats left in the basket
  Object.keys(basket).forEach((bookSku) => {
    const leftInBasket = basket[bookSku] - lowestCount;
    if (leftInBasket > 0) {
      // only add to new basket if there are any left
      nextBasket[bookSku] = leftInBasket;
    }
  });
  // do it again until we have no books left
  if (Object.keys(nextBasket).length > 0) {
    return total + calculateTotal(nextBasket);
  }
  return total;
};
