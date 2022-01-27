/* Gerador de campos de formulario */
function gerCampoForm(label, tipo, id, textoAjuda = "", obrigatorio = true) {
  const campo = document.createElement("div");

  const labelHtml = document.createElement("label");
  labelHtml.setAttribute("for", id);
  labelHtml.innerText = label;

  const inputHtml = document.createElement("input");
  inputHtml.setAttribute("type", tipo);
  inputHtml.setAttribute("id", id);
  if (obrigatorio) {
    inputHtml.setAttribute("required", "true");
  }

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

export { gerBotao, gerCampoForm, gerVisualizacao, gerMensagem };
