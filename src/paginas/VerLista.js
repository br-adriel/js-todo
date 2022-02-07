import barraAcao from "../componentes/BarraAcoes";
import {
  gerBotao,
  gerVisualizacao,
  gerIcone,
} from "../componentes/geradoresHtml";
import pagnovaTarefa from "./NovaTarefa";
import btnVoltar from "../componentes/BtnVoltar";
import btnSair from "../componentes/BtnSair";
import pagInicial from "./Inicio";
import { formatDistance } from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR/index.js";
import armazenamento from "../armazenamento";

function gerarTarefaHtml(tarefa, lista, usuarios, usuarioAtivo) {
  // titulo da tarefa
  const titulo = document.createElement("p");
  titulo.classList.add("nome-tarefa");
  titulo.innerText = tarefa.titulo;

  if (tarefa.prioridade === 1) {
    const iconeUrgente = gerIcone(["bi", "bi-exclamation-diamond"]);
    iconeUrgente.setAttribute("title", "Urgente");
    titulo.append(iconeUrgente);
  }

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
  btnCheck.addEventListener("click", () => {
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].username === usuarioAtivo[0].username) {
        for (let j = 0; j < usuarios[i].listas.length; j++) {
          if (usuarios[i].listas[j].criadaEm === lista.criadaEm) {
            for (let k = 0; k < usuarios[i].listas[j].tarefas.length; k++) {
              if (
                usuarios[i].listas[j].tarefas[k].criadaEm === tarefa.criadaEm
              ) {
                usuarios[i].listas[j].tarefas[k].concluida = !tarefa.concluida;

                usuarioAtivo.pop();
                usuarioAtivo.push(usuarios[i]);

                armazenamento.gravar("usuarios", JSON.stringify(usuarios));

                gerVisualizacao(
                  pagVerLista(usuarios[i].listas[j], usuarios, usuarioAtivo)
                );
              }
            }
          }
        }
      }
    }
  });

  // div da tarefa
  const tarefaHtml = document.createElement("div");
  if (tarefa.concluida) {
    tarefaHtml.classList.add("concluida");

    iconeBotao.classList.add("bi", "bi-check2-square");

    btnCheck.appendChild(iconeBotao);
    btnCheck.setAttribute("title", "Marcar como não concluida");

    data.innerText = "Concluida";
  } else {
    iconeBotao.classList.add("bi", "bi-square");

    btnCheck.appendChild(iconeBotao);
    btnCheck.setAttribute("title", "Marcar como concluida");

    data.innerText = formatDistance(tarefa.dataConclusao, new Date(), {
      locale: ptBR,
      addSuffix: true,
    });
  }

  tarefaHtml.classList.add("tarefa");
  tarefaHtml.appendChild(btnCheck);
  tarefaHtml.appendChild(texto);
  return tarefaHtml;
}

function gerarListaTarefasHtml(lista, usuarios, usuarioAtivo) {
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
    listaTarefas.appendChild(
      gerarTarefaHtml(tarefa, lista, usuarios, usuarioAtivo)
    );
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
  btnNovatarefa.addEventListener("click", () =>
    gerVisualizacao(pagnovaTarefa(lista, usuarios, usuarioAtivo))
  );

  // barra de acoes
  const voltar = btnVoltar();
  voltar.addEventListener("click", () => {
    gerVisualizacao(pagInicial(usuarios, usuarioAtivo));
  });

  const sair = btnSair(usuarios);

  const barra = barraAcao();
  barra.appendChild(voltar);
  barra.appendChild(sair);
  barra.appendChild(btnNovatarefa);

  const listaHtml = gerarListaTarefasHtml(lista, usuarios, usuarioAtivo);
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
