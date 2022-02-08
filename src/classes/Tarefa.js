class Tarefa {
  constructor(titulo, dataConclusao) {
    this.titulo = titulo;
    this.dataConclusao = dataConclusao;
    this.prioridade = 0;
    this.concluida = false;
    this.criadaEm = JSON.parse(JSON.stringify(new Date()));
  }
}

export default Tarefa;
