<template>
  <div v-if="recipe" class="edit-recipe container">
    <h2>Edit {{ recipe.title }}</h2>
    <form action @submit.prevent="EditRecipe">
      <div class="field title">
        <label for="title">Name of the recipe</label>
        <input type="text" name="title" v-model="recipe.title" />
      </div>
      <div class="field" v-for="(ingredient, index) in recipe.ingredients" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="recipe.ingredients[index]" />
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
        <textarea name="description" id cols="30" rows="10" v-model="recipe.description"></textarea>
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update recipe</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "EditRecipe",
  data() {
    return {
      recipe: null,
      feedback: null,
      another: null
    };
  },
  methods: {
    EditRecipe(id) {
      if (this.recipe.title) {
        this.feedback = null;
        // create a slug
        this.recipe.slug = slugify(this.recipe.title, {
          replacement: "-",
          remove: /[$*_+~.()'"\-:@]/g,
          lower: true
        });
        db.collection("recepies")
          .doc(this.recipe.id)
          .update({
            title: this.recipe.title,
            description: this.recipe.description,
            ingredients: this.recipe.ingredients,
            slug: this.recipe.slug
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
      // db.collection("recepies")
      //   .get()
      //   .doc(id)
      //   .update()
      //   .then(() => {
      //     this.$router.push({ name: "Index" });
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    AddIngredient() {
      if (this.another) {
        this.recipe.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You must add a ingredient to add a recipe.";
      }
    },
    deleteIngredient(ing) {
      this.recipe.ingredients = this.recipe.ingredients.filter(ingredient => {
        return ingredient != ing;
      });
    }
  },
  created() {
    let ref = db
      .collection("recepies")
      .where("slug", "==", this.$route.params.recipe_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.recipe = doc.data();
        this.recipe.id = doc.id;
      });
    });
  }
};
</script>

<style>
.edit-recipe {
  padding: 20px;
  margin: 60px auto;
  max-width: 500px;
}
.edit-recipe h2 {
  font-size: 2em;
  margin: 20px auto;
}
.edit-recipe .field {
  margin: 20px auto;
  position: relative;
}
.edit-recipe .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4em;
  cursor: pointer;
}
</style>
