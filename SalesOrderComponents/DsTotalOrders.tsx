/* eslint-disable react/display-name */
"use client";
import React, { useEffect, useState } from "react";
import Ds_SummaryCount from "@/Elements/DsComponents/DsSummaryCount/DsSummaryCount";
import { order, TotalOrdersProps } from "@/helpers/types";
import ContextMenu, {
  closeContext,
  createContext,
  displayContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import styles from "../app/page.module.css";
import { Tender } from "@/Common/helpers/types";

const DsTotalOrders: React.FC<TotalOrdersProps> = React.memo(({ data }) => {
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [formattedCounts, setformattedCounts] = useState<
    { status: string; value: string }[]
  >([]);

  useEffect(() => {

  }, []);

  useEffect(() => {
    if (Array.isArray(data)) {
      const netValues: Record<string, number> = {};

      data.forEach((order: order) => {
        const statusValue = order.status?.orderStatus ?? "Unknown";
        const netValue = Number(order.netAmount) || 0;
        netValues[statusValue] = (netValues[statusValue] || 0) + netValue;
      });

      const formattedValues = Object.entries(netValues).map(
        ([status, value]) => ({
          status: status,
          value: value.toLocaleString("en-IN"),
        })
      );

      const total = Object.entries(netValues)
        .map(([status, value]) => ({
          status: status,
          value: value,
        }))
        .reduce((sum, item) => sum + parseInt(item.value.toString()), 0)
        .toLocaleString("en-IN");
      setformattedCounts(formattedValues);
      setTotalOrders(totalOrders);
    }
  }, [data]);

  useEffect(() => {
    createContext(
      "TotalOrders",
      <Ds_SummaryCount
        title="Total Allocations"
        value={`${data?.length}`}
        statusValues={formattedCounts}
      />,
      true
    );
  }, [formattedCounts, data]);

    return (
    <div
      onMouseOver={(e) => {
        e.preventDefault();
        displayContext(e, "TotalValues", "vertical", "right");
      }}
      onMouseOut={() => {
        closeContext("TotalValues");
      }}
    >
      <DsInfoDisplay detailOf="Total Allocations" className={styles.totalorder}>
        {totalOrders}
      </DsInfoDisplay>
      <ContextMenu
        id={"TotalValues"}
        showArrow={false}
        content={
          <Ds_SummaryCount
            title="Total Allocations" Value={totalOrders.toLocaleString()}            // value={getFormatCurrency(Number(totalValue), "short", "IND")}
            // statusValues={formattedValues.map(item => ({ ...item, value: Number(item.value).toFixed(0) }))}
            statusValue={formattedCounts}
          />
        }
      />
    </div>
  );
});

DsTotalOrders.displayName = "DsTotalOrders";

export default DsTotalOrders;
//   return (
//     <div
//       onMouseOver={(e) => {
//         displayContext(e, "TotalOrders", "vertical", "center");
//       }}

//       onMouseOut={(e) => {
//         closeContext("TotalOrders")

//       }}
//     // onMouseOut={() => {
//     //   closeContext("TotalOrders");
//     // }}
//     >
//       <DsInfoDisplay
//         detailOf="Total Allocations"

//         className={styles.totalorder}
//       >{totalOrders}</DsInfoDisplay>
//        <ContextMenu
//         id={"TotalValues"}
//         showArrow={false}
//         content={
//           <Ds_SummaryCount
//             Title="Total Values"
//             value={getFormatCurrency(Number(totalValue), "short", "IND")}
//             // statusValues={formattedValues.map(item => ({ ...item, value: Number(item.value).toFixed(0) }))}
//             statusValue={formattedValues.map((item) => ({
//               ...item,
//               value: getFormatCurrency(Number(item.value), "short", "IND"),
//             }))}
//           />
//     </div>
    
//   );
// });
// export default DsTotalOrders;