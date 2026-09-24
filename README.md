# MahalIA · Café de cápsula para llevar

E-commerce mobile-first para pedir café de cápsula desde el celular y retirarlo listo en el local, sin fila.

> **Estado:** prototipo aprobado, convertido a React + Vite.
> Los precios son **de ejemplo (provisionales)** y el pago es **simulado**.

## Qué hace

1. Carta de 4 cápsulas con ilustración, nombre, descripción y precio.
2. Elegir cantidad y agregar al pedido.
3. Ver el pedido con el total.
4. Elegir la hora de retiro.
5. Pagar como invitado (sin registro ni contraseña). Pago simulado.
6. Confirmación con número de pedido.
7. Botón "Repetir mi último pedido" (se guarda en el navegador).

## Cómo correrlo en tu computadora

Necesitas tener instalado [Node.js](https://nodejs.org) (versión 18 o más nueva).

```bash
npm install     # instala las dependencias (solo la primera vez)
npm run dev     # abre el proyecto en http://localhost:5173
```

Para generar la versión final: `npm run build` (crea la carpeta `dist`).

## Publicar en Vercel

Vercel detecta Vite solo. Usa estos valores si te los pide:

- Framework: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

## Cómo está organizado

```
src/
  App.jsx              ← el flujo: carta → pedido y pago → confirmación
  styles.css           ← colores y tipografías de la marca
  data/products.js     ← la carta y los precios (provisionales)
  components/          ← piezas reutilizables (tarjeta de café, selector de cantidad…)
  screens/             ← las 3 pantallas
  utils/               ← formato de precios y horas de retiro
  hooks/useLastOrder.js← guarda el último pedido para "Repetir"
```

## Identidad visual

| Uso | Color |
|---|---|
| "Mahal" en el logo | Azul intenso `#011C40` |
| "IA" en el logo y botones de compra | Rojo `#B31D15` |
| Base cálida: textos, encabezados, fondos oscuros | Marrón `#3E2723` |
| Fondos suaves y tarjetas (nunca texto sobre blanco) | Azul claro `#A9C9E8` |

Tipografías: **Fraunces** (títulos) y **Lato** (textos), desde Google Fonts.

## Pendiente para las próximas etapas

- Precios reales y fotos reales de los productos.
- Pasarela de pago real.
- Backend para recibir los pedidos y generar el número de pedido.
- Panel de administración para el local.
