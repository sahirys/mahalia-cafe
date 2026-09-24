// Carta de MahalIA: 4 cápsulas con nombres genéricos.
// ⚠️ PRECIOS PROVISIONALES DE EJEMPLO. No son precios reales.
// `cup` define los colores de la ilustración que reemplaza a la foto por ahora.
export const PRODUCTS = [
  {
    id: "espresso",
    name: "Espresso",
    desc: "Corto e intenso. Para despertar en dos sorbos.",
    size: "Vaso 4 oz",
    price: 2.5,
    cup: { sleeve: "#3E2723", fill: "#3B2016", foam: null },
  },
  {
    id: "lungo",
    name: "Lungo",
    desc: "Más largo y suave. Ideal para el camino.",
    size: "Vaso 8 oz",
    price: 2.8,
    cup: { sleeve: "#011C40", fill: "#4A2A1C", foam: null },
  },
  {
    id: "cortado",
    name: "Cortado",
    desc: "Espresso con un toque de leche caliente.",
    size: "Vaso 6 oz",
    price: 3.2,
    cup: { sleeve: "#B31D15", fill: "#6D4430", foam: "#E9D8C6" },
  },
  {
    id: "latte",
    name: "Latte",
    desc: "Suave y cremoso, con leche vaporizada.",
    size: "Vaso 12 oz",
    price: 3.6,
    cup: { sleeve: "#A9C9E8", fill: "#9C6B4E", foam: "#F2E6DA" },
  },
];

export const PRODUCTS_BY_ID = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

// Pedido de ejemplo para mostrar "Repetir mi último pedido" la primera vez.
export const DEMO_LAST_ORDER = { items: { espresso: 2, latte: 1 }, name: "Ana", demo: true };

export const MAX_QTY = 9;
