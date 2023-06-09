import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
export const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSavedRecipes();
  }, []);

  function upperCaseStart(str) {
    const newStr = str.charAt(0).toUpperCase() + str.slice(1);
    return newStr;
  }

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul className="saved-recipes-list">
        {savedRecipes.map((recipe) => (
          <li className="saved-list-item" key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <div className="ingredients">
              <br></br>
              <strong>Ingredients:</strong>
              {recipe.ingredients.map((item) => (
                <div className="ingredient-list-item">
                  {upperCaseStart(item)}
                </div>
              ))}
            </div>
            <div className="instructions">
              <h3 className="instructions-header">Instructions: </h3>
              <p className="instructions-item">{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cook Time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
