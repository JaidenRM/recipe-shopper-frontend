import { FC } from "react";
import { IProduct } from "../../../@interfaces/recipe-shopper-api";

interface ProductSearchResultsListItemProps {
  product: IProduct;
}

export const ProductSearchResultsListItem: FC<
  ProductSearchResultsListItemProps
> = ({ product }) => {
  const isOnSale = product.fullPrice > product.currentPrice;
  const imgUrl = GetProductImage(product);

  return (
    <div className="border-2 rounded-lg p-2 md:p-4 h-full flex flex-col justify-center hover:border-4">
      <h2 className="text-2xl font-bold flex-grow mb-2">{product.name}</h2>
      {imgUrl && (
        <div className="flex justify-center">
          <img src={imgUrl} alt={product.name} className="mb-2" />
        </div>
      )}
      <div>
        <h4
          className={`text-xl font-semibold ${isOnSale ? "line-through" : ""}`}
        >
          Price: ${product.fullPrice.toFixed(2)}
        </h4>
        {isOnSale && (
          <h6 className="text-red-600 italic text-lg font-bold">
            NOW: ${product.currentPrice.toFixed(2)} (
            {Math.round(100 - (product.currentPrice / product.fullPrice) * 100)}
            % off)
          </h6>
        )}
        {!isOnSale && <div>&nbsp;</div>}
      </div>
    </div>
  );
};

const GetProductImage = (product: IProduct): string => {
  if (product.imageUrls !== undefined) {
    if (product.imageUrls.large) return product.imageUrls.large;

    if (product.imageUrls.medium) return product.imageUrls.medium;

    if (product.imageUrls.small) return product.imageUrls.small;
  }

  return "";
};
