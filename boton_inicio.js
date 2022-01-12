//Localizamos el boton y al pusarlo aparece el contenedor
let boton = document.querySelector("#boton");

boton.addEventListener("click", function() {
    boton.style.display = "none";
    document.querySelector("#contenedor").style.display = "flex";
    document.getElementById("intentos").removeAttribute("style");
});