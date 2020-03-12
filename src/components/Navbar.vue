<template>
  <div class="navbar">
    <nav class="nav-extended red accent-2">
      <div class="nav-content">
        <router-link :to="{ name: 'Index' }">
          <span class="nav-title black-text">My Recipes</span>
        </router-link>
        <a href class="btn-floating btn-large halfway-fab red darken-2">
          <router-link :to="{ name: 'AddRecipe' }">
            <i class="material-icons black-text">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>

<style>
.navbar nav {
  padding: 0 20px;
}
</style>
