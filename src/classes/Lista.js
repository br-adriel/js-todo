class Lista {
  #criadaEm;
  constructor(usuario, nome, descricao) {
    this.usuario = usuario;
    this.nome = nome;
    this.descricao = descricao;
    this.tarefas = [];
    this.#criadaEm = new Date();
  }

  get criadaEm() {
    return this.#criadaEm;
  }
}

export default Lista;
