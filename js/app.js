// Evita que el navegador recuerde la posición del scroll
window.history.scrollRestoration = 'manual';

// Animaciones con Intersection Observer
document.addEventListener("DOMContentLoaded", () => {

    const mostrarElemento = new IntersectionObserver((elementos) => {

        elementos.forEach((elemento, index) => {
            if (elemento.isIntersecting) {
                elemento.target.style.setProperty('--retraso', `${index * 0.3}s`); //retraso del elemento actual * 0.3s
                elemento.target.classList.add('visible');
                mostrarElemento.unobserve(elemento.target);
            }
        });

    }, { threshold: .2 });

    // Nombres de clases css a observar
    const classNames = [
        'index-intro-txt',
        'intro-img',
        'index-intro-txt-container',
        'index-contenido-txt',
        'index-sites-item',
        'mano-content',
        'show-container'
    ];

    //Recorrer cada clase y observar sus elementos.
    classNames.forEach((className) => {
        document.querySelectorAll(`.${className}`).forEach((item) => mostrarElemento.observe(item));
    });
});

// Código manejo de acordeones (.accordion-header)
const accordionHeaders = document.querySelectorAll('.accordion');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const arrow = header.querySelector('.arrow');

        content.classList.toggle('mostrar');
        arrow.classList.toggle('rotate');
    });
});

// Código manejo de selección de posiciones y rangos
document.addEventListener("DOMContentLoaded", () => {
  // Todas las posiciones clickeables (6-max y 9-max)
  const posiciones = document.querySelectorAll(".posicion-6, .posicion-9");

  // Asociar imágenes de tablas con posiciones
  const tablas = {
    "6": {
      utg: "img/6-UTG.png",
      mp: "img/6-MP.png",
      co: "img/6-CO.png",
      btn: "img/6-BTN.png",
      sb: "img/6-SB.png",
      bb: "img/6-BB.png",
    },
    "9": {
      utg: "img/9-UTG.png",
      utg1: "img/9-UTG+1.png",
      utg2: "img/9-UTG+2.png",
      mp: "img/9-MP.png",
      hj: "img/9-HJ.png",
      co: "img/9-CO.png",
      btn: "img/9-BTN.png",
      sb: "img/9-SB.png",
      bb: "img/9-BB.png",
    },
  };

  // Contenedor y artículos con la descripción de posiciones
  const descripcionCont = document.getElementById("descripcion-posicion");
  const articulos = descripcionCont ? descripcionCont.querySelectorAll("article") : [];

  // Evento para cada posición
  posiciones.forEach((pos) => {
    pos.addEventListener("click", () => {
      const [posicion, mesa] = pos.id.split("-");

      // Cambiar tabla de rangos (solo si el elemento existe en la página) ===
      const tablaPreflop = document.getElementById(`table-preflop-${mesa}`);
      if (tablaPreflop && tablas[mesa] && tablas[mesa][posicion]) {
        tablaPreflop.src = tablas[mesa][posicion];
        tablaPreflop.alt = `Tabla de rangos preflop - ${pos.alt}`;
      }

      // Mostrar descripción correspondiente
      if (descripcionCont) {
        // eliminar cualquier fallback anterior
        descripcionCont.querySelectorAll("article.fallback").forEach(a => a.remove());

        // ocultar todos los artículos existentes
        articulos.forEach((art) => art.hidden = true);

        // buscar el article que coincida con el id (data-posicion)
        const seleccionado = descripcionCont.querySelector(
          `article[data-posicion="${pos.id}"]`
        );

        if (seleccionado) {
          seleccionado.hidden = false;
        } else {
          // fallback: mostrar mensaje si no hay article para esa posición
          const fallback = document.createElement("article");
          fallback.classList.add("fallback");
          fallback.innerHTML = `<h3>Descripción no disponible</h3>
                                <p>No hay una descripción definida para <strong>${pos.id}</strong>.</p>`;
          descripcionCont.appendChild(fallback);
        }
      }

      // Resaltar posición activa
      posiciones.forEach((p) => p.classList.remove("activa"));
      pos.classList.add("activa");
    });
  });
});