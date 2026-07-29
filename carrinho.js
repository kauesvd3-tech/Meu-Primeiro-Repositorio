document.getElementById("abrirCarrinho").onclick = function () {
    let box = document.getElementById("carrinhoBox");

    if (carrinhoAberto) {
        box.style.right = "-320px";
    } else {
        box.style.right = "0";
    }

    carrinhoAberto = !carrinhoAberto;
};

document.getElementById("fecharCarrinho").onclick = function () {
    document.getElementById("carrinhoBox").style.right = "-320px";
    carrinhoAberto = false;
