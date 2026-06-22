# FISIOSALUD SAN JOSÉ — Web estática

Sitio web de alta conversión para el centro de fisioterapia y osteopatía FISIOSALUD SAN JOSÉ (San José de la Rinconada, Sevilla).

Stack: HTML5 semántico + CSS3 + JavaScript vanilla. Sin framework, sin compilador. Se puede abrir con doble clic en local y sube directamente a GitHub Pages o Netlify.

---

## Estructura de archivos

```
/
├── index.html                 Página principal (single-page con anclas)
├── aviso-legal.html
├── politica-privacidad.html
├── politica-cookies.html
├── gracias.html               Confirmación tras enviar el formulario
├── styles.css                 Estilos globales (sistema de diseño completo)
├── config.js                  ÚNICO punto de edición de datos del negocio
├── main.js                    Menú móvil, FAQ, reveal, formulario, cookies
├── robots.txt
├── sitemap.xml
└── assets/
    ├── icons/
    │   └── favicon.svg
    └── img/
        ├── hero.svg            → reemplazar con hero.webp (1200×800)
        ├── centro.svg          → reemplazar con centro.webp (700×480)
        ├── equipo-sonia.svg    → reemplazar con equipo-sonia.webp (400×500)
        └── equipo-josemanuel.svg → reemplazar con equipo-josemanuel.webp (400×500)
```

---

## Despliegue

### GitHub Pages

1. Sube todos los archivos a un repositorio de GitHub.
2. Ve a **Settings → Pages** → elige rama `main` y carpeta raíz `/`.
3. GitHub Pages publicará el sitio en `https://<usuario>.github.io/<repo>/`.
4. Si tienes dominio propio, añádelo en **Settings → Pages → Custom domain** y crea un registro CNAME en tu DNS apuntando a `<usuario>.github.io`.

### Netlify (recomendado — dominio gratis HTTPS)

1. Arrastra la carpeta del proyecto a [netlify.com/drop](https://app.netlify.com/drop) o conecta el repositorio de GitHub.
2. No hace falta build command ni publish directory (sitio estático).
3. En **Site settings → Domain management** añade tu dominio personalizado.

---

## Antes de publicar — lista de placeholders

Busca `[[` en todos los archivos para localizar todos los placeholders de un vistazo. Son:

| # | Placeholder | Dónde | Qué hacer |
|---|-------------|-------|-----------|
| 1 | `[[HORARIO]]` | index.html, aviso-legal.html, FAQ | Confirmar con el cliente. Valor de directorios: L–V 9:00–14:30 y 17:00–21:00 |
| 2 | `[[DOMINIO]]` | index.html, sitemap.xml, robots.txt, páginas legales | URL definitiva (ej. `https://fisiosalud-sanjose.es`) |
| 3 | `[[OG_IMAGE_URL]]` | index.html | URL absoluta a la imagen Open Graph (1200×630 px, subida al dominio) |
| 4 | `[[FORM_ACCESS_KEY]]` | index.html | Clave de Web3Forms (gratis en web3forms.com → Create form) |
| 5 | `[[GOOGLE_REVIEWS_URL]]` | index.html | URL del perfil de Google Business del centro |
| 6 | `[[VALORACION_MEDIA]]` | index.html | Nota media (ej. `4.9`) |
| 7 | `[[RESEÑA 1/2/3: texto]]` y `[[RESEÑA 1/2/3: nombre]]` | index.html | Pegar reseñas reales del perfil de Google |
| 8 | `[[TITULAR / RAZÓN SOCIAL]]` | páginas legales | Nombre legal completo del titular |
| 9 | `[[NIF/CIF]]` | páginas legales | NIF o CIF del titular |
| 10 | `[[DATOS REGISTRALES]]` | aviso-legal.html | Solo si es sociedad; si es autónomo, eliminar el campo |
| 11 | `[[INSTAGRAM_URL]]` | index.html footer, config.js | Confirmar si existe Instagram real; si no, eliminar la mención |
| 12 | `[[CONFIRMAR CON EL CLIENTE: seguros/volante]]` | index.html FAQ | Confirmar si trabajan con mutuas |

---

## Imágenes — cómo sustituir los placeholders

Los archivos `.svg` de `assets/img/` son marcadores de posición. Para activar el diseño real:

1. **Obtén las fotos reales del centro** (consulta, sesión de terapia manual, retratos de Sonia y José Manuel). Las caras reales generan mucha más confianza que imágenes de stock.
2. Expórtalas en **WebP** con las dimensiones recomendadas (ver tabla de estructura).
3. Nómbralas exactamente como indican los comentarios HTML: `hero.webp`, `centro.webp`, `equipo-sonia.webp`, `equipo-josemanuel.webp`.
4. Colócalas en `assets/img/` y actualiza las referencias `src` en `index.html` (busca `.svg` y reemplaza por `.webp`).
5. Añade también `og.webp` (1200×630) para Open Graph y actualiza `[[OG_IMAGE_URL]]`.

**Dirección de arte recomendada:** luz natural suave, tonos cálidos que armonicen con la paleta rosa/neutra del sitio, sesión real de terapia manual en camilla, ambiente limpio y profesional. Evitar fotos de stock genéricas o artificiales.

---

## Formulario Web3Forms — configuración

1. Regístrate gratis en [web3forms.com](https://web3forms.com).
2. Crea un formulario nuevo → obtendrás un **Access Key** (UUID).
3. En `index.html`, sustituye `[[FORM_ACCESS_KEY]]` por ese UUID.
4. El formulario enviará los mensajes al email asociado a tu cuenta de Web3Forms.
5. Opcionalmente, en la sección de configuración de Web3Forms puedes redirigir las notificaciones a `info@fisiosalud-sanjose.es`.

---

## Diseño — notas técnicas

- **Paleta completa en rosa** (fondo base `--rosa-50`, no blanco). Detalle en `:root` de `styles.css`.
- **Tipografía:** Fraunces (titulares) + Nunito Sans (cuerpo), cargadas desde Google Fonts con `display=swap`.
- **El hilo continuo:** en viewports ≥ 1440 px aparece una fina línea vertical (1.5 px, `--rosa-300`) recorriendo las secciones de contenido. Es el elemento distintivo de diseño, guiño a la fascia continua del cuerpo.
- **Accesibilidad:** HTML semántico, un solo `<h1>`, `alt` en todas las imágenes, `aria-expanded` en el menú y FAQ, foco visible, contraste AA, `prefers-reduced-motion`.
- **Sin librerías externas:** todo el JS está en `main.js` (~130 líneas), sin dependencias.

---

## Créditos

Web construida para FISIOSALUD SAN JOSÉ por Ángel Velarde — junio 2026.
