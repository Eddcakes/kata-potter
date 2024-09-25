import { Basket } from "./models";

// 8 EUR each -> 800 cents
const BOOK_PRICE = 800;
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

export const calculateTotal = (basket: Basket): number => {
  const offers = findOffers(basket);
  return calculateOffers(offers);
};
export interface BasicBasket {
  [bookSku: string]: number;
}

interface Offer {
  uniqueBooks: number;
  discount: number;
  timesApplied: number;
}

export const findOffers = (basket: Basket, offers = []): Offer[] => {
  // mutating offers
  checkBasket(basket, offers);
  return offers;
};

const checkBasket = (basket: Basket, offers: Offer[]) => {
  const basketKeys = Object.keys(basket);
  const bookCounts = Object.values(basket).map((item) => item.quantity);
  const uniqueBooks = bookCounts.length; // || basketKeys.length;
  const lowestCount = Math.min(...bookCounts); // bookCounts[bookCounts.length - 1];
  offers.push({
    uniqueBooks,
    discount: getOfferMultiplier(uniqueBooks),
    timesApplied: lowestCount,
  });
  const nextBasket = {} as Basket;
  basketKeys.forEach((bookSku) => {
    const leftInBasket = basket[bookSku].quantity - lowestCount;
    if (leftInBasket > 0) {
      // only add to new basket if there are any left
      nextBasket[bookSku] = { ...basket[bookSku], quantity: leftInBasket };
    }
  });
  if (Object.keys(nextBasket).length > 0) {
    checkBasket(nextBasket, offers);
  }
  return;
};

export const calculateOffers = (offers: Offer[]): number => {
  // we see all the offers so we can manually override edge cases
  const offer3At = offers.findIndex((offer) => offer.uniqueBooks === 3);
  const offer5At = offers.findIndex((offer) => offer.uniqueBooks === 5);
  const offer4At = offers.findIndex((offer) => offer.uniqueBooks === 4);
  if (offer3At !== -1 && offer5At !== -1) {
    // we have both offers
    offers[offer3At].timesApplied -= 1;
    offers[offer5At].timesApplied -= 1;
    // replace offer 5 and 3 with 2 * 4
    if (offer4At !== -1) {
      offers[offer4At].timesApplied += 2;
    } else {
      offers.push({
        uniqueBooks: 4,
        discount: 0.8,
        timesApplied: 2,
      });
    }
  }
  const cleanOffers = offers.filter((offer) => offer.timesApplied > 0);
  return cleanOffers.reduce((total, offer) => {
    return (
      total +
      offer.uniqueBooks * offer.timesApplied * BOOK_PRICE * offer.discount
    );
  }, 0);
};

export const getTotalItemsInBasket = (basket: Basket): number => {
  return Object.values(basket).reduce((acc, item) => acc + item.quantity, 0);
};

export const formatPrice = (price: number) => {
  let priceString = "";
  switch (true) {
    case price == null:
      priceString = "0.00";
      break;
    case price.toString().length === 1:
      priceString = `0.0${price}`;
      break;
    case price.toString().length === 2:
      priceString = `0.${price}`;
      break;
    default:
      priceString = `${price.toString().slice(0, -2)}.${price
        .toString()
        .slice(-2)}`;
      break;
  }
  return `€${priceString}`;
};
