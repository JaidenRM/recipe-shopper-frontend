import { FC } from "react";
import { ErrorMessage } from "../../components/validation/ErrorMessage";
import { RecipeView } from "../../components/views/RecipeView";
import { useLocationGeneric } from "../../@hooks/useLocationGeneric";
import { RecipePageState } from "../../@interfaces/recipe-page-state";

export const ViewRecipePage: FC = () => {
  const { state } = useLocationGeneric<RecipePageState>();

  let recipeElement = <ErrorMessage />;
  if (state !== undefined) recipeElement = <RecipeView recipe={state.recipe} />;

  return <>{recipeElement}</>;
};
