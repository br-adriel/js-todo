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

/* Gera selects para forms */
function gerSelect(label, id, name, options = []) {
  const campo = document.createElement("div");

  const labelHtml = document.createElement("label");
  labelHtml.setAttribute("for", id);
  labelHtml.innerText = label;

  const select = document.createElement("select");
  select.setAttribute("name", name);
  select.setAttribute("id", id);

  options.map((opt) => {
    const option = document.createElement("option");
    option.innerText = opt[0];
    option.setAttribute("value", opt[1]);

    select.appendChild(option);
  });

  campo.appendChild(labelHtml);
  campo.appendChild(select);
  return campo;
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
  gerIcone,
  gerSelect,
};
