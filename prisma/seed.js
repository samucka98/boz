const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed...');

  // Verificar se já existe um admin
  const existingAdmin = await prisma.user.findFirst({
    where: {
      email: 'admin@admin'
    }
  });

  if (existingAdmin) {
    console.log('✅ Admin já existe no banco de dados');
    return;
  }

  // Criar hash da senha
  const hashedPassword = await bcrypt.hash('admin', 10);

  // Criar usuário admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@admin',
      password: hashedPassword,
      name: 'Administrador',
      role: 'ADMIN'
    }
  });

  console.log('✅ Usuário admin criado:', admin.email);
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 