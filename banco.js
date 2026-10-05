/* =====================================================
   BANCO DE DADOS LOCAL
   Animaizinhos Encantados
   ===================================================== */

const BANCO = {

    /* ==============================
       USUÁRIOS
    ============================== */

    pegarUsuarios() {

        return JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];

    },


    salvarUsuarios(usuarios) {

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

    },


    criarUsuario(dados) {

        const usuarios = this.pegarUsuarios();

        const usuario = {

            id: Date.now(),

            usuario: dados.usuario,

            email: dados.email,

            telefone: dados.telefone,

            senha: dados.senha,

            criadoEm: new Date().toISOString()

        };

        usuarios.push(usuario);

        this.salvarUsuarios(usuarios);

        return usuario;

    },


    procurarUsuario(login) {

        const usuarios = this.pegarUsuarios();

        login = login.toLowerCase().trim();

        return usuarios.find(u =>

            u.usuario.toLowerCase() === login ||

            u.email.toLowerCase() === login ||

            u.telefone === login

        );

    },


    procurarPorUsuario(usuario) {

        const usuarios = this.pegarUsuarios();

        return usuarios.find(
            u => u.usuario === usuario
        );

    },


    usuarioExiste(usuario, email, telefone) {

        const usuarios = this.pegarUsuarios();

        return usuarios.some(u =>

            u.usuario.toLowerCase() ===
            usuario.toLowerCase()

            ||

            u.email.toLowerCase() ===
            email.toLowerCase()

            ||

            u.telefone === telefone

        );

    },


    /* ==============================
       LOGIN
    ============================== */

    fazerLogin(usuario) {

        localStorage.setItem(
            "usuarioLogado",
            usuario.usuario
        );

        localStorage.setItem(
            "logado",
            "true"
        );

    },


    logout() {

        localStorage.removeItem(
            "usuarioLogado"
        );

        localStorage.removeItem(
            "logado"
        );

    },


    estaLogado() {

        return (
            localStorage.getItem("logado")
            === "true"
        );

    },


    usuarioAtual() {

        return localStorage.getItem(
            "usuarioLogado"
        );

    },


    /* ==============================
       CARRINHO
    ============================== */

    pegarCarrinho() {

        const usuario =
            this.usuarioAtual();

        if (!usuario) return [];

        return JSON.parse(
            localStorage.getItem(
                "carrinho_" + usuario
            )
        ) || [];

    },


    salvarCarrinho(carrinho) {

        const usuario =
            this.usuarioAtual();

        if (!usuario) return;

        localStorage.setItem(

            "carrinho_" + usuario,

            JSON.stringify(carrinho)

        );

    },


    /* ==============================
       FAVORITOS
    ============================== */

    pegarFavoritos() {

        const usuario =
            this.usuarioAtual();

        if (!usuario) return [];

        return JSON.parse(

            localStorage.getItem(
                "favoritos_" + usuario
            )

        ) || [];

    },


    salvarFavoritos(favoritos) {

        const usuario =
            this.usuarioAtual();

        if (!usuario) return;

        localStorage.setItem(

            "favoritos_" + usuario,

            JSON.stringify(favoritos)

        );

    },


    /* ==============================
       AVALIAÇÕES
    ============================== */

    pegarAvaliacao(produto) {

        const usuario =
            this.usuarioAtual();

        if (!usuario) return 0;

        return Number(

            localStorage.getItem(

                "avaliacao_" +
                usuario +
                "_" +
                produto

            )

        ) || 0;

    },


    salvarAvaliacao(produto, nota) {

        const usuario =
            this.usuarioAtual();

        if (!usuario) return;

        localStorage.setItem(

            "avaliacao_" +
            usuario +
            "_" +
            produto,

            nota

        );

    },


    removerAvaliacao(produto) {

        const usuario =
            this.usuarioAtual();

        if (!usuario) return;

        localStorage.removeItem(

            "avaliacao_" +
            usuario +
            "_" +
            produto

        );

    }

};

