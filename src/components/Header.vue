<script setup>

</script>

<template> 

<nav class="navbar z-3 navbar-expand-lg">
  <div class="container-fluid">
    <img src="../assets/img/menin.png" alt="" width="40">
    <a class="fw-bolder mx-3 navbar-brand">Menin</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <!--
        <li class="nav-item">
          <RouterLink class="nav-link active" aria-current="page" to="/tela2">Link</RouterLink>
        </li>
        -->
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Disparos
          </a>
          <ul class="dropdown-menu">
            <li><RouterLink class="dropdown-item" to="/">Gerador com Pesquisa</RouterLink></li>
            <li><RouterLink class="dropdown-item" to="/tela2">Gerador Manual</RouterLink></li>
            <li><hr class="dropdown-divider"></li>
            <a class="dropdown-item" target="_blank" href="https://help.blip.ai/hc/pt-br/articles/4474433210775-Configura%C3%A7%C3%A3o-do-arquivo-de-audi%C3%AAncia-Envio-de-notifica%C3%A7%C3%B5es-em-massa">Sobre Disparos</a>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>

</template>

<style scoped>

* {
  color: white!important;
}

.navbar {
  background-color: var(--color-blue-1);
  width: 100%;
  position: fixed;
  top: 0;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .6);
}

.dropdown-menu {
  background-color: var(--color-blue-2);
}

.dropdown-item:hover {
  background-color: var(--color-blue-4);
}
</style>
