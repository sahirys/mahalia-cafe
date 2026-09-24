// Horas de retiro: "lo antes posible" + horas reales redondeadas a 5 minutos.
const OFFSETS = [10, 15, 20, 30, 45];

const fmt = (d) => d.toLocaleTimeString("es", { hour: "numeric", minute: "2-digit" });

export function pickupSlots(now = new Date()) {
  const base = new Date(now.getTime());
  base.setSeconds(0, 0);
  const slots = [{ id: "asap", label: "Lo antes posible", sub: "≈ 5 min" }];
  OFFSETS.forEach((min) => {
    const d = new Date(base.getTime() + min * 60000);
    d.setMinutes(Math.ceil(d.getMinutes() / 5) * 5);
    slots.push({ id: "t" + min, label: fmt(d), sub: `en ${min} min` });
  });
  return slots;
}

export function pickupLabel(slotId) {
  if (slotId === "asap") return "en ≈ 5 minutos";
  const slot = pickupSlots().find((s) => s.id === slotId);
  return slot ? `a las ${slot.label}` : "en ≈ 5 minutos";
}
