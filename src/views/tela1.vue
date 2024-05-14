<template>
  <div class="container-fluid d-flex flex-column justify-content-center align-items-center flex-column">

    <!-- Div para exibir variáveis selecionadas -->
    <div class="col-lg-5">
      <div class="d-flex justify-content-center text-light">
        <h2 class="my-3">Gerador de disparo</h2>
      </div>
      <div class="card py-3 d-flex flex-column align-items-center">

        <h5 class="my-2">Adicionar nova variavel:</h5>
        <div class="input-group w-75">
          <input type="text" class="form-control" v-model="novaVariavel" placeholder="Nova Variável">
          <button class="btn btn-primary" @click="adicionarNovaVariavel">+ Variável</button>
        </div>

        <h5 class="my-2">Variaveis mais utilizadas:</h5>
        <div class="my-2">
          <button class="btn btn-outline-primary mx-1" @click="adicionarVariavel('Nome Cliente')">Nome
            Cliente</button>
          <button class="btn btn-outline-primary mx-1"
            @click="adicionarVariavel('Empreendimento')">Empreendimento</button>
          <button class="btn btn-outline-primary mx-1" @click="adicionarVariavel('Menin Engenharia')">Menin
            Engenharia</button>
          <button class="btn btn-outline-primary mx-1" @click="adicionarVariavel('Construtora Menin')">Construtora
            Menin</button>
        </div>

        <h5 class="my-2">Variáveis Adicionadas:</h5>
        <div class="row mx-3">
          <div class="bg-secondary rounded-pill col-auto d-flex m-1" v-for="(variavel, index) in variaveis"
            :key="index">
            <p class="m-auto text-light px-1" style="font-size: 16px;">{{ variavel }}</p>
            <button class="btn btn-sm text-light" @click="removerVariavel(index)"><i class="bi bi-x"
                style="font-size: 20px;"></i></button>
          </div>
        </div>

        <!-- Botão de exportar -->
        <button class="btn btn-success my-2" @click="exportarCSV" :disabled="clientesSelecionados.length === 0">Exportar
          Arquivo</button>

      </div>
    </div>


    <!-- Seção de Pesquisa por Nome -->
    <div class="col-lg-5">

      <!-- Barra de Pesquisa por Nome -->
      <div class="row my-4">
        <div class="col-9">
          <label for="search">
            <h5 class="text-light">Pesquisar por Nome:</h5>
          </label>
          <input class="form-control py-3 border-dark" type="text" v-model="search" @input="updateSearchResults"
            placeholder="Digite o nome do cliente">

          <!-- Lista de clientes -->
          <div class="position-relative">
            <ul class="list-group z-3 w-100 position-absolute" v-show="showSearchResults && searchResults.length > 0">
              <li class="list-group-item z-3 w-100 d-flex justify-content-between"
                v-for="(cliente, index) in searchResults" :key="index" @click="adicionarCliente(cliente)">
                <strong>{{ cliente.fullName }}</strong> {{ cliente.empreendimento }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Filtro por empreendimento -->
        <div class="col-3">
          <label for="empreendimento">
            <h5 class="text-light">Filtrar:</h5>
          </label>
          <select v-model="selectedEmpreendimento" @change="updateSearchResults" class="form-control py-3 border-dark">
            <option value="">Todos</option>
            <option v-for="empreendimento in empreendimentos" :key="empreendimento" :value="empreendimento">{{
              empreendimento }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Lista de Clientes Selecionados -->
    <div class="col-lg-5 my-2">
      <div class="d-flex justify-content-center text-light">
        <h4>Clientes Selecionados</h4>
      </div>
      <div class="mb-2 clientes-container" style="max-height: 35vh; overflow-y: auto; overflow-x: hidden;">
        <div class="row" v-for="(cliente, index) in clientesSelecionados" :key="index">
          <div class="col-12">
            <div class="card m-1">
              <div class="d-flex flex-row align-items-center justify-content-between p-2">
                <h5 class="card-title my-auto mx-0">{{ cliente.fullName }}</h5>
                <p class="card-text my-auto">{{ cliente.phoneNumber }} <i class="bi bi-whatsapp"></i></p>
                <p class="card-text my-auto">{{ cliente.empreendimento }} <i class="bi bi-building"></i></p>
                <button class="btn btn-danger" @click="removerCliente(index)">Remover</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Estilo do Scroll da lista de Clientes */
.clientes-container::-webkit-scrollbar {
  width: 12px;
}

.clientes-container::-webkit-scrollbar-thumb {
  background: #bdbdbd;
  border-radius: 8px;
}

.clientes-container::-webkit-scrollbar-thumb:hover {
  background: #afafaf;
}
</style>



<script setup>
import { ref } from 'vue';
import clientesTeste from '@/assets/clientes/clientesTeste.json';
import clientesExemplo from '@/assets/clientes/clientesExemplo.json';
import clientesBoulevard from '@/assets/clientes/clientesBoulevard.json';
import clientesTerras1 from '@/assets/clientes/clientesTerras1.json';

// Variáveis reativas
const search = ref('');
const searchResults = ref([]);
const showSearchResults = ref(false);
const clientesSelecionados = ref([]);
const novaVariavel = ref('');
const variaveis = ref([]);
const selectedEmpreendimento = ref('');
const empreendimentos = ref([
  'Terras de São Paulo I',
  'Boulevard',
  'Outro Empreendimento 2'
]);

// Array reativo para armazenar os clientes do JSON
const clientes = ref(clientesTeste.concat(clientesExemplo, clientesBoulevard, clientesTerras1));

// Métodos
const updateSearchResults = () => {
  if (search.value) {
    const termoPesquisa = search.value.toLowerCase();
    searchResults.value = clientes.value.filter(cliente =>
      cliente.fullName.toLowerCase().includes(termoPesquisa) &&
      (selectedEmpreendimento.value ? cliente.empreendimento === selectedEmpreendimento.value : true)
    );
    showSearchResults.value = true;
  } else {
    searchResults.value = [];
    showSearchResults.value = false;
  }
};










const adicionarCliente = (cliente, empreendimento) => {
  cliente.variaveis = [];
  clientesSelecionados.value.push(cliente);
  search.value = ''; // Limpa o campo de pesquisa após adicionar o cliente
  showSearchResults.value = false; // Esconde a lista de sugestões
};

const removerCliente = (index) => {
  clientesSelecionados.value.splice(index, 1);
};

const adicionarVariavel = (variavel) => {
  variaveis.value.push(variavel);
};

const adicionarNovaVariavel = () => {
  if (novaVariavel.value.trim() !== '') {
    variaveis.value.push(novaVariavel.value.trim());
    console.log(novaVariavel.value.trim())
    console.log(variaveis.value)
    novaVariavel.value = '';
  }
};

const removerVariavel = (index) => {
  variaveis.value.splice(index, 1);
};



const exportarCSV = () => {
  const csvContent = "data:text/csv;charset=utf-8," +
    "phone," + variaveis.value.map((variavel, index) => `variable${index + 1}`).join(',') + "\n" +
    clientesSelecionados.value.map(cliente => {
      const clienteData = [cliente.phoneNumber];
      variaveis.value.forEach(variavel => {
        if (variavel.toLowerCase() === 'nome cliente') {
          clienteData.push(cliente.fullName.split(' ')[0]);
        } else if (variavel.toLowerCase() === 'empreendimento') {
          clienteData.push(cliente.empreendimento || '');
        } else if (variavel.toLowerCase() === 'menin engenharia') {
          clienteData.push('Menin Engenharia');
        } else if (variavel.toLowerCase() === 'construtora menin') {
          clienteData.push('Construtora Menin');
        } else if (variavel.toLowerCase()) {
          clienteData.push(variavel.toLowerCase() || '');
        } else {
          alert("Erro!")
        }
      });
      return clienteData.join(',');
    }).join("\n");
  const encodedUri = encodeURI(csvContent);
  const downloadName = prompt("Digite o nome do arquivo:")
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", downloadName + ".csv");
  document.body.appendChild(link);
  link.click();
};



</script>