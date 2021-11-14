function comecaJogo(){
    
    //selectors
    const telaInicial = document.querySelector(".intro");
    const partida = document.querySelector(".partida"); 
    const opcoes = document.querySelectorAll(".botao");
    const divLetrasEscondidas = document.querySelector(".escondida");
    const tentativasAmostra = document.querySelector(".tentativ");
    const gameOver = document.querySelector(".gameOver");
    const forca = document.querySelector(".img-forca");

    const temas = document.getElementById('tema');
    
    var letrasDescobertas=0;
    

    var palavras = [];

    for(let i=0; i<temas.length; i++){
        if(temas[temas.selectedIndex].innerHTML === 'Animais'){
            var palavras = ['CACHORRO', 'GATO', 'VACA', 'PAPAGAIO', 'MAMUTE', 'ELEFANTE', 'GALINHA', 'JAVALI', 'RINOCERONTE'];
            
        }
        else if(temas[temas.selectedIndex].innerHTML === 'Países'){
            var palavras = ['BRASIL', 'FRANCA', 'ARGENTINA', 'ALEMANHA', 'PORTUGAL', 'ESPANHA', 'MEXICO', 'INGLATERRA', 'RUSSIA', 'URUGUAI', 'PARAGUAI', 'VENEZUELA', 'UCRANIA', 'POLONIA', 'CHINA', 'JAPAO', 'AUSTRALIA', 'CANADA', 'ITALIA'];
        }
        else if(temas[temas.selectedIndex].innerHTML === 'Profissões'){
            var palavras = ['MEDICO', 'EMPREENDEDOR', 'PROFESSOR', 'ENGENHEIRO', 'ADVOGADO', 'PSICOLOGO', 'NUTRICIONISTA', 'AGRICULTOR'];
        }
        else if(temas[temas.selectedIndex].innerHTML === 'Frutas'){
            var palavras = ['MANGA', 'ABACAXI', 'MAMAO', 'MIRTILO', 'MORANGO', 'MELANCIA', 'MELAO', 'LARANJA'];   
        }
        else if(temas[temas.selectedIndex].innerHTML === 'Heróis'){
            var palavras = ['BATMAN', 'FLASH', 'SUPERHOMEM', 'AQUAMAN', 'WOLVERINE', 'HULK', 'VISAO', 'THOR', 'COISA', 'ROBIN', 'CIBORGUE'];   
        } 

        else
            location.reload();
        
}   

    const palavra = palavras[Math.floor(Math.random()*palavras.length)];
    console.log(palavra);

    //Gerar a quantidade de traços de acordo com o tamanho da palavra
    const divTracos = document.querySelector('.palavra'); //selecionando a div classe palavra

    let quantiTracos=1;

    while(quantiTracos<palavra.length + 1){
        var img = document.createElement("IMG");
        img.setAttribute("src", "assets forca/linha-removebg-preview.png");
        img.setAttribute("width", "304");
        img.setAttribute("height", "228");

        divTracos.appendChild(img);
        quantiTracos++;
    }    


    telaInicial.classList.add("desaparece");
    partida.classList.add("aparece");
    let tentativas = 6;
    let flag = 0; //flag === 0 => usuario errou, flag === 1 => acertou

    function gerarPalavraEscondida(){

        for(let i=0; i<palavra.length; i++){
            const novaLetra = document.createElement('span');
            novaLetra.classList.add("letra");
            novaLetra.innerHTML = palavra[i] + " " + " ";   
            divLetrasEscondidas.appendChild(novaLetra); 
        }
        
    }
    gerarPalavraEscondida();

    const selecionaLetras = document.querySelectorAll(".letra");

    opcoes.forEach(botao => {
            botao.addEventListener("click", function funcao(){
                selecionaLetras.forEach(letrinha => {
                    
                    console.log(letrinha);
                    console.log("letrinha = " + letrinha.innerHTML + " botao = " + botao.innerHTML);
                    
                    if(letrinha.innerHTML === botao.innerHTML + " " + " "){
                        console.log("IGUAAAAL");
                        letrinha.classList.add("mostraLetra");
                        flag = 1;
                        letrasDescobertas += 1;
                        
                    }
                    
                    botao.removeEventListener("click", funcao);
                    botao.classList.add("clicado");
                    
                });

            if(flag === 0){ //se o jogador errar a letra... 
                tentativas -= 1;
                tentativasAmostra.innerHTML = tentativas;
                console.log("Tentativas: " + tentativas);
            }

            if(tentativas === 5){
                forca.setAttribute("src", "assets forca/forca-1.jpg");
            }
            else if(tentativas === 4){
                forca.setAttribute("src", "assets forca/forca-2.jpg");
            }
            else if(tentativas === 3){
                forca.setAttribute("src", "assets forca/forca-3.jpg");
            }
            else if(tentativas === 2){
                forca.setAttribute("src", "assets forca/forca-4.jpg");
            }
            else if(tentativas === 1){
                forca.setAttribute("src", "assets forca/forca-5.jpg");
            }

            flag = 0;
            
            if(tentativas <= 0){
                forca.setAttribute("src", "assets forca/forca-6.jpg");
                console.log("fim de jogo");
                flag=1;
                partida.id = 'fim';
                gameOver.classList.add("aparece");
            }

            const palavraDescoberta = document.querySelectorAll(".mostraLetra");
            

            if(letrasDescobertas=== palavra.length){
                console.log("fim de jogo");
                flag=1;
                partida.id = 'fim'; 
                gameOver.innerHTML = "Você venceu!";
                gameOver.classList.add("aparece")
            }

            
            
            

        })
        
        
    })
   

    
}
