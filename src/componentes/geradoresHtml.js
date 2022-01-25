function gerCampoForm(label, tipo, id, textoAjuda = "") {
  const campo = document.createElement("div");
  campo.classList.add("campo-form");

  const labelHtml = document.createElement("label");
  labelHtml.setAttribute("for", id);
  labelHtml.innerText = label;

  const inputHtml = document.createElement("input");
  inputHtml.setAttribute("type", tipo);
  inputHtml.setAttribute("id", id);

  const ajudaHtml = document.createElement("p");
  ajudaHtml.innerText = textoAjuda;
  ajudaHtml.classList.add("form-ajuda");

  campo.appendChild(labelHtml);
  campo.appendChild(inputHtml);
  campo.appendChild(ajudaHtml);

  return campo;
}

export { gerCampoForm };
