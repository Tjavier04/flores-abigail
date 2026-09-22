# 🌻 Flores amarillas para Abigail

Página interactiva, pensada **sólo para celular**.

## Cómo cambiar los textos
Todo está en **`contenido.js`**: la portada, las canciones, las preguntas,
las tres opciones de cada una, la celebración y la carta final.
No hace falta tocar ningún otro archivo.

## Cómo poner las fotos
Mete las fotos en la carpeta `fotos/` con los nombres `f1.jpg`, `f2.jpg`, `f3.jpg`…
(mira `fotos/LEEME.md`). Si no hay fotos, salen flores dibujadas.

## Cómo publicarla en Netlify

**Opción rápida (arrastrar y soltar, 30 segundos):**
1. Entra a https://app.netlify.com/drop
2. Arrastra **esta carpeta entera** a la página.
3. Cuando termine: *Site configuration → Change site name* → escribe el nombre
   que quieras, p. ej. `yourbf-abigail`, y queda en
   `https://yourbf-abigail.netlify.app`.

**Opción conectada a GitHub (se actualiza sola con cada cambio):**
1. En Netlify: *Add new site → Import an existing project → GitHub*.
2. Elige el repo `flores-abigail`, rama `main`.
3. Deja "Build command" y "Publish directory" vacíos (ya está en `netlify.toml`).
4. *Deploy site* → cambia el nombre del sitio como arriba.

## Archivos
| archivo | qué hace |
|---|---|
| `index.html` | la página |
| `contenido.js` | **todos los textos** |
| `estilos.css` | los colores y el diseño |
| `flores.js` | las flores dibujadas (SVG) |
| `app.js` | la lógica del juego |
| `fotos/` | aquí van las fotos |
