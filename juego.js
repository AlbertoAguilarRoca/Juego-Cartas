const contenedor = document.getElementById("contenedor");
const inicio = document.querySelector("#inicio");
const contenedores = document.querySelector("#contadores");
const gameover = document.querySelector("#gameover");
const popup = document.getElementById('popup');
const popupMulti = document.getElementById('popup_multijugador');
const puntosDOM = document.getElementById("nPuntos");
const intentosDOM = document.getElementById("nIntentos");
const tiempoDOM = document.getElementById("nTiempo");
const regresivoDOM = document.getElementById("nRegresivo");
let girada = false;
let intentos = 0;
let puntos = 0;
let cartasCreadas = false;
let partidasJugadas = 0;

function iniciarJuego() {
    intentos = 0;
    puntos = 0;

    //Se crean las cartas solo una vez en html
    if (!cartasCreadas) {
        recogeDatosJugador();
        settingsJuego();
        cartasCreadas = true;
    }
    const mazo = JSON.parse(sessionStorage.getItem("mazo"));

    let carta1;
    let carta2;

    document.querySelectorAll('.carta').forEach(item => {
        item.addEventListener("click", function () {
            // Si una carta ha sido girada
            if (girada) {
                // Guarda en la variable el id del div
                carta2 = item.id;
                // Primero comprueba que el status de la carta no sea true
                if (!mazo[carta2 - 1].status) {
                    // Y si no es la misma carta girada
                    if (carta1 != item.id) {
                        // Le da la vuelta a la carta con dicho id
                        // Esto es como hacer un mostrarCarta(carta2)
                        girarCarta(carta2);
                        // Se quedan ambas cartas 1 segundo descubiertas y se llama a cartasGiradas()
                        setTimeout(cartasGiradas, 500, mazo, carta1, carta2);
                    }
                }
            }

            // Si no se ha girado la primera carta
            else {
                // Guarda en la variable el id del div
                carta1 = item.id;
                // Primero comprueba que el status de la carta no sea true
                if (!mazo[carta1 - 1].status) {
                    // Le da la vuelta a la carta con dicho id
                    // Esto es como hacer un mostrarCarta(carta1)
                    girarCarta(carta1);
                    // girada en true para prosegir el juego
                    girada = true;
                }
            }
        });
    });
}//end finalizar juego

// Esta funcion funciona tanto como mostrarCarta() como ocultarCarta()
function girarCarta(id) {
    const elemento = document.getElementById(id);
    if (elemento.classList.contains('active')) {
        elemento.classList.remove('active');
    } else {
        elemento.classList.add('active');
    }
}

// Solo se comprueba si el id de las cartas dadas la vuelta sean iguales
function comprobarCartas(mazo, carta1, carta2) {
    if (mazo[carta1 - 1].id == mazo[carta2 - 1].id) {
        return true;
    }
    else {
        return false;
    }
}

//Sumará dos puntos al marcador
function sumarPuntos() {
    puntos += 2;
    puntosDOM.innerHTML = puntos;
}

// Funcion cartasGiradas() que hace lo siguiente
function cartasGiradas(mazo, carta1, carta2) {

    // En caso de que sean iguales (se ha acertado la pareja):
    if (comprobarCartas(mazo, carta1, carta2)) {

        sumarPuntos();

        // En el array de objetos del mazo de cartas se establece que el
        // status sea true para que no puedan ser dada la vuelta
        mazo[carta1 - 1].status = true;
        mazo[carta2 - 1].status = true;

        comprobarJuegoFinalizado(mazo);

    }
    else {
        // Si no son iguales (no se ha acertado la pareja)
        // simplemente se les da la vuelta para seguir jugando
        // Esto es el equivalente de hacer ocultarCarta(carta1) y ocultarCarta(carta2)
        girarCarta(carta1);
        girarCarta(carta2);
    }

    // Esta variable se pasa a false para continuar el juego
    girada = false;

    // Suma un intento aunque haya acertado o no una pareja y actualiza el marcador
    intentos++;
    intentosDOM.innerHTML = intentos;
}

// Funcion comprobarJuegoFinalizado() que hace lo siguiente
function comprobarJuegoFinalizado(mazo) {
    // Guardar en la variable el numero de cartas
    // Tambien se puede hacer con: 
    // var nCartas = document.querySelectorAll('.carta').length;
    var nCartas = mazo.length;
    // Contador de todos los true que haya
    var contadorAcertados = 0;
    // Bucle que recorre el array buscando los true
    for (let i = 0; i < nCartas; i++) {
        if (mazo[i].status) {
            contadorAcertados++;
        }

        // Cuando todas las cartas tienen true acaba el juego
        // mostrando un popup con informacion del tiempo gastado y el numero de intentos
        // Y un boton de reiniciar el juego
        if (contadorAcertados == nCartas) {
            
            var puntuacionTotal = calculaPuntosTotales(nCartas);
            const jugadores = JSON.parse(sessionStorage.getItem("jugadores"));

            //recogemos los datos del jugador
            jugadores[partidasJugadas].tiempo = tiempoDOM.innerText;
            jugadores[partidasJugadas].puntos = puntuacionTotal;
            jugadores[partidasJugadas].intentos = intentos;

            partidasJugadas++;

            juegoIniciado = false;
            let fraseFinal = `Has completado el juego en un tiempo de ${tiempoDOM.innerText}, 
            quedando ${regresivoDOM.innerHTML} y 
            utilizando ${intentos} intentos por lo que tu puntuacion total es de ${puntuacionTotal} puntos.`;

            if (partidasJugadas == jugadores.length) {
                //significa que ya han jugado todos los jugadores
                juegoTerminado();
                var mensajeFinal = document.getElementById('resultado-multijugador');
                const posicionesFinales = document.getElementById('posiciones');
                mensajeFinal.innerText = fraseFinal;
                posicionesFinales.innerHTML = listaGanadores(jugadores);
                sessionStorage.clear();
            } else {
                contenedor.style = "display: none";
                contenedores.style = "display: none";
                popup.style = "display: flex";

                var mensajeFinal = document.getElementById('resultado-juego');
                mensajeFinal.innerText = fraseFinal;

            }

            //Actualizo la sesion con los datos de la partida
            sessionStorage.setItem("jugadores", JSON.stringify(jugadores));

        }
    }

}

function juegoTerminado() {
    contenedor.style = "display: none";
    contenedores.style = "display: none";
    popupMulti.style = "display: flex";
}

//Imprime en un string los jugadores y sus puntos
function listaGanadores(array) {
    let mensaje = `<p><strong>Resultados finales:</strong></p><ul>`;
    array.forEach(item => {
        mensaje += `<li>${item.nombre}: ${item.puntos} puntos</li>`;
    });
    mensaje += `</ul>`;
    return mensaje;
}

//Pone los datos del jugador en ciertos campos html
function seteoDatosJugador(i) {
    const jugadores = JSON.parse(sessionStorage.getItem("jugadores"));

    document.querySelector("#nombreJugador").innerHTML = jugadores[i].nombre;
    document.querySelector("#mensaje_nombre").innerHTML = jugadores[i].nombre;
    document.querySelector("#nombre_gameover").innerHTML = jugadores[i].nombre;

}

//Calcula los puntos en base a los resultados del juego
function calculaPuntosTotales(nCartas) {
    var puntuacionTotal = 0;
    switch (nCartas) {
        case 6:
            puntuacionTotal = (nCartas + segundosRestantes) * 1;
            break;
        case 8:
            puntuacionTotal = (nCartas + segundosRestantes) * 2;
            break;
        case 10:
            puntuacionTotal = (nCartas + segundosRestantes) * 3;
            break;
        case 14:
            puntuacionTotal = (nCartas + segundosRestantes) * 4;
            break;
    }
    return puntuacionTotal;
}

//funcion que genera el mazo y las cartas con las que se va a jugar
function settingsJuego() {
    //Recogemos la dificultad
    const dificultad = establecerDificultad();
    //Genero la estructura de las cartas
    generarEstructuraCarta(dificultad.nCartas);
    //Genero un mazo en base al numero de cartas
    const mazo = duplicaCartas(generaCartas(dificultad.nCartas));
    console.log(mazo);
    //Guardo el mazo en la sesion para utilizarlo en multijuegador
    sessionStorage.setItem("mazo", JSON.stringify(mazo));
    //Recojo todas los divs donde van a estar alojadas las cartas
    const baraja = document.querySelectorAll('.back');
    //Asignamos a cada carta una imagen
    asignarImagen(baraja, mazo);
}


//recoge la cantidad de jugadores y los guarda en la sesion
function recogeDatosJugador() {
    const totalJugadores = document.querySelectorAll('.jugador');
    const infoJugadores = [];
    //const info = {};
    //en infojugadores se metera un objeto con la info de cada jugador
    totalJugadores.forEach((jugador) => {
        const info = {
            nombre: jugador.value,
            tiempo: 0,
            intentos: 0,
            puntos: 0
        }
        infoJugadores.push(info);
    });
    //Se guarda en la sesion la informacion de los jugadores que participan
    sessionStorage.setItem("jugadores", JSON.stringify(infoJugadores));
}

//funcion para establecer la dificultad del juego
function establecerDificultad() {
    const dificultadDOM = document.getElementById("dificultad").value;

    const dificultad = {
        segundosRestantes: 0,
        nCartas: 0,
        minutos: 0
    };

    switch (dificultadDOM) {
        case '1':
            // facil            
            dificultad.segundosRestantes = 120;
            dificultad.nCartas = 6;
            dificultad.minutos = 2;

            break;

        case '2':
            // intermedio
            dificultad.segundosRestantes = 120;
            dificultad.nCartas = 8;
            dificultad.minutos = 2;

            break;

        case '3':
            // dificil
            dificultad.segundosRestantes = 180;
            dificultad.nCartas = 10;
            dificultad.minutos = 3;

            break;

        case '4':
            // muy dif
            dificultad.segundosRestantes = 180;
            dificultad.nCartas = 14;
            dificultad.minutos = 3;

            break;

        default:
            alert("error");
            break;
    }
    //Subimos la dificultad al storage
    sessionStorage.setItem("dificultad", JSON.stringify(dificultad));

    return dificultad;
}

//Genera la estructura HTML para contener las cartas
function generarEstructuraCarta(nCartas) {
    let creadorDivsCartas = "";

    for (let i = 1; i <= nCartas; i++) {

        creadorDivsCartas += "<div id='" + i + "' class='carta'>";
        creadorDivsCartas += "<div class='front'>";
        creadorDivsCartas += "<div class='cover'>";
        creadorDivsCartas += "</div>";
        creadorDivsCartas += "</div>";
        creadorDivsCartas += "<div class='back'>";
        creadorDivsCartas += "</div>";
        creadorDivsCartas += "</div>";

    }

    contenedor.innerHTML = creadorDivsCartas;
}

//Comprueba que todos los jugadores hayan rellenado los nombres
function compruebaNombresRellenos() {
    const totalJugadores = document.querySelectorAll('.jugador');
    let nombresRellenos = true;
    totalJugadores.forEach((jugador) => {
        if (jugador.value == '') {
            nombresRellenos = false;
        }
    });
    return nombresRellenos;
}