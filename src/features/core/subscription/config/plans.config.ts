export interface Plan {
  name: string;
  priceId: string;
  limits: any;
}

export const plans = [
  {
    name: "pro",
    priceId: process.env.PRO_PRICEID,
    limits: {
      energy: 50,
      decks: 30,
    },
    price: 2.99,
  },
  {
    name: "pro-yearly",
    priceId: process.env.PRO_YEARLY_PRICEID,
    limits: {
      energy: 50,
      decks: 30,
    },
    price: 25.19,
  },
  {
    name: "ultra",
    priceId: process.env.ULTRA_PRICEID,
    limits: {
      energy: 100,
      decks: 80,
    },
    price: 7.99,
  },
  {
    name: "ultra-yearly",
    priceId: process.env.ULTRA_YEARLY_PRICEID,
    limits: {
      energy: 100,
      decks: 80,
    },
    price: 67.19,
  },
];
