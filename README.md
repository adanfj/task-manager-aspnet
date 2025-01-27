# Nombre del Proyecto

Este proyecto consiste en dos aplicaciones que se ejecutan en un entorno Dockerizado:

1. **API de ASP.NET Core** - Una API RESTful de backend construida utilizando ASP.NET Core.
2. **Frontend de AstroJS** - Un generador de sitios web est ticos moderno utilizado para la parte delantera.

Ambas aplicaciones se orquestan utilizando Docker Compose para un setup y despliegue f cil.

---

## Caracter sticas

- **API de ASP.NET Core**
  - API RESTful con documentaci n de Swagger.
  - Entity Framework Core con una base de datos de MySQL.
  - Seguimiento de la arquitectura MVC.

- **Frontend de AstroJS**
  - Frontend liviano y r pido.
  - Consume la API para contenido din mico.
  - Totalmente responsivo.

- **Entorno Dockerizado**
  - Despliegue f cil con `docker-compose`.
  - Contenedores separados para la API, frontend y base de datos.

---

## Requisitos previos

Aseg rese de tener instalado lo siguiente:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Instrucciones de Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

<!-- ### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```bash
# MySQL Configuration
DB_HOST=db
DB_PORT=3306
DB_USER=root
DB_PASSWORD=example
DB_NAME=MyDatabase

# API Configuration
ASPNETCORE_ENVIRONMENT=Development
ASPNETCORE_URLS=http://+:5000

# Frontend Configuration
FRONTEND_PORT=3000
``` -->
---
### 3. Build and Run the Application
Run the following command to build and start the containers:

```bash
docker-compose up --build
```
---
### 4. Access the Applications

- API (Swagger UI): http://adanfar.com:8090/swagger
- Frontend: http://adanfar.com:3000
---
## Project Structure

```csharp
.
├── backend/                  # ASP.NET Core API
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   ├── Services/
│   ├── appsettings.json
│   ├── Program.cs
│   ├── Dockerfile
├── frontend/                 # AstroJS Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── astro.config.mjs
│   ├── Dockerfile
├── docker-compose.yml        # Docker Compose configuration
├── README.md                 # Project documentation
```
---
## Running migrations
*When the db container is running*
```bash
docker run -it <api-image-name> /root/.dotnet/tools/dotnet-ef database update --project /app
docker run -it <api-image-name> /root/.dotnet/tools/dotnet-ef migrations add InitialCreate --project /app
```