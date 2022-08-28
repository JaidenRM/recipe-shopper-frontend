import { FC, useRef, useState } from "react";
import { IProduct } from "../../../@interfaces/recipe-shopper-api";
import { EmptyFn } from "../../../@types/empty-fn";
import { Button } from "../../buttons/Button";
import { Input } from "../../input-fields/Input";
import { Select } from "../../input-fields/Select";
import { ProductSearchResults } from "./ProductSearchResultsList";

interface ProductSearchWidgetProps {
  onSelected?: (product: IProduct) => void;
  product?: IProduct;
  className?: string;
}

export const ProductSearchWidget: FC<ProductSearchWidgetProps> = ({
  onSelected,
  product,
  className,
}) => {
  const [supermarket, setSupermarket] = useState(product?.supermarketId ?? 0);
  const [searchTerm, setSearchTerm] = useState(String(product?.id ?? ""));

  const supermarketSelectRef = useRef<HTMLSelectElement>(null);
  const productInputRef = useRef<HTMLInputElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  const onSearchClick: EmptyFn = () => {
    setSupermarket(Number(supermarketSelectRef.current?.value));
    setSearchTerm(productInputRef.current?.value ?? "");
  };
  const onProductSelected = (product: IProduct): void => {
    if (onSelected != null) {
      onSelected({
        ...product,
        supermarketId: supermarket,
      });
    }
  };

  const onKeyUpHandler = (ev: React.KeyboardEvent<HTMLInputElement>): void => {
    if (ev.key.toLocaleLowerCase() === "enter")
      searchButtonRef.current?.click();
  };

  return (
    <div
      className={`PRODUCT-SEARCH-WIDGET grid grid-cols-1 auto-rows-min gap-2 ${
        className ?? ""
      }`}
    >
      <Select
        label="Supermarket"
        options={[
          {
            value: "1",
            displayValue: "Woolworths",
          },
          {
            value: "2",
            displayValue: "Coles",
          },
        ]}
        htmlProps={{ ref: supermarketSelectRef, defaultValue: supermarket }}
      />
      <div className="flex flex-row">
        <Input
          label="Product"
          htmlProps={{
            ref: productInputRef,
            defaultValue: searchTerm,
            onKeyUp: onKeyUpHandler,
          }}
          className="flex-1"
        />
        <Button
          text="Search"
          onClick={onSearchClick}
          className="px-8 self-end ml-2"
          buttonRef={searchButtonRef}
        />
      </div>
      <ProductSearchResults
        supermarket={supermarket}
        searchTerm={searchTerm}
        onSelected={onProductSelected}
      />
    </div>
  );
};
