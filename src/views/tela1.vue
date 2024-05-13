<script setup>
import { ref } from 'vue';

const countryCode = ref('55');
const phoneNumber = ref('');
const variables = ref([]);
const dataRows = ref([]);

function addVariable() {
  variables.value.push('');
}

function removeVariable(index) {
  variables.value.splice(index, 1);
}

function updateVariable(newValue, index) {
  variables.value[index] = newValue;
}

function validatePhoneNumber(phoneNumber) {
  return /^\d{7,13}$/.test(phoneNumber.replace(/\s/g, ''));
}

function validateVariables() {
  return variables.value.every(variable => variable.trim() !== '');
}

function addData() {
  const phoneNumberValid = validatePhoneNumber(phoneNumber.value);
  const variablesValid = validateVariables();

  if (!phoneNumberValid) {
    alert("Número de telefone inválido!");
    return;
  }

  if (!variablesValid) {
    alert("Preencha todos os campos das variáveis!");
    return;
  }

  const formattedPhoneNumber = `+${countryCode.value}${phoneNumber.value}`;
  const rowData = {
    phoneNumber: formattedPhoneNumber,
    variables: [...variables.value],
  };
  dataRows.value.push(rowData);

  // Limpa os inputs após adicionar dados
  phoneNumber.value = '';
  variables.value = [];
}

function removeRow(index) {
  dataRows.value.splice(index, 1);
}

function exportCSV() {
  let csvContent = "data:text/csv;charset=utf-8,phone";
  for (let i = 1; i <= variables.value.length; i++) {
    csvContent += `,variable${i}`;
  }
  csvContent += "\n";

  dataRows.value.forEach(row => {
    const variables = row.variables.join(", ");
    csvContent += `${row.phoneNumber},${variables}\n`;
  });

  const fileName = prompt("Insira o nome do arquivo:");
  if (fileName) {
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
  }
}
</script>

<template>
  <div class="container mt-5 d-flex flex-column justify-content-center align-items-center flex-column">
    <div class="card p-4 d-block col-12 container-csv">
      <h2 class="mb-4 text-center">Gerador de CSV</h2>

      <div class="row">
        <div class="col-3 form-group">
          <label for="countryCode"><strong>Código do País (DDD):</strong></label>
          <select class="form-control" v-model="countryCode">
            <option value="55">Brasil (+55)</option>
            <option value="351">Portugal (+351)</option>
            <option value="1">Estados Unidos (+1)</option>
            <option value="86">China (+86)</option>
            <option value="91">Índia (+91)</option>
            <option value="7">Rússia (+7)</option>
            <option value="81">Japão (+81)</option>
            <option value="44">Reino Unido (+44)</option>
            <option value="49">Alemanha (+49)</option>
            <option value="33">França (+33)</option>
          </select>
        </div>

        <div class="form-group col-9">
          <label for="phoneNumber"><strong>Número de Telefone:</strong></label>
          <input type="text" class="form-control" v-model="phoneNumber" placeholder="Exemplo: 14998765432">
        </div>
      </div>

      <div id="variables">
        <div class="input-group mb-3" v-for="(variable, index) in variables" :key="index">
          <div class="input-group-prepend">
            <label class="input-group-text" :for="'variable' + (index + 1)"> Variável {{ index + 1 }}:</label>
          </div>
          <input type="text" class="form-control" :id="'variable' + (index + 1)" :value="variable"
            @input="updateVariable($event.target.value, index)"
            :placeholder="'Digite o valor da Variável ' + (index + 1)">

          <div class="input-group-append">
            <button class="btn btn-danger" type="button" @click="removeVariable(index)"><i
                class="bi bi-trash"></i></button>
          </div>
        </div>
      </div>

      <div class="mt-3 mx-1">
        <button class="btn btn-primary" @click="addVariable"><i class="bi bi-plus-lg"></i> Variável</button>
        <button class="btn btn-success ml-1" @click="addData">Salvar Cliente</button>
      </div>
    </div>
    <table class="table table-striped table-bordered mt-5 lista-contatos">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Número de Telefone</th>
          <th scope="col">Variáveis</th>
          <th scope="col" class="col-1">Excluir</th>
        </tr>
      </thead>
      <tbody id="dataRows" class="text-light">
        <tr v-for="(row, index) in dataRows" :key="index">
          <td>{{ row.phoneNumber }}</td>
          <td>{{ row.variables.join(", ") }}</td>
          <td><button class="btn btn-danger btn-sm" @click="removeRow(index)"><i class="bi bi-trash"></i></button></td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-success exporta-arquivo" @click="exportCSV">Exportar CSV</button>

  </div>
</template>

<style>
:root {
  --opacity-dark: rgba(60, 60, 60, .5);
}

footer {
  bottom: 0;
}

.container-csv {
  border-radius: 15px;
  background-color: var(--opacity-dark);
}

.lista-contatos {
  background-color: var(--opacity-dark);
}

.exporta-arquivo {
  margin-bottom: 90px;
}

select,
input,
input::placeholder {
  background-color: var(--opacity-dark) !important;
  color: rgb(240, 240, 240) !important;
}
</style>