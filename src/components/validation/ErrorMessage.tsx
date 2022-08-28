import { FC } from "react";

interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <h1 className="error-msg">
      {message ?? "Oops, something went wrong here."}
    </h1>
  );
};
