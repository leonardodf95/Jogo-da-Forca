const json = [ 
    ["abacaxi", "morango", "kiwi", "banana", "amora", "pitaya", "carambola", "jabuticaba", "jaca", "caja"],
    ["cachorro", "gato", "capivara", "jaguatirica", "suricato", "elefante", "chinchila", "dromedario", "pelicano", "marreco"],
    ["cuba","russia","china","piaui","roraima","acre","cumuruxatiba","alagoas","bahia","curitiba"],
    ["desembargador","artista","desenvolvedor","endocrinologista","quiroprata","cerimonialista","pedreiro","mecanico","malabarista","pizzaiolo"],
    ["candelabro","xilofone","ampulheta","guidom","garfo","navalha","nebulizador","xicara","smartphone","colher"]
]
/*const obj = fetch('./palavras.json')
                .then(resp => resp.json())
                .then((data) => console.log(data))*/
let acertos = 0;
let vidas = 7;
let letra;
let tema;
let letras_erradas = [];
let n;
let palavra;
let palavra_resultado;
let contador;
let verificaLetra = true;
let verificaNumeros = true;
let arraydenumeros = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let letraNovamente = false;
let letrasErrada = false;

function randomm () {
    return Math.floor(Math.random() * 10);
}
function sorteador_de_palavra (n) {
    let posicao = randomm();
    return json[n-1][posicao]
}

function temaStr (n) {
    if (n-1 == 0) {
        tema = "Frutas";
    } else if (n-1 == 1){
        tema = "Animais"
    } else if (n-1 == 2){
        tema = "Cidade, estado e país"
    } else if (n-1 == 3) {
        tema = "Profissões"
    } else if (n-1 == 4){
        tema = "Objetos"
    }
    return tema;
}



function checador_de_letra (letra, arraypalavra, palavra_resultado) {
    let acertou = false;
    for(let i=0; i <= arraypalavra.length; i++){
        if (letra == arraypalavra[i]){
            if (letra !== palavra_resultado[i]){
                acertos++;
            } else if (letra == palavra_resultado[i]) {
                letraNovamente = true;
            }
            palavra_resultado[i] = letra;
            acertou = true;
        }    
        
    }
    if (letraNovamente == true) {
        alert("Você já digitou essa letra!");
        letraNovamente = false;
    }
    console.log(acertou);
    somenteLetras(letra);
    if (verificaLetra == true){
        if (acertou == false) {
            for(i=0;i <= letras_erradas.length; i++){
                if (letra !== letras_erradas[i]){
                    letrasErrada = true;
                } else if (letra == letras_erradas[i]) {
                    letrasErrada = false;
                    letraNovamente = true;                     
                }
            }
            if (letrasErrada == true) {
                if(letraNovamente == false){
                    letras_erradas.push(letra);
                    alert("Você errou!");
                    vidas--;
                    letrasErrada = false;
                }
            } else if (letraNovamente == true) {
                alert("Você já digitou essa letra!");
                letraNovamente = false;
            }    
            if (vidas == 0) {
                alert("Você perdeu!");
            } else {
                alert("Vidas restantes: " + vidas);
            }
            alert("letras erradas: " + letras_erradas);
        }
        if (acertou == true) {
            alert(palavra_resultado);
        }
    } 
}
function zera_jogo() {
    if (vidas == 0 || acertos != 0) {
        vidas = 7;
        acertos = 0;
        letras_erradas = [];
    }
}
function somenteLetras (letra) {
    verificaLetra = true;
    verificaNumeros = true;
    for (i=0; i<= arraydenumeros.length; i++){
        if (letra === arraydenumeros[i]){
            verificaNumeros = false
        }
    }
    if (letra.length > 1){
        verificaLetra = false;
        return alert("Erro! Você digitou mais de uma letra!");        
    } else if (letra.length == 0) {
        verificaLetra = false;
        return alert("Erro! Você não digitou nada!");
    } else if (verificaNumeros == false) {
        verificaLetra = false;
        return alert("Erro! Você digitou um número!");
    }
}

function inicia_jogo() {
    zera_jogo();
   
    n = parseInt(prompt("Escolha um tema pelo seu número correspondente: "));
    tema = temaStr(n);
    console.log(tema);
    palavra = sorteador_de_palavra(n);
    console.log(palavra);
    arraypalavra = palavra.split("");
    palavra_resultado = arraypalavra.map (char => {return '_'});
    console.log(palavra_resultado);
    alert("O tema escolhido foi: " + tema);
    alert("Sua palavra possui " + arraypalavra.length + " letras.");
    contador = arraypalavra.length;
        while (vidas > 0) {
            if (acertos < contador) {
                letra = prompt("Insira a letra:");
                checador_de_letra(letra, arraypalavra, palavra_resultado);
                
            } else {
                vidas = 0;
            }
        };
    if(acertos == contador) {
        alert("Parabéns você ganhou!");
    }
}       

