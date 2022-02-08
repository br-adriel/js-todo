import armazenamento from "../armazenamento";
import barraAcao from "../componentes/BarraAcoes";
import btnSair from "../componentes/BtnSair";
import btnVoltar from "../componentes/BtnVoltar";
import {
  gerBotao,
  gerCampoForm,
  gerMensagem,
  gerVisualizacao,
} from "../componentes/geradoresHtml";
import pagInicial from "./Inicio";

function pagPerfil(usuarios, usuarioAtivo) {
  // botao excluir conta
  const btnExcluir = gerBotao("button", "Excluir conta");
  btnExcluir.classList.add("excluir-conta");
  btnExcluir.addEventListener("click", () => {
    usuarios = usuarios.filter((u) => u.usuario !== usuarioAtivo[0].usuario);
    armazenamento.gravar("usuarios", JSON.stringify(usuarios));

    gerVisualizacao(pagLogin(usuarios));
  });

  // botao voltar
  const voltar = btnVoltar();
  voltar.addEventListener("click", () => {
    gerVisualizacao(pagInicial(usuarios, usuarioAtivo));
  });

  // botao sair
  const sair = btnSair();

  // barra de acoes
  const barra = barraAcao();
  barra.appendChild(voltar);
  barra.appendChild(sair);
  barra.appendChild(btnExcluir);

  const cardUsuario = cardEditarUsuario(usuarios, usuarioAtivo);
  const cardSenha = cardEditarSenha(usuarios, usuarioAtivo);

  // div com conteudo
  const div = document.createElement("div");
  div.classList.add("conteudo");
  div.appendChild(cardUsuario);
  div.appendChild(cardSenha);

  // pagina
  const pagPerfil = document.createElement("section");
  pagPerfil.setAttribute("id", "paginaPerfil");
  pagPerfil.appendChild(barra);
  pagPerfil.appendChild(div);

  return pagPerfil;
}

function cardEditarUsuario(usuarios, usuarioAtivo) {
  const campoUsuario = gerCampoForm("Usuário:", "text", "novoUsuarioForm", "", [
    ["name", "usuario"],
    ["minlength", "3"],
    ["value", usuarioAtivo[0].usuario],
    ["required", "true"],
  ]);
  const btnUsuario = gerBotao("submit", "Salvar usuário");

  const campoMsg = document.createElement("div");
  campoMsg.setAttribute("id", "campoMsgUsuario");

  const formUsuario = document.createElement("form");
  formUsuario.appendChild(campoUsuario);
  formUsuario.appendChild(btnUsuario);

  formUsuario.addEventListener("submit", (e) => {
    e.preventDefault();

    let usus = [];
    usus = usuarios.filter((u) => u.usuario === formUsuario["usuario"].value);

    if (usus.length > 0) {
      if (campoMsg.hasChildNodes()) {
        campoMsg.removeChild(campoMsg.childNodes[0]);
      }
      campoMsg.appendChild(gerMensagem("Esse usuario já esta em uso", "aviso"));
    } else {
      for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].usuario === usuarioAtivo[0].usuario) {
          usuarios[i].usuario = formUsuario["usuario"].value;
          usuarioAtivo[0].usuario = formUsuario["usuario"].value;

          if (campoMsg.hasChildNodes()) {
            campoMsg.removeChild(campoMsg.childNodes[0]);
          }
          campoMsg.appendChild(gerMensagem("Usuário alterado", "sucesso"));

          armazenamento.gravar("usuarios", JSON.stringify(usuarios));
        }
      }
    }
  });

  // titulo da pagina
  const h2 = document.createElement("h2");
  h2.innerText = "Alterar usuário";

  // card usuario
  const cardUsuario = document.createElement("div");
  cardUsuario.classList.add("card");
  cardUsuario.appendChild(h2);
  cardUsuario.appendChild(campoMsg);
  cardUsuario.appendChild(formUsuario);
  return cardUsuario;
}

function cardEditarSenha(usuarios, usuarioAtivo) {
  const campoSenha = gerCampoForm(
    "Nova senha:",
    "password",
    "novaSenhaForm",
    "",
    [
      ["name", "nova-senha"],
      ["minlength", "8"],
      ["required", "true"],
    ]
  );

  const campoSenha2 = gerCampoForm(
    "Confirme a nova senha:",
    "password",
    "novaSenha2Form",
    "",
    [
      ["name", "nova-senha2"],
      ["minlength", "8"],
      ["required", "true"],
    ]
  );

  const campoSenhaAntiga = gerCampoForm(
    "Senha atual:",
    "password",
    "senhaAntigaForm",
    "",
    [
      ["name", "senha-atual"],
      ["minlength", "8"],
      ["required", "true"],
    ]
  );

  const btnSenha = gerBotao("submit", "Alterar senha");

  const campoMsg = document.createElement("div");
  campoMsg.setAttribute("id", "campoMsgSenha");

  const formSenha = document.createElement("form");
  formSenha.appendChild(campoSenha);
  formSenha.appendChild(campoSenha2);
  formSenha.appendChild(campoSenhaAntiga);
  formSenha.appendChild(btnSenha);

  formSenha.addEventListener("submit", (e) => {
    e.preventDefault();

    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].usuario === usuarioAtivo[0].usuario) {
        if (formSenha["senha-atual"].value === usuarios[i].senha) {
          if (
            formSenha["nova-senha"].value === formSenha["nova-senha2"].value
          ) {
            usuarios[i].senha = formSenha["nova-senha"].value;
            usuarioAtivo[0].senha = formSenha["nova-senha"].value;

            if (campoMsg.hasChildNodes()) {
              campoMsg.removeChild(campoMsg.childNodes[0]);
            }
            campoMsg.appendChild(gerMensagem("Senha alterada", "sucesso"));

            armazenamento.gravar("usuarios", JSON.stringify(usuarios));
          } else {
            if (campoMsg.hasChildNodes()) {
              campoMsg.removeChild(campoMsg.childNodes[0]);
            }
            campoMsg.appendChild(
              gerMensagem("As novas senhas não correspondem", "aviso")
            );
          }
        } else {
          if (campoMsg.hasChildNodes()) {
            campoMsg.removeChild(campoMsg.childNodes[0]);
          }
          campoMsg.appendChild(
            gerMensagem("A senha atual não corresponde", "erro")
          );
        }
      }
    }
  });

  // titulo do card
  const h2 = document.createElement("h2");
  h2.innerText = "Alterar senha";

  // card senha
  const cardSenha = document.createElement("div");
  cardSenha.classList.add("card");
  cardSenha.appendChild(h2);
  cardSenha.appendChild(campoMsg);
  cardSenha.appendChild(formSenha);
  return cardSenha;
}

export default pagPerfil;
