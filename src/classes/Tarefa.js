class Tarefa {
  #criadaEm;
  constructor(titulo, descricao, dataConclusao) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.dataConclusao = dataConclusao;
    this.prioridade = 0;
    this.concluida = false;
    this.#criadaEm = new Date();
  }

  get criadaEm() {
    return this.#criadaEm;
  }
}

export default Tarefa;
