 // Configuración de la API
const API_URL = 'http://localhost:5000/api';

// Función para obtener el token
function getToken() {
    return localStorage.getItem('token');
}

// Función para hacer peticiones HTTP
async function request(endpoint, options = {}) {
    const token = getToken();
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };

    // Agregar token si existe
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error en la petición');
        }

        return data;
    } catch (error) {
        console.error('Error en la petición:', error);
        throw error;
    }
}

// Función para manejar errores
function handleError(error) {
    if (error.message.includes('401') || error.message.includes('token')) {
        // Token inválido o expirado
        localStorage.removeItem('token');
        window.location.href = '/pages/login.html';
    }
    return error.message;
}

// Mostrar mensajes de error
function showError(message) {
    const errorDiv = document.getElementById('error-message');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    } else {
        alert(message);
    }
}

// Mostrar mensajes de éxito
function showSuccess(message) {
    const successDiv = document.getElementById('success-message');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000);
    } else {
        alert(message);
    }
}