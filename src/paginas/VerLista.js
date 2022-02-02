import { barraAcao } from "../componentes/BarraAcoes";
import { gerBotao } from "../componentes/geradoresHtml";

function gerarTarefaHtml(tarefa) {
  // titulo da tarefa
  const titulo = document.createElement("p");
  titulo.innerText = tarefa.titulo;
  titulo.classList.add("nome-tarefa");

  // data de conclusao da tarefa
  const data = document.createElement("p");
  data.classList.add("data-tarefa");

  // div para os textos da tarefa
  const texto = document.createElement("div");
  texto.classList.add("texto");
  texto.appendChild(titulo);
  texto.appendChild(data);

  // botao de concluir tarefa
  const iconeBotao = document.createElement("i");
  const btnCheck = gerBotao("button", "");

  if (tarefa.concluida) {
    tarefaHtml.classList.add("concluida");

    iconeBotao.classList.add("bi", "bi-check2-square");

    btnCheck.appendChild(iconeBotao);
    btnCheck.setAttribute("title", "Marcar como não concluida");
  } else {
    iconeBotao.classList.add("bi", "bi-square");

    btnCheck.appendChild(iconeBotao);
    btnCheck.setAttribute("title", "Marcar como concluida");
  }

  // div da tarefa
  const tarefaHtml = document.createElement("div");
  tarefaHtml.classList.add("tarefa");
  tarefaHtml.appendChild(btnCheck);
  tarefaHtml.appendChild(texto);
  return tarefaHtml;
}

function gerarListaTarefasHtml(lista) {
  // nome da lista
  const h2 = document.createElement("h2");
  h2.innerText = lista.nome;

  // descricao da lista
  const desc = document.createElement("p");
  desc.innerText = lista.descricao;

  // listagem de tarefas
  const listaTarefas = document.createElement("div");
  listaTarefas.classList.add("listagem-tarefas");

  lista.tarefas.map((tarefa) => {
    listaTarefas.appendChild(gerarTarefaHtml(tarefa));
  });

  const listaHtml = document.createElement("div");
  listaHtml.appendChild(h2);
  listaHtml.appendChild(desc);
  listaHtml.appendChild(listaTarefas);
  return listaHtml;
}

function pagVerLista(lista, usuarios, usuarioAtivo) {
  // botao nova tarefa
  const btnNovatarefa = gerBotao("button", "Nova tarefa");

  // barra de acoes
  const barra = barraAcao(usuarios, usuarioAtivo);
  barra.appendChild(btnNovatarefa);

  const listaHtml = gerarListaTarefasHtml(lista);
  listaHtml.classList.add("tarefas");

  // card da visualizacao da lista
  const card = document.createElement("div");
  card.classList.add("card");
  card.appendChild(listaHtml);

  // div para guardar o conteudo da pagina
  const div = document.createElement("div");
  div.classList.add("conteudo");
  div.appendChild(card);

  // Section da pagina de ver lista
  const paginaVerLista = document.createElement("section");
  paginaVerLista.setAttribute("id", "paginaVerLista");
  paginaVerLista.appendChild(barra);
  paginaVerLista.appendChild(div);

  return paginaVerLista;
}

export default pagVerLista;
