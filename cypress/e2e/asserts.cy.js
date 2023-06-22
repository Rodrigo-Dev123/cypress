/// <reference types="cypress" />

it('Equality', () => {
    const a = 1;

    expect(a).equal(1);
    expect(a, 'Deveria ser 1').equal(1);
    expect(a).to.be.equal(1); // Verifica se é igual
    expect('a').not.to.be.equal('b') // Verifica se não é igual, operador de negação.
})

it('Truthy', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true;
    expect(true).to.be.true;
    expect(b).to.be.null;
    expect(a).not.to.be.null;
    expect(a).to.be.not.null;
    expect(c).to.be.undefined;
});

it('Object Equality', () => {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).equal(obj);
    expect(obj).equal(obj)
    expect(obj).eq(obj);
    expect(obj).to.be.equal(obj);
    expect(obj).to.be.deep.equal({ a: 1, b: 2 }); // O deep é usado para fazer uma verificação distinta.
    expect(obj).eql({ a: 1, b: 2 }); // .eql() é um jeito de fazer a mesma operação anterior de um modo mais simples.
    expect(obj).include({ a: 1 }); // Verifica se o seguinte elemento está incluso.
    expect(obj).to.have.property('b');
    expect(obj).to.have.property('b', 2); // Verifica se a propriedade b é igual à 2.
    expect(obj).to.not.be.empty; // Verifica se o seguinte objeto não é vazio.
    expect({}).to.be.empty;
})

it('Arrays', () => {
    const arr = [1, 2, 3];
    expect(arr).to.have.members([1, 2, 3]);
    expect(arr).to.include.members([1, 3]); // Para verificar se o arrey tem o seguintes membros, é necessário usar o (include).
    expect(arr).to.be.not.empty
    expect([]).to.be.empty
})

it('types', () => {
    const num = 1;
    const str = 'String';

    expect(num).to.be.a('number');
    expect(str).to.be.a('string');
    expect({}).to.be.an('object');
    expect({}).to.be.an('object');
    expect([]).to.be.an('array')
})

it('String', () => {
    const str = 'String de teste';

    expect(str).to.be.equal('String de teste');
    expect(str).to.have.length(15);
    expect(str).to.contains('de');
    expect(str).to.match(/de/); // Verifica se tem a palavra (de);
    expect(str).to.match(/^String/); // Verifica se o seguinte item começa com a seguinte palavra.
    expect(str).to.match(/teste$/); // Verifica se este item termina com a seguinte palavra.
    expect(str).to.match(/.{15}/); // Verifica se tem o tamanho de 15 caracteres.s
    expect(str).to.match(/\w+/); // Verifica se tem apenas letras.
    expect(str).to.match(/\D/); // Verifica se não tem números.
})

it('Numbers', () => {
    const number = 4;
    const floatNumber = 5.2123;

    expect(number).to.be.equal(4);
    expect(number).to.be.above(3); // Verifica se o número está acima de 3.
    expect(number).to.be.below(7); // Verifica se o número está abaixo de 7.
    expect(floatNumber).to.be.equal(5.2123);
    expect(floatNumber).to.be.closeTo(5.2, 0.1); // Verifica se é igual à 5.2 com a precisão de 0.1
    expect(floatNumber).to.be.above(5);
})