/* ============================================================
   flores.js — Flores estilo doodle pastel
   Contorno café grueso, relleno plano, detalles de puntitos.
   ============================================================ */

const FILTRO_LAPIZ = ''; /* el estilo es de línea limpia, sin textura */

const CAFE = 'var(--cafe)';
const GRUESO = 3;

function svg(contenido, px, extra = '') {
  return `<svg viewBox="-50 -50 100 100" style="width:${px}px;height:${px}px;${extra}"
    fill="none" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${contenido}</svg>`;
}

/* puntitos en círculo */
function anillo(radio, cantidad, r, color, giro = 0) {
  let d = '';
  for (let i = 0; i < cantidad; i++) {
    const a = (Math.PI * 2 * i) / cantidad + giro;
    d += `<circle cx="${(Math.cos(a) * radio).toFixed(2)}" cy="${(Math.sin(a) * radio).toFixed(2)}" r="${r}" fill="${color}" stroke="none"/>`;
  }
  return d;
}

/* ------------------------------------------------------------
   Flor amarilla de 6 pétalos — la protagonista del día 🌼
   ------------------------------------------------------------ */
function girasol(escala = 1, color = 'var(--flor-amarilla)') {
  let petalos = '', rayos = '';
  for (let i = 0; i < 6; i++) {
    const g = 60 * i;
    petalos += `<path d="M0 -7 C -15 -11 -22 -25 -16 -35 C -10 -45 10 -45 16 -35 C 22 -25 15 -11 0 -7 Z"
      transform="rotate(${g})" fill="${color}" stroke="${CAFE}" stroke-width="${GRUESO}"/>`;
  }
  for (let i = 0; i < 12; i++) {
    rayos += `<path d="M0 -12 L0 -19" transform="rotate(${30 * i})" stroke="${CAFE}" stroke-width="1.6" opacity=".75"/>`;
  }
  return svg(`
    <g>${petalos}</g>${rayos}
    <circle r="10" fill="var(--cafe-claro)" stroke="${CAFE}" stroke-width="${GRUESO}"/>
    ${anillo(5, 6, 1.5, 'var(--flor-rosa)')}
    <circle r="1.6" fill="var(--flor-rosa)" stroke="none"/>`, 62 * escala);
}

/* ------------------------------------------------------------
   Margarita de muchos pétalos (rosa por defecto)
   ------------------------------------------------------------ */
function margarita(escala = 1, color = 'var(--flor-rosa)') {
  let petalos = '';
  const n = 12;
  for (let i = 0; i < n; i++) {
    petalos += `<path d="M0 -14 C -7 -20 -7 -34 0 -42 C 7 -34 7 -20 0 -14 Z"
      transform="rotate(${(360 / n) * i})" fill="${color}" stroke="${CAFE}" stroke-width="${GRUESO}"/>`;
  }
  return svg(`
    <g>${petalos}</g>
    <circle r="14" fill="${CAFE}" stroke="none"/>
    <circle r="9.5" fill="var(--crema)" stroke="none"/>
    ${anillo(11.8, 10, 1.5, 'var(--flor-amarilla)')}
    ${anillo(4.6, 6, 1.5, 'var(--lila)')}
    <circle r="1.5" fill="var(--flor-amarilla)" stroke="none"/>`, 62 * escala);
}

/* ------------------------------------------------------------
   Flor de 5 pétalos (lila) con estambres
   ------------------------------------------------------------ */
function florLila(escala = 1, color = 'var(--lila)') {
  let petalos = '', venas = '';
  for (let i = 0; i < 5; i++) {
    const g = 72 * i;
    petalos += `<path d="M0 -6 C -17 -10 -25 -24 -18 -34 C -11 -44 11 -44 18 -34 C 25 -24 17 -10 0 -6 Z"
      transform="rotate(${g})" fill="${color}" stroke="${CAFE}" stroke-width="${GRUESO}"/>`;
    venas += `<path d="M-7 -16 C -12 -24 -11 -31 -6 -36" transform="rotate(${g})" stroke="${CAFE}" stroke-width="1.5" opacity=".6"/>`;
  }
  return svg(`
    <g>${petalos}</g>${venas}
    <circle r="9" fill="${CAFE}" stroke="none"/>
    ${anillo(4.5, 7, 1.7, 'var(--flor-amarilla)')}`, 62 * escala);
}

/* ------------------------------------------------------------
   Flor blanca con centro rosa
   ------------------------------------------------------------ */
function florBlanca(escala = 1) {
  let petalos = '';
  const n = 9;
  for (let i = 0; i < n; i++) {
    petalos += `<path d="M0 -16 C -10 -22 -10 -36 0 -40 C 10 -36 10 -22 0 -16 Z"
      transform="rotate(${(360 / n) * i})" fill="#FFFFFF" stroke="${CAFE}" stroke-width="${GRUESO}"/>`;
  }
  return svg(`
    <g>${petalos}</g>
    <circle r="16" fill="var(--flor-rosa)" stroke="${CAFE}" stroke-width="${GRUESO}"/>
    ${anillo(10, 9, 1.7, CAFE)}
    ${anillo(4.6, 5, 1.7, CAFE)}`, 62 * escala);
}

/* ------------------------------------------------------------
   Tulipán lila con hojitas menta
   ------------------------------------------------------------ */
function tulipan(escala = 1, color = 'var(--lila)') {
  return svg(`
    <path d="M0 44 C -2 24 -1 8 0 -2" stroke="${CAFE}" stroke-width="${GRUESO}"/>
    <path d="M-1 30 C -20 30 -30 20 -31 8 C -18 8 -5 16 -1 30 Z" fill="var(--menta)" stroke="${CAFE}" stroke-width="${GRUESO}"/>
    <path d="M1 22 C 18 24 27 14 28 3 C 16 2 5 9 1 22 Z" fill="var(--menta)" stroke="${CAFE}" stroke-width="${GRUESO}"/>
    <path d="M-21 -4 C -26 -20 -20 -32 -11 -36 C -8 -24 -8 -10 -6 -2 Z" fill="${color}" stroke="${CAFE}" stroke-width="${GRUESO}"/>
    <path d="M21 -4 C 26 -20 20 -32 11 -36 C 8 -24 8 -10 6 -2 Z" fill="${color}" stroke="${CAFE}" stroke-width="${GRUESO}"/>
    <path d="M-14 -6 C -16 -28 -7 -40 0 -42 C 7 -40 16 -28 14 -6 Z" fill="${color}" stroke="${CAFE}" stroke-width="${GRUESO}"/>
    <path d="M-7 -8 C -8 -24 -4 -34 0 -38" stroke="${CAFE}" stroke-width="1.5" opacity=".6"/>
    <path d="M7 -8 C 8 -24 4 -34 0 -38" stroke="${CAFE}" stroke-width="1.5" opacity=".6"/>
    <path d="M-17 -2 C -10 7 10 7 17 -2 C 11 -8 -11 -8 -17 -2 Z" fill="${CAFE}" stroke="${CAFE}" stroke-width="2"/>
    <circle cx="-9" cy="-44" r="2.4" fill="${CAFE}"/>
    <circle cx="0"  cy="-47" r="2.4" fill="${CAFE}"/>
    <circle cx="9"  cy="-44" r="2.4" fill="${CAFE}"/>`, 66 * escala);
}

/* ------------------------------------------------------------
   Helecho / rama de hojitas menta
   ------------------------------------------------------------ */
function ramita(escala = 1, giro = 0) {
  let hojas = '';
  for (let i = 0; i < 7; i++) {
    const y = -34 + i * 11.5;
    const r = 4.2 + i * 1.1;
    const l = 10 + i * 2.2;
    hojas += `<ellipse cx="${-l}" cy="${y}" rx="${l * .62}" ry="${r}" transform="rotate(-24 ${-l} ${y})" fill="var(--menta)" stroke="${CAFE}" stroke-width="2.4"/>`;
    hojas += `<ellipse cx="${l}" cy="${y + 5}" rx="${l * .62}" ry="${r}" transform="rotate(24 ${l} ${y + 5})" fill="var(--menta)" stroke="${CAFE}" stroke-width="2.4"/>`;
  }
  return svg(`
    <path d="M2 46 C 4 18 -2 -14 0 -44" stroke="${CAFE}" stroke-width="2.8"/>
    ${hojas}
    <ellipse cx="0" cy="-42" rx="4" ry="7" fill="var(--menta)" stroke="${CAFE}" stroke-width="2.4"/>`,
    66 * escala, `transform:rotate(${giro}deg)`);
}

/* ------------------------------------------------------------
   Hoja de contorno con venitas
   ------------------------------------------------------------ */
function hoja(escala = 1, giro = 0) {
  let venas = '';
  for (let i = 0; i < 5; i++) {
    const y = -24 + i * 11;
    venas += `<path d="M0 ${y} L -13 ${y + 8}" stroke="${CAFE}" stroke-width="1.6" opacity=".7"/>`;
    venas += `<path d="M0 ${y} L 13 ${y + 8}" stroke="${CAFE}" stroke-width="1.6" opacity=".7"/>`;
  }
  return svg(`
    <path d="M0 40 C -24 16 -24 -16 0 -40 C 24 -16 24 16 0 40 Z" fill="#FFFFFF" stroke="${CAFE}" stroke-width="${GRUESO}"/>
    <path d="M0 40 L0 -40" stroke="${CAFE}" stroke-width="2"/>
    ${venas}`, 52 * escala, `transform:rotate(${giro}deg)`);
}

/* ------------------------------------------------------------
   Ramita con florecitas amarillas
   ------------------------------------------------------------ */
function rama(escala = 1, giro = 0) {
  const florcita = (x, y) => `
    <g transform="translate(${x} ${y})">
      ${anillo(5, 5, 3.4, 'var(--flor-amarilla)')}
      <circle r="2.6" fill="var(--flor-amarilla)" stroke="${CAFE}" stroke-width="1.4"/>
      <path d="M-8 -6 L -11 -10 M0 -8 L 0 -13 M8 -6 L 11 -10" stroke="${CAFE}" stroke-width="1.4"/>
    </g>`;
  return svg(`
    <path d="M-6 46 C 0 22 -4 -6 6 -34" stroke="${CAFE}" stroke-width="2.6"/>
    <path d="M-2 22 C -16 20 -22 10 -22 2 C -12 3 -4 10 -2 22 Z" fill="var(--menta)" stroke="${CAFE}" stroke-width="2.4"/>
    <path d="M0 4 C 14 2 20 -8 20 -16 C 10 -15 2 -8 0 4 Z" fill="var(--menta)" stroke="${CAFE}" stroke-width="2.4"/>
    <path d="M1 -12 C -12 -16 -17 -26 -16 -33 C -7 -30 -1 -22 1 -12 Z" fill="var(--menta)" stroke="${CAFE}" stroke-width="2.4"/>
    ${florcita(16, -30)}${florcita(-14, 34)}
    <circle cx="-22" cy="26" r="2" fill="${CAFE}"/>
    <circle cx="-26" cy="32" r="2" fill="${CAFE}"/>`,
    66 * escala, `transform:rotate(${giro}deg)`);
}

/* ------------------------------------------------------------
   Pétalo suelto (confeti)
   ------------------------------------------------------------ */
function petalo(color) {
  return `<svg viewBox="-14 -22 28 44" width="17" height="27" fill="none" aria-hidden="true">
    <path d="M0 18 C -11 8 -12 -10 0 -19 C 12 -10 11 8 0 18 Z" fill="${color}" stroke="#5B4137" stroke-width="2.4" stroke-linejoin="round"/>
  </svg>`;
}

/* ------------------------------------------------------------
   Corazón
   ------------------------------------------------------------ */
function corazon(escala = 1, color = 'var(--flor-rosa)') {
  return `<svg viewBox="-50 -46 100 96" style="width:${46 * escala}px;height:${44 * escala}px" fill="none" aria-hidden="true">
    <path d="M0 40 C -34 16 -44 -4 -44 -16 C -44 -34 -28 -42 -16 -42 C -7 -42 -1 -36 0 -30
             C 1 -36 7 -42 16 -42 C 28 -42 44 -34 44 -16 C 44 -4 34 16 0 40 Z"
      fill="${color}" stroke="#5B4137" stroke-width="3.4" stroke-linejoin="round"/>
    <circle cx="-14" cy="-16" r="2.6" fill="#FFF" opacity=".85"/>
  </svg>`;
}

/* ------------------------------------------------------------
   Sobre
   ------------------------------------------------------------ */
function sobre(escala = 1) {
  return `<svg viewBox="-4 -4 128 92" style="width:${124 * escala}px;height:${90 * escala}px" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="116" height="80" rx="9" fill="var(--papel)" stroke="#5B4137" stroke-width="3.4"/>
    <path d="M2 11 L60 51 L118 11" stroke="#5B4137" stroke-width="3.4" stroke-linejoin="round"/>
    <path d="M2 79 L45 43 M118 79 L75 43" stroke="#5B4137" stroke-width="2.2" opacity=".55"/>
    <g transform="translate(60 30) scale(.5)">${anillo(9, 6, 5, 'var(--flor-amarilla)')}<circle r="4.5" fill="#5B4137"/></g>
  </svg>`;
}

/* ------------------------------------------------------------
   Guirnalda decorativa
   ------------------------------------------------------------ */
function guirnalda() {
  return `<div class="guirnalda" aria-hidden="true">
    ${ramita(.6, -22)}${hoja(.42, -34)}${margarita(.52)}${girasol(.72)}${florLila(.5)}${hoja(.42, 30)}${ramita(.6, 22)}
  </div>`;
}

/* ------------------------------------------------------------
   Ramillete bultoso — amarillo + morado mezclados, bien tupido
   Se usa arriba de casi cada pantalla.
   ------------------------------------------------------------ */
const _RAMILLETE_PIEZAS = [
  (e) => girasol(e),
  (e) => florLila(e),
  (e) => margarita(e),
  (e) => florLila(e, 'var(--lila-clara)'),
  (e) => girasol(e, 'var(--flor-amarilla-h)'),
  (e) => margarita(e, 'var(--flor-rosa-clara)'),
  (e) => hoja(e * .82, -20),
  (e) => hoja(e * .82, 24),
  (e) => ramita(e * .9, -16),
  (e) => ramita(e * .9, 16)
];

function ramillete(semilla = 0, piezas = 7) {
  let out = '';
  for (let i = 0; i < piezas; i++) {
    const idx = (semilla + i * 3) % _RAMILLETE_PIEZAS.length;
    const escala = .5 + ((semilla + i * 7) % 4) * .09;
    out += `<span class="pieza-ramillete" style="--i:${i}">${_RAMILLETE_PIEZAS[idx](escala)}</span>`;
  }
  return `<div class="ramillete" aria-hidden="true">${out}</div>`;
}

/* ------------------------------------------------------------
   Logo de Spotify (solo decorativo/enlace, no reproduce nada)
   ------------------------------------------------------------ */
function iconoSpotify(px = 20) {
  return `<svg viewBox="0 0 24 24" width="${px}" height="${px}" aria-hidden="true">
    <circle cx="12" cy="12" r="12" fill="#1ED760"/>
    <path d="M6.6 8.7c3.2-.9 7.6-.7 10.3.9a.75.75 0 11-.77 1.29c-2.4-1.42-6.3-1.63-9.1-.83a.75.75 0 11-.43-1.44Zm-.28 2.9c2.7-.78 6.8-.63 9.4.9a.7.7 0 11-.7 1.2c-2.3-1.34-6-1.48-8.4-.8a.7.7 0 11-.3-1.3Zm-.24 2.85c2.3-.65 5.7-.5 7.9.78a.6.6 0 11-.6 1.03c-1.9-1.1-5-1.24-7-.68a.6.6 0 11-.3-1.13Z" fill="#053018"/>
  </svg>`;
}
