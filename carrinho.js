let usuario = localStorage.getItem("usuarioLogado");

let carrinho = JSON.parse(localStorage.getItem("carrinho_" + usuario)) || [];
let carrinhoAberto = false;

function salvarCarrinho() {
    localStorage.setItem("carrinho_" + usuario, JSON.stringify(carrinho));
}

function adicionarCarrinho(nome, preco, tamanho, imagem) {

    let item = carrinho.find(i => i.nome === nome);

    if (item) {
        item.qtd++;
    } else {
        carrinho.push({
            nome,
            preco,
            tamanho,
            imagem,
            qtd: 1
        });
    }

    salvarCarrinho();
    atualizarCarrinho();
}

function atualizarCarrinho() {

    let lista = document.getElementById("listaCarrinho");
    let contador = document.getElementById("contadorCarrinho");
    let totalSpan = document.getElementById("totalCarrinho");

    if (!lista) return;

    lista.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, index) => {

        let div = document.createElement("div");
        div.className = "itemCarrinho";

        div.innerHTML = `
            <img src="${item.imagem}">
            <div>
                <b>${item.nome}</b><br>
                ${item.tamanho}<br>
                Qtd: ${item.qtd}
            </div>
            <button onclick="remover(${index})">❌</button>
        `;

        lista.appendChild(div);

        total += item.preco * item.qtd;
    });

    contador.innerText = carrinho.length;
    totalSpan.innerText = total.toFixed(2);
}

function remover(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
}

function limparCarrinho() {
    carrinho = [];
    salvarCarrinho();
    atualizarCarrinho();
}

document.addEventListener("DOMContentLoaded", () => {

    atualizarCarrinho();

    const abrir = document.getElementById("abrirCarrinho");
    const fechar = document.getElementById("fecharCarrinho");
    const box = document.getElementById("carrinhoBox");

    if (abrir) {
        abrir.onclick = function () {
            if (carrinhoAberto) {
                box.style.right = "-320px";
            } else {
                box.style.right = "0";
            }

            carrinhoAberto = !carrinhoAberto;
        };
    }

    if (fechar) {
        fechar.onclick = function () {
            box.style.right = "-320px";
            carrinhoAberto = false;
        };
    }

});
