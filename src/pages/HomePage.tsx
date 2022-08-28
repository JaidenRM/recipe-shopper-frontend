import { FC } from "react";
import { UserRecipesWidget } from "../components/widgets/user-recipes/UserRecipesWidget";

export const HomePage: FC = () => {
  return (
    <>
      <UserRecipesWidget title="Your Recipes!" />
    </>
  );
};
