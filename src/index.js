import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import formUsuario from "./componentes/formUsuario";
import {
  gerBotao,
  gerCampoForm,
  gerVisualizacao,
  gerMensagem,
} from "./componentes/geradoresHtml";
import Usuario from "./classes/Usuario";
import Lista from "./classes/Lista";
import Tarefa from "./classes/Tarefa";

const usuarios = [];
const usuarioAtivo = [];

// Página de cadastro
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
    textoAjuda,
    [
      ["minlength", "8"],
      ["required", "true"],
    ]
  );

  const form = formUsuario();
  form.appendChild(inputSenha2);
  form.addEventListener("submit", (e) => enviarForm(e));

  // lida com o envio do formulario de cadastro
  function enviarForm(e) {
    e.preventDefault();

    const usuarioForm = document.getElementById("formUsuario").value;
    const senhaForm = document.getElementById("formSenha").value;
    const senha2Form = document.getElementById("formSenha2").value;

    const campoMsg = document.getElementById("campoMsgForm");
    if (usuarios.some((u) => u.usuario === usuarioForm)) {
      const msg = gerMensagem("Esse nome de usuário já está em uso", "aviso");
      campoMsg.appendChild(msg);
    } else if (senhaForm !== senha2Form) {
      const msg = gerMensagem("As senhas não correspondem", "aviso");
      campoMsg.appendChild(msg);
    } else {
      // cria data referente a dia atual mais um dia
      const data = new Date();
      data.setTime(data.getTime() + 8640000);

      // Cria uma tarefa padrão para novo usuário
      const novaTarefa = new Tarefa("Tarefa 1", "Minha primeira tarefa", data);

      // Cria uma lista padrão para o novo usuário
      const novaLista = new Lista("Minhas tarefas");
      novaLista.tarefas.push(novaTarefa);

      // Cria um novo usuario com lista e tarefa padrao
      const novoUsuario = new Usuario(usuarioForm, senhaForm);
      novoUsuario.listas.push(novaLista);

      // Adiciona novo usuario a lista de usuarios e define como o ativo
      usuarios.push(novoUsuario);
      usuarioAtivo.push(novoUsuario);

      // Carrega página inicial
      gerVisualizacao(pagInicial);
    }
  }

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

// Página de Login
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

  // botao para envio do form
  const btnEntrar = gerBotao("submit", "Entrar");

  // formulario de login
  const form = formUsuario();
  form.appendChild(pCriarConta);
  form.appendChild(btnEntrar);
  form.addEventListener("submit", (e) => enviarForm(e));

  // lida com o envio do formulario de login
  function enviarForm(e) {
    e.preventDefault();

    const usuarioForm = document.getElementById("formUsuario").value;
    const senhaForm = document.getElementById("formSenha").value;

    if (
      usuarios.some((u) => u.usuario === usuarioForm && u.senha === senhaForm)
    ) {
      usuarios.push(usuarios.filter((u) => u.usuario === usuarioForm));
      gerVisualizacao(pagInicial);
    } else {
      const campoMsg = document.getElementById("campoMsgForm");
      const msg = gerMensagem("Credenciais inválidas", "erro");
      campoMsg.appendChild(msg);
    }
  }

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

// Página Inicial
const pagInicial = (() => {
  const paginaInicial = document.createElement("section");
  paginaInicial.setAttribute("id", "paginaInicial");
  return paginaInicial;
})();

const conteudo = document.getElementById("content");
if (usuarioAtivo.length == 0) {
  conteudo.appendChild(pagLogin);
} else {
  conteudo.appendChild(pagInicial);
}
