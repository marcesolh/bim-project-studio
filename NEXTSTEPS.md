# BIM PROJECT STUDIO — Estado del desarrollo

Última actualización: 2026-08-02

## Estado actual

Sitio de una sola página (`index.html`), estático, sin build ni dependencias — se abre directo en el navegador. Diseño editorial minimalista (referencia: ark-shelter.com) en azul corporativo. Contenido basado en `Propuesta_Web_BIM_PROJECT_STUDIO_v4.pdf` y en los dos portafolios PPTX del cliente.

Secciones implementadas: Header + menú móvil, Hero (imagen real de proyecto), Servicios, Portafolio interactivo (fichas de proyecto BIM Project Studio + galería simple Jessica Bustos Tapia), Metodología/Beneficios, Cursos y Capacitaciones, Contacto (formulario + WhatsApp + mapa), Footer.

## Archivos del proyecto

| Archivo | Rol |
|---|---|
| `index.html` | Estructura y contenido de todas las secciones |
| `styles.css` | Todo el diseño visual (estilo editorial, responsive, modal, lightbox) |
| `script.js` | Menú móvil, scroll-reveal, filtros de portafolio, lightbox, modal de ficha de proyecto, formulario de contacto |
| `portafolio-data.js` | Datos de los proyectos del portafolio (extraídos de los PPTX) |
| `assets/img/logo.jpg` | Logo real de la empresa (usado en header, menú móvil, footer y favicon) |
| `assets/img/portafolio/` | Imágenes de proyectos extraídas de los PPTX + foto del Hero (`Centro-polifuncional-Coyhaique-2.jpg`) |
| `Propuesta_Web_BIM_PROJECT_STUDIO_v4.pdf` | Brief original del cliente (fuente de requerimientos) |
| `Portafolio BIM PROJECT.pptx` | Fuente de las 4 fichas de proyecto con detalle (Aeródromo Pucón, Aeropuerto Mataveri, SAG Quillota, PDI Coronel) |
| `Portafolio BIM- Arq. Jessica Bustos Tapia. (2).pptx` | Fuente de la galería simple de la segunda categoría del portafolio |

## Pendientes conocidos (placeholders sin reemplazar)

- Número de WhatsApp: `+56900000000` (aparece en botón flotante, sección Contacto y footer)
- Correo: `contacto@bimstudio.cl` (no confirmado como real)
- El formulario de contacto no envía datos a ningún backend todavía — solo simula éxito en el navegador
- El mapa embebido apunta a "Santiago, Chile" genérico, no a una dirección real
- La galería de Jessica Bustos Tapia no tiene fichas de detalle (solo imágenes), a diferencia de BIM Project Studio

## Siguientes 3 pasos exactos

1. **Reemplazar los datos de contacto reales**: número de WhatsApp Business, correo corporativo y dirección/mapa, en `index.html` (secciones Header, Contacto, Footer y el botón flotante) — actualmente son placeholders.
2. **Conectar el formulario de contacto a un servicio real de envío** (ej. Formspree, EmailJS, o un backend propio) en `script.js`, dentro del listener `form.addEventListener('submit', ...)`, que hoy solo muestra el mensaje de éxito sin enviar nada.
3. **Decidir y extraer el detalle de los proyectos de Jessica Bustos Tapia** desde su PPTX (igual que se hizo con `PROYECTOS_BIM` en `portafolio-data.js`), si el cliente quiere fichas de detalle también para esa categoría.
