/* ================================================================
   FOUND FOOTAGE V/H/S — Interacciones
   Bloques: 1. Datos de las cintas · 2. Carrusel de cintas
            3. Menú móvil y navegación · 4. HUD de cámara
            5. Túnel de papel (parallax + linterna)
            6. Manchas de tinta y glitch de tarjetas · 7. Glitch aleatorio
            8. Aparición al hacer scroll
   ================================================================ */

// ¿La persona prefiere menos movimiento? (ajuste del sistema operativo)
const menosMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


/* ---------- 1. DATOS DE LAS CINTAS ----------
   Para cambiar una película, edita solo este arreglo.
   Las imágenes van en assets/cintas/vhs-N.jpg (portada) y lomo-N.jpg (lomo). */
const peliculas = [
  {
    titulo: "V/H/S", lomo: "V/H/S", anio: 2012, cinta: "Tape 56",
    sinopsis: "Un grupo de delincuentes entra a una casa a oscuras para robar un VHS por encargo. Encuentran el cadáver del dueño rodeado de televisores de tubo y cintas, y para hallar la correcta reproducen varias: poco a poco, la exposición a las imágenes altera la realidad en la casa.",
    segmentos: "Tape 56 · Amateur Night · Second Honeymoon · Tuesday the 17th · The Sick Thing That Happened to Emily When She Was Younger · 10/31/98"
  },
  {
    titulo: "V/H/S/2", lomo: "V/H/S/2", anio: 2013, cinta: "Tape 49",
    sinopsis: "Dos detectives privados, Larry y Ayesha, entran a la casa de un universitario desaparecido. Mientras Ayesha ve las cintas, sus frecuencias y ruidos la enferman, y Larry descubre que el estudiante se grababa reaccionando a ellas para «cruzar al otro lado».",
    segmentos: "Tape 49 · Phase I Clinical Trials · A Ride in the Park · Safe Haven · Slumber Party Alien Abduction"
  },
  {
    titulo: "V/H/S: Viral", lomo: "V/H/S: VIRAL", anio: 2014, cinta: "Vicious Circles",
    sinopsis: "Un camión de helados causa persecuciones policiales por Los Ángeles. Kevin lo persigue en bicicleta porque su novia fue secuestrada y está dentro, y cualquiera que grabe el camión con su celular recibe un virus digital que lo vuelve homicida.",
    segmentos: "Vicious Circles · Dante the Great · Parallel Monsters · Bonestorm"
  },
  {
    titulo: "V/H/S/94", lomo: "V/H/S/94", anio: 2021, cinta: "Holy Hell",
    sinopsis: "Un escuadrón táctico SWAT realiza una redada en un almacén abandonado que sirve como base para un culto extremista. Entre pasillos oscuros encuentran cadáveres, prisioneros mutilados y monitores reproduciendo cintas, hasta descubrir que han caído en una trampa.",
    segmentos: "Holy Hell · Storm Drain · The Empty Wake · The Subject · Terror"
  },
  {
    titulo: "V/H/S/99", lomo: "V/H/S/99", anio: 2022, cinta: "5 segmentos",
    sinopsis: "Cinco cintas ambientadas al final de los 90: una banda punk que se burla de una tragedia, una novatada que entierra viva a una aspirante a la hermandad, una parodia de concurso convertida en venganza, adolescentes que espían a una misteriosa vecina y dos camarógrafos atrapados en el infierno la víspera del Y2K.",
    segmentos: "Shredding · Suicide Bid · Ozzy's Dungeon · The Gawkers · To Hell and Back"
  },
  {
    titulo: "V/H/S/85", lomo: "V/H/S/85", anio: 2023, cinta: "Total Copy",
    sinopsis: "Total Copy, la cinta principal, se presenta como un falso documental científico de los 80 sobre Rory, un niño que en realidad es un extraterrestre capaz de cambiar de forma y asimilar materia, y que se vuelve cada vez más agresivo al consumir televisión humana.",
    segmentos: "Total Copy · No Wake · God of Death · TKNOGD · Ambrosia"
  },
  {
    titulo: "V/H/S/Beyond", lomo: "V/H/S/BEYOND", anio: 2024, cinta: "Abduction/Adrenaline",
    sinopsis: "Dos documentalistas investigan avistamientos de OVNIS y extrañas mutilaciones en cintas VHS de los años 90, hasta darse cuenta de que la invasión alienígena no es un evento del pasado: está sucediendo a su alrededor y deben documentar su propio encuentro.",
    segmentos: "Abduction/Adrenaline · Stork · Dream Girl · Live and Let Dive · Fur Babies · Stowaway"
  },
  {
    titulo: "V/H/S/Halloween", lomo: "V/H/S/HALLOWEEN", anio: 2025, cinta: "Temática unificada",
    sinopsis: "Regresa al terror clásico con cintas centradas en la noche de Halloween: casas del terror que son mataderos reales, bromas de «truco o trato» que invocan entidades antiguas y fiestas donde los monstruos no llevan máscara. La trama central sigue a coleccionistas que organizan una maratón clandestina de VHS el 31 de octubre.",
    segmentos: "Formato antológico con temática unificada: la noche de Halloween"
  },
  {
    titulo: "V/H/S/Mixtape", lomo: "V/H/S/MIXTAPE", anio: 2026, cinta: "Temática unificada",
    sinopsis: "Se adentra en el audio, la industria musical y los conciertos: mensajes satánicos al reproducir discos al revés, estrellas de rock de los 70 con pactos de sangre y frecuencias inaudibles que enloquecen a ingenieros de sonido. La trama envolvente sigue a un DJ nocturno que, al transmitir cintas anónimas, esparce una ola de locura colectiva.",
    segmentos: "Formato antológico con temática unificada: audio, música y conciertos"
  }
];


/* ---------- 2. CARRUSEL DE CINTAS ---------- */
const estante = document.querySelector(".estante");
const visor = document.querySelector(".visor");
const visorImagen = document.querySelector(".visor-imagen");
const visorNombre = document.querySelector(".visor-placeholder-nombre");
const ficha = document.querySelector(".ficha");
const fichaAnio = document.querySelector(".badge-anio");
const fichaCinta = document.querySelector(".ficha .badge-cinta");
const fichaTitulo = document.querySelector(".ficha h3");
const fichaSinopsis = document.querySelector(".ficha-sinopsis");
const fichaSegmentos = document.querySelector(".ficha-segmentos");

let cintaActual = 0;

// 2a. Construye un lomo por película
peliculas.forEach((peli, i) => {
  const lomo = document.createElement("button");
  lomo.type = "button";
  lomo.className = "lomo";
  lomo.setAttribute("role", "listitem");
  lomo.setAttribute("aria-label", `${peli.titulo} (${peli.anio})`);
  lomo.innerHTML = `
    <span class="lomo-etiqueta">VHS</span>
    <span class="lomo-titulo">${peli.lomo}</span>
    <span class="lomo-anio">${peli.anio}</span>
    <img class="lomo-imagen" src="assets/cintas/lomo-${i + 1}.jpg" alt="Lomo de la cinta ${peli.titulo}">`;
  // Si la imagen del lomo no existe, se borra y queda el lomo diseñado en CSS
  lomo.querySelector(".lomo-imagen").addEventListener("error", (e) => e.target.remove());
  lomo.addEventListener("click", () => mostrarCinta(i));
  estante.appendChild(lomo);
});
const lomos = estante.querySelectorAll(".lomo");

// 2b. Si la portada no carga, se muestra el marco de reemplazo
visorImagen.addEventListener("error", () => visor.classList.add("sin-imagen"));
visorImagen.addEventListener("load", () => visor.classList.remove("sin-imagen"));

// 2c. Muestra la cinta número "indice" (da la vuelta al llegar a los extremos)
function mostrarCinta(indice) {
  cintaActual = (indice + peliculas.length) % peliculas.length;
  const peli = peliculas[cintaActual];

  // Lomo seleccionado
  lomos.forEach((lomo, i) => {
    lomo.classList.toggle("is-active", i === cintaActual);
    lomo.setAttribute("aria-current", i === cintaActual ? "true" : "false");
  });

  // En móvil el estante se desliza hasta el lomo activo
  if (window.innerWidth <= 768) {
    const lomo = lomos[cintaActual];
    estante.scrollTo({ left: lomo.offsetLeft - (estante.clientWidth - lomo.offsetWidth) / 2, behavior: "smooth" });
  }

  // Distorsión VHS en la portada
  visor.classList.remove("cambiando");
  void visor.offsetWidth;                 // reinicia la animación
  visor.classList.add("cambiando");
  visorImagen.src = `assets/cintas/vhs-${cintaActual + 1}.jpg`;
  visorImagen.alt = `Portada de ${peli.titulo} (${peli.anio})`;
  visorNombre.textContent = `${peli.titulo} (${peli.anio})`;

  // La ficha se desvanece, cambia el texto y vuelve a aparecer
  ficha.classList.add("cambiando");
  setTimeout(() => {
    fichaAnio.textContent = peli.anio;
    fichaCinta.textContent = peli.cinta.toUpperCase();
    fichaTitulo.textContent = peli.titulo;
    fichaSinopsis.textContent = peli.sinopsis;
    fichaSegmentos.textContent = peli.segmentos;
    ficha.classList.remove("cambiando");
  }, menosMovimiento ? 0 : 200);
}
visor.addEventListener("animationend", () => visor.classList.remove("cambiando"));

// 2d. Flechas, teclado y gesto de deslizar sobre la portada
document.querySelector(".flecha-anterior").addEventListener("click", () => mostrarCinta(cintaActual - 1));
document.querySelector(".flecha-siguiente").addEventListener("click", () => mostrarCinta(cintaActual + 1));

const seccionCintas = document.querySelector(".cintas-section");
document.addEventListener("keydown", (e) => {
  const rect = seccionCintas.getBoundingClientRect();
  const seccionVisible = rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4;
  if (!seccionVisible || document.body.classList.contains("menu-abierto")) return;
  if (e.key === "ArrowLeft") mostrarCinta(cintaActual - 1);
  if (e.key === "ArrowRight") mostrarCinta(cintaActual + 1);
});

let toqueInicioX = null;
visor.addEventListener("touchstart", (e) => { toqueInicioX = e.touches[0].clientX; }, { passive: true });
visor.addEventListener("touchend", (e) => {
  if (toqueInicioX === null) return;
  const distancia = e.changedTouches[0].clientX - toqueInicioX;
  if (Math.abs(distancia) > 40) mostrarCinta(cintaActual + (distancia < 0 ? 1 : -1));
  toqueInicioX = null;
});

// Primera cinta al cargar (sin animación)
lomos[0].classList.add("is-active");
lomos[0].setAttribute("aria-current", "true");
fichaSinopsis.textContent = peliculas[0].sinopsis;
fichaSegmentos.textContent = peliculas[0].segmentos;
if (visorImagen.complete && visorImagen.naturalWidth === 0) visor.classList.add("sin-imagen");


/* ---------- 3. MENÚ MÓVIL Y NAVEGACIÓN ---------- */
const menu = document.querySelector(".menu-movil");
const botonAbrir = document.querySelector(".menu-abrir");
const botonCerrar = document.querySelector(".menu-cerrar");

function abrirMenu(abrir) {
  menu.classList.toggle("is-open", abrir);
  menu.setAttribute("aria-hidden", String(!abrir));
  botonAbrir.setAttribute("aria-expanded", String(abrir));
  document.body.classList.toggle("menu-abierto", abrir);
  (abrir ? botonCerrar : botonAbrir).focus();
}
botonAbrir.addEventListener("click", () => abrirMenu(true));
botonCerrar.addEventListener("click", () => abrirMenu(false));
menu.querySelectorAll(".menu-link").forEach((link) => link.addEventListener("click", () => abrirMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && menu.classList.contains("is-open")) abrirMenu(false); });

// Marca el enlace de la sección que se está viendo
const enlaces = document.querySelectorAll(".nav-link, .menu-link");
function marcarEnlace(id) {
  enlaces.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
}
const observadorSecciones = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => { if (entrada.isIntersecting) marcarEnlace(entrada.target.id); });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("#inicio, #cintas, #expediente, #creditos").forEach((s) => observadorSecciones.observe(s));
// El footer es bajito: al llegar al final de la página se marca “Créditos”
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) marcarEnlace("creditos");
}, { passive: true });


/* ---------- 4. HUD DE CÁMARA (contador REC) ---------- */
const hero = document.querySelector(".hero-section");
const timecode = document.querySelector(".timecode");
let segundos = 0;

// Suma un segundo al contador REC SP 00:00:00
const dosCifras = (n) => String(n).padStart(2, "0");
setInterval(() => {
  segundos++;
  timecode.textContent = `${dosCifras(Math.floor(segundos / 3600))}:${dosCifras(Math.floor(segundos / 60) % 60)}:${dosCifras(segundos % 60)}`;
}, 1000);


/* ---------- 5. TÚNEL DE PAPEL: PARALLAX + LINTERNA ----------
   Las capas son imágenes en el HTML; aquí solo se mueven y se ilumina la linterna. */
const capas = [...document.querySelectorAll("[data-profundidad]")];
const oscuridad = document.querySelector(".tunnel-oscuridad");

// Posición deseada (objetivo) y posición actual (se acerca suave = “lerp”)
const objetivo = { x: 0.5, y: 0.45 };
const actual = { x: 0.5, y: 0.45 };
let temporizadorReposo;
let heroVisible = true;

function encenderLinterna(clienteX, clienteY) {
  const rect = hero.getBoundingClientRect();
  objetivo.x = (clienteX - rect.left) / rect.width;
  objetivo.y = (clienteY - rect.top) / rect.height;
  const radio = Math.max(220, Math.min(rect.width, rect.height) * 0.42);
  oscuridad.style.setProperty("--radio-luz", `${radio}px`);
  // Sin movimiento durante 1,5 s → la linterna se apaga y vuelve la oscuridad
  clearTimeout(temporizadorReposo);
  temporizadorReposo = setTimeout(() => oscuridad.style.setProperty("--radio-luz", "0px"), 1500);
}
hero.addEventListener("mousemove", (e) => encenderLinterna(e.clientX, e.clientY));
hero.addEventListener("touchmove", (e) => encenderLinterna(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
hero.addEventListener("touchstart", (e) => encenderLinterna(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
hero.addEventListener("mouseleave", () => oscuridad.style.setProperty("--radio-luz", "0px"));

// Solo se anima mientras el hero está en pantalla (ahorra batería)
new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(hero);

function animarTunel() {
  if (heroVisible) {
    actual.x += (objetivo.x - actual.x) * 0.08;
    actual.y += (objetivo.y - actual.y) * 0.08;
    const dx = (actual.x - 0.5) * 2;     // de -1 a 1
    const dy = (actual.y - 0.5) * 2;
    capas.forEach((capa) => {
      const prof = parseFloat(capa.dataset.profundidad);
      // Las capas cercanas se mueven más y en sentido contrario al cursor
      capa.style.transform = `translate3d(${(-dx * prof * 60).toFixed(2)}px, ${(-dy * prof * 40).toFixed(2)}px, 0)`;
    });
    oscuridad.style.setProperty("--luz-x", `${(actual.x * 100).toFixed(2)}%`);
    oscuridad.style.setProperty("--luz-y", `${(actual.y * 100).toFixed(2)}%`);
  }
  requestAnimationFrame(animarTunel);
}
if (!menosMovimiento) requestAnimationFrame(animarTunel);
else hero.addEventListener("mousemove", () => {     // sin parallax: solo la luz
  oscuridad.style.setProperty("--luz-x", `${objetivo.x * 100}%`);
  oscuridad.style.setProperty("--luz-y", `${objetivo.y * 100}%`);
});


/* ---------- 6. MANCHAS DE TINTA + GLITCH DE LAS TARJETAS ----------
   Al mover el mouse entre el parallax y el footer aparecen manchas que crecen y se desvanecen.
   Se dibujan en un <canvas> fijo a la pantalla (más fluido que crear cientos de elementos HTML). */
const seccionExpediente = document.querySelector(".expediente-section");
const zonaInicio = document.querySelector(".cintas-section");     // la tinta empieza aquí…
const zonaFin = seccionExpediente;                                // …y termina aquí (antes del footer)
const header = document.querySelector(".header");
const lienzo = document.querySelector(".manchas");
const ctx = lienzo.getContext("2d");
const manchas = [];                 // manchas vivas: { x, y (posición en la página), tam, giro, sprite, inicio }
const DURACION = { crece: 200, quieta: 500, desvanece: 700 };   // milisegundos
const BORDE = 180;                  // px de difuminado junto al parallax y al footer
let ultimoPunto = null;
let animando = false;

// 6a. Se pre-dibujan 6 manchas distintas una sola vez (luego solo se “estampan”)
function crearSprite(semilla) {
  const t = 256, c = document.createElement("canvas");
  c.width = c.height = t;
  const g = c.getContext("2d");
  const azar = (n) => { const x = Math.sin(semilla * 97 + n * 13.7) * 43758.5; return x - Math.floor(x); };
  g.fillStyle = "#7a0c12";
  g.filter = "blur(1.5px)";          // borde suave, como tinta absorbida en papel
  // Mancha principal con borde irregular
  g.beginPath();
  for (let i = 0; i <= 26; i++) {
    const a = (i / 26) * Math.PI * 2;
    const r = 52 * (0.75 + azar(i) * 0.45);
    g.lineTo(128 + Math.cos(a) * r, 128 + Math.sin(a) * r);
  }
  g.fill();
  // Lóbulos y gotitas salpicadas alrededor
  for (let i = 0; i < 18; i++) {
    const a = azar(i + 40) * Math.PI * 2;
    const d = 50 + azar(i + 60) * 60;
    const r = i < 5 ? 14 + azar(i + 80) * 14 : 2 + azar(i + 80) * 6;
    g.beginPath();
    g.arc(128 + Math.cos(a) * d, 128 + Math.sin(a) * d, r, 0, Math.PI * 2);
    g.fill();
  }
  return c;
}
const sprites = [1, 2, 3, 4, 5, 6].map(crearSprite);

// 6b. El lienzo mide lo mismo que la pantalla (nítido en pantallas retina)
function ajustarLienzo() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  lienzo.width = innerWidth * dpr;
  lienzo.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
ajustarLienzo();
window.addEventListener("resize", ajustarLienzo);

// Zona permitida en pantalla: debajo del header, desde Cintas hasta el final de Expediente
function zona() {
  return { arriba: zonaInicio.getBoundingClientRect().top, abajo: zonaFin.getBoundingClientRect().bottom,
           header: header.getBoundingClientRect().bottom };
}

// 6c. Agrega una mancha donde está el puntero (una cada ~40 px de recorrido)
function agregarMancha(clienteX, clienteY) {
  const z = zona();
  if (clienteY < Math.max(z.arriba, z.header) || clienteY > z.abajo) { ultimoPunto = null; return; }
  const x = clienteX, y = clienteY + scrollY;           // se guarda en coordenadas de la página
  if (ultimoPunto && Math.hypot(x - ultimoPunto.x, y - ultimoPunto.y) < 40) return;
  ultimoPunto = { x, y };
  manchas.push({ x, y, tam: 110 + Math.random() * 130, giro: Math.random() * Math.PI * 2,
                 sprite: sprites[Math.floor(Math.random() * sprites.length)], inicio: performance.now() });
  if (manchas.length > 90) manchas.shift();
  if (!animando) { animando = true; requestAnimationFrame(dibujarManchas); }
}

// 6d. Dibuja cada mancha: crece rápido, se queda un momento y se desvanece
function dibujarManchas(ahora) {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  const z = zona();
  const arriba = Math.max(z.arriba, z.header), abajo = Math.min(z.abajo, innerHeight);
  const total = DURACION.crece + DURACION.quieta + DURACION.desvanece;

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, arriba, innerWidth, Math.max(0, abajo - arriba));   // nada fuera de la zona
  ctx.clip();
  for (let i = manchas.length - 1; i >= 0; i--) {
    const m = manchas[i];
    const edad = ahora - m.inicio;
    if (edad > total) { manchas.splice(i, 1); continue; }
    const crecer = Math.min(1, edad / DURACION.crece);
    const escala = 0.35 + 0.65 * (1 - Math.pow(1 - crecer, 3));      // sale rápido y frena
    const alfa = edad < DURACION.crece + DURACION.quieta ? 0.9
               : 0.9 * (1 - (edad - DURACION.crece - DURACION.quieta) / DURACION.desvanece);
    ctx.save();
    ctx.globalAlpha = alfa;
    ctx.translate(m.x, m.y - scrollY);
    ctx.rotate(m.giro);
    ctx.drawImage(m.sprite, (-m.tam / 2) * escala, (-m.tam / 2) * escala, m.tam * escala, m.tam * escala);
    ctx.restore();
  }
  // Difuminado suave junto al parallax (arriba) y junto al footer (abajo)
  ctx.globalCompositeOperation = "destination-out";
  const gradArriba = ctx.createLinearGradient(0, z.arriba, 0, z.arriba + BORDE);
  gradArriba.addColorStop(0, "#000"); gradArriba.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = gradArriba;
  ctx.fillRect(0, z.arriba, innerWidth, BORDE);
  const gradAbajo = ctx.createLinearGradient(0, z.abajo - BORDE, 0, z.abajo);
  gradAbajo.addColorStop(0, "rgba(0,0,0,0)"); gradAbajo.addColorStop(1, "#000");
  ctx.fillStyle = gradAbajo;
  ctx.fillRect(0, z.abajo - BORDE, innerWidth, BORDE);
  ctx.restore();

  if (manchas.length) requestAnimationFrame(dibujarManchas);
  else { animando = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}

if (!menosMovimiento) {
  document.addEventListener("mousemove", (e) => agregarMancha(e.clientX, e.clientY));
  document.addEventListener("touchmove", (e) => agregarMancha(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
}

// 6e. Tarjetas: al entrar el mouse (o tocarla) parpadea con glitch y luego queda quieta
document.querySelectorAll(".card").forEach((card) => {
  const glitch = () => {
    if (menosMovimiento) return;
    card.classList.remove("glitch");
    void card.offsetWidth;           // reinicia la animación si se vuelve a entrar
    card.classList.add("glitch");
  };
  card.addEventListener("mouseenter", glitch);
  card.addEventListener("touchstart", glitch, { passive: true });
  card.addEventListener("animationend", (e) => { if (e.target === card) card.classList.remove("glitch"); });
});


/* ---------- 7. GLITCH ALEATORIO DE LA CINTA ---------- */
function lanzarGlitch() {
  if (menosMovimiento) return;
  document.body.classList.add("is-glitching");
  setTimeout(() => document.body.classList.remove("is-glitching"), 500);
}
function programarGlitch() {
  setTimeout(() => { lanzarGlitch(); programarGlitch(); }, 6000 + Math.random() * 6000);
}
programarGlitch();


/* ---------- 8. APARICIÓN AL HACER SCROLL ---------- */
const elementosRevelar = document.querySelectorAll(".seccion-encabezado, .card, .cintas-escenario, .footer-principal");
const observadorRevelar = new IntersectionObserver((entradas, obs) => {
  entradas.forEach((entrada) => {
    if (!entrada.isIntersecting) return;
    const el = entrada.target;
    el.classList.add("is-visible");
    obs.unobserve(el);
    // Al terminar de aparecer se quitan las clases para que funcionen los hover normales
    setTimeout(() => { el.classList.remove("revelar", "is-visible"); el.style.transitionDelay = ""; }, 1000);
  });
}, { threshold: 0.15 });
elementosRevelar.forEach((el, i) => {
  el.classList.add("revelar");
  if (el.classList.contains("card")) el.style.transitionDelay = `${(i % 3) * 0.12}s`;
  observadorRevelar.observe(el);
});
