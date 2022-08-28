import { FC } from "react";
import { useFetch } from "../../../@hooks/useFetch";
import { IRecipe } from "../../../@interfaces/recipe-shopper-api";
import { ErrorMessage } from "../../validation/ErrorMessage";
import { RecipeList } from "./RecipeList";

interface UserRecipesWidgetProps {
  title?: string;
}

export const UserRecipesWidget: FC<UserRecipesWidgetProps> = ({ title }) => {
  const { data, error } = useFetch<IRecipe[]>(
    `${process.env.REACT_APP_RECIPE_SHOPPER_API ?? ""}/recipe`,
  );

  if (error != null)
    return <ErrorMessage message="There was an issue fetching recipes" />;

  if (data == null || data.length === 0)
    return <h3 className="text-xl opacity-90">No recipes were found</h3>;

  return <RecipeList recipes={data} title={title} className="w-full" />;
};
