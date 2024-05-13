<template>
  <div class="container-fluid d-flex flex-column justify-content-center align-items-center flex-column">
    <!-- Seção de Pesquisa por Nome -->
    <div class="row col-4">
      <!-- Barra de Pesquisa por Nome -->
      <div class="col-12 my-4">
        <label for="search"><strong class="text-light">Pesquisar por Nome:</strong></label>
        <input type="text" class="form-control" v-model="search" @input="updateSearchResults"
          placeholder="Digite o nome do cliente">
        <!-- Lista de sugestões de clientes -->
        <div class="position-relative">
          <ul class="list-group z-3 w-100 position-absolute" v-show="showSearchResults && searchResults.length > 0">
            <li class="list-group-item z-3 w-100 d-flex justify-content-between" v-for="(cliente, empreendimento, index) in searchResults" :key="index"
              @click="adicionarCliente(cliente, empreendimento)">
              <strong>{{ cliente.fullName }}</strong> {{ cliente.empreendimento }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Lista de Clientes Selecionados -->
    <div class="container mt-4 mb-5">
      <h2>Clientes Selecionados</h2>
      <div class="mb-2">
        <div class="row" v-for="(cliente, index) in clientesSelecionados" :key="index">
          <div class="col-12">
            <div class="card m-2">
              <div class="d-flex flex-row justify-content-between p-3">
                <h5 class="card-title">{{ cliente.fullName }}</h5>
                <p class="card-text">{{ cliente.phoneNumber }} <i class="bi bi-whatsapp"></i></p>
                <p class="card-text">{{ cliente.empreendimento }} <i class="bi bi-building"></i></p>
                <button class="btn btn-danger" @click="removerCliente(index)">Remover</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Opções de Variáveis -->
    <div class="col-4">
      <div class="card">
        <div class="card-body">
          <div v-for="(opcao, index) in opcoesVariaveis" :key="index">
            <button class="btn btn-outline-secondary mr-2 mb-2" @click="adicionarOpcaoVariavel(opcao.label)">{{ opcao.label }}</button>
            <div class="btn-group" v-if="opcao.checked" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-secondary" @click="moveCheckVariavelUp(index)" :disabled="index === 0">&#8679;</button>
              <button type="button" class="btn btn-secondary" @click="moveCheckVariavelDown(index)" :disabled="index === opcoesVariaveis.length - 1">&#8681;</button>
            </div>
          </div>
        </div>
      </div>

      <div class="input-group mt-3">
        <input type="text" class="form-control" v-model="novaVariavel" placeholder="Nova Variável">
        <button class="btn btn-primary" @click="adicionarVariavel">Adicionar</button>
      </div>

      <div v-if="variaveisAdicionadas.length > 0" class="mt-3">
        <div class="card" v-for="(variavel, index) in variaveisAdicionadas" :key="index">
          <div class="card-body d-flex justify-content-between align-items-center">
            <p class="card-text">{{ variavel }}</p>
            <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-secondary" @click="moveVariavelUp(index)" :disabled="index === 0">&#8679;</button>
              <button type="button" class="btn btn-secondary" @click="moveVariavelDown(index)" :disabled="index === variaveisAdicionadas.length - 1">&#8681;</button>
              <button class="btn btn-danger" @click="removerVariavel(index)">X</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botão de exportar -->
    <div class="col-4">
      <button class="btn btn-success" @click="exportarCSV" :disabled="clientesSelecionados.length === 0">Exportar CSV</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import clientesData from '@/assets/clientes/clientes.json';

// Variáveis reativas
const search = ref('');
const searchResults = ref([]);
const showSearchResults = ref(false);
const clientesSelecionados = ref([]);
const novaVariavel = ref('');
const variaveisAdicionadas = ref([]);
const opcoesVariaveis = ref([
  { label: 'Nome', checked: false },
  { label: 'Empreendimento', checked: false },
  { label: 'Menin Engenharia', checked: false }
]);

// Array reativo para armazenar os clientes do JSON
const clientes = ref(clientesData);

// Métodos
const updateSearchResults = () => {
  if (search.value) {
    const termoPesquisa = search.value.toLowerCase();
    searchResults.value = clientes.value.filter(cliente =>
      cliente.fullName.toLowerCase().includes(termoPesquisa)
    );
    showSearchResults.value = true;
  } else {
    searchResults.value = [];
    showSearchResults.value = false;
  }
};

const adicionarCliente = (cliente) => {
  clientesSelecionados.value.push(cliente);
  search.value = ''; // Limpa o campo de pesquisa após adicionar o cliente
  showSearchResults.value = false; // Esconde a lista de sugestões
};

const removerCliente = (index) => {
  clientesSelecionados.value.splice(index, 1);
};


const adicionarOpcaoVariavel = (label) => {
  if (!variaveisAdicionadas.value.includes(label)) {
    variaveisAdicionadas.value.push(label);
  }
};

const adicionarVariavel = () => {
  if (novaVariavel.value.trim() !== '') {
    variaveisAdicionadas.value.push(novaVariavel.value);
    novaVariavel.value = ''; // Limpa o campo de nova variável após adicionar
  }
};

const removerVariavel = (index) => {
  variaveisAdicionadas.value.splice(index, 1);
};

const moveVariavelUp = (index) => {
  if (index > 0) {
    const temp = variaveisAdicionadas.value[index];
    variaveisAdicionadas.value[index] = variaveisAdicionadas.value[index - 1];
    variaveisAdicionadas.value[index - 1] = temp;
  }
};

const moveVariavelDown = (index) => {
  if (index < variaveisAdicionadas.value.length - 1) {
    const temp = variaveisAdicionadas.value[index];
    variaveisAdicionadas.value[index] = variaveisAdicionadas.value[index + 1];
    variaveisAdicionadas.value[index + 1] = temp;
  }
};

const moveCheckVariavelUp = (index) => {
  if (index > 0) {
    const temp = opcoesVariaveis.value[index];
    opcoesVariaveis.value[index] = opcoesVariaveis.value[index - 1];
    opcoesVariaveis.value[index - 1] = temp;
  }
};

const moveCheckVariavelDown = (index) => {
  if (index < opcoesVariaveis.value.length - 1) {
    const temp = opcoesVariaveis.value[index];
    opcoesVariaveis.value[index] = opcoesVariaveis.value[index + 1];
    opcoesVariaveis.value[index + 1] = temp;
  }
};

const exportarCSV = () => {
  if (clientesSelecionados.length === 0) return; // Retorna se não houver clientes selecionados
  
  let csvContent = 'phone';
  let variaveisCount = 0;
  opcoesVariaveis.value.forEach((opcao, index) => {
    if (opcao.checked) {
      variaveisCount++;
      csvContent += `,variable${variaveisCount}`;
    }
  });
  csvContent += '\n';

  // Solicitar o nome do documento
  const nomeDocumento = prompt("Por favor, insira o nome do documento:");

  csvContent += clientesSelecionados.value.map(cliente => {
    let content = cliente.phoneNumber;
    opcoesVariaveis.value.forEach(opcao => {
      if (opcao.checked) {
        content += `,${opcao.label === 'Nome' ? cliente.fullName.split(' ')[0] : cliente[opcao.label.toLowerCase()]}`;
      }
    });
    return content;
  }).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${nomeDocumento}.csv`);
  document.body.appendChild(link);
  link.click();
};
</script>
