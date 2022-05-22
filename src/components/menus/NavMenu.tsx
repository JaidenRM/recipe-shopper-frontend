import { FC, useState } from "react"
import { AnimatedButton } from "../buttons/AnimatedButton";
import { DarkLightSwitch } from "../buttons/DarkLightSwitch";
import { NavMenuItem, NavMenuItemProps } from "./NavMenuItem";

interface NavMenuProps {
    menuItems: NavMenuItemProps[]
}

export const NavMenu: FC<NavMenuProps> = ({ menuItems }) => {
    const [isOpen, setIsOpen] = useState(false);
    const reactMenuItems = menuItems.map(item => <NavMenuItem {...item} />);

    return (
        <div className="flex items-center justify-between border-b border-black dark:border-white py-8 px-4">
            {/* Insert link to own website? */}
            <nav className="w-full">
                <section className="MOBILE-MENU flex lg:hidden dark:text-white">
                    <AnimatedButton
                        animationName="animate-wiggle-left-right"
                        className="HAMBURGER-ICON space-y-2 hover:cursor-pointer"
                        onClick={() => setIsOpen(prev => !prev)}
                    >
                        <span className="block h-1 w-8 bg-black dark:bg-white"></span>
                        <span className="block h-1 w-8 bg-black dark:bg-white"></span>
                        <span className="block h-1 w-8 bg-black dark:bg-white"></span>
                    </AnimatedButton>

                    <div className={setMenuClass(isOpen) + " dark:bg-black"}>
                        <AnimatedButton
                            animationName="animate-wiggle-right-left"
                            className="CROSS-ICON absolute top-0 right-0 px-8 py-8 hover:cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg
                                className="h-8 w-8 text-black dark:text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </AnimatedButton>
                        <ul className="MOBILE-MENU-ITEMS flex flex-col items-center justify-between min-h-[250px]">
                            {reactMenuItems}
                        </ul>
                    </div>
                </section>

                <div className="DESKTOP-MENU hidden space-x-8 lg:flex justify-center items-center">
                    <ul className="flex flex-row">
                        {reactMenuItems}
                    </ul>
                </div>
            </nav>
            <div className="absolute right-0">
                <DarkLightSwitch />
            </div>
        </div>
    );
}

const setMenuClass = (isMenuOpen: boolean): string => {
    if (isMenuOpen) {
        return "flex absolute w-full h-screen top-0 left-0 bg-white" + 
            " z-10 flex-col justify-evenly items-center";
    }

    return "hidden";
}