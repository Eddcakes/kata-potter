import { Link } from "react-router-dom";
import { type Basket } from "../routes/layout";
import "./header.css";

interface HeaderProps {
  basket: Basket;
}

export function Header({ basket }: HeaderProps) {
  const itemsInBasket = Object.values(basket).reduce(
    (acc, quantity) => acc + quantity,
    0
  );
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <div className="bag">
              <div>basket: {itemsInBasket}</div>
              <Link to="/checkout">Checkout</Link>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
