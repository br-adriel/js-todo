import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import formUsuario from "./componentes/formUsuario";
import {
  gerBotao,
  gerCampoForm,
  gerVisualizacao,
  gerMensagem,
  gerLista,
  gerIcone,
} from "./componentes/geradoresHtml";
import Usuario from "./classes/Usuario";
import Lista from "./classes/Lista";
import Tarefa from "./classes/Tarefa";

const usuarios = [];
const usuarioAtivo = [];

// Página de cadastro
function pagCadastro() {
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
      gerVisualizacao(pagInicial());
    }
  }

  // link caso o usuario tenha conta
  const linkLogin = document.createElement("a");
  linkLogin.setAttribute("href", "#");
  linkLogin.innerText = "Faça login";
  linkLogin.addEventListener("click", () => {
    gerVisualizacao(pagLogin());
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
}

// Página de Login
function pagLogin() {
  // titulo do card
  const titulo = document.createElement("h2");
  titulo.innerText = "Entrar";

  // link caso o usuario nao tenha conta
  const linkCriarConta = document.createElement("a");
  linkCriarConta.setAttribute("href", "#");
  linkCriarConta.innerText = "Cadastre-se";
  linkCriarConta.addEventListener("click", (e) => {
    gerVisualizacao(pagCadastro());
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
    if (usuarios.some((u) => u.usuario === usuarioForm && u.login(senhaForm))) {
      usuarioAtivo.push(...usuarios.filter((u) => u.usuario === usuarioForm));
      gerVisualizacao(pagInicial());
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
}

// Página Inicial
function pagInicial() {
  // botao nova tarefa
  const icone = gerIcone(["bi", "bi-plus"]);

  const btnNovaTarefa = gerBotao("button", "");
  btnNovaTarefa.setAttribute("title", "Nova lista");
  btnNovaTarefa.appendChild(icone);

  // botao sair
  const btnSair = gerBotao("button", "Sair");
  btnSair.addEventListener("click", () => {
    usuarioAtivo.pop();
    gerVisualizacao(pagLogin());
  });

  // barra de acoes
  const barra = document.createElement("div");
  barra.classList.add("barraAcoes");
  barra.appendChild(btnNovaTarefa);
  barra.appendChild(btnSair);

  // Div para as listas do usuario
  const listas = document.createElement("div");
  listas.classList.add("listas");

  function excluirLista(dataCriacao) {
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].username === usuarioAtivo[0].username) {
        usuarios[i].listas = usuarios[i].listas.filter(
          (lista) => lista.criadaEm !== dataCriacao
        );
        usuarioAtivo.pop();
        usuarioAtivo.push(usuarios[i]);
        break;
      }
    }
    gerVisualizacao(pagInicial());
  }

  // Gera html das listas do usuario e adiciona na div
  usuarioAtivo[0].listas.map((lista) => {
    // Botao visualizar
    const iconeVer = gerIcone(["bi", "bi-eye"]);

    const btnVer = gerBotao("button", "");
    btnVer.setAttribute("title", "Visualizar lista");
    btnVer.appendChild(iconeVer);

    // Botao editar
    const iconeEditar = gerIcone(["bi", "bi-pen"]);

    const btnEditar = gerBotao("button", "");
    btnEditar.setAttribute("title", "Editar lista");
    btnEditar.appendChild(iconeEditar);

    // Botao apagar
    const iconeApagar = gerIcone(["bi", "bi-trash"]);

    const btnApagar = gerBotao("button", "");
    btnApagar.setAttribute("title", "Apagar lista");
    btnApagar.appendChild(iconeApagar);
    btnApagar.addEventListener("click", () => excluirLista(lista.criadaEm));

    // Div com os botões
    const divBotoes = document.createElement("div");
    divBotoes.classList.add("botoes");
    divBotoes.appendChild(btnVer);
    divBotoes.appendChild(btnEditar);
    divBotoes.appendChild(btnApagar);

    const listaHtml = gerLista(lista);
    listaHtml.appendChild(divBotoes);

    listas.appendChild(listaHtml);
  });

  // Section da pagina inicial
  const paginaInicial = document.createElement("section");
  paginaInicial.setAttribute("id", "paginaInicial");
  paginaInicial.appendChild(barra);
  paginaInicial.appendChild(listas);
  return paginaInicial;
}

const conteudo = document.getElementById("content");
if (usuarioAtivo.length === 0) {
  conteudo.appendChild(pagLogin());
} else {
  conteudo.appendChild(pagInicial());
}
