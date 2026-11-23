
/* =====================================================
   BANCO DE USUÁRIOS
   Animaizinhos Encantados
   Sistema usando localStorage
===================================================== */

const BANCO = {

    /* =========================
       OBTER TODOS OS USUÁRIOS
    ========================= */

    obterUsuarios: function() {

        try {

            const dados = localStorage.getItem("usuarios");

            const usuarios = dados ? JSON.parse(dados) : [];

            return Array.isArray(usuarios) ? usuarios : [];

        } catch (erro) {

            console.error("Erro ao carregar usuários:", erro);

            return [];

        }

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
       VERIFICAR DUPLICIDADE
    ========================= */

    usuarioExiste: function(usuario, email, telefone) {

        const usuarios = this.obterUsuarios();

        const nome = (usuario || "").trim().toLowerCase();

        const emailNormalizado = (email || "").trim().toLowerCase();

        const telefoneNormalizado = (telefone || "").replace(/\D/g, "");

        return usuarios.some(u =>

            (u.usuario || "").toLowerCase() === nome ||

            (u.email || "").toLowerCase() === emailNormalizado ||

            (
                telefoneNormalizado &&
                (u.telefone || "").replace(/\D/g, "") === telefoneNormalizado
            )

        );

    },

    /* =========================
       CRIAR USUÁRIO
       COMPATÍVEL COM LOGIN.HTML
    ========================= */

    criarUsuario: function(dados) {

        const usuario = (dados.usuario || "").trim();

        const email = (dados.email || "").trim().toLowerCase();

        const telefone = (dados.telefone || "").replace(/\D/g, "");

        const senha = dados.senha || "";

        if (!usuario || !email || !telefone || !senha) {

            throw new Error("Preencha todos os campos.");

        }

        if (this.usuarioExiste(usuario, email, telefone)) {

            throw new Error("Usuário, e-mail ou telefone já cadastrado.");

        }

        const novoUsuario = {

            id: Date.now(),

            usuario: usuario,

            email: email,

            telefone: telefone,

            senha: senha

        };

        const usuarios = this.obterUsuarios();

        usuarios.push(novoUsuario);

        this.salvarUsuarios(usuarios);

        return novoUsuario;

    },

    /* =========================
       CADASTRO ANTIGO
       MANTIDO PARA COMPATIBILIDADE
    ========================= */

    cadastrar: function(usuario, email, senha) {

        try {

            const novoUsuario = this.criarUsuario({

                usuario: usuario,

                email: email,

                telefone: "",

                senha: senha

            });

            return {

                sucesso: true,

                mensagem: "Conta criada com sucesso!",

                usuario: novoUsuario

            };

        } catch (erro) {

            return {

                sucesso: false,

                mensagem: erro.message

            };

        }

    },

    /* =========================
       PROCURAR USUÁRIO
       USUÁRIO, EMAIL OU TELEFONE
    ========================= */

    procurarUsuario: function(login) {

        if (!login) {
            return null;
        }

        const usuarios = this.obterUsuarios();

        const identificador = login.trim().toLowerCase();

        const telefone = login.replace(/\D/g, "");

        return usuarios.find(u => {

            const mesmoUsuario =
                (u.usuario || "").toLowerCase() === identificador;

            const mesmoEmail =
                (u.email || "").toLowerCase() === identificador;

            const mesmoTelefone =
                telefone.length >= 10 &&
                (u.telefone || "").replace(/\D/g, "") === telefone;

            return mesmoUsuario || mesmoEmail || mesmoTelefone;

        }) || null;

    },

    /* =========================
       PROCURAR SOMENTE PELO NOME
       MANTIDO PARA COMPATIBILIDADE
    ========================= */

    procurarPorUsuario: function(usuario) {

        if (!usuario) {
            return null;
        }

        return this.procurarUsuario(usuario);

    },

    /* =========================
       FAZER LOGIN
       COMPATÍVEL COM LOGIN.HTML
    ========================= */

    fazerLogin: function(usuario) {

        if (!usuario || !usuario.usuario) {

            throw new Error("Usuário inválido.");

        }

        localStorage.setItem(
            "usuarioLogado",
            usuario.usuario
        );

        return true;

    },

    /* =========================
       LOGIN ANTIGO
       MANTIDO PARA COMPATIBILIDADE
    ========================= */

    login: function(usuario, senha) {

        const encontrado = this.procurarUsuario(usuario);

        if (!encontrado || encontrado.senha !== senha.trim()) {

            return {

                sucesso: false,

                mensagem: "Usuário, e-mail, telefone ou senha incorretos."

            };

        }

        this.fazerLogin(encontrado);

        return {

            sucesso: true,

            mensagem: "Login realizado com sucesso!",

            usuario: encontrado

        };

    },

    /* =========================
       PEGAR USUÁRIO LOGADO
    ========================= */

    usuarioLogado: function() {

        const nome = localStorage.getItem("usuarioLogado");

        if (!nome) {
            return null;
        }

        return this.procurarPorUsuario(nome);

    },

    /* =========================
       VERIFICAR SE ESTÁ LOGADO
    ========================= */

    estaLogado: function() {

        return !!this.usuarioLogado();

    },

    /* =========================
       FAZER LOGOUT
    ========================= */

    logout: function() {

        localStorage.removeItem("usuarioLogado");

    },

    /* =========================
       EXCLUIR CONTA
    ========================= */

    excluirConta: function() {

        const usuarioLogado = localStorage.getItem("usuarioLogado");

        if (!usuarioLogado) {

            return {

                sucesso: false,

                mensagem: "Nenhum usuário está logado."

            };

        }

        let usuarios = this.obterUsuarios();

        usuarios = usuarios.filter(u =>

            (u.usuario || "").toLowerCase() !== usuarioLogado.toLowerCase()

        );

        this.salvarUsuarios(usuarios);

        localStorage.removeItem("usuarioLogado");

        localStorage.removeItem("carrinho_" + usuarioLogado);

        localStorage.removeItem("favoritos_" + usuarioLogado);

        return {

            sucesso: true,

            mensagem: "Conta excluída com sucesso."

        };

    }

};
