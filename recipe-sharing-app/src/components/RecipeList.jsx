import { Link } from 'react-router-dom'
import { useRecipeStore } from '../store/recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes)

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add one!</p>
      ) : (
        recipes.map((recipe) => (
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
