import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";
import { NavMenu } from "../../components/menus/NavMenu";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <NavMenu
        menuItems={[
          { displayName: "Home", relativePath: "" },
          { displayName: "Recipes", relativePath: "recipe" },
          { displayName: "Supermarkets", relativePath: "supermarket" },
        ]}
      />
      <div className="p-4 lg:px-16 lg:py-4 md:max-w-2xl lg:max-w-4xl xl:max-w-7xl flex justify-center m-auto">
        <Outlet />
        {children}
      </div>
    </>
  );
};
