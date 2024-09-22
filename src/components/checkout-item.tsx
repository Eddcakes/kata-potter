interface CheckoutItemProps {
  sku: string;
  quantity: number;
}

export default function CheckoutItem({ sku, quantity }: CheckoutItemProps) {
  return (
    <div className="checkout-item">
      <div>Product name: {sku}</div>
      <div>Price</div>
      <div>Quantity: {quantity}</div>
      <div>Total</div>
    </div>
  );
}
