import { FC } from "react"

export interface NavMenuItemProps {
    displayName: string
    relativePath: string
}

export const NavMenuItem: FC<NavMenuItemProps> = ({ displayName, relativePath }) => {
    const defaultCss = "font-semibold border-b border-black uppercase my-8 text-xl py-2 px-8";
    const desktopCss = "lg:border-b-0 lg:normal-case lg:my-0";
    const hoverCss = "hover:text-white hover:shadow-slide hover:shadow-black" + 
        " dark:hover:text-black dark:hover:shadow-slide dark:hover:shadow-white" + 
        " transition ease duration-1000";

    return (
        <li className={`${defaultCss} ${desktopCss} ${hoverCss}`}>
            <a href={relativePath}>{displayName}</a>
        </li>
    );
}