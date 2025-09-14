import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  // ✅ separate selectors
  const recipes = useRecipeStore(state => state.recipes);
  const favorites = useRecipeStore(state => state.favorites);

  // ✅ compute derived state locally (not inside Zustand selector)
  const favoriteRecipes = favorites
    .map(id => recipes.find(r => r.id === id))
    .filter(Boolean); // remove undefined in case recipe was deleted

  return (
    <div>
      <h2>My Favorites</h2>
      {favoriteRecipes.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favoriteRecipes.map(recipe => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FavoritesList;
