export interface Basket {
  [bookSku: string]: number;
}

// 8 EUR each
const BOOK_PRICE = 8;
// 5% discount for 2 different books
// 10% discount for 3 different books
// 20% discount for 4 different books
// 25% discount for 5 different books
const OFFER_MULTIPLIER: { [differentBooks: number]: number } = {
  1: 1,
  2: 0.95,
  3: 0.9,
  4: 0.8,
  5: 0.75,
};

// could refactor be a switch statement, created helper function to handle out of bounds counts (>1 and <5)
const getOfferMultiplier = (quantity: number): number => {
  if (quantity < 1) {
    console.log("invalid quantity of books");
    return 1;
  }
  if (quantity > 5) {
    // to check business rules, do we need to treat 6 books as 5 + 1 or 6?
    console.log(
      "more than 5 different books, satisfies at least 5 different books"
    );
    return OFFER_MULTIPLIER[5];
  }
  return OFFER_MULTIPLIER[quantity];
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
  // we use keys from the basket more than once so lets store the value
  const basketKeys = Object.keys(basket);
  // do we have at least one of each book? -> count unique keys
  const uniqueBooks = basketKeys.length;
  // get lowest count of each book
  const lowestCount = Math.min(...Object.values(basket));
  // minus the lowest count of each book from the basket and calculate the offer price from # uniqueBooks
  const total =
    uniqueBooks * lowestCount * BOOK_PRICE * getOfferMultiplier(uniqueBooks);
  const nextBasket = {} as Basket; // whats left in the basket
  basketKeys.forEach((bookSku) => {
    const leftInBasket = basket[bookSku] - lowestCount;
    if (leftInBasket > 0) {
      // only add to new basket if there are any left
      nextBasket[bookSku] = leftInBasket;
    }
  });
  // do it again until we have no books left
  // Object.keys() will create a new array, we could refactor to check a helper function to check object props to avoid this
  if (Object.keys(nextBasket).length > 0) {
    return total + calculateTotal(nextBasket);
  }
  return total;
};
