/* eslint-disable react/display-name */
import ProductSearch from "./productSearch";
import styles from "@/app/Order/order.module.css";
import { Dispatch, SetStateAction, useState } from "react";
import { getProductURL, DsStatus } from "@/helpers/constant";
import fetchData from "@/helpers/Method/fetchData";
import { getProduct, product } from "@/helpers/types";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import React from "react";
import { useOrderData } from "./OrderContextProvider";
 
export interface addProductProps {
  isProductAddDisabled?: boolean;
  addOrderItem: (productId: number, quantity: number) => Promise<void>
}
 
const AddProduct: React.FC<addProductProps> = React.memo(({
  isProductAddDisabled = false,
  addOrderItem
}) => {
 
  const [selectedProductId, setSelectedProductId] = useState<number>();
  // const [selectedProductBatchId, setSelectedProductBatchId] =
  //   useState<number>();
  const [isAddButtonClicked, setIsAddButtonClicked] = useState<boolean>(false);
 
  const [qtyInputVal, setQtyInputVal] = useState<string>("");
 
  const selectProduct = async () => {
    const quantity = (document.querySelector("#qty") as HTMLInputElement)
      ?.value;
    //console.log("selected product id = ", quantity);
 
    if (selectedProductId && quantity) {
      addOrderItem(selectedProductId, Number(quantity)).then(() => {
        const input = document.getElementById("productSearch") as HTMLInputElement;
        input.value = "";
        setSelectedProductId(0);
        setQtyInputVal("");
        setIsAddButtonClicked(true);
      })
      // const searchProductURL = getProductURL + "2";
      // // + selectedProductId;
      // const product = await fetchData({
      //   url: searchProductURL,
      // });
      // if (product.code === 200) {
      //   const searchedProdcut: getProduct = product.result;
      //   // const sampleProduct: product = {
      //   //   id: 1,
      //   //   name: "Sample Product",
      //   //   code: "SP001",
      //   //   cartonSize: 12,
      //   //   quantity: 100,
      //   //   mrp: 500,
      //   //   requestedExpiryDays: 33,
      //   // };
      //   // {
 
      //   //   id: searchedProdcut.id,
      //   //   code: searchedProdcut.code,
      //   //   name: searchedProdcut.name,
      //   //   cartonSize: searchedProdcut.cartonSize,
      //   //   mrp: searchedProdcut.mrpRate,
      //   //   basicValue: searchedProdcut.basicRate,
      //   //   quantity: parseInt(qtyInputVal),
      //   //   requestedExpiryDays: 0,
      //   // },
      //   // setSelectedProductBatchId(0);
      //   setSelectedProductId(0);
      //   setQtyInputVal("");
      //   setIsAddButtonClicked(true);
      // }
      // //console.log(product);
    }
  };
 
  return (
    <div className={styles.input}>
      <ProductSearch
        // orderStatus={orderStatus}
        isAddButtonClicked={isAddButtonClicked}
        isProductAddDisabled={isProductAddDisabled}
        setSelectedProductId={setSelectedProductId}
      // setSelectedProductBatchId={setSelectedProductBatchId}
      ></ProductSearch>
      {/* <TextField
          options={searchProducts}
          onOptionSelect={handleProductOnSelect}
          id={"ProductSearch"}
          dataListId={"ProductOptions"}
          className={""}
          initialValue={productInputVal}
          placeholder={"Add product"}
          label={"Add product"}
          handleKeyUp={handleProductKeyUp}
          starticon={<Image src={SearchIcon} alt="search"></Image>}
          // disable={orderStatus === dsStatus.APRV ? true :false}
        ></TextField> */}
      <DsTextField
        containerClasses={styles.qty}
        placeholder={" Qty"}
        inputType="number"
        minimumNumber={0}
        initialValue={qtyInputVal}
        onChange={(e) => setQtyInputVal(e.target.value)}
        id="qty"
        disable={isProductAddDisabled}
      ></DsTextField>
      <DsButton
        buttonSize="btnLarge"
        onClick={selectProduct}
        disable={isProductAddDisabled}
        buttonViewStyle="btnContained"
 
      >
        Add
      </DsButton>
    </div>
  );
});
export default AddProduct;
 
 
 