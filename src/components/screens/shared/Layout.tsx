import { FC, ReactNode } from "react";
import { NavMenu } from "../../menus/NavMenu";

interface LayoutProps {
    children?: ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <NavMenu menuItems={[
                { displayName: "Home", relativePath: "" },
                { displayName: "Recipes", relativePath: "recipe" },
                { displayName: "Supermarkets", relativePath: "supermarket" }
            ]} />
            { children }
        </>
    );
}