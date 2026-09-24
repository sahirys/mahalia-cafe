import { useMemo, useRef, useState } from "react";
import QuantityStepper from "../components/QuantityStepper.jsx";
import ChipGroup from "../components/ChipGroup.jsx";
import { PRODUCTS_BY_ID } from "../data/products.js";
import { countItems, money, totalItems } from "../utils/format.js";
import { pickupSlots } from "../utils/pickup.js";

const PAY_OPTIONS = [
  { id: "card", label: "Tarjeta", sub: "débito o crédito" },
  { id: "wallet", label: "Billetera móvil", sub: "pago con el celular" },
];

// Pantalla 2: pedido + hora de retiro + nombre + pago (todo en una pantalla).
export default function CheckoutScreen({ cart, onChangeQty, checkout, setCheckout, paying, onPay, onBack }) {
  const [nameError, setNameError] = useState(false);
  const nameRef = useRef(null);
  const slots = useMemo(() => pickupSlots(), []);
  const count = countItems(cart);
  const total = totalItems(cart);

  const handlePay = () => {
    if (paying) return;
    if (!checkout.name.trim()) {
      setNameError(true);
      nameRef.current?.focus();
      return;
    }
    onPay();
  };

  return (
    <>
      <button className="back" onClick={onBack}>← Seguir eligiendo</button>
      <div className="co">
        <section className="panel" aria-label="Tu pedido">
          <h2>Tu pedido</h2>
          {count ? (
            Object.entries(cart).map(([id, q]) => {
              const p = PRODUCTS_BY_ID[id];
              return (
                <div className="line" key={id}>
                  <div>
                    <div className="n">{p.name}</div>
                    <div className="u num">{money(p.price)} c/u · {p.size}</div>
                  </div>
                  <div className="sub num">{money(p.price * q)}</div>
                  <QuantityStepper value={q} onChange={(v) => onChangeQty(id, v)} label={p.name} min={0} removable />
                </div>
              );
            })
          ) : (
            <p className="empty">Tu pedido está vacío. Vuelve a la carta para elegir un café.</p>
          )}
          <div className="total">
            <span>Total</span>
            <b className="num">{money(total)}</b>
          </div>
          <p className="fine">Precios provisionales de ejemplo.</p>
        </section>

        <section className="panel" aria-label="Retiro y pago">
          <div className="field">
            <span className="flabel" id="pickupLbl">¿A qué hora pasas a retirarlo?</span>
            <ChipGroup labelId="pickupLbl" options={slots} value={checkout.pickup} onChange={(pickup) => setCheckout({ ...checkout, pickup })} />
          </div>

          <div className="field">
            <label htmlFor="name">¿A nombre de quién?</label>
            <input
              id="name"
              ref={nameRef}
              autoComplete="given-name"
              placeholder="Tu nombre"
              value={checkout.name}
              aria-invalid={nameError}
              aria-describedby="nameHelp"
              onChange={(e) => {
                setCheckout({ ...checkout, name: e.target.value });
                if (e.target.value.trim()) setNameError(false);
              }}
            />
            <span id="nameHelp" className={nameError ? "err" : "fine"}>
              {nameError
                ? "Escribe tu nombre para poder entregarte el pedido."
                : "Sin registro ni contraseña: pides como invitado."}
            </span>
          </div>

          <div className="field">
            <span className="flabel" id="payLbl">Forma de pago</span>
            <ChipGroup labelId="payLbl" options={PAY_OPTIONS} value={checkout.pay} onChange={(pay) => setCheckout({ ...checkout, pay })} />
          </div>

          <div className="pay-note">
            <span aria-hidden="true">ⓘ</span>
            <span>Pago simulado para el prototipo. Aún no hay pasarela real.</span>
          </div>

          <button className="btn btn-red btn-block btn-pay" onClick={handlePay} disabled={!count} aria-busy={paying}>
            {paying ? (
              <>
                <span className="spinner" aria-hidden="true"></span> Procesando…
              </>
            ) : (
              <>
                Pagar <span className="num">{money(total)}</span>
              </>
            )}
          </button>
        </section>
      </div>
    </>
  );
}
