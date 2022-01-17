//Localizamos el boton y al pusarlo aparece el contenedor
let boton = document.querySelector("#boton");

var horas = 0;
var minutos = 0;
var segundos = 0;

const temporizador = document.getElementById('tiempo');
var juegoIniciado = false;

boton.addEventListener("click", function() {
    iniciarPartida();
    boton.style.display = "none";
    document.querySelector("#contenedor").style.display = "flex";
    document.getElementById("intentos").removeAttribute("style");
    document.getElementById("puntos").removeAttribute("style");
    temporizador.removeAttribute("style");

    juegoIniciado = true;
});


setInterval(incrementar, 1000);


function incrementar() {

    var tempHoras = '';
    var tempMinutos = '';
    var tempSegundos = '';

    if(juegoIniciado) {

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
    
        document.getElementById("nTiempo").innerText = tempHoras + ':'+tempMinutos+':'+tempSegundos;
    }

}