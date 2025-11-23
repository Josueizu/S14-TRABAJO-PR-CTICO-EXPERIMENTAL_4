 
// Funciones para gestión de usuarios

// Obtener todos los usuarios
async function obtenerUsuarios() {
    try {
        return await request('/usuarios');
    } catch (error) {
        throw error;
    }
}

// Obtener un usuario por ID
async function obtenerUsuarioPorId(id) {
    try {
        return await request(`/usuarios/${id}`);
    } catch (error) {
        throw error;
    }
}

// Crear usuario
async function crearUsuario(datos) {
    try {
        return await request('/usuarios', {
            method: 'POST',
            body: JSON.stringify(datos)
        });
    } catch (error) {
        throw error;
    }
}

// Actualizar usuario
async function actualizarUsuario(id, datos) {
    try {
        return await request(`/usuarios/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos)
        });
    } catch (error) {
        throw error;
    }
}

// Eliminar usuario
async function eliminarUsuario(id) {
    try {
        return await request(`/usuarios/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        throw error;
    }
}
