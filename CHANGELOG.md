# Cambios Recientes

## [2.0.0] - 21/10/2023

### Cambiado

- ✨ La responsabilidad de autenticar un usuario, generar el JWT y decodearlo pasa a la librería de authenticate
- ✨ Las funcionalidades de bcrypt y JWT de la librería de mongoose se eliminan

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
