APLICACION DE GESTION DE PRODUCTOS

Aplicación web para administrar productos.

Tecnologías utilizadas:

Backend: Spring Boot y Java 21.
Frontend: Angular 21.
Base de datos: SQL Server 2022.
Seguridad: Spring Security, JWT y BCrypt.
Contenedores: Docker Compose.

REQUISITOS

Tener instalado Docker Desktop.
Tener habilitada la integración de Docker con WSL2.
Tener Git instalado.

EJECUTAR TODA LA APLICACION CON DOCKER

Abrir una terminal de Ubuntu WSL2.

Ir a la carpeta del proyecto:

cd /home/carlos/Projects/prueba-tecnica-serfina

Construir y levantar los contenedores:

docker compose up --build

La primera ejecución puede tardar porque Docker descargará las imágenes y dependencias.

Cuando termine, abrir en el navegador:

Frontend:
http://localhost:4200

Backend:
http://localhost:8080

Estado del backend:
http://localhost:8080/actuator/health

USUARIOS DE PRUEBA

Administrador:
Email: admin@serfina.com
Contraseña: Admin123!

Usuario normal:
Email: user@serfina.com
Contraseña: User123!

PERMISOS

El usuario normal puede listar, crear y actualizar productos.
El administrador también puede eliminar productos.

DETENER LA APLICACION

Presionar Ctrl+C en la terminal donde se ejecuta Docker Compose.

También se puede ejecutar:

docker compose down

DETENER Y ELIMINAR LOS DATOS DE SQL SERVER

Este comando elimina también la información almacenada en la base de datos:

docker compose down -v

EJECUTAR LA APLICACION SIN DOCKER

Primero iniciar solamente SQL Server:

docker compose up -d sqlserver

Iniciar el backend desde otra terminal:

cd /home/carlos/Projects/prueba-tecnica-serfina/backend
./mvnw spring-boot:run

Si ./mvnw no tiene permisos de ejecución, usar:

chmod +x mvnw
./mvnw spring-boot:run

También se puede utilizar Maven directamente:

mvn spring-boot:run

Iniciar el frontend desde otra terminal:

cd /home/carlos/Projects/prueba-tecnica-serfina/frontend
export PATH="$HOME/.nvm/versions/node/v24.18.1/bin:$PATH"
npm install
npm start

El frontend local estará disponible en:

http://localhost:4200

ESTRUCTURA DEL PROYECTO

backend contiene la API de Spring Boot.
frontend contiene la aplicación Angular.
backend/database/init.sql contiene el script de creación de la base de datos.
docker-compose.yml contiene la configuración de todos los contenedores.

COMANDOS DE PRUEBA

Ver el estado de los contenedores:

docker compose ps

Ver los logs del backend:

docker compose logs -f backend

Ver los logs del frontend:

docker compose logs -f frontend

Ver los logs de SQL Server:

docker compose logs -f sqlserver

Probar el estado del backend:

curl http://localhost:8080/actuator/health

SUBIR CAMBIOS A GITHUB

Ver los archivos modificados:

git status

Agregar los cambios:

git add .

Crear un commit:

git commit -m "descripcion de los cambios"

Subir los cambios:

git push

Repositorio:

git@github.com:cargueta01/app_gestion_productos.git
