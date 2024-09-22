import { BasketItem } from "../models";

interface CheckoutItemProps {
  item: BasketItem;
}

export default function CheckoutItem({ item }: CheckoutItemProps) {
  const { quantity, name, price } = item;
  return (
    <div className="checkout-item">
      <div>Product name: {name}</div>
      <div>Price: {price}</div>
      <div>Quantity: {quantity}</div>
    </div>
  );
}
