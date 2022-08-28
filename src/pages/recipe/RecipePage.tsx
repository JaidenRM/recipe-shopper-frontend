import { FC } from "react";
import { Outlet } from "react-router-dom";

export const RecipePage: FC = () => {
  return (
    <div className="w-full">
      <Outlet />
    </div>
  );
};
