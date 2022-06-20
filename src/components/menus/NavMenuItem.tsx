import { FC } from "react"

export interface NavMenuItemProps {
    displayName: string
    relativePath: string
}

export const NavMenuItem: FC<NavMenuItemProps> = ({ displayName, relativePath }) => {
    const defaultCss = "font-semibold border-b border-dark uppercase my-8 text-xl py-2 px-8";
    const desktopCss = "lg:border-b-0 lg:normal-case lg:my-0";

    return (
        <li className={`${defaultCss} ${desktopCss} slide-right`}>
            <a href={relativePath}>{displayName}</a>
        </li>
    );
}