const nome = document.getElementById("nome")
const apelido = document.getElementById("apelido")
const email = document.getElementById("email")
const senha = document.getElementById("senha")
const repetirSenha = document.getElementById("repetirSenha")

const botao = document.getElementById("submit")

  

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
    }

    let usuarioCadastroJSON = JSON.stringify(usuarioCadastro)

    fetch("https://ctd-todo-api.herokuapp.com/v1/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: usuarioCadastroJSON
    })
        .then(response => {
            console.log(response);
            return response.json()
        })
        .then(response => {
            localStorage.setItem('jwt', response.jwt)
            console.log(localStorage.getItem('jwt'))
        }).catch(error => {
            console.log(error);
        })
}

botao.addEventListener("click", function (event) {
    event.preventDefault()
    if (nome.value.length > 0 && apelido.value.length > 0
        && email.value.length > 0 && senha.value.length > 0 
        && senha.value.length > 0
        && senha.value === repetirSenha.value) {
        criarUsuario()
    }
    else {
        alert("Por favor insira os dados corretamente")
    }  
}) 