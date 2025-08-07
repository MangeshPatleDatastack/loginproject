/* eslint-disable react/display-name */
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import { DsStatus, searchProductsURL } from "@/helpers/constant";
import { product, datalistOptions, searchProducts } from "@/helpers/types";
import DsSearchComponent from "./searchComponent";
import { Dispatch, SetStateAction, useState } from "react";
import React from "react";
import styles from "@/app/Order/order.module.css";

export interface ProductSearchProps {
  initialValue?: string;
  orderStatus?: string;
  isAddButtonClicked?: boolean;
  isProductAddDisabled?: boolean;
  setSelectedProductId: Dispatch<SetStateAction<number | undefined>>;
  // setSelectedProductBatchId: Dispatch<SetStateAction<number | undefined>>;
}


export function isSearchProduct(value: unknown): value is searchProducts {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "code" in value &&
    "name" in value &&
    "batchNumber" in value &&
    "quantity" in value &&
    typeof (value as unknown as product).id === "number" &&
    typeof (value as unknown as product).code === "string" &&
    typeof (value as unknown as product).name === "string" &&
    typeof (value as unknown as product).batchNumber === "string" &&
    typeof (value as unknown as product).quantity === "number"
  );
}
export function areSearchProduct(value: unknown): value is product[] {
  return Array.isArray(value) && value.every(isSearchProduct);
}
const ProductSearch: React.FC<ProductSearchProps> = React.memo(({
  initialValue,
  orderStatus,
  isAddButtonClicked,
  isProductAddDisabled = false,
  setSelectedProductId,
  // setSelectedProductBatchId,
}) => {
  const [products, setProducts] = useState<datalistOptions[]>();
  const setOptions = (values: any[]) => {
    if (areSearchProduct(values)) {
      const products: datalistOptions[] = values.map(
        (x: {
          id: number;
          code?: string;
          name?: string;
          batchNumber?: string;
          quantity?: number;
        }) => {
          return {
            id: x.id.toString(),
            value: x.code + " - " + x.name,
            attributes: {
              // "batch-id": x.batchId?.toString() || "",
              "product-id": x.id.toString(),
            },
            secondaryValue: (
              <>
                <DsInfoDisplay detailOf="Batch No" className="secondaryValue">
                  {x.batchNumber}
                </DsInfoDisplay>
                <DsInfoDisplay detailOf="Qty" className="secondaryValue">{x.quantity || 0}</DsInfoDisplay>
              </>
            ),
          };
        }
      );
      setProducts(products);
    }
  };

  const setSelectedOption = (option: datalistOptions) => {
    // //console.log("option = ",option);

    // const selectedProductBatchId = option.attributes["batch-id"];
    const selectedProductId = option.attributes["product-id"];
    if (selectedProductId) {
      setSelectedProductId(parseInt(selectedProductId));
    }
    // if (selectedProductBatchId) {
    //   setSelectedProductBatchId(parseInt(selectedProductBatchId));
    // }
  };
  return (
    <DsSearchComponent
      id="productSearch"
      dataListId="productSearchDatalist"
      className={styles.productDataList}
      placeholder={"Product"}
      options={products ? products : undefined}
      setOptions={setOptions}
      setSearchUrl={(searchTerm: string) => {
        return searchProductsURL + searchTerm.toLowerCase();
      }}
      setSelectedOption={setSelectedOption}
      disable={isProductAddDisabled}
      initialValue={initialValue}
      onSaveButtonClicked={isAddButtonClicked}
    />
  );
});
export default ProductSearch;


