<script setup>

</script>
<template>
  <nav class="navbar navbar-expand-lg bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand text-white mx-3" href="#">  
      <h4 class="m-auto">
    <img src="@/assets/img/menin.png" height="20px" class="mx-2 mb-1">Menin
  </h4></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse" id="navbarText">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-text">
            <a class="nav-link" href="#"> 
              <router-link class="links-menu px-1" to="/" >Gerador I</router-link>
            </a>
          </li>
          <li class="nav-text">
            <a class="nav-link" href="#"> 
              <router-link class="links-menu px-1" to="/tela2" >Gerador II</router-link>
            </a>
          </li>
          <li class="nav-text">
            <a class="nav-link" href="#"> 
              <router-link class="links-menu px-1" to="/tela3" ><i class="bi bi-exclamation-triangle"></i></router-link>
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

  <footer class="d-flex py-3 w-100 text-light bg-dark position-fixed bottom-0">
    <div class="col-12 d-flex align-items-center justify-content-center">
      <img class="mx-3" src="@/assets/img/menin.png" width="30" height="24"></img>
      <span class="mb-3 mb-md-0">© {{ new Date().getFullYear() }} Menin Engenharia | Gustavo Diniz,
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
