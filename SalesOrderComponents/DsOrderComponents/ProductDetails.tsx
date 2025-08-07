/* eslint-disable react/display-name */
import { useEffect, useState } from "react";
import styles from "@/app/Order/order.module.css";
import Image from "next/image";
import EmptyHour from "@/Icons/mediumIcons/emptyHourglass.svg";
import AddProduct from "./addProduct";
import {
  closeContext,
  createContext,
  displayContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import whitetrashbtn from "@/Icons/smallIcons/whitetrash.svg";
import trashbtn from "@/Icons/smallIcons/trashbtn.svg";

import { ImgProps } from "next/dist/shared/lib/get-img-props";

import { formatDate } from "@/helpers/Method/tableOperations";
import { product, saveOrderItem, DsTableRow, tableData } from "@/helpers/types";
import {
  calculateBasicValue,
  calculateBonusAmount,
  calculateDiscountQuantity,
  calculateDiscountAmount,
  calculateNetAmount,
  calculateEsvAmount,
  calculateIGSTAmount,
  calculateCGSTAmount,
  calculateSGSTAmount,
} from "@/helpers/Method/calculations";
import TableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import { DsStatus } from "@/helpers/constant";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import React from "react";
import {
  OrderData,
  OrderItem,
  Product,
  useOrderData,
} from "./OrderContextProvider";
import { OpenPopup } from "@/Elements/DsComponents/dsPopup/dsPopup";
import CsvPopup from "@/app/Order/csvpopup/csvComponent";
import upload from "@/Icons/smallIcons/uploadicon.svg";

export interface productDetails {
  selectedTabId: string;
  orderData: OrderData | null;
  addOrderItem: (productId: number, quantity: number) => Promise<void>;
  updateOrderItem: (
    id: number,
    key: keyof Omit<OrderItem, "id">,
    value: any
  ) => Promise<void>;
  removeOrderItem: (id: number) => void;
}

const ProductDetails: React.FC<productDetails> = React.memo(
  ({
    selectedTabId,
    orderData,
    addOrderItem,
    updateOrderItem,
    removeOrderItem,
  }) => {
    const [netValue, setNetValue] = useState<number>(0);
    const [productList, setProductList] = useState<OrderItem[]>(
      orderData?.orderItems ?? []
    );
    const [selectedProduct, setSelectedProduct] = useState<
      number | undefined
    >();
    const [selectedProductName, setSelectedProductName] = useState<
      string | undefined
    >();

    // const [isProductVisible, setIsProductVisible] = useState<boolean>(false);
    const [isProductAddDisabled, setIsProductAddDisabled] =
      useState<boolean>(false);
    // let newRows: DsTableRow[] = [];
    const [tempTableData, setTempTableData] = useState<tableData>({
      className: "sample-table  form-table",
      id: "table-1",
      type: "InterActive",
      isSortable: true,
      hasSearch: false,
      columns: [
        {
          columnIndex: 0,
          className: styles["product-code"] + " cell cell-2",
          columnHeader: "PRODUCT CODE & NAME",
          isHidden: false,
          sort: "ASC",
          columnContentType: "string",
          hasSort: true,
        },
        {
          columnIndex: 1,
          className: styles["carton-size"] + " cell cell-0-5",
          columnHeader: "CARTON SIZE",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: true,
        },
        {
          columnIndex: 2,
          className: styles["qty-column"] + " cell cell-0-5",
          columnHeader: "QTY",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: true,
        },
        {
          columnIndex: 3,
          className: styles["req-expiry-days"] + " cell cell-1",
          columnHeader: "REQUESTED EXPIRY DAYS",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: true,
        },
        {
          columnIndex: 4,
          className: styles["sales-quantity"] + " cell cell-0-5",
          columnHeader: "SALES QTY",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: true,
        },
        {
          columnIndex: 5,
          className: styles["balance"] + " cell cell-1",
          columnHeader: "BALANCE",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: true,
        },
        {
          columnIndex: 6,
          className: styles["bonus-quantity"] + " cell cell-0-5",
          columnHeader: "BONUS QTY",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: true,
        },
        {
          columnIndex: 7,
          className: styles["dispatch-quantity"] + " cell-1",
          columnHeader: "DISPATCH QTY",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: true,
        },
        {
          columnIndex: 8,
          className: styles["batch-no"] + " cell cell-1",
          columnHeader: "BATCH NO.",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: true,
        },
        {
          columnIndex: 9,
          className: styles["expiry-date"] + " cell  cell-0-5",
          columnHeader: "EXPIRY DATE",
          isHidden: false,
          sort: "ASC",
          columnContentType: "date",
          hasSort: true,
        },
        {
          columnIndex: 10,
          className: styles["mrp"] + " cell cell-0-5",
          columnHeader: "MRP",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: true,
        },
        {
          columnIndex: 11,
          className: styles["basic-value"] + " cell cell-0-5",
          columnHeader: "BASIC VALUE",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: true,
        },
        {
          columnIndex: 12,
          className: styles["special-rate"] + " cell cell-0-5",
          columnHeader: "SPECIAL RATE (₹)",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: true,
        },
        {
          columnIndex: 13,
          className: styles["net-amount"] + " cell cell-1",
          columnHeader: "NET AMOUNT (₹)",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: true,
        },
        {
          columnIndex: 14,
          className: styles["esv-amount"] + " cell cell-1",
          columnHeader: "ESV AMOUNT (₹)",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: true,
        },
        {
          columnIndex: 15,
          className: styles["igst"] + " cell cell-0-5",
          columnHeader: "IGST",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: false,
        },
        {
          columnIndex: 16,
          className: styles["cgst"] + " cell cell-0-5",
          columnHeader: "CGST",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: false,
        },
        {
          columnIndex: 17,
          className: styles["sgst"] + " cell cell-0-5",
          columnHeader: "SGST",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: false,
        },
        {
          columnIndex: 18,
          className: styles["hsn"] + " cell",
          columnHeader: "HSN",
          isHidden: false,
          sort: "ASC",
          columnContentType: "number",
          hasSort: false,
        },
      ],
      rows: [],
    });

    const updateValue = (
      rowIndex: number,
      columnIndex: number,
      value: string | number
    ) => {
      const updatedTableData = {
        ...tempTableData,
        rows: tempTableData.rows.map((row) =>
          row.rowIndex === rowIndex
            ? {
                ...row,
                content: row?.content?.map((cell) =>
                  cell.columnIndex === columnIndex
                    ? {
                        ...cell,
                        isInputRequired: false,
                        content: value,
                        filterValue: value,
                      }
                    : cell
                ),
              }
            : row
        ),
      };

      setTempTableData(updatedTableData);
    };

    useEffect(() => {
      // newRows = [];

      const prodInput = document.getElementById(
        "ProductSearch"
      ) as HTMLInputElement;
      if (prodInput) {
        prodInput.value = "";
      }
      const qty = document.getElementById("qty") as HTMLInputElement;
      if (qty?.value) {
        qty.value = "";
      }
      // prodList.innerHTML="";
      let netValue = 0;
      tempTableData?.rows?.forEach((row) =>
        row?.content?.forEach((cell) => {
          if (cell.columnIndex === 13) {
            const value = Number(cell?.filterValue);
            if (!isNaN(value)) {
              netValue += value;
            }
          }
        })
      );
      setNetValue(netValue);
      // setProducts((prev) => productList);
    }, [tempTableData]);

    const updateSalesQuantity = () => {
      const salesQtyTextFields =
        document.querySelectorAll(".salesQtyTextField");
      if (salesQtyTextFields) {
        // const textFieldValues: SalesTextField[] = [];
        const textFieldValues: any = [];

        salesQtyTextFields.forEach((textField) => {
          const rowIndex = textField.getAttribute("data-row-index");
          const productId = textField.getAttribute("data-product-id");
          const orderItemId = textField.getAttribute("data-order-item-id");
          const salesValue = (textField as HTMLInputElement).value;
          textFieldValues.push({
            rowIndex: parseInt(rowIndex || "0"),
            productId: parseInt(productId || "0"),
            orderItemId: parseInt(orderItemId || "0"),
            value: salesValue,
          });
        });
        textFieldValues.forEach((tfv: any) => {
          const product = productList.find(() => {
            let flag = false;
            if (tfv.productId != 0 && tfv.productId) {
              flag = true;
            }
            if (tfv.orderItemId != 0 && tfv.orderItemId) {
              flag = true;
            }
            return flag;
          });
          if (product) {
            const newProdList = [...productList];
            const index = newProdList.indexOf(product);
            if (product.product) {
              newProdList[index] = {
                ...product,
                product: {
                  ...product.product,
                  dispatchQuantity: parseInt(tfv.value),
                },
              };
              updateOrderItem(
                product.productId,
                "requestedQuantity",
                tfv.value
              );
              setProductList(() => newProdList);
            }
          }

          updateValue(tfv.rowIndex, 3, tfv.value);
        });
      }
    };

    const handleRowClick = (
      e: React.MouseEvent<HTMLElement>,
      rowIndex: number
    ) => {
      const table = (e.target as HTMLElement).closest("table");
      if (table) {
        const checkbox = table?.querySelector(`.row-checkbox-${rowIndex}`);
        if (checkbox) {
          // const element = checkbox as HTMLInputElement;
          // element.checked = true;
          displayContext(e, "contet2", "vertical", "center", 200);
          const row = tempTableData?.rows?.find(
            (row) => row.rowIndex === rowIndex
          );
          if (row) {
            const productId = row.customAttributes?.productId;
            const productNameCell = row?.content?.find(
              (cell) => cell.columnIndex === 0
            );
            setSelectedProduct(Number(productId));
            setSelectedProductName(
              productNameCell?.customAttributes?.productName?.toString()
            );
          }
        }
      }
    };

    const validateRequestedExpiryDays = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      productId: number
    ) => {
      const textfield = e.target as HTMLElement;
      const value = (e.target as HTMLInputElement).value;
      if (Number(value) < 30 || Number(value) > 180) {
        textfield.style.color = "red";
        textfield.style.borderColor = "red";
        // textfield.style.borderColor = "inherit";
      } else {
        textfield.style.color = "black";
        textfield.style.borderColor = "inherit";
      }
    };

    const handleclose = () => {
      closeContext("contextMenuId4");
    };

    const changeImage = (
      e: React.MouseEvent<HTMLElement>,
      imgSrc: ImgProps
    ) => {
      // console.log(imgSrc);
      const icon = (e.target as HTMLElement).querySelector(
        ".icon > img"
      ) as HTMLImageElement;
      if (icon) {
        icon.src = imgSrc.src;
      }
    };

    const handleCheckBoxClick = (
      e: React.MouseEvent<HTMLElement>,
      rowIndex: number,
      isChecked: boolean
    ) => {
      if (isChecked === true) {
        // (e.target as HTMLInputElement).checked = true;
        displayContext(e, "contet2", "vertical", "center", 200);
      } else {
        // (e.target as HTMLInputElement).checked = false;
        closeContext("contet2");
      }
    };

    useEffect(() => {
      createContext(
        "update-cell-value",
        <DsButton
          label="Update"
          onClick={() => updateSalesQuantity()}
        ></DsButton>,
        false
      );
    }, []);

    useEffect(() => {
      if (
        selectedTabId !== "0" ||
        orderData?.status.toLowerCase() == DsStatus.APRV.toLowerCase()
      ) {
        setIsProductAddDisabled(true);
      } else {
        setIsProductAddDisabled(false);
      }
    }, [selectedTabId]);

    useEffect(() => {
      if (!orderData?.orderItems) return;

      const newRows = orderData.orderItems.map((orderItem, index) => {
        const salesQty = orderItem.requestedQuantity
          ? orderItem.requestedQuantity -
            ((orderItem.product?.dispatchQuantity || 0) +
              (orderItem.product?.bonusQuantity || 0))
          : 0;

        const actualRate =
          orderItem.product?.specialRate || orderItem?.mrpRate || 0;

        const basicValue = calculateBasicValue(
          actualRate,
          orderItem.product?.dispatchQuantity || 0
        );
        const bonusAmount = calculateBonusAmount(
          orderItem.product?.bonusQuantity || 0,
          actualRate
        );
        const discountQuantity = calculateDiscountQuantity(
          orderItem.product?.discountPercentage || 0,
          orderItem.product?.dispatchQuantity || 0
        );
        const discountAmount = calculateDiscountAmount(
          discountQuantity || 0,
          actualRate
        );
        const netAmount = calculateNetAmount(
          basicValue,
          bonusAmount,
          discountAmount
        );
        const esvAmount = calculateEsvAmount(basicValue, discountAmount);
        const igstAmount = calculateIGSTAmount(
          netAmount,
          orderItem.product?.igstRate || 0
        );
        const cgstAmount = calculateCGSTAmount(
          netAmount,
          orderItem.product?.cgstRate || 0
        );
        const sgstAmount = calculateSGSTAmount(
          netAmount,
          orderItem.product?.sgstRate || 0
        );
        return {
          rowIndex: index,
          className: "rows cellRow",
          customAttributes: { productId: orderItem?.productId },
          content: [
            {
              columnIndex: 0,
              className: styles["product-code"] + " cell cell-2",
              content: `${orderItem.product?.productCode} - ${orderItem.product?.productName}`,
              filterValue: orderItem.product?.productCode,
              contentType: "string",
              customAttributes: {
                productName: orderItem?.product?.productName?.toString() ?? "",
              },
            },
            {
              columnIndex: 1,
              className: styles["carton-size"] + " cell cell-0-5",

              content: orderItem.product?.cartonSize ?? "-",
              filterValue: orderItem.product?.cartonSize ?? "-",
              contentType: "number",
            },
            {
              columnIndex: 2,
              className: styles["qty-column"] + " cell cell-0-5",

              content: (
                <DsTextField
                  containerClasses="p-0 m-0"
                  id={`${orderItem?.productId}-textfield`}
                  initialValue={orderItem.requestedQuantity?.toString() ?? "0"}
                  minimumNumber={0}
                  inputType="number"
                  // onChange={(e) =>
                  //   validateRequestedExpiryDays(e, orderItem?.productId)
                  // }
                  onBlur={(e) =>
                    updateOrderItem(
                      orderItem.productId,
                      "requestedQuantity",
                      (e.target as HTMLInputElement).value
                    )
                  }
                  // onKeyUp={(e) =>
                  //   validateRequestedExpiryDays(e, orderItem?.productId)
                  // }
                />
              ),
              filterValue: orderItem.requestedQuantity ?? "-",
              contentType: "number",
            },
            {
              columnIndex: 3,
              className: styles["req-expiry-days"] + " cell cell-1",

              content: (
                <DsTextField
                  containerClasses="p-0 m-0"
                  id={`${orderItem?.productId}-textfield`}
                  initialValue={
                    orderItem.requestedExpiryInDays?.toString() ?? "0"
                  }
                  minimumNumber={0}
                  inputType="number"
                  onChange={(e) =>
                    validateRequestedExpiryDays(e, orderItem?.productId)
                  }
                  onBlur={(e) =>
                    updateOrderItem(
                      orderItem.productId,
                      "requestedExpiryInDays",
                      (e.target as HTMLInputElement).value
                    )
                  }
                  // onKeyUp={(e) =>
                  //   validateRequestedExpiryDays(e, orderItem?.productId)
                  // }
                />
              ),
              filterValue: orderItem?.requestedExpiryInDays ?? "-",
              contentType: "number",
            },
            {
              columnIndex: 4,
              className: styles["sales-quantity"] + " cell cell-0-5",

              content: salesQty ?? "-",
              filterValue: salesQty ?? "-",
              contentType: "string",
            },
            {
              columnIndex: 5,
              className: styles["balance"] + " cell cell-1",

              content: "0",
              filterValue: "0",
              contentType: "date",
            },
            {
              columnIndex: 6,
              className: styles["bonus-quantity"] + " cell cell-0-5",

              content: orderItem.product?.bonusQuantity ?? "0",
              filterValue: orderItem.product?.bonusQuantity ?? "0",
              contentType: "string",
            },
            {
              columnIndex: 7,
              className: styles["dispatch-quantity"] + " cell-1",

              content: orderItem.product?.dispatchQuantity ?? "0",
              filterValue: orderItem.product?.dispatchQuantity ?? "0",
              contentType: "number",
            },
            {
              columnIndex: 8,
              className: styles["batch-no"] + " cell cell-1",

              content: orderItem.batch?.batchNo ?? "-",
              filterValue: orderItem.batch?.batchNo ?? "-",
              contentType: "string",
            },
            {
              columnIndex: 9,
              className: styles["expiry-date"] + " cell cell-0-5",

              content: orderItem?.product?.expiryDate ?? "" ?? "-",
              filterValue: orderItem?.product?.expiryDate ?? "-",
              contentType: "date",
            },
            {
              columnIndex: 10,
              className: styles["mrp"] + " cell cell-0-5",

              content: orderItem?.batch?.mrpRate ?? "" ?? "-",
              filterValue: orderItem?.batch?.mrpRate ?? "-",
              contentType: "date",
            },
            {
              columnIndex: 11,
              className: styles["basic-value"] + " cell cell-0-5",

              content: orderItem?.batch?.basicRate ?? "" ?? "-",
              filterValue: orderItem?.batch?.basicRate ?? "-",
              contentType: "date",
            },
            {
              columnIndex: 12,
              className: styles["special-rate"] + " cell cell-0-5",

              content: orderItem?.product?.specialRate ?? "" ?? "-",
              filterValue: orderItem?.product?.specialRate ?? "-",
              contentType: "date",
            },
            {
              columnIndex: 13,
              className: styles["net-amount"] + " cell cell-1",

              content: netAmount ?? "-",
              filterValue: netAmount ?? "-",
              contentType: "number",
            },
            {
              columnIndex: 14,
              className: styles["esv-amount"] + " cell cell-1",

              content: esvAmount ?? "-",
              filterValue: esvAmount ?? "-",
              contentType: "number",
            },
            {
              columnIndex: 15,
              className: styles["igst"] + " cell cell-0-5",

              content: igstAmount ?? "-",
              filterValue: igstAmount ?? "-",
              contentType: "number",
            },
            {
              columnIndex: 16,
              className: styles["cgst"] + " cell cell-0-5",

              content: cgstAmount ?? "-",
              filterValue: cgstAmount ?? "-",
              contentType: "number",
            },
            {
              columnIndex: 17,
              className: styles["sgst"] + " cell cell-0-5",

              content: sgstAmount ?? "-",
              filterValue: sgstAmount ?? "-",
              contentType: "number",
            },
            {
              columnIndex: 18,
              className: styles["hsn"] + " cell",

              content: orderItem.product?.hsnCode ?? "-",
              filterValue: orderItem.product?.hsnCode ?? "-",
              contentType: "number",
            },
          ],
        };
      });

      setTempTableData((prev) => ({
        ...prev,
        rows: newRows,
      }));
    }, [orderData?.orderItems?.length]);

    // useEffect(() => {
    //   if (orderData?.customerId && orderData?.customerId != 0) {
    //     setIsProductVisible(true)
    //   }
    // }, [orderData, orderData?.customer, orderData?.customerId])

    useEffect(() => {
      createContext(
        "contextMenuId4",
        <>
          <div className={styles.contextcontainer}>
            <div className={styles.deleteText}>
              Delete{" "}
              <span className={styles.selectedProduct}>
                {" "}
                {selectedProductName}
              </span>
            </div>
            {/* <div className={styles.selectedProduct}>{selectedProductName}</div> */}
          </div>
          <p className={styles.confirmationtext}>
            Are you sure you want to delete this product line item?
          </p>

          <div className={styles.btncontext}>
            <div className={styles.delelbtn}>
              <DsButton
                id="cancelBtn"
                buttonColor="btnDark"
                buttonViewStyle="btnOutlined"
                onClick={(e) => {
                  // clickHandler(e);
                  handleclose();
                  closeContext("contet2");
                  closeContext("contextMenuId4");
                }}
                tooltip="variants : btnDark, btnOutlined, btnSmall"
                label="Cancel"
              />
            </div>

            <div>
              <DsButton
                id="deleteBtn"
                buttonColor="btnDanger"
                buttonSize="btnMedium"
                buttonViewStyle="btnContained"
                onClick={() => {
                  if (selectedProduct) removeOrderItem(selectedProduct);
                  closeContext("contet2");
                  closeContext("contextMenuId4");
                }}
                tooltip="variants : btnDanger, btnContained, btnMedium"
                label="Delete"
              />
            </div>
          </div>
        </>,
        true,
        styles.productContext
      );
    }, [selectedProduct]);

    useEffect(() => {
      // closeAllContext();
      createContext(
        "contet2",
        <>
          <DsButton
            id="deleteBtn"
            buttonColor="btnWarning"
            buttonViewStyle="btnContained"
            onClick={(e) => {
              changeImage(e, whitetrashbtn);
              displayContext(e, "contextMenuId4", "vertical", "center");
            }}
            onMouseLeave={() => {
              closeContext("contet2");
              // closeContext("contextMenuId4");
            }}
            startIcon={<Image src={trashbtn} alt="icon" />}
            tooltip="variants : btnWarning, btnContained, btnMedium"
            label="Delete"
          />
        </>,
        true,
        styles.deleteBtn
      );
    }, []);

    return (
      <>
        {orderData?.customerId &&
          orderData?.customerId != 0 &&
          orderData?.customerId != undefined &&
          orderData?.customerId != null && (
            <div className={styles.Product}>
              <div className={styles.addProduct}>
                <div className={styles.productTitleBar}>
                  <div className={styles.title}>Product Details</div>

                  <AddProduct
                    // orderStatus={orderStatus}
                    isProductAddDisabled={isProductAddDisabled}
                    addOrderItem={addOrderItem}
                  ></AddProduct>

                <div>
                  <DsButton
                    // iconSize="iconMedium"
                    className={styles.csvpopupBtn}
                    startIcon={
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          position: "relative",
                        }}
                      >
                        <Image
                          src={upload}
                          alt="csv"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    }
                    // startIcon={
                    //   <Image src={upload} width={30} height={30} alt={"csv"} />
                    // }
                    buttonSize="btnLarge"
                    buttonViewStyle="btnText"
                    id="CSV"
                    onClick={() => OpenPopup("csvpopup")}
                  >
                    CSV file
                  </DsButton>
                </div>
              </div>
              <div>
                <CsvPopup></CsvPopup>
              </div>

                {/* </div> */}

                <div className={styles.summary}>
                  <DsInfoDisplay detailOf={"Products"}>
                    {tempTableData?.rows?.length}
                  </DsInfoDisplay>
                  <DsInfoDisplay detailOf={"Net Value (₹)"}>
                    {netValue}
                  </DsInfoDisplay>
                </div>
              </div>

              <div className={styles.ProductDetails}>
                <TableComponent
                  className={tempTableData?.className}
                  id={tempTableData?.id}
                  type={"InterActive"}
                  isSelectAble={true}
                  // hasIcons={true}
                  isSortable={true}
                  columns={tempTableData?.columns}
                  rows={tempTableData?.rows}
                  isCheckBoxVisible={true}
                  handleCheckboxClick={handleCheckBoxClick}
                  // handleAddIcon={handleAddIcon}
                  handleRowClick={handleRowClick}
                  isFooterRequired={tempTableData?.rows.length > 0}
                ></TableComponent>
                {tempTableData?.rows.length == 0 && (
                  <div className={styles.noDataFound}>
                    <div></div>
                    <div className={styles.noData}>
                      <Image src={EmptyHour} alt="-"></Image>
                      <div>Products Not Available</div>
                    </div>
                    <div className={styles.noDataBorders}></div>
                  </div>
                )}
              </div>
            </div>
          )}
      </>
    );
  }
);
export default ProductDetails;
