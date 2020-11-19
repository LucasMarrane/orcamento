class Orcamento {
    constructor(tam, config = { papel: "A4", quantidadePedida: 1, sangria: 0, valorPagina: 7.5 }) {
        this.Paper = {
            A0: { largura: 84.1, altura: 118.9 },
            A1: { largura: 59.4, altura: 84.1 },
            A2: { largura: 42, altura: 59.4 },
            A3: { largura: 29.7, altura: 42 },
            A4: { largura: 21, altura: 29.7 },
            A5: { largura: 14.8, altura: 21 },
            A6: { largura: 10.5, altura: 14.8 },
            A7: { largura: 7.4, altura: 10.5 },
        };
        this.Tamanho = tam;
        this.TamanhoInverso = { largura: tam.altura, altura: tam.largura };
        this.Papel = config.papel ? config.papel : "A4";
        this.Pedido = config.quantidadePedida ? config.quantidadePedida : 1;
        this.Valor = config.valorPagina ? config.valorPagina : 7.5;
        this.Sangria = config.sangria ? config.sangria : 0;
        this.TamanhoPapel = this.sangria(this.alturaELarguraReal());
        this.Config = config;
    }
    alturaELarguraReal() {
        return this.Paper[this.Papel.toUpperCase()];
    }
    sangria(tam) {
        return {
            altura: tam.altura - this.Sangria,
            largura: tam.largura - this.Sangria,
        };
    }
    quantidadePorPagina(tam) {
        let largura = Math.floor(this.TamanhoPapel.largura / tam.largura);
        let altura = Math.floor(this.TamanhoPapel.altura / tam.altura);
        let quantidade = largura * altura;
        let impressao = {
            altura: tam.altura,
            largura: tam.largura,
            info: { normal: 0, inverse: 0, total: 0 , largura: largura, altura: altura}
        };
        let larguraRestante = this.TamanhoPapel.largura - (largura * tam.largura);
        let alturaRestante = this.TamanhoPapel.altura - (altura * tam.altura);
        let inversePort = 0;
        if (alturaRestante > tam.largura) {
            largura = Math.floor(alturaRestante / tam.largura);
            altura = Math.floor(this.TamanhoPapel.largura / tam.altura);
            inversePort = largura * altura;
        }
        let inverseLand = 0;
        if (larguraRestante > tam.altura) {
            largura = Math.floor(this.TamanhoPapel.altura / tam.largura);
            altura = Math.floor(larguraRestante / tam.altura);
            inverseLand = largura * altura;
        }
        let realocado = inverseLand >= inversePort ? inverseLand : inversePort;
        impressao.info.normal = quantidade;
        impressao.info.inverse = { side: inverseLand, bottom: inversePort };
        impressao.info.papel = this.TamanhoPapel;
        impressao.info.total = quantidade + realocado;
        return impressao;
    }
    getQuantidadePorPaginaRetrato() {
        return this.quantidadePorPagina(this.Tamanho);
    }
    getQuantidadePorPaginaPaisagem() {
        return this.quantidadePorPagina(this.TamanhoInverso);
    }
    getQuantidadeDePaginasRetrato() {
        return this.Pedido / this.getQuantidadePorPaginaRetrato().info.total;
    }
    getQuantidadeDePaginasPaisagem() {
        return this.Pedido / this.getQuantidadePorPaginaPaisagem().info.total;
    }
    getQuantidadeDePaginasArredondadasRetrato() {
        return Math.ceil(this.Pedido / this.getQuantidadePorPaginaRetrato().info.total);
    }
    getQuantidadeDePaginasArredondadasPaisagem() {
        return Math.ceil(this.Pedido / this.getQuantidadePorPaginaPaisagem().info.total);
    }
    getValorRetrato() {
        return this.getQuantidadeDePaginasArredondadasRetrato() * this.Valor;
    }
    getValorPaisagem() {
        return this.getQuantidadeDePaginasArredondadasPaisagem() * this.Valor;
    }
    getValorUnitarioRetrato() {
        return this.getValorRetrato() / this.Pedido;
    }
    getValorUnitarioPaisagem() {
        return this.getValorPaisagem() / this.Pedido;
    }
    getTamanho() {
        return this.Tamanho;
    }
    getTamanhoInverso() {
        return this.TamanhoInverso;
    }
    TamamanhoReduzido(reducao, tam = this.getTamanho()) {
        var tamanho = { largura: tam.largura, altura: tam.altura };
        var ratio = tamanho.largura / tamanho.altura;
        tamanho.largura -= reducao;
        tamanho.altura = tamanho.largura / ratio;
        return new Orcamento(tamanho, this.Config);
    }
}