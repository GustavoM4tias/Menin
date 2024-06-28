<script setup>

</script>

<template> 

<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <img src="../assets/img/menin.png" alt="" width="40">
    <a class="fw-bolder mx-3 navbar-brand">Menin</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <RouterLink class="nav-link active" aria-current="page" to="/tela1">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link active" aria-current="page" to="/tela2">Link</RouterLink>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Disparos
          </a>
          <ul class="dropdown-menu">
            <li><RouterLink class="dropdown-item" to="">Gerador Manual</RouterLink></li>
            <li><hr class="dropdown-divider"></li>
            <li><RouterLink class="dropdown-item" to="">Gerador com Pesquisa</RouterLink></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<style scoped>

.navbar {
  background-color: var(--color-blue-1);
}

.dropdown-menu {
  background-color: var(--color-blue-2);
}

.dropdown-item:hover {
  background-color: var(--color-blue-4);
}
</style>
