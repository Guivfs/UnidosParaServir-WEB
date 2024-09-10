class VagaModel {
  constructor(tituloVaga, descVaga, fotoVaga, idEmpresa, statusVaga, dataCriacao, valorPagamento, idUsuario = null) {
    this.tituloVaga = tituloVaga;
    this.descVaga = descVaga;
    this.fotoVaga = fotoVaga;
    this.idEmpresa = idEmpresa;
    this.statusVaga = statusVaga;
    this.dataCriacao = dataCriacao;
    this.valorPagamento = valorPagamento;
    this.idUsuario = idUsuario; 
  }
}

module.exports = VagaModel;
