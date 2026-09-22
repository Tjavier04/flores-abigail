/* ================================================================
   contenido.js  —  💛 AQUÍ SE EDITA TODO EL TEXTO 💛
   Cambia lo que quieras aquí dentro. No hace falta tocar nada más.
   ================================================================ */

const CONTENIDO = {

  /* ---------- PORTADA ---------- */
  portada: {
    sobretitulo: 'feliz día de las flores amarillas',
    nombre: 'Abigail',
    subtitulo: 'Te preparé un jardincito para que lo recorras conmigo.',
    boton: 'Ábreme 🌻'
  },

  /* ---------- ELEGIR CANCIÓN ---------- */
  musica: {
    titulo: 'Elige la canción para empezar',
    pie: 'Va a sonar contigo todo el camino 🎧',
    canciones: [
      { titulo: 'I wanna be your boyfriend', artista: 'para ti', id: '3ODkrhZR29WfbbWpHEGGud', flor: 'girasol' },
      { titulo: 'Verte de cerca',            artista: 'para ti', id: '1lBtesQvkn4IC5RSl8oTaE', flor: 'margarita' },
      { titulo: 'Hey Lover',                 artista: 'para ti', id: '4q283tKkBnz6OKcqZNVlmI', flor: 'tulipan' }
    ]
  },

  /* ---------- CELEBRACIÓN (sale con cualquier respuesta) ---------- */
  celebracion: {
    grito: 'MMWMHUA',
    beso: 'besito',
    frases: [
      'Respuesta perfecta, como tú.',
      'Sabía que ibas a decir eso.',
      'Justo lo que esperaba de mi niña.',
      'No hay respuesta mala si la dices tú.',
      'Esa sonrisa la sentí desde aquí.'
    ],
    boton: 'Siguiente 🌼'
  },

  /* ---------- LAS RONDAS DEL JUEGO ----------
     presentacion : texto corto que aparece mientras caen las fotos
     pregunta     : la pregunta, en letra romántica
     opciones     : tres respuestas (todas son correctas 💛)
     fotos        : cuántas fotos caen en esa ronda
  ------------------------------------------- */
  rondas: [
    {
      flor: 'girasol',
      presentacion: 'Empecemos por el principio…',
      pregunta: '¿Te acuerdas del día en que empezamos?',
      opciones: ['Cada detalle', 'Como si fuera hoy', 'Mi día favorito'],
      fotos: 4
    },
    {
      flor: 'florLila',
      presentacion: 'Hay días que me los sé de memoria.',
      pregunta: 'Si pudiéramos escaparnos mañana, ¿a dónde nos vamos?',
      opciones: ['A la playa', 'A ver montañas', 'A donde sea, contigo'],
      fotos: 3
    },
    {
      flor: 'tulipan',
      presentacion: 'Y mira cómo te ves siempre…',
      pregunta: '¿Cuántas flores amarillas mereces hoy?',
      opciones: ['Veintiuna', 'Un ramo entero', 'Un campo infinito'],
      fotos: 4
    },
    {
      flor: 'florBlanca',
      presentacion: 'Te lo pregunto en serio, eh.',
      pregunta: '¿Qué quieres que haga ahorita mismo?',
      opciones: ['Abrazarme fuerte', 'Un besito', 'Las dos cosas'],
      fotos: 3
    },
    {
      flor: 'margarita',
      presentacion: 'Última, mi amor.',
      pregunta: '¿Me dejas seguir siendo tu novio un añito más?',
      opciones: ['Sí', 'Sí, obvio', 'Sí, mil veces'],
      fotos: 5
    }
  ],

  /* ---------- FINAL ---------- */
  final: {
    tituloJardin: 'Mira el jardín que hicimos',
    textoJardin: 'Una flor por cada respuesta tuya.',
    botonCarta: 'Tengo algo que decirte 💌',

    /* 👇👇 EL MENSAJE BONITO VA AQUÍ 👇👇
       Cada línea del array es un párrafo. */
    cartaTitulo: 'Para mi Abigail',
    carta: [
      'Hoy es el día de las flores amarillas y yo no encontré ninguna que se te pareciera, así que te hice este jardín.',
      'Gracias por ser mi lugar tranquilo, por reírte de mis tonterías y por quedarte incluso los días en que no soy fácil.',
      'Te amo mucho, más de lo que me alcanzan las palabras y muchísimo más de lo que caben en esta pantalla.'
    ],
    firma: 'Tu novio, que te ama 💛',

    botonReiniciar: 'Volver a empezar 🌻'
  }
};
