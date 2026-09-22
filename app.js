/* ================================================================
   app.js — el jueguito de mi niña 🌻💜
   ================================================================ */

const app = document.getElementById('app');
const capaConfeti = document.getElementById('confeti');

const estado = {
  cancion: null,
  preguntaActual: 0,
  poemaActual: 0,
  gen: 0
};

const FLORES = { girasol, margarita, tulipan, ramita, florLila, florBlanca, hoja, rama };
const dibuja = (nombre, escala) => (FLORES[nombre] || girasol)(escala);
const FLORES_PREGUNTA = ['girasol', 'florLila', 'margarita', 'tulipan'];

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
  lluviaPetalos(14);
}

const vigente = g => estado.gen === g;

function lluviaPetalos(cantidad = 26) {
  const colores = ['#F8DF8C', '#F3D067', '#F2A9C4', '#F9D2E0', '#AAAFEB', '#8E93E6', '#A6DBD4'];
  for (let i = 0; i < cantidad; i++) {
    const p = document.createElement('div');
    p.className = 'petalo';
    p.innerHTML = petalo(colores[i % colores.length]);
    p.style.left = Math.random() * 100 + 'vw';
    p.style.setProperty('--dx', (Math.random() * 150 - 75) + 'px');
    p.style.setProperty('--rot', (Math.random() * 900 - 300) + 'deg');
    const dur = 2.8 + Math.random() * 2.6;
    p.style.animationDuration = dur + 's';
    p.style.animationDelay = (Math.random() * .8) + 's';
    capaConfeti.appendChild(p);
    setTimeout(() => p.remove(), (dur + 1.2) * 1000);
  }
}

/* ---------------------------------------------------------------
   Música local (mp3)
   --------------------------------------------------------------- */
const reproductor = {
  caja: document.getElementById('reproductor'),
  audio: document.getElementById('audio'),
  titulo: document.getElementById('titulo-cancion'),
  enlace: document.getElementById('link-spotify'),
  boton: document.getElementById('boton-play'),

  poner(cancion) {
    this.titulo.textContent = cancion.titulo;
    this.enlace.href = cancion.enlace;
    this.audio.src = cancion.archivo;
    this.caja.hidden = false;
    app.classList.add('con-musica');
    this.audio.play().then(() => this.marcarReproduciendo(true)).catch(() => this.marcarReproduciendo(false));
  },

  alternar() {
    if (this.audio.paused) this.audio.play().then(() => this.marcarReproduciendo(true)).catch(() => {});
    else { this.audio.pause(); this.marcarReproduciendo(false); }
  },

  marcarReproduciendo(si) {
    this.boton.textContent = si ? '⏸' : '▶';
    this.caja.classList.toggle('sonando', si);
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
      ${ramillete(1, 8)}
      <p class="sobretitulo">${c.linea1}</p>
      <h1 class="nombre">${c.nombre}</h1>
      <p class="sub">${c.linea2}</p>
      <div class="flor-grande">${girasol(1.7)}${florLila(1.3)}</div>
      <button class="boton" onclick="elegirCancion()">${c.boton}</button>
    </section>`);
}

/* 2 · Elegir canción */
function elegirCancion() {
  const m = CONTENIDO.musica;
  pintar(`
    <section class="pantalla">
      ${ramillete(2, 7)}
      <h1 class="titulo">${m.titulo}</h1>
      <div class="canciones">
        ${m.canciones.map((s, i) => `
          <button class="cancion" onclick="tomarCancion(${i}, this)">
            <span class="flor-mini">${dibuja(s.flor, .9)}</span>
            <span class="txt">
              <span class="t">${s.titulo}</span>
              <span class="a">${iconoSpotify(13)} Spotify</span>
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
  lluviaPetalos(20);
  reproductor.poner(estado.cancion);
  setTimeout(mensajeIntro, 750);
}

/* 3 · Mensaje antes del juego (texto tal cual, sin tocar) */
function mensajeIntro() {
  pintar(`
    <section class="pantalla">
      ${ramillete(3, 6)}
      <div class="carta-mini">
        ${CONTENIDO.intro.map(p => `<p>${p}</p>`).join('')}
      </div>
      <button class="boton" onclick="pregunta(0)">${CONTENIDO.introBoton}</button>
    </section>`);
}

/* ---------------------------------------------------------------
   Motor de preguntas con reintento (se reusa para las 4 + la del autor)
   --------------------------------------------------------------- */
function pantallaPregunta({ etiqueta, pregunta, opciones, correcta, flor, progresoActual, progresoTotal }, alAcertar) {
  const semilla = (progresoActual ?? 0) + 5;
  pintar(`
    <section class="pantalla">
      ${progresoTotal ? `<div class="progreso" aria-hidden="true">${
        Array.from({ length: progresoTotal }, (_, i) =>
          `<span class="${i < progresoActual ? 'hecha' : i === progresoActual ? 'activa' : ''}"></span>`).join('')
      }</div>` : ''}
      ${ramillete(semilla, 7)}
      ${etiqueta ? `<p class="sobretitulo">${etiqueta}</p>` : ''}
      <p class="pregunta">${pregunta}</p>
      <div class="opciones">
        ${opciones.map((o, i) => `
          <button class="opcion" data-i="${i}" onclick="_responderPregunta(${i})">
            <span class="bolita">${dibuja(FLORES_PREGUNTA[((flor ?? 0) + i) % FLORES_PREGUNTA.length], .4)}</span>
            <span>${o}</span>
          </button>`).join('')}
      </div>
      <p class="pie-error" id="pie-error">&nbsp;</p>
    </section>`);

  window._responderPregunta = (i) => {
    const btn = document.querySelector(`.opcion[data-i="${i}"]`);
    if (!btn || btn.disabled) return;
    if (i === correcta) {
      document.querySelectorAll('.opcion').forEach(o => o.disabled = true);
      btn.classList.add('correcta');
      lluviaPetalos(24);
      setTimeout(alAcertar, 850);
    } else {
      btn.classList.remove('incorrecta');
      void btn.offsetWidth; // reinicia la animación si se repite
      btn.classList.add('incorrecta');
      const pie = document.getElementById('pie-error');
      if (pie) pie.textContent = CONTENIDO.frasesError[Math.floor(Math.random() * CONTENIDO.frasesError.length)];
      setTimeout(() => btn.classList.remove('incorrecta'), 650);
    }
  };
}

/* 4 · Las 4 preguntas */
function pregunta(i) {
  const total = CONTENIDO.preguntas.length;
  if (i >= total) return celebracionFinal();
  const p = CONTENIDO.preguntas[i];
  pantallaPregunta({
    pregunta: p.pregunta,
    opciones: p.opciones,
    correcta: p.correcta,
    flor: p.flor,
    progresoActual: i,
    progresoTotal: total
  }, () => pregunta(i + 1));
}

/* 5 · Celebración (una sola vez) */
function celebracionFinal() {
  const c = CONTENIDO.celebracionFinal;
  lluviaPetalos(40);
  pintar(`
    <section class="pantalla">
      ${ramillete(9, 8)}
      <div class="celebra">
        <div class="flor-grande">${corazon(1.6)}</div>
        <p class="grito">${c.grito}</p>
        <p class="emoji-grande">${c.emoji}</p>
      </div>
      <p class="sub">${c.texto}</p>
      <button class="boton" onclick="poema(0)">${c.boton}</button>
    </section>`);
  setTimeout(() => lluviaPetalos(20), 500);
}

/* 6 · El poema — tarjetitas que se deslizan, toca para seguir */
function poema(i) {
  const lineas = CONTENIDO.poema;
  if (i >= lineas.length) return preguntaAutor();
  const semilla = i + 11;
  pintar(`
    <section class="pantalla pantalla-poema" onclick="poema(${i + 1})">
      ${ramillete(semilla, 6)}
      <div class="tarjeta-poema">
        <p>${lineas[i].replace(/\n/g, '<br>')}</p>
      </div>
      <p class="pie pie-poema">${CONTENIDO.poemaPie}</p>
    </section>`);
}

/* 7 · Pregunta del autor (mismo motor) */
function preguntaAutor() {
  const p = CONTENIDO.preguntaAutor;
  pantallaPregunta({
    etiqueta: p.etiqueta,
    pregunta: p.pregunta,
    opciones: p.opciones,
    correcta: p.correcta,
    flor: 0
  }, papiroFrida);
}

/* 8 · Papiro de Frida */
function papiroFrida() {
  const f = CONTENIDO.papiroFrida;
  lluviaPetalos(18);
  pintar(`
    <section class="pantalla pantalla-papiro">
      ${ramillete(13, 5)}
      <article class="papiro">
        <span class="esquina-papiro ar">${florLila(.6)}</span>
        <span class="esquina-papiro ai">${girasol(.55)}</span>
        <h2>${f.titulo}</h2>
        <figure class="foto-papiro">
          <img src="${f.imagen}" alt="${f.imagenAlt}" loading="eager">
        </figure>
        ${f.texto.map(p => `<p>${p}</p>`).join('')}
      </article>
      <button class="boton" onclick="final()">${f.boton}</button>
    </section>`);
}

/* 9 · Final: foto grande + frase + One more */
function final() {
  const f = CONTENIDO.final;
  lluviaPetalos(30);
  pintar(`
    <section class="pantalla pantalla-final">
      ${ramillete(17, 8)}
      <figure class="foto-final">
        <img src="${f.imagen}" alt="${f.imagenAlt}" loading="eager">
      </figure>
      <p class="frase-final">${f.texto}</p>
      <button class="boton boton-fantasma" onclick="reiniciar()">${f.boton}</button>
    </section>`);
  setTimeout(() => lluviaPetalos(26), 500);
}

function reiniciar() {
  estado.preguntaActual = 0;
  estado.poemaActual = 0;
  portada();
}

/* ---------------------------------------------------------------
   Arranque
   --------------------------------------------------------------- */
(function inicio() {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="fondo-flor" style="top:5svh;left:-18px">${ramita(.85, -14)}</div>
    <div class="fondo-flor" style="top:34svh;right:-24px;animation-delay:.8s">${rama(.8, 18)}</div>
    <div class="fondo-flor" style="bottom:22svh;left:-20px;animation-delay:2.1s">${florLila(.55, 'var(--lila-clara)')}</div>
    <div class="fondo-flor" style="bottom:34svh;right:-16px;animation-delay:1.5s">${ramita(.9, 165)}</div>`);
  portada();
})();
