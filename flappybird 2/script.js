// Henter HTML-elementene
let block = document.getElementById("block");
let hole = document.getElementById("hole");
let character = document.getElementById("character");

// Variabler
let jumping = 0;
let counter = 0;

// Henter verdien lagret i local storage for "highScore" og viser den i HTML-elementet når siden lastes. Hvis det ikke finnes noen lagret verdi for "highScore" vil verdien være 0
let highScore = document.getElementById("highScore");
highScore.innerHTML = "Høyeste poengsum: " + (localStorage.getItem("highScore") || 0); 


// Gjør at hullet blir tilfeldig plassert for hver gang
hole.addEventListener('animationiteration', () => {
    // Setter hullets topp-posisjon til en tilfeldig verdi mellom -150 og -450, så hullet blir ca i midten
    let random = -((Math.random()*300)+150);
    hole.style.top = random + "px";
    counter++; // Øker telleren for poengsum med 1


    // Oppdaterer poengsum-elementet med ny verdi av counter
    let score = document.getElementById("score");
    score.innerHTML = "Poengsum: " + counter;

    // Sjekker om poengsummen er høyere enn den eksisterende poengsummen lagret i local storage. Hvis det er det, vil det oppdatere den lagrede verdien i local storage.
    if (counter > parseInt(localStorage.getItem("highScore")) || !localStorage.getItem("highScore")) {
        localStorage.setItem("highScore", counter)

        // Henter verdien lagret i local storage for "highScore" og viser den i HTML-elementet
        let highScore = document.getElementById("highScore");
        highScore.innerHTML = "Høyeste poengsum: " + localStorage.getItem("highScore");
    }   
});

// Setter en eventlistener for keydown-eventet som gjør at vi kan trykke på "space" for å kunne hoppe
document.addEventListener("keydown", event => {
    if (event.code === "Space" && jumping == 0) {
        jump();
    }
});

// Setter en interval-funksjon som gjør at vi får "tyngdekraft" og sjekker for om vi kræsjer i blokkene
setInterval(function(){ 
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping==0){
        character.style.top = (characterTop+3)+"px"; // Pusher ned 3 piksler, ballen går nedover
    }
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    let cTop = -(500-characterTop);
    if((characterTop>480)||((blockLeft<20)&&(blockLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+130)))){
        alert("Du tapte. Trykk OK for å spille på nytt ");
        character.style.top = 100 + "px";
        counter=0; // Resetter telleren for poengsum
    }
},10); // Hvert 10.ende millisekund

// Definerer funksjonen jump()
function jump(){
    jumping = 1; // Setter jumping til 1. Alltid 0, med mindre jumping-funksjonen kjører
    let jumpCount = 0
    let jumpInterval = setInterval(function(){
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6)&&(jumpCount<15)){
            character.style.top = (characterTop-5)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);
   
}
 