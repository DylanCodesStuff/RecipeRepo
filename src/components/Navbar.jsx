import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };
  return (
    <div className="navbar">
      <div className="left-side-nav">
        <img src="../src/images/logo-nav-img.png" className="nav-logo" />
        <h2 className="logo-text">Recipe Repo</h2>
      </div>
      <div className="right-side-nav">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/create-recipe" className="nav-link">
          Create Recipe
        </Link>

        {!cookies.access_token ? (
          <Link to="/auth" className="nav-link">
            Login/Register
          </Link>
        ) : (
          <>
            <Link to="/saved-recipes" className="nav-link">
              Saved Recipes
            </Link>
            <button className="logout-btn" onClick={logout}>
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};
