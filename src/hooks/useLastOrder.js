import { useState } from "react";
import { DEMO_LAST_ORDER } from "../data/products.js";

const KEY = "mahalia_last";

// Guarda el último pedido en este navegador (sin cuenta ni contraseña).
export function useLastOrder() {
  const [lastOrder, setLastOrder] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null");
      return saved || DEMO_LAST_ORDER;
    } catch {
      return DEMO_LAST_ORDER;
    }
  });

  const saveLastOrder = (order) => {
    setLastOrder(order);
    try {
      localStorage.setItem(KEY, JSON.stringify(order));
    } catch {
      /* el navegador no permite guardar: no pasa nada */
    }
  };

  return [lastOrder, saveLastOrder];
}
