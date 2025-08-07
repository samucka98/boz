const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Testar conexão
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Conexão com banco de dados estabelecida');
  } catch (error) {
    console.error('❌ Erro ao conectar com banco de dados:', error);
    process.exit(1);
  }
}

module.exports = { prisma, testConnection }; 