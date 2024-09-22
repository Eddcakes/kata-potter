import { useBasket } from "../hooks/useBasket";

export default function Checkout() {
  const { basket, handleAddToBasket } = useBasket();
  // handleAddToBasket could be used here to add more items before checking out
  return (
    <div>
      <h2>Checkout</h2>
      <pre>{JSON.stringify(basket, null, 2)}</pre>
    </div>
  );
}
