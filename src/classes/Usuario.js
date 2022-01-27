class Usuario {
  #senha;
  constructor(usuario, senha) {
    this.usuario = usuario;
    this.listas = [];
    this.#senha = senha;
  }

  mudarSenha(senhaAtual, novaSenha) {
    if (senhaAtual === this.#senha) {
      this.#senha = novaSenha;
    }
  }

  login(senha) {
    if (senha === this.#senha) {
      return true;
    }
    return false;
  }
}

export default Usuario;
