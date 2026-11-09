
document.documentElement.classList.add("js");

// Menú responsive
(function () {
  const btn = document.querySelector(".menu-btn");
  const menu = document.getElementById("menu");
  if (!btn || !menu) return;
  btn.addEventListener("click", function () {
    const abierto = menu.classList.toggle("abierto");
    btn.setAttribute("aria-expanded", String(abierto));
    btn.textContent = abierto ? "Cerrar" : "Menú";
  });
})();

(function () {
  const caja = document.querySelector("[data-quiz]");
  if (!caja) return;

  const preguntas = [
    {
      q: "¿Qué etapa decide si el juego es viable?",
      o: ["Lanzamiento", "Preproducción", "Posproducción"],
      c: 1,
      e: "En la preproducción un equipo pequeño prueba la idea con prototipos y comprueba si el proyecto se puede hacer."
    },
    {
      q: "¿Qué es la First Playable?",
      o: ["La primera versión jugable de la producción", "Un parche posterior al lanzamiento", "Una prueba hecha con papel y lápiz"],
      c: 0,
      e: "Es la primera versión que muestra cómo será la experiencia inicial del jugador."
    },
    {
      q: "¿Quién realiza las pruebas beta?",
      o: ["Solo los programadores", "Un equipo externo de jugadores", "Los artistas conceptuales"],
      c: 1,
      e: "Las pruebas beta las hace un grupo externo para encontrar errores antes del lanzamiento."
    },
    {
      q: "¿Para qué sirven los parches de posproducción?",
      o: ["Para corregir errores y mejorar el juego", "Para planificar el presupuesto", "Para crear el arte conceptual"],
      c: 0,
      e: "Con la opinión de los jugadores se corrigen fallos y se publican mejoras."
    }
  ];

  let i = 0, aciertos = 0;

  function mostrar() {
    const p = preguntas[i];
    caja.innerHTML =
      '<div class="quiz-bar" role="progressbar" aria-valuemin="0" aria-valuemax="' + preguntas.length +
      '" aria-valuenow="' + i + '"><span style="width:' + (i / preguntas.length) * 100 + '%"></span></div>' +
      '<p class="quiz-q">Pregunta ' + (i + 1) + " de " + preguntas.length + ": " + p.q + "</p>" +
      '<div class="quiz-opts"></div><p class="quiz-fb" aria-live="polite"></p>';
    const opts = caja.querySelector(".quiz-opts");
    p.o.forEach(function (texto, n) {
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = texto;
      b.addEventListener("click", function () { responder(n, opts); });
      opts.appendChild(b);
    });
  }

  function responder(n, opts) {
    const p = preguntas[i];
    const botones = opts.querySelectorAll("button");
    botones.forEach(function (b, k) {
      b.disabled = true;
      if (k === p.c) b.classList.add("ok");
    });
    const fb = caja.querySelector(".quiz-fb");
    if (n === p.c) {
      aciertos++;
      fb.textContent = "¡Correcto! " + p.e;
    } else {
      botones[n].classList.add("mal");
      fb.textContent = "No es esa. " + p.e;
    }
    const sig = document.createElement("button");
    sig.type = "button";
    sig.className = "button";
    sig.textContent = i < preguntas.length - 1 ? "Siguiente pregunta" : "Ver resultado";
    sig.addEventListener("click", function () { i++; i < preguntas.length ? mostrar() : final(); });
    caja.appendChild(sig);
    sig.focus();
  }

  function final() {
    caja.innerHTML =
      '<p class="quiz-q" aria-live="polite">Obtuviste ' + aciertos + " de " + preguntas.length + " aciertos.</p>" +
      "<p>" + (aciertos === preguntas.length ? "Nivel completado sin perder vidas." : "Repasa las etapas y vuelve a intentarlo.") + "</p>";
    const r = document.createElement("button");
    r.type = "button";
    r.className = "button";
    r.textContent = "Jugar de nuevo";
    r.addEventListener("click", function () { i = 0; aciertos = 0; mostrar(); });
    caja.appendChild(r);
  }

  mostrar();
})();
