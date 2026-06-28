// ======================================
// ANIMACIONES AL HACER SCROLL
// ======================================

const reveals = document.querySelectorAll(".reveal");

function mostrarElementos() {

    reveals.forEach(elemento => {

        const alturaVentana = window.innerHeight;
        const posicion = elemento.getBoundingClientRect().top;

        if (posicion < alturaVentana - 100) {

            elemento.classList.add("active");

        }

    });

}

window.addEventListener("scroll", mostrarElementos);
mostrarElementos();

// ======================================
// BOTÓN VOLVER ARRIBA
// ======================================

const btnArriba = document.getElementById("btnArriba");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        btnArriba.style.display = "block";

    } else {

        btnArriba.style.display = "none";

    }

});

btnArriba.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// ======================================
// CONTADORES ANIMADOS
// ======================================

let contadoresActivados = false;

function activarContadores() {

    const seccion = document.querySelector(".contadores");

    if (!seccion) return;

    const posicion = seccion.getBoundingClientRect().top;

    if (posicion < window.innerHeight && !contadoresActivados) {

        contadoresActivados = true;

        const contadores = document.querySelectorAll(".contador");

        contadores.forEach(contador => {

            const objetivo = Number(
                contador.getAttribute("data-target")
            );

            let actual = 0;

            const incremento = objetivo / 100;

            const intervalo = setInterval(() => {

                actual += incremento;

                if (actual >= objetivo) {

                    contador.innerText = objetivo;
                    clearInterval(intervalo);

                } else {

                    contador.innerText =
                        Math.floor(actual);

                }

            }, 20);

        });

    }

}

window.addEventListener(
    "scroll",
    activarContadores
);

activarContadores();

// ======================================
// SIMULADOR ECONÓMICO
// ======================================

const slider =
document.getElementById(
    "sliderProduccion"
);

const valorProduccion =
document.getElementById(
    "valorProduccion"
);

const costoTexto =
document.getElementById(
    "costo"
);

const ingresoTexto =
document.getElementById(
    "ingreso"
);

const gananciaTexto =
document.getElementById(
    "ganancia"
);

let grafica;

function actualizarSimulacion() {

    let x = Number(slider.value);

    valorProduccion.innerHTML =
        "Producción: " + x + " unidades";

    let costo =
        (x * x) + 100;

    let ingreso =
        40 * x;

    let ganancia =
        ingreso - costo;

    costoTexto.innerHTML =
        "$ " + costo.toFixed(2);

    ingresoTexto.innerHTML =
        "$ " + ingreso.toFixed(2);

    gananciaTexto.innerHTML =
        "$ " + ganancia.toFixed(2);

    actualizarPuntoGrafica(x, ganancia);

}

slider.addEventListener(
    "input",
    actualizarSimulacion
);

// ======================================
// DATOS DE LA GRÁFICA
// ======================================

const produccion = [];
const ganancias = [];

for (let x = 0; x <= 40; x++) {

    produccion.push(x);

    ganancias.push(
        (-x * x) + (40 * x) - 100
    );

}

// ======================================
// CREAR GRÁFICA
// ======================================

const ctx =
document.getElementById(
    "graficaGanancia"
);

grafica = new Chart(ctx, {

    type: "line",

    data: {

        labels: produccion,

        datasets: [

            {
                label: "Ganancia",

                data: ganancias,

                borderWidth: 4,

                tension: 0.3
            },

            {
                label: "Producción Actual",

                data: [],

                pointRadius: 8,

                showLine: false
            }

        ]

    },

   options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        title: {
            display: true,
            text: "Optimización de Ganancias"
        }
    },

    scales: {
        x: {
            ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: 90
            }
        },
        y: {
            beginAtZero: false
        }
    }
}
});
function actualizarPuntoGrafica(x, y) {
    grafica.data.datasets[1].data =
        produccion.map(valor => {
            if (valor === x) {
                return y;
            }
            return null;
        });
    grafica.update();
}
function respuestaCorrecta() {

    document.getElementById(
        "resultadoJuego"
    ).innerHTML =

    "✅ Correcto. Todavía no se alcanza la producción óptima.";

}

function respuestaIncorrecta() {

    document.getElementById(
        "resultadoJuego"
    ).innerHTML =

    "❌ Incorrecto. La producción óptima se encuentra cerca de 20 unidades.";

}

// ======================================
// CURIOSIDADES AUTOMÁTICAS
// ======================================

const curiosidades = [

    "Las derivadas ayudan a encontrar máximos y mínimos.",

    "Las empresas utilizan optimización para aumentar ganancias.",

    "Los bancos usan modelos matemáticos para analizar inversiones.",

    "La producción óptima reduce desperdicios.",

    "Las derivadas son fundamentales en economía e ingeniería.",

    "Muchas aplicaciones tecnológicas utilizan cálculo diferencial."

];

let indiceCuriosidad = 0;

function cambiarCuriosidad() {

    const elemento =
    document.getElementById(
        "curiosidad"
    );

    if (!elemento) return;

    elemento.innerHTML =
        curiosidades[indiceCuriosidad];

    indiceCuriosidad++;

    if (
        indiceCuriosidad >=
        curiosidades.length
    ) {

        indiceCuriosidad = 0;

    }

}

cambiarCuriosidad();

setInterval(
    cambiarCuriosidad,
    4000
);

// ======================================
// MENSAJE DE INICIO
// ======================================

window.addEventListener(
    "load",
    () => {

        actualizarSimulacion();

        console.log(
            "Proyecto cargado correctamente."
        );

    }
);
function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
}
let lastScroll = 0;
let header = document.querySelector("header");
window.addEventListener("scroll", function () {
    let currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll) {
        header.style.top = "-80px";
    } else {
        header.style.top = "0";
    }
    lastScroll = currentScroll;
});
