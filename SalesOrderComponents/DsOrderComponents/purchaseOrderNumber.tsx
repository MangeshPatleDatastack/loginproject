/* eslint-disable react/display-name */
import { useEffect } from "react";
import {
  closeContext,
  createContext,
  displayContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import { combinedOrder } from "@/helpers/types";
import { formatDate } from "@/helpers/Method/tableOperations";
import styles from "../../app/Order/order.module.css";
import React from "react";


export interface purchaseOrderNumberProps {
  orders?: combinedOrder[];
}

const PurchaseOrderNumber: React.FC<purchaseOrderNumberProps> = React.memo(({
  orders,
}) => {
  useEffect(() => {
    closeContext("purchase-orders");
    createContext(
      "purchase-orders",
      <>
        <div style={{ width: "fit-content" }}>
          {orders?.map((order) => (
            <div key={order?.orderId} className={styles["purchase-order"]}>
              <span>{`Ord${order?.orderId}`}</span>{" "}
              <span>
                {formatDate(new Date(order?.purchaseOrderDate ?? ""))}
              </span>
            </div>
          ))}
        </div>
      </>,
      true
    );
  }, [orders]);

  return (
    <>
      <div>
        <div>Purchase order no (PO) & Date</div>
        <div
          className={styles["purchase-order-no"]}
          onMouseOver={(e) =>
            displayContext(e, "purchase-orders", "vertical", "center")
          }
          onMouseOut={() => closeContext("purchase-orders")}
        >
          {orders?.length}
        </div>
      </div>
    </>
  );
});

export default PurchaseOrderNumber;
