const mongoose=require('mongoose') 
const ingredientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    unite: { type: String, default: "grams" },
  },
  { _id: false },
);

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ["Dinner", "Breakfast", "Dessert"],
    required: true,
  },
  prepTimeMinutes: { type: Number, min: 0, max: 10000 },
  cookTimeMinutes: { type: Number, required: true, min: 0, max: 10000 },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"] },
  ingredients: [ingredientSchema],
  instructions: [String],
});

const RecipeModel = mongoose.model("Recipe", recipeSchema);

module.exports=RecipeModel
