import React from "react";
import styles from "../invoicePage.module.css";
import { InvoiceItems } from "./DsInvoiceItemDetails";

export interface InvoiceItemsProps {
  invoiceItemDetails: InvoiceItems[];
}
const DsInvoiceFooter: React.FC<InvoiceItemsProps> = React.memo(({ invoiceItemDetails }) => {

  const calculateTotalRR = () => {
    return invoiceItemDetails.reduce((total, item) => {
      const qty = item.quantity; // Ensure quantity is a number
      const ptr = item.PTR; // Ensure PTR is a number
      return total + qty * ptr;
    }, 0);
  };
  const totalRRValue = calculateTotalRR();
  return (
    <>
      <hr></hr>
      <div className={styles.last_div}>
        <div className={`${styles.row1} ${styles.total}`}>
          <span className={styles.label}>Note:</span>
          <span className={`${styles.value}`}>Interest will be charged @ 24% p.a if drawee fails to pay by due date.</span>
        </div>
        <div>
          <span className={styles.label}>RR Value Rs.{totalRRValue.toFixed(2)}</span>
        </div>
        <div className={`${styles.row1} ${styles.total}`}>
          <span className={styles.label}>For IPCA Laboratories Limited</span>
        </div>
      </div>
      <div className={styles.auth}>
        <p>(Authorised Signatory)</p>
      </div >
    </>
  );
});
export default DsInvoiceFooter;