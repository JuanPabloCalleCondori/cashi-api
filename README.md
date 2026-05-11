# 💰 Cashi API

API RESTful para la gestión de finanzas personales. Desarrollada con Hono, Prisma y PostgreSQL, permite crear, actualizar y consultar transacciones y categorías de gastos.

## ✨ Características

- ✅ Gestión completa de categorías
- ✅ CRUD de transacciones financieras
- ✅ Validación de datos con Zod
- ✅ Base de datos PostgreSQL con Prisma ORM
- ✅ API RESTful moderna con Hono
- ✅ TypeScript para seguridad de tipos
- ✅ Docker Compose para fácil despliegue

## 📋 Requisitos Previos

- Node.js 18.x o superior
- npm o yarn
- Docker y Docker Compose (opcional, para la base de datos)
- PostgreSQL 16 (si no usas Docker)

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd cashi-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DATABASE_URL="postgresql://cashiuser:cashipass123@localhost:5433/cashi"

# Puerto de la API
PORT=3000
```

### 4. Iniciar la base de datos

#### Opción A: Usar Docker Compose (recomendado)

```bash
docker-compose up -d
```

Esto levantará un contenedor PostgreSQL con las siguientes credenciales:
- Usuario: `cashiuser`
- Contraseña: `cashipass123`
- Base de datos: `cashi`
- Puerto: `5433`

#### Opción B: PostgreSQL local

Asegúrate de tener PostgreSQL ejecutándose en `localhost:5432` con las credenciales correspondientes.

### 5. Ejecutar migraciones de Prisma

```bash
npx prisma migrate dev --name init
```

### 6. Iniciar el servidor

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
cashi-api/
├── src/
│   ├── index.ts              # Punto de entrada principal
│   ├── controllers/          # Lógica de negocio
│   │   ├── category.controller.ts
│   │   └── transaction.controller.ts
│   ├── routes/              # Definición de rutas
│   │   ├── category.routes.ts
│   │   └── transaction.routes.ts
│   ├── repositories/        # Acceso a datos
│   ├── schemas/             # Esquemas de validación Zod
│   └── lib/                 # Utilidades y funciones auxiliares
├── prisma/
│   ├── schema.prisma        # Esquema de base de datos
│   └── migrations/          # Historial de migraciones
├── docker-compose.yml       # Configuración de Docker
├── package.json             # Dependencias del proyecto
├── tsconfig.json            # Configuración de TypeScript
├── test-connection.js       # Script de prueba de conexión
└── README.md                # Este archivo
```

## 🔌 API Endpoints

### Categorías

#### Obtener todas las categorías
```
GET /categories
```

Respuesta:
```json
[
  {
    "id": 1,
    "name": "Alimentación"
  },
  {
    "id": 2,
    "name": "Transporte"
  }
]
```

#### Crear categoría
```
POST /categories
Content-Type: application/json

{
  "name": "Entretenimiento"
}
```

#### Obtener categoría por ID
```
GET /categories/:id
```

#### Actualizar categoría
```
PUT /categories/:id
Content-Type: application/json

{
  "name": "Nuevo nombre"
}
```

#### Eliminar categoría
```
DELETE /categories/:id
```

### Transacciones

#### Obtener todas las transacciones
```
GET /transactions
```

Respuesta:
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
  }
]
```

#### Crear transacción
```
POST /transactions
Content-Type: application/json

{
  "amount": 75.50,
  "type": "gasto",
  "description": "Cena en restaurante",
  "date": "2024-05-11T20:00:00Z",
  "categoryId": 1
}
```

#### Obtener transacción por ID
```
GET /transactions/:id
```

#### Actualizar transacción
```
PUT /transactions/:id
Content-Type: application/json

{
  "amount": 80.00,
  "description": "Cena en restaurante actualizada"
}
```

#### Eliminar transacción
```
DELETE /transactions/:id
```

## 🗄️ Modelo de Datos

### Category
```typescript
{
  id: Int           // ID único (autoincrement)
  name: String      // Nombre de la categoría
  transactions: Transaction[] // Relación inversa
}
```

### Transaction
```typescript
{
  id: Int           // ID único (autoincrement)
  amount: Float     // Monto de la transacción
  type: String      // Tipo (ej: "gasto", "ingreso")
  description: String? // Descripción opcional
  date: DateTime    // Fecha de la transacción
  categoryId: Int   // ID de la categoría (clave foránea)
  category: Category // Relación a categoría
}
```

## 🛠️ Scripts Disponibles

### Desarrollo

```bash
npm run dev
```
Inicia el servidor en modo watch. Reinicia automáticamente al detectar cambios.

### Base de datos

```bash
# Ejecutar migraciones
npx prisma migrate dev

# Generar cliente Prisma
npx prisma generate

# Abrir Prisma Studio (interfaz gráfica)
npx prisma studio

# Crear una nueva migración
npx prisma migrate dev --name nombre_migracion
```

### Pruebas

```bash
# Probar conexión a la base de datos
node test-connection.js
```

## 🔧 Tecnologías Utilizadas

| Tecnología | Versión | Descripción |
|-----------|---------|-------------|
| Hono | ^4.12.18 | Framework web moderno y rápido |
| Prisma | ^6.19.3 | ORM para TypeScript |
| PostgreSQL | 16 | Base de datos relacional |
| TypeScript | ^6.0.3 | Lenguaje tipado |
| Zod | ^4.4.3 | Validación de esquemas |
| Node.js | 18+ | Runtime de JavaScript |

## 📚 Documentación Adicional

### Prisma
- [Documentación oficial](https://www.prisma.io/docs/)
- [Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)

### Hono
- [Documentación oficial](https://hono.dev/)
- [Guía de inicio rápido](https://hono.dev/docs/getting-started/basic)

### PostgreSQL
- [Documentación oficial](https://www.postgresql.org/docs/)

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstala las dependencias
npm install
```

### Error: "Conexión rechazada a la base de datos"
```bash
# Verifica que PostgreSQL esté ejecutándose
# Si usas Docker:
docker-compose ps

# Prueba la conexión
node test-connection.js
```

### Error: "Prisma Client generation failed"
```bash
# Regenera el cliente Prisma
npx prisma generate
```

### Migraciones fallidas
```bash
# Verifica el estado de las migraciones
npx prisma migrate status

# Resuelve migraciones pendientes
npx prisma migrate deploy
```

## 🌐 Variables de Entorno

```env
# Conexión a la base de datos (obligatorio)
DATABASE_URL=postgresql://usuario:contraseña@host:puerto/base_datos

# Puerto del servidor (opcional, por defecto 3000)
PORT=3000

# Entorno de ejecución (desarrollo/producción)
NODE_ENV=development
```

## 📝 Ejemplo de Uso

### Crear una categoría y agregar una transacción

```bash
# 1. Crear categoría
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{"name": "Alimentación"}'

# 2. Crear transacción
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50.00,
    "type": "gasto",
    "description": "Compra en supermercado",
    "date": "2024-05-11T15:30:00Z",
    "categoryId": 1
  }'

# 3. Obtener todas las transacciones
curl http://localhost:3000/transactions
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

**Cashi API** - API de gestión de finanzas personales

## 📞 Soporte

Si encuentras problemas o tienes preguntas:
- Abre un issue en el repositorio
- Revisa la [documentación de Prisma](https://www.prisma.io/docs/)
- Consulta la [documentación de Hono](https://hono.dev/)

---

**Última actualización:** 11 de mayo de 2026
