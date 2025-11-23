 // Funciones de autenticación

// Login
async function login(email, password) {
    try {
        const data = await request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });

        if (data.success) {
            localStorage.setItem('token', data.token);
            showSuccess('Login exitoso. Redirigiendo...');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }
    } catch (error) {
        showError(handleError(error));
    }
}

// Registro
async function register(nombre, email, password) {
    try {
        const data = await request('/auth/registro', {
            method: 'POST',
            body: JSON.stringify({ nombre, email, password })
        });

        if (data.success) {
            localStorage.setItem('token', data.token);
            showSuccess('Registro exitoso. Redirigiendo...');
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        }
    } catch (error) {
        showError(handleError(error));
    }
}

// Login con Google
function loginWithGoogle() {
    window.location.href = `${API_URL}/auth/google`;
}

// Logout
function logout() {
    localStorage.removeItem('token');
    window.location.href = '../index.html';
}

// Verificar si el usuario está autenticado
function isAuthenticated() {
    return !!getToken();
}

// Obtener perfil del usuario
async function obtenerPerfil() {
    try {
        return await request('/auth/perfil');
    } catch (error) {
        handleError(error);
        throw error;
    }
}