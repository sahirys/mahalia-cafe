import { money } from "../utils/format.js";

// Barra fija abajo, al alcance del pulgar. Solo aparece si hay algo en el pedido.
export default function CartDock({ count, total, onClick }) {
  if (count === 0) return null;
  return (
    <div className="dock">
      <div className="dock-in">
        <button className="btn btn-red" onClick={onClick}>
          <span>
            <span className="count num">{count}</span>Ver pedido y pagar
          </span>
          <span className="num">{money(total)}</span>
        </button>
      </div>
    </div>
  );
}
