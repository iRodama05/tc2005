const { calcularRecompensa } = require('../src/nivel');

describe('calcularRecompensa', () => {

  test('enemigo 3 niveles abajo aplica multiplicador 0.5', () => {
    // Arrange
    const xpBase = 100;

    // Act
    const xp = calcularRecompensa(xpBase, 2, 5);

    // Assert
    expect(xp).toBe(50);
  });

  test('enemigo 1 nivel abajo aplica multiplicador 0.75', () => {
    // Arrange
    const xpBase = 100;

    // Act
    const xp = calcularRecompensa(xpBase, 4, 5);

    // Assert
    expect(xp).toBe(75);
  });

  test('mismo nivel aplica multiplicador 1.0', () => {
    // Arrange
    const xpBase = 100;

    // Act
    const xp = calcularRecompensa(xpBase, 5, 5);

    // Assert
    expect(xp).toBe(100);
  });

  test('enemigo 2 niveles arriba aplica multiplicador 1.5', () => {
    // Arrange
    const xpBase = 100;

    // Act
    const xp = calcularRecompensa(xpBase, 7, 5);

    // Assert
    expect(xp).toBe(150);
  });

  test('enemigo 3 niveles arriba aplica multiplicador 2.0', () => {
    // Arrange
    const xpBase = 100;

    // Act
    const xp = calcularRecompensa(xpBase, 8, 5);

    // Assert
    expect(xp).toBe(200);
  });

});