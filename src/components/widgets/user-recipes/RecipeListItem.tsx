import { FC, useState } from "react";
import { useMediaQuery } from "../../../@hooks/useMediaQuery";
import { IRecipe } from "../../../@interfaces/recipe-shopper-api";
import { BsClockFill } from "react-icons/bs";
import { BiRestaurant } from "react-icons/bi";
import { ImPriceTag } from "react-icons/im";
import { AiFillDownCircle, AiFillEdit } from "react-icons/ai";
import { AnimatedButton } from "../../buttons/AnimatedButton";
import { Link } from "react-router-dom";

interface RecipeListItemProps {
  recipe: IRecipe;
}

export const RecipeListItem: FC<RecipeListItemProps> = ({ recipe }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <Link to={"/recipe/view"} state={{ recipe }}>
      {isDesktop ? (
        <DesktopRecipeListItem recipe={recipe} />
      ) : (
        <MobileRecipeListItem recipe={recipe} />
      )}
    </Link>
  );
};

const MobileRecipeListItem: FC<RecipeListItemProps> = ({ recipe }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border-2 rounded px-4 py-2 my-2 dark:border-light bg-slide-right-hover delay-1000">
      <div className="flex flex-col">
        <h2 className="font-bold text-3xl mb-2 p-0.5 whitespace-nowrap overflow-hidden overflow-ellipsis">
          {recipe.name}
        </h2>
        <div className="flex flex-row text-3xl items-center p-0.5">
          <BiRestaurant />
          <h2 className="ml-2">{recipe.servings}</h2>
        </div>
        <div className="flex flex-row text-3xl items-center p-0.5">
          <BsClockFill />
          <h2 className="ml-2">{recipe.durationMinutes}</h2>
        </div>
        {recipe.totalPrice && (
          <div className="flex flex-row text-3xl items-center p-0.5">
            <ImPriceTag />
            <h1 className="ml-2">${recipe.totalPrice}</h1>
          </div>
        )}
        <div
          className={`flex flex-col mt-4 transform-all ease-in duration-1000  ${
            isExpanded
              ? "max-h-[200px] overflow-auto"
              : "max-h-0 overflow-hidden"
          }`}
        >
          <p>
            <b className="text-2xl">Ingredients: </b>
            <span className="text-xl italic">
              {recipe.ingredients.map((i) => i.name).join(", ")}
            </span>
          </p>
        </div>
      </div>
      <div className="text-4xl justify-between flex mt-2">
        <Link to={"/recipe/edit"} state={{ recipe }}>
          <AnimatedButton animationName="animate-wiggle-right-left">
            <AiFillEdit />
          </AnimatedButton>
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsExpanded((prev) => !prev);
          }}
        >
          <AiFillDownCircle
            className={`transform-all ease-in duration-500 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
};

const DesktopRecipeListItem: FC<RecipeListItemProps> = ({ recipe }) => {
  return (
    <div className="border-2 rounded p-4 my-2 dark:border-light bg-slide-right-hover flex">
      <div className="flex-1">
        <div className="flex flex-row">
          <div className="flex flex-col flex-1">
            <h2 className="font-bold text-xl">{recipe.name}</h2>
            <span className="text-ellipsis italic">
              Ingredients: {recipe.ingredients.map((i) => i.name).join(", ")}
            </span>
          </div>
          {recipe.totalPrice > 0 && (
            <div>
              <h1 className="font-bold text-3xl">${recipe.totalPrice}</h1>
            </div>
          )}
        </div>
        <div className="flex flex-row">
          <p className="flex-1">Duration: {recipe.durationMinutes} mins</p>
          <p className="flex-1">Servings: {recipe.servings}</p>
        </div>
      </div>
      <div className="text-3xl p-0.5">
        <Link to={"/recipe/edit"} state={{ recipe }}>
          <AiFillEdit />
        </Link>
      </div>
    </div>
  );
};
