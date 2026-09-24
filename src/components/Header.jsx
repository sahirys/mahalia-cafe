const STEPS = ["Elige", "Paga", "Retira"];
const STEP_INDEX = { menu: 0, checkout: 1, confirm: 2 };

export default function Header({ screen, onLogoClick }) {
  const current = STEP_INDEX[screen];
  return (
    <header className="topbar">
      <div className="topbar-in">
        <button className="logo" onClick={onLogoClick} aria-label="MahalIA, volver a la carta">
          <span className="m">Mahal</span>
          <span className="ia">IA</span>
          <small>Café de cápsula para llevar</small>
        </button>
        <div className="steps" aria-label="Progreso del pedido">
          {STEPS.map((label, i) => (
            <span key={label} className={i === current ? "on" : ""}>
              {i + 1}
              <span className="sl">. {label}</span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
