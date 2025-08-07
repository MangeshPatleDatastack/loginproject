import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import DsTableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import { tcolumn, DsTableRow } from "@/helpers/types";
import { GSTs } from "../invoicePage";
import styles from "../invoicePage.module.css";
import { flushSync } from "react-dom";

export type InvoiceItems = {
  orderItemId: number;
  productCode: string;
  productName: string;
  HSN: string;
  quantity: number;
  D_Quantity: number;
  SNtype: string
  mfgBy: string;
  batchNo: string;
  mgfDate: string;
  expiryDate: string;
  mrpValue: number;
  PTR: number;
  PTS: number;
  dis_Amount: number;
  cd_Amount: number;
  IGST: number;
  CGST: number;
  SGST: number;
  taxableAmt: number;
  subDivision_Id: number;
  subDivision_Name: string;
};

export interface InvoiceItemsProps {
  invoiceItemDetails: InvoiceItems[];
  taxValues: Record<number, GSTs>;
  setTaxValues: Dispatch<SetStateAction<Record<number, GSTs>>>;

}

const DsInvoiceItemDetails: React.FC<InvoiceItemsProps> = React.memo(({ invoiceItemDetails, taxValues, setTaxValues }) => {
  //console.log("invoice item details = ", invoiceItemDetails)
  const taxV = useRef<Record<number, GSTs>>({});
  const itemIds = useRef<number[]>([]);
  // Define column headers using tcolumn class
  const columns: tcolumn[] = [
    { columnIndex: 1, columnHeader: "Prod Code" },
    { columnIndex: 2, columnHeader: "Product Name" },
    { columnIndex: 3, columnHeader: "HSN" },
    { columnIndex: 4, columnHeader: "Qty" },
    { columnIndex: 5, columnHeader: "D.Qty" },
    { columnIndex: 6, columnHeader: "S/N" },
    { columnIndex: 7, columnHeader: "Mfg. By" },
    { columnIndex: 8, columnHeader: "Batch No." },
    { columnIndex: 9, columnHeader: "Mfg" },
    { columnIndex: 10, columnHeader: "Expiry" },
    { columnIndex: 11, columnHeader: "MRP" },
    { columnIndex: 12, columnHeader: "PTR" },
    { columnIndex: 13, columnHeader: "PTS" },
    { columnIndex: 14, columnHeader: "Amt." },
    { columnIndex: 15, columnHeader: "D.Amt" },
    { columnIndex: 16, columnHeader: "CD.Amt" },
    { columnIndex: 17, columnHeader: "Taxab" },
    { columnIndex: 18, columnHeader: "GST" },
    { columnIndex: 19, columnHeader: "CGST" },
    { columnIndex: 20, columnHeader: "SGST" },
    { columnIndex: 21, columnHeader: "IGST" },
    { columnIndex: 22, columnHeader: "Inv. Val" },
  ];
  function formatDateToMonthYear(dateInput: string | Date): string {
    let date: Date;
    if (typeof dateInput === "string") {
      // Check if the date is in DD/MM/YYYY format
      const dateParts = dateInput.split("/");
      if (dateParts.length === 3) {
        const [day, month, year] = dateParts.map(Number); // Extract day, month, year
        date = new Date(year, month - 1, day); // Create a Date object (months are 0-indexed)
      } else {
        return "Invalid Date"; // Return if the format is incorrect
      }
    } else {
      date = new Date(dateInput); // If input is already a Date object
    }
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Pad month with leading zero
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year

    return `${month}/${year}`;
  }
  // Helper function to calculate financial values
  const calculateValues = (item: InvoiceItems) => {
    const quantity = item.quantity;
    const PTS = item.PTS;
    const cd_Amount = (item.cd_Amount);
    const DQuantity = (item.D_Quantity);
    const IGST = (item.IGST);
    const CGST = (item.CGST);
    const SGST = (item.SGST);
    // Calculate derived values
    const amount = quantity * PTS;
    const taxableAmt = amount - cd_Amount;
    const IGST_Val = (taxableAmt * IGST) / (100);
    const CGST_Val = (taxableAmt * CGST) / (100);
    const SGST_Val = (taxableAmt * SGST) / (100);
    const GST = IGST + CGST + SGST;
    const Inv_Val = taxableAmt + CGST_Val + SGST_Val + IGST_Val;
    const dis_Amount = amount * DQuantity;//
    flushSync(() => {

      if (!(itemIds?.current?.find((id) => id == item.orderItemId))) {
        if (!(taxV.current.hasOwnProperty(GST))) {

          // setTaxV((tax) => {
          //   tax[GST] = {
          //     IGST: [IGST_Val],
          //     CGST: [CGST_Val],
          //     SGST: [SGST_Val],
          //     taxableAmount: [taxableAmt],
          //   }
          //   return tax;
          // }

          // );
          taxV.current = {
            ...taxV.current, [GST]: {
              IGST: [IGST_Val],
              CGST: [CGST_Val],
              SGST: [SGST_Val],
              taxableAmount: [taxableAmt]
            }
          };
          itemIds.current = [...itemIds.current, item.orderItemId];

          //console.log("in taxvalue", taxV);
        }
        else {
          taxV.current = {

            ...(taxV.current), [GST]: {
              IGST: [...(taxV.current[GST].IGST), IGST_Val],
              CGST: [...(taxV.current[GST].CGST), CGST_Val],
              SGST: [...(taxV.current[GST].SGST), SGST_Val],
              taxableAmount: [...taxV.current[GST].taxableAmount, taxableAmt]
            }
          }
          itemIds.current = [...itemIds.current, item.orderItemId];


        }
        //console.log("not taxvalue", taxV);
      }
    })

    return { dis_Amount, taxableAmt, CGST_Val, SGST_Val, IGST_Val, Inv_Val, cd_Amount };
  };
  const groupBySubdivision = (data: InvoiceItems[]) => {
    const grouped = data.reduce((acc, item) => {
      const id = item.subDivision_Id;

      if (!acc[id]) {
        acc[id] = {
          subDivision_Name: item.subDivision_Name,
          rows: [],
          totals: { dis_Amount: 0, cd_Amount: 0, taxableAmt: 0, CGST: 0, SGST: 0, IGST: 0, Inv_Val: 0 },
        };
      }

      const { dis_Amount, taxableAmt, CGST_Val, SGST_Val, IGST_Val, Inv_Val, cd_Amount } = calculateValues(item);

      // Add individual row
      acc[id].rows.push({
        ...item,
        dis_Amount,
        taxableAmt,
        CGST_Val,
        SGST_Val,
        IGST_Val,
        Inv_Val,
      });

      // Update group totals
      acc[id].totals.dis_Amount += dis_Amount;
      acc[id].totals.cd_Amount += cd_Amount;
      acc[id].totals.taxableAmt += taxableAmt;
      acc[id].totals.CGST += CGST_Val;
      acc[id].totals.SGST += SGST_Val;
      acc[id].totals.IGST += IGST_Val;
      acc[id].totals.Inv_Val += taxableAmt + CGST_Val + SGST_Val + IGST_Val; // Aggregate Inv_Val for the group

      return acc;
    }, {} as Record<string, any>);
    return Object.values(grouped);
  };

  const [rows, setRows] = useState<DsTableRow[]>([]);
  useEffect(() => {
    const groupedData = groupBySubdivision(invoiceItemDetails);
    const trows: DsTableRow[] = [];
    let latestGroupIndex = 0;
    groupedData.forEach((group) => {
      // Add rows for each group
      group.rows.forEach((item: InvoiceItems, index: number) => {
        const amount = ((item.quantity) * (item.PTS)).toFixed(2);
        const taxableVAlue = (
          (item.quantity) * (item.PTS) -
          (item.cd_Amount)
        ).toFixed(2);
        const cgstValue = (((item.CGST) / 100) * ((item.taxableAmt))).toFixed(2);
        const sgstValue = (((item.SGST) / 100) * ((item.taxableAmt))).toFixed(2);
        const igstValue = (((item.IGST) / 100) * ((item.taxableAmt))).toFixed(2);
        const invVAlue = (((item.taxableAmt) + parseFloat(cgstValue) + parseFloat(sgstValue) + parseFloat(igstValue))).toFixed(2);
        const gstValue = (item.CGST + item.SGST + item.IGST).toFixed(2);
        //console.log("item = ", item)
        trows.push({

          rowIndex: latestGroupIndex + index,
          content: [
            { columnIndex: 1, content: item.productCode },
            { columnIndex: 2, content: item.productName },
            { columnIndex: 3, content: item.HSN },
            { columnIndex: 4, content: item.quantity },
            { columnIndex: 5, content: item.D_Quantity },
            { columnIndex: 6, content: item.SNtype },
            { columnIndex: 7, content: item.mfgBy },
            { columnIndex: 8, content: item.batchNo },
            { columnIndex: 9, content: formatDateToMonthYear(item.mgfDate) },
            { columnIndex: 10, content: formatDateToMonthYear(item.expiryDate) },
            { columnIndex: 11, content: item.mrpValue },
            { columnIndex: 12, content: item.PTR },
            { columnIndex: 13, content: (item.PTS) },
            { columnIndex: 14, content: amount },
            { columnIndex: 15, content: (item.dis_Amount) },
            { columnIndex: 16, content: (item.cd_Amount) },
            {
              columnIndex: 17,
              content: taxableVAlue,
            },
            { columnIndex: 18, content: gstValue },
            {
              columnIndex: 19,
              content: cgstValue,
            },
            {
              columnIndex: 20,
              content: sgstValue,
            },
            {
              columnIndex: 21,
              content: igstValue,
            },
            { columnIndex: 22, content: invVAlue },
          ],
        });
      });

      // Add totals row for the group
      trows.push({
        rowIndex: latestGroupIndex + group.rows.length,
        className: (styles.border),
        content: [
          { columnIndex: 1, content: `Total of ${group.subDivision_Name}`, colSpan: 14, className: (styles.totalTax) },
          { columnIndex: 2, content: group.totals.dis_Amount.toFixed(2), colSpan: 1 },
          { columnIndex: 3, content: group.totals.cd_Amount.toFixed(2), colSpan: 1 },
          { columnIndex: 4, content: group.totals.taxableAmt.toFixed(2), colSpan: 2, className: (styles.taxCol) },
          { columnIndex: 5, content: group.totals.CGST.toFixed(2), colSpan: 1 },
          { columnIndex: 6, content: group.totals.SGST.toFixed(2), colSpan: 1 },
          { columnIndex: 7, content: group.totals.IGST.toFixed(2), colSpan: 1 },
          { columnIndex: 8, content: group.totals.Inv_Val.toFixed(2), colSpan: 1 },
        ],
      });
      latestGroupIndex = latestGroupIndex + group.rows.length + 1;
    });
    setRows(trows);
  }, [invoiceItemDetails]);
  useEffect(() => {
    setTaxValues({ ...(taxV.current) })

  }, [taxV.current])
  //console.log("tax distribution:", taxValues);
  return (
    <DsTableComponent
      className={styles.invItems}
      id={"invItems"}
      type="NonInterActive"
      columns={columns}
      rows={rows}
      isFooterRequired={false}
    ></DsTableComponent>
  );
});

export default DsInvoiceItemDetails;

