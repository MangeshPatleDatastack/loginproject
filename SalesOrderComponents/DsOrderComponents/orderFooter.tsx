// import { DsStatus } from "@/helpers/constant";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
import DsSplitButton from "@/Elements/DsComponents/DsButtons/dsSplitButton";
import styles from "@/app/Order/order.module.css";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { OrderData, useOrderData } from "./OrderContextProvider";
import { dsStatus } from "@/helpers/constant";
import {
  createContext,
  displayContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { useRouter } from "next/navigation";
interface orderFooterProps {
  viewInvoice?: () => void;
  orderData: OrderData | null;
  originalData: OrderData | null | undefined;
  saveOrder?: (status: dsStatus) => Promise<void>;
  updateOrder?: () => Promise<void>;
  submitOrder?: () => Promise<void>;
}

// eslint-disable-next-line react/display-name
const OrderFooter: React.FC<orderFooterProps> = React.memo(
  ({ viewInvoice, orderData, saveOrder, updateOrder, submitOrder }) => {
    const signOrderVisible = useSelector(
      (state: any) => state.permissions["signOrderVisible"]
    );
    const signInvoiceVisible = useSelector(
      (state: any) => state.permissions["signInvoiceVisible"]
    );
    const saveButtonVisible = useSelector(
      (state: any) => state.permissions["saveButtonVisible"]
    );
    const viewInvoiceVisible = useSelector(
      (state: any) => state.permissions["viewInvoiceVisible"]
    );

    useEffect(() => {
      createContext(
        "approvals",
        <DsButton
          label="Submit"
          buttonViewStyle="btnText"
          className={styles.approveBtn}
          onClick={() => {
            if (submitOrder) submitOrder();
            setTimeout(() => {
              goBack();
            }, 20);
          }}
        ></DsButton>,
        true
      );
    }, [submitOrder]);

    const router = useRouter();

    const goBack = () => {
      router.back();
    };

    return (
      <>
        <div className={styles.footer}>
          <DsButton
            buttonSize="btnLarge"
            buttonColor="btnDark"
            onClick={goBack}
          >
            Close
          </DsButton>

          {signOrderVisible && ( // order === "TRADE" &&
            <DsButton>Sign Order</DsButton>
          )}

          {signInvoiceVisible && (
            // order === "INSTITUTIONAL" &&
            <DsButton>Sign Invoice</DsButton>
          )}

          {true && (
            <DsSplitButton
              buttonViewStyle="btnContained"
              onClick={() => {
                if (orderData?.id && updateOrder) {
                  updateOrder();
                } else {
                  if (saveOrder) saveOrder("Draft");
                }
              }}
              onSplitClick={(e) =>
                displayContext(e, "approvals", "vertical", "right")
              }
              disable={
                orderData &&
                orderData.customerId &&
                orderData.customerId !== 0 &&
                orderData.orderItems &&
                orderData.orderItems.length > 0 &&
                [...orderData.orderItems].filter(
                  (x) =>
                    !(
                      x.requestedExpiryInDays >29 &&
                      x.requestedExpiryInDays < 181
                    )
                ).length == 0 &&
                orderData.billToAddressId !== 0 &&
                orderData.shipToAddressId !== 0 &&
                orderData.purchaseOrderDate !== "" &&
                orderData.purchaseOrderNumber !== ""
                  ? false
                  : true
              }
              // disable={orderStatus === DsStatus.CNCL ? true : false}
            >
              Save
            </DsSplitButton>
          )}

          {viewInvoiceVisible && (
            <DsButton buttonViewStyle="btnContained" onClick={viewInvoice}>
              View Invoice
            </DsButton>
          )}
        </div>
      </>
    );
  }
);

export default OrderFooter;
