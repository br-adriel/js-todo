import formLogin from "./../componentes/formUsuario";
import { gerBotao } from "./../componentes/geradoresHtml";
import "./login.css";

// titulo do card
const titulo = document.createElement("h2");
titulo.innerText = "Entrar";

// link caso o usuario nao tenha conta
const linkCriarConta = document.createElement("a");
linkCriarConta.setAttribute("href", "#");
linkCriarConta.innerText = "Cadastre-se";

const pCriarConta = document.createElement("p");
pCriarConta.innerText = "Não possui conta? ";
pCriarConta.appendChild(linkCriarConta);
formLogin.appendChild(pCriarConta);

// botao para envio do form
const btnEntrar = gerBotao("submit", "Entrar");
formLogin.appendChild(btnEntrar);

// card para os elementos
const cardLogin = document.createElement("div");
cardLogin.classList.add("card");
cardLogin.appendChild(titulo);
cardLogin.appendChild(formLogin);

// pagina de login
const paginaLogin = document.createElement("section");
paginaLogin.setAttribute("id", "paginaLogin");
paginaLogin.appendChild(cardLogin);

export default paginaLogin;
