import { useOutletContext } from "react-router-dom";
import { type BasketContext } from "../routes/layout";

export function useBasket() {
  return useOutletContext<BasketContext>();
}
