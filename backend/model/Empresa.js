class EmpresaModel {
    constructor(nomeEmpresa, emailEmpresa, senhaEmpresa, descEmpresa, CNPJEmpresa, razaoSocialEmpresa, areaAtuacaoEmpresa, numeroFuncionariosEmpresa, ramoEmpresa){
        this.nomeEmpresa = nomeEmpresa,
        this.emailEmpresa = emailEmpresa,
        this.senhaEmpresa = senhaEmpresa,
        this.descEmpresa = descEmpresa,
        this.CNPJEmpresa = CNPJEmpresa,
        this.razaoSocialEmpresa = razaoSocialEmpresa,
        this.areaAtuacaoEmpresa = areaAtuacaoEmpresa,
        this.numeroFuncionariosEmpresa = numeroFuncionariosEmpresa,
        this.ramoEmpresa = ramoEmpresa
    }
}

module.exports = EmpresaModel;