import { FC, ReactNode, useState } from "react";

interface AnimatedButtonProps {
    children: ReactNode
    className?: string
    animationName: string
    onClick?: () => void
}

export const AnimatedButton: FC<AnimatedButtonProps> = ({ children, onClick = () => {}, className = "", animationName }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    
    return (
        <button
            className={`${className} ${isAnimating ? animationName : ""}`}
            onClick={() => setIsAnimating(true)}
            onAnimationEnd={() => { setIsAnimating(false); onClick(); }}
        >
            {children}
        </button>
    );
}