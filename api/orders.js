import { MAX_QTY, PRODUCTS_BY_ID } from "../src/data/products.js";
import { totalItems } from "../src/utils/format.js";

// Función serverless de Vercel: recibe el pedido confirmado desde la tienda
// y se lo avisa al backend de Apps Script. Corre en el servidor, así que la
// URL del backend (y más adelante el token) nunca llega al navegador.

export const config = { maxDuration: 30 };

const PAY_METHODS = ["card", "wallet"];
const BACKEND_TIMEOUT_MS = 25000;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Método no permitido" });
  }

  const backendUrl = process.env.APPS_SCRIPT_URL;
  const backendToken = process.env.APPS_SCRIPT_TOKEN;
  if (!backendUrl || !backendToken) {
    console.error("Falta APPS_SCRIPT_URL o APPS_SCRIPT_TOKEN en las variables de entorno de Vercel.");
    return res.status(500).json({ ok: false, error: "La tienda no está conectada con el café." });
  }

  let order;
  try {
    order = buildOrder(req.body);
  } catch (err) {
    return res.status(400).json({ ok: false, error: err.message });
  }

  try {
    const result = await sendToBackend(backendUrl, backendToken, { action: "registrarVenta", order });
    if (!result.ok) throw new Error(result.error || "El backend rechazó el pedido.");
    return res.status(200).json({ ok: true, orderNumber: order.orderId, total: order.total });
  } catch (err) {
    console.error("No se pudo registrar el pedido", order.orderId, err);
    return res.status(502).json({ ok: false, error: "No pudimos registrar tu pedido. Intenta de nuevo." });
  }
}

// Arma el pedido con los precios del servidor, no con los que manda el
// navegador: así nadie puede cambiar el precio desde su teléfono.
function buildOrder(body) {
  const { items, name, pay, pickup } = body || {};

  if (!items || typeof items !== "object" || !Object.keys(items).length) {
    throw new Error("El pedido está vacío.");
  }
  for (const [id, qty] of Object.entries(items)) {
    if (!PRODUCTS_BY_ID[id]) throw new Error(`Producto desconocido: ${id}`);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) throw new Error(`Cantidad inválida para ${id}`);
  }

  const cleanName = typeof name === "string" ? name.trim().slice(0, 60) : "";
  if (!cleanName) throw new Error("Falta el nombre.");
  if (!PAY_METHODS.includes(pay)) throw new Error("Forma de pago inválida.");

  return {
    orderId: makeOrderId(),
    name: cleanName,
    pay,
    pickup: typeof pickup === "string" ? pickup.slice(0, 40) : "",
    items: Object.entries(items).map(([id, qty]) => ({
      id,
      name: PRODUCTS_BY_ID[id].name,
      qty,
      price: PRODUCTS_BY_ID[id].price,
    })),
    total: Math.round(totalItems(items) * 100) / 100,
  };
}

// Número de pedido para mostrar en el mostrador, ej. "A-7K3Q9".
function makeOrderId() {
  return "A-" + Math.random().toString(36).slice(2, 7).toUpperCase();
}

// Envía el POST en JSON a Apps Script y devuelve su respuesta { ok, ... }.
// El token viaja dentro del JSON porque Apps Script no puede leer los
// encabezados HTTP. Apps Script responde con una redirección que fetch sigue sola.
async function sendToBackend(url, token, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, token }),
    signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
  });

  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    // Suele pasar si la app web de Apps Script no está publicada para "Cualquier persona".
    throw new Error(`Respuesta inesperada del backend (HTTP ${response.status}): ${text.slice(0, 200)}`);
  }
}
