import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { useState } from "react";
import type { Basket, BasketContext, ProductItem } from "../models";

export default function Layout() {
  const [basket, setBasket] = useState({});

  const handleAddToBasket = (basketItem: ProductItem, quantity: number) => {
    setBasket((prev: Basket) => {
      const sku = basketItem.sku;
      if (prev[sku]) {
        return {
          ...prev,
          [sku]: { ...prev[sku], quantity: (prev[sku].quantity += quantity) },
        };
      } else {
        return { ...prev, [sku]: { ...basketItem, quantity } };
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
