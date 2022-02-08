class Lista {
  constructor(nome, descricao = "") {
    this.nome = nome;
    this.descricao = descricao;
    this.tarefas = [];
    this.criadaEm = JSON.parse(JSON.stringify(new Date()));
  }
}

export default Lista;
