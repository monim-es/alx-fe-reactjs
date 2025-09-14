// recipeStore.js
import { create } from 'zustand';

export const useRecipeStore = create((set) => ({
  recipes: [],
  favorites: [],
  recommendations: [],

  // ✅ Add recipe
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  // ✅ Update recipe
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      ),
    })),

  // ✅ Delete recipe (also remove from favorites if needed)
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
      favorites: state.favorites.filter((favId) => favId !== id),
    })),

  // Favorites
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...new Set([...state.favorites, recipeId])], // avoid duplicates
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // Recommendations
  generateRecommendations: () =>
    set((state) => {
      const favoriteRecipes = state.recipes.filter((r) =>
        state.favorites.includes(r.id)
      );
      const keywords = favoriteRecipes.map((r) => r.title.split(' ')[0]);

      const recommended = state.recipes.filter(
        (r) =>
          !state.favorites.includes(r.id) &&
          keywords.some((kw) => r.title.startsWith(kw))
      );

      return { recommendations: recommended };
    }),
}));
