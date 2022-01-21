class Usuario {
  #senha;
  constructor(usuario, nome, senha) {
    this.nome = nome;
    this.usuario = usuario;
    this.#senha = senha;
  }

  set senha(senhaAtual, novaSenha) {
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