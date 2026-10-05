/* =====================================================
   CARRINHO
===================================================== */

let usuario =
localStorage.getItem("usuarioLogado") || "visitante";


let carrinho =
JSON.parse(

    localStorage.getItem(
        "carrinho_" + usuario
    )

) || [];


let carrinhoAberto = false;


/* =========================
   SALVAR
========================= */

function salvarCarrinho(){

    localStorage.setItem(

        "carrinho_" +
        usuario,

        JSON.stringify(carrinho)

    );

}


/* =========================
   ADICIONAR
========================= */

function adicionarCarrinho(
    nome,
    preco,
    tamanho,
    imagem
){

    let item =
    carrinho.find(
        i => i.nome === nome
    );


    if(item){

        item.qtd++;

    }

    else{

        carrinho.push({

            nome:
            nome,

            preco:
            preco,

            tamanho:
            tamanho,

            imagem:
            imagem,

            qtd:
            1

        });

    }


    salvarCarrinho();

    atualizarCarrinho();

}


/* =========================
   ATUALIZAR
========================= */

function atualizarCarrinho(){

    let lista =
    document.getElementById(
        "listaCarrinho"
    );


    let contador =
    document.getElementById(
        "contadorCarrinho"
    );


    let totalSpan =
    document.getElementById(
        "totalCarrinho"
    );


    if(!lista) return;


    lista.innerHTML = "";


    let total = 0;


    carrinho.forEach(
        (item,index) => {

            let div =
            document.createElement(
                "div"
            );


            div.className =
            "itemCarrinho";


            div.innerHTML = `

                <img
                    src="${item.imagem}"
                    width="60"
                >

                <div>

                    <b>
                        ${item.nome}
                    </b>

                    <br>

                    ${item.tamanho}

                    <br>

                    Quantidade:
                    ${item.qtd}

                    <br>

                    R$
                    ${(item.preco * item.qtd)
                    .toFixed(2)}

                </div>

                <button
                    onclick="remover(${index})"
                >
                    ❌
                </button>

            `;


            lista.appendChild(
                div
            );


            total +=
            item.preco *
            item.qtd;

        }
    );


    if(contador){

        contador.innerText =
        carrinho.reduce(
            (s,item) =>
            s + item.qtd,
            0
        );

    }


    if(totalSpan){

        totalSpan.innerText =
        total.toFixed(2);

    }

}


/* =========================
   REMOVER
========================= */

function remover(index){

    carrinho.splice(
        index,
        1
    );


    salvarCarrinho();

    atualizarCarrinho();

}


/* =========================
   LIMPAR
========================= */

function limparCarrinho(){

    carrinho = [];

    salvarCarrinho();

    atualizarCarrinho();

}


/* =========================
   ABRIR / FECHAR
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        atualizarCarrinho();


        const abrir =
        document.getElementById(
            "abrirCarrinho"
        );


        const fechar =
        document.getElementById(
            "fecharCarrinho"
        );


        const box =
        document.getElementById(
            "carrinhoBox"
        );


        if(abrir){

            abrir.addEventListener(
                "click",
                function(){

                    if(
                        carrinhoAberto
                    ){

                        box.style.right =
                        "-320px";

                    }

                    else{

                        box.style.right =
                        "0";

                    }


                    carrinhoAberto =
                    !carrinhoAberto;

                }
            );

        }


        if(fechar){

            fechar.onclick =
            function(){

                box.style.right =
                "-320px";

                carrinhoAberto =
                false;

            };

        }

    }
);
