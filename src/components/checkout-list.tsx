import { type Basket } from "../models";
import CheckoutItem from "./checkout-item";

interface CheckoutListProps {
  basket: Basket;
}

export default function CheckoutList({ basket }: CheckoutListProps) {
  return (
    <div className="checkout-list">
      {Object.values(basket).map((item) => {
        return <CheckoutItem key={item.sku} item={item} />;
      })}
    </div>
  );
}
