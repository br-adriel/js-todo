import Usuario from "./../classes/Usuario";
import Lista from "./../classes/Lista";
import Tarefa from "./../classes/Tarefa";
import formUsuario from "./../componentes/formUsuario";
import {
  gerBotao,
  gerCampoForm,
  gerVisualizacao,
  gerMensagem,
} from "./../componentes/geradoresHtml";
import pagInicial from "./Inicio";
import pagLogin from "./Login";

// Página de cadastro
function pagCadastro(usuarios) {
  const usuarioAtivo = [];

  // titulo do card
  const titulo = document.createElement("h2");
  titulo.innerText = "Criar conta";

  // campo de confirmacao de senha
  let textoAjuda =
    "Os dados ficam salvos apenas localmente no seu dispositivo, ";
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
      if (campoMsg.hasChildNodes()) {
        campoMsg.removeChild(campoMsg.children[0]);
      }
      const msg = gerMensagem("Esse nome de usuário já está em uso", "aviso");
      campoMsg.appendChild(msg);
    } else if (senhaForm !== senha2Form) {
      if (campoMsg.hasChildNodes()) {
        campoMsg.removeChild(campoMsg.children[0]);
      }
      const msg = gerMensagem("As senhas não correspondem", "aviso");
      campoMsg.appendChild(msg);
    } else {
      // cria data referente a dia atual mais um dia
      const data = new Date();
      data.setTime(data.getTime() + 8640000);

      // Cria uma tarefa padrão para novo usuário
      const novaTarefa = new Tarefa("Tarefa 1", data);

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
      gerVisualizacao(pagInicial(usuarios, usuarioAtivo));
    }
  }

  // link caso o usuario tenha conta
  const linkLogin = document.createElement("a");
  linkLogin.setAttribute("href", "#");
  linkLogin.innerText = "Faça login";
  linkLogin.addEventListener("click", () => {
    gerVisualizacao(pagLogin(usuarios));
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
export default pagCadastro;
