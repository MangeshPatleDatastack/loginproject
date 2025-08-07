import React from "react";
import styles from "../invoicePage.module.css"
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import Image from "next/image";
import phoneCallIcon from "@/Common/SalesIcons/smallIcons/phonecall.svg";
import buttonStyles from "../../../../Elements/DsComponents/DsButtons/dsButton.module.css";
import locationIcon from "@/Common/SalesIcons/smallIcons/Address_location.svg";

export type InvoiceToData = {
  invoiceId: string,
  customerId: string;
  customerName: string;
  address: string;
  phno: string;
  gstin: string;
  panNumber: string;
  drugLic: string;
  foodLic: string;
  fdaLic: string;
  bankName: string;
  accNumber: string;
  ifscNumber: string;
  branchName: string;
  pinCode: string;
};
export interface InvoiceToProps {
  invoiceToCustomer: InvoiceToData;
}
const DsInvoiceTo: React.FC<InvoiceToProps> = React.memo(({ invoiceToCustomer }) => {

  return (<>
    <div>
      <div className={styles.invoice}>
        <h2>INVOICE -{invoiceToCustomer.invoiceId}</h2>
      </div>
      <div className={styles.container}>
        <div>
          <p style={{ fontSize: "1.4rem" }}>To</p>
          <h3 style={{ fontSize: "2.4rem" }}>{invoiceToCustomer.customerId} - {invoiceToCustomer.customerName}</h3>
          <div className={styles.separate}>
            <DsInfoDisplay detailOf="GSTIN" >{invoiceToCustomer.gstin}</DsInfoDisplay>
          </div>
        </div>
        <div>
          {" "}
          <DsInfoDisplay
            startIcon={<Image src={locationIcon} alt="icon" />}
            style="normal"
          >
            {invoiceToCustomer.address}
          </DsInfoDisplay>
          <DsInfoDisplay
            startIcon={<Image src={phoneCallIcon} alt="icon" />}
            style="normal"
          >
            {invoiceToCustomer.phno}
          </DsInfoDisplay>
        </div>
      </div>
      <div className={styles.invoice_details}>
        <DsInfoDisplay detailOf="PAN" style="normal">
          {invoiceToCustomer.panNumber}
        </DsInfoDisplay>
        <div className={buttonStyles.right_separator}></div>
        <DsInfoDisplay detailOf="Drug Lic">{invoiceToCustomer.drugLic}</DsInfoDisplay>
        <div className={buttonStyles.right_separator}></div>
        <DsInfoDisplay detailOf="FDA Sch. X Lic No">{invoiceToCustomer.fdaLic}</DsInfoDisplay>
        <div className={buttonStyles.right_separator}></div>
        <DsInfoDisplay detailOf="Food Lic No">{invoiceToCustomer.foodLic}</DsInfoDisplay>
      </div>
      <div className={styles.bottom}>
        <p className={styles.bankName}>
          {`${invoiceToCustomer.bankName} - ${invoiceToCustomer.accNumber} - ${invoiceToCustomer.branchName} _ _ _ _ _ _ ${invoiceToCustomer.branchName} - ${invoiceToCustomer.pinCode}`.toUpperCase()}
        </p>
      </div>
    </div>
  </>);
});
export default DsInvoiceTo;