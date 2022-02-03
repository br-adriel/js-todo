import { gerCampoForm, gerSelect } from "./geradoresHtml";

function formTarefa(titulo = "") {
  const h2 = document.createElement("h2");
  h2.innerText = titulo;

  const campoMsg = document.createElement("div");
  campoMsg.setAttribute("id", "campoMsgForm");

  const campoTitulo = gerCampoForm(
    "Nome da tarefa:",
    "text",
    "fromTitulo",
    "",
    [
      ["minlength", "3"],
      ["required", "true"],
      ["name", "titulo-tarefa"],
    ]
  );
  const dataConclusao = gerCampoForm(
    "Data de conclusão:",
    "date",
    "formDataConclusao",
    "",
    [
      ["name", "conclusao-tarefa"],
      ["required", "true"],
    ]
  );

  const prioridade = gerSelect(
    "Prioridade:",
    "formPrioridade",
    "prioridade-tarefa",
    [
      ["Comum", "0"],
      ["Urgente", "1"],
    ]
  );

  const form = document.createElement("form");
  form.appendChild(h2);
  form.appendChild(campoMsg);
  form.appendChild(campoTitulo);
  form.appendChild(dataConclusao);
  form.appendChild(prioridade);
  return form;
}

export default formTarefa;
