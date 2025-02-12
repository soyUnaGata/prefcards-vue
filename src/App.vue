<template>
  <div id="container">
   <RouterView/>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
#container {
  margin: 0 auto;
  max-width: 1200px;
  width: 100%;
}
@media (max-width: 1200px) {
  #container {
    max-width: 1140px;
    padding: 0 10px 0 10px;
  }
}

@media (max-width: 1006px) {
  #container {
    max-width: 990px;
    padding: 0 10px 0 10px;
  }
}

@media (max-width: 992px) {
  #container {
    max-width: 960px;
    padding: 0 10px 0 10px;
  }
}

@media (max-width: 768px){
  #container {
    max-width: 750px;
    padding: 0 10px 0 10px;
  }
}

@media (max-width: 480px) {
  #container {
    max-width: 450px;
  }
}
</style>
