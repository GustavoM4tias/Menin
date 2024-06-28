<script setup>

</script>
<template>
<nav class="navbar navbar-expand bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand text-white mx-3" href="#">
      <h4 class="m-auto">
        <img src="@/assets/img/menin.png" height="28px" class="mx-2 mb-1">Menin
      </h4>
    </a>
    <div class="navbar-collapse" id="navbarText">
      <ul class="navbar-nav">
        <li class="nav-text">
          <a class="nav-link" href="#">
            <router-link class="links-menu px-1" to="/">Gerador I</router-link>
          </a>
        </li>
        <li class="nav-text">
          <a class="nav-link" href="#">
            <router-link class="links-menu px-1" to="/tela2">Gerador II</router-link>
          </a>
        </li>
        <li class="nav-text">
          <a class="nav-link" href="#">
            <router-link class="links-menu px-1" to="/tela3"><i class="bi bi-exclamation-triangle"></i></router-link>
          </a>
        </li>
      </ul>
      <span class="navbar-text text-white">
      </span>
    </div>
  </div>
</nav>



  <div class="main">
    <router-view>
    </router-view>
  </div>

  <footer class="d-flex py-lg-3 py-2 w-100 text-light bg-dark position-fixed bottom-0">
    <div class="col-12 d-flex align-items-center justify-content-center">
      <img class="mx-2" src="@/assets/img/menin.png" width="30" ></img>
      <span>© {{ new Date().getFullYear() }} Menin Engenharia | Gustavo Diniz,
        All Rights Reserved.</span>
    </div>
  </footer>

</template>

<style scoped>
a {
  text-decoration: none;
  color: white;
}

</style>
