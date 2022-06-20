import { FC } from "react"
import { IRecipe } from "../../interfaces/recipe-shopper-api";
import { RecipeListItem } from "./RecipeListItem";

interface RecipeListProps {
    recipes: IRecipe[]
    title?: string
    className?: string
}

export const RecipeList: FC<RecipeListProps> = ({ recipes, className, title }) => {
    const mappedRecipes = recipes.map((recipe, index) => <RecipeListItem key={`home-recipe-${index}`} recipe={recipe} />);
    const noRecipesMessage = <p className="text-xl opacity-90">No recipes found</p>
    
    return (
        <div className={`RECIPE-LIST ${className}`}>
            { title && <h1 className="text-3xl mb-4 font-bold underline">{ title }</h1> }
            { mappedRecipes.length > 0 ? mappedRecipes : noRecipesMessage }
        </div>
    );
}