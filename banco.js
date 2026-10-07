/* =====================================================
   BANCO DE USUÁRIOS
   Sistema simples usando localStorage
===================================================== */


/* =========================
   CONFIGURAÇÃO
========================= */

const BANCO = {


    /* =========================
       PEGAR TODOS OS USUÁRIOS
    ========================= */

    obterUsuarios: function() {

        return JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];

    },


    /* =========================
       SALVAR USUÁRIOS
    ========================= */

    salvarUsuarios: function(usuarios) {

        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );

    },


    /* =========================
       CADASTRAR USUÁRIO
    ========================= */

    cadastrar: function(usuario, email, senha) {

        usuario = usuario.trim();
        email = email.trim().toLowerCase();
        senha = senha.trim();


        /* Verifica campos */

        if (!usuario || !email || !senha) {

            return {
                sucesso: false,
                mensagem: "Preencha todos os campos."
            };

        }


        /* Pega usuários existentes */

        const usuarios =
            this.obterUsuarios();


        /* Verifica se usuário já existe */

        const usuarioExiste =
            usuarios.some(
                u =>
                    u.usuario.toLowerCase() ===
                    usuario.toLowerCase()
            );


        if (usuarioExiste) {

            return {
                sucesso: false,
                mensagem: "Esse usuário já existe."
            };

        }


        /* Verifica se email já existe */

        const emailExiste =
            usuarios.some(
                u =>
                    u.email.toLowerCase() ===
                    email
            );


        if (emailExiste) {

            return {
                sucesso: false,
                mensagem: "Esse email já está cadastrado."
            };

        }


        /* Cria usuário */

        const novoUsuario = {

            id: Date.now(),

            usuario: usuario,

            email: email,

            senha: senha

        };


        /* Adiciona ao banco */

        usuarios.push(
            novoUsuario
        );


        /* Salva */

        this.salvarUsuarios(
            usuarios
        );


        return {
            sucesso: true,
            mensagem: "Conta criada com sucesso!",
            usuario: novoUsuario
        };

    },


    /* =========================
       FAZER LOGIN
    ========================= */

    login: function(usuario, senha) {

        usuario = usuario.trim();
        senha = senha.trim();


        const usuarios =
            this.obterUsuarios();


        const encontrado =
            usuarios.find(
                u =>
                    (
                        u.usuario.toLowerCase() ===
                        usuario.toLowerCase()
                    ||
                        u.email.toLowerCase() ===
                        usuario.toLowerCase()
                    )
                    &&
                    u.senha === senha
            );


        /* Usuário não encontrado */

        if (!encontrado) {

            return {
                sucesso: false,
                mensagem: "Usuário/email ou senha incorretos."
            };

        }


        /* Salva usuário logado */

        localStorage.setItem(
            "usuarioLogado",
            encontrado.usuario
        );


        return {
            sucesso: true,
            mensagem: "Login realizado com sucesso!",
            usuario: encontrado
        };

    },


    /* =========================
       PROCURAR POR USUÁRIO
    ========================= */

    procurarPorUsuario: function(usuario) {

        if (!usuario) {
            return null;
        }


        const usuarios =
            this.obterUsuarios();


        return usuarios.find(
            u =>
                u.usuario.toLowerCase() ===
                usuario.toLowerCase()
        ) || null;

    },


    /* =========================
       PEGAR USUÁRIO LOGADO
    ========================= */

    usuarioLogado: function() {

        const nome =
            localStorage.getItem(
                "usuarioLogado"
            );


        if (!nome) {
            return null;
        }


        return this.procurarPorUsuario(
            nome
        );

    },


    /* =========================
       VERIFICAR LOGIN
    ========================= */

    estaLogado: function() {

        return !!localStorage.getItem(
            "usuarioLogado"
        );

    },


    /* =========================
       LOGOUT
    ========================= */

    logout: function() {

        /* Remove somente o login */

        localStorage.removeItem(
            "usuarioLogado"
        );

    },


    /* =========================
       EXCLUIR CONTA
    ========================= */

    excluirConta: function() {

        const usuarioLogado =
            localStorage.getItem(
                "usuarioLogado"
            );


        if (!usuarioLogado) {

            return {
                sucesso: false,
                mensagem: "Nenhum usuário está logado."
            };

        }


        let usuarios =
            this.obterUsuarios();


        usuarios =
            usuarios.filter(
                u =>
                    u.usuario.toLowerCase() !==
                    usuarioLogado.toLowerCase()
            );


        this.salvarUsuarios(
            usuarios
        );


        /* Remove login */

        localStorage.removeItem(
            "usuarioLogado"
        );


        /* Remove carrinho */

        localStorage.removeItem(
            "carrinho_" + usuarioLogado
        );


        return {
            sucesso: true,
            mensagem: "Conta excluída com sucesso."
        };

    }

};
