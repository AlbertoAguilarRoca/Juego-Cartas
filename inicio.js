const botonInicio = document.getElementById("boton");

let horas = 0;
let minutos = 0;
let segundos = 0;

let segundosRestantes = 0;

let mins = 0;
let segs = 0;

let juegoIniciado = false;

boton.addEventListener("click", function () {
    const nombresRellenos = compruebaNombresRellenos();

    if (nombresRellenos) {

        iniciarJuego();

        inicio.style = "display: none";
        contenedor.style = "display: flex";
        contenedores.style = "display: initial";

        seteoDatosJugador(partidasJugadas);

        juegoIniciado = true;
        const dificultad = JSON.parse(sessionStorage.getItem("dificultad"));
        segundosRestantes = parseInt(dificultad.segundosRestantes);
        mins = parseInt(dificultad.minutos);

    } else {
        alert("Por favor, rellene los nombres de los jugadores.");
    }
});

//funcion que reinicia el juego
function reiniciarJuego() {
    //Seteamos a cero todo
    horas = 0;
    minutos = 0;
    segundos = 0;
    segs = 0;
    const dificultad = JSON.parse(sessionStorage.getItem("dificultad"));
    segundosRestantes = dificultad.segundosRestantes;
    mins = dificultad.minutos;

    contenedor.style = "display: flex";
    contenedores.style = "display: initial";
    popup.style = "display: none";

    document.querySelectorAll('.carta').forEach(item => {
       item.classList.remove('active');
    });
    intentosDOM.innerText = '0';
    puntosDOM.innerText = '0';
    tiempoDOM.innerText = '0';
    regresivoDOM.innerText = '0';

    iniciarJuego();
    seteoDatosJugador(partidasJugadas);

    juegoIniciado = true;
}

setInterval(iniciarTemporizador, 1000);
setInterval(incrementar, 1000);

function incrementar() {

    var tempHoras = '';
    var tempMinutos = '';
    var tempSegundos = '';

    if(juegoIniciado) {

        segundosRestantes--;

        if(segundos < 59) {
            segundos++;
        } else {
            minutos++;
            segundos = 0;
        }
    
        if(minutos == 60) {
            horas++;
            minutos = 0;
        }

        if(horas < 10) { 
            tempHoras = '0' + horas; 
        } else {
            tempHoras = horas
        }

        if(minutos < 10) { 
            tempMinutos = '0' + minutos; 
        } else {
            tempMinutos = minutos;
        }

        if(segundos < 10) { 
            tempSegundos = '0' + segundos; 
        } else {
            tempSegundos = segundos;
        }
    
        tiempoDOM.innerText = tempHoras + ':'+tempMinutos+':'+tempSegundos;
    }

}

function iniciarTemporizador() {

    if(juegoIniciado) {

        segs--;

        if (segs < 00) {
            segs = 59;
            mins--;
        }

        if (segs <= 9) {
            regresivoDOM.innerText = '0'+mins+':0'+segs;
        }
        else {
            regresivoDOM.innerText = '0'+mins+':'+segs;
        }

        if (mins == 0 && segs == 0) {
            //Gameover por falta de tiempo
            contenedor.style= "display: none";
            contenedores.style= "display: none";
            gameover.style = "display: flex";
        }

    }

}