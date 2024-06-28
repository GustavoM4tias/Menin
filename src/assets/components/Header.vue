<script setup>

</script>

<template> 

<nav class="navbar navbar-expand-lg bg-secondary">
  <div class="container-fluid">
    <img src="../assets/img/menin.png" alt="" width="40">
    <a class="fw-bolder mx-2 navbar-brand" href="#">Menin</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Disparos
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Gerador Manual</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Gerador com Pesquisa</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<style scoped>

</style>
