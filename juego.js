var girada = false;
var intentos = 0;
var puntos = 0;

function juego() {
    
    var carta1_div;
    var carta2_div;

    document.querySelectorAll('.carta').forEach(item => {
        item.addEventListener("click", function() {   
            // Si una carta ha sido girada
            if (girada) {
                // Guarda en la variable el id del div
                carta2_div = item.id;
                // Primero comprueba que el status de la carta no sea true
                if (document.getElementById(item.id).childNodes[3].lastChild.getAttribute("data-status") == "false") {
                    // Y si no es la misma carta girada
                    if (carta1_div != carta2_div) {
                        // Le da la vuelta a la carta con dicho id
                        girarCarta(carta2_div);
                        // Se quedan ambas cartas 1 segundo descubiertas y se llama a comprobarCartas()
                        setTimeout(comprobarCartas, 1000, carta1_div, carta2_div);
                    }
                }
            }
    
            // Si no se ha girado la primera carta
            else {
                // Guarda en la variable el id del div
                carta1_div = item.id;
                // Primero comprueba que el status de la carta no sea true // No coge el data-status como booleana, sino como string
                if (document.getElementById(item.id).childNodes[3].lastChild.getAttribute("data-status") == "false") {
                    // Le da la vuelta a la carta con dicho id
                    girarCarta(carta1_div);
                    // girada en true para prosegir el juego
                    girada = true;
                }
            }
        });
    });
}

function girarCarta(id) {  
    if(document.getElementById(id).style.transform == "rotateY(180deg)") {
        document.getElementById(id).style.transform = "none";
    }else {
        document.getElementById(id).style.transform = "rotateY(180deg)";
    }
}

// Funcion comprobarCartas() que hace lo siguiente
function comprobarCartas(carta1_div, carta2_div) {
    var carta1_id = document.getElementById(carta1_div).childNodes[3].lastChild.getAttribute("data-id");
    var carta2_id = document.getElementById(carta2_div).childNodes[3].lastChild.getAttribute("data-id");
    // Se comprueba si el id de las cartas dadas la vuelta sean iguales
    // En caso de que sean iguales (se ha acertado la pareja):
    if (carta1_id == carta2_id) {

        // Suma 1 punto y actualiza el marcador de puntos
        puntos++;
        document.getElementById("nPuntos").innerHTML = puntos;

        // En el array de objetos del mazo de cartas se establece que el
        // status sea true para que no puedan ser dada la vuelta
        document.getElementById(carta1_div).childNodes[3].lastChild.setAttribute("data-status", "true");
        document.getElementById(carta2_div).childNodes[3].lastChild.setAttribute("data-status", "true");

    }
    else {
        // Si no son iguales (no se ha acertado la pareja)
        // simplemente se les da la vuelta para seguir jugando
        girarCarta(carta1_div);
        girarCarta(carta2_div);
    }

    // Esta variable se pasa a false para continuar el juego
    girada = false;

    // Suma un intento aunque haya acertado o no una pareja y actualiza el marcador
    intentos++;
    document.getElementById("nIntentos").innerHTML = intentos;

    ComprobarFin();
}

// Funcion ComprobarFin que hace lo siguiente
function ComprobarFin() {
    // Guardar en la variable el numero de cartas
    var nCartas = document.querySelectorAll('.carta').length;
    // Contador de todos los true que haya
    var contadorAcertados = 0;
        // Bucle que recorre las cartas buscando los true
        for (let i = 1; i <= nCartas; i++) {
            if (document.getElementById(i).childNodes[3].lastChild.getAttribute("data-status") == "true") {
                contadorAcertados++;
            }

            // Cuando todas las cartas tienen true acaba el juego
            // mostrando un popup con informacion del tiempo gastado y el numero de intentos
            // Y un boton de reiniciar el juego
            if (contadorAcertados == nCartas) {
                document.getElementById("contenedor").style.display = "none";
                document.getElementById("popup").style.display = "flex";

                var mensajeFinal = document.getElementById('resultado-juego');
                var tiempoTotal = document.getElementById("nTiempo");
                
                mensajeFinal.innerText = `Enhorabuena. Has necesitado ${intentos} intentos y 
                ${tiempoTotal.innerText} de tiempo.`;

                juegoIniciado = false;
                tiempoTotal.innerText = '00:00:00';
            }
        }
        
}

