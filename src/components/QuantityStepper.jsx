import { MAX_QTY } from "../data/products.js";

// Selector de cantidad con botones grandes (− / +).
// Si `removable` es true y la cantidad es 1, el botón − muestra un tacho para quitar.
export default function QuantityStepper({ value, onChange, label, min = 1, removable = false }) {
  const canRemove = removable && value === 1;
  return (
    <div className="qty" role="group" aria-label={`Cantidad de ${label}`}>
      <button
        onClick={() => onChange(value - 1)}
        disabled={!canRemove && value <= min}
        aria-label={canRemove ? `Quitar ${label}` : "Quitar uno"}
      >
        {canRemove ? "🗑" : "−"}
      </button>
      <output className="num" aria-live="polite">{value}</output>
      <button onClick={() => onChange(value + 1)} disabled={value >= MAX_QTY} aria-label="Agregar uno">
        +
      </button>
    </div>
  );
}
