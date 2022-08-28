import { FC } from "react";
import { IRecipe } from "../../@interfaces/recipe-shopper-api";
import { GetDisplayIngredient } from "../../utils/helpers/recipe-helper";
import { ErrorMessage } from "../validation/ErrorMessage";

interface RecipeViewProps {
  recipe?: IRecipe;
}

export const RecipeView: FC<RecipeViewProps> = ({ recipe }) => {
  if (recipe == null) return <h2>No recipe found</h2>;

  const hasIngredients =
    Boolean(recipe.ingredients) && !!recipe.ingredients.length;
  const hasInstructions =
    Boolean(recipe.instructions) && !!recipe.instructions.length;

  return (
    <div className="p-4 rounded-lg flex flex-col gap-4 md:gap-8">
      <div className="flex gap-4 flex-col border-b-2 p-2">
        <h1 className="text-4xl font-bold text-center">{recipe.name}</h1>
        <div className="flex flex-wrap justify-between">
          <ReadonlyTextField
            label="Duration"
            text={`${recipe.durationMinutes}mins`}
          />
          <ReadonlyTextField
            label="Servings"
            text={recipe.servings.toString()}
          />
          {recipe.totalPrice && (
            <ReadonlyTextField
              label="Total Price"
              text={`$${recipe.totalPrice}`}
            />
          )}
          <ReadonlyTextField label="Tags" text={recipe.tags} />
        </div>
      </div>
      <p>{recipe.description}</p>
      <div>
        <h2 className="font-bold text-xl md:text-2xl underline underline-offset-2 my-1">
          Ingredients
        </h2>
        {hasIngredients ? (
          <ul className=" list-disc list-inside">
            {recipe.ingredients.map((ing) => (
              <li key={ing.id}>{GetDisplayIngredient(ing)}</li>
            ))}
          </ul>
        ) : (
          <ErrorMessage message="Oops, no ingredients to see here" />
        )}
      </div>
      <div>
        <h2 className="font-bold text-xl md:text-2xl underline underline-offset-2 my-1">
          Instructions
        </h2>
        {hasInstructions ? (
          <ol className="list-decimal list-inside marker:font-bold">
            {recipe.instructions
              .sort((a, b) => a.order - b.order)
              .map((ins) => (
                <li key={ins.id}>{ins.description}</li>
              ))}
          </ol>
        ) : (
          <ErrorMessage message="Oops, no instructions to see here" />
        )}
      </div>
    </div>
  );
};

interface ReadonlyTextFieldProps {
  label: string;
  text: string;
}

const ReadonlyTextField: FC<ReadonlyTextFieldProps> = ({ label, text }) => {
  return (
    <div>
      <span className="font-bold">{label}:&nbsp;</span>
      <span>{text}</span>
    </div>
  );
};
