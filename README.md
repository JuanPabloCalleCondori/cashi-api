# 💰 Cashi API

[![Node.js Version](https://img.shields.io/badge/node-18.x+-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-6.0+-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-success)](https://github.com)

**API RESTful moderna para la gestión integral de finanzas personales** 🚀

Desarrollada con [Hono](https://hono.dev/), [Prisma](https://www.prisma.io/) y [PostgreSQL](https://www.postgresql.org/), Cashi API ofrece una solución robusta, escalable y fácil de usar para crear, actualizar y consultar transacciones y categorías de gastos. Perfecta para aplicaciones web, móviles o de escritorio que necesiten gestionar finanzas personales.

## ✨ Características

### 🎯 Funcionalidades Principales
- ✅ **Gestión completa de categorías** - CRUD completo con validación
- ✅ **CRUD de transacciones financieras** - Control total sobre ingresos y gastos
- ✅ **Validación robusta de datos** - Usando Zod para seguridad de tipos
- ✅ **Base de datos PostgreSQL** - Relacional y confiable con Prisma ORM
- ✅ **API RESTful moderna** - Construida con Hono para máximo rendimiento
- ✅ **TypeScript** - Seguridad de tipos en toda la aplicación
- ✅ **Docker Compose** - Despliegue simplificado y reproducible
- ✅ **Autenticación JWT** - Seguridad de endpoints con tokens
- ✅ **Hasheo de contraseñas** - Bcryptjs para máxima seguridad

### 🔒 Seguridad
- Validación de datos en cada endpoint
- Tokens JWT para autenticación
- Contraseñas hasheadas con bcryptjs
- CORS configurado
- Rate limiting ready

### ⚡ Rendimiento
- Framework Hono optimizado
- ORM Prisma con queries eficientes
- Conexión pooling a base de datos
- Respuestas JSON comprimidas

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

| Requisito | Versión | Descripción |
|-----------|---------|-------------|
| **Node.js** | 18.x + | Runtime de JavaScript. [Descargar](https://nodejs.org/) |
| **npm o yarn** | Latest | Gestor de paquetes |
| **Docker** | Latest | Para ejecutar PostgreSQL en contenedor (opcional) |
| **PostgreSQL** | 16+ | Sistema de gestión de base de datos (si no usas Docker) |
| **Git** | Latest | Control de versiones |

### Verificar Instalación

```bash
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar Docker (opcional)
docker --version

# Verificar PostgreSQL (opcional)
psql --version
```

## 🚀 Instalación

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/cashi-api.git
cd cashi-api
```

### Paso 2: Instalar Dependencias

```bash
npm install
# o si usas yarn
yarn install
```

### Paso 3: Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con la siguiente configuración:

```env
# ========== BASE DE DATOS ==========
DATABASE_URL="postgresql://cashiuser:cashipass123@localhost:5433/cashi"

# ========== SERVIDOR ==========
PORT=3000
NODE_ENV=development

# ========== AUTENTICACIÓN ==========
JWT_SECRET="tu-clave-secreta-super-segura-cambiar-en-produccion"
JWT_EXPIRES_IN="24h"

# ========== CONFIGURACIÓN ADICIONAL ==========
CORS_ORIGIN="http://localhost:3000,http://localhost:5173"
LOG_LEVEL="debug"
```

### Paso 4: Iniciar la Base de Datos

#### Opción A: Docker Compose ✅ **Recomendado**

```bash
docker-compose up -d
```

**Credenciales automáticas:**
- 👤 Usuario: `cashiuser`
- 🔐 Contraseña: `cashipass123`
- 🗄️ Base de datos: `cashi`
- 🔗 Puerto: `5433`

#### Opción B: PostgreSQL Local

Asegúrate de tener PostgreSQL ejecutándose localmente:

```bash
# En Windows (si tienes pgAdmin)
psql -U postgres -c "CREATE DATABASE cashi;"
psql -U postgres -d cashi -c "CREATE USER cashiuser WITH PASSWORD 'cashipass123';"
psql -U postgres -d cashi -c "GRANT ALL PRIVILEGES ON DATABASE cashi TO cashiuser;"

# En Linux/Mac
sudo -u postgres createdb cashi
sudo -u postgres createuser -P cashiuser
```

### Paso 5: Ejecutar Migraciones de Prisma

```bash
# Crear esquema inicial
npx prisma migrate dev --name init

# O sincronizar esquema
npx prisma db push
```

### Paso 6: Generar Cliente Prisma

```bash
npx prisma generate
```

### Paso 7: Iniciar el Servidor

```bash
# Modo desarrollo (con recarga automática)
npm run dev

# O con tsx directamente
tsx watch src/index.ts
```

✅ **El servidor estará disponible en:** `http://localhost:3000`

## 🧪 Validar la Instalación

```bash
# Probar conexión a la base de datos
node test-connection.js

# Si todo es correcto, deberías ver:
# ✅ Conexión exitosa a PostgreSQL
# ✅ Base de datos lista para usar
```

## 📁 Estructura del Proyecto

```
cashi-api/
├── src/
│   ├── index.ts                    # 🎯 Punto de entrada principal
│   ├── controllers/
│   │   ├── category.controller.ts  # Lógica de categorías
│   │   ├── transaction.controller.ts
│   │   └── auth.controller.ts      # Autenticación (si existe)
│   ├── routes/
│   │   ├── category.routes.ts      # Endpoints de categorías
│   │   ├── transaction.routes.ts   # Endpoints de transacciones
│   │   └── index.ts                # Agregación de rutas
│   ├── repositories/               # Capa de acceso a datos
│   │   ├── category.repository.ts
│   │   └── transaction.repository.ts
│   ├── schemas/                    # Esquemas de validación Zod
│   │   ├── category.schema.ts
│   │   └── transaction.schema.ts
│   ├── middleware/                 # Middleware personalizado
│   │   ├── auth.ts                 # Verificación JWT
│   │   └── errorHandler.ts         # Manejo de errores
│   ├── types/                      # Tipos TypeScript
│   │   └── index.ts
│   └── lib/                        # Utilidades y funciones auxiliares
│       ├── db.ts                   # Cliente Prisma
│       └── jwt.ts                  # Funciones JWT
├── prisma/
│   ├── schema.prisma               # 🗄️ Esquema de base de datos
│   └── migrations/                 # Historial de migraciones
├── docker-compose.yml              # 🐳 Configuración Docker
├── .env.example                    # Plantilla de variables de entorno
├── tsconfig.json                   # Configuración TypeScript
├── package.json                    # Dependencias del proyecto
├── test-connection.js              # Script de validación
└── README.md                       # Este archivo

```

### 📊 Descripción de Carpetas

| Carpeta | Propósito |
|---------|-----------|
| `src/controllers` | Lógica de negocio de la aplicación |
| `src/routes` | Definición de endpoints HTTP |
| `src/repositories` | Acceso y manipulación de datos |
| `src/schemas` | Validación de payloads con Zod |
| `src/middleware` | Interceptores de peticiones |
| `src/types` | Tipos e interfaces TypeScript |
| `src/lib` | Funciones utilitarias reutilizables |
| `prisma` | Configuración ORM y migraciones |

## 🔌 API Endpoints

### 📚 Convenciones

- **Base URL:** `http://localhost:3000`
- **Content-Type:** `application/json`
- **Autenticación:** Bearer Token en header `Authorization`

### 🏷️ Categorías

#### Obtener todas las categorías
```http
GET /categories
Authorization: Bearer <token>
```

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Alimentación"
  },
  {
    "id": 2,
    "name": "Transporte"
  },
  {
    "id": 3,
    "name": "Entretenimiento"
  }
]
```

#### Crear categoría
```http
POST /categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Entretenimiento"
}
```

**Respuesta (201 Created):**
```json
{
  "id": 3,
  "name": "Entretenimiento"
}
```

**Errores:**
- `400 Bad Request` - Nombre vacío o inválido
- `409 Conflict` - Categoría duplicada

#### Obtener categoría por ID
```http
GET /categories/:id
Authorization: Bearer <token>
```

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "name": "Alimentación",
  "transactions": []
}
```

#### Actualizar categoría
```http
PUT /categories/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Comida y Bebidas"
}
```

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "name": "Comida y Bebidas"
}
```

#### Eliminar categoría
```http
DELETE /categories/:id
Authorization: Bearer <token>
```

**Respuesta (204 No Content)**

---

### 💸 Transacciones

#### Obtener todas las transacciones
```http
GET /transactions
Authorization: Bearer <token>
```

**Query Parameters (opcionales):**
- `categoryId` - Filtrar por categoría
- `type` - Filtrar por tipo (gasto, ingreso)
- `limit` - Número máximo de resultados (default: 100)
- `offset` - Desplazamiento para paginación (default: 0)

**Respuesta (200 OK):**
```json
[
  {
    "id": 1,
    "amount": 50.00,
    "type": "gasto",
    "description": "Compra de groceries",
    "date": "2024-05-11T10:30:00Z",
    "categoryId": 1,
    "category": {
      "id": 1,
      "name": "Alimentación"
    }
  },
  {
    "id": 2,
    "amount": 25.50,
    "type": "ingreso",
    "description": "Freelance payment",
    "date": "2024-05-10T15:00:00Z",
    "categoryId": 2,
    "category": {
      "id": 2,
      "name": "Ingresos"
    }
  }
]
```

#### Crear transacción
```http
POST /transactions
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 75.50,
  "type": "gasto",
  "description": "Cena en restaurante",
  "date": "2024-05-11T20:00:00Z",
  "categoryId": 1
}
```

**Respuesta (201 Created):**
```json
{
  "id": 3,
  "amount": 75.50,
  "type": "gasto",
  "description": "Cena en restaurante",
  "date": "2024-05-11T20:00:00Z",
  "categoryId": 1,
  "category": {
    "id": 1,
    "name": "Alimentación"
  }
}
```

#### Obtener transacción por ID
```http
GET /transactions/:id
Authorization: Bearer <token>
```

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "amount": 50.00,
  "type": "gasto",
  "description": "Compra de groceries",
  "date": "2024-05-11T10:30:00Z",
  "categoryId": 1,
  "category": {
    "id": 1,
    "name": "Alimentación"
  }
}
```

#### Actualizar transacción
```http
PUT /transactions/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "amount": 80.00,
  "description": "Cena en restaurante actualizada"
}
```

**Respuesta (200 OK):**
```json
{
  "id": 1,
  "amount": 80.00,
  "type": "gasto",
  "description": "Cena en restaurante actualizada",
  "date": "2024-05-11T20:00:00Z",
  "categoryId": 1,
  "category": {
    "id": 1,
    "name": "Alimentación"
  }
}
```

#### Eliminar transacción
```http
DELETE /transactions/:id
Authorization: Bearer <token>
```

**Respuesta (204 No Content)**

#### Obtener estadísticas de transacciones
```http
GET /transactions/stats/summary
Authorization: Bearer <token>
```

**Respuesta (200 OK):**
```json
{
  "totalIncome": 5000.00,
  "totalExpenses": 2500.00,
  "balance": 2500.00,
  "transactionCount": 25,
  "averageExpense": 100.00
}
```

## 🗄️ Modelo de Datos

### Category (Categoría)

```typescript
model Category {
  id            Int      @id @default(autoincrement())
  name          String   @unique
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  transactions  Transaction[]
}
```

**Campos:**
- `id` - Identificador único (auto-incrementable)
- `name` - Nombre de la categoría (único)
- `createdAt` - Fecha de creación
- `updatedAt` - Fecha de última actualización
- `transactions` - Relación inversa a transacciones

### Transaction (Transacción)

```typescript
model Transaction {
  id          Int      @id @default(autoincrement())
  amount      Float    @db.Decimal(10, 2)
  type        String   // "gasto" | "ingreso"
  description String?
  date        DateTime
  categoryId  Int
  category    Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

**Campos:**
- `id` - Identificador único
- `amount` - Monto de la transacción (decimal)
- `type` - Tipo: "gasto" o "ingreso"
- `description` - Descripción opcional
- `date` - Fecha de la transacción
- `categoryId` - Clave foránea a categoría
- `category` - Relación a categoría
- `createdAt` - Fecha de creación
- `updatedAt` - Fecha de última actualización

## 🛠️ Scripts Disponibles

### 🔧 Desarrollo

```bash
# Iniciar servidor en modo watch (recarga automática)
npm run dev

# O directamente con tsx
tsx watch src/index.ts

# Compilar TypeScript
npm run build

# Ejecutar versión compilada
npm start
```

### 🗄️ Base de Datos

```bash
# Ejecutar migraciones pendientes
npx prisma migrate dev --name nombre_de_migracion

# Sincronizar esquema (sin crear migración)
npx prisma db push

# Revertir última migración
npx prisma migrate resolve --rolled-back nombre_migracion

# Generar cliente Prisma
npx prisma generate

# Abrir Prisma Studio (interfaz gráfica)
npx prisma studio

# Resetear base de datos (⚠️ DESTRUCTIVO)
npx prisma migrate reset

# Ver historial de migraciones
npx prisma migrate status

# Crear seed (datos iniciales)
npx prisma db seed
```

### 🧪 Testing y Validación

```bash
# Probar conexión a la base de datos
node test-connection.js

# Con npm
npm test

# Con coverage
npm run test:coverage
```

### 📦 Producción

```bash
# Instalar dependencias de producción
npm install --production

# Compilar y ejecutar
npm run build && npm start

# Con PM2 (recomendado)
pm2 start "npm start" --name cashi-api
```

## 🔧 Tecnologías Utilizadas

| Tecnología | Versión | Descripción |
|-----------|---------|-------------|
| **Hono** | ^4.12.18 | Framework web ultrarrápido y moderno |
| **Prisma** | ^6.19.3 | ORM type-safe para TypeScript |
| **PostgreSQL** | 16 | Base de datos relacional robusta |
| **TypeScript** | ^6.0.3 | Lenguaje tipado para JavaScript |
| **Zod** | ^4.4.3 | Librería de validación con tipos |
| **Node.js** | 18+ | Runtime de JavaScript |
| **bcryptjs** | ^3.0.3 | Hasheo seguro de contraseñas |
| **JWT** | ^9.0.3 | Autenticación con tokens |

### 📚 Stack Tecnológico Completo

```
Frontend Compatible:
├── React / React Native
├── Vue.js
├── Angular
└── Cualquier cliente HTTP

Backend:
├── Node.js 18+
├── Hono (Framework)
└── TypeScript

Base de Datos:
├── PostgreSQL 16
├── Prisma ORM
└── Connection Pooling

Seguridad:
├── JWT
├── bcryptjs
├── CORS
└── Validación Zod
```

## 📖 Guía de Desarrollo

### Crear una Nueva Funcionalidad

1. **Definir esquema en Prisma** (`prisma/schema.prisma`)
   ```prisma
   model NuevaEntidad {
     id Int @id @default(autoincrement())
     nombre String
   }
   ```

2. **Crear migración**
   ```bash
   npx prisma migrate dev --name add_nueva_entidad
   ```

3. **Crear schema de validación** (`src/schemas/nueva.schema.ts`)
   ```typescript
   import { z } from 'zod';
   
   export const nuevoSchema = z.object({
     nombre: z.string().min(1),
   });
   ```

4. **Crear repository** (`src/repositories/nueva.repository.ts`)
   ```typescript
   import { prisma } from '../lib/db';
   
   export const nuevaRepository = {
     findAll: () => prisma.nuevaEntidad.findMany(),
     // ... más métodos
   };
   ```

5. **Crear controller** (`src/controllers/nueva.controller.ts`)
   ```typescript
   export const nuevaController = {
     getAll: async (c) => {
       // lógica
     },
     // ... más métodos
   };
   ```

6. **Crear rutas** (`src/routes/nueva.routes.ts`)
   ```typescript
   import { Hono } from 'hono';
   
   const app = new Hono();
   // ... definir rutas
   export default app;
   ```

7. **Registrar rutas** en `src/index.ts`

### Validación de Datos

La validación se realiza con Zod en los controllers:

```typescript
const parsed = nuevoSchema.safeParse(data);
if (!parsed.success) {
  return c.json({ error: parsed.error.issues }, 400);
}
```

### Manejo de Errores

```typescript
try {
  // operación
} catch (error) {
  console.error(error);
  return c.json({ error: 'Internal Server Error' }, 500);
}
```

## 🚀 Despliegue

### En Heroku

1. Crear cuenta en [heroku.com](https://heroku.com)
2. Instalar Heroku CLI
3. Crear app: `heroku create tu-app-name`
4. Agregar PostgreSQL: `heroku addons:create heroku-postgresql`
5. Push: `git push heroku main`

### En Railway

1. Conectar repositorio en [railway.app](https://railway.app)
2. Agregar plugin PostgreSQL
3. Deploy automático desde push a GitHub

### En Docker (Producción)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
# Build
docker build -t cashi-api:latest .

# Run
docker run -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  cashi-api:latest
```

## 🐛 Solución de Problemas

### ❌ Error: "Cannot find module"
**Causa:** Dependencias no instaladas o node_modules corrupto

```bash
# Solución 1: Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Solución 2: Limpiar npm cache
npm cache clean --force
npm install
```

### ❌ Error: "Conexión rechazada a la base de datos"
**Causa:** PostgreSQL no está ejecutándose o credenciales incorrectas

```bash
# Verificar si Docker está corriendo
docker-compose ps

# Iniciar Docker Compose
docker-compose up -d

# Probar la conexión
node test-connection.js

# Ver logs de Docker
docker-compose logs postgres
```

### ❌ Error: "Prisma Client generation failed"
**Causa:** Problemas al generar el cliente Prisma

```bash
# Regenerar cliente
npx prisma generate

# Reinstalar Prisma
npm uninstall prisma @prisma/client
npm install prisma @prisma/client
npx prisma generate
```

### ❌ Error: "Migraciones fallidas"
**Causa:** Conflicto en historial de migraciones

```bash
# Ver estado de migraciones
npx prisma migrate status

# Resolver migraciones pendientes
npx prisma migrate deploy

# Forzar migración (cuidado - puede perder datos)
npx prisma migrate resolve --rolled-back nombre_migracion
```

### ❌ Error: "Port 3000 already in use"
**Causa:** Otro proceso usando el mismo puerto

```bash
# En Windows (PowerShell)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# En Linux/Mac
lsof -ti:3000 | xargs kill -9

# O cambiar el puerto en .env
PORT=3001
```

### ❌ Error: "JWT validation failed"
**Causa:** Token expirado o inválido

```bash
# Verificar JWT_SECRET en .env
# Generar nuevo token si es necesario
# Asegurarse que el header tenga formato: Bearer <token>
```

### ❌ Error: "TypeError: Cannot read property 'fields' of undefined"
**Causa:** Prisma Client no generado correctamente

```bash
npx prisma generate
npm run dev
```

## 🔍 Logs y Debugging

### Habilitar logs detallados

```env
# En .env
DEBUG=prisma:*
LOG_LEVEL=debug
```

### Ver logs de Prisma
```bash
# En terminal
export DEBUG=prisma:*
npm run dev
```

### Ver logs de Docker
```bash
# Logs de PostgreSQL
docker-compose logs -f postgres

# Logs de la aplicación
docker logs -f <container_id>
```

## 🌐 Variables de Entorno

```env
# ========== BASE DE DATOS (REQUERIDO) ==========
DATABASE_URL="postgresql://usuario:contraseña@host:puerto/base_datos"

# ========== SERVIDOR ==========
PORT=3000
NODE_ENV=development|production

# ========== AUTENTICACIÓN ==========
JWT_SECRET="tu-clave-super-segura"
JWT_EXPIRES_IN="24h"

# ========== CORS ==========
CORS_ORIGIN="http://localhost:3000,http://localhost:5173"

# ========== LOGGING ==========
LOG_LEVEL="debug|info|warn|error"
```

## 📝 Ejemplos de Uso

### Crear categoría y transacción (cURL)

```bash
# 1️⃣ Crear categoría
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d '{
    "name": "Alimentación"
  }'

# Respuesta:
# {"id": 1, "name": "Alimentación"}

# 2️⃣ Crear transacción
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d '{
    "amount": 50.00,
    "type": "gasto",
    "description": "Compra en supermercado",
    "date": "2024-05-11T15:30:00Z",
    "categoryId": 1
  }'

# 3️⃣ Obtener todas las transacciones
curl -H "Authorization: Bearer TU_TOKEN" \
  http://localhost:3000/transactions

# 4️⃣ Obtener una transacción por ID
curl -H "Authorization: Bearer TU_TOKEN" \
  http://localhost:3000/transactions/1

# 5️⃣ Actualizar transacción
curl -X PUT http://localhost:3000/transactions/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d '{
    "amount": 75.00,
    "description": "Compra actualizada"
  }'

# 6️⃣ Eliminar transacción
curl -X DELETE http://localhost:3000/transactions/1 \
  -H "Authorization: Bearer TU_TOKEN"
```

### Usando Postman o Insomnia

1. Importar colección desde `postman-collection.json`
2. Configurar variable de entorno `BASE_URL=http://localhost:3000`
3. Configurar variable `TOKEN` con tu JWT
4. Ejecutar requests

### Usando fetch (JavaScript)

```javascript
// Token
const token = 'tu-jwt-token';

// Crear categoría
fetch('http://localhost:3000/categories', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({ name: 'Comida' })
})
.then(r => r.json())
.then(data => console.log(data));

// Obtener transacciones
fetch('http://localhost:3000/transactions', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(r => r.json())
.then(data => console.log(data));
```

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! 🎉

### Cómo Contribuir

1. **Fork el proyecto**
   ```bash
   git clone https://github.com/tu-usuario/cashi-api.git
   cd cashi-api
   ```

2. **Crea una rama para tu feature**
   ```bash
   git checkout -b feature/TuNuevaFuncionalidad
   ```

3. **Realiza tus cambios**
   - Sigue las convenciones de código existentes
   - Agregue tests si es posible
   - Actualiza documentación

4. **Commit tus cambios**
   ```bash
   git commit -m "feat: Agregada nueva funcionalidad"
   ```

5. **Push a tu rama**
   ```bash
   git push origin feature/TuNuevaFuncionalidad
   ```

6. **Abre un Pull Request**
   - Describe tus cambios claramente
   - Referencia issues relacionados
   - Agrega screenshots si es relevante

### Guías de Estilo

- **TypeScript:** Usa tipos explícitos
- **Nombres:** camelCase para variables, PascalCase para clases
- **Commits:** Usa [Conventional Commits](https://www.conventionalcommits.org/)
- **Formato:** `prettier` para código consistente

### Reportar Bugs

1. Verifica si el bug ya existe en [Issues](https://github.com/tu-repo/cashi-api/issues)
2. Crea un nuevo issue con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Información de entorno (OS, Node version, etc.)

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.

```
MIT License

Copyright (c) 2024-2026 Cashi API Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...

See LICENSE file for full license text.
```

## 👥 Autor

**Tu Nombre / Equipo**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@example.com
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tu-perfil)

## 💬 Soporte y Contacto

### ¿Necesitas ayuda?

- 📝 Abre un [Issue](https://github.com/tu-repo/cashi-api/issues)
- 💬 Discussiones en [GitHub Discussions](https://github.com/tu-repo/cashi-api/discussions)
- 📧 Email: soporte@cashi-api.com

### Comunidad

- 🌐 Website: https://cashi-api.com
- 📚 Documentación Completa: https://docs.cashi-api.com
- 🐦 Twitter: [@cashi_api](https://twitter.com/cashi_api)
- 💬 Discord: [Servidor Cashi](https://discord.gg/cashi)

## 📚 Recursos Útiles

### Documentación Oficial

- [Hono Documentation](https://hono.dev/) - Framework
- [Prisma Documentation](https://www.prisma.io/docs/) - ORM
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) - Base de datos
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Lenguaje
- [Zod Documentation](https://zod.dev/) - Validación

### Tutoriales y Artículos

- [Construyendo APIs con Hono](https://dev.to/)
- [Prisma Best Practices](https://www.prisma.io/docs/guides/)
- [Autenticación JWT en Node.js](https://jwt.io/)

### Herramientas Recomendadas

- **Postman** - Testing de API: https://www.postman.com/
- **Insomnia** - Cliente REST: https://insomnia.rest/
- **DBeaver** - Gestor de BD: https://dbeaver.io/
- **Prisma Studio** - UI para BD: Integrada

## 🎯 Roadmap

### v1.1.0 (Próximamente)
- [ ] Autenticación de usuarios completa
- [ ] Dashboard de estadísticas
- [ ] Exportar datos a CSV/Excel
- [ ] Soporte multi-usuario

### v2.0.0 (Futuro)
- [ ] Presupuestos y alertas
- [ ] Integración con bancos
- [ ] App móvil nativa
- [ ] Análisis predictivo

## 📊 Estadísticas del Proyecto

- ⭐ Stars: 0 (¡Sé el primero!)
- 🍴 Forks: 0
- 👁️ Watchers: 0
- 📦 Releases: 1
- 🐛 Issues Abiertos: 0

## 🙏 Agradecimientos

Gracias a:
- [Hono](https://hono.dev/) por el excelente framework
- [Prisma](https://www.prisma.io/) por el ORM increíble
- Todos los [contributors](https://github.com/tu-repo/cashi-api/graphs/contributors)
- La comunidad de Node.js

## 📅 Versión

**v1.0.0** - 31 de mayo de 2026

Changelog disponible en [CHANGELOG.md](CHANGELOG.md)

---

<div align="center">

**Hecho con ❤️ por la comunidad de desarrolladores**

[⬆ Ir arriba](#-cashi-api)

</div>
