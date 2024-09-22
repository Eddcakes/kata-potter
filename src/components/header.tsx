import { Link } from "react-router-dom";
import "./header.css";
import { getTotalItemsInBasket } from "../utils";
import { Basket } from "../models";

interface HeaderProps {
  basket: Basket;
}

export function Header({ basket }: HeaderProps) {
  const itemsInBasket = getTotalItemsInBasket(basket);
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
