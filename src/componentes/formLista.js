import { gerCampoForm } from "./geradoresHtml";

function formLista(titulo = "") {
  const h2 = document.createElement("h2");
  h2.innerText = titulo;

  const campoMsg = document.createElement("div");
  campoMsg.setAttribute("id", "campoMsgForm");

  const campoNome = gerCampoForm(
    "Nome da lista:",
    "text",
    "formNomeLista",
    "",
    [
      ["minlength", "3"],
      ["required", "true"],
      ["name", "nome-lista"],
    ]
  );
  const campoDescricao = gerCampoForm(
    "Descrição:",
    "text",
    "formDescricaoLista",
    "",
    [
      ["maxlength", "100"],
      ["name", "descricao-lista"],
    ]
  );

  const form = document.createElement("form");
  form.appendChild(h2);
  form.appendChild(campoMsg);
  form.appendChild(campoNome);
  form.appendChild(campoDescricao);
  return form;
}

export default formLista;
