 export default class CaixaDaLanchonete {

    constructor() {
        this.cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };
        
        this.extras = {
            chantily: "cafe",
            queijo: "sanduiche"
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        let valorCompraTotal = 0;


        for (let i = 0; i < itens.length; i++) {
            const [codigo, quantidade] = itens[i].split(',');

            // Validações do item
            if (!(codigo in this.cardapio)) return "Item inválido!";

            if (Number(quantidade) <= 0) return "Quantidade inválida!";
            
            if (this.extras[codigo]) {
                const validaItemPrincipal = this.extras[codigo];
                if (!itens.some(item => item.includes(validaItemPrincipal))) {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
            
            valorCompraTotal += this.cardapio[codigo] * Number(quantidade);
        }

        if (itens.length === 0) return "Não há itens no carrinho de compra!";
        if (!['debito', 'credito', 'dinheiro'].includes(formaDePagamento)) return "Forma de pagamento inválida!";
        
        if (formaDePagamento === 'dinheiro') {
            valorCompraTotal *= 0.95;
        } else if (formaDePagamento === 'credito') {
            valorCompraTotal *= 1.03;
        }

        return `R$ ${valorCompraTotal.toFixed(2).replace('.', ',')}`;
    }
}

new CaixaDaLanchonete()
  .calcularValorDaCompra('debito', ['chantily,1']);




