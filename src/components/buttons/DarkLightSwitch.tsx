import { useDarkLightTheme } from "../../hooks/useDarkLightTheme";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { AnimatedButton } from "./AnimatedButton";

export const DarkLightSwitch = () => {
    const [theme, setTheme] = useDarkLightTheme();
    
    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    const isDark = theme === 'dark';
    const animationName = isDark ? "animate-wiggle-left-right" : "animate-wiggle-right-left";

    return (
        <AnimatedButton
            className="THEME-SWITCH flex flex-col items-center w-[100px] hover:cursor-pointer text-5xl"
            animationName={animationName}
            onClick={toggleTheme}
        >
            {isDark ? <BsFillMoonFill /> : <BsFillSunFill />}
        </AnimatedButton>
    );
}