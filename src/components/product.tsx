import { useState } from "react";
import { ProductItem } from "../models";
import "./product.css";
import { formatPrice } from "../utils";

interface ProductProps {
  product: ProductItem;
  addToBasket: (product: ProductItem, quantity: number) => void;
}

export default function Product({ product, addToBasket }: ProductProps) {
  const { name, sku, price } = product;
  const [quantity, setQuantity] = useState(1);
  const handleClick = () => {
    addToBasket(product, quantity);
    setQuantity(1);
  };
  return (
    <div data-id={sku} className="product-item">
      <div className="details">
        <div>{name}</div>
        <div>{formatPrice(price)}</div>
      </div>
      <div className="actions">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(evt) => setQuantity(Number(evt.target.value))}
        />
        <button onClick={handleClick}>Add to cart</button>
      </div>
    </div>
  );
}
