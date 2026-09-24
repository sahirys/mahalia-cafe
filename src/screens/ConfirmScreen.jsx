import { PRODUCTS_BY_ID } from "../data/products.js";
import { money } from "../utils/format.js";

// Pantalla 3: confirmación con número de pedido.
export default function ConfirmScreen({ order, onNewOrder }) {
  return (
    <>
      <section className="ok-hero" aria-live="polite">
        <div className="lbl">¡Pedido confirmado, {order.name}!</div>
        <div className="order num">#{order.number}</div>
        <p>
          Muestra este número en el mostrador. Retíralo <b>{order.pickupLabel}</b>.
        </p>
        <div className="track" aria-label="Estado del pedido">
          <div className="done">✓ Recibido</div>
          <div>Preparando</div>
          <div>Listo para retirar</div>
        </div>
      </section>

      <div className="ok-grid">
        <section className="panel">
          <h2>Resumen</h2>
          <dl className="kv">
            {Object.entries(order.items).map(([id, q]) => (
              <FragmentRow key={id} term={`${q}× ${PRODUCTS_BY_ID[id].name}`} value={money(PRODUCTS_BY_ID[id].price * q)} />
            ))}
            <FragmentRow term={<b>Total pagado (simulado)</b>} value={money(order.total)} />
            <FragmentRow term="Pago" value={order.pay === "card" ? "Tarjeta" : "Billetera móvil"} />
            <FragmentRow term="Retiro" value={order.pickupLabel} />
          </dl>
        </section>
        <section className="panel panel-stack">
          <h2>¿Y ahora?</h2>
          <p className="muted">
            Camina tranquilo: tu café estará listo a la hora que elegiste. La próxima vez lo repites con un toque desde la carta.
          </p>
          <button className="btn btn-ghost btn-block" onClick={onNewOrder}>
            Hacer otro pedido
          </button>
        </section>
      </div>
    </>
  );
}

function FragmentRow({ term, value }) {
  return (
    <>
      <dt>{term}</dt>
      <dd className="num">{value}</dd>
    </>
  );
}
