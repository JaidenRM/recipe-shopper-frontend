import { FC } from "react";
import { Link } from "react-router-dom";
import { EmptyFn } from "../../@types/empty-fn";

export interface NavMenuItemProps {
  displayName: string;
  relativePath: string;
  onClick?: () => void;
}

export const NavMenuItem: FC<NavMenuItemProps> = ({
  displayName,
  relativePath,
  onClick,
}) => {
  const defaultCss =
    "font-semibold border-b border-dark uppercase my-8 text-xl py-2 px-8";
  const desktopCss = "lg:border-b-0 lg:normal-case lg:my-0";
  const delayOnClick: EmptyFn = () =>
    setTimeout(() => {
      if (onClick != null) onClick();
    }, 1000);

  return (
    <Link
      to={relativePath}
      className={`${defaultCss} ${desktopCss} slide-right`}
      onClick={delayOnClick}
    >
      {displayName}
    </Link>
  );
};
