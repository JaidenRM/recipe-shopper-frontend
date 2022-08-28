import { FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { MeasurementUnit } from "../../@enums/measurement-unit";
import { IProduct, IRecipe } from "../../@interfaces/recipe-shopper-api";
import { Input } from "../input-fields/Input";
import { TextArea } from "../input-fields/TextArea";
import { Select } from "../input-fields/Select";
import { CapitaliseFirst } from "../../utils/helpers/string-helper";
import { Button } from "../buttons/Button";
import {
  GetErrorMessage,
  ParseRecipeForForm,
} from "../../utils/helpers/form-helper";
import { ContainsIgnoringAt } from "../../utils/helpers/array-helper";
import { useModalContext } from "../../providers/modal";
import { ProductSearchWidget } from "../widgets/product-search/ProductSearchWidget";
import { fetchRequest } from "../../utils/fetch";
import { EmptyFn } from "../../@types/empty-fn";

interface RecipeFormProps {
  recipe?: IRecipe;
}

export const RecipeForm: FC<RecipeFormProps> = ({ recipe }) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IRecipe>({ defaultValues: ParseRecipeForForm(recipe) });
  const ingredientInputs = useFieldArray({
    control,
    name: "ingredients",
  });
  const instructionInputs = useFieldArray({
    control,
    name: "instructions",
  });

  const [isModalShow, modalHandlers] = useModalContext();
  const onSubmit = (recipe: IRecipe): void => {
    const url =
      process.env.REACT_APP_RECIPE_SHOPPER_API ??
      "" + "/recipe" + (recipe.id ? `/${recipe.id}` : "");
    const options: RequestInit = {
      method: recipe.id ? "PUT" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...recipe }),
    };

    fetchRequest(url, options)
      .then(async (r) => await r.json())
      .catch(() => alert("Something went wrong with submitting this recipe."));
  };

  const addIngredient: EmptyFn = () => {
    ingredientInputs.append({});
  };
  const addInstruction: EmptyFn = () => {
    instructionInputs.append({});
  };

  return (
    <form
      onSubmit={() => handleSubmit(onSubmit)}
      className="grid grid-cols-4 gap-x-4 gap-y-2"
    >
      <h1 className="font-bold text-3xl col-span-4 mb-4">
        {recipe != null ? "Update Recipe" : "Create Recipe"}
      </h1>
      <h2 className="font-semibold text-xl col-span-4 italic">
        Recipe Details
      </h2>
      <Input
        label="Name*"
        htmlProps={register("name", { required: true })}
        className="col-span-4"
        errorMsg={GetErrorMessage("name", errors.name)}
      />

      <TextArea
        label="Description"
        htmlProps={{ ...register("description"), ...{ rows: 4 } }}
        className="col-span-4"
        errorMsg={GetErrorMessage("description", errors.description)}
      />

      <Input
        label="Duration (mins)*"
        htmlProps={{
          ...register("durationMinutes", {
            valueAsNumber: true,
            min: 1,
            required: true,
          }),
          ...{ type: "number" },
        }}
        className="col-span-2"
        errorMsg={GetErrorMessage("duration (mins)", errors.durationMinutes)}
      />

      <Input
        label="Servings*"
        htmlProps={{
          ...register("servings", {
            valueAsNumber: true,
            min: 1,
            required: true,
          }),
          ...{ type: "number" },
        }}
        className="col-span-2"
        errorMsg={GetErrorMessage("servings", errors.servings)}
      />

      <h2 className="font-semibold text-xl col-span-4 italic">Ingredients</h2>
      {ingredientInputs.fields.map((_, i) => {
        const productFieldValue = getValues(`ingredients.${i}.linkingProduct`);

        return (
          <div className="col-span-4 grid gap-y-2 border-b-4" key={i}>
            <Input
              label="Name*"
              htmlProps={register(`ingredients.${i}.name`, { required: true })}
              errorMsg={GetErrorMessage("name", errors.ingredients?.[i]?.name)}
            />
            <Select
              label="Unit Type*"
              htmlProps={register(`ingredients.${i}.measurementUnit`, {
                required: true,
              })}
              errorMsg={GetErrorMessage(
                "unit type",
                errors.ingredients?.[i]?.measurementUnit,
              )}
              options={(
                Object.keys(MeasurementUnit) as Array<
                  keyof typeof MeasurementUnit
                >
              ).map((unitKey) => ({
                value: MeasurementUnit[unitKey],
                displayValue: CapitaliseFirst(MeasurementUnit[unitKey]),
              }))}
            />
            <Input
              label="Quantity*"
              htmlProps={register(`ingredients.${i}.quantity`, {
                valueAsNumber: true,
                min: 1,
                required: true,
              })}
              errorMsg={GetErrorMessage(
                "quantity",
                errors.ingredients?.[i]?.quantity,
              )}
            />
            {productFieldValue != null && (
              <div
                className="text-md overflow-hidden flex flex-row"
                title={productFieldValue.name}
              >
                <h4 className="font-semibold">Product:&nbsp;</h4>
                <span className="whitespace-nowrap text-ellipsis overflow-hidden">
                  {productFieldValue.name}
                </span>
              </div>
            )}
            <Button
              text="Product Lookup"
              className="styled-input mb-4 max-w-[240px]"
              onClick={() => {
                if (!isModalShow) {
                  const onSelected = (product: IProduct): void => {
                    setValue(`ingredients.${i}.linkingProduct`, product);
                    modalHandlers.setDisplay(false);
                  };

                  modalHandlers.setChild(
                    <div className="flex justify-center">
                      <ProductSearchWidget
                        onSelected={onSelected}
                        product={productFieldValue}
                        className="xl:max-w-7xl md:max-w-3xl lg:max-w-5xl md:border-4 md:max-h-[90%] overflow-auto w-full h-full p-4 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      />
                    </div>,
                  );
                  modalHandlers.setDisplay(true);
                }
              }}
            />
          </div>
        );
      })}
      <Button
        className="col-span-1 w-10 rounded-3xl"
        onClick={addIngredient}
        text="+"
      ></Button>
      <div className="col-span-3" />

      <h2 className="font-semibold text-xl col-span-4 italic">Instructions</h2>
      {instructionInputs.fields.map((_, i) => {
        const validateOrder = (num: number): boolean => {
          if (isNaN(num)) return true;

          const existingOrderNumbers = instructionInputs.fields.map(
            (f) => f.order,
          );
          const indexesToIgnore = existingOrderNumbers.reduce<number[]>(
            (prev, curr, i) => {
              if (isNaN(curr)) return [...prev, i];
              return prev;
            },
            [],
          );

          return !ContainsIgnoringAt(existingOrderNumbers, num, [
            i,
            ...indexesToIgnore,
          ]);
        };

        return (
          <div className="col-span-4 grid gap-y-2 border-b-4" key={i}>
            <TextArea
              label="Description*"
              htmlProps={register(`instructions.${i}.description`)}
              errorMsg={GetErrorMessage(
                "description",
                errors.instructions?.[i]?.description,
              )}
            />
            <Input
              label="Order*"
              htmlProps={{
                ...register(`instructions.${i}.order`, {
                  valueAsNumber: true,
                  validate: validateOrder,
                  min: 0,
                  required: true,
                }),
                ...{ type: "number" },
              }}
              className="mb-4"
              errorMsg={GetErrorMessage(
                "order",
                errors.instructions?.[i]?.order,
                {
                  validate:
                    "This order is already taken by another instruction. Please choose a different value.",
                },
              )}
            />
          </div>
        );
      })}
      <Button
        className="col-span-1 w-10 rounded-3xl"
        onClick={addInstruction}
        text="+"
      ></Button>
      <div className="col-span-3" />

      <Button
        buttonType="submit"
        className="col-span-2 col-start-2 mt-2"
        text="Submit"
      />
    </form>
  );
};
