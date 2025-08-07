"use client";
import React, { useEffect, useState } from "react";
import styles from "./invoicePage.module.css"
import DsInvoiceItemDetails, { InvoiceItems } from "./DsInvoiceDetails/DsInvoiceItemDetails";
import DsTaxDistribution from "./DsInvoiceDetails/DsTaxDistribution";
import { adjustmentItems } from "./DsInvoiceDetails/DsAdjustmentDetails";
import InvoiceFrom, { InvoiceFromData } from "./DsInvoiceDetails/DsInvoiceFrom";
import Footer from "../DsInvoiceComponents/DsBillFooter";
import DsInvoiceTo from "./DsInvoiceDetails/DsInvoiceTo";
import DsInvoiceFooter from "./DsInvoiceDetails/DsInvoiceFooter";
import DsInvoiceNetValue from "./DsInvoiceDetails/DsInvoiceNetValue";
import DsEwayDetails, { EwayDetails } from "./DsInvoiceDetails/DsEwayDetails";
import DsInvoiceCalculations from "../DsInvoiceComponents/DsInvoiceDetails/DsInvoiceCalculations";
import DsAdjustmentDetails from "./DsInvoiceDetails/DsAdjustmentDetails";
import { ToWords } from 'to-words'
import DsInvoiceTieup, { tieUpItems } from "./DsInvoiceDetails/DsInvoiceTieup";
import fetchData from "@/helpers/Method/fetchData";
import { getInvoiceById } from "@/helpers/constant";
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";

export type GSTs = {
  IGST: number[];
  CGST: number[];
  SGST: number[];
  taxableAmount: number[];
}
export type Tax = {
  taxableValue: number;
  totaltax: number;
}
// eslint-disable-next-line react/display-name
const Invoice: React.FC = React.memo(() => {
  const [taxValues, setTaxValues] = useState<Record<number, GSTs>>({})
  const [tableData, setTableData] = useState<any>([]);
  const [invoiceItemDetails, setInvoiceDetails] = useState<InvoiceItems[]>([]);
  const [adjustmentDetails, setAdjustmentDetails] = useState<adjustmentItems[]>([]);
  const [tieupDetails, setTieupDetails] = useState<tieUpItems[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [taxableValue, setTaxableValue] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalNetAmount, setTotalNetAmount] = useState(0);


  const handleFetch = async () => {
    await fetchData({ url: getInvoiceById }).then((res) => {
      //console.log("invoice = ", res);
      if ((res.code == 200)) {
        setTableData(res.result);
      }
    });
  }
  const calculateNetWords = () => {
    const toWords = new ToWords();
    const words = toWords.convert(totalNetAmount, { currency: true });
    //console.log("In words:", words);
    return words;
  };
  const rupees = calculateNetWords();
  useEffect(() => {
    handleFetch();
  }, []);
  //console.log("result = ", tableData);

  const address = `${tableData?.supplier?.address?.id} ${tableData?.supplier?.address?.name} ${tableData?.supplier?.address?.address1} ${tableData?.supplier?.address?.address2} ${tableData?.supplier?.address?.address3} ${tableData?.supplier?.address?.state} ${tableData?.supplier?.address?.pinCode}  `;
  const mobile = `${tableData?.supplier?.phoneNumber[0]} ${tableData?.supplier?.phoneNumber[1]} ${tableData?.supplier?.phoneNumber[2]}`;
  const customer_address = `${tableData?.customer?.address?.id} ${tableData?.customer?.address?.name} ${tableData?.customer?.address?.address1} ${tableData?.customer?.address?.address2} ${tableData?.customer?.address?.address3} ${tableData?.customer?.address?.state} ${tableData?.customer?.address?.pinCode}  `;
  const customer_mobile = `${tableData?.customer?.phoneNumber[0]} ${tableData?.customer?.phoneNumber[1]} `;
  const invoiceFromDetails: InvoiceFromData = { companyName: tableData?.supplier?.name?.toString() ?? "", cin: tableData?.supplier?.cinNumber?.toString() ?? "", gstin: tableData?.supplier?.gstNumber?.toString() ?? "", address: address, email: tableData?.supplier?.email, mobile: mobile, pNo: tableData?.supplier?.panNumber, drugLic: tableData?.supplier?.drugLicenceNumber, foodLic: tableData?.supplier?.foodLicenceNumber, fdaLic: tableData?.supplier?.fdsaLicenceNumber }
  const invoiceToDetails = {
    invoiceId: tableData?.invoiceId,
    customerId: tableData?.customer?.id,
    customerName: tableData?.customer?.name,
    address: customer_address,
    phno: customer_mobile,
    gstin: tableData?.customer?.gstNumber,
    panNumber: tableData?.customer?.panNumber,
    drugLic: tableData?.customer?.drugLicenceNumber,
    foodLic: tableData?.customer?.fssaiLicenceNumber,
    fdaLic: tableData?.customer?.fdsaLicenceNumber,
    bankName: tableData?.customer?.bank?.name,
    accNumber: tableData?.customer?.bank?.accountNumber,
    ifscNumber: tableData?.customer?.bank?.ifscCode,
    branchName: tableData?.customer?.bank?.branchName,
    pinCode: tableData?.customer?.bank?.pinCode
  };
  const ewayDetails: EwayDetails = {
    transporter: tableData?.eWayBIll?.partB?.transpoter?.name,
    numberOfCases: tableData?.eWayBIll?.partB?.transpoter?.NumberOfCases,
    LrNumber: tableData?.eWayBIll?.partB?.transpoter?.LRNumber,
    LrDate: tableData?.eWayBIll?.partB?.transpoter?.LRDate,
    VehicalNo: tableData?.eWayBIll?.partB?.transpoter?.vehicleNumber,
    EwayBillNo: "",
    taxInvoice: tableData?.invoiceId,
    taxInvoiveDate: tableData?.taxInvoiceDate,
    dueDate: tableData?.dueDate,
    IrnNumber: tableData?.eWayBIll?.partA?.irnnumber,
    AckNumber: tableData?.eWayBIll?.partA?.acknoladgenumber,
    AckDate: tableData?.eWayBIll?.partA?.ackdate
  };
  useEffect(() => {
    setAdjustmentDetails(tableData?.adjustmentDetails?.map((adjust: any) => ({
      type: adjust?.type,
      docNumber: adjust?.docNumber,
      docDate: adjust?.docDate,
      amount: adjust?.amount
    })
    ) || [])
  }, [tableData]);
  useEffect(() => {
    setInvoiceDetails(tableData?.orderItems?.map((item: any) => ({
      orderItemId: item?.orderItemId,
      productCode: item?.productCode,
      productName: item?.productName,
      HSN: item?.hsnCode,
      quantity: item?.Quantity,
      D_Quantity: item?.dispachQuantity,
      SNtype: item?.isScheduled,
      mfgBy: item?.manufacturedBy,
      batchNo: item?.batchNumber,
      mgfDate: item?.manufacturedDate,
      expiryDate: item?.expiry,
      mrpValue: item?.mrp,
      PTR: item?.ptr,
      PTS: item?.pts,
      amount: 0,
      dis_Amount: item?.discountPercentage,
      cd_Amount: item?.cash_discountPercentage,
      taxableAmt: 0,
      IGST: item?.igstPercentage,
      CGST: item?.cgstPercentage,
      SGST: item?.sgstPercentage,
      Inv_Val: 0,
      subDivision_Id: item?.subdivisionId,
      subDivision_Name: item?.subdivisionName,
    })) || [])
  }, [tableData]);
  useEffect(() => {
    setTieupDetails(tableData?.tieupItems?.map((tieup: any) => ({
      id: tieup?.id,
      quantity: tieup?.quantity,
      name: tieup?.name,
      date: tieup?.date,
      amount: tieup?.amount
    })
    ) || [])
  }, [tableData]);

  //console.log("Invoice Page", rupees);
  return (
    <>
      <div className={styles.page}>
        <InvoiceFrom invoiceData={invoiceFromDetails} />
        <DsInvoiceTo invoiceToCustomer={invoiceToDetails} />
        <DsEwayDetails ewaydetails={ewayDetails} />
        <div className={styles.invItems}>
          <DsInvoiceItemDetails invoiceItemDetails={invoiceItemDetails} taxValues={taxValues} setTaxValues={setTaxValues} />
        </div>
        <hr></hr>
        <div className={styles.last_table}>
          <div className={styles.tabledata_2}>
            <div className={styles.size}>
              <div>
                <DsTaxDistribution taxValues={taxValues} setTaxableValue={setTaxableValue} setTotalTax={setTotalTax} />
              </div>
            </div>
            <div className={styles.half_table}>
              <div className={styles.whole_box}>
                <div className={`${styles.last_table} `}>
                  <div>
                    <DsAdjustmentDetails adjutmentDetails={adjustmentDetails} setTotalAmount={setTotalAmount} />
                  </div>
                </div>
                <DsInvoiceCalculations totalAmount={totalAmount} totalTax={totalTax} taxableValue={taxableValue} setTotalNetAmount={setTotalNetAmount} />
              </div>
              <div className={styles.rupees} style={{ fontSize: "1.4rem" }}>
                <DsInfoDisplay detailOf="Rupees">{rupees}</DsInfoDisplay>
              </div>
            </div>
          </div>
        </div>
        <div className={styles["grid-3"]}>
          <div className={styles.tieup}><DsInvoiceTieup tieupDetails={tieupDetails} ></DsInvoiceTieup></div>
          <DsInvoiceNetValue tdsFlag={true} taxableValue={taxableValue} totalNetAmount={totalNetAmount} />
          <div></div>
        </div>
        <DsInvoiceFooter invoiceItemDetails={invoiceItemDetails} />
        <div className={styles.footer_End}>
          <Footer /></div>
      </div>
    </>
  );
});
export default Invoice;
