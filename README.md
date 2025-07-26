# 🛒 Proyecto CRUD de Productos con C# .NET + HTML/JS (Frontend puro)

Este proyecto consiste en una aplicación de gestión de productos que permite crear, editar, eliminar y listar productos, con soporte para imágenes y relación con marcas y categorías.

---

## 📂 Estructura del Proyecto

Proyecto
│
├── Backend (API REST en C# .NET)
│ ├── Controllers/
│ ├── Models/
│ ├── Context/
│ ├── Dto/
│ ├── Responses/
│ ├── Repositories/
│ ├── wwwroot/uploads/
│ ├── appsettings.json
│ └── Program.cs
│ ├── Procedure.sql
│ ├── Queries.sql

├── Frontend (HTML, CSS, JS puro)
│ ├── index.html
│ ├── editar.html
│ ├── style.css
│ ├── producto.js

---

## 🧠 Tecnologías Usadas

- **Backend:** ASP.NET Core 6+ con Dapper
- **Frontend:** HTML5 + CSS + JavaScript puro
- **Base de Datos:** SQL Server
- **ORM:** Dapper

---

## ⚙️ Backend - API .NET

### 🔹 Endpoints principales

| Método | Ruta                           | Descripción                      |
|--------|--------------------------------|----------------------------------|
| GET    | `/api/v1/productos`            | Lista todos los productos        |
| GET    | `/api/v1/producto/{ref}`       | Obtiene un producto por referencia |
| POST   | `/api/v1/guardar-producto`     | Crea un nuevo producto (con imagen) |
| PUT    | `/api/v1/editar-producto/{ref}`| Actualiza un producto (con imagen) |
| POST   | `/api/v1/producto/{ref}/imagen`| Actualiza solo la imagen del producto |
| GET    | `/api/v1/marcas`               | Lista todas las marcas           |
| GET    | `/api/v1/categorias`           | Lista todas las categorías       |

### 🖼️ Carga de imágenes
- Las imágenes se guardan en `wwwroot/uploads/`.
- El campo `Imagen` guarda la ruta relativa (`/uploads/nombre.jpg`).
- Soporte para imágenes JPEG.

---

## 🌐 Frontend - HTML/CSS/JavaScript

### 🧾 Funcionalidades

- `index.html`: muestra la lista de productos.
- `editar.html`: formulario para crear o editar productos.
- `producto.js`: maneja toda la lógica de cargar datos, validar formularios, enviar productos y manejar imágenes.

