import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import formUsuario from "./componentes/formUsuario";
import {
  gerBotao,
  gerCampoForm,
  gerVisualizacao,
} from "./componentes/geradoresHtml";
import Usuario from "./classes/Usuario";
import Lista from "./classes/Lista";
import Tarefa from "./classes/Tarefa";

const usuarios = [];
const usuarioAtivo = [];

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

  const form = formUsuario();
  form.appendChild(inputSenha2);
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuarioForm = document.getElementById("formUsuario").value;
    const senhaForm = document.getElementById("formSenha").value;
    const senha2Form = document.getElementById("formSenha2").value;

    if (usuarios.some((u) => u.usuario === usuarioForm)) {
      console.log("Já existe usuario com esse username");
    } else if (senhaForm !== senha2Form) {
      console.log("As senha digitadas são diferentes");
    } else {
      const novoUsuario = new Usuario(usuarioForm, senhaForm);
      usuarios.push(novoUsuario);
      usuarioAtivo.push(novoUsuario);
      console.log("Conta criada e usuário logado");
    }
  });

  // link caso o usuario tenha conta
  const linkLogin = document.createElement("a");
  linkLogin.setAttribute("href", "#");
  linkLogin.innerText = "Faça login";
  linkLogin.addEventListener("click", () => {
    gerVisualizacao(pagLogin);
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

const pagLogin = (() => {
  // titulo do card
  const titulo = document.createElement("h2");
  titulo.innerText = "Entrar";

  // link caso o usuario nao tenha conta
  const linkCriarConta = document.createElement("a");
  linkCriarConta.setAttribute("href", "#");
  linkCriarConta.innerText = "Cadastre-se";
  linkCriarConta.addEventListener("click", (e) => {
    gerVisualizacao(pagCadastro);
  });

  const pCriarConta = document.createElement("p");
  pCriarConta.innerText = "Não possui conta? ";
  pCriarConta.appendChild(linkCriarConta);

  const form = formUsuario();
  form.setAttribute("id", "formUsuario");
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

const conteudo = document.getElementById("content");
conteudo.appendChild(pagLogin);
