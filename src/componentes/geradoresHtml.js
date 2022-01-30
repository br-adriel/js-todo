/* Gerador de campos de formulario */
function gerCampoForm(label, tipo, id, textoAjuda, atributos = []) {
  const campo = document.createElement("div");

  const labelHtml = document.createElement("label");
  labelHtml.setAttribute("for", id);
  labelHtml.innerText = label;

  const inputHtml = document.createElement("input");
  inputHtml.setAttribute("type", tipo);
  inputHtml.setAttribute("id", id);
  atributos.map((attr) => {
    inputHtml.setAttribute(attr[0], attr[1]);
  });

  const ajudaHtml = document.createElement("p");
  ajudaHtml.innerText = textoAjuda;
  ajudaHtml.classList.add("form-ajuda");

  campo.appendChild(labelHtml);
  campo.appendChild(inputHtml);
  campo.appendChild(ajudaHtml);

  return campo;
}

/* Gerador de botoes html */
function gerBotao(tipo, conteudo) {
  const btn = document.createElement("button");
  btn.setAttribute("type", tipo);
  btn.innerText = conteudo;
  return btn;
}

/* Gera a nova pagina e remove a anteriro */
function gerVisualizacao(novaPagina) {
  const main = document.getElementById("content");
  main.appendChild(novaPagina);
  main.firstChild.style.display = "none";
  main.removeChild(main.firstChild);
  main.firstChild.style.display = "flex";
}

/* Gera mensagem sobre situação de formulário e outros elementos */
function gerMensagem(mensagem, tipo) {
  const p = document.createElement("p");
  p.innerText = mensagem;

  const msgHtml = document.createElement("div");
  msgHtml.classList.add("msg");
  msgHtml.appendChild(p);
  switch (tipo) {
    case "sucesso":
    case "aviso":
    case "erro":
      msgHtml.classList.add(tipo);
      break;
  }
  return msgHtml;
}

/* Gera html para Lista de tarefas  */
function gerLista(lista) {
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

/* Gerador de ícones */
function gerIcone(classes = []) {
  const icone = document.createElement("i");
  icone.classList.add(...classes);
  return icone;
}

export {
  gerBotao,
  gerCampoForm,
  gerVisualizacao,
  gerMensagem,
  gerLista,
  gerIcone,
};
