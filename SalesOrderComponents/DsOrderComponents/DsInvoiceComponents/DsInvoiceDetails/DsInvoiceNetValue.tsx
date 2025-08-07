import React from "react";
import styles from "../invoicePage.module.css";


export interface InvoiceNetValueProps {
  tdsFlag: boolean; // Add the flag as a prop
  taxableValue: number;
  totalNetAmount: number;
}

const DsInvoiceNetValue: React.FC<InvoiceNetValueProps> = React.memo(({ tdsFlag, taxableValue, totalNetAmount }) => {

  const tdsVal = (taxableValue * 0.1) / 100;
  const payableAmt = totalNetAmount - tdsVal;
  if (!tdsFlag) {
    return null;
  }
  return (
    <>
      <div className={`${styles.invoiceNetValueContainer}`}>
        <div className={`${styles.row1} ${styles.total}`}>
          <span className={styles.label}>Net Amount as per Invoice:</span>
          <span className={`${styles.value}`}>{totalNetAmount.toFixed(2)}</span>
        </div>
        <div className={`${styles.row1} ${styles.total}`}>
          <span className={styles.label}>Less TDS@ 0.1% on Rs.{taxableValue}</span>
          <span className={`${styles.value}`}>{tdsVal.toFixed(2)}</span>
        </div>
        <div className={`${styles.row1} ${styles.total}`}>
          <span className={styles.label}>Net Amount Payable</span>
          <span className={`${styles.value}`}>{payableAmt.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
});

export default DsInvoiceNetValue;
