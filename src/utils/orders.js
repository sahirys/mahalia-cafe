// Registra el pedido en el café a través de la función serverless /api/orders.
// Devuelve { orderNumber, total } o lanza un error con un mensaje para el cliente.
export async function registerOrder({ items, name, pay, pickup }) {
  let data = null;
  try {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, name, pay, pickup }),
    });
    data = await response.json();
  } catch {
    throw new Error("No pudimos conectar con el café. Revisa tu conexión e intenta de nuevo.");
  }
  if (!data.ok) throw new Error(data.error || "No pudimos registrar tu pedido. Intenta de nuevo.");
  return data;
}
