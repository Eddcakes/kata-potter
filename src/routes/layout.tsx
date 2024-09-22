import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { useState } from "react";

export interface Basket {
  [sku: string]: number;
}

export type BasketContext = {
  basket: Basket;
  handleAddToBasket: (sku: string, quantity: number) => void;
};

export default function Layout() {
  const [basket, setBasket] = useState({});

  const handleAddToBasket = (sku: string, quantity: number) => {
    setBasket((prev: Basket) => {
      if (prev[sku]) {
        return { ...prev, [sku]: (prev[sku] += quantity) };
      } else {
        return { ...prev, [sku]: quantity };
      }
    });
  };
  return (
    <div id="root">
      <Header basket={basket} />
      <Outlet context={{ basket, handleAddToBasket } satisfies BasketContext} />
    </div>
  );
}
