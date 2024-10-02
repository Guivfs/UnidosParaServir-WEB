class VagaModel {
  constructor(tituloVaga, descVaga, idEmpresa, statusVaga, dataCriacao, valorPagamento, localizacaoVaga) {
    this.tituloVaga = tituloVaga;
    this.descVaga = descVaga;
    this.idEmpresa = idEmpresa;
    this.statusVaga = statusVaga;
    this.dataCriacao = dataCriacao;
    this.valorPagamento = valorPagamento;
    this.localizacaoVaga = localizacaoVaga;
  }
}

module.exports = VagaModel;
