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
        <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>
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
      <div class="field add-description">
        <label for="description">Description:</label>
        <textarea name="description" id cols="30" rows="10" v-model="description"></textarea>
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddRecipe",
  data() {
    return {
      title: null,
      feedback: null,
      another: null,
      ingredients: [],
      slug: null,
      description: null
    };
  },
  methods: {
    AddRecipe() {
      if (this.title) {
        this.feedback = null;
        // create a slug
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[$*_+~.()'"\-:@]/g,
          lower: true
        });
        db.collection("recepies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug,
            description: this.description
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "YOu must enter a recipe title";
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
    },
    deleteIngredient(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
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
  position: relative;
}
.add-recipe .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
