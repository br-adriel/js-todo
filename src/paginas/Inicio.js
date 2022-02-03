import {
  gerBotao,
  gerVisualizacao,
  gerIcone,
} from "../componentes/geradoresHtml";
import pagNovaLista from "./NovaLista";
import pagEditarLista from "./EditarLista";
import pagVerLista from "./VerLista";
import barraAcao from "../componentes/BarraAcoes";
import btnSair from "../componentes/BtnSair";

function gerarListaHtml(lista) {
  const listaHtml = document.createElement("div");
  listaHtml.classList.add("card");

  const h3 = document.createElement("h3");
  h3.innerText = lista.nome;

  const p = document.createElement("p");
  p.innerText = lista.descricao;

  const contagem = document.createElement("p");
  switch (lista.tarefas.length) {
    case 1:
      contagem.innerText = `${lista.tarefas.length} tarefa`;
      break;
    default:
      contagem.innerText = `${lista.tarefas.length} tarefas`;
  }

  const conteudo = document.createElement("div");
  conteudo.classList.add("conteudo");

  conteudo.appendChild(h3);
  conteudo.appendChild(contagem);
  conteudo.appendChild(p);

  listaHtml.appendChild(conteudo);
  return listaHtml;
}

function pagInicial(usuarios, usuarioAtivo) {
  // botao nova tarefa
  const icone = gerIcone(["bi", "bi-plus"]);

  const btnNovaLista = gerBotao("button", "");
  btnNovaLista.setAttribute("title", "Nova lista");
  btnNovaLista.appendChild(icone);
  btnNovaLista.addEventListener("click", () => {
    gerVisualizacao(pagNovaLista(usuarios, usuarioAtivo));
  });

  // barra de acoes
  const barra = barraAcao();
  barra.appendChild(btnNovaLista);
  barra.appendChild(btnSair(usuarios));

  // Div para as listas do usuario
  const listas = document.createElement("div");
  listas.classList.add("listas");

  function excluirLista(dataCriacao) {
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].username === usuarioAtivo[0].username) {
        usuarios[i].listas = usuarios[i].listas.filter(
          (lista) => lista.criadaEm !== dataCriacao
        );
        usuarioAtivo.pop();
        usuarioAtivo.push(usuarios[i]);
        break;
      }
    }
    gerVisualizacao(pagInicial(usuarios, usuarioAtivo));
  }

  function verLista(lista) {
    gerVisualizacao(pagVerLista(lista, usuarios, usuarioAtivo));
  }

  // Gera html das listas do usuario e adiciona na div
  usuarioAtivo[0].listas.map((lista) => {
    // Botao visualizar
    const iconeVer = gerIcone(["bi", "bi-eye"]);

    const btnVer = gerBotao("button", "");
    btnVer.setAttribute("title", "Visualizar lista");
    btnVer.appendChild(iconeVer);
    btnVer.addEventListener("click", () => verLista(lista));

    // Botao editar
    const iconeEditar = gerIcone(["bi", "bi-pen"]);

    const btnEditar = gerBotao("button", "");
    btnEditar.setAttribute("title", "Editar lista");
    btnEditar.appendChild(iconeEditar);
    btnEditar.addEventListener("click", () => {
      gerVisualizacao(pagEditarLista(lista, usuarios, usuarioAtivo));
    });

    // Botao apagar
    const iconeApagar = gerIcone(["bi", "bi-trash"]);

    const btnApagar = gerBotao("button", "");
    btnApagar.setAttribute("title", "Apagar lista");
    btnApagar.appendChild(iconeApagar);
    btnApagar.addEventListener("click", () => excluirLista(lista.criadaEm));

    // Div com os botões
    const divBotoes = document.createElement("div");
    divBotoes.classList.add("botoes");
    divBotoes.appendChild(btnVer);
    divBotoes.appendChild(btnEditar);
    divBotoes.appendChild(btnApagar);

    const listaHtml = gerarListaHtml(lista);
    listaHtml.appendChild(divBotoes);

    listas.appendChild(listaHtml);
  });

  // Section da pagina inicial
  const paginaInicial = document.createElement("section");
  paginaInicial.setAttribute("id", "paginaInicial");
  paginaInicial.appendChild(barra);
  paginaInicial.appendChild(listas);
  return paginaInicial;
}

export default pagInicial;
