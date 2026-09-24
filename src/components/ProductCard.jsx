import { useState } from "react";
import CupIllustration from "./CupIllustration.jsx";
import QuantityStepper from "./QuantityStepper.jsx";
import { money } from "../utils/format.js";

export default function ProductCard({ product, onAdd }) {
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    onAdd(product.id, qty);
    setQty(1);
  };

  return (
    <article className="card">
      <div className="ph">
        <CupIllustration {...product.cup} />
        <span className="tag">Foto ref.</span>
      </div>
      <div className="card-b">
        <h3>{product.name}</h3>
        <p>{product.desc}</p>
        <div className="price">
          <b className="num">{money(product.price)}</b>
          <span className="prov">Precio provisional</span>
        </div>
        <div className="buyrow">
          <QuantityStepper value={qty} onChange={setQty} label={product.name} />
          <button className="btn btn-red" onClick={handleAdd}>
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
