import { FC } from "react";
import { useFetch } from "../../../@hooks/useFetch";
import { IProduct } from "../../../@interfaces/recipe-shopper-api";
import { ErrorMessage } from "../../validation/ErrorMessage";
import { ProductSearchResultsListItem } from "./ProductSearchResultsListItem";

interface ProductSearchResultsProps {
  supermarket: number;
  searchTerm: string;
  onSelected?: (product: IProduct) => void;
}

export const ProductSearchResults: FC<ProductSearchResultsProps> = ({
  supermarket,
  searchTerm,
  onSelected,
}) => {
  const { data, error } = useFetch<IProduct[]>(
    createSearchUrl(supermarket, searchTerm),
  );
  const onClickProduct = (product: IProduct): void => {
    if (onSelected != null) onSelected(product);
  };

  if (error != null)
    return <ErrorMessage message="There was an issue fetching recipes" />;
  if (data == null || data.length === 0)
    return <h3 className="text-xl opacity-90">No products were found</h3>;

  return (
    <div className="PRODUCT-RESULTS flex flex-wrap">
      {data.map((product, i) => (
        <div
          key={i}
          onClick={() => onClickProduct(product)}
          className="sm:basis-1/2 lg:basis-1/4 p-2"
        >
          <ProductSearchResultsListItem product={product} />
        </div>
      ))}
    </div>
  );
};

const createSearchUrl = (supermarket: number, searchTerm: string): string => {
  if (!supermarket || !searchTerm) return "";

  return `${
    process.env.REACT_APP_RECIPE_SHOPPER_API ?? ""
  }/supermarket/${supermarket}/${searchTerm}`;
};
