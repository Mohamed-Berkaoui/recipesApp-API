const express = require("express");
const mongoose = require("mongoose");
const app = express();
const RecipeModel = require("./model/recipe.model");
const cors=require('cors')
app.use(express.json());

app.use(cors())

app.get("/api/v1/recipes", async function (req, res) {
  try {
    const recipes = await RecipeModel.find();
    res.status(200).json({ status: "Success", data: recipes });
  } catch (error) {
    res.status(500).json({ status: "Error", error: error.message });
  }
});

app.post("/api/v1/recipes", async function (req, res) {
  try {
    const {
      title,
      category,
      prepTimeMinutes,
      cookTimeMinutes,
      difficulty,
      ingredients,
      instructions,
    } = req.body;
    if (title.trim().length < 2) {
      res.status(400).json({ status: "Fail", message: "title is required" });
    }
    const newRecipe = await RecipeModel.insertOne({
      title,
      category,
      prepTimeMinutes,
      cookTimeMinutes,
      difficulty,
      ingredients,
      instructions,
    });
    res.status(201).json({ status: "Success", data: newRecipe });
  } catch (error) {
    res.status(500).json({ status: "Error", error: error.message });
  }
});

app.get("/api/v1/recipes/search", async function (req, res) {
  try {
    const ingredient = req.query.ingredient;
    const recipes = await RecipeModel.find({
      "ingredients.name": { $regex: ingredient, $options: "i" },
    });
    if (!recipes.length) {
      return res
        .status(400)
        .json({ status: "Fail", message: "no recipe found" });
    }
    res.status(200).json({ status: "Success", data: recipes });
  } catch (error) {
    res.status(500).json({ status: "Error", error: error.message });
  }
});

app.listen(3000, function () {
  mongoose
    .connect(
      "mongodb+srv://mohamed:ljJd92Dia8Si7RfL@cluster0.heetub1.mongodb.net/",
      { dbName: "recipeapp" },
    )
    .then(() => console.log("connected to db "))
    .catch((e) => {
      console.log(e.message);
      process.exit(12);
    });
  console.log("app running on http://localhost:3000");
});
