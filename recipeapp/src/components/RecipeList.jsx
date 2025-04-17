import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [validRecipes, setValidRecipes] = useState([]); 
  const [favoritedRecipes, setFavoritedRecipes] = useState([]); 
  const { token, setError } = useAuth();

  useEffect(() => {
    const getRecipes = async () => {
      const res = await fetch("https://fsa-recipe.up.railway.app/api/recipes");
      const data = await res.json();
      setRecipes(data);
      filterValidRecipes(data);
    };
    getRecipes();
  }, []);

  const filterValidRecipes = (data) => {
    const validRecipes = data.filter((recipe) => {
      if (recipe.strMealThumb && recipe.strMealThumb.trim() !== "") {
        const image = new Image();
        image.src = recipe.strMealThumb;
        // Try to load the image and check if it's broken
        image.onerror = () => false; // Image is broken
        image.onload = () => true; // Image loaded successfully
        return image.complete && image.naturalHeight > 0; // Ensure the image has loaded successfully
      }
      return false;
    });
    setValidRecipes(validRecipes); 
  };

  const handleFavorite = async (recipe) => {
    if (!token) return setError("You must be logged in to favorite a recipe.");

    
    await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        mealId: recipe.idMeal,
        name: recipe.strMeal,
        imageUrl: recipe.strMealThumb,
        strArea: recipe.strArea,
      }),
    });

    setFavoritedRecipes((prevFavorited) => [...prevFavorited, recipe.idMeal]);
  };

  const getFavoriteButtonText = (recipeId) => {
    return favoritedRecipes.includes(recipeId) ? "Favorited!" : "Favorite";
  };

  return (
    <div>
    
    <h1 className="header">Recipes!</h1>
    <h3 className="header">View and save your favorite recipes for later.</h3>
    <div className="container">
      {validRecipes.map((recipe) => (
        <div key={recipe.idMeal} className="card">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h3>{recipe.strMeal}</h3>
          <button onClick={() => handleFavorite(recipe)}>
            {token ? getFavoriteButtonText(recipe.idMeal) : "Login to Favorite"}
          </button>
          <Link to={`/recipe/${recipe.idMeal}`} className="card-link">Learn more</Link>
        </div>
      ))}
    </div>
    </div>
  );
}