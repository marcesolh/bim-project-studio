document.addEventListener('DOMContentLoaded', () => {

  /* ===== Header con scroll ===== */
  const header = document.getElementById('header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll);

  /* ===== Menú móvil ===== */
  const btnMenu = document.getElementById('btnMenu');
  const navMovil = document.getElementById('navMovil');
  const cerrarMenu = document.getElementById('cerrarMenu');
  const velo = document.getElementById('velo');

  function abrirMenu(){
    navMovil.classList.add('abierto');
    btnMenu.classList.add('abierto');
    velo.classList.add('activo');
    document.body.style.overflow = 'hidden';
  }
  function cerrarMenuFn(){
    navMovil.classList.remove('abierto');
    btnMenu.classList.remove('abierto');
    velo.classList.remove('activo');
    document.body.style.overflow = '';
  }
  btnMenu.addEventListener('click', abrirMenu);
  cerrarMenu.addEventListener('click', cerrarMenuFn);
  velo.addEventListener('click', cerrarMenuFn);
  navMovil.querySelectorAll('a').forEach(a => a.addEventListener('click', cerrarMenuFn));

  /* ===== Animaciones al hacer scroll (reveal) ===== */
  document.querySelectorAll('.servicio-card, .metodologia-item, .metricas-panel, .curso-card, .mapa-wrap')
    .forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* ===== Portafolio: proyectos BIM (con ficha) + galería simple JBT ===== */
  const galeria = document.getElementById('galeria');
  const filtros = document.getElementById('filtros');
  const listaSinImagen = document.getElementById('listaSinImagen');

  const items = [
    ...(typeof PROYECTOS_BIM !== 'undefined' ? PROYECTOS_BIM.map(p => ({ tipo: 'proyecto', cat: 'bps', catLabel: 'BIM Project Studio', ...p })) : []),
    ...(typeof PROYECTOS_JBT !== 'undefined' ? PROYECTOS_JBT.map(p => ({ tipo: 'imagen', cat: 'jbt', catLabel: 'Arq. Jessica Bustos Tapia', ...p })) : [])
  ];

  function renderGaleria(lista){
    galeria.innerHTML = lista.map((p, i) => {
      if (p.tipo === 'proyecto') {
        return `
          <div class="obra obra--proyecto" data-cat="${p.cat}" data-index="${i}">
            <img src="${p.imagenes[0]}" alt="${p.titulo}" loading="lazy">
            <div class="obra-lupa">&#10021;</div>
            <div class="obra-veil">
              <span class="obra-cat">${p.catLabel} · ${p.anio}</span>
              <h4>${p.titulo}</h4>
              <span class="obra-meta">${p.ubicacion} · ${p.superficie}</span>
              <span class="obra-link">Ver ficha del proyecto &rarr;</span>
            </div>
          </div>`;
      }
      return `
        <div class="obra" data-cat="${p.cat}" data-index="${i}">
          <img src="${p.src}" alt="${p.titulo}" loading="lazy">
          <div class="obra-lupa">&#10021;</div>
          <div class="obra-veil">
            <span class="obra-cat">${p.catLabel}</span>
            <h4>${p.titulo}</h4>
          </div>
        </div>`;
    }).join('');
  }

  let listaActual = items;

  if (galeria) {
    renderGaleria(listaActual);

    if (filtros) {
      filtros.addEventListener('click', (e) => {
        const btn = e.target.closest('.filtro-btn');
        if (!btn) return;
        filtros.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('activo'));
        btn.classList.add('activo');
        const f = btn.dataset.filtro;
        listaActual = f === 'todos' ? items : items.filter(p => p.cat === f);
        renderGaleria(listaActual);
        if (listaSinImagen) listaSinImagen.classList.toggle('hidden', f === 'jbt');
      });
    }

    /* ===== Lightbox (galería simple JBT) ===== */
    const lightbox = document.getElementById('lightbox');
    const lbImg = document.getElementById('lbImg');
    const lbCaption = document.getElementById('lbCaption');
    let indexLb = 0;

    function abrirLightbox(i){
      indexLb = i;
      const p = listaActual[i];
      lbImg.src = p.src;
      lbImg.alt = p.titulo;
      lbCaption.textContent = `${p.titulo} — ${p.catLabel}`;
      lightbox.classList.add('activo');
      document.body.style.overflow = 'hidden';
    }
    function cerrarLightbox(){
      lightbox.classList.remove('activo');
      document.body.style.overflow = '';
    }
    function moverLb(delta){
      let n = indexLb;
      do { n = (n + delta + listaActual.length) % listaActual.length; }
      while (listaActual[n].tipo !== 'imagen' && n !== indexLb);
      abrirLightbox(n);
    }

    /* ===== Modal de ficha de proyecto ===== */
    const modal = document.getElementById('proyectoModal');
    const pmImg = document.getElementById('pmImg');
    const pmTitulo = document.getElementById('pmTitulo');
    const pmAnio = document.getElementById('pmAnio');
    const pmUbicacion = document.getElementById('pmUbicacion');
    const pmSuperficie = document.getElementById('pmSuperficie');
    const pmMandante = document.getElementById('pmMandante');
    const pmDescripcion = document.getElementById('pmDescripcion');
    const pmThumbs = document.getElementById('pmThumbs');
    let proyectoActual = null;
    let imgIndexActual = 0;

    function pintarImagenProyecto(){
      pmImg.src = proyectoActual.imagenes[imgIndexActual];
      pmThumbs.querySelectorAll('.pm-thumb').forEach((t, i) => t.classList.toggle('activo', i === imgIndexActual));
    }

    function abrirModal(proyecto){
      proyectoActual = proyecto;
      imgIndexActual = 0;
      pmTitulo.textContent = proyecto.titulo;
      pmAnio.textContent = proyecto.anio;
      pmUbicacion.textContent = proyecto.ubicacion;
      pmSuperficie.textContent = proyecto.superficie;
      pmMandante.textContent = proyecto.mandante;
      pmDescripcion.textContent = proyecto.descripcion;
      pmThumbs.innerHTML = proyecto.imagenes.map((src, i) =>
        `<button class="pm-thumb${i === 0 ? ' activo' : ''}" data-i="${i}"><img src="${src}" alt="${proyecto.titulo} — imagen ${i + 1}"></button>`
      ).join('');
      pintarImagenProyecto();
      modal.classList.add('activo');
      document.body.style.overflow = 'hidden';
    }
    function cerrarModal(){
      modal.classList.remove('activo');
      document.body.style.overflow = '';
    }

    pmThumbs.addEventListener('click', (e) => {
      const t = e.target.closest('.pm-thumb');
      if (!t) return;
      imgIndexActual = Number(t.dataset.i);
      pintarImagenProyecto();
    });
    document.getElementById('pmPrev').addEventListener('click', () => {
      imgIndexActual = (imgIndexActual - 1 + proyectoActual.imagenes.length) % proyectoActual.imagenes.length;
      pintarImagenProyecto();
    });
    document.getElementById('pmNext').addEventListener('click', () => {
      imgIndexActual = (imgIndexActual + 1) % proyectoActual.imagenes.length;
      pintarImagenProyecto();
    });
    document.getElementById('pmCerrar').addEventListener('click', cerrarModal);
    document.getElementById('pmCotizar').addEventListener('click', cerrarModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) cerrarModal(); });

    galeria.addEventListener('click', (e) => {
      const obra = e.target.closest('.obra');
      if (!obra) return;
      const i = Number(obra.dataset.index);
      const item = listaActual[i];
      if (item.tipo === 'proyecto') {
        abrirModal(item);
      } else {
        indexLb = i;
        abrirLightbox(i);
      }
    });

    document.getElementById('lbCerrar').addEventListener('click', cerrarLightbox);
    document.getElementById('lbPrev').addEventListener('click', () => moverLb(-1));
    document.getElementById('lbNext').addEventListener('click', () => moverLb(1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) cerrarLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('activo')) {
        if (e.key === 'Escape') cerrarLightbox();
        if (e.key === 'ArrowLeft') moverLb(-1);
        if (e.key === 'ArrowRight') moverLb(1);
      }
      if (modal.classList.contains('activo')) {
        if (e.key === 'Escape') cerrarModal();
      }
    });
  }

  /* ===== Formulario de contacto ===== */
  const form = document.getElementById('formContacto');
  const formVisible = document.getElementById('formVisible');
  const formExito = document.getElementById('formExito');
  const btnOtroEnvio = document.getElementById('btnOtroEnvio');
  const inputArchivo = document.getElementById('archivo');
  const labelArchivo = document.getElementById('labelArchivo');

  inputArchivo.addEventListener('change', () => {
    const n = inputArchivo.files.length;
    labelArchivo.textContent = n > 0
      ? `📎 ${n} archivo(s) seleccionado(s)`
      : '📎 Haz clic para subir archivos (PDF, DWG, JPG)';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Envío gestionado en el backend del cliente (formulario listo para conectar a servicio de correo/API).
    formVisible.style.display = 'none';
    formExito.classList.add('activo');
    form.reset();
    labelArchivo.textContent = '📎 Haz clic para subir archivos (PDF, DWG, JPG)';
  });

  btnOtroEnvio.addEventListener('click', () => {
    formExito.classList.remove('activo');
    formVisible.style.display = 'block';
  });

});
