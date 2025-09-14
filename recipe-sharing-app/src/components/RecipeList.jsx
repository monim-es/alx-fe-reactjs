// RecipeList.jsx
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);

  return (
    <div>
      <h2>All Recipes</h2>
      {recipes.map((recipe) => {
        const isFav = favorites.includes(recipe.id);
        return (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            {isFav ? (
              <button onClick={() => removeFavorite(recipe.id)}>Unfavorite</button>
            ) : (
              <button onClick={() => addFavorite(recipe.id)}>Favorite</button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RecipeList;
