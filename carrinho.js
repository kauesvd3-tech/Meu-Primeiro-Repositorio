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


/* =====================================================
   CONFIGURAÇÕES DO CARRINHO
===================================================== */

// Taxa de serviço: 5%
const TAXA_SERVICO = 0.05;

// Frete normal
const VALOR_FRETE = 20;

// Valor mínimo para frete grátis
const FRETE_GRATIS_ACIMA_DE = 200;


/* =====================================================
   SALVAR CARRINHO
===================================================== */

function salvarCarrinho(){

    localStorage.setItem(

        "carrinho_" +
        usuario,

        JSON.stringify(carrinho)

    );

}


/* =====================================================
   ADICIONAR PRODUTO
===================================================== */

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


/* =====================================================
   ATUALIZAR CARRINHO
===================================================== */

function atualizarCarrinho(){

    let lista =
    document.getElementById(
        "listaCarrinho"
    );


    let contador =
    document.getElementById(
        "contadorCarrinho"
    );


    let subtotalSpan =
    document.getElementById(
        "subtotalCarrinho"
    );


    let taxaSpan =
    document.getElementById(
        "taxaCarrinho"
    );


    let freteSpan =
    document.getElementById(
        "freteCarrinho"
    );


    let totalSpan =
    document.getElementById(
        "totalCarrinho"
    );


    let mensagemFrete =
    document.getElementById(
        "mensagemFrete"
    );


    if(!lista) return;


    lista.innerHTML = "";


    /* =================================================
       SUBTOTAL
    ================================================= */

    let subtotal = 0;


    /* =================================================
       MOSTRAR PRODUTOS
    ================================================= */

    carrinho.forEach(
        (item,index) => {

            let div =
            document.createElement(
                "div"
            );


            div.className =
            "itemCarrinho";


            const valorItem =
                item.preco *
                item.qtd;


            div.innerHTML = `

                <img
                    src="${item.imagem}"
                    width="60"
                    alt="${item.nome}"
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
                    ${formatarMoeda(valorItem)}

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


            subtotal +=
                valorItem;

        }
    );


    /* =================================================
       CONTADOR
    ================================================= */

    if(contador){

        contador.innerText =
        carrinho.reduce(

            (s,item) =>
            s + item.qtd,

            0

        );

    }


    /* =================================================
       TAXA DE SERVIÇO
    ================================================= */

    const taxa =
        subtotal *
        TAXA_SERVICO;


    /* =================================================
       FRETE
    ================================================= */

    let frete = 0;


    if(subtotal === 0){

        frete = 0;

    }

    else if(
        subtotal >=
        FRETE_GRATIS_ACIMA_DE
    ){

        frete = 0;

    }

    else{

        frete =
        VALOR_FRETE;

    }


    /* =================================================
       TOTAL FINAL
    ================================================= */

    const total =
        subtotal +
        taxa +
        frete;


    /* =================================================
       MOSTRAR SUBTOTAL
    ================================================= */

    if(subtotalSpan){

        subtotalSpan.innerText =
        formatarMoeda(subtotal);

    }


    /* =================================================
       MOSTRAR TAXA
    ================================================= */

    if(taxaSpan){

        taxaSpan.innerText =
        formatarMoeda(taxa);

    }


    /* =================================================
       MOSTRAR FRETE
    ================================================= */

    if(freteSpan){

        if(
            subtotal >=
            FRETE_GRATIS_ACIMA_DE
        ){

            freteSpan.innerText =
            "GRÁTIS 🎉";

        }

        else if(subtotal > 0){

            freteSpan.innerText =
            "R$ " +
            formatarMoeda(frete);

        }

        else{

            freteSpan.innerText =
            "R$ 0,00";

        }

    }


    /* =================================================
       MENSAGEM DO FRETE
    ================================================= */

    if(mensagemFrete){

        if(
            subtotal >=
            FRETE_GRATIS_ACIMA_DE
        ){

            mensagemFrete.innerText =
            "🎉 Você ganhou frete grátis!";

        }

        else if(subtotal > 0){

            const falta =
                FRETE_GRATIS_ACIMA_DE -
                subtotal;


            mensagemFrete.innerText =
                "🚚 Compre mais R$ " +
                formatarMoeda(falta) +
                " e ganhe frete grátis!";

        }

        else{

            mensagemFrete.innerText =
            "";

        }

    }


    /* =================================================
       MOSTRAR TOTAL
    ================================================= */

    if(totalSpan){

        totalSpan.innerText =
        formatarMoeda(total);

    }

}


/* =====================================================
   FORMATAR MOEDA
===================================================== */

function formatarMoeda(valor){

    return Number(valor)
        .toFixed(2)
        .replace(".", ",");

}


/* =====================================================
   REMOVER PRODUTO
===================================================== */

function remover(index){

    carrinho.splice(
        index,
        1
    );


    salvarCarrinho();

    atualizarCarrinho();

}


/* =====================================================
   LIMPAR CARRINHO
===================================================== */

function limparCarrinho(){

    carrinho = [];

    salvarCarrinho();

    atualizarCarrinho();

}


/* =====================================================
   CALCULAR VALORES DO CARRINHO
   Esta função pode ser usada pelo checkout
===================================================== */

function calcularValoresCarrinho(){

    let subtotal = 0;


    carrinho.forEach(item => {

        subtotal +=
            item.preco *
            item.qtd;

    });


    const taxa =
        subtotal *
        TAXA_SERVICO;


    const frete =
        subtotal >=
        FRETE_GRATIS_ACIMA_DE
        ? 0
        : subtotal > 0
        ? VALOR_FRETE
        : 0;


    const total =
        subtotal +
        taxa +
        frete;


    return {

        subtotal:
        subtotal,

        taxa:
        taxa,

        frete:
        frete,

        total:
        total

    };

}


/* =====================================================
   ABRIR / FECHAR CARRINHO
===================================================== */

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


        /* =============================================
           ABRIR CARRINHO
        ============================================= */

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


        /* =============================================
           FECHAR CARRINHO
        ============================================= */

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
