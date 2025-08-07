
import { DsTableRow, tcolumn } from "@/helpers/types";
import { GSTs } from "../invoicePage";
import { useEffect } from "react";
import DsTableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import React from "react";

export interface taxDistributionProps {
  taxValues: Record<number, GSTs>;
  setTaxableValue: (value: number) => void;
  setTotalTax: (value: number) => void;
}

const DsTaxDistribution: React.FC<taxDistributionProps> = React.memo(({ taxValues, setTaxableValue, setTotalTax }) => {
  const columns: tcolumn[] = [
    { columnIndex: 1, columnHeader: "Tax Per" },
    { columnIndex: 2, columnHeader: "Taxable Value" },
    { columnIndex: 3, columnHeader: "ISGT" },
    { columnIndex: 4, columnHeader: "CGST" },
    { columnIndex: 5, columnHeader: "SGST" },
    { columnIndex: 6, columnHeader: "Total Tax" },
  ];

  const rows: DsTableRow[] = Object.entries(taxValues).map(([key, value], rowIndex) => ({
    rowIndex: rowIndex + 1,
    content: [
      { columnIndex: 1, content: key },
      { columnIndex: 2, content: value.taxableAmount.reduce((acc, num) => acc + num, 0).toFixed(2) },
      { columnIndex: 3, content: value.IGST.reduce((acc, num) => acc + num, 0).toFixed(2) },
      { columnIndex: 4, content: value.CGST.reduce((acc, num) => acc + num, 0).toFixed(2) },
      { columnIndex: 5, content: value.SGST.reduce((acc, num) => acc + num, 0).toFixed(2) },
      { columnIndex: 6, content: (value.IGST.reduce((acc, num) => acc + num, 0) + value.CGST.reduce((acc, num) => acc + num, 0) + value.SGST.reduce((acc, num) => acc + num, 0)).toFixed(2) },
    ],
  }));

  // Calculate totals for each column
  const calculateTotal = (taxValues: Record<number, GSTs>, key: keyof GSTs): number => {
    return Object.values(taxValues).reduce(
      (sum, value) => sum + value[key].reduce((a, b) => a + b, 0),
      0
    );
  };

  const totalTaxableValue = calculateTotal(taxValues, "taxableAmount");
  const totalIGST = calculateTotal(taxValues, "IGST");
  const totalCGST = calculateTotal(taxValues, "CGST");
  const totalSGST = calculateTotal(taxValues, "SGST");
  const totalTax = totalIGST + totalCGST + totalSGST;
  // const totalTaxableValue = Object.values(taxValues).reduce(
  //   (sum, value) => sum + value.taxableAmount.reduce((a, b) => a + b, 0),
  //   0
  // );
  // const totalTax = Object.values(taxValues).reduce(
  //   (sum, value) => sum + value.IGST.reduce((a, b) => a + b, 0) + value.CGST.reduce((a, b) => a + b, 0) + value.SGST.reduce((a, b) => a + b, 0),
  //   0
  // );

  rows.push({
    rowIndex: rows.length + 1,
    content: [
      { columnIndex: 1, content: "" },
      { columnIndex: 2, content: totalTaxableValue.toFixed(2) },
      { columnIndex: 3, content: totalIGST.toFixed(2) },
      { columnIndex: 4, content: totalCGST.toFixed(2) },
      { columnIndex: 5, content: totalSGST.toFixed(2) },
      { columnIndex: 6, content: totalTax.toFixed(2) },
    ],
  });

  rows.push({
    rowIndex: rows.length + 1,
    content: [
      {
        columnIndex: 1,
        content:
          "Certified that the particulars given above are true & correct and the amount indicated above represent the price actually charged and that there is no additional consideration flowing directly or indirectly for such cases from the buyer.",
        colSpan: 6,

      },
    ],
  });
  // Update the parent component with the total values
  useEffect(() => {
    setTaxableValue(totalTaxableValue);
    setTotalTax(totalTax);
  }, [totalTaxableValue, totalTax, setTaxableValue, setTotalTax]);
  return (
    <>
      <DsTableComponent
        className={" "}
        id={" "}
        type="NonInterActive"
        columns={columns}
        rows={rows}
        isFooterRequired={false}
      ></DsTableComponent>
    </>
  );
});

export default DsTaxDistribution;

