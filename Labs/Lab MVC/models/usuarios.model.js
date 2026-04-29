const log = console.log;

exports.ObtenerUsuarios = function(correo,contrasena){
    log("Obtener Usuarios");

    let usuarios = [];

    usuarios.push({
        id: 1,
        nombre: "Samuel",
        active: true
        });
    usuarios.push({
        id: 2,
        nombre: "Lisa",
        active: true
        });
    usuarios.push({
        id: 1,
        nombre: "Bob",
        active: false
        });
    usuarios.push({
        id: 2,
        nombre: "Alicia",
        active: true
        });
    return usuarios;
}