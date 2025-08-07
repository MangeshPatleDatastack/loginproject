import React from "react";
import styles from "../invoicePage.module.css";
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";

export type EwayDetails = {
    transporter: string;
    numberOfCases: string;
    LrNumber: string;
    LrDate: string;
    VehicalNo: string;
    EwayBillNo: string;
    taxInvoice: string;
    taxInvoiveDate: string;
    dueDate: string;
    IrnNumber: string;
    AckNumber: string;
    AckDate: string;
}
export interface EwayProps {
    ewaydetails: EwayDetails;
}
const DsEwayDetails: React.FC<EwayProps> = React.memo(({ ewaydetails }) => {

    return (
        <>
            <div className={styles.container}>
                {/*  */}
                <div className={styles.box}>
                    <div className={styles.separate}>
                        <DsInfoDisplay detailOf="Transporter">{ewaydetails.transporter}</DsInfoDisplay>
                        <DsInfoDisplay detailOf="Number of Cases"></DsInfoDisplay>
                    </div>
                    <div className={styles.separate}>
                        <DsInfoDisplay detailOf="LR Number">{ewaydetails.LrNumber}</DsInfoDisplay>
                        <DsInfoDisplay detailOf="LR Date">{ewaydetails.LrDate}</DsInfoDisplay>
                    </div>
                    <div className={styles.separate}>
                        <DsInfoDisplay detailOf="Vehical No">{ewaydetails.VehicalNo}</DsInfoDisplay>
                    </div>
                    <div className={styles.boxbottom}>
                        <DsInfoDisplay detailOf="E Way Bill No">{ewaydetails.EwayBillNo}</DsInfoDisplay>
                        <DsInfoDisplay detailOf="E Way Bill No">{ewaydetails.EwayBillNo}</DsInfoDisplay>
                    </div></div>
                <div className={styles.box}>
                    <div className={styles.boxtop}>
                        <DsInfoDisplay
                            detailOf="Subject To ________JURISDICTION(Under RULE 46 of CGST Rules, 2017)"
                            style="normal"
                        ></DsInfoDisplay>
                    </div>
                    <div className={styles.separate}>
                        <DsInfoDisplay
                            detailOf="GST Invoice For Supply of Goods"
                            style="normal"
                        ></DsInfoDisplay>
                    </div>
                    <div className={styles.separate}>
                        <DsInfoDisplay detailOf="Tax Invoice">{ewaydetails.taxInvoice}</DsInfoDisplay>
                        <DsInfoDisplay detailOf="Tax Invoice Date">{ewaydetails.taxInvoiveDate}</DsInfoDisplay>
                    </div>
                    <div className={styles.separate}>
                        <DsInfoDisplay detailOf="Due Date">{ewaydetails.dueDate}</DsInfoDisplay>
                    </div>
                </div>
            </div>
            <div className={styles.invoice_details}>
                <DsInfoDisplay detailOf="IRN No">{ewaydetails.IrnNumber}</DsInfoDisplay>
                <DsInfoDisplay detailOf="ACK No">{ewaydetails.AckNumber}</DsInfoDisplay>
                <DsInfoDisplay detailOf="ACK Date">{ewaydetails.AckDate}</DsInfoDisplay>
            </div>
        </>);
});
export default DsEwayDetails;