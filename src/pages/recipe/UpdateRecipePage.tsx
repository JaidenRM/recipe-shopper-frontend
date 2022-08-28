import { FC } from "react";
import { RecipeForm } from "../../components/forms/RecipeForm";
import { ErrorMessage } from "../../components/validation/ErrorMessage";
import { useLocationGeneric } from "../../@hooks/useLocationGeneric";
import { RecipePageState } from "../../@interfaces/recipe-page-state";

export const UpdateRecipePage: FC = () => {
  const { state } = useLocationGeneric<RecipePageState>();

  let recipeElement = <ErrorMessage />;
  if (state !== undefined) recipeElement = <RecipeForm recipe={state.recipe} />;

  return <>{recipeElement}</>;
};
