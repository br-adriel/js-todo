const armazenamento = (() => {
  function disponivel() {
    let storage;
    try {
      storage = window["localStorage"];
      let x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }

  function gravar(chave, valor) {
    if (disponivel()) {
      localStorage.setItem(chave, valor);
    }
  }

  function ler(chave) {
    if (disponivel()) {
      return localStorage.getItem(chave);
    }
  }

  function excluir(chave) {
    if (disponovel()) {
      localStorage.removeItem(chave);
    }
  }

  return { disponivel, gravar, ler, excluir };
})();

export default armazenamento;
