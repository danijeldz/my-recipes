<template>
  <div class="container index">
    <div class="card" v-for="recipe in recipes" :key="recipe.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteRecipe(recipe.id)"
          >delete</i
        >
        <h2 class="indigo-text">{{ recipe.title }}</h2>
        <ul class="ingredients">
          <li v-for="(ingredient, index) in recipe.ingredients" :key="index">
            <span class>{{ ingredient }}</span>
          </li>
        </ul>
        <hr />
        <p class="description">{{ recipe.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Index",
  data() {
    return {
      recipes: []
    };
  },
  methods: {
    deleteRecipe(id) {
      //delete doc from firestore
      db.collection("recepies")
        .doc(id)
        .delete()
        .then(() => {
          this.recipes = this.recipes.filter(recipe => {
            return recipe.id != id;
          });
        });
    }
  },
  created() {
    // fetch data from firestore
    db.collection("recepies")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let recipe = doc.data();
          recipe.id = doc.id;
          this.recipes.push(recipe);
        });
      });
  }
};
</script>

<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  margin-top: 60px;
}
.ingredients {
  list-style-type: disc !important;
}

.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}

.index .ingredients {
  margin: 30px auto;
}

.index .delete {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
