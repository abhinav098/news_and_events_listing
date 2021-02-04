<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-lg sticky-top">
        <router-link class="navbar-brand nav-link" :to="{name: 'Home'}" exact>
          News & Events
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'News'}" exact>
                News
              </router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'Events'}" exact>
                Events
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <div class="container">
      <main>
        <router-view/>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fff;
}

main {
  padding: 30px;
  min-height: 300px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  width: 100%;
}

.navbar {
  background-color: #2c3e50;
}


.nav-item.router-link-exact-active {
  color: grey;
  text-transform: uppercase;
  text-decoration: none;
}

.nav-link, .navbar-brand {
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
}

.nav-link:hover, .navbar-brand:hover {
  color: grey;
  text-decoration: none;
}

</style>
