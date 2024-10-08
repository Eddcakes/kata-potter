import CheckoutList from "../components/checkout-list";
import { useBasket } from "../hooks/useBasket";
import { calculateTotal, formatPrice, getTotalItemsInBasket } from "../utils";

export default function Checkout() {
  const { basket } = useBasket();
  const itemsInBasket = getTotalItemsInBasket(basket);
  // could add handleAddToBasket functionality to add items before checking out
  const handleBuyNow = () => {
    if (itemsInBasket < 1) {
      console.log("Not enough items in the basket");
    }
    alert(`Basket purchased for ${formatPrice(calculateTotal(basket))}`);
    // mock resetting the basket by hard navigating to home page
    window.location.replace("/");
  };
  return (
    <div className="checkout">
      <h2>Shopping cart</h2>
      <div>
        {itemsInBasket > 0 ? (
          <CheckoutList basket={basket} />
        ) : (
          <div>No items in basket</div>
        )}
      </div>
      <div>
        Total price:{" "}
        {formatPrice(itemsInBasket > 0 ? calculateTotal(basket) : 0)}
      </div>
      <div className="actions">
        <button disabled={itemsInBasket < 1} onClick={handleBuyNow}>
          Buy now
        </button>
      </div>
    </div>
  );
}
