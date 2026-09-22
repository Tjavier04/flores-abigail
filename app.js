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
  lluviaPetalos(55); // que cubran la pantalla en cada transición
}

const vigente = g => estado.gen === g;

function lluviaPetalos(cantidad = 26) {
  const colores = ['#F8DF8C', '#F3D067', '#F2A9C4', '#F9D2E0', '#AAAFEB', '#8E93E6', '#A6DBD4', '#E14B3E', '#F0A03C'];
  for (let i = 0; i < cantidad; i++) {
    const p = document.createElement('div');
    p.className = 'petalo';
    p.innerHTML = petalo(colores[i % colores.length]);
    p.style.left = Math.random() * 100 + 'vw';
    p.style.setProperty('--dx', (Math.random() * 170 - 85) + 'px');
    p.style.setProperty('--rot', (Math.random() * 900 - 300) + 'deg');
    const escala = .8 + Math.random() * .7;
    p.style.transform = `scale(${escala.toFixed(2)})`;
    const dur = 2.6 + Math.random() * 2.8;
    p.style.animationDuration = dur + 's';
    p.style.animationDelay = (Math.random() * 1.1) + 's';
    capaConfeti.appendChild(p);
    setTimeout(() => p.remove(), (dur + 1.6) * 1000);
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
      lluviaPetalos(70);
      setTimeout(alAcertar, 850);
    } else {
      btn.classList.remove('incorrecta');
      void btn.offsetWidth; // reinicia la animación si se repite
      btn.classList.add('incorrecta');
      const pie = document.getElementById('pie-error');
      if (pie) pie.textContent = CONTENIDO.fraseError;
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
  lluviaPetalos(90);
  pintar(`
    <section class="pantalla">
      ${ramillete(9, 8)}
      <div class="celebra">
        <div class="flor-grande">${corazon(1.6)}</div>
        <p class="grito">${c.grito}</p>
        <p class="emoji-grande">${c.emoji}</p>
      </div>
      <p class="sub">${c.texto}</p>
      <button class="boton" onclick="poema()">${c.boton}</button>
    </section>`);
  setTimeout(() => lluviaPetalos(50), 450);
}

/* 6 · El poema — efecto de baraja: toca la carta y se avienta a un lado,
   revelando la de abajo. Todo dentro de una sola pantalla. */
function poema() {
  const semilla = 11;
  pintar(`
    <section class="pantalla pantalla-poema">
      ${ramillete(semilla, 6)}
      <div class="mazo" id="mazo"></div>
      <p class="pie pie-poema" id="pie-poema">${CONTENIDO.poemaPie}</p>
    </section>`,
  (g) => { if (vigente(g)) _iniciarMazo(g); });
}

function _iniciarMazo(gen) {
  const lineas = CONTENIDO.poema;
  const mazo = document.getElementById('mazo');
  let i = 0;
  let animando = false;

  const rotacion = (n) => (((n * 47) % 11) - 5) * 1; // -5..5, determinístico

  const pintarCarta = (idx, clase) => {
    const el = document.createElement('div');
    el.className = `carta-mazo ${clase}`;
    el.style.setProperty('--r', rotacion(idx) + 'deg');
    el.innerHTML = `<p>${lineas[idx].replace(/\n/g, '<br>')}</p>`;
    return el;
  };

  const dibujarPar = () => {
    mazo.innerHTML = '';
    if (i < lineas.length) mazo.appendChild(pintarCarta(i, 'actual'));
    if (i + 1 < lineas.length) mazo.appendChild(pintarCarta(i + 1, 'siguiente'));
  };

  const tocar = () => {
    if (!vigente(gen) || animando) return;
    const actual = mazo.querySelector('.carta-mazo.actual');
    if (!actual) return;
    animando = true;
    lluviaPetalos(22);
    const haciaLaIzq = i % 2 === 0;
    actual.style.setProperty('--tx', haciaLaIzq ? '-160%' : '160%');
    actual.style.setProperty('--tr', haciaLaIzq ? '-28deg' : '28deg');
    actual.classList.remove('actual');
    actual.classList.add('tirada');
    const siguiente = mazo.querySelector('.carta-mazo.siguiente');
    if (siguiente) { siguiente.classList.remove('siguiente'); siguiente.classList.add('actual'); }

    setTimeout(() => {
      if (!vigente(gen)) return;
      actual.remove();
      i++;
      if (i >= lineas.length) { preguntaAutor(); return; }
      if (i + 1 < lineas.length) mazo.appendChild(pintarCarta(i + 1, 'siguiente'));
      animando = false;
    }, 480);
  };

  mazo.onclick = tocar;
  dibujarPar();
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
  lluviaPetalos(55);
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

/* 9 · Final: foto grande + frase */
function final() {
  const f = CONTENIDO.final;
  lluviaPetalos(90);
  pintar(`
    <section class="pantalla pantalla-final">
      ${ramillete(17, 8)}
      <figure class="foto-final">
        <img src="${f.imagen}" alt="${f.imagenAlt}" loading="eager">
      </figure>
      <p class="frase-final">${f.texto}</p>
      <button class="boton boton-fantasma" onclick="despedida()">${f.boton}</button>
    </section>`);
  setTimeout(() => lluviaPetalos(50), 450);
}

/* 10 · Despedida: el ramito + PD + One moreeee??? */
function despedida() {
  const d = CONTENIDO.despedida;
  lluviaPetalos(60);
  pintar(`
    <section class="pantalla pantalla-despedida">
      <figure class="foto-ramito">
        <img src="${d.imagen}" alt="${d.imagenAlt}" loading="eager">
      </figure>
      <div class="pd">
        ${d.texto.map(l => `<p>${l}</p>`).join('')}
      </div>
      <p class="sub">${d.texto2}</p>
      <button class="boton" onclick="reiniciar()">${d.boton}</button>
    </section>`);
  setTimeout(() => lluviaPetalos(60), 500);
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
