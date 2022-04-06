const usuario = document.getElementById("inputEmail");
const senha = document.getElementById("inputPassword");
const botao = document.getElementById("submit");
botao.addEventListener("click", function(event) {
    event.preventDefault()
    if (usuario.value.length > 0 && senha.value.length > 0) {
        LogarUsuario()
    }
    else{

        alert("Por favor insira usuário e senha")
    };
})