import React from "react";
import styles from "../invoicePage.module.css";
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import Image from "next/image";
import ipca from "@/Common/SalesIcons/mediumIcons/Ipca.svg";
import locationIcon from "@/Common/SalesIcons/smallIcons/Address_location.svg";
import gmail from "@/Common/SalesIcons/smallIcons/gmail.svg";
import phoneCallIcon from "@/Common/SalesIcons/smallIcons/phonecall.svg";
import buttonStyles from "../../../../Elements/DsComponents/DsButtons/dsButton.module.css";


export type InvoiceFromData = {
  companyName: string;
  cin: string;
  gstin: string;
  address: string;
  email: string;
  mobile: string;
  pNo: string;
  drugLic: string;
  foodLic: string;
  fdaLic: string;
}
export interface InvoiceFromProps {
  invoiceData: InvoiceFromData;
}
const InvoiceFrom: React.FC<InvoiceFromProps> = React.memo(({ invoiceData }) => {

  return (
    <div>
      <div className={styles.container}>
        <div>
          <Image className={styles.ipca} alt={"Ipca Logo"} src={ipca} />
          <h3 className={styles.company}>{invoiceData.companyName}</h3>
          <div className={styles.separate}>
            <DsInfoDisplay detailOf="CIN">{invoiceData.cin}</DsInfoDisplay>
            <DsInfoDisplay detailOf="GSTIN">{invoiceData.gstin}</DsInfoDisplay>
          </div>
          <div className={styles.head_menu}>
            <DsInfoDisplay
              startIcon={<Image src={locationIcon} alt="icon" />}
              style="normal"
            >
              {invoiceData.address}
            </DsInfoDisplay>
            <DsInfoDisplay startIcon={<Image src={gmail} alt="icon" />} style="normal">
              {invoiceData.email}
            </DsInfoDisplay>
            <DsInfoDisplay
              startIcon={<Image src={phoneCallIcon} alt="icon" />}
              style="normal"
            >
              {invoiceData.mobile}
            </DsInfoDisplay>
          </div>
        </div>
        <div className={styles.scanner}></div>
      </div>
      <div className={styles.invoice_details}>
        <DsInfoDisplay detailOf="P No">{invoiceData.pNo}</DsInfoDisplay>
        <div className={buttonStyles.right_separator}></div>
        <DsInfoDisplay detailOf="Drug Lic">{invoiceData.drugLic}</DsInfoDisplay>
        <div className={buttonStyles.right_separator}></div>
        <DsInfoDisplay detailOf="Food Lic No" style="normal">
          {invoiceData.foodLic}
        </DsInfoDisplay>
        <div className={buttonStyles.right_separator}></div>
        <DsInfoDisplay detailOf="FDA Sch. X Lic No">{invoiceData.fdaLic}</DsInfoDisplay>
      </div>
    </div>

  );
});
export default InvoiceFrom;