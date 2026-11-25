# PFI Backend Node.js — API REST de Productos

API REST desarrollada con **Node.js**, **Express**, **Firebase Firestore** y autenticación mediante **JWT (JSON Web Tokens)** para la gestión de productos.

## Tecnologías utilizadas

- **Node.js** (ES Modules)
- **Express 5**
- **Firebase / Cloud Firestore**
- **JSON Web Token (`jsonwebtoken`)**
- **CORS** y **body-parser**
- **dotenv** (gestión de variables de entorno)
- **Nodemon** (desarrollo)

## Estructura del proyecto

```text
.
├── index.js                              # Punto de entrada, middlewares y montaje de rutas
├── package.json                          # Dependencias y scripts
├── postman_collection.json               # Colección lista para importar en Postman
└── src/
    ├── controllers/
    │   ├── auth.controller.js            # Controlador de autenticación (login)
    │   └── products.controllers.js       # Controladores CRUD de productos
    ├── data/
    │   └── data.js                       # Inicialización de Firebase y Firestore
    ├── middlewares/
    │   └── authentication.js             # Verificación de Bearer Token (JWT)
    ├── models/
    │   └── products.models.js            # Consultas a la colección `products` en Firestore
    ├── routes/
    │   ├── auth.routes.js                # Rutas de autenticación (`/auth`)
    │   └── products.routes.js            # Rutas de productos (`/api`)
    ├── services/
    │   └── products.services.js          # Lógica de negocio de productos
    └── utils/
        └── token-generator.js            # Generación de tokens JWT
```

## Instalación y configuración

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/GECT/PFI_Back_node_GuillermoCiocca.git
   cd PFI_Back_node_GuillermoCiocca
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Creá un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```env
   PORT=3001
   JWT_SECRET_KEY=tu_clave_secreta_jwt

   apiKey=tu_firebase_api_key
   authDomain=tu_proyecto.firebaseapp.com
   projectId=tu_project_id
   storageBucket=tu_proyecto.firebasestorage.app
   messagingSenderId=tu_messaging_sender_id
   appId=tu_firebase_app_id
   ```

4. **Ejecutar el servidor:**
   - Producción:
     ```bash
     npm start
     ```
   - Desarrollo (con recarga automática):
     ```bash
     npm run dev
     ```

   El servidor quedará disponible en `http://localhost:3001` (o el puerto definido en `PORT`).

## Endpoints de la API

### Autenticación (`/auth`)

| Método | Ruta | Auth | Descripción |
| :--- | :--- | :---: | :--- |
| `POST` | `/auth/login` | No | Valida credenciales y devuelve un token JWT (expira en 1 hora) |

**Ejemplo de body (`POST /auth/login`):**
```json
{
  "email": "admin@gmail.com",
  "password": "123456"
}
```

### Productos (`/api`)

| Método | Ruta | Auth (Bearer JWT) | Descripción |
| :--- | :--- | :---: | :--- |
| `GET` | `/api/products` | No | Devuelve todos los productos |
| `GET` | `/api/products?category=<valor>` | No | Filtra productos por el campo `categoria` |
| `GET` | `/api/products/:id` | No | Devuelve un producto por su ID de Firestore |
| `POST` | `/api/products/create` | Sí | Crea un nuevo producto en Firestore (`201 Created`) |
| `DELETE` | `/api/products/:id` | Sí | Elimina un producto por su ID (`404` si no existe) |

**Header requerido en rutas protegidas:**
```text
Authorization: Bearer <tu_token_jwt>
```

**Ejemplo de body (`POST /api/products/create`):**
```json
{
  "nombre": "Teclado mecánico",
  "precio": 45000,
  "categoria": "tecnologia"
}
```

## Manejo de respuestas y errores

- `200 OK` / `201 Created`: operaciones exitosas.
- `400 Bad Request`: JSON malformado o datos obligatorios faltantes en el body.
- `401 Unauthorized`: token ausente o credenciales inválidas.
- `403 Forbidden`: token inválido o expirado.
- `404 Not Found`: ruta inexistente o producto no encontrado.
- `500 Internal Server Error`: error interno no controlado.

## Pruebas con Postman

El repositorio incluye [postman_collection.json](postman_collection.json) con todas las rutas preconfiguradas:

1. Abrí Postman e importá `postman_collection.json`.
2. Ejecutá **`Auth → Login (obtener JWT)`**: el token se guarda automáticamente en la variable `{{token}}`.
3. Ejecutá **`Products → Crear producto (requiere JWT)`**: usa `{{token}}` automáticamente y guarda el ID creado en `{{productId}}`.
4. Probá los endpoints `GET` y `DELETE`.

## Autor

**Guillermo Ciocca**
