<template>
  <!-- Aqui você pode adicionar sua interface de usuário, se necessário -->
</template>

<script setup>
  // A string com as informações dos clientes
  const clientesString = `
  
  `;

  // Dividindo a string em linhas
  const clientesArray = clientesString.trim().split('\n');

  // Mapeando as linhas para objetos JSON
  const clientesJSON = clientesArray.map(cliente => {
    const [fullName, phoneNumber, empreendimento] = cliente.split('\t');
    return {
      fullName: formatarNome(fullName),
      phoneNumber: `+55${phoneNumber}`,
      empreendimento
    };
  });

  // Função para formatar o nome
  function formatarNome(nome) {
    return nome
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Convertendo o array de objetos JSON para uma string JSON formatada
  const clientesJSONString = JSON.stringify(clientesJSON, null, 2);

  console.log(clientesJSONString); // Exibindo o JSON formatado no console para verificação
</script>
