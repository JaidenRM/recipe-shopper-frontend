import { useLocation, Location } from "react-router-dom";

interface TypedLocation<T> extends Location {
  state: T;
}

export const useLocationGeneric = <T>(): TypedLocation<T> => {
  const location = useLocation();

  return {
    ...location,
    ...{ state: location.state as T },
  };
};
