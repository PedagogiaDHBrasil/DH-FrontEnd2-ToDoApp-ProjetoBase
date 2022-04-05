const usuario = document.getElementById("inputEmail");
const senha = document.getElementById("inputPassword");
const botao = document.getElementById("submit");
botao.addEventListener("click", function() {
    if (usuario.value.length>0 && senha.value.length>0) {
        console.log("usuário logado")
    }
    else{

        console.log("Por favor insira usuário e senha")
    };
})