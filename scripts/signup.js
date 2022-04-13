const nome = document.getElementById("nome");
const apelido = document.getElementById("apelido");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const repetirSenha = document.getElementById("repetirSenha");

const botao = document.getElementById("submit");

let usuarioCadastro = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

const criarUsuario = () => {
    usuarioCadastro = {
        firstName: nome.value,
        lastName: apelido.value,
        email: email.value,
        password: senha.value
    };

    let usuarioCadastroJSON = JSON.stringify(usuarioCadastro);

    fetch("https://ctd-todo-api.herokuapp.com/v1/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: usuarioCadastroJSON
    }).then(response => {
        return response.json()
    }).then(response => {
        localStorage.setItem('jwt', response.jwt)
        console.log(localStorage.getItem('jwt'))
    }).catch(error => {
        console.log(error);
    });
}

botao.addEventListener("click", function (event) {
    event.preventDefault();
    let arrayErros = [];
    if (nome.value.length <= 0) {
        arrayErros.push('Nome é obrigatório');
    }
    if (apelido.value.length <= 0) {
        arrayErros.push('Apelido é obrigatório');
    }
    if (email.value.length <= 0) {
        arrayErros.push('Email é obrigatório');
    }
    if (senha.value.length <= 0) {
        arrayErros.push('Senha é obrigatório');
    }
    if (senha.value !== repetirSenha.value) {
        arrayErros.push('A senha deve ser igual');
    }

    if (arrayErros.length > 0) {
        let stringErros = ''
        arrayErros.forEach(erro => {
            stringErros = stringErros + erro + '\n'
        });
        alert(stringErros);
    } else {
        criarUsuario();
    }
});