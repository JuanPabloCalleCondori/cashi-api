const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✓ Conexión exitosa:', result);
  } catch (error) {
    console.error('✗ Error de conexión:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
