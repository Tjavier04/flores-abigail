/* ================================================================
   contenido.js  —  💛 AQUÍ SE EDITA TODO EL TEXTO 💜
   ================================================================ */

const CONTENIDO = {

  /* ---------- PORTADA ---------- */
  portada: {
    linea1: 'Te amo muchísimo',
    nombre: 'Mi amor',
    linea2: 'esto es para ti',
    boton: 'Ábreme 🌷'
  },

  /* ---------- ELEGIR CANCIÓN ---------- */
  musica: {
    titulo: 'Elige la canción para empezar',
    pie: 'Va a sonar contigo todo el camino 🎧',
    canciones: [
      { titulo: 'I wanna be your boyfriend', archivo: 'musica/cancion1.mp3', enlace: 'https://open.spotify.com/track/3ODkrhZR29WfbbWpHEGGud', flor: 'girasol' },
      { titulo: 'Verte de cerca',            archivo: 'musica/cancion2.mp3', enlace: 'https://open.spotify.com/track/1lBtesQvkn4IC5RSl8oTaE', flor: 'florLila' },
      { titulo: 'Hey Lover',                 archivo: 'musica/cancion3.mp3', enlace: 'https://open.spotify.com/track/4q283tKkBnz6OKcqZNVlmI', flor: 'tulipan' }
    ]
  },

  /* ---------- MENSAJE ANTES DEL JUEGO (no tocar el texto) ---------- */
  intro: [
    'No pretendo alargar tu espera para el mensaje que te escribí hace tiempo, pero me surgió la idea de hacerlo divertido, porque yo también tengo ese estilo al dar detalles jejem',
    'Tendrá que responder cuatro preguntas a forma de juego, quiele? chi o nu, no impolta, uste conteste'
  ],
  introBoton: 'Jugamos 🌼',

  /* ---------- LAS 4 PREGUNTAS ----------
     correcta: índice (0,1,2) de la opción correcta.
     Si falla, la opción se pone rojita suave y puede intentar de nuevo.
  ------------------------------------------- */
  preguntas: [
    {
      pregunta: '¿Cuándo nos conocimos?',
      opciones: ['30/Julio', '01/Agosto', '30/Agosto'],
      correcta: 0,
      flor: 0
    },
    {
      pregunta: '¿Qué me gusta más de su apariencia?',
      opciones: ['Sus preciosos ojitos chinitos', 'Su hermosa boquita besable', 'Su riquísima tez blanquita'],
      correcta: 0,
      flor: 1
    },
    {
      pregunta: '¿Cuándo fue nuestro primer beso?',
      opciones: ['18 de julio', '09 de julio', '02 de julio'],
      correcta: 0,
      flor: 2
    },
    {
      pregunta: '¿Desde cuándo somos más que mejores amigos?',
      opciones: ['06 de junio/2025', '06 de junio/2024', '06 de mayo del 2026'],
      correcta: 0,
      flor: 3
    }
  ],

  /* frase si se equivoca (no tocar el texto) */
  fraseError: 'nu mi preciosa, otra ve',

  /* ---------- CELEBRACIÓN FINAL DEL JUEGO (una sola vez) — no tocar el texto ---------- */
  celebracionFinal: {
    grito: 'MMMWHUA',
    emoji: '💗',
    texto: 'Muy biennn mi vidita, ahora chi',
    boton: 'Sigamos 🌸'
  },

  /* ---------- EL POEMA (tarjetitas — NO tocar el texto) ---------- */
  poema: [
    'MI AMOR MI AMOR MI AMOR…',
    'oche, a vos te gusta la literatura…',
    'y a mí me gustas vos \npero voy a romper las reglas del lenguaje...\nsolo por vos',
    'Achooo, JAJSMJSMS no lo planié, me salió...\npero alguien hizo eso antes que yo',
    'espero lo desconozcas pero no hay problema si no.\nJAJSJDM, paro las rimas',
    'Cuestión, ¿Puede un sustantivo convertirse en verbo solo por amor?',
    'Pues hace tiempo lo hizo una poeta y hoy lo hago yo \n(seguía rimando y en realidad voy a citar, pero me gustó mucho jejem)',
    '«¿Se pueden inventar verbos? Quiero decirte uno: yo te cielo [...]».',
    'Te cielo mi amor.'
  ],
  poemaPie: 'toca para seguir leyendo →',

  /* ---------- PREGUNTA DEL AUTOR ---------- */
  preguntaAutor: {
    etiqueta: 'Adivina',
    pregunta: '¿Conoces el autor?',
    opciones: ['Frida Kahlo', 'Alejandra Pizarnik', 'Gustavo Cerati'],
    correcta: 0
  },

  /* ---------- PAPIRO DE FRIDA (no tocar el texto) ---------- */
  papiroFrida: {
    titulo: 'Yo te cielo',
    texto: [
      'En noviembre de 1947, la gran pintora mexicana Frida Kahlo escribió una hermosa carta dirigida al poeta Carlos Pellicer. En este texto tan especial, ella desafiaba las reglas tradicionales del lenguaje cotidiano preguntando si acaso se podían inventar nuevos verbos. De esa profunda necesidad de expresar un sentimiento inmenso nació la famosa y célebre frase de "yo te cielo". Con esta creación única, la artista buscaba plasmar una conexión que fuera mucho más allá de un simple te amo convencional.',
      'Al utilizar esta maravillosa expresión, la autora explicaba que sus alas se extendían enormes para poder amar al otro sin ninguna clase de medida. Mucha gente interpreta este concepto como una forma sutil de honrar la libertad y la independencia personal dentro del vínculo afectivo. En lugar de atar o encerrar a la pareja, "cielarla" implica otorgarle amplitud, espacio propio y la capacidad de volar por cuenta ajena. Es una manera de crecer juntos respetando la individualidad y permitiendo que cada uno despliegue su propio horizonte.',
      'La hermosa metáfora también señala que ambos comparten un mismo lugar de origen y están hechos de la misma materia esencial. Así, este verbo inventado se convierte en el refugio perfecto para cobijar un amor libre, maduro y profundamente consciente de lo que significa acompañar. Es un detalle sumamente romántico para demostrar que se desea el bienestar del otro dándole alas para volar, pero eligiendo coincidir todos los días. Un recordatorio eterno de que el verdadero afecto ilumina, da aire puro y respeta la esencia de quien se ama.'
    ],
    imagen: 'img/frida.png',
    imagenAlt: 'Frida Kahlo',
    boton: 'Seguir 🌷'
  },

  /* ---------- FINAL: foto de nosotros (no tocar el texto en mayúsculas) ---------- */
  final: {
    imagen: 'img/beso.webp',
    imagenAlt: 'nosotros',
    texto: 'TE CIELO MUCHISIMO MI AMOR',
    boton: 'Sigue leyendo 💌'
  },

  /* ---------- DESPEDIDA (no tocar el texto del PD ni "One moreeee???") ---------- */
  despedida: {
    imagen: 'img/ramito.webp',
    imagenAlt: 'un ramito para ti',
    texto: [
      'PD: Sabía que elegirías',
      '"I wanna be your boyfriend"',
      '😸😸😸'
    ],
    texto2: 'Aún no es una carta como tal, lo considero un mensaje lindo, y le dejo un ramito como esperaré dárselo presencialmente, esto es una disculpa por no poder hacerlo 😸💕. Pero las siguientes flores irán acompañadas de un fuerte abrazo, un cálido besito a mi nena hermosa, y una carta con mi propia letra mi amor.',
    boton: 'One moreeee??? 🌷'
  }
};
