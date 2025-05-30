export const Logout = () => {
    localStorage.removeItem("usuarioNombre");
    localStorage.removeItem("token"); // Si usas token
    sessionStorage.clear();           // Limpia otros datos si usas sessionStorage
    window.dispatchEvent(new Event("storage")); // Notifica a otros componentes
    window.location.href = "/login";  // Redirige al login
  };