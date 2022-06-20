import { useFetch } from "../../hooks/useFetch"
import { IRecipe } from "../../interfaces/recipe-shopper-api";
import { RecipeList } from "./RecipeList";

export const UserRecipesWidget = () => {
    const { data, error } = useFetch<IRecipe[]>(process.env.REACT_APP_RECIPE_SHOPPER_API + "/recipe");

    if (error) {
        return <h1 className="error-msg">There was an issue fetching recipes</h1>;
    } else if (!data) {
        return <h3 className="text-xl opacity-90">No recipes were found</h3>;
    } else if (data.length === 0) {
        return <h3 className="text-xl opacity-90">No recipes were found</h3>;
    } else {
        return (
            <RecipeList recipes={data} title="Your Recipes!" className="md:max-w-2xl lg:max-w-4xl xl:max-w-7xl w-full" />
        );
    }
}