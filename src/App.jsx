import { useEffect, useRef, useState } from "react";
import Header from "./components/Header.jsx";
import CartDock from "./components/CartDock.jsx";
import Toast from "./components/Toast.jsx";
import MenuScreen from "./screens/MenuScreen.jsx";
import CheckoutScreen from "./screens/CheckoutScreen.jsx";
import ConfirmScreen from "./screens/ConfirmScreen.jsx";
import { MAX_QTY, PRODUCTS_BY_ID } from "./data/products.js";
import { countItems, totalItems } from "./utils/format.js";
import { pickupLabel } from "./utils/pickup.js";
import { registerOrder } from "./utils/orders.js";
import { useLastOrder } from "./hooks/useLastOrder.js";

// Flujo: carta → pedido y pago → confirmación.
export default function App() {
  const [screen, setScreen] = useState("menu");
  const [cart, setCart] = useState({}); // { idProducto: cantidad }
  const [checkout, setCheckout] = useState({ pickup: "asap", name: "", pay: "card" });
  const [paying, setPaying] = useState(false);
  const [order, setOrder] = useState(null);
  const [lastOrder, saveLastOrder] = useLastOrder();
  const [toast, setToast] = useState("");
  const toastTimer = useRef();

  const showToast = (msg, ms = 1800) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), ms);
  };

  const go = (next) => setScreen(next);
  // Con llaves: el efecto no debe devolver lo que devuelve scrollTo
  // (en navegadores nuevos es una promesa y React la trataría como limpieza).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  const addToCart = (id, qty) => {
    setCart((c) => ({ ...c, [id]: Math.min(MAX_QTY, (c[id] || 0) + qty) }));
    showToast(`${qty}× ${PRODUCTS_BY_ID[id].name} agregado`);
  };

  const changeQty = (id, qty) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = Math.min(MAX_QTY, qty);
      return next;
    });
  };

  const repeatLastOrder = () => {
    setCart({ ...lastOrder.items });
    setCheckout((c) => ({ ...c, pickup: "asap", name: c.name || lastOrder.name || "" }));
    go("checkout");
    showToast("Tu último pedido está listo para pagar");
  };

  // Pago todavía SIMULADO (la pasarela real llega después). La compra se
  // confirma recién cuando el café la registró en el backend.
  const pay = async () => {
    setPaying(true);
    const name = checkout.name.trim();
    const pickup = pickupLabel(checkout.pickup);
    try {
      const { orderNumber, total } = await registerOrder({ items: cart, name, pay: checkout.pay, pickup });
      setOrder({ number: orderNumber, items: { ...cart }, total, name, pay: checkout.pay, pickupLabel: pickup });
      saveLastOrder({ items: { ...cart }, name });
      setCart({});
      go("confirm");
    } catch (err) {
      showToast(err.message, 4000);
    } finally {
      setPaying(false);
    }
  };

  return (
    <>
      <Header screen={screen} onLogoClick={() => !paying && go("menu")} />
      <main className="app">
        {screen === "menu" && <MenuScreen lastOrder={lastOrder} onRepeat={repeatLastOrder} onAdd={addToCart} />}
        {screen === "checkout" && (
          <CheckoutScreen
            cart={cart}
            onChangeQty={changeQty}
            checkout={checkout}
            setCheckout={setCheckout}
            paying={paying}
            onPay={pay}
            onBack={() => go("menu")}
          />
        )}
        {screen === "confirm" && order && <ConfirmScreen order={order} onNewOrder={() => go("menu")} />}
      </main>
      {screen === "menu" && <CartDock count={countItems(cart)} total={totalItems(cart)} onClick={() => go("checkout")} />}
      <Toast message={toast} />
    </>
  );
}
