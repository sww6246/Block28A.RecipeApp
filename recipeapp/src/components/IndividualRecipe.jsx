import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function IndividualRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`https://fsa-recipe.up.railway.app/api/recipes/${id}`);
        const data = await res.json();
        setRecipe(data);
      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="individual-card">
      <img src={recipe.strMealThumb} className="ind-image"/>
      <h2>{recipe.strMeal}</h2>
      <p><strong>Category:</strong> {recipe.strCategory}</p>
      <p><strong>Region:</strong> {recipe.strArea}</p>
      <h3>Instructions</h3>
      <p>{recipe.strInstructions}</p>
      <h3>Ingredients</h3>
      <ul>
  {Array.isArray(recipe.ingredients) ? (
    recipe.ingredients.map((ingredient, index) => (
      <li key={index}>{ingredient}</li>
    ))
  ) : (
    <li>No ingredients listed</li>
  )}
</ul>
      <button onClick={() => navigate("/")}>Back to All Recipes</button>
    </div>
  );
}