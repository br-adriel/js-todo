class Tarefa {
  #criadaEm;
  constructor(titulo, descricao, dataConclusao, lista) {
    this.titulo = titulo;
    this.descricao = descricao;
    this.dataConclusao = dataConclusao;
    this.lista = lista;
    this.prioridade = 0;
    this.concluida = false;
    this.#criadaEm = new Date();
  }

  get criadaEm() {
    return this.#criadaEm;
  }
}

export default Tarefa;
