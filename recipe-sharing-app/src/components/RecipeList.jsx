import { Link } from 'react-router-dom'
import { useRecipeStore } from '../store/recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes)
  const searchTerm = useRecipeStore((state) => state.searchTerm)

  const displayRecipes = searchTerm ? filteredRecipes : recipes

  return (
    <div>
      <h2>Recipe List</h2>
      {displayRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        displayRecipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <Link to={`/recipe/${recipe.id}`}>View Details</Link>
          </div>
        ))
      )}
    </div>
  )
}

export default RecipeList
