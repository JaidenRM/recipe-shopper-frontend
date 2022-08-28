import React, { FC, useCallback, useState } from "react";
import { EmptyFn } from "../../@types/empty-fn";

type ButtonType = "button" | "submit" | "reset";
interface ButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  buttonRef?: React.LegacyRef<HTMLButtonElement>;
  buttonType?: ButtonType;
}

export const Button: FC<ButtonProps> = ({
  text,
  onClick,
  className,
  buttonRef,
  buttonType = "button",
}) => {
  const [isClicking, setIsClicking] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const onClickHandler = useCallback(() => {
    if (!isClicking && !isTransitioning) {
      setIsClicking(true);
      setIsTransitioning(true);
    }
  }, [isClicking, isTransitioning]);

  const onTransitionEndHandler: EmptyFn = () => {
    if (isTransitioning && isClicking) {
      setIsClicking(false);
      setIsTransitioning(false);
      if (onClick != null) onClick();
    }
  };

  return (
    <button
      className={
        "styled-input font-bold bg-slide-down" +
        (isClicking ? " activate" : "") +
        (className ? " " + className : "")
      }
      onClick={onClickHandler}
      onTransitionEnd={onTransitionEndHandler}
      ref={buttonRef}
      type={buttonType}
    >
      {text}
    </button>
  );
};
