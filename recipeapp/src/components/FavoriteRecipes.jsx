import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const { token, setError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!token) {
        setError("You must be logged in to access Favorites.");
        return;
      }

      try {
        const res = await fetch("https://fsa-recipe.up.railway.app/api/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { data } = await res.json();
        console.log("Fetched favorites:", data); 
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [token]);

  const handleRemove = async (id) => {
    try {
      await fetch(`https://fsa-recipe.up.railway.app/api/favorites/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(favorites.filter((fav) => fav.id !== id));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <div>
      <h2 className="header">Your Favorites</h2>

      <div className="container">
        {favorites.map((fav) => (
          <div key={fav.id} className="card">
            <img src={fav.strMealThumb} alt={fav.name} />
            <h3>{fav.strMeal}</h3>
            <p>Region: {fav.strArea}</p>

            <button onClick={() => handleRemove(fav.id)}>Remove</button>
            <br/>
            <button
              onClick={() => {
                console.log("Navigating to recipe ID:", fav.idMeal);
                navigate(`/recipe/${fav.idMeal}`);
              }}
            >
              Learn more
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}