import PrototypeNote from "../components/PrototypeNote.jsx";
import RepeatOrder from "../components/RepeatOrder.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { PRODUCTS } from "../data/products.js";

// Pantalla 1: la carta.
export default function MenuScreen({ lastOrder, onRepeat, onAdd }) {
  return (
    <>
      <PrototypeNote />
      <div className="hello">
        <h1>Pide ahora, retira sin fila.</h1>
        <p>Elige tu café, paga y pasa a buscarlo listo.</p>
      </div>
      <RepeatOrder lastOrder={lastOrder} onRepeat={onRepeat} />
      <div className="section-h">
        <h2>La carta</h2>
        <span>4 cápsulas · solo para llevar</span>
      </div>
      <div className="menu">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </>
  );
}
