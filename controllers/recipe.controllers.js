const RecipeModel = require("../model/recipe.model");

async function getRecipes(req, res) {
  try {
    const recipes = await RecipeModel.find();
    res.status(200).json({ status: "Success", data: recipes });
  } catch (error) {
    res.status(500).json({ status: "Error", error: error.message });
  }
}




module.exports={getRecipes,}