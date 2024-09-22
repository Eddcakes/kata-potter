import { Basket } from "../routes/layout";
import CheckoutItem from "./checkout-item";

interface CheckoutListProps {
  basket: Basket;
}

export default function CheckoutList({ basket }: CheckoutListProps) {
  return (
    <div className="checkout-list">
      {Object.entries(basket).map(([sku, quantity]) => (
        <CheckoutItem key={sku} sku={sku} quantity={quantity} />
      ))}
    </div>
  );
}
