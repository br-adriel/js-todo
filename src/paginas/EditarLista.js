import formLista from "../componentes/formLista";
import { gerBotao, gerVisualizacao } from "../componentes/geradoresHtml";
import pagInicial from "./Inicio";
import barraAcao from "../componentes/BarraAcoes";
import btnSair from "../componentes/BtnSair";
import btnVoltar from "../componentes/BtnVoltar";
import armazenamento from "../armazenamento";

// Página para editar lista de tarefas
function pagEditarLista(lista, usuarios, usuarioAtivo) {
  // barra de acoes
  const voltar = btnVoltar();
  voltar.addEventListener("click", () => {
    gerVisualizacao(pagInicial(usuarios, usuarioAtivo));
  });

  const sair = btnSair(usuarios);

  const barra = barraAcao();
  barra.appendChild(voltar);
  barra.appendChild(sair);

  // form de nova lista
  const btnSubmit = gerBotao("submit", "Atualizar");

  const form = formLista("Editar lista");
  form.appendChild(btnSubmit);
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Adiciona lista ao usuario
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].username === usuarioAtivo[0].username) {
        for (let j = 0; j < usuarios[i].listas.length; j++) {
          if (usuarios[i].listas[j].criadaEm === lista.criadaEm) {
            usuarios[i].listas[j].nome = form["nome-lista"].value;
            usuarios[i].listas[j].descricao = form["descricao-lista"].value;

            usuarioAtivo.pop();
            usuarioAtivo.push(usuarios[i]);

            armazenamento.gravar("usuarios", JSON.stringify(usuarios));

            gerVisualizacao(pagInicial(usuarios, usuarioAtivo));
          }
        }
      }
    }
  });

  // Carrega o conteudo atual da lista
  form["nome-lista"].value = lista.nome;
  form["descricao-lista"].value = lista.descricao;

  // card para o form
  const card = document.createElement("div");
  card.classList.add("card");
  card.appendChild(form);

  // div para guardar o conteudo da pagina
  const div = document.createElement("div");
  div.classList.add("conteudo");
  div.appendChild(card);

  // Section da pagina de nova lista
  const paginaEditarLista = document.createElement("section");
  paginaEditarLista.setAttribute("id", "paginaEditarLista");
  paginaEditarLista.appendChild(barra);
  paginaEditarLista.appendChild(div);

  return paginaEditarLista;
}

export default pagEditarLista;
