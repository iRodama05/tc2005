const Personaje = require('../src/personaje');

describe('Personaje', () => {
    // ---------------- Crear Personaje con Vida Máxima ----------------
    test('personaje creado tiene toda la vida', () => {
        // Arrange: preparar datos
        const heroe = new Personaje('A', 100, 15, 5);

        // Act

        // Assert: verificar resultado
        expect(heroe.vidaActual).toBe(100)
    });

    // -------------------------- Recibir daño --------------------------
    test('recibirDanio reduce la vida correctamente', () => {
        // Arrange: preparar datos
        const heroe = new Personaje('A', 100, 15, 5);
        
        // Act: ejecutar la acción
        heroe.recibirDanio(30);
        
        // Assert: verificar resultado
        expect(heroe.vidaActual).toBe(70);
    });

    // ----------------------- Recibir daño letal -----------------------
    test('recibirDanio letal reduce la vida a 0', () => {
        // Arrange: preparar datos
        const heroe = new Personaje('A', 100, 15, 5);
        
        // Act: ejecutar la acción
        heroe.recibirDanio(110);
        
        // Assert: verificar resultado
        expect(heroe.vidaActual).toBe(0);
    });

// -------------------------- Daño negativo -------------------------
    test('recibirDanio lanza un error si el daño es negativo', () => {
        // Arrange: preparar datos
        const heroe = new Personaje('A', 100, 15, 5);
        
        // Act & Assert: ejecutar la acción y verificar el resultado al mismo tiempo
        expect(() => {
            heroe.recibirDanio(-10);
        }).toThrow('El daño no puede ser negativo'); 
    });

    // ---------------------------- Curar ---------------------------
    test('curar aumenta la vida correctamente', () => {
        // Arrange: preparar datos
        const vidaInicial = 100;
        const danio = 20
        const cantidad = 10;
        const heroe = new Personaje('A', vidaInicial, 15, 5);
        
        // Act: ejecutar las acciones
        heroe.recibirDanio(danio);
        heroe.curar(cantidad);
        
        // Assert
        expect(heroe.vidaActual).toBe(vidaInicial - danio + cantidad); 
    });

    // ---------------------- Curar no excede -----------------------
    test('curar nunca supera la vida máxima', () => {
        // Arrange: preparar datos
        const vidaMaxima = 100
        const heroe = new Personaje('A', vidaMaxima, 15, 5);
        
        // Act: ejecutar las acciones
        heroe.recibirDanio(20);
        heroe.curar(50);
        
        // Assert
        expect(heroe.vidaActual).toBe(vidaMaxima); 
    });

    // ---------------------- Está vivo? (sí) -----------------------
    test('regresa true si la vida es > 0', () => {
        // Arrange: preparar datos
        const vidaMaxima = 100
        const heroe = new Personaje('A', vidaMaxima, 15, 5);
        
        // Act: ejecutar las acciones
        heroe.recibirDanio(90);
        
        // Assert
        expect(heroe.estaVivo()).toBe(true); 
    });

    // ---------------------- Está vivo? (no) -----------------------
    test('regresa true si la vida es > 0', () => {
        // Arrange: preparar datos
        const vidaMaxima = 100
        const heroe = new Personaje('A', vidaMaxima, 15, 5);
        
        // Act: ejecutar las acciones
        heroe.recibirDanio(110);
        
        // Assert
        expect(heroe.estaVivo()).toBe(false); 
    });

    // ---------------------- Subir nivel cura y aumenta stats -----------------------
    test('subirNivel aumenta las stats y cura por completo', () => {
        // Arrange: preparar datos
        const vidaMaxima = 100
        const heroe = new Personaje('A', vidaMaxima, 15, 5);
        
        // Act: ejecutar las acciones
        heroe.recibirDanio(50);
        heroe.subirNivel();
        
        // Assert
        expect(heroe.vidaMaxima).toBe(110);
        expect(heroe.ataque).toBe(17);
        expect(heroe.defensa).toBe(6);
        expect(heroe.vidaActual).toBe(110);
    });

// ---------------------- Subir de nivel -----------------------
    test('sube de nivel al alcanzar el umbral de experiencia', () => {
        // Arrange: preparar datos
        const vidaMaxima = 100;
        const heroe = new Personaje('A', vidaMaxima, 15, 5);
        
        // Act: ejecutar la acción
        heroe.ganarExperiencia(100);
        
        // Assert: verificar resultado
        expect(heroe.nivel).toBe(2);
    });
});