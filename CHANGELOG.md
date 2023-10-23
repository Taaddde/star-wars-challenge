# Cambios Recientes

## [3.1.0] - 21/10/2023

### Agregado

- ✨ Query options simples de page y limit para la lista de usuarios
- ✨ Query options simples de page y limit para la lista de peliculas y series
- 🔄 Se actualizó el archivo de postman

## [3.0.0] - 21/10/2023

### Cambiado

- 🔄 Ahora las respuestas de creación y actualización de documentos devuelven un texto de confirmación en lugar del documento en sí

## [2.6.0] - 22/10/2023

### Agregado

- ✨ Tests para los endpoints de media
- ✨ Tests para los endpoints de swapi

## [2.5.0] - 22/10/2023

### Agregado

- ✨ Tests para los endpoints de usuarios
- ✨ Mocks para servicios de base de datos y autenticación

## [2.4.1] - 22/10/2023

### Cambiado

- 🐛 Se declara el código de respuesta de los endpoints, ya que todos contestaban 201

## [2.4.0] - 22/10/2023

### Agregado

- ✨ Conexión con API de Swapi
- ✨ Proceso para popular la base de datos con peliculas de Star Wars

## [2.3.0] - 21/10/2023

### Agregado

- ✨ CRUD para peliculas y series

## [2.2.0] - 21/10/2023

### Agregado

- ✨ Middleware de validación de JWT
- ✨ Middleware de validación de admin

## [2.1.1] - 21/10/2023

### Cambiado

- 🐛 Las variables de entorno no estaban siendo cargadas correctamente por app.config.js

## [2.1.0] - 21/10/2023

### Cambiado

- ✨ Añadidos los endpoints "login", "getOne" y "getAll" para los usuarios
- ✨ Añadidos los DTO's para el login y el retorno de usuarios

## [2.0.0] - 21/10/2023

### Cambiado

- 🔄 La responsabilidad de autenticar un usuario, generar el JWT y decodearlo pasa a la librería de authenticate
- 🔄 Las funcionalidades de bcrypt y JWT de la librería de mongoose se eliminan

## [1.4.0] - 19/10/2023

### Agregado

- ✨ Añadido bcrypt, jsonwebtoken y mapped-types
- ✨ Servicios para user, CRUD, autenticación y login
- ✨ Encriptación de password al momento de guardar el usuario
- ✨ Endpoint POST /user para la creación de usuario
- ✨ DTO's para validación de creación de usuario y media
- ✨ Ahora la entity de user esta mas completa y con mas información
- ✨ Nuevo interceptor "class-validator" para hacer una respuesta 400 genérica

## [1.3.0] - 19/10/2023

### Agregado

- ✨ Mongoose al proyecto
- ✨ Librería que gestiona la base de datos en mongoose
- ✨ Inicialización de "media" y "user" como schemas de la base de datos
- ✨ Conexión del módulo de mongoose con la app principal


## [1.2.0] - 17/10/2023

### Agregado

- ✨ Añadida librería axios de nest js
- ✨ Options de la librería swapi para setear la url base

## [1.1.1] - 17/10/2023

### Cambiado

- 🔄 Nombre de librería "star-wars" por "swapi"

## [1.1.0] - 17/10/2023

### Agregado

- ✨ Dotenv añadido al proyecto

### Cambiado

- 🔄 Añadido .env en gitignore

## [1.0.0] - 17/10/2023

### Agregado

- 🚀 Lanzamiento inicial del proyecto

# Guía de Versionamiento Semántico

Este proyecto sigue la especificación de [Versionamiento Semántico](https://semver.org/).

- **MAJOR:** Aumentar cuando realizas cambios incompatibles con versiones anteriores.
- **MINOR:** Aumentar cuando agregas funcionalidades nuevas de manera compatible con versiones anteriores.
- **PATCH:** Aumentar cuando realizas correcciones de errores compatibles con versiones anteriores.

# Leyenda

- ✨ Añadido
- 🚀 Lanzamiento Inicial
- 🔄 Cambiado
- 🐛 Corregido
- 📚 Documentación
- 🚧 Trabajo en Progreso
- ⚡ Mejora de Rendimiento
- 🗑️ Deprecado
- 🚨 Rompió Cambios
- 🚑 Parche Crítico
