import { useEffect, useState } from "react"

export const useDarkLightTheme = () => {
    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        const rootClassList = window.document.documentElement.classList;

        rootClassList.remove(getOppositeTheme(theme));
        rootClassList.add(theme);

        localStorage.setItem('theme', theme);

    }, [theme]);

    return [theme, setTheme] as const;
}

const getInitialTheme = (): string => {
    if (
        localStorage.theme === 'dark' || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        return 'dark';
    } else {
        return 'light';
    }
}

const getOppositeTheme = (currentTheme: string): string => 
    currentTheme === 'dark' ? 'light' : 'dark';