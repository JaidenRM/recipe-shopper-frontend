import { IIngredient } from "../../@interfaces/recipe-shopper-api";

export const GetDisplayIngredient = (ingredient: IIngredient): string => {
  if (ingredient.measurementUnit.toLocaleLowerCase() === "each") {
    const parsedIng =
      ingredient.quantity > 1
        ? GetGenericPluralForm(ingredient.name)
        : ingredient.name;

    return `${ingredient.quantity} ${parsedIng}`;
  }

  const parsedUnit =
    ingredient.quantity > 1
      ? GetGenericPluralForm(ingredient.measurementUnit)
      : ingredient.measurementUnit;

  return `${ingredient.quantity} ${parsedUnit} of ${ingredient.name}`;
};

const GetGenericPluralForm = (singularWord: string): string => {
  if (!singularWord?.length) return "";

  const esForm = ["s", "ss", "sh", "ch", "x", "z"];
  const vowels = ["a", "e", "i", "o", "u"];

  let pluralForm = singularWord;

  if (esForm.some((suffix) => singularWord.endsWith(suffix)))
    pluralForm += "es";
  else if (
    singularWord.endsWith("y") &&
    !vowels.some((vowel) => singularWord.endsWith(vowel + "y"))
  )
    pluralForm = pluralForm.substring(0, pluralForm.length - 1) + "ies";
  else pluralForm += "s";

  return pluralForm;
};
