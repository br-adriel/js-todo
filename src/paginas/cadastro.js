import formCadastro from "./../componentes/formUsuario";
import { gerBotao, gerCampoForm } from "./../componentes/geradoresHtml";
import "./cadastro.css";
import pagLogin from "./login";

const pagCadastro = (() => {
  // titulo do card
  const titulo = document.createElement("h2");
  titulo.innerText = "Criar conta";

  // campo de confirmacao de senha
  let textoAjuda =
    "Os dados ficam salvo apenas localmente no seu dispositivo, ";
  textoAjuda +=
    "mesmo assim recomendados que utilize uma senha que não use em outras contas";

  const inputSenha2 = gerCampoForm(
    "Confirmação de senha",
    "password",
    "formSenha2",
    textoAjuda
  );

  const form = formCadastro();
  form.appendChild(inputSenha2);

  // link caso o usuario tenha conta
  const linkLogin = document.createElement("a");
  linkLogin.setAttribute("href", "#");
  linkLogin.innerText = "Faça login";
  linkLogin.addEventListener("click", () => {
    const main = document.getElementById("content");
    main.appendChild(pagLogin);
    main.firstChild.style.display = "none";
    main.removeChild(main.firstChild);
    main.firstChild.style.display = "flex";
  });

  const pLogin = document.createElement("p");
  pLogin.innerText = "Já possui conta? ";
  pLogin.appendChild(linkLogin);
  form.appendChild(pLogin);

  // botao para envio do form
  const btnCadastrar = gerBotao("submit", "Cadastrar-se");
  form.appendChild(btnCadastrar);

  // card para os elementos
  const cardCadastro = document.createElement("div");
  cardCadastro.classList.add("card");
  cardCadastro.appendChild(titulo);
  cardCadastro.appendChild(form);

  // pagina de cadastro
  const paginaCadastro = document.createElement("section");
  paginaCadastro.setAttribute("id", "paginaCadastro");
  paginaCadastro.appendChild(cardCadastro);
  return paginaCadastro;
})();

export default pagCadastro;
