/* eslint-disable react/display-name */
"use client";
import React, { useEffect, useState } from "react";
import Ds_SummaryCount from "@/Elements/DsComponents/DsSummaryCount/DsSummaryCount";
import { order, TotalValuesProps } from "@/helpers/types";
import {
  closeContext,
  createContext,
  displayContext,
} from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import styles from "../app/page.module.css";

const DsTotalValues: React.FC<TotalValuesProps> = React.memo(({ data }) => {
  const [totalValue, setTotalValue] = useState<string>("0");
  const [formattedValues, setformattedValues] = useState<
    { status: string; value: string }[]
  >([]);

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
      setformattedValues(formattedValues);
      setTotalValue(total);
    }
  }, [data]);
  useEffect(() => {
    createContext(
      "TotalValues",
      <Ds_SummaryCount
        Title="Total Allocations"
        Value={`₹${totalValue}`}
        statusValues={formattedValues}
      />,
      true
    );
  }, [totalValue, formattedValues]);

  //console.log("total values", data);
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
      <DsInfoDisplay detailOf="Total Values (₹)" className={styles.totalorder}>
        {totalValue}
      </DsInfoDisplay>
    </div>
  );
});
export default DsTotalValues;
