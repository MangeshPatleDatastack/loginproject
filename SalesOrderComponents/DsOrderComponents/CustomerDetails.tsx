/* eslint-disable react/display-name */
"use client";
import styles from "@/app/Order/order.module.css";
import Image from "next/image";
import BankDetailsSrc from "@/Icons/mediumIcons/bankDetails.svg";
import React, { useEffect, useRef, useState } from "react";
import CustomerSearch from "./customerSearch";
import { DsStatus } from "@/helpers/constant";
import { customer, combinedOrder } from "@/helpers/types";
import {
  displayContext,
  closeContext,
  createContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import DsLocation from "@/Elements/DsComponents/dsLocation/dsLocation";
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import PurchaseOrderNumber from "./purchaseOrderNumber";
// import { formatDate } from "@/helpers/Method/tableOperations";
import DsDatePicker from "@/Elements/DsComponents/DsDatePicker/DsDatePicker";
import { OrderData, useOrderData } from "./OrderContextProvider";

export interface customerDetailsProps {
  customerDetails?: customer;
  orderData: OrderData | null;
  combinedOrders?: combinedOrder[];
  updateOrderDataField: (
    key: keyof Omit<OrderData, "id" | "orderItems">,
    value: any
  ) => void;
  //   orderData?.status?: string;
  //   purchaseOrderNo?: string;
  //   purchaseOrderDate?: string;
  //   setPurchaseOrderNo: Dispatch<SetStateAction<string | undefined>>;
  //   setPurchaseOrderDate: Dispatch<SetStateAction<string | undefined>>;
  //   setSelectedCustomer: Dispatch<SetStateAction<customer | undefined>>;
  //   setCustomerLocations: Dispatch<SetStateAction<location[] | undefined>>;
}

/**
 * Customer Details component displays customer details
 * @param {customer} customerDetails-customerDetails used for displaying or setting customer details.
 * @param {string} orderData?.status - Customer details editing based on order status.
 * @param {string} purchaseOrderNo - sets the purchase order no of the order.
 * @param {string} purchaseOrderDate - sets the purchase order date of the order.
 * @param {(e: Dispatch<SetStateAction<customer | null>>) => void} setSelectedCustomer - Function to handle setting and retiriving the data.
 */
const CustomerDetails: React.FC<customerDetailsProps> = React.memo(
  ({
    customerDetails,
    combinedOrders = [],
    orderData,
    updateOrderDataField,
  }) => {
    const [bankName, setBankName] = useState<string>("");
    const [bankAccNo, setBankAccNo] = useState<string>("");
    const [ifscCode, setIfscCode] = useState<string>("");
    const [bankBranch, setBankBranch] = useState<string>("");
    const [customerIdName, setCustomerIdName] = useState<string>("");
    const [infoDetailsVisible, setInfoDetailsVisible] =
      useState<boolean>(false);

    function convertDateFormat(dateStr: Date): string {
      // Split the date string into day, month, and year parts
      const day = dateStr.getDate();
      const month = dateStr.getMonth() + 1;
      const year = dateStr.getFullYear();

      // Reformat the date into yyyy-mm-dd format
      return `${year}-${month}-${day}`;
    }

    function convertStringToDateFormat(dateStr: string): string {
      dateStr = dateStr.replace(/[^\d-]/g, ""); // Remove non-numeric and non-dash characters
      dateStr = dateStr.replace(/\//g, "-"); // Replace slashes with dashes

      let parts = dateStr.split("-").filter(Boolean); // Split and remove empty parts
      let [year, month, day] = parts.map((p) => parseInt(p, 10) || 0);

      if (!day || day > 31) day = 24; // Default to 24 if invalid
      if (!month || month > 12) month = 3; // Default to 03 if invalid

      // Ensure year is properly formatted
      if (year && year < 100) {
        year = 2000 + year; // Convert '04' to '2004'
      } else if (!year) {
        year = 2004; // Default year if missing
      }
      if (day && year && month)
        return `${String(day).padStart(2, "0")}-${String(month).padStart(
          2,
          "0"
        )}-${String(year).padStart(4, "0")}`;
      else return "";
    }

    useEffect(() => {
      const handleMouseOut = (e: MouseEvent) => {
        const bankdetailsId = document.getElementById("BankDetails");
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const boundingBox = bankdetailsId?.getBoundingClientRect();
        const MX = (e.target as HTMLElement).getBoundingClientRect();
        const targetY = MX.y;
        const targetHeight = MX.height;

        const x = boundingBox?.x;
        const y = boundingBox?.y;
        const width = boundingBox?.width;
        const height = boundingBox?.height;

        if (targetY && targetHeight && x && y && width && height) {
          const endHeight = targetY + targetHeight;
          const endWidth = x + width;
          if (
            !(
              x < mouseX &&
              mouseX < endWidth &&
              y < mouseY &&
              mouseY < endHeight
            )
          ) {
            setTimeout(() => closeContext("BankDetails"), 2);
          }
        }

        // console.log(`X: ${x}, Y: ${y}, Width: ${width}, Height: ${height}`);
      };

      window.addEventListener("mouseout", handleMouseOut);

      return () => {
        window.removeEventListener("mouseout", handleMouseOut);
      };
    }, []);

    useEffect(() => {
      createContext(
        "BankDetails",
        <div className={styles.padx}>
          <div className={styles.bankTitle}>{bankName}</div>
          <DsInfoDisplay detailOf="A/C No">{bankAccNo}</DsInfoDisplay>
          <DsInfoDisplay detailOf="IFSC Code">{ifscCode}</DsInfoDisplay>
          <DsInfoDisplay detailOf="Branch">{bankBranch}</DsInfoDisplay>
        </div>,
        true
      );
    }, [bankAccNo, bankBranch, bankName, ifscCode]);

    useEffect(() => {
      setBankAccNo(customerDetails?.bank?.accountNumber ?? "");
      setBankName(customerDetails?.bank?.name ?? " ");
      setIfscCode(customerDetails?.bank?.ifscCode ?? " ");
      setBankBranch(customerDetails?.bank?.branchName ?? " ");
      setCustomerIdName(
        customerDetails?.code && customerDetails?.name
          ? `${customerDetails?.code} - ${customerDetails?.name}`
          : ""
      );
    }, [customerDetails]);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    // const divRef = useRef(null);

    // const handleMouseMove = (event) => {
    //   const rect = divRef.current.getBoundingClientRect(); // Get element position
    //   setMousePos({
    //     x: event.clientX - rect.left, // Mouse X relative to the div
    //     y: event.clientY - rect.top,  // Mouse Y relative to the div
    //   });
    // };

    useEffect(() => {
      if (customerIdName) {
        // console.log("custome id name : ", customerIdName);
        setInfoDetailsVisible(true);
      }
    }, [customerIdName]);

    return (
      <div className={styles.Customer}>
        <div className={styles.title}>Customer Details</div>
        <div className={styles.inputDetails}>
          {/* <div> */}
          {orderData?.status.toLowerCase() === DsStatus.DRFT.toLowerCase() ? (
            <CustomerSearch
              customer={customerIdName}
              updateOrderDataField={updateOrderDataField}
            />
          ) : (
            <DsTextField
              initialValue={`${orderData?.customer?.code} - ${orderData?.customer?.name}`}
              id={"customers-details"}
              className={""}
              // handleKeyUp={handleCustomerSearch}
              label="Customer ID & Name"
              placeholder="Search customer"
              disable={true}
            />
          )}
          {combinedOrders?.length > 0 ? (
            <>
              <PurchaseOrderNumber orders={combinedOrders} />
            </>
          ) : (
            <>
              <DsTextField
                initialValue={orderData?.purchaseOrderNumber}
                id="purchaseOrder"
                inputType="text"
                label={"Purchase order no (PO)"}
                disable={
                  orderData?.status.toLowerCase() ===
                  DsStatus.DRFT.toLowerCase()
                    ? false
                    : true
                }
                onChange={(e) => {
                  const value = e.target.value;
                  updateOrderDataField("purchaseOrderNumber", value);
                }}
              />
              {orderData?.purchaseOrderDate && (
                <DsDatePicker
                  label="Purchase order date"
                  id="purchaseorderDate"
                  placeholder={"dd-mm-yyyy"}
                  initialDate={convertStringToDateFormat(
                    orderData.purchaseOrderDate
                  )}
                  disable={
                    orderData?.status.toLowerCase() ===
                    DsStatus.DRFT.toLowerCase()
                      ? false
                      : true
                  }
                  setDateValue={(value) => {
                    if (typeof value !== "string") {
                      updateOrderDataField(
                        "purchaseOrderDate",
                        convertDateFormat(value)
                      );
                    } else {
                      updateOrderDataField("purchaseOrderDate", value);
                    }
                  }}
                />
              )}
              {!orderData?.purchaseOrderDate && (
                <DsDatePicker
                  label="Purchase order date"
                  id="purchaseorderDate"
                  placeholder={"dd-mm-yyyy"}
                  disable={
                    orderData?.status.toLowerCase() ===
                    DsStatus.DRFT.toLowerCase()
                      ? false
                      : true
                  }
                  setDateValue={(value) => {
                    // console.log("value = ", value);
                    if (typeof value !== "string") {
                      updateOrderDataField(
                        "purchaseOrderDate",
                        convertDateFormat(value)
                      );
                    } else {
                      updateOrderDataField("purchaseOrderDate", value);
                    }
                  }}
                />
              )}
              {/* <TextField inputType="date" initialValue={"1000"}></TextField> */}
              {/* </div> */}
              {/* <div>
                  <TextField
                    options={[]}
                    placeholder={"Ordered By"}
                    id={"orderedBy"}
                    dataListId="orderedByOption"
                    // handleOnChange={function ([]: any[]): void {}}
                  ></TextField>
                </div> */}
            </>
          )}
        </div>
        {infoDetailsVisible && (
          <div className={styles.details}>
            <div>
              <DsInfoDisplay detailOf="PAN">
                {customerDetails?.panNumber}
              </DsInfoDisplay>
              <DsInfoDisplay detailOf="GSTIN">
                {customerDetails?.gstInNumber}
              </DsInfoDisplay>
              <DsInfoDisplay detailOf="Drug Lic">
                <div
                  onMouseOver={(e) =>
                    displayContext(e, "drugLic", "vertical", "center")
                  }
                  onMouseOut={() => closeContext("drugLic")}
                >
                  {customerDetails?.drugLicenseNumber}
                </div>
              </DsInfoDisplay>
              <DsInfoDisplay detailOf="FDA Sch X Lic No">
                <div
                  onMouseOver={(e) =>
                    displayContext(e, "fdaLic", "vertical", "center")
                  }
                  onMouseOut={() => closeContext("fdaLic")}
                >
                  {customerDetails?.fdaLicenseNumber}
                </div>
              </DsInfoDisplay>
            </div>
            <div>
              <DsInfoDisplay detailOf="Food Lic No">
                <div
                  onMouseOver={(e) =>
                    displayContext(e, "foodLic", "vertical", "center")
                  }
                  onMouseOut={() => closeContext("foodLic")}
                >
                  {customerDetails?.fssaiLicenseNumber}
                </div>
              </DsInfoDisplay>
              <DsInfoDisplay detailOf="Bank account details">
                <div
                // ref={divRef}`
                // onMouseMove={handleMouseMove}
                >
                  <Image
                    src={BankDetailsSrc}
                    alt="Bank details"
                    onMouseOver={(e) =>
                      displayContext(e, "BankDetails", "top", "center")
                    }
                    onMouseMove={(e) => {
                      const bankdetailsId =
                        document.getElementById("BankDetails");
                      const mouseX = e.clientX;
                      const mouseY = e.clientY;

                      const boundingBox =
                        bankdetailsId?.getBoundingClientRect();
                      const MX = (
                        e.target as HTMLElement
                      ).getBoundingClientRect();
                      const targetY = MX.y;
                      const targetHeight = MX.height;

                      const x = boundingBox?.x;
                      const y = boundingBox?.y;
                      const width = boundingBox?.width;
                      const height = boundingBox?.height;

                      if (
                        targetY &&
                        targetHeight &&
                        x &&
                        y &&
                        width &&
                        height
                      ) {
                        const endHeight = targetY + targetHeight;
                        const endWidth = x + width;
                        if (
                          !(
                            x < mouseX &&
                            mouseX < endWidth &&
                            y < mouseY &&
                            mouseY < endHeight
                          )
                        ) {
                          setTimeout(() => closeContext("BankDetails"), 2);
                        }
                      }

                    
                    }}
                  ></Image>
                </div>
              </DsInfoDisplay>
              <DsInfoDisplay detailOf="Location">
                {customerDetails?.address && (
                  <DsLocation
                    id={customerDetails?.name?.toString() ?? ""}
                    location={customerDetails?.address}
                  />
                )}
              </DsInfoDisplay>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default CustomerDetails;
