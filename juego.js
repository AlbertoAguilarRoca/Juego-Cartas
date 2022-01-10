document.querySelectorAll('.carta').forEach(item => {
    item.addEventListener("click", function() {
        girarCarta(item.id);
    });
});

function girarCarta(id) {  
    if(document.getElementById(id).style.transform == "rotateY(180deg)") {
        document.getElementById(id).style.transform = "none";
    }else {
        document.getElementById(id).style.transform = "rotateY(180deg)";
    }
}