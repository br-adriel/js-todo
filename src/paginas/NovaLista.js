import formLista from "../componentes/formLista";
import { gerBotao, gerVisualizacao } from "../componentes/geradoresHtml";
import Lista from "../classes/Lista";
import barraAcao from "../componentes/BarraAcoes";
import pagInicial from "./Inicio";
import btnSair from "../componentes/BtnSair";
import btnVoltar from "../componentes/BtnVoltar";

function pagNovaLista(usuarios, usuarioAtivo) {
  // form de nova lista
  const btnSubmit = gerBotao("submit", "Salvar");

  const form = formLista("Nova lista");
  form.appendChild(btnSubmit);
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Cria a nova lista
    const novaLista = new Lista(
      form["nome-lista"].value,
      form["descricao-lista"].value
    );

    // Adiciona lista ao usuario
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].username === usuarioAtivo[0].username) {
        usuarios[i].listas.push(novaLista);
        usuarioAtivo.pop();
        usuarioAtivo.push(usuarios[i]);
        break;
      }
    }

    // Volta para pagina inicial
    gerVisualizacao(pagInicial(usuarios, usuarioAtivo));
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
    gerVisualizacao(pagInicial(usuarios, usuarioAtivo));
  });

  const sair = btnSair(usuarios);

  const barra = barraAcao();
  barra.appendChild(voltar);
  barra.appendChild(sair);

  // Section da pagina de nova lista
  const paginaNovaLista = document.createElement("section");
  paginaNovaLista.setAttribute("id", "paginaNovaLista");
  paginaNovaLista.appendChild(barra);
  paginaNovaLista.appendChild(div);
  return paginaNovaLista;
}

export default pagNovaLista;
