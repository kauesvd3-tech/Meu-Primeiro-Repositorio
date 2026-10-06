/* =====================================================
   CARRINHO - VERSÃO CORRIGIDA
===================================================== */


/* =========================
   USUÁRIO
========================= */

let usuario =
    localStorage.getItem("usuarioLogado") || "visitante";


/* =========================
   CARREGAR CARRINHO
========================= */

let carrinho =
    JSON.parse(
        localStorage.getItem(
            "carrinho_" + usuario
        )
    ) || [];


let carrinhoAberto = false;


/* =========================
   SALVAR CARRINHO
========================= */

function salvarCarrinho() {

    localStorage.setItem(
        "carrinho_" + usuario,
        JSON.stringify(carrinho)
    );

}


/* =========================
   ADICIONAR AO CARRINHO
========================= */

function adicionarCarrinho(
    nome,
    preco,
    tamanho,
    imagem
) {

    /*
       Procura pelo mesmo produto
    */

    let item = carrinho.find(
        i => i.nome === nome
    );


    /*
       Se já existe,
       aumenta a quantidade
    */

    if (item) {

        item.qtd++;

    }


    /*
       Se não existe,
       cria um novo
    */

    else {

        carrinho.push({

            nome: nome,

            preco: Number(preco),

            tamanho: tamanho,

            imagem: imagem,

            qtd: 1

        });

    }


    salvarCarrinho();

    atualizarCarrinho();


    /*
       Abre o carrinho automaticamente
    */

    const box =
        document.getElementById(
            "carrinhoBox"
        );

    if (box) {

        box.style.right = "0";

        carrinhoAberto = true;

    }

}


/* =========================
   ATUALIZAR CARRINHO
========================= */

function atualizarCarrinho() {

    const lista =
        document.getElementById(
            "listaCarrinho"
        );


    const contador =
        document.getElementById(
            "contadorCarrinho"
        );


    /*
       IMPORTANTE:

       O seu HTML possui dois elementos
       com id="totalCarrinho".

       Por isso usamos querySelectorAll
       e atualizamos os dois.
    */

    const totais =
        document.querySelectorAll(
            "#totalCarrinho"
        );


    if (!lista) return;


    lista.innerHTML = "";


    let total = 0;


    /*
       Carrinho vazio
    */

    if (carrinho.length === 0) {

        lista.innerHTML = `
            <p style="
                text-align:center;
                color:#777;
                padding:20px;
            ">
                🛒 Seu carrinho está vazio.
            </p>
        `;

    }


    /*
       Mostra os produtos
    */

    carrinho.forEach(
        (item, index) => {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "itemCarrinho";


            const subtotal =
                Number(item.preco) *
                Number(item.qtd);


            div.innerHTML = `

                <img
                    src="${item.imagem}"
                    width="60"
                    alt="${item.nome}"
                >

                <div style="flex:1;">

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
                    ${subtotal.toFixed(2).replace(".", ",")}

                </div>

                <button
                    onclick="remover(${index})"
                    style="
                        border:none;
                        background:none;
                        cursor:pointer;
                        font-size:20px;
                    "
                    title="Remover"
                >
                    ❌
                </button>

            `;


            lista.appendChild(div);


            total += subtotal;

        }
    );


    /*
       Atualiza contador
    */

    if (contador) {

        contador.innerText =
            carrinho.reduce(
                (soma, item) =>
                    soma + Number(item.qtd),
                0
            );

    }


    /*
       Atualiza todos os elementos
       que possuem id totalCarrinho
    */

    totais.forEach(
        elemento => {

            elemento.innerText =
                total
                    .toFixed(2)
                    .replace(".", ",");

        }
    );


    /*
       Atualiza também os valores
       do checkout, caso a modal
       esteja aberta
    */

    atualizarResumoCheckout();

}


/* =========================
   REMOVER PRODUTO
========================= */

function remover(index) {

    if (
        index < 0 ||
        index >= carrinho.length
    ) {
        return;
    }


    carrinho.splice(
        index,
        1
    );


    salvarCarrinho();

    atualizarCarrinho();

}


/* =========================
   LIMPAR CARRINHO
========================= */

function limparCarrinho() {

    carrinho = [];


    salvarCarrinho();

    atualizarCarrinho();

}


/* =========================
   CALCULAR TOTAL
========================= */

function calcularTotalCarrinho() {

    return carrinho.reduce(
        (total, item) => {

            return total +
                (
                    Number(item.preco) *
                    Number(item.qtd)
                );

        },
        0
    );

}


/* =========================
   ATUALIZAR CHECKOUT
========================= */

function atualizarResumoCheckout() {

    const subtotal =
        calcularTotalCarrinho();


    /*
       Taxa de serviço

       Aqui deixei 0 para não cobrar
       uma taxa escondida.
    */

    const taxa = 0;


    /*
       Frete grátis acima de R$ 200.

       Abaixo disso:
       R$ 15,00
    */

    let frete = 0;


    if (subtotal > 0 && subtotal < 200) {

        frete = 15;

    }


    /*
       Total final
    */

    const totalFinal =
        subtotal +
        taxa +
        frete;


    /*
       SUBTOTAL
    */

    const elementoSubtotal =
        document.getElementById(
            "subtotalCarrinho"
        );

    if (elementoSubtotal) {

        elementoSubtotal.innerText =
            subtotal
                .toFixed(2)
                .replace(".", ",");

    }


    /*
       TAXA
    */

    const elementoTaxa =
        document.getElementById(
            "taxaCarrinho"
        );

    if (elementoTaxa) {

        elementoTaxa.innerText =
            taxa
                .toFixed(2)
                .replace(".", ",");

    }


    /*
       FRETE
    */

    const elementoFrete =
        document.getElementById(
            "freteCarrinho"
        );

    if (elementoFrete) {

        elementoFrete.innerText =
            frete === 0
                ? "GRÁTIS"
                : "R$ " +
                  frete
                    .toFixed(2)
                    .replace(".", ",");

    }


    /*
       TOTAL FINAL

       O seu HTML possui outro
       elemento com id totalCarrinho.

       Atualizamos todos.
    */

    const elementosTotal =
        document.querySelectorAll(
            "#totalCarrinho"
        );


    elementosTotal.forEach(
        elemento => {

            elemento.innerText =
                totalFinal
                    .toFixed(2)
                    .replace(".", ",");

        }
    );


    /*
       Mensagem do frete
    */

    const mensagemFrete =
        document.getElementById(
            "mensagemFrete"
        );


    if (mensagemFrete) {

        if (subtotal === 0) {

            mensagemFrete.innerText =
                "";

        }

        else if (subtotal >= 200) {

            mensagemFrete.innerText =
                "🎉 Você ganhou frete grátis!";

        }

        else {

            const falta =
                200 - subtotal;


            mensagemFrete.innerText =
                "💝 Faltam R$ " +
                falta
                    .toFixed(2)
                    .replace(".", ",") +
                " para ganhar frete grátis!";

        }

    }

}


/* =========================
   ABRIR CARRINHO
========================= */

function abrirCarrinho() {

    const box =
        document.getElementById(
            "carrinhoBox"
        );


    if (!box) return;


    box.style.right = "0";


    carrinhoAberto = true;

}


/* =========================
   FECHAR CARRINHO
========================= */

function fecharCarrinho() {

    const box =
        document.getElementById(
            "carrinhoBox"
        );


    if (!box) return;


    box.style.right = "-320px";


    carrinhoAberto = false;

}


/* =========================
   FINALIZAR COMPRA
========================= */

function finalizarCompra() {

    /*
       Verifica se o carrinho
       possui produtos
    */

    if (
        !carrinho ||
        carrinho.length === 0
    ) {

        alert(
            "Seu carrinho está vazio!"
        );

        return;

    }


    /*
       Verifica login
    */

    const usuarioLogado =
        localStorage.getItem(
            "usuarioLogado"
        );


    if (!usuarioLogado) {

        localStorage.setItem(
            "checkoutPendente",
            "true"
        );


        alert(
            "Para finalizar a compra, você precisa criar uma conta ou fazer login."
        );


        window.location.href =
            "login.html";


        return;

    }


    /*
       Atualiza valores
       do checkout
    */

    atualizarResumoCheckout();


    /*
       Abre a modal
    */

    const modal =
        document.getElementById(
            "modalCheckout"
        );


    if (modal) {

        modal.style.display =
            "flex";

    }

}


/* =========================
   FECHAR CHECKOUT
========================= */

function fecharCheckout() {

    const modal =
        document.getElementById(
            "modalCheckout"
        );


    if (modal) {

        modal.style.display =
            "none";

    }

}


/* =========================
   PROCESSAR PAGAMENTO
========================= */

function processarPagamento(
    metodo
) {

    /*
       Segurança:
       não permite pagamento
       de carrinho vazio
    */

    if (
        !carrinho ||
        carrinho.length === 0
    ) {

        alert(
            "Seu carrinho está vazio!"
        );

        fecharCheckout();

        return;

    }


    /*
       Calcula valor final
    */

    const subtotal =
        calcularTotalCarrinho();


    const taxa = 0;


    const frete =
        subtotal > 0 &&
        subtotal < 200
            ? 15
            : 0;


    const total =
        subtotal +
        taxa +
        frete;


    /*
       Mensagem de confirmação
    */

    alert(
        "Pagamento selecionado: " +
        metodo +
        "\n\n" +
        "Total: R$ " +
        total
            .toFixed(2)
            .replace(".", ",") +
        "\n\n" +
        "Obrigado pela sua compra! ✨"
    );


    /*
       LIMPA O CARRINHO DO USUÁRIO CORRETO

       Antes estava:
       localStorage.removeItem("carrinho");

       Isso estava errado porque o carrinho
       é salvo como:

       carrinho_NOME_DO_USUARIO
    */

    localStorage.removeItem(
        "carrinho_" + usuario
    );


    /*
       Limpa também a variável
       que está na memória
    */

    carrinho = [];


    /*
       Fecha modal
    */

    fecharCheckout();


    /*
       Atualiza carrinho
    */

    atualizarCarrinho();


    /*
       Fecha o carrinho lateral
    */

    fecharCarrinho();

}


/* =========================
   INICIALIZAÇÃO
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
           Atualiza o carrinho
        */

        atualizarCarrinho();


        /*
           BOTÃO ABRIR
        */

        const abrir =
            document.getElementById(
                "abrirCarrinho"
            );


        if (abrir) {

            abrir.addEventListener(
                "click",
                function() {

                    if (
                        carrinhoAberto
                    ) {

                        fecharCarrinho();

                    }

                    else {

                        abrirCarrinho();

                    }

                }
            );

        }


        /*
           BOTÃO FECHAR
        */

        const fechar =
            document.getElementById(
                "fecharCarrinho"
            );


        if (fechar) {

            fechar.addEventListener(
                "click",
                function() {

                    fecharCarrinho();

                }
            );

        }


        /*
           Atualiza o checkout
           quando a página abre
        */

        atualizarResumoCheckout();

    }
);

⚠️ Tem mais uma coisa importante no seu HTML

Você tem isto duas vezes:

<span id="totalCarrinho">0.00</span>


Um está no carrinho lateral e outro está dentro da tela de checkout.

O ideal é mudar o segundo para:

<span id="totalFinalCarrinho">0,00</span>


Então, no seu modal, troque:

<strong>R$ <span id="totalCarrinho">0,00</span></strong>


por:

<strong>R$ <span id="totalFinalCarrinho">0,00</span></strong>


E no carrinho.js que te passei, dentro de atualizarResumoCheckout(), troque:

const elementosTotal =
    document.querySelectorAll(
        "#totalCarrinho"
    );


por:

const elementoTotal =
    document.getElementById(
        "totalFinalCarrinho"
    );

if (elementoTotal) {
    elementoTotal.innerText =
        totalFinal
            .toFixed(2)
            .replace(".", ",");
}


Mas o principal erro que estava impedindo sua finalização é este: seu finalizarCompra() antigo procurava checkoutTotal, mas esse ID não existe no HTML. O código acima corrige isso e também corrige a limpeza do carrinho por usuário.

Também não precisa manter a função finalizarCompra() do <script> do HTML. Apague aquela versão do HTML, porque ela será fornecida pelo carrinho.js.
