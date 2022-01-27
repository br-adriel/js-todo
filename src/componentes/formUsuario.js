import { gerCampoForm } from "./geradoresHtml";

function formUsuario() {
  const campoMsg = document.createElement("div");
  campoMsg.setAttribute("id", "campoMsgForm");

  const campoUsuario = gerCampoForm("Usuário:", "text", "formUsuario", "", [
    ["minlength", "3"],
    ["required", "true"],
  ]);
  const campoSenha = gerCampoForm("Senha:", "password", "formSenha", "", [
    ["minlength", "8"],
    ["required", "true"],
  ]);

  const form = document.createElement("form");
  form.appendChild(campoMsg);
  form.appendChild(campoUsuario);
  form.appendChild(campoSenha);
  return form;
}

export default formUsuario;
