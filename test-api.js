const axios = require('axios');

const BASE_URL = 'http://localhost:3001';

async function testAPI() {
  console.log('🧪 Testando API FRT Server...\n');

  try {
    // 1. Testar health check
    console.log('1️⃣ Testando health check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);
    console.log('');

    // 2. Testar login do admin
    console.log('2️⃣ Testando login do admin...');
    const loginResponse = await axios.post(`${BASE_URL}/api/auth/login`, {
      email: 'admin@admin',
      password: 'admin'
    });
    console.log('✅ Login realizado:', loginResponse.data.message);
    const token = loginResponse.data.data.token;
    console.log('');

    // 3. Testar obter perfil
    console.log('3️⃣ Testando obter perfil...');
    const profileResponse = await axios.get(`${BASE_URL}/api/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Perfil obtido:', profileResponse.data.data.name);
    console.log('');

    // 4. Testar listar usuários (apenas admin)
    console.log('4️⃣ Testando listar usuários...');
    const usersResponse = await axios.get(`${BASE_URL}/api/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Usuários listados:', usersResponse.data.data.length, 'usuário(s)');
    console.log('');

    // 5. Testar criar novo usuário
    console.log('5️⃣ Testando criar novo usuário...');
    const newUserResponse = await axios.post(`${BASE_URL}/api/users`, {
      email: 'usuario@teste.com',
      password: 'senha123',
      name: 'Usuário Teste',
      role: 'USER'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Usuário criado:', newUserResponse.data.data.name);
    const newUserId = newUserResponse.data.data.id;
    console.log('');

    // 6. Testar atualizar usuário
    console.log('6️⃣ Testando atualizar usuário...');
    const updateResponse = await axios.put(`${BASE_URL}/api/users/${newUserId}`, {
      name: 'Usuário Teste Atualizado'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Usuário atualizado:', updateResponse.data.data.name);
    console.log('');

    // 7. Testar deletar usuário
    console.log('7️⃣ Testando deletar usuário...');
    const deleteResponse = await axios.delete(`${BASE_URL}/api/users/${newUserId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Usuário deletado:', deleteResponse.data.message);
    console.log('');

    console.log('🎉 Todos os testes passaram com sucesso!');

  } catch (error) {
    console.error('❌ Erro nos testes:', error.response?.data || error.message);
  }
}

// Executar testes
testAPI(); 