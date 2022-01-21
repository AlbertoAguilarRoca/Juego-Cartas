var girada = false;
var intentos = 0;
var puntos = 0;

function juego(mazo) {
    
    var carta1;
    var carta2;

    document.querySelectorAll('.carta').forEach(item => {
        item.addEventListener("click", function() {   
            // Si una carta ha sido girada
            if (girada) {
                // Guarda en la variable el id
                carta2 = item.id;
                // Primero comprueba que el status de la carta no sea true
                if (!mazo[carta2-1].status) {
                    // Y si no es la misma carta girada
                    if (carta1 != item.id) {
                        // Le da la vuelta a la carta con dicho id
                        girarCarta(carta2);
                        // Se quedan ambas cartas 1 segundo descubiertas y se llama a comprobarCartas()
                        setTimeout(comprobarCartas, 1000, mazo, carta1, carta2);
                    }
                }
            }
    
            // Si no se ha girado la primera carta
            else {
                // Guarda en la variable el id
                carta1 = item.id;
                // Primero comprueba que el status de la carta no sea true
                if (!mazo[carta1-1].status) {
                    // Le da la vuelta a la carta con dicho id
                    girarCarta(carta1);
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
function comprobarCartas(mazo, carta1, carta2) {
    // Se comprueba si el id de las cartas dadas la vuelta sean iguales
    // En caso de que sean iguales (se ha acertado la pareja):
    if (mazo[carta1-1].id == mazo[carta2-1].id) {

        // Suma 1 punto y actualiza el marcador de puntos
        puntos++;
        document.getElementById("nPuntos").innerHTML = puntos;

        // En el array de objetos del mazo de cartas se establece que el
        // status sea true para que no puedan ser dada la vuelta
        mazo[carta1-1].status = true;
        mazo[carta2-1].status = true;

    }
    else {
        // Si no son iguales (no se ha acertado la pareja)
        // simplemente se les da la vuelta para seguir jugando
        girarCarta(carta1);
        girarCarta(carta2);
    }

    // Esta variable se pasa a false para continuar el juego
    girada = false;

    // Suma un intento aunque haya acertado o no una pareja y actualiza el marcador
    intentos++;
    document.getElementById("nIntentos").innerHTML = intentos;

    ComprobarFin(mazo);
}

// Funcion ComprobarFin() que hace lo siguiente
function ComprobarFin(mazo) {
    // Esta variable actua como contador de todos los true que tenga el array de objetos mazo[]
    var contadorAcertados = 0;
        // Se recorre el array mazo haciendo lo siguiente
        for (let i = 0; i < mazo.length; i++) {
            // Si el status de i es true suma 1 a la variable
            if (mazo[i].status) {
                contadorAcertados++;
            }
            // Si el numero de contadorAcertados es igual a la longitud del array
            // Es decir, todos deberian estar en true, se han encontrado todas
            // las parejas y termina el juego
            if (contadorAcertados == mazo.length) {
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

