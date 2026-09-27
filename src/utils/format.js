import { PRODUCTS_BY_ID } from "../data/products.js";

// Formato de precio. Cambia aquí la moneda si hace falta (por ejemplo "RD$").
export const money = (n) => "$" + n.toFixed(2);

export const countItems = (items) => Object.values(items).reduce((a, b) => a + b, 0);

export const totalItems = (items) =>
  Object.entries(items).reduce((t, [id, q]) => t + PRODUCTS_BY_ID[id].price * q, 0);

export const itemsText = (items) =>
  Object.entries(items)
    .map(([id, q]) => `${q}× ${PRODUCTS_BY_ID[id].name}`)
    .join(" · ");
