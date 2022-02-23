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
let novamente;

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
            }
            palavra_resultado[i] = letra;
            acertou = true;
        }    
        
    }
    console.log(acertou);
    if (acertou == false) {
        letras_erradas.push(letra);
        alert("Você errou!");
        vidas--;
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


do {
    vidas = 7;
    let n = parseInt(prompt("Escolha um tema pelo seu número correspondente: "));
    tema = temaStr(n);
    console.log(tema);
    let palavra = sorteador_de_palavra(n);
    console.log(palavra);
    arraypalavra = palavra.split("");
    let palavra_resultado = arraypalavra.map (char => {return '_'});
    console.log(palavra_resultado);
    alert("O tema escolhido foi: " + tema);
    alert("Sua palavra possui " + arraypalavra.length + " letras.");
    let contador = arraypalavra.length;
        while (vidas > 0) {
            if (acertos < contador) {
            letra = prompt("Insira a letra:");
            checador_de_letra(letra, arraypalavra, palavra_resultado);
            } else {
                vidas = 0;
            }
        };
       
    novamente = prompt("Deseja jogar novamente? (s/n)").toUpperCase;
} while (novamente === "S");