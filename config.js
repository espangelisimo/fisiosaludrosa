// FISIOSALUD SAN JOSÉ — config.js
// Punto único de configuración del negocio.
// Edita SOLO este archivo para actualizar datos en toda la web.

const CFG = {
  // Identidad
  nombre:    'FISIOSALUD SAN JOSÉ',
  claim:     'Fisioterapia y osteopatía con más de 20 años de experiencia',

  // Contacto
  tel1:      '954 79 23 75',
  tel1Href:  'tel:+34954792375',
  tel2:      '652 15 25 42',
  tel2Href:  'tel:+34652152542',
  whatsapp:  'https://wa.me/34652152542',
  email:     'info@fisiosalud-sanjose.es',

  // Dirección
  calle:     'C/ Alcalde Pepe Iglesias nº 14, local 1 A',
  cp:        '41309',
  localidad: 'San José de la Rinconada',
  provincia: 'Sevilla',
  lat:        37.491569,
  lng:       -5.940611,

  // Horario — confirmar con el cliente
  // Valor encontrado en directorios externos (a verificar):
  horario:   '[[HORARIO — confirmar con el cliente. Valor de directorios: L–V 9:00–14:30 y 17:00–21:00]]',

  // Redes sociales
  facebook:  'https://www.facebook.com/profile.php?id=100057221689090',
  instagram: '[[INSTAGRAM_URL — confirmar si existe]]',

  // Formulario Web3Forms — obtener en web3forms.com
  formKey:   '[[FORM_ACCESS_KEY]]',

  // SEO / Open Graph
  dominio:   '[[DOMINIO — p.ej. https://fisiosalud-sanjose.es]]',
  ogImage:   '[[OG_IMAGE_URL — p.ej. https://fisiosalud-sanjose.es/assets/img/og.webp]]',

  // Reseñas Google
  googleReviewsUrl: '[[GOOGLE_REVIEWS_URL]]',
  valoracionMedia:  '[[VALORACION_MEDIA — p.ej. 4.9]]',

  // Año dinámico para copyright
  anio: new Date().getFullYear(),
};
