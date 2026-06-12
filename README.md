# 💰 Cashi API

[![Node.js Version](https://img.shields.io/badge/node-18.x+-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-6.0+-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-success)](https://github.com/JuanPabloCalleCondori/cashi-api)

**API RESTful para la gestión de finanzas personales con Hono, Prisma y PostgreSQL.**

Cashi API ofrece endpoints seguros para autenticación, gestión de categorías, manejo de transacciones, cálculo de balance y carga de recibos.

## ✨ Características principales

- ✅ Autenticación con JWT
- ✅ CRUD de categorías con autorización
- ✅ CRUD de transacciones financieras
- ✅ Endpoint de balance total
- ✅ Endpoint de carga de recibo
- ✅ Validación de datos con Zod
- ✅ Base de datos PostgreSQL con Prisma ORM
- ✅ Servidor rápido y minimalista con Hono
- ✅ TypeScript completo
- ✅ Configuración con Docker Compose opcional

## 🚀 Tecnologías

- Node.js
- TypeScript
- Hono
- Prisma
- PostgreSQL
- Zod
- Bcryptjs
- Jsonwebtoken

## 📦 Requisitos previos

- Node.js 18+
- npm o yarn
- PostgreSQL 16+ o Docker
- Git

## 🧩 Instalación

```bash
git clone https://github.com/JuanPabloCalleCondori/cashi-api.git
cd cashi-api
npm install
```

## 🔧 Configuración de entorno

Crea el archivo `.env` en la raíz del proyecto y agrega las variables:

```env
DATABASE_URL="postgresql://cashiuser:cashipass123@localhost:5433/cashi"
PORT=3000
NODE_ENV=development
JWT_SECRET="tu-clave-secreta-super-segura-cambiar-en-produccion"
JWT_EXPIRES_IN="24h"
CORS_ORIGIN="http://localhost:3000,http://localhost:5173"
LOG_LEVEL="debug"
```

## 🐳 Base de datos

### Opción A: Docker Compose (recomendado)

```bash
docker-compose up -d
```

### Opción B: PostgreSQL local

```bash
psql -U postgres -c "CREATE DATABASE cashi;"
psql -U postgres -d cashi -c "CREATE USER cashiuser WITH PASSWORD 'cashipass123';"
psql -U postgres -d cashi -c "GRANT ALL PRIVILEGES ON DATABASE cashi TO cashiuser;"
```

## 🔄 Prisma

```bash
npx prisma migrate dev --name init
npx prisma db push
npx prisma generate
```

## ▶️ Scripts disponibles

```bash
npm run dev
npm start
npm run prisma:generate
```

## 🌐 Endpoints principales

- `GET /` - Estado de la API
- `POST /auth/register` - Registro de usuario
- `POST /auth/login` - Inicio de sesión
- `GET /categories` - Listar categorías
- `GET /categories/:id` - Obtener categoría por ID
- `POST /categories` - Crear categoría
- `PATCH /categories/:id` - Actualizar categoría
- `DELETE /categories/:id` - Eliminar categoría
- `GET /transactions` - Listar transacciones
- `GET /transactions/balance` - Obtener balance total
- `GET /transactions/:id` - Obtener transacción por ID
- `POST /transactions` - Crear transacción
- `PATCH /transactions/:id` - Actualizar transacción
- `DELETE /transactions/:id` - Eliminar transacción
- `POST /transactions/upload` - Subir recibo

> Las rutas de categorías, transacciones y carga de recibos requieren autenticación.

## 💡 Estructura del proyecto

```bash
cashi-api/
├─ src/
│  ├─ controllers/
│  ├─ routes/
│  ├─ middlewares/
│  ├─ lib/
│  ├─ schemas/
│  └─ index.ts
├─ prisma/
│  └─ schema.prisma
├─ docker-compose.yml
├─ package.json
└─ tsconfig.json
```

## ✅ Contribuciones

Si quieres mejorar el proyecto, crea un issue o un pull request. ¡Bienvenidas todas las mejoras!

## 📄 Licencia

Proyecto bajo licencia MIT.

## 📌 Repositorio

https://github.com/JuanPabloCalleCondori/cashi-api
