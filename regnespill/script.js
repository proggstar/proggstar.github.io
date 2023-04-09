// Henter elementer fra DOM
let oppgaveEl = document.querySelector('#oppgave')
let svarEl = document.querySelector('#svar')

let sjekkBtn = document.querySelector('#sjekk')
let nyBtn = document.querySelector('#ny')


let konklusjonEl = document.querySelector('#konklusjon')

let h2El = document.querySelector('header > h2')

let regneart = h2El.innerHTML

let fasit

nyOppgave()

function nyOppgave(){
    svarEl.value = ""
    svarEl.classList.remove("correct")
    svarEl.classList.remove("wrong")

    sjekkBtn.style.display = "inline-block"
    nyBtn.style.display = "none"

    // Lager et tilfeldig heltall mellom 0 og 9
    let a = Math.floor(Math.random() * 10);
    let b = Math.floor(Math.random() * 10);

    if(regneart == "Multiplikasjon"){
        let produkt = a*b
    fasit = produkt

     // Bruker template literal til å kombinere tekst og variabler
    oppgaveEl.innerHTML = `${a} x ${b} = ?`
    }else if (regneart == "Addisjon"){
        let produkt = a+b
    fasit = produkt

    oppgaveEl.innerHTML = `${a} + ${b} = ?`
    
    }else if (regneart == "Subtrakjson"){
        let produkt = a-b
    fasit = produkt

    oppgaveEl.innerHTML = `${a} - ${b} = ?`

    konklusjonEl.innerHTML = ""
    }
}


// Funksjon som sjekker om vi har rett svar
function sjekkSvar(){
    console.log("Sjekker svaret")

    // Henter verdien fra input elementet. Gjør om til tall
    let svar = Number(svarEl.value)

    // Sjekker om svaret er det samme som fasiten
    if (svar == fasit){
        konklusjonEl.innerHTML = "Du har rett! &#128077;"
        svarEl.classList.add("correct")
    } else {
        konklusjonEl.innerHTML = "Du har feil...&#128078;"
        svarEl.classList.add("wrong")
        
    }
    sjekkBtn.style.display = "none"
    nyBtn.style.display = "inline-block"
}

// Legger til en lytter til knappen
sjekkBtn.addEventListener('click', sjekkSvar)

nyBtn.addEventListener('click', nyOppgave)