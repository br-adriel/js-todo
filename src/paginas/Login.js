import formUsuario from "./../componentes/formUsuario";
import {
  gerBotao,
  gerVisualizacao,
  gerMensagem,
} from "./../componentes/geradoresHtml";
import pagInicial from "./Inicio";
import pagCadastro from "./Cadastro";
import armazenamento from "../armazenamento";

function pagLogin(usuarios) {
  if (armazenamento.ler("usuarios")) {
    usuarios = JSON.parse(armazenamento.ler("usuarios"));
  }

  const usuarioAtivo = [];

  // titulo do card
  const titulo = document.createElement("h2");
  titulo.innerText = "Entrar";

  // link caso o usuario nao tenha conta
  const linkCriarConta = document.createElement("a");
  linkCriarConta.setAttribute("href", "#");
  linkCriarConta.innerText = "Cadastre-se";
  linkCriarConta.addEventListener("click", (e) => {
    gerVisualizacao(pagCadastro(usuarios));
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
      usuarioAtivo.push(...usuarios.filter((u) => u.usuario === usuarioForm));
      gerVisualizacao(pagInicial(usuarios, usuarioAtivo));
    } else {
      const campoMsg = document.getElementById("campoMsgForm");
      if (campoMsg.hasChildNodes()) {
        campoMsg.removeChild(campoMsg.children[0]);
      }
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

export default pagLogin;
