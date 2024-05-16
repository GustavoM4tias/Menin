<template>
  <!-- Aqui você pode adicionar sua interface de usuário, se necessário -->
</template>

<script setup>
  // A string com as informações dos clientes
  const clientesString = `
  
  ALEXANDRE BRITO DE MOURA	17981437000	Nova Marília
ANA BEATRIZ DE PAULA MENIN	19991339767	Nova Marília
ELVIS WILLIAM SAES MUNHOZ	19996989483	Nova Marília
FRANCISCO HOMERO SERAFIM	14998962225	Nova Marília
LOURISVAL PEREIRA DE SOUZA PARDIM	12997092446	Nova Marília
PAULO HENRIQUE SANTOS LOPES	17634517684	Nova Marília
ROBERTO RIBEIRO CAVALCANTE	18998998601	Nova Marília
SANDRA REGINA AGUIAR FERNANDES	17997167500	Nova Marília
WELLINGTON ROCHA	19997001578	Nova Marília
YNGRID KAROLLINE MENDONÇA COSTA	19996309646	Nova Marília


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
