/**
 * Orçamento:
 * Redução: aspectRatio = (width/height)
 * (newWidth / aspectRatio) = newHeight || (newHeight * aspectRatio) = newWidth
 */
var Orcamento = /** @class */ (function () {
    function Orcamento(tam, papel, quantidadePedida, valorPagina) {
        if (quantidadePedida === void 0) { quantidadePedida = 1; }
        if (valorPagina === void 0) { valorPagina = 6.5; }
        this.Paper = {
            A0: { largura: 84.1, altura: 118.9 },
            A1: { largura: 59.4, altura: 84.1 },
            A2: { largura: 42, altura: 59.4 },
            A3: { largura: 29.7, altura: 42 },
            A4: { largura: 21, altura: 29.7 },
            A5: { largura: 14.8, altura: 21 },
            A6: { largura: 10.5, altura: 14.8 },
            A7: { largura: 7.4, altura: 10.5 }
        };
        this.Tamanho = tam;
        this.Papel = papel;
        this.TamanhoPapel = this.alturaELarguraReal();
        this.Pedido = quantidadePedida;
        this.Valor = valorPagina;
        this.TamanhoReduzido = tam;
    }
    Orcamento.prototype.alturaELarguraReal = function () {
        return this.Paper[this.Papel.toUpperCase()];
    };
    Orcamento.prototype.sangria = function (sangria) {
        if (sangria === void 0) { sangria = 1; }
        return {
            altura: this.TamanhoPapel.altura - sangria,
            largura: this.TamanhoPapel.largura - sangria
        };
    };
    Orcamento.prototype.quantidadePorPagina = function () {
        var largura = Math.floor(this.TamanhoPapel.largura / this.Tamanho.largura);
        var altura = Math.floor(this.TamanhoPapel.altura / this.Tamanho.altura);
        var larguraInverse = Math.floor(this.TamanhoPapel.largura / this.Tamanho.altura);
        var alturaInverse = Math.floor(this.TamanhoPapel.altura / this.Tamanho.largura);
        var portrait = largura * altura;
        var landscape = larguraInverse * alturaInverse;
        var portraitOrientacao = {
            altura: this.TamanhoPapel.altura - altura * this.Tamanho.altura,
            largura: this.TamanhoPapel.largura - largura * this.Tamanho.largura
        };
        
        var impressao = {
            altura: this.Tamanho.altura,
            largura: this.Tamanho.largura,
            alturaInverse: this.Tamanho.largura,
            larguraInverse: this.Tamanho.altura,
            info: { normal: { landscape: 0, portrait: 0 }, inverse: { landscape: 0, portrait: 0 }, total: { landscape: 0, portrait: 0 } }
        };
        impressao.info.normal.portrait = portrait;
        impressao.info.normal.landscape = landscape;
        impressao.info.total.portrait = portrait;
        impressao.info.total.landscape = landscape;
        return { portrait: portrait, landscape: landscape };
    };
    Orcamento.prototype.quantidadeDePaginas = function (orientation) {
        if (orientation == 0)
            return this.Pedido / this.quantidadePorPagina().portrait;
        else
            return this.Pedido / this.quantidadePorPagina().landscape;
    };
    Orcamento.prototype.quantidadeDePaginasArredondadas = function (orientation) {
        if (orientation == 0)
            return Math.ceil(this.Pedido / this.quantidadePorPagina().portrait);
        else
            return Math.ceil(this.Pedido / this.quantidadePorPagina().landscape);
    };
    Orcamento.prototype.valor = function (orientation) {
        return this.quantidadeDePaginasArredondadas(orientation) * this.Valor;
    };
    Orcamento.prototype.valorUnitario = function (orientation) {
        return this.valor(orientation) / this.Pedido;
    };
    Orcamento.prototype.quantidadeTamamanhoReduzido = function (reducao) {
        var ratio = this.Tamanho.largura / this.Tamanho.altura;
        this.TamanhoReduzido.largura -= reducao;
        this.TamanhoReduzido.altura = this.TamanhoReduzido.largura / ratio;
        console.log(this.Tamanho);
        console.log(this.TamanhoReduzido);
        var largura = Math.floor(this.TamanhoPapel.largura / this.TamanhoReduzido.largura);
        var altura = Math.floor(this.TamanhoPapel.altura / this.TamanhoReduzido.altura);
        return largura * altura;
    };
    return Orcamento;
}());
