<template>
    <div class="container-fluid d-flex vh-100">
      <div class="card-1 col-lg-8 col-12 p-5 m-auto d-flex flex-column justify-content-center rounded-4">
        <div class="inputs">
          <h1 class="text-center fs-2 fw-bold">Gerador de Disparo</h1>
          <div class="input-group">
            <input class="form-control py-3" type="text" v-model="search" @input="updateSearchResults"
              placeholder="Digite o nome do cliente">
            <div class="filtro">
              <select v-model="selectedEmpreendimento" @change="updateSearchResults"
                class="form-control rounded-start-0 select-scroll py-3">
                <option value="">Todos</option>
                <option v-for="empreendimento in empreendimentos" :key="empreendimento" :value="empreendimento">{{
                  empreendimento }}</option>
              </select>
            </div>
          </div>
          <div class="position-relative mt-0 bg-primary">
            <ul class="resultados list-group z-3 w-100 position-absolute"
              style="max-height: 30vh !important; color: white; overflow-y: auto;"
              v-show="showSearchResults && searchResults.length > 0">
              <li class="list-group-item z-3 w-100 d-flex justify-content-between"
                v-for="(cliente, index) in searchResults" :key="index" @click="adicionarCliente(cliente)">
                <strong>{{ cliente.fullName }}</strong> {{ cliente.empreendimento }}
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12 my-4">
          <h1 class="text-center fs-2 fw-bold">Variaveis</h1>
          <div class="input-group">
            <input type="text" class="form-control py-3" v-model="novaVariavel" placeholder="Nova Variável">
            <button class="btn btn-light border" @click="adicionarNovaVariavel">+ Variável</button>
          </div>
          <div class="col-12 d-flex justify-content-center mt-4">
            <button class="btn btn-outline-light fw-bold mx-lg-3 mx-1" @click="adicionarVariavel('Nome Cliente')">Nome
              Cliente</button>
            <button class="btn btn-outline-light fw-bold mx-lg-3 mx-1"
              @click="adicionarVariavel('Empreendimento')">Empreendimento</button>
            <button class="btn btn-outline-light fw-bold mx-lg-3 mx-1" @click="adicionarVariavel('Menin Engenharia')">Menin
              Engenharia</button>
            <button class="btn btn-outline-light fw-bold mx-lg-3 mx-1"
              @click="adicionarVariavel('Construtora Menin')">Construtora
              Menin</button>
          </div>
        </div>
        <div class="row mx-2 mb-3">
          <h5 class="mb-3">Variáveis Adicionadas:</h5>
          <div class="bg-secondary rounded-pill col-auto d-flex m-1" v-for="(variavel, index) in variaveis"
            :key="index">
            <p class="m-auto text-light px-1" style="font-size: 16px;">{{ variavel }}</p>
            <button class="btn btn-sm text-light" @click="removerVariavel(index)"><i class="bi bi-x"
                style="font-size: 20px;"></i></button>
          </div>
        </div>
        <h4 class="text-center fw-bold mb-2">Clientes Selecionados</h4>
        <div class="mb-3 clientes-container" style="max-height: 230px; overflow-y: auto; overflow-x: hidden;">
          <div class="row" v-for="(cliente, index) in clientesSelecionados" :key="index">
            <div class="col-12">
              <div class="card m-1">
                <div class="d-flex flex-row align-items-center justify-content-between p-2">
                  <p class="card-title my-auto mx-0">{{ cliente.fullName }}</p>
                  <p class="card-text my-auto"><i class="bi bi-whatsapp"></i> {{ cliente.phoneNumber }}</p>
                  <p class="card-text my-auto"><i class="bi bi-building"></i> {{ cliente.empreendimento }}</p>
                  <button class="btn btn-danger p-1" @click="removerCliente(index)">Remover</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button class="btn btn-success mt-2" @click="exportarCSV"
            :disabled="clientesSelecionados.length === 0">Exportar
            Arquivo</button>
        </div>
      </div>
    </div>


</template>

<style scoped>

option {
  text-align: center;
}

.filtro {
  width: 150px;
}

.card-1 {
  background-color: var(--color-lightblue-4);
}

.container-fluid {
  background-color: var(--color-blue-4);

}

/* Estilo do Scroll da lista de Clientes */
.resultados::-webkit-scrollbar,
.clientes-container::-webkit-scrollbar {
  width: 12px;
}

.resultados::-webkit-scrollbar-thumb,
.clientes-container::-webkit-scrollbar-thumb {
  background: #bdbdbd;
  border-radius: 8px;
}

.resultados::-webkit-scrollbar-thumb:hover,
.clientes-container::-webkit-scrollbar-thumb:hover {
  background: #afafaf;
}


@media screen and (width < 900px) {
}
</style>

<script setup>
import { ref } from 'vue';
import clientesAdhara from '@/assets/clientes/clientesAdhara.json';
import clientesAguaBranca from '@/assets/clientes/clientesAguaBranca.json';
import clientesBomRetiro from '@/assets/clientes/clientesBomRetiro.json';
import clientesBoulevard from '@/assets/clientes/clientesBoulevard.json';
import clientesBuritis from '@/assets/clientes/clientesBuritis.json';
import clientesConcept from '@/assets/clientes/clientesConcept.json';
import clientesFirenze from '@/assets/clientes/clientesFirenze.json';
import clientesItalia from '@/assets/clientes/clientesItalia.json';
import cliestesJardimDosLirios from '@/assets/clientes/cliestesJardimDosLirios.json';
import clientesJardimMarina from '@/assets/clientes/clientesJardimMarina.json';
import clientesMaia from '@/assets/clientes/clientesMaia.json';
import clientesMond from '@/assets/clientes/clientesMond.json';
import clientesMoov from '@/assets/clientes/clientesMoov.json';
import clientesMoradaDoSol from '@/assets/clientes/clientesMoradaDoSol.json';
import clientesMonaco from '@/assets/clientes/clientesMonaco.json';
import clientesMontana from '@/assets/clientes/clientesMontana.json';
import clientesMurano from '@/assets/clientes/clientesMurano.json';
import clientesNovaMarilia from '@/assets/clientes/clientesNovaMarilia.json';
import clientesResidencialDoBosque from '@/assets/clientes/clientesResidencialDoBosque.json';
import clientesResidencialDosIpes from '@/assets/clientes/clientesResidencialDosIpes.json';
import clientesSantaMadalena from '@/assets/clientes/clientesSantaMadalena.json';;
import clientesSoul from '@/assets/clientes/clientesSoul.json';
import clientesTresMarias from '@/assets/clientes/clientesTresMarias.json';
import clientesTerras from '@/assets/clientes/clientesTerras.json';
import clientesUrban from '@/assets/clientes/clientesUrban.json';
import clientesWish from '@/assets/clientes/clientesWish.json';

// Variáveis reativas
const search = ref('');
const searchResults = ref([]);
const showSearchResults = ref(false);
const clientesSelecionados = ref([]);
const novaVariavel = ref('');
const variaveis = ref([]);
const selectedEmpreendimento = ref('');
const empreendimentos = ref([
  'Adhara',
  'Água Branca',
  'Bom Retiro',
  'Boulevard',
  'Buritis',
  'Concept',
  'Firenze',
  'Itália',
  'Jardim dos Lírios',
  'Jardim Marina',
  'Maia',
  'Mond',
  'Moov',
  'Morada do Sol',
  'Monâco',
  'Montana',
  'Murano',
  'Nova Marília',
  'Residencial do Bosque',
  'Residencial dos Ipês',
  'Santa Madalena',
  'Soul',
  'Três Marias',
  'Terras de São Paulo I',
  'Urban',
  'Wish'
]);

// Array reativo para armazenar os clientes do JSON
const clientes = ref(clientesAdhara.concat(clientesAguaBranca, clientesBomRetiro, clientesBoulevard, clientesBuritis, clientesConcept, clientesFirenze, clientesItalia, cliestesJardimDosLirios, clientesJardimMarina, clientesMaia, clientesMond, clientesMoov, clientesMoradaDoSol, clientesMonaco, clientesMontana, clientesMurano, clientesNovaMarilia, clientesResidencialDoBosque, clientesResidencialDosIpes, clientesSoul, clientesSantaMadalena, clientesTresMarias, clientesTerras, clientesUrban, clientesWish));


// Calculando o total de clientes
const totalClientes = ref(0);
totalClientes.value = clientes.value.length
console.log(totalClientes.value)


// Métodos
const updateSearchResults = () => {

  if (search.value) {
    const termoPesquisa = search.value.toLowerCase();
    const filteredResults = clientes.value.filter(cliente =>
      cliente.fullName.toLowerCase().startsWith(termoPesquisa) &&
      (selectedEmpreendimento.value ? cliente.empreendimento === selectedEmpreendimento.value : true)
    );

    if (filteredResults.length > 0) {
      searchResults.value = filteredResults;
      showSearchResults.value = true;
    } else {
      searchResults.value = [];
      showSearchResults.value = false;
    }
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