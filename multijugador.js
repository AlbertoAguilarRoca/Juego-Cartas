
const selectTotalJugadores = document.getElementById('totalJugadores');
const nombreJugadores = document.getElementById('jugadores');


selectTotalJugadores.addEventListener('change', (event) => {
    nombreJugadores.innerHTML = '';
    generarInputs(event.target.value);
});

//Genera los inputs para meter los nombres de los jugadores
function generarInputs(total) {
    let imprimir = '';
    for(let i = 2; i <= total; i++) {
        imprimir += `
        <label for="nombreJug${i}">Nombre del jugador ${i}:</label>
        <input type="text" id="nombreJug${i}" class="jugador">
        `;
    }
    nombreJugadores.innerHTML = imprimir;
}



