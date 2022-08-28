import { FieldError, LiteralUnion, RegisterOptions } from "react-hook-form";
import { IRecipe } from "../../@interfaces/recipe-shopper-api";
import { CapitaliseFirst } from "./string-helper";

type FieldErrorDict = Partial<{
  [key in LiteralUnion<keyof RegisterOptions, string>]: string;
}>;

export const GetErrorMessage = (
  fieldName: string,
  error?: FieldError,
  customMessages?: FieldErrorDict,
): string => {
  if (error == null) return "";

  if (customMessages?.[error.type]) return customMessages[error.type] as string;

  switch (error.type) {
    case "max":
      return `${CapitaliseFirst(
        fieldName,
      )} is too high. Please choose a lower value.`;
    case "min":
      return `${CapitaliseFirst(
        fieldName,
      )} is too low. Please choose a higher value`;
    case "maxLength":
      return `${CapitaliseFirst(
        fieldName,
      )} exceeds the maximum length requirement.`;
    case "minLength":
      return `${CapitaliseFirst(
        fieldName,
      )} does not meet the minimum length requirement.`;
    case "required":
      return `${CapitaliseFirst(
        fieldName,
      )} is required. Please provide a value.`;
    case "valueAsDate":
      return `Please ensure ${fieldName.toLocaleLowerCase()} is a valid date.`;
    case "valueAsNumber":
      return `Please ensure ${fieldName.toLocaleLowerCase()} is a valid number.`;
    default:
      return `${CapitaliseFirst(fieldName)} isn't valid. Unexpected error.`;
  }
};

export const ParseRecipeForForm = (recipe?: IRecipe): IRecipe | undefined => {
  if (recipe == null) return recipe;

  const clonedRecipe: IRecipe = { ...recipe };

  clonedRecipe.ingredients = recipe.ingredients.map((ing) => ({
    ...ing,
    ...{ unit: ing.measurementUnit.toLocaleLowerCase() },
  }));

  return clonedRecipe;
};
