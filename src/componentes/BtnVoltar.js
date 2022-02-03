import { gerBotao, gerIcone } from "./geradoresHtml";

function btnVoltar() {
  const icone = gerIcone(["bi", "bi-arrow-left"]);

  const btnVoltar = gerBotao("button", "");
  btnVoltar.setAttribute("title", "Voltar");
  btnVoltar.appendChild(icone);
  return btnVoltar;
}

export default btnVoltar;
