/* ================================================================
   app.js — el jueguito 🌼
   ================================================================ */

const app = document.getElementById('app');
const capaConfeti = document.getElementById('confeti');

const estado = {
  ronda: 0,
  cancion: null,
  fotos: [],   // rutas de fotos que sí existen
  usadas: 0,
  gen: 0       // para que los temporizadores no toquen una pantalla vieja
};

const FLORES = { girasol, margarita, tulipan, ramita, florLila, florBlanca, hoja, rama };
const dibuja = (nombre, escala) => (FLORES[nombre] || girasol)(escala);

/* ---------------------------------------------------------------
   Fotos: busca fotos/f1 … fotos/f30 (.jpg .jpeg .png .webp)
   Si no hay ninguna, caen flores dibujadas.
   --------------------------------------------------------------- */
function probar(ruta) {
  return new Promise(ok => {
    const img = new Image();
    img.onload = () => ok(img.naturalWidth > 0 ? ruta : null);
    img.onerror = () => ok(null);
    img.src = ruta;
  });
}

async function buscarFotos() {
  const exts = ['jpg', 'jpeg', 'png', 'webp'];
  const halladas = [];
  let fallos = 0;
  for (let i = 1; i <= 30 && fallos < 4; i++) {
    let r = null;
    for (const e of exts) { r = await probar(`fotos/f${i}.${e}`); if (r) break; }
    if (r) { halladas.push(r); fallos = 0; } else fallos++;
  }
  estado.fotos = halladas;
}

function siguienteFoto() {
  if (!estado.fotos.length) return null;
  return estado.fotos[estado.usadas++ % estado.fotos.length];
}

/* ---------------------------------------------------------------
   Utilidades
   --------------------------------------------------------------- */
function pintar(html, despues) {
  estado.gen++;
  const mio = estado.gen;
  const vieja = app.querySelector('.pantalla');
  const meter = () => {
    if (estado.gen !== mio) return;
    app.innerHTML = html;
    window.scrollTo(0, 0);
    if (despues) despues(mio);
  };
  if (vieja) { vieja.classList.add('saliendo'); setTimeout(meter, 300); }
  else meter();
}

const vigente = g => estado.gen === g;

function progreso(indice) {
  return `<div class="progreso" aria-hidden="true">${
    CONTENIDO.rondas.map((_, i) =>
      `<span class="${i < indice ? 'hecha' : i === indice ? 'activa' : ''}"></span>`).join('')
  }</div>`;
}

function lluviaPetalos(cantidad = 26) {
  const colores = ['#F8DF8C', '#F3D067', '#F2A9C4', '#F9D2E0', '#AAAFEB', '#A6DBD4'];
  for (let i = 0; i < cantidad; i++) {
    const p = document.createElement('div');
    p.className = 'petalo';
    p.innerHTML = petalo(colores[i % colores.length]);
    p.style.left = Math.random() * 100 + 'vw';
    p.style.setProperty('--dx', (Math.random() * 140 - 70) + 'px');
    p.style.setProperty('--rot', (Math.random() * 900 - 300) + 'deg');
    const dur = 2.8 + Math.random() * 2.4;
    p.style.animationDuration = dur + 's';
    p.style.animationDelay = (Math.random() * .7) + 's';
    capaConfeti.appendChild(p);
    setTimeout(() => p.remove(), (dur + 1.2) * 1000);
  }
}

/* ---------------------------------------------------------------
   Cascada de fotos
   --------------------------------------------------------------- */
const SITIOS = [
  { x: -76, y: 0,   giro: -9, ini: -22 },
  { x: 74,  y: 18,  giro: 8,  ini: 20 },
  { x: -30, y: 74,  giro: 5,  ini: -14 },
  { x: 56,  y: 100, giro: -7, ini: 16 },
  { x: -84, y: 116, giro: 11, ini: -26 },
  { x: 6,   y: 36,  giro: -3, ini: 10 }
];

function cascada(cuantas) {
  const usados = [];
  const trozos = [];
  for (let i = 0; i < cuantas; i++) {
    const s = SITIOS[i % SITIOS.length];
    usados.push(s);
    const ruta = siguienteFoto();
    const dentro = ruta
      ? `<img src="${ruta}" alt="" loading="eager">`
      : `<div class="marco">${dibuja(['girasol', 'margarita', 'florLila', 'florBlanca', 'tulipan'][i % 5], .95)}</div>`;
    trozos.push(`<figure class="foto" style="
        left:calc(50% + ${s.x}px); top:${s.y}px; z-index:${i};
        --giro:${s.giro}deg; --giro-ini:${s.ini}deg;
        animation-delay:${.12 + i * .22}s">${dentro}</figure>`);
  }
  const alto = Math.max(...usados.map(s => s.y)) + 198;
  return `<div class="cascada" style="--alto:${alto}px;--alto-min:${Math.round(alto * .44)}px">
            <div class="pila">${trozos.join('')}</div>
          </div>`;
}

/* ---------------------------------------------------------------
   Música (Spotify)
   --------------------------------------------------------------- */
const reproductor = {
  caja: document.getElementById('reproductor'),
  marco: document.getElementById('marco-spotify'),
  titulo: document.getElementById('titulo-cancion'),
  enlace: document.getElementById('link-spotify'),
  controlador: null,

  embedSimple(id) {
    this.marco.innerHTML =
      `<iframe title="Reproductor" src="https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0"
         width="100%" height="80" frameborder="0" loading="eager"
         allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;
  },

  poner(cancion) {
    this.titulo.textContent = cancion.titulo;
    this.enlace.href = `https://open.spotify.com/track/${cancion.id}`;
    this.caja.hidden = false;
    app.classList.add('con-musica');

    const arrancar = (API) => {
      if (this.controlador) return;
      try {
        API.createController(this.marco, { uri: `spotify:track:${cancion.id}`, width: '100%', height: 80 },
          (ctrl) => {
            this.controlador = ctrl;
            setTimeout(() => { try { ctrl.play(); } catch (e) {} }, 350);
          });
      } catch (e) { this.embedSimple(cancion.id); }
    };

    if (window.__spotifyAPI) { arrancar(window.__spotifyAPI); return; }
    window.onSpotifyIframeApiReady = (API) => { window.__spotifyAPI = API; arrancar(API); };

    // si la API tarda demasiado, ponemos el reproductor normal
    setTimeout(() => {
      if (!this.controlador && !this.marco.querySelector('iframe')) this.embedSimple(cancion.id);
    }, 2600);
  },

  plegar() {
    this.caja.classList.toggle('plegado');
    document.getElementById('boton-plegar').textContent =
      this.caja.classList.contains('plegado') ? '▴' : '▾';
  }
};

/* ---------------------------------------------------------------
   PANTALLAS
   --------------------------------------------------------------- */

/* 1 · Portada */
function portada() {
  const c = CONTENIDO.portada;
  pintar(`
    <section class="pantalla">
      ${guirnalda()}
      <p class="sobretitulo">${c.sobretitulo}</p>
      <h1 class="nombre">${c.nombre}</h1>
      <div class="flor-grande">${girasol(2)}</div>
      <p class="sub">${c.subtitulo}</p>
      <button class="boton" onclick="elegirCancion()">${c.boton}</button>
    </section>`);
}

/* 2 · Elegir canción */
function elegirCancion() {
  const m = CONTENIDO.musica;
  pintar(`
    <section class="pantalla">
      ${guirnalda()}
      <h1 class="titulo">${m.titulo}</h1>
      <div class="canciones">
        ${m.canciones.map((s, i) => `
          <button class="cancion" onclick="tomarCancion(${i}, this)">
            <span class="flor-mini">${dibuja(s.flor, .9)}</span>
            <span class="txt">
              <span class="t">${s.titulo}</span>
              <span class="a">${s.artista}</span>
            </span>
          </button>`).join('')}
      </div>
      <p class="pie">${m.pie}</p>
    </section>`);
}

function tomarCancion(i, el) {
  estado.cancion = CONTENIDO.musica.canciones[i];
  document.querySelectorAll('.cancion').forEach(c => { c.classList.remove('elegida'); c.disabled = true; });
  el.classList.add('elegida');
  lluviaPetalos(16);
  reproductor.poner(estado.cancion);
  setTimeout(() => { estado.ronda = 0; ronda(); }, 750);
}

/* 3 · Ronda: primero caen las fotos, luego aparece la pregunta */
function ronda() {
  const r = CONTENIDO.rondas[estado.ronda];
  if (!r) return jardin();

  const espera = (.12 + (r.fotos - 1) * .22 + .95 + .5) * 1000;

  pintar(`
    <section class="pantalla">
      ${progreso(estado.ronda)}
      <p class="sobretitulo">${r.presentacion}</p>
      ${cascada(r.fotos)}
      <div class="bloque" hidden>
        <p class="pregunta">${r.pregunta}</p>
        <div class="opciones">
          ${r.opciones.map((o, i) => `
            <button class="opcion" onclick="responder(this)">
              <span class="bolita">${dibuja(['girasol', 'margarita', 'florLila'][i % 3], .42)}</span>
              <span>${o}</span>
            </button>`).join('')}
        </div>
      </div>
    </section>`,
  (g) => {
    setTimeout(() => {
      if (!vigente(g)) return;
      const c = document.querySelector('.cascada');
      const b = document.querySelector('.bloque');
      if (!c || !b) return;
      c.classList.add('compacta');
      b.hidden = false;
      b.classList.add('aparece');
    }, espera);
  });
}

function responder(el) {
  document.querySelectorAll('.opcion').forEach(o => { o.classList.remove('elegida'); o.disabled = true; });
  el.classList.add('elegida');
  setTimeout(celebrar, 480);
}

/* 4 · Celebración */
function celebrar() {
  const c = CONTENIDO.celebracion;
  const frase = c.frases[estado.ronda % c.frases.length];
  lluviaPetalos(34);

  pintar(`
    <section class="pantalla">
      ${progreso(estado.ronda)}
      <div class="celebra">
        <div class="flor-grande">${corazon(1.6)}</div>
        <p class="grito">${c.grito}</p>
        <p class="beso">${c.beso}</p>
      </div>
      <p class="sub">${frase}</p>
      <button class="boton" onclick="avanzar()">${c.boton}</button>
    </section>`);

  setTimeout(() => lluviaPetalos(16), 550);
}

function avanzar() {
  estado.ronda++;
  if (estado.ronda < CONTENIDO.rondas.length) ronda();
  else jardin();
}

/* 5 · El jardín */
function jardin() {
  const f = CONTENIDO.final;
  const tallos = CONTENIDO.rondas.map((r, i) => {
    const alto = 38 + (i % 4) * 22 + (r.flor === 'tulipan' ? 22 : 0);
    return `<div class="tallo" style="animation-delay:${.15 + i * .18}s">
        ${dibuja(r.flor, .82)}
        <i style="height:${alto}px"></i>
      </div>`;
  }).join('');

  pintar(`
    <section class="pantalla">
      <h1 class="titulo">${f.tituloJardin}</h1>
      <p class="sub">${f.textoJardin}</p>
      <div class="jardin">${tallos}</div>
      <div class="suelo"></div>
      <button class="boton" onclick="carta()">${f.botonCarta}</button>
    </section>`);

  setTimeout(() => lluviaPetalos(20), 650);
}

/* 6 · La carta */
function carta() {
  const f = CONTENIDO.final;
  lluviaPetalos(18);

  pintar(`
    <section class="pantalla pantalla-carta">
      <div class="flor-grande">${sobre(.78)}</div>
      <article class="carta">
        <span class="esquina ar">${ramita(.62, 28)}</span>
        <span class="esquina ai">${girasol(.62)}</span>
        <h2>${f.cartaTitulo}</h2>
        ${f.carta.map(p => `<p>${p}</p>`).join('')}
        <p class="firma">${f.firma}</p>
      </article>
      <button class="boton boton-fantasma" onclick="reiniciar()">${f.botonReiniciar}</button>
    </section>`);
}

function reiniciar() {
  estado.ronda = 0;
  estado.usadas = 0;
  portada();
}

/* ---------------------------------------------------------------
   Arranque
   --------------------------------------------------------------- */
(function inicio() {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="fondo-flor" style="top:5svh;left:-18px">${ramita(.85, -14)}</div>
    <div class="fondo-flor" style="top:34svh;right:-24px;animation-delay:.8s">${rama(.8, 18)}</div>
    <div class="fondo-flor" style="bottom:22svh;left:-20px;animation-delay:2.1s">${hoja(.5, 24)}</div>
    <div class="fondo-flor" style="bottom:34svh;right:-16px;animation-delay:1.5s">${ramita(.9, 165)}</div>`);

  portada();
  buscarFotos();   // en segundo plano
})();
