import { itemsText, money, totalItems } from "../utils/format.js";

export default function RepeatOrder({ lastOrder, onRepeat }) {
  if (!lastOrder) return null;
  return (
    <section className="repeat" aria-label="Repetir mi último pedido">
      <div>
        <div className="lbl">Tu último pedido{lastOrder.demo ? " (ejemplo)" : ""}</div>
        <div className="what">{itemsText(lastOrder.items)}</div>
        <div className="meta num">{money(totalItems(lastOrder.items))} · listo en ≈ 5 min</div>
      </div>
      <button className="btn btn-red" onClick={onRepeat}>
        ↻ Repetir mi último pedido
      </button>
    </section>
  );
}
