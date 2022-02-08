import "./index.css";
import pagLogin from "./paginas/Login";

const conteudo = document.getElementById("content");
conteudo.appendChild(pagLogin([]));

const footer = document.querySelector("footer p");
footer.innerText = `Adriel Faria, ${new Date().getFullYear()}`;
