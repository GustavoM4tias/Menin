<template>
  <!-- Aqui você pode adicionar sua interface de usuário, se necessário -->
</template>

<script setup>
  // A string com as informações dos clientes
  const clientesString = `
  
  LUCAS GALVAO DE ALCANTARA MACHIONI	14996230507	Montana
GABRIELLE DA SILVA NOGUEIRA	14997822628	Montana
ROGERIO CRISTIANO DA CUNHA CANCINI	14998550651	Montana
SAULO ROBERTO LOPES	11966475855	Montana
QUIARA MARTINS MURCIA	14998972316	Montana
LUCAS RODRIGUES BIZERRA	14981409820	Montana
HENRIQUE HERINGUER BALMANT	14999069979	Montana
ESTELA LUIZ DE ALMEIDA	14996109310	Montana
ROSEMEIRE MOREIRA DA SILVA	14996187261	Montana
SANDRA COSTA DE PAULO CARIOCA	19984442002	Montana
EDILSON CARVALHO DOS SANTOS	14998242340	Montana


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
