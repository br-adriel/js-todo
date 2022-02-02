import { gerIcone, gerBotao, gerVisualizacao } from "./geradoresHtml";
import pagInicial from "../paginas/Inicio";
import pagLogin from "../paginas/Login";

function barraAcao(usuarios, usuarioAtivo) {
  const icone = gerIcone(["bi", "bi-arrow-left"]);

  const btnVoltar = gerBotao("button", "");
  btnVoltar.setAttribute("title", "Voltar");
  btnVoltar.appendChild(icone);
  btnVoltar.addEventListener("click", () => {
    gerVisualizacao(pagInicial(usuarios, usuarioAtivo));
  });

  // botao sair
  const btnSair = gerBotao("button", "Sair");
  btnSair.addEventListener("click", () => {
    gerVisualizacao(pagLogin(usuarios));
  });

  // barra de acoes
  const barra = document.createElement("div");
  barra.classList.add("barraAcoes");
  barra.appendChild(btnVoltar);
  barra.appendChild(btnSair);
  return barra;
}

export { barraAcao };
