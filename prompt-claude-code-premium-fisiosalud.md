# Prompt para Claude Code — Mejoras visuales "premium" en FisioSalud San José

## Contexto

Trabajas sobre un sitio estático ya terminado y en producción (GitHub Pages): HTML5 + CSS3 + JS vanilla, sin frameworks ni build. Archivos clave: `index.html`, `styles.css`, `main.js`. Paleta real de la clínica: **verde agua / azul petróleo** (tokens `--rosa-*` en `:root`, conservan ese nombre histórico aunque ahora son teal).

El sitio está bien construido. Tu trabajo es **pulido quirúrgico**, no rediseño. El objetivo es elevar la percepción de calidad ("premium") corrigiendo incoherencias de color heredadas de una paleta rosa anterior, y rematando detalles de móvil y de navegación. **No debes romper nada.**

---

## Reglas de trabajo (OBLIGATORIAS)

1. **Rama nueva**: crea y trabaja en `mejoras-premium`. No toques `main` directamente.
2. **Commits atómicos**: un commit por bloque (A, B, C…). Mensajes claros en español, p. ej. `fix(color): sombras y superficies de rosa heredado a teal`.
3. **Cambios mínimos**: aplica solo lo descrito. No reformatees archivos enteros, no reordenes reglas CSS, no "limpies" de más.
4. **No toques el contenido textual** ni los placeholders (`[[DOMINIO]]`, `[[OG_IMAGE_URL]]`, `[[HORARIO…]]`, textos médicos, nombres, teléfonos). Única excepción permitida: Bloque D-eyebrow, y solo si decides la opción de copy (ver abajo) — si dudas, aplica la variante CSS sin tocar texto.
5. **Conserva** todas las clases, IDs, `data-*`, atributos ARIA y la estructura del DOM. No renombres selectores.
6. **Sin dependencias nuevas**. Nada de librerías, fuentes extra, ni CDNs adicionales.
7. **Accesibilidad intacta**: no elimines `aria-*`, `alt`, `:focus-visible`, ni el bloque `prefers-reduced-motion`.
8. **Busca antes de reemplazar**: cada cambio incluye la cadena EXACTA actual. Verifica que existe y es única antes de sustituir. Si una cadena no coincide al 100 %, **párate y avisa** en vez de improvisar.
9. **Prueba al final** en 4 anchos: **390 px, 768 px, 1024 px, 1440 px**. Comprueba que no aparece scroll horizontal en ninguno.

---

## BLOQUE A — Coherencia de color (sombras y superficies "rosa" heredadas → teal)

**Problema:** el sitio cambió a paleta teal, pero quedaron valores `rgba()` rosados *hardcodeados* fuera de los tokens. Resultado: todas las sombras de tarjetas proyectan un halo **rosa** sobre un sitio teal, el header tiene un tinte cálido que desentona, los bordes de las secciones oscuras se ven **rosa**, y el foco de los inputs brilla en **rosa**. Es la mayor fuga de cohesión. Todo se corrige cambiando color (sin tocar geometría ni layout).

Mapa de equivalencias (rosa antiguo → teal nuevo, mismo rol):
- `rgba(142, 47, 80, …)`  → `rgba(18, 63, 74, …)`   (sombras; #123F4A = `--rosa-800`)
- `rgba(62, 27, 45, …)`   → `rgba(15, 46, 61, …)`   (oscuros profundos; #0F2E3D = `--rosa-900`)
- `rgba(237, 159, 186, …)`→ `rgba(130, 203, 200, …)`(bordes claros sobre fondo oscuro; #82CBC8 = `--rosa-300`)
- `rgba(196, 78, 114, …)` → `rgba(30, 140, 140, …)` (foco; #1E8C8C = `--rosa-500`)
- `rgba(255, 246, 249, …)`→ `rgba(244, 252, 252, …)`(cristal del header; ≈ `--rosa-50`)

Aplica en `styles.css` estas sustituciones EXACTAS:

**A1 — Tokens de sombra** (en `:root`). Reduzco ligeramente el alpha porque el teal pesa más en pantalla:
```
/* BUSCAR */
  --sombra-sm: 0 4px 16px -4px rgba(142, 47, 80, .15);
  --sombra: 0 12px 32px -12px rgba(142, 47, 80, .22);
  --sombra-lg: 0 24px 48px -16px rgba(142, 47, 80, .28);
/* REEMPLAZAR */
  --sombra-sm: 0 4px 16px -4px rgba(18, 63, 74, .14);
  --sombra: 0 12px 32px -12px rgba(18, 63, 74, .20);
  --sombra-lg: 0 24px 48px -16px rgba(18, 63, 74, .26);
```

**A2 — Fondo del header (cristal)**:
```
/* BUSCAR */  background: rgba(255, 246, 249, 0.95);
/* REEMPLAZAR */  background: rgba(244, 252, 252, 0.9);
```

**A3 — Sombra del header al hacer scroll**:
```
/* BUSCAR */  box-shadow: 0 2px 20px rgba(142, 47, 80, .12);
/* REEMPLAZAR */  box-shadow: 0 2px 20px rgba(18, 63, 74, .12);
```

**A4 — Overlay del menú móvil**:
```
/* BUSCAR */  background: rgba(62, 27, 45, 0.6);
/* REEMPLAZAR */  background: rgba(15, 46, 61, 0.6);
```

**A5 — Foco de inputs del formulario** (ahora brilla rosa):
```
/* BUSCAR */  box-shadow: 0 0 0 3px rgba(196, 78, 114, .15);
/* REEMPLAZAR */  box-shadow: 0 0 0 3px rgba(30, 140, 140, .18);
```

**A6 — Sombra del banner de cookies**:
```
/* BUSCAR */  box-shadow: 0 -4px 24px rgba(62, 27, 45, .4);
/* REEMPLAZAR */  box-shadow: 0 -4px 24px rgba(15, 46, 61, .4);
```

**A7 — Bordes rosados sobre fondo oscuro** (`rgba(237, 159, 186, …)`, 7 apariciones). Sustituye SOLO la terna de color `237, 159, 186` por `130, 203, 200` en cada una, **respetando el alpha de cada línea**. Las líneas afectadas son:
- `border: 1px solid rgba(237, 159, 186, .35);`  → `…rgba(130, 203, 200, .35);`  (`.dolencia-chip`)
- `border-color: rgba(237, 159, 186, .6);`        → `…rgba(130, 203, 200, .6);`   (`.dolencia-chip:hover`)
- `border: 1px solid rgba(237, 159, 186, .3);`   → `…rgba(130, 203, 200, .3);`   (`.rating-badge`)
- `border: 1px solid rgba(237, 159, 186, .2);`   → `…rgba(130, 203, 200, .2);`   (`.review-card`)  ⚠️ aparece **dos veces** (también en `.social-link`): sustituye **ambas**.
- `border-top: 1px solid rgba(237, 159, 186, .15);`→ `…rgba(130, 203, 200, .15);` (`.footer-bottom`)
- `border-color: rgba(237, 159, 186, .4);`        → `…rgba(130, 203, 200, .4);`   (`.cookie-btn-reject`)

> Verificación A: tras los cambios, `grep -nE "rgba\((142, 47, 80|62, 27, 45|237, 159, 186|196, 78, 114|255, 246, 249)" styles.css` debe devolver **0 resultados**.

Commit: `fix(color): unifica sombras, bordes y foco a la paleta teal real`

---

## BLOQUE B — Imagen del hero en móvil

**Problema:** `.hero-image-wrap` está en `display:none` por debajo de 768 px. En móvil (la mayoría del tráfico de una clínica local) el hero es solo texto sobre un degradado claro: se ve vacío. La foto de terapia, que en escritorio luce muy bien, no aparece nunca en el móvil.

**B1 —** Muestra la imagen en móvil. Localiza el bloque:
```
/* BUSCAR */
.hero-image-wrap {
  display: none;
  position: relative;
}

@media (min-width: 768px) {
  .hero-image-wrap {
    display: block;
  }
}
/* REEMPLAZAR */
.hero-image-wrap {
  display: block;
  position: relative;
}
```
(El `@media min-width:768px` que solo activaba `display:block` queda redundante y lo eliminas; no toques el resto de reglas de `.hero-image-wrap` que haya más abajo.)

**B2 —** Para que el marco decorativo no provoque overflow en pantallas estrechas y la foto respire bien en vertical, añade **una vez** este media query justo después de la regla `.hero-img-deco { … }`:
```
@media (max-width: 767px) {
  .hero-img-deco { display: none; }
  .hero-img { aspect-ratio: 16 / 10; margin-top: 8px; }
}
```

> Nota: el `<img class="hero-img">` ya tiene `fetchpriority="high"`; al mostrarse en móvil pasará a ser el LCP, lo cual es correcto. No le añadas `loading="lazy"`.

> Verificación B: a 390 px debe verse la foto del hero bajo el texto, a ancho completo, con bordes redondeados, **sin** marco extra y **sin** scroll horizontal.

Commit: `feat(hero): muestra la imagen del hero también en móvil`

---

## BLOQUE C — Numeración de "Tu primera visita" (escritorio)

**Problema:** en `.proceso-step` el número de fondo (`::before`, `font-size:3.5rem`, posición `top:16px; right:20px`) se **solapa** con los títulos largos en la rejilla de 4 columnas de escritorio: "Tratamiento personalizado" y "Seguimiento y prevención" quedan pisados por el `03`/`04`.

**C1 —** Reserva espacio para el número en el título. Localiza:
```
/* BUSCAR */
.proceso-step-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--rosa-800);
}
/* REEMPLAZAR */
.proceso-step-title {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--rosa-800);
  padding-right: 60px;
}
```

> Verificación C: a 1024 px y 1440 px, ningún título de paso toca el número de fondo. A 390 px sigue viéndose bien (los títulos caben de sobra).

Commit: `fix(proceso): evita el solape del número con el título en escritorio`

---

## BLOQUE D — Eyebrow del hero que parte feo + anclas bajo el header

**D1 (anclas) —** Al pulsar la navegación (`#servicios`, `#equipo`…), el header *sticky* (~68 px) tapa el título de la sección de destino, porque no hay `scroll-padding-top`. Añade esta propiedad a la regla `html` existente (NO crees una regla nueva; añade la línea dentro del bloque `html { … }` que ya tiene `scroll-behavior: smooth;`):
```
/* En la regla html { ... } añade: */
  scroll-padding-top: 84px;
```

**D2 (eyebrow) —** En el hero, el eyebrow "FISIOTERAPIA & OSTEOPATÍA · SAN JOSÉ DE LA RINCONADA" es largo y parte en dos líneas con el punto flotando mal. Aplica el arreglo **CSS** (sin tocar el texto). Añade estas dos reglas al final de la sección de estilos del hero (junto a `.hero .eyebrow { … }`):
```
.hero .eyebrow { align-items: flex-start; }
.hero .eyebrow::before { margin-top: 7px; }
```
Esto alinea el punto con la primera línea y hace que el salto se vea intencionado.

> Opción de copy (SOLO si Ángel lo aprueba explícitamente; si no, no la apliques): acortar el texto del eyebrow del hero a una línea, p. ej. **"Fisioterapia & Osteopatía · La Rinconada"**. Si la aplicas, cambia únicamente ese nodo de texto del eyebrow del `<section class="hero">`, nada más.

> Verificación D: pulsando un enlace del menú, el título de la sección queda visible bajo el header, no oculto. El eyebrow del hero se ve alineado.

Commit: `fix(nav,hero): scroll-padding bajo header sticky y alineado del eyebrow`

---

## BLOQUE E — Favicon y color de la barra del navegador

**E1 — Favicon en SVG** (hay `favicon.svg` en `assets/icons/`, pero se está enlazando el `.webp` con un MIME incorrecto). En el `<head>`:
```
/* BUSCAR */  <link rel="icon" type="image/svg+xml" href="assets/icons/favicon.webp">
/* REEMPLAZAR (dos líneas) */
  <link rel="icon" type="image/svg+xml" href="assets/icons/favicon.svg">
  <link rel="alternate icon" href="assets/icons/favicon.webp" type="image/webp">
```

**E2 — theme-color** para que la barra de direcciones de Chrome Android tiñe en la marca (toque premium en móvil). Añade en el `<head>`, junto al resto de metas:
```
  <meta name="theme-color" content="#123F4A">
```

> (Opcional, requiere generar un PNG 180×180 — NO lo hagas si no existe el asset: `<link rel="apple-touch-icon" href="assets/icons/apple-touch-icon.png">`. Si no hay PNG, omítelo y déjalo anotado.)

> Verificación E: el favicon de la pestaña se ve nítido; en Android la barra superior aparece teal.

Commit: `chore(head): favicon SVG, alternate webp y theme-color de marca`

---

## BLOQUE F — Rutas con backslash y CLS del logo

**F1 — Backslashes en rutas de imagen.** El logo usa separadores de Windows `\` (los navegadores los normalizan, pero es incorrecto y frágil). Sustituye en las **3** apariciones:
```
/* BUSCAR */  src="assets\icons\favicon.webp"
/* REEMPLAZAR */  src="assets/icons/favicon.webp"
```
(Aparece en el logo del header, el logo del menú móvil y el logo del footer. Cámbialas todas. Verifica con `grep -n 'assets\\\\' index.html` → debe quedar en 0.)

**F2 — Dimensiones del logo (evita CLS).** Al `<img>` del logo le faltan `width`/`height`. En cada `<div class="logo-mark"> <img …>` añade `width="36" height="36"` al `<img>` (el contenedor mide 36×36). Si alguna instancia del logo está en un contenedor de otro tamaño, usa las dimensiones intrínsecas correctas de esa instancia; no fuerces 36×36 a ciegas.

Commit: `fix(html): rutas con / y dimensiones del logo para evitar CLS`

---

## BLOQUE G — Tarjetas de servicio inconsistentes (requiere decisión)

**Problema:** de las **9** `.servicio-card`, solo **6** tienen botón "Leer más" (texto corto + texto ampliado). Las 3 últimas (Terapia craneal en bebés, Fisioterapia deportiva, Reeducación acuática) no lo tienen. La mezcla de "unas se expanden y otras no" sin indicación se ve poco cuidada.

**No inventes contenido médico.** Haz lo siguiente:

- **Opción preferida (necesita texto de Ángel):** si Ángel facilita la descripción ampliada de esas 3 técnicas, replica EXACTAMENTE la misma estructura del resto de tarjetas (bloque `.servicio-short`, botón `.servicio-expand-btn` con su SVG, y `.servicio-full`), reutilizando el patrón de marcado existente. No cambies el JS: la lógica de `expanded` ya es genérica por clase.
- **Opción sin contenido nuevo (aplícala si no hay texto):** deja las 3 tarjetas sin botón, pero unifica su aspecto para que la rejilla no quede irregular. Añade al final de la sección de servicios:
  ```
  .servicio-card { min-height: 280px; }
  ```
  (Ajusta el valor si al probar ves que recorta o sobra; el objetivo es que las filas se alineen sin huecos raros.)

**Antes de tocar nada en este bloque, pregunta a Ángel cuál de las dos opciones quiere.** Si responde, aplica esa. Si no hay respuesta, aplica la opción sin contenido nuevo.

Commit (según opción): `feat(servicios): unifica el patrón de las 9 tarjetas`

---

## BLOQUE H — Toques opcionales (solo si hay tiempo; cada uno su commit)

- **H1 · Encuadre de fotos del equipo:** las fotos están tomadas frente a un mural con el logotipo y el rótulo queda cortado por la persona. Mitigación solo-CSS, sin recortar archivos: en `.equipo-img` añade `object-position: 50% 25%;` para favorecer la cara. Pruébalo; si no mejora, revértelo.
- **H2 · Legibilidad del badge de colegiado** sobre fondo de foto variable: opcionalmente añade un degradado inferior sutil en `.equipo-img-wrap` con un pseudo-elemento `::after` (`background: linear-gradient(transparent, rgba(15,46,61,.35)); position:absolute; inset:auto 0 0 0; height:40%; pointer-events:none;`) para asentar el badge. Mantén el badge por encima.

No añadas H1/H2 si introducen cualquier regresión visual.

---

## Verificación final (haz TODO esto antes de abrir PR)

1. **Sin scroll horizontal** a 390 / 768 / 1024 / 1440 px.
2. **Búsqueda de rosa heredado**: `grep -nE "rgba\((142, 47, 80|62, 27, 45|237, 159, 186|196, 78, 114|255, 246, 249)" styles.css` → **0 resultados**.
3. **Backslashes**: `grep -n 'assets\\\\' index.html` → **0 resultados**.
4. Hero con foto visible en móvil; sombras y bordes teal en todo el sitio; foco de inputs teal; header sin tinte cálido.
5. Anclas del menú: el título de destino no queda tapado por el header.
6. Pasos de "Tu primera visita": números sin solapar títulos en escritorio.
7. Favicon nítido y `theme-color` aplicado.
8. **Sin regresiones**: el resto de la página idéntico a antes. Compara visualmente secciones no tocadas.
9. **Diff acotado**: `git diff --stat` debe mostrar cambios solo en `index.html` y `styles.css` (y, si aplica, el asset opcional). Revisa el diff completo: que no haya cambios accidentales de formato masivo.

Abre PR de `mejoras-premium` → `main` con un resumen breve por bloques. **No hagas merge** hasta que Ángel lo revise.
