# PROMPT PARA CLAUDE CODE — Nueva web de FISIOSALUD SAN JOSÉ

Vas a construir desde cero una web nueva, moderna y de alta conversión para un centro de fisioterapia y osteopatía real de San José de la Rinconada (Sevilla). La web actual es antigua (Joomla) y está mal hecha; la sustituimos por completo. Sigue este documento al detalle. No improvises datos: usa solo la información real que aparece aquí. Lo que no esté aquí es un hueco marcado como `[[PLACEHOLDER]]` que debe quedar señalado, nunca inventado.

---

## 1. CONTEXTO Y OBJETIVO

- **Cliente:** FISIOSALUD SAN JOSÉ — centro de fisioterapia y osteopatía con más de 20 años de experiencia.
- **Ubicación:** C/ Alcalde Pepe Iglesias nº 14, local 1 A, 41309 San José de la Rinconada (Sevilla).
- **Público:** pacientes locales de todas las edades (desde bebés hasta tercera edad), incluidos deportistas y músicos, normalmente con dolor o molestias y cierto grado de ansiedad. Buscan profesionales de confianza y un trato cercano.
- **Trabajo único de la página:** que quien entre sienta *confianza inmediata* en que son profesionales expertos, serios y cuidadosos que tratan a la persona como un todo — y que pida cita.
- **Acción principal (CTA):** pedir cita por WhatsApp / teléfono / formulario.
- **Tipo de proyecto:** sitio estático (HTML + CSS + JS *vanilla*, sin framework ni build) pensado para alojarse gratis en GitHub Pages o Netlify. Debe poder abrirse con doble clic en local y funcionar igual.

### Regla de oro sobre el contenido
Mantén TODA la información real del negocio (servicios, descripciones, credenciales, filosofía, datos de contacto). Puedes mejorar la redacción, la gramática y la concisión, pero **no añadas afirmaciones nuevas**: nada de estadísticas inventadas, certificaciones, premios, precios, garantías ni testimonios ficticios. Si algo no está en este documento, déjalo como placeholder.

---

## 2. STACK Y REQUISITOS TÉCNICOS

- **HTML5 semántico + CSS3 + JavaScript vanilla.** Sin React, sin Tailwind, sin compiladores. Un único `styles.css` con variables CSS (custom properties) para todo el sistema de diseño, y un único `main.js` para: menú móvil, scroll suave, acordeón de FAQ, reveal on-scroll, envío del formulario y banner de cookies.
- **Mobile-first de verdad (el móvil es la prioridad, no una adaptación).** La gente busca fisios sobre todo desde el móvil: diseña y prueba primero a 360–390px de ancho y escala hacia arriba. La experiencia móvil debe ser tan buena o mejor que la de escritorio, nunca una versión recortada.
- **Responsive sin fisuras:**
  - `<meta name="viewport" content="width=device-width, initial-scale=1">`.
  - Layout fluido con CSS Grid/Flexbox; **nada de anchos fijos en px** que provoquen scroll horizontal. Cero overflow horizontal en cualquier ancho.
  - Breakpoints definidos como constantes coherentes y reutilizadas en todo el CSS (sugeridos: 480, 768, 1024, 1280px), documentadas en un comentario al inicio de `styles.css`.
  - **Tipografía y espaciado fluidos** con `clamp()`, sin saltos bruscos entre breakpoints.
  - **Imágenes responsive y ligeras:** `srcset`/`sizes` para servir el tamaño adecuado a cada pantalla, `max-width:100%`, `height:auto`, WebP y `loading="lazy"` (salvo hero). Clave para la velocidad con datos móviles.
  - **Objetivos táctiles ≥ 44×44px** y separación suficiente entre elementos pulsables; nada de enlaces minúsculos pegados.
  - **Menú hamburguesa** accesible (foco, `aria-expanded`, cierre al pulsar fuera y con ESC) y **CTA de "Pedir cita" siempre visible** en móvil (en el header y/o como botón fijo).
  - **Formularios pensados para móvil:** `type="tel"`, `type="email"`, `inputmode` y `autocomplete` correctos para que aparezca el teclado adecuado; campos grandes y cómodos de pulsar.
  - **Botón flotante de WhatsApp** fijo y bien posicionado en móvil, sin tapar contenido ni el footer.
  - Respeta los *safe-area insets* de iOS (notch) en los elementos fijos (`env(safe-area-inset-*)`).
- **Matriz de prueba obligatoria:** verifica render y usabilidad en 360px, 390px (iPhone), 768px (tablet), 1024px y 1440px, en vertical y horizontal. Sin scroll horizontal, sin solapes, sin texto cortado.
- **Accesibilidad (mínimo AA):** HTML semántico (`header/nav/main/section/article/footer`), jerarquía correcta de encabezados (un solo `<h1>`), `alt` descriptivo en todas las imágenes, `aria-label` en iconos y botones de icono, foco de teclado visible, contraste de color AA verificado, y `@media (prefers-reduced-motion: reduce)` que desactive animaciones.
- **Rendimiento:** imágenes en WebP con `width`/`height` explícitos para evitar saltos de layout (CLS), `loading="lazy"` en todo lo que no sea el hero, fuentes con `display=swap` y `preconnect`, JS sin librerías externas. Objetivo Lighthouse > 90 en todo.
- **Sin almacenamiento de navegador prohibido:** puedes usar `localStorage` SOLO para recordar el consentimiento de cookies. Nada más.
- **Compatibilidad:** Chrome, Safari, Firefox y Edge actuales, incluido Safari iOS.

### Estructura de archivos a entregar
```
/
├── index.html
├── aviso-legal.html
├── politica-privacidad.html
├── politica-cookies.html
├── gracias.html              (página de confirmación tras enviar el formulario)
├── styles.css
├── config.js                 (ÚNICO punto de edición de los datos del negocio: ver §2.1)
├── main.js
├── robots.txt
├── sitemap.xml
├── /assets
│   ├── /img                  (imágenes; usa placeholders nombrados, ver §8)
│   └── /icons                (favicon + iconos SVG inline o sprite)
└── README.md                 (instrucciones de despliegue y lista de placeholders)
```

---

## 3. PSICOLOGÍA DE CONFIANZA (principios que toda la web debe encarnar)

La web debe estar diseñada explícitamente para generar confianza. Aplica estas palancas:

1. **Autoridad y credenciales por delante.** Los dos fisioterapeutas están colegiados (números 60 y 61) y tienen +21 años de experiencia. Esto debe verse muy arriba (hero o barra inmediata) y repetirse en la sección de equipo con sus nombres, fotos y número de colegiado. El número de colegiado es una señal de legitimidad sanitaria potentísima: destácalo.
2. **Prueba social visible.** Sección de opiniones con reseñas reales de Google (placeholders para pegarlas), valoración media con estrellas y enlace al perfil de Google. La gente confía en lo que otros pacientes dicen.
3. **Reducción de fricción.** Pedir cita debe estar a un toque desde cualquier punto: botón fijo de WhatsApp en móvil, teléfonos como enlaces `tel:`, y formulario que de verdad envía (ver §9). Cuanto más fácil, más conversión.
4. **Calidez y seguridad.** Lenguaje cercano y tranquilizador. Apóyate en hechos reales del centro: técnicas "muy suaves", aptas "desde bebés hasta tercera edad", enfoque en la persona y no solo en la dolencia. Esto desactiva el miedo ("¿me dolerá?", "¿es agresivo?").
5. **Transparencia del proceso.** La sección nueva "Tu primera visita" explica qué pasa paso a paso. Saber qué esperar reduce la ansiedad y aumenta las reservas.
6. **Coherencia y pulcritud.** Cero erratas, todos los enlaces funcionando, paleta consistente. El simple hecho de que la web se vea cuidada transmite competencia (efecto halo). Es justo lo contrario de la web actual.

---

## 4. IDENTIDAD VISUAL / SISTEMA DE DISEÑO

Dirección: **calidez clínica premium con cohesión total en rosa**. Profesional y serio (es salud), pero cálido y cercano (trato humano). **Toda la web vive dentro de la familia rosa: el rosa no es un acento sobre blanco, es la atmósfera de todo el sitio.** El lienzo por defecto es un rosado cálido, las secciones alternan tintes rosados y el peso visual lo aportan los rosas profundos y la ciruela. Rosa sofisticado y empolvado, **nunca infantil ni chicloso** (nada de fucsia ni "rosa Barbie"). Formas redondeadas suaves, sombras difusas y delicadas, y mucho aire (espacio negativo) para que el conjunto respire y se perciba pulcro. Evita a toda costa el look genérico de "web hecha por IA": nada de fondo crema con serif de alto contraste y acento terracota, nada de negro con verde ácido, nada de columnas tipo periódico. Esta es una identidad propia construida desde el mundo del cliente.

### 4.1 Paleta de color (rosa cohesionada — usa estos tokens exactos)
Define en `:root`. Verifica contraste AA antes de dar por buena cualquier combinación texto/fondo.

```css
:root{
  /* Marca — rosa */
  --rosa-50:  #FFF6F9;  /* blanco rosado, fondo base */
  --rosa-100: #FBE9EF;  /* rosa niebla, fondos de sección/tarjeta */
  --rosa-200: #F6CFDD;  /* bordes suaves, estados hover ligeros */
  --rosa-300: #ED9FBA;  /* detalles, líneas decorativas */
  --rosa-400: #DD6F94;  /* acentos */
  --rosa-500: #C24E72;  /* ROSA PRINCIPAL de marca */
  --rosa-600: #A93A5D;  /* botones / hover, texto rosa sobre claro */
  --rosa-700: #8E2F50;  /* titulares con color, énfasis */
  --rosa-800: #5E2038;  /* secciones profundas */
  --rosa-900: #3E1B2D;  /* CIRUELA: footer y bloques de máximo peso */

  /* Neutros cálidos */
  --tinta:    #2A2227;  /* texto principal (casi negro cálido) */
  --tinta-60: #6E5C66;  /* texto secundario / muted */
  --linea:    #EFD9E1;  /* divisores y bordes */
  --blanco:   #FFFFFF;

  /* Acento OPCIONAL: solo si se quisieran estrellas doradas. Por defecto las estrellas van en rosa profundo */
  --oro:      #C9A24B;
}
```

Uso (cohesión total en rosa): **el lienzo por defecto de toda la web es `--rosa-50`** (rosado cálido), no blanco. Las secciones alternan entre `--rosa-50` y `--rosa-100` para dar ritmo, e intercalan alguna banda profunda en `--rosa-800`/`--rosa-900` con texto claro en momentos clave (una franja de CTA, una cita destacada) para aportar profundidad y seriedad. **Reserva el blanco puro (`--blanco`) solo para tarjetas/contenedores** cuando necesites elevación y máxima legibilidad sobre el lienzo rosado. Botón primario fondo `--rosa-600` con texto blanco (verifica AA) y hover `--rosa-700`. Titulares en `--tinta` (tinta cálida con subtono, nunca negro frío) con palabras clave en `--rosa-700`. Footer en `--rosa-900` (ciruela). Bordes y divisores en `--linea` (rosado). Las estrellas de valoración van por defecto en `--rosa-600` para mantener la cohesión; el dorado (`--oro`) queda como opción si el cliente prefiere el look convencional de rating.

**Por qué todo en rosa funciona en este sector (psicología del color en salud):** el rosa transmite cuidado, calidez, cercanía y suavidad — exactamente lo que necesita sentir un paciente con dolor y algo de aprensión, y encaja con el mensaje real del centro ("técnicas muy suaves", terapia en bebés). El riesgo de un sitio íntegramente rosa es parecer un salón de belleza o algo infantil; se neutraliza así:
1. **Rosas apagados/empolvados y ciruela, nunca chicle ni fucsia.** El tono es adulto y sereno.
2. **Neutros cálidos con subtono rosado, no grises fríos**, para que absolutamente todo "case" dentro de la misma familia.
3. **Profundidad con la ciruela `--rosa-900`** en footer y bandas: aporta gravedad, jerarquía y seriedad, que es lo que evita el efecto "blando".
4. **Mucho aire y composición ordenada**, que el ojo lee como pulcritud y profesionalidad.
5. **La credibilidad clínica la cargan los hechos, no un color frío:** colegiados nº 60 y 61, +21 años, fotos reales, enlaces que funcionan y cero erratas. Con una ejecución sobria, el rosa puede ser el 100% del lienzo sin perder un ápice de confianza.

Legibilidad: mantén siempre contraste AA del texto sobre los fondos rosados; si una zona de texto denso lo necesita, súbela a una tarjeta blanca sobre el lienzo rosa.

### 4.2 Tipografía (pareja con carácter, no la genérica de siempre)
- **Display / titulares:** **Fraunces** (Google Fonts) — serif suave con personalidad, transmite experiencia y cuidado. Úsala con peso 500–600 en titulares grandes, con moderación. (Si por rendimiento prefieres, activa solo los pesos necesarios.)
- **Texto / interfaz:** **Nunito Sans** (Google Fonts) — sans humanista, redondeada y muy legible, aporta la calidez y cercanía de la marca.
- Carga vía `<link>` con `preconnect` a fonts.gstatic.com y `display=swap`. Limita a 3–4 pesos en total.
- **Escala tipográfica** (fluida con `clamp()`): h1 ~clamp(2.2rem, 5vw, 3.5rem); h2 ~clamp(1.7rem, 3.5vw, 2.5rem); h3 ~1.3rem; cuerpo 1.0625rem (17px) con `line-height:1.7`; texto pequeño/caption 0.875rem. Interletraje ligeramente negativo en titulares grandes (`letter-spacing:-0.01em`) y positivo y en mayúsculas para los *eyebrows* (`letter-spacing:0.12em; text-transform:uppercase`).

### 4.3 Espaciado, formas y profundidad
- **Escala de espaciado** basada en múltiplos de 4px (4, 8, 12, 16, 24, 32, 48, 64, 96). Padding vertical de sección generoso: ~clamp(64px, 10vw, 120px).
- **Radios:** tarjetas y contenedores `border-radius:20px`; botones `border-radius:999px` (pastilla); imágenes en marcos redondeados `border-radius:24px`.
- **Sombras:** difusas, suaves y teñidas de rosa, baja opacidad. Ej.: `--sombra: 0 12px 32px -12px rgba(142,47,80,.22)`. Nada de sombras duras.
- **Botones:**
  - *Primario:* fondo `--rosa-600`, texto blanco, pastilla, hover `--rosa-700` + leve elevación; foco con outline visible (`outline: 3px solid var(--rosa-300)`).
  - *Secundario:* borde `--rosa-600`, texto `--rosa-700`, fondo transparente; hover relleno `--rosa-100`.
  - *WhatsApp:* el verde de marca de WhatsApp `#25D366` es la **única excepción cromática sancionada**, porque su reconocimiento instantáneo aumenta los clics (y la conversión es justo el objetivo). Si se prefiere cohesión estricta, el botón puede ir en `--rosa-600` con el logo de WhatsApp en blanco; lo recomendable es mantener el verde solo en el botón flotante por su efecto en conversión.

### 4.4 Movimiento (con contención)
- Secuencia suave al cargar el hero (fade + leve subida).
- *Reveal on scroll* discreto en las secciones (fade-up, 1 vez, con `IntersectionObserver`).
- Micro-interacciones en hover de tarjetas y botones (elevación sutil, transición 200–250ms).
- Nada más. El exceso de animación delata "diseño de IA". `prefers-reduced-motion` debe anularlo todo.

### 4.5 Elemento distintivo (la firma de la web)
**El "hilo continuo".** Una línea fina rosa (`--rosa-300`) que recorre verticalmente el sitio conectando los *eyebrows*/marcadores de cada sección, como un hilo que las enhebra. Es un guiño directo a la propia filosofía del centro: "la fascia es continua y recorre todo el cuerpo" y "todo está entrelazado, no se puede dividir en partes aisladas". Trátalo con elegancia y sutileza (no debe competir con el contenido): un trazo delgado, quizá con un pequeño nodo/punto en cada sección. En móvil, simplifícalo o conviértelo en un acento lateral. Esta es la única licencia "atrevida": que sea la pieza memorable y mantén todo lo demás disciplinado.

### 4.6 Aviso técnico sobre CSS
Cuida la especificidad de los selectores. Es fácil generar clases que se anulan entre sí (p. ej. un selector por tipo `.section` chocando con uno por elemento, o `.reveal.visible` pisando un `transform` de otra clase). Define paddings/márgenes de sección de forma consistente y evita reglas en conflicto. Usa una metodología simple y predecible (clases utilitarias + componentes con nombres claros).

---

## 5. ARQUITECTURA DE LA WEB (index.html, una sola página con anclas)

Orden de secciones pensado como un embudo narrativo de confianza. Cada sección lleva un *eyebrow* (etiqueta corta en mayúsculas, rosa) + titular en Fraunces.

### 5.0 Header / Navegación (sticky)
- Logo "FISIOSALUD SAN JOSÉ" (texto estilizado o logo placeholder).
- Navegación con anclas: **Inicio · El centro · Servicios · Equipo · Opiniones · Contacto**.
- Teléfono visible (enlace `tel:`) y botón CTA destacado **"Pedir cita"** (ancla a contacto).
- En móvil: hamburguesa que despliega el menú; CTA siempre accesible.

### 5.1 Hero
- **Titular** centrado en el resultado y la confianza. Sugerencia (puedes pulir, sin inventar): *"Fisioterapia y osteopatía en San José de la Rinconada"* con subtítulo: *"Más de 20 años cuidando tu salud. Tratamos tu cuerpo como un todo para encontrar el origen del problema, no solo calmar el síntoma."*
- **Dos microbadges de confianza** bajo el titular: "+20 años de experiencia" · "Fisioterapeutas colegiados (nº 60 y 61)".
- **CTAs:** primario "Pide tu cita" + secundario "Llamar / WhatsApp".
- **Imagen** cálida y profesional de fisioterapia/terapia manual o del propio centro (placeholder, ver §8). Con `width`/`height` y prioridad de carga (sin lazy).

### 5.2 Barra de credenciales (trust bar)
Tira horizontal, justo bajo el hero, con 3–4 ítems con icono:
- +20 años de experiencia
- 2 fisioterapeutas colegiados
- Técnicas con evidencia científica
- Tratamiento personalizado y enfoque global
Refuerza la autoridad de inmediato.

### 5.3 El centro / Nuestra filosofía
Contenido real (mantén la información, redacción pulida):
> **Bienvenidos a FISIOSALUD.** Somos un centro de fisioterapia con más de 20 años de experiencia profesional. A través de la fisioterapia y de las distintas formaciones realizadas a lo largo de nuestra trayectoria, ayudamos a nuestros pacientes a cuidar, mantener y restablecer su estado de salud.
>
> Partimos de una visión **global** del cuerpo: lo entendemos como un todo interrelacionado, profundizando en las posibles causas del problema y no solo en el foco de la dolencia.
>
> El reciclaje y el aprendizaje continuo de nuevas técnicas de tratamiento —todas con evidencia científica y homologadas— es una máxima en nuestro desarrollo profesional y una seña de identidad del centro.

Acompañar con una foto del centro (placeholder). Destaca visualmente las palabras "global", "causas" y "evidencia científica".

### 5.4 Servicios / Técnicas
Tarjetas elegantes (grid responsive), cada una con icono, nombre y descripción real. Permite "leer más" (acordeón o modal) si el texto es largo. Estos son los servicios reales (mantén la información):

1. **Osteopatía** — Acercamiento diagnóstico y terapéutico manual a las disfunciones de movilidad articular y de los tejidos en general, por su implicación en la aparición de enfermedades. Busca la pérdida de movilidad en cualquier estructura del cuerpo (óseo, visceral, craneal…) y la restablece mediante técnicas manuales para prevenir y recuperar lesiones.

2. **Método Poyet** — Terapia manual basada en la osteopatía que considera la globalidad del cuerpo: todo está entrelazado y no puede tratarse por partes aisladas. A lo largo de la vida el cuerpo genera compensaciones (musculares, articulares, fasciales, viscerales…) buscando armonía; cuando esa armonía se pierde, aparece la patología. El Método Poyet busca la causa primaria y restablece el equilibrio para devolver al organismo la armonía perdida.

3. **Inducción miofascial** — Método de evaluación y tratamiento tridimensional del sistema fascial mediante presiones sostenidas, posicionamientos específicos y estiramientos muy suaves, para eliminar restricciones y equilibrar la función corporal. La fascia envuelve órganos, músculos y fibras de forma continua, de ahí la importancia de tratarla. Son **técnicas muy suaves**, aptas para pacientes de todas las edades, desde bebés hasta personas de la tercera edad.

4. **Método Pialoux (acupuntura)** — Toma de la Medicina Tradicional China la acupuntura. Mediante agujas y el diagnóstico sobre la arteria radial se localizan los desequilibrios energéticos del cuerpo para restablecer la circulación normal de la energía, de modo que todas las estructuras del organismo funcionen correctamente. Su finalidad principal es la **prevención**: ayudar a mantener el equilibrio y una buena higiene de vida (idealmente con una visita por estación, o más frecuente ante un problema agudo).

5. **Fisioterapia en músicos** — El trabajo del músico conlleva alto riesgo de lesión por movimientos repetitivos y posturas forzadas. Mediante la valoración de las alteraciones posturales, el tratamiento de fisioterapia adaptado a cada lesión y la reeducación postural (con y sin instrumento), mejoran la recuperación, la prevención de lesiones y la propia calidad y creatividad del músico.

6. **Recomendaciones nutricionales para trastornos osteomusculares** — Del "somos lo que comemos" se entiende la importancia de la alimentación para la salud. Con consejos nutricionales se pueden tratar y mejorar muchas patologías: tendinitis, cefaleas, dolor, fatiga y otros síntomas relacionados. El nutriente no es solo energía: puede favorecer la regeneración celular o, al contrario, la degeneración.

Además, estas especialidades del equipo son reales y deben aparecer también como servicios (provienen de la formación acreditada del equipo):

7. **Terapia craneal en bebés y niños** — Terapia craneal suave indicada para los más pequeños.
8. **Fisioterapia deportiva** — Tratamiento y prevención de lesiones en deportistas.
9. **Reeducación del movimiento en el medio acuático** — Para la prevención y la recuperación de lesiones.

### 5.5 ¿Qué tratamos? (dolencias)
Lista/grid tranquilizador de "Te ayudamos con…", para que el paciente se identifique. Usa solo dolencias mencionadas en su contenido real: **cervicalgias, lumbalgias, contracturas, problemas musculares, tendinitis, cefaleas, lesiones deportivas**. (No añadas patologías que no figuren.) Mejora además el SEO local.

### 5.6 Equipo
Dos tarjetas de profesional, con foto, nombre, número de colegiado, años de experiencia y especialidades. Es una de las secciones de mayor peso para la confianza. Contenido real:

**SONIA — Fisioterapeuta. Colegiada nº 61. Más de 21 años de experiencia.**
Especialidades: inducción miofascial · osteopatía · recomendaciones nutricionales relacionadas con lesiones del aparato locomotor · terapia craneal en bebés y niños · fisioterapia en músicos · fisioterapia en deportistas.

**JOSÉ MANUEL — Fisioterapeuta. Colegiado nº 60. Más de 21 años de experiencia.**
Especialidades: Método Poyet (osteopatía cráneo-sacra) · Método Pialoux · terapia craneal en bebés y niños · fisioterapia en músicos · fisioterapia en deportistas · reeducación del movimiento en el medio acuático para prevención y recuperación de lesiones.

(Fotos: placeholders; ver §8. El centro tiene fotos reales del equipo que el cliente podrá aportar.)

### 5.7 Cómo trabajamos / Tu primera visita  *(SECCIÓN NUEVA)*
Proceso en 4 pasos numerados (aquí la numeración SÍ tiene sentido: es una secuencia real). Basado en su filosofía real, sin inventar nada:
1. **Valoración** — Te escuchamos y evaluamos tu caso teniendo en cuenta tu cuerpo en conjunto.
2. **Diagnóstico global** — Buscamos el origen del problema, no solo dónde duele.
3. **Tratamiento personalizado** — Aplicamos las técnicas manuales que mejor se adaptan a ti, siempre suaves y basadas en evidencia.
4. **Seguimiento y prevención** — Te acompañamos en la recuperación y te damos pautas para evitar recaídas.

Reduce el miedo a "no saber qué va a pasar" y transmite método y profesionalidad.

### 5.8 Opiniones / Reseñas  *(SECCIÓN NUEVA)*
- Cabecera con valoración media en estrellas (icono en `--rosa-600` para mantener la cohesión rosa; dorado opcional) y enlace **"Ver todas las reseñas en Google"**.
- 3–6 tarjetas de testimonio: nombre, estrellas y texto.
- **IMPORTANTE:** no inventes testimonios. Crea la estructura con placeholders `[[RESEÑA 1: texto]]`, `[[RESEÑA 1: nombre]]`, etc., y comenta en el código que el cliente pegará reseñas reales de su perfil de Google. Deja también `[[GOOGLE_REVIEWS_URL]]` y `[[VALORACION_MEDIA]]`.

### 5.9 Preguntas frecuentes (FAQ)  *(SECCIÓN NUEVA)*
Acordeón accesible (con `aria-expanded`). Preguntas que desactivan dudas y fricción. Respuestas basadas en hechos reales del centro; donde no haya dato, deja placeholder:
- **¿La primera sesión incluye valoración?** → Sí: empezamos escuchándote y valorando tu caso de forma global.
- **¿Las técnicas duelen?** → Trabajamos con técnicas manuales muy suaves, aptas para todas las edades, desde bebés hasta personas mayores.
- **¿Tratáis a niños y bebés?** → Sí, realizamos terapia craneal suave en bebés y niños.
- **¿Cómo pido cita?** → Por WhatsApp, llamando al 954 79 23 75 / 652 15 25 42, o rellenando el formulario.
- **¿Dónde estáis?** → En C/ Alcalde Pepe Iglesias nº 14, local 1 A, San José de la Rinconada.
- **¿Cuál es vuestro horario?** → `[[HORARIO — confirmar con el cliente]]`
- (Opcional, dejar como placeholder si no se confirma) **¿Necesito volante médico / trabajáis con seguros?** → `[[CONFIRMAR]]`

### 5.10 Contacto / Pide tu cita
- **Formulario funcional** (ver §9): Nombre, Teléfono, Email, Tu consulta + checkbox de consentimiento con enlace a Política de Privacidad. Botón "Enviar consulta".
- **Vías directas a un toque:** botones `tel:` para los dos teléfonos, botón **WhatsApp** (`https://wa.me/34652152542`), email `info@fisiosalud-sanjose.es`.
- **Dirección + mapa:** C/ Alcalde Pepe Iglesias nº 14, local 1 A, 41309 San José de la Rinconada (Sevilla). Embebe Google Maps (coordenadas aprox. 37.491331, -5.943336).
- **Horario:** `[[HORARIO — confirmar con el cliente]]` (valor encontrado en directorios externos, *a verificar*: L–V de 9:00 a 14:30 y de 17:00 a 21:00).

### 5.11 Footer
- Logo + breve claim.
- Datos de contacto (dirección, teléfonos, email).
- Navegación rápida.
- **Redes sociales: enlaza SOLO el Facebook real** → `https://www.facebook.com/profile.php?id=100057221689090`. (La web actual enlazaba Instagram/Twitter falsos a la home de esas redes: **no lo repitas**. Si el cliente confirma Instagram real, se añade; si no, se omite.)
- Enlaces legales **funcionando**: Aviso Legal · Política de Privacidad · Política de Cookies.
- Línea de copyright "© [año] FISIOSALUD SAN JOSÉ".
- **Botón flotante de WhatsApp** fijo (abajo a la derecha) en todas las páginas, sobre todo en móvil.

---

## 6. TONO DE VOZ Y COPY

- **Idioma:** español de España. **Trato de "tú"** (cercano y actual) pero respetuoso y profesional. Mantén la consistencia: si una sección habla de "tú", todas lo hacen.
- **Registro:** cálido, tranquilizador, claro, basado en evidencia. Verbos en voz activa. Frases cortas. Sin relleno ni lenguaje comercial vacío.
- **Coherencia de microcopy:** un botón dice exactamente lo que hace y mantiene el mismo nombre en todo el flujo ("Enviar consulta" → confirmación "Consulta enviada"). Etiquetas en *sentence case*.
- **Prohibido** reutilizar nada del copy de plantilla de la web vieja. En concreto, una clínica de fisioterapia **no** habla de "nuestros productos", "catálogo" ni "soluciones": eso era texto de plantilla genérico. Redacta todo desde el mundo real de la fisioterapia y la osteopatía.
- Estados de error del formulario: claros y útiles ("Escribe un teléfono de contacto válido"), nunca vagos ni con disculpas.

---

## 7. SEO TÉCNICO

- `<title>` y `<meta name="description">` reales y locales. Ej. title: "Fisioterapia y Osteopatía en San José de la Rinconada | FISIOSALUD SAN JOSÉ". Description centrada en servicios + localidad.
- **Open Graph** y **Twitter Card** completos y correctos (esto la web vieja lo tenía roto). `og:image` debe apuntar a una imagen real alojada en el dominio final. Deja `[[OG_IMAGE_URL]]` y `[[DOMINIO]]` como placeholders.
- **JSON-LD** de tipo `MedicalBusiness` / `Physiotherapy` con NAP real:
  - name: FISIOSALUD SAN JOSÉ
  - address: C/ Alcalde Pepe Iglesias 14, local 1 A, 41309 San José de la Rinconada, Sevilla, ES
  - geo: 37.491331, -5.943336
  - telephone: +34 954 79 23 75 (y +34 652 15 25 42)
  - email: info@fisiosalud-sanjose.es
  - sameAs: el Facebook real
  - openingHours: `[[CONFIRMAR]]`
  - priceRange: omitir o `[[CONFIRMAR]]`
- `<html lang="es">`, jerarquía de encabezados correcta, `canonical`, `robots.txt` y `sitemap.xml`.

---

## 8. IMÁGENES Y DIRECCIÓN DE ARTE

Crea *slots* de imagen claramente nombrados (`assets/img/hero.webp`, `assets/img/centro.webp`, `assets/img/equipo-sonia.webp`, `assets/img/equipo-josemanuel.webp`, `assets/img/servicio-osteopatia.webp`, etc.) con placeholders y `alt` ya redactado. El cliente sustituirá por fotos reales del centro (recomendado para máxima confianza) o por imágenes generadas a medida.

**Dirección de arte** (para que las imágenes encajen con la paleta y el objetivo de confianza):
- Fisioterapia y terapia manual reales: manos del profesional trabajando, sesión en camilla, ambiente de consulta limpio y luminoso.
- Luz natural suave, tonos cálidos y rosados/neutros que armonicen con la paleta.
- Sensación real, cercana y profesional; **nada** de stock cursi ni poses artificiales.
- Diversidad de pacientes coherente con su público real: incluye personas mayores y referencias a bebés/niños y deportistas, ya que tratan todas las edades.
- Formato WebP, con `width`/`height` y `loading="lazy"` (salvo el hero).

> Nota para Ángel: las fotos reales del centro y del equipo existen y son preferibles a imágenes generadas, porque las caras reales y el local real disparan la confianza. Si se generan imágenes, mantener la coherencia cromática con la paleta rosa/neutra.

---

## 9. FORMULARIO FUNCIONAL (que de verdad envíe)

La web vieja, como muchas, tenía formulario que no enviaba a ningún sitio. Aquí debe funcionar:
- Integra el formulario con un servicio para sitios estáticos: **Web3Forms** o **Formspree** (sin backend propio). Deja la clave/endpoint como placeholder `[[FORM_ACCESS_KEY]]`.
- Validación en cliente (campos requeridos, formato de email/teléfono) + envío real al servicio.
- Tras enviar correctamente, redirige a `gracias.html` (o muestra un mensaje de éxito en línea) con copy claro: "Hemos recibido tu consulta. Te contactaremos lo antes posible."
- Incluye honeypot anti-spam.
- **Fallback siempre visible:** aunque el formulario fallara, los botones de WhatsApp y teléfono permiten contactar igualmente.
- Checkbox de consentimiento obligatorio con enlace a la Política de Privacidad (requisito RGPD).

---

## 10. PÁGINAS LEGALES Y COOKIES (LSSI-CE + RGPD)

Genera tres páginas con la misma identidad visual: **Aviso Legal**, **Política de Privacidad** y **Política de Cookies**. Redáctalas como plantillas correctas en español, con los datos reales del centro ya incluidos (nombre comercial, dirección, email, teléfonos) y **placeholders claramente marcados** para los datos fiscales que solo tiene el cliente: `[[TITULAR / RAZÓN SOCIAL]]`, `[[NIF/CIF]]`, `[[DATOS REGISTRALES si aplica]]`. Que los enlaces a estas páginas funcionen desde el footer y desde el formulario (la web vieja los tenía rotos y duplicados; aquí deben ser limpios y correctos).

**Banner de cookies** funcional y conforme: aviso al primer acceso, opciones aceptar/rechazar/configurar, y recuerdo de la elección en `localStorage`. Que las variables del banner se rendericen de verdad (la web vieja mostraba placeholders sin rellenar). Si no se cargan cookies de terceros más allá del mapa, mantenlo simple pero correcto.

---

## 11. CHECKLIST DE CALIDAD ANTES DE ENTREGAR

- [ ] Responsive perfecto en 360px, 768px, 1024px y 1440px.
- [ ] Menú móvil funcional; CTA de cita siempre accesible.
- [ ] Foco de teclado visible en todos los elementos interactivos.
- [ ] Contraste AA verificado en textos y botones.
- [ ] `prefers-reduced-motion` desactiva animaciones.
- [ ] Todas las imágenes con `alt`, `width`, `height` y lazy (salvo hero).
- [ ] Todos los enlaces funcionan (incluidos legales y anclas de navegación).
- [ ] Formulario envía de verdad y redirige/confirma; fallback de WhatsApp/teléfono visible.
- [ ] JSON-LD válido; OG/Twitter correctos.
- [ ] Cero erratas. Cero texto de plantilla ("productos", "catálogo", "Lorem ipsum").
- [ ] Paleta y tipografía aplicadas de forma consistente; sin reglas CSS que se anulen.
- [ ] README con instrucciones de despliegue (GitHub Pages/Netlify) y lista de placeholders.

---

## 12. PLACEHOLDERS QUE QUEDAN PENDIENTES (para que Ángel los complete con el cliente)

Marca todos estos en el código de forma visible para no olvidarlos:
1. **Horario real** del centro (verificar; valor de directorios a confirmar: L–V 9:00–14:30 y 17:00–21:00).
2. **Fotos reales** del centro y del equipo (Sonia y José Manuel), o imágenes generadas coherentes con la paleta.
3. **Reseñas reales de Google** (texto + nombre), valoración media y URL del perfil de Google.
4. **Datos fiscales/legales:** titular o razón social, NIF/CIF y datos registrales si aplica, para las páginas legales.
5. **Redes sociales:** confirmar Instagram real (si existe) o dejar solo el Facebook real ya indicado.
6. **Clave del servicio de formulario** (Web3Forms/Formspree).
7. **Dominio final** y URL de la imagen para Open Graph.
8. **Seguros / volante médico:** confirmar si trabajan con mutuas para la FAQ (o eliminar esa pregunta).

---

## 13. LO QUE NO DEBES HACER

- No inventes datos, cifras, certificaciones, precios, garantías ni testimonios.
- No reutilices el copy de plantilla de la web vieja ("nuestros productos", "catálogo", "soluciones").
- No enlaces redes sociales falsas ni a la home genérica de las redes.
- Toda la web va en la familia rosa (lienzo rosado por defecto, no blanco), pero con rosa sofisticado y empolvado + ciruela + neutros cálidos; nunca rosa infantil, chicle ni fucsia, y nunca un blanco dominante con el rosa como mero acento.
- No caigas en el look genérico de IA (crema+serif+terracota / negro+verde ácido / periódico).
- No dejes formularios que no envían ni enlaces legales rotos.
- No metas librerías JS innecesarias ni dependencias de build.

Construye la web completa, lista para subir, con todos los archivos del árbol indicado y un README claro.
