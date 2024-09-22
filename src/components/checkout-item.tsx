import { BasketItem } from "../models";
import "./checkout-item.css";

interface CheckoutItemProps {
  item: BasketItem;
}

export default function CheckoutItem({ item }: CheckoutItemProps) {
  const { quantity, name } = item;
  return (
    <div className="checkout-item">
      <div>{name}</div>
      <div>Quantity: {quantity}</div>
    </div>
  );
}
