import { useOutletContext } from "react-router-dom";
import { type BasketContext } from "../models";

export function useBasket() {
  return useOutletContext<BasketContext>();
}
