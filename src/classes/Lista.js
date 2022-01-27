class Lista {
  #criadaEm;
  constructor(nome, descricao = "") {
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
