// Demo mínimo: evita errores si no hay backend
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Aquí se enviaría la petición de login al backend.");
      // ejemplo: fetch('/api/auth/login', { method:'POST', body: JSON.stringify({...}) })
    });
  }

  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Aquí se enviaría la petición de registro al backend.");
    });
  }
});
