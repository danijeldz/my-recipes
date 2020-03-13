<template>
  <div class="add-recipe container white">
    <h2 class="center-align black-text">Add new Recipe</h2>
    <form action @submit.prevent="AddRecipe">
      <div class="field title">
        <label for="title">Name of the recipe</label>
        <input type="text" name="title" v-model="title" />
      </div>
      <div class="field" v-for="(ingredient, index) in ingredients" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]" />
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add an ingredient</label>
        <input
          type="text"
          name="add-ingredient"
          @keydown.tab.prevent="AddIngredient"
          v-model="another"
        />
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddRecipe",
  data() {
    return {
      title: null,
      feedback: null,
      another: null,
      ingredients: []
    };
  },
  methods: {
    AddRecipe() {
      if (this.title) {
        console.log(this.title);
        this.feedback = null;
      }
    },
    AddIngredient() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must add a ingredient to add a recipe.";
      }
    }
  }
};
</script>

<style>
.add-recipe {
  padding: 20px;
  margin: 60px auto;
  max-width: 500px;
}
.add-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}
.add-recipe .field {
  margin: 20px auto;
}
</style>
