<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Sistema de Gestión de Convocatorias - Backend

Este es el backend del Sistema de Gestión de Convocatorias para la Escuela Judicial, desarrollado con NestJS, PostgreSQL, Docker y autenticación JWT. El sistema permite gestión de usuarios, autenticación segura, control de roles, inscripciones y manejo de convocatorias.

---

## 🤖 Tecnologías Utilizadas

- **[NestJS](https://nestjs.com/)** - Framework de Node.js para backend modular.
- **[TypeORM](https://typeorm.io/)** - ORM para integración con PostgreSQL.
- **[PostgreSQL](https://www.postgresql.org/)** - Base de datos relacional.
- **[Docker](https://www.docker.com/)** - Contenerización del backend y la base de datos.
- **[JWT](https://jwt.io/)** - Autenticación con access y refresh tokens.
- **[Swagger](https://swagger.io/)** - Documentación interactiva de la API REST.
- **[class-transformer](https://github.com/typestack/class-transformer)** - Serialización segura de datos.

---

## 📁 Estructura del Proyecto

```
src/
├── modules/
│   ├── auth/              # Módulo de autenticación (JWT, refresh, roles)
│   ├── users/             # Gestión de usuarios
│   ├── convocatorias/     # Lógica de convocatorias (próximo)
├── common/
│   ├── guards/            # Guards personalizados (roles, JWT)
│   ├── interceptors/      # Interceptor de auditoría (createdBy, updatedBy)
│   ├── decorators/        # Decoradores como @Roles()
.env.template              # Variables de entorno de ejemplo
Dockerfile                # Imagen del backend
```

---

## ⚖️ Variables de Entorno

Copia el archivo `.env.template` y renómbralo a `.env`. Luego, actualiza los valores necesarios:

```bash
cp .env.template .env
```

### Contenido del `.env.template`
```env
DB_HOST=postgres
DB_PORT=5432
DB_USER=admin
DB_PASS=admin
DB_NAME=convocatorias_db
JWT_SECRET=super_secreto
JWT_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d
```

---

## 🚀 Ejecución del Proyecto

### 1. Clonar el repositorio
```bash
git clone https://github.com/tuusuario/proyecto-cnv.git
cd proyecto-cnv
```

### 2. Configurar entorno
```bash
cp .env.template .env
```

### 3. Levantar con Docker
```bash
docker compose up --build
```

Accede a la API en: [http://localhost:3000/api](http://localhost:3000/api)

---

## 🔍 Documentación Swagger

Disponible automáticamente en:
```
http://localhost:3000/api
```
Puedes probar los endpoints, loguearte con JWT, ver estructuras y validar respuestas.

---

## 📃 Consideraciones

- `synchronize: true` está habilitado solo para desarrollo. Para producción se deben usar migraciones.
- Las contraseñas y tokens están encriptados y protegidos.
- Se utiliza soft delete con `@DeleteDateColumn`.
- Se incluye auditoría automática con `createdBy`, `updatedBy`, `createdAt`, `updatedAt`.

---

## 👤 Autor

- **Danilo Solórzano**  
  Desarrollador Backend  
  <!-- [LinkedIn](https://www.linkedin.com/in/tuusuario) *(opcional)* -->

