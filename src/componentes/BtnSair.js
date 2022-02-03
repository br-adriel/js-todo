import pagLogin from "../paginas/Login";
import { gerBotao, gerVisualizacao } from "./geradoresHtml";

function btnSair(usuarios) {
  const btnSair = gerBotao("button", "Sair");
  btnSair.addEventListener("click", () => {
    gerVisualizacao(pagLogin(usuarios));
  });
  return btnSair;
}

export default btnSair;
