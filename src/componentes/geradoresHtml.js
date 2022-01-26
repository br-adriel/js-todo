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

export { gerBotao, gerCampoForm, gerVisualizacao };
