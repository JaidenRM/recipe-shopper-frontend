import { FC } from "react";
import { UserRecipesWidget } from "../../components/widgets/user-recipes/UserRecipesWidget";
import { AnimatedButton } from "../../components/buttons/AnimatedButton";
import { Link } from "react-router-dom";

export const ListRecipePage: FC = () => {
  return (
    <>
      <Link to={"./create"}>
        <AnimatedButton animationName="animate-wiggle-right-left">
          Create
        </AnimatedButton>
      </Link>
      <UserRecipesWidget />
    </>
  );
};
