# Nombre del Proyecto

Este proyecto consiste en dos aplicaciones que se ejecutan en un entorno Dockerizado:

1. **API de ASP.NET Core** - Una API RESTful de backend construida utilizando ASP.NET Core.
2. **Frontend de AstroJS** - Un generador de sitios web moderno que, al utilizar la arquitectura de islas y tener compatibilidad con React, así como con SSR, nos permite controlar qué componentes se hidratan y cuándo, generando un tiempo de carga rápido sin perder ni un ápice ni contenido ni código javascript a ejecutar.

Ambas aplicaciones se orquestan utilizando Docker Compose para un setup y despliegue fácil.

### Librerías creadas
En el frontend existe una librería que cree, inspirándome en la clase de axios, AxiosInstance. La clase se llama FetchInstance, y consume 2 funciones, appFetch y appFetchData. La primera utiliza la función nativa de fetch adaptándose al tipo de petición, de tal forma que donde sea necesario utilizar queries de url, un objeto o un formulario, adapta los parámetros en acorde a ello, de tal forma que sólo hace falta pasarle un *body*. Además, incluye ciertos headers dependiendo del cuerpo que se le pasa.
`appFetch` retorna la respuesta normal de fetch, mientas que `appFetchData`, si hay información que extraer de la petición, la retorna, lanzando un error en caso contrario.
Los métodos de la clase FetchInstance son los mismos que AxiosInstance:
- get
- post
- put
- delete


---

## Características

- **API de ASP.NET Core**
  - API RESTful con documentación de Swagger.
  - Entity Framework Core con una base de datos de MySQL.
  - Seguimiento de la arquitectura MVC.

- **Frontend de AstroJS**
  - Frontend liviano y r pido.
  - Consume la API para contenido dinámico.
  - Totalmente responsivo.

- **Entorno Dockerizado**
  - Despliegue fácil con `docker-compose`.
  - Contenedores separados para la API, frontend y base de datos.

---

## Requisitos previos

Asegúrese de tener instalado lo siguiente:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

---

## Instrucciones de Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/adanfj/task-manager-aspnet
cd task-manager-aspnet
```

<!-- ### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```bash
# Configuración de MySQL
DB_HOST=db ## Ejecutar migraciones
DB_PORT=3306
DB_USER=root
DB_PASSWORD=example
DB_NAME=MyDatabase

# Configuración de la API
ASPNETCORE_ENVIRONMENT=Development
ASPNETCORE_URLS=http://+:8080
``` -->
---
### 3. Compilar y Ejecutar la Aplicación
Ejecute el siguiente comando para compilar primero los contenedores:

```bash
docker-compose build
```
---

Luego para ejecutar las migraciones ejecute los siguientes comandos:

```bash
docker run -it <api-image-name> /root/.dotnet/tools/dotnet-ef database update --project /app
docker run -it <api-image-name> /root/.dotnet/tools/dotnet-ef migrations add InitialCreate --project /app
```

Y por último para ejecutar la aplicación:

```bash
docker-compose up
```

### 4. Acceder a las Aplicaciones

- API (Swagger UI): http://143.47.53.136:8090/swagger
- Frontend: http://143.47.53.136:3500
---
## Estructura del Proyecto

```csharp
.
├── backend/                  # API de ASP.NET Core
│   ├── Controllers/
│   ├── Models/
│   ├── Data/
│   ├── Services/
│   ├── appsettings.json
│   ├── Program.cs
│   ├── Dockerfile
├── app-astro/                 # Frontend de AstroJS
│   ├── src/
│   ├── public/
│   ├── Properties/
│   ├── package.json
│   ├── astro.config.mjs
│   ├── Dockerfile
├── docker-compose.yml        # Configuración de Docker Compose
├── README.md                 # Documentación del Proyecto
```
---

