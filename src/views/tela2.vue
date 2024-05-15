<template>
  <div class="container mt-5 d-flex flex-column justify-content-center align-items-center">
    <h2 class="mb-4 text-center text-light">Gerador Individual</h2>
    <div class="card p-4 d-block col-lg-8 col-sm-12 col-md-12 container-csv">

      <div class="row">
        <div class="col-3 form-group">
          <label for="countryCode"><strong>DDD:</strong></label>
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
        <div v-for="(variable, index) in variables" :key="index" class="input-group my-3">
          <div class="input-group-prepend">
            <label class="input-group-text" :for="`variable${index + 1}`"> Variável {{ index + 1 }}:</label>
          </div>
          <input type="text" class="form-control" :id="`variable${index + 1}`" :value="variable"
            @input="updateVariable($event.target.value, index)"
            :placeholder="`Digite o valor da Variável ${index + 1}`">
          <div class="input-group-append">
            <button class="btn btn-danger" type="button" @click="removeVariable(index)"><i
                class="bi bi-trash"></i></button>
          </div>
        </div>
      </div>

      <div class="mt-3 mx-1">
        <button class="btn btn-primary m-1" @click="addVariable"><i class="bi bi-plus-lg"></i> Variável</button>
        <button class="btn btn-success m-1" @click="addData">Salvar Cliente</button>
      </div>
    </div>

    <div class="col-lg-8 col-sm-12 col-md-12">
      <table class="table table-striped table-bordered mt-5 lista-contatos">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Número de Telefone</th>
            <th scope="col">Variáveis</th>
            <th scope="col" class="col-1">Excluir</th>
          </tr>
        </thead>
        <tbody id="dataRows" class="text-light">
          <tr v-for="(rowData, index) in tableData" :key="index">
            <td>{{ rowData.phoneNumber }}</td>
            <td>{{ rowData.variables.join(", ") }}</td>
            <td><button class="btn btn-danger btn-sm" @click="removeRow(index)"><i class="bi bi-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-success exporta-arquivo" @click="exportCSV">Exportar CSV</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const countryCode = ref('55');
const phoneNumber = ref('');
const variables = ref([]);
const tableData = ref([]);

let variablesCount = 0;

const addVariable = () => {
  variablesCount++;
  variables.value.push('');
};

const removeVariable = (index) => {
  variables.value.splice(index, 1);
  variablesCount--;
};

const updateVariable = (value, index) => {
  variables.value[index] = value;
};

const validatePhoneNumber = (phoneNumber) => {
  return /^\d{7,13}$/.test(phoneNumber.replace(/\s/g, ''));
};

const validateVariables = () => {
  return variables.value.every(variable => variable.trim() !== '');
};

const addData = () => {
  const variablesValid = validateVariables();
  const phoneNumberValid = validatePhoneNumber(phoneNumber.value);

  if (!phoneNumberValid) {
    alert("Número de telefone inválido!");
    return;
  }

  if (!variablesValid) {
    alert("Preencha todos os campos das variáveis!");
    return;
  }

  const formattedPhoneNumber = "+" + countryCode.value + phoneNumber.value;

  tableData.value.push({
    phoneNumber: formattedPhoneNumber,
    variables: [...variables.value]
  });

  phoneNumber.value = '';
  variables.value = [];
};

const removeRow = (index) => {
  tableData.value.splice(index, 1);
};

const exportCSV = () => {
  let csvContent = "data:text/csv;charset=utf-8,phone";
  for (let i = 1; i <= variablesCount; i++) {
    csvContent += `,variable${i}`;
  }
  csvContent += "\n";

  tableData.value.forEach(row => {
    csvContent += `${row.phoneNumber},${row.variables.join(",")}\n`;
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
};
</script>
