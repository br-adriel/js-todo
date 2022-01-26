import { gerCampoForm } from "./geradoresHtml";

function formUsuario() {
  const campoUsuario = gerCampoForm("Usuário:", "text", "formUsuario");
  const campoSenha = gerCampoForm("Senha:", "password", "formSenha");

  const form = document.createElement("form");
  form.appendChild(campoUsuario);
  form.appendChild(campoSenha);
  return form;
}

export default formUsuario;
