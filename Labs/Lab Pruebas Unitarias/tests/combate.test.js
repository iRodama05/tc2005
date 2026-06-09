const { calcularDanio } = require('../src/combate');

describe('Combate', () => {

    test('calcularDanio regresa ataque menos defensa', () => {
        const atacante = {
            ataque: 15
        };

        const defensor = {
            defensa: 5
        };

        const danio = calcularDanio(atacante, defensor);
        expect(danio).toBe(10);
    });

    test('calcularDanio con defensa igual a ataque regresa 1', () => {
        const atacante = {
            ataque: 10
        };

        const defensor = {
            defensa: 10
        };

        const danio = calcularDanio(atacante, defensor);
        expect(danio).toBe(1);
    });

    test('calcularDanio nunca regresa menos de 1', () => {
        const atacante = {
            ataque: 5
        };

        const defensor = {
            defensa: 20
        };

        const danio = calcularDanio(atacante, defensor);
        expect(danio).toBe(1);
    });

    test('calcularDanio con ataque y defensa en 0 regresa 1', () => {
        const atacante = {
            ataque: 0
        };

        const defensor = {
            defensa: 0
        };

        const danio = calcularDanio(atacante, defensor);
        expect(danio).toBe(1);
    });

    test('calcularDanio lanza error si atacante es inválido', () => {
        const defensor = {
            defensa: 5
        };

        expect(() => calcularDanio(null, defensor)).toThrow();
    });

    test('calcularDanio lanza error si defensor es inválido', () => {
        const atacante = {
            ataque: 20
        };

        expect(() => calcularDanio(atacante, null)).toThrow();
    });

});