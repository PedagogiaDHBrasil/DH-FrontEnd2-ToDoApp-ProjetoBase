window.onload = (event) => {
  const url = "https://ctd-todo-api.herokuapp.com/v1/users/login",
    form = document.forms[0];

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const payload = {
        email: form["inputEmail"].value,
        password: form["inputPassword"].value,
      },
      settings = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      };

    console.log("consultando API");
    fetch(url, settings)
      .then((response) => response.json())
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              jwt: data.jwt,
              name: form["inputEmail"].value.split("@")[0],
            })
          );
          location.replace("tarefas.html");
        }
        // form.reset();
      });
  });
};
