# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0
WORKDIR /app
COPY app.csproj .
RUN dotnet add package Microsoft.AspNetCore.Mvc
RUN dotnet add package Microsoft.EntityFrameworkCore --version 8.0.0
RUN dotnet add package Pomelo.EntityFrameworkCore.MySql --version 8.0.0
RUN dotnet add package Microsoft.EntityFrameworkCore.Design --version 8.0.0
RUN dotnet add package Microsoft.EntityFrameworkCore.Tools --version 8.0.0
RUN dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer --version 8.0.0
RUN dotnet tool install --global dotnet-ef --version 8.0.0

RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o /out
WORKDIR /out
EXPOSE 8090
# ENTRYPOINT /root/.dotnet/tools/dotnet-ef database update --project /app && /root/.dotnet/tools/dotnet-ef migrations add InitialCreate --project /app
CMD dotnet app.dll