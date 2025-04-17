import { Routes, Route, Link } from "react-router-dom";
import { useAuth } from "./components/AuthContext";
import SignUp from "./components/SignUp";
import Login from "./components/LogIn";
import RecipeList from "./components/RecipeList";
import FavoriteRecipes from "./components/FavoriteRecipes";
import IndividualRecipe from "./components/IndividualRecipe";

function App() {
  const { token, logout } = useAuth();

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {token ? (
          <>
            <Link to="/favorites">Favorites</Link>
            <button className="nav-button" onClick={logout}>Log Out</button>
          </>
        ) : (
          <>
            <Link to="/sign-up">Sign Up</Link>
            <Link to="/log-in">Log In</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<IndividualRecipe />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/favorites" element={<FavoriteRecipes />} />
      </Routes>
    </div>
  );
}

export default App;
