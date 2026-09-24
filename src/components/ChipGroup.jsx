// Grupo de botones grandes donde se elige una sola opción.
export default function ChipGroup({ labelId, options, value, onChange }) {
  return (
    <div className="chips" role="group" aria-labelledby={labelId}>
      {options.map((o) => (
        <button key={o.id} className="chip" aria-pressed={value === o.id} onClick={() => onChange(o.id)}>
          {o.label}
          <small>{o.sub}</small>
        </button>
      ))}
    </div>
  );
}
