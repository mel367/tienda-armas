# 🛠️ API Backend - Pium Pium Store

## 📁 Estructura del Proyecto

backend/
├── main.go
├── routes/
│ └── usuarios.go
├── models/
│ └── usuarios/
│ └── usuariosModel.go
├── controllers/
│ └── usuariosController.go
├── data/
│ └── usuarios.json
├── .env

---

## 🚀 Endpoints disponibles

### 🔐 Autenticación

- **POST** `localhost:3000/api/register`

  - Registra un nuevo usuario.
  - Body:
    ```json
    {
      "email": "ejemplo@correo.com",
      "contraseña": "secreta123"
    }
    ```

- **POST** `localhost:3000/api/login`
  - Inicia sesión con un usuario ya registrado.
  - Body:
    ```json
    {
      "email": "ejemplo@correo.com",
      "contraseña": "secreta123"
    }
    ```

---

## ⚙️ Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tuusuario/pium-pium-backend.git
   cd pium-pium-backend
   ```
