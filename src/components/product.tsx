import { useState } from "react";
import "./product.css";

interface ProductProps {
  name: string;
  sku: string;
  price: number;
  addToBasket: (sku: string, quantity: number) => void;
}

export default function Product({
  name,
  sku,
  price,
  addToBasket,
}: ProductProps) {
  const [quantity, setQuantity] = useState(1);
  return (
    <div data-id={sku} className="product-item">
      <div>{name}</div>
      <div>{price}</div>
      <div className="actions">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(evt) => setQuantity(Number(evt.target.value))}
        />
        <button onClick={() => addToBasket(sku, quantity)}>Add to cart</button>
      </div>
    </div>
  );
}
