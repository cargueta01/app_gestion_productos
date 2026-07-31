# Aplicación de Gestión de Productos

Aplicación web para la gestión de productos desarrollada como prueba técnica.

## Tecnologías

* Backend: Java 21, Spring Boot
* Frontend: Angular 21
* Base de datos: SQL Server 2022
* Seguridad: Spring Security + JWT
* Contenedores: Docker Compose

## Requisitos

* Docker
* Git

## Ejecutar la aplicación

Desde la raíz del proyecto ejecutar:

```bash
docker compose up --build
```

Una vez iniciados los contenedores, la aplicación estará disponible en:

* Frontend: http://localhost:4200
* Backend: http://localhost:8080
* Estado del backend: http://localhost:8080/actuator/health

## Usuarios de prueba

| Rol           | Correo                                        | Contraseña |
| ------------- | --------------------------------------------- | ---------- |
| Administrador | [admin@serfina.com](mailto:admin@serfina.com) | Admin123!  |
| Usuario       | [user@serfina.com](mailto:user@serfina.com)   | User123!   |

## Permisos

* **Usuario:** listar, crear y actualizar productos.
* **Administrador:** todas las acciones, incluyendo eliminar productos.

## Detener la aplicación

```bash
docker compose down
```

Para eliminar también los datos almacenados en la base de datos:

```bash
docker compose down -v
```

## Estructura del proyecto

```text
backend/    API Spring Boot
frontend/   Aplicación Angular
docker-compose.yml
```
