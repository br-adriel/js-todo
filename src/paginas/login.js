import formLogin from "./../componentes/formUsuario";
import { gerBotao } from "./../componentes/geradoresHtml";
import pagCadastro from "./cadastro";
import "./login.css";

const pagLogin = (() => {
  // titulo do card
  const titulo = document.createElement("h2");
  titulo.innerText = "Entrar";

  // link caso o usuario nao tenha conta
  const linkCriarConta = document.createElement("a");
  linkCriarConta.setAttribute("href", "#");
  linkCriarConta.innerText = "Cadastre-se";
  linkCriarConta.addEventListener("click", (e) => {
    const main = document.getElementById("content");
    main.appendChild(pagCadastro);
    main.firstChild.style.display = "none";
    main.removeChild(main.firstChild);
    main.firstChild.style.display = "flex";
  });

  const pCriarConta = document.createElement("p");
  pCriarConta.innerText = "Não possui conta? ";
  pCriarConta.appendChild(linkCriarConta);

  const form = formLogin();
  form.appendChild(pCriarConta);

  // botao para envio do form
  const btnEntrar = gerBotao("submit", "Entrar");
  form.appendChild(btnEntrar);

  // card para os elementos
  const cardLogin = document.createElement("div");
  cardLogin.classList.add("card");
  cardLogin.appendChild(titulo);
  cardLogin.appendChild(form);

  // pagina de login
  const paginaLogin = document.createElement("section");
  paginaLogin.setAttribute("id", "paginaLogin");
  paginaLogin.appendChild(cardLogin);

  return paginaLogin;
})();

export default pagLogin;
