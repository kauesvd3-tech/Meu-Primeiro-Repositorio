let usuario = localStorage.getItem("usuarioLogado");

let carrinho = JSON.parse(localStorage.getItem("carrinho_" + usuario)) || [];

function salvarCarrinho(){
    localStorage.setItem("carrinho_" + usuario, JSON.stringify(carrinho));
}

function adicionarCarrinho(nome, preco, tamanho, imagem){

    let item = carrinho.find(i => i.nome === nome);

    if(item){
        item.qtd++;
    }else{
        carrinho.push({
            nome,
            preco,
            tamanho,
            imagem,
            qtd:1
        });
    }

    salvarCarrinho();

    alert(nome + " adicionado ao carrinho!");
}
