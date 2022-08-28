import { useDarkLightTheme } from "../../@hooks/useDarkLightTheme";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { AnimatedButton } from "./AnimatedButton";
import { FC } from "react";
import { EmptyFn } from "../../@types/empty-fn";

export const DarkLightSwitch: FC = () => {
  const [theme, setTheme] = useDarkLightTheme();

  const toggleTheme: EmptyFn = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const isDark = theme === "dark";
  const animationName = isDark
    ? "animate-wiggle-left-right"
    : "animate-wiggle-right-left";

  return (
    <AnimatedButton
      className="THEME-SWITCH flex flex-col items-center w-[100px] hover:cursor-pointer text-5xl"
      animationName={animationName}
      onClick={toggleTheme}
    >
      {isDark ? <BsFillMoonFill /> : <BsFillSunFill />}
    </AnimatedButton>
  );
};
