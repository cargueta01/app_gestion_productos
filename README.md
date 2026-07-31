# Aplicación de gestión de productos

Aplicación full stack para la prueba técnica Serfina:

- Backend: Spring Boot, Java 21, Spring Security, JWT y SQL Server.
- Frontend: Angular 21.
- Base de datos: SQL Server 2022.
- Contenedores: Docker Compose.

## Ejecutar con Docker

Requisitos:

- Docker Desktop con integración WSL2.
- Docker Compose.

Desde la raíz del proyecto:

```bash
docker compose up --build
```

URLs:

- Frontend: http://localhost:4200
- Backend: http://localhost:8080
- Health: http://localhost:8080/actuator/health
- SQL Server: localhost:1433

Usuarios demo:

```text
admin@serfina.com / Admin123!
user@serfina.com / User123!
```

El usuario `USER` puede consultar, crear y actualizar productos. El usuario `ADMIN` también puede eliminarlos.

## Ejecutar en desarrollo

SQL Server:

```bash
docker compose up -d sqlserver
```

Backend:

```bash
cd backend
./mvnw spring-boot:run
```

Frontend:

```bash
cd frontend
export PATH="$HOME/.nvm/versions/node/v24.18.1/bin:$PATH"
npm start
```

## Detener contenedores

```bash
docker compose down
```

Para eliminar también los datos persistidos de SQL Server:

```bash
docker compose down -v
```
