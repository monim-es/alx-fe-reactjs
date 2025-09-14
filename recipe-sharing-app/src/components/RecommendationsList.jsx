import { useRecipeStore } from './recipeStore';

const RecommendationsList = () => {
  // ✅ get data from store without recomputing loops
  const recipes = useRecipeStore(state => state.recipes);
  const favorites = useRecipeStore(state => state.favorites);

  // ✅ compute locally – simple mock recommendation: recipes not in favorites
  const recommendedRecipes = recipes.filter(
    recipe => !favorites.includes(recipe.id)
  );

  return (
    <div>
      <h2>Recommended for You</h2>
      {recommendedRecipes.length === 0 ? (
        <p>No recommendations available.</p>
      ) : (
        recommendedRecipes.map(recipe => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default RecommendationsList;
