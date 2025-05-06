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
│   ├── auth/               # JWT, refresh‑token, registro
│   ├── users/              # CRUD de usuarios, perfiles
│   ├── convocatorias/      # CRUD + flujo de estados
│   ├── comunicacion/       # Envío de correos, QR, bitácora
│   └── admin/              # Roles jerárquicos, coordinación, métricas
├── common/
│   ├── guards/             # JwtAuthGuard, RolesGuard, HierarchyGuard
│   ├── interceptors/       # Auditoría (createdBy, updatedBy)
│   ├── decorators/         # @Roles(), @CurrentUser()
│   └── services/           # SesMailerService, QrGeneratorService
.env.template               # Variables de entorno de ejemplo
Dockerfile.dev              # Imagen desarrollo (Node 18 + ts-node)
Dockerfile.prod             # Imagen producción  (Node 18 + dist)
docker-compose.dev.yaml     # Hot‑reload con volumes watch
docker-compose.prod.yaml    # Contenedores optimizados, sin nodemon
```

---

## 📓 Variables de Entorno

Copia el archivo `.env.template` y renómbralo a `.env`. Luego, actualiza los valores necesarios:

```bash
cp .env.template .env
```

### Contenido del `.env.template`
```env
# --- App ---
APP_PUBLIC_URL=https://midominio.gob.gt

# --- BBDD ---
DB_HOST=postgres
DB_PORT=5432
DB_USER=admin
DB_PASS=admin
DB_NAME=convocatorias_db

# --- JWT ---
JWT_SECRET=super_secreto
JWT_EXPIRES=15m
JWT_REFRESH_EXPIRES=7d

# --- AWS SES ---
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=XXXX
AWS_SECRET_ACCESS_KEY=XXXX
MAIL_FROM="Convocatorias <convocatorias@midominio.gob.gt>"

```

---

## 🚀 Ejecución del Proyecto

### 🔄 Desarrollo

1. Clonar el repositorio
   ```bash
   git clone https://github.com/danbart/convocatorias-backend.git
   cd convocatorias-backend
   ```

2. Configurar el entorno
   ```bash
   cp .env.template .env
   ```

3. Levantar con Docker Compose para desarrollo
   ```bash
   docker compose -f docker-compose.dev.yaml up --build
   ```

4. Acceder a la API:
   - Swagger: [http://localhost:3000/api](http://localhost:3000/api)

---

### 🔄 Producción

1. Configurar el entorno
   ```bash
   cp .env.template .env
   ```

2. Levantar con Docker Compose para producción
   ```bash
   docker compose -f docker-compose.prod.yaml up --build -d
   ```

3. Confirmar que los servicios están corriendo
   ```bash
   docker compose -f docker-compose.prod.yaml ps
   ```

4. Acceder a la API:
   - Swagger: [http://produccion/api](http://<tu-ip-de-servidor>/api)

---

## 🛣️ Mapa de endpoints (Swagger cubre detalles)

| Método | Ruta                                | Descripción           | Roles                        |
| ------ | ----------------------------------- | --------------------- | ---------------------------- |
| `POST` | `/auth/login`                       | Login y refresh‑token | público                      |
| `GET`  | `/convocatorias`                    | Listar convocatorias  | *varios*                     |
| `POST` | `/convocatorias`                    | Crear (Borrador)      | `superadmin`, `admin`        |
| `POST` | `/convocatorias/:id/enviar`         | Publicar & notificar  | `publicador`                 |
| `GET`  | `/convocatorias/:id/comunicaciones` | Historial de envíos   | `coordinacion`               |
| `GET`  | `/admin/roles`                      | CRUD roles            | `superadmin`                 |
| `GET`  | `/admin/metricas`                   | Dashboard métricas    | `coordinacion`, `superadmin` |


## 📃 Consideraciones

- `synchronize: true` está habilitado solo para desarrollo. Para producción se deben usar migraciones.
- Las contraseñas y tokens están encriptados y protegidos.
- Se utiliza soft delete con `@DeleteDateColumn`.
- Se incluye auditoría automática con `createdBy`, `updatedBy`, `createdAt`, `updatedAt`.

---

## 👤 Autor

- **Danilo Solórzano**  
  Desarrollador Backend

