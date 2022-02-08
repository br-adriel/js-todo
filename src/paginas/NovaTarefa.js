import { gerBotao, gerVisualizacao } from "../componentes/geradoresHtml";
import Tarefa from "../classes/Tarefa";
import barraAcao from "../componentes/BarraAcoes";
import formTarefa from "../componentes/formTarefa";
import btnVoltar from "../componentes/BtnVoltar";
import pagVerLista from "./VerLista";
import btnSair from "../componentes/BtnSair";
import armazenamento from "../armazenamento";

function pagNovaTarefa(lista, usuarios, usuarioAtivo) {
  // form de nova lista
  const btnSubmit = gerBotao("submit", "Salvar");

  const form = formTarefa("Nova tarefa");
  form.appendChild(btnSubmit);
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dataForm = form["conclusaod-tarefa"].value.split("-");
    const ano = dataForm[0];
    const mes = dataForm[1] - 1;
    const dia = dataForm[2];

    const horaForm = form["conclusaoh-tarefa"].value.split(":");
    const hora = horaForm[0];
    const min = horaForm[1];

    // Cria a nova tarefa
    const novaTarefa = new Tarefa(
      form["titulo-tarefa"].value,
      JSON.parse(JSON.stringify(new Date(ano, mes, dia, hora, min)))
    );
    novaTarefa.prioridade = parseInt(form["prioridade-tarefa"].value);

    // Adiciona tarefa a lista
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].username === usuarioAtivo[0].username) {
        for (let j = 0; j < usuarios[i].listas.length; j++) {
          if (usuarios[i].listas[j].criadaEm === lista.criadaEm) {
            usuarios[i].listas[j].tarefas.push(novaTarefa);

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

    // Volta para pagina inicial
  });

  // card para o form
  const card = document.createElement("div");
  card.classList.add("card");
  card.appendChild(form);

  // div para guardar o conteudo da pagina
  const div = document.createElement("div");
  div.classList.add("conteudo");
  div.appendChild(card);

  // barra de acoes
  const voltar = btnVoltar();
  voltar.addEventListener("click", () => {
    gerVisualizacao(pagVerLista(lista));
  });

  const sair = btnSair(usuarios);

  const barra = barraAcao();
  barra.appendChild(voltar);
  barra.appendChild(sair);

  // Section da pagina de nova lista
  const paginanovaTarefa = document.createElement("section");
  paginanovaTarefa.setAttribute("id", "paginanovaTarefa");
  paginanovaTarefa.appendChild(barra);
  paginanovaTarefa.appendChild(div);
  return paginanovaTarefa;
}

export default pagNovaTarefa;
