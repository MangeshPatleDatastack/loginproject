"use client";
import styles from "./packing.module.css";
import buttonStyles from "@/Elements/DsComponents/DsButtons/dsButton.module.css";
import Image from "next/image";
import correctSign from "@/Icons/smallIcons/correctsign.svg";
import IpcaLogo from "@/Icons/mediumIcons/Ipca.svg";
import gmail from "@/Icons/smallIcons/gmail.svg";
import phoneCallIcon from "@/Icons/smallIcons/phonecall.svg";
import locationIcon from "@/Icons/smallIcons/Address_location.svg";
import PackingData from "../DsPackingDetails/DsPackingData";
import { useEffect, useState } from "react";
import { DsTableRow } from "@/helpers/types";
import PackingFooter from "../DsPackingDetails/DsPackingFooter";
import Footer from "../DsBillFooter";
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import { getpackingListbyId } from "@/helpers/constant";
import fetchData from "@/helpers/Method/fetchData";
import React from "react";

const PackingList: React.FC = React.memo(() => {
    const [packingData, setPackingData] = useState<any>([]);
    const renderTick = (value: "Y" | "N") => {
        if (value === "Y") {
            return <Image src={correctSign} alt="icon" />;
        } else {
            return " ";
        }
    };
    const [rows, seDsTableRows] = useState<DsTableRow[]>([]);
    const handleFetch = async () => {
        try {
            await fetchData({ url: getpackingListbyId + 1 }).then((res) => {
                if ((res.statusCode = 200)) {
                    setPackingData(res);
                    //console.log(res);
                } else {
                    console.error(
                        "Error fetching data: ",
                        res.message || "Unknown error"
                    );
                }
            });
        } catch (error) {
            console.error("Fetch error: ", error);
        }
    };

    useEffect(() => {
        if (!packingData?.orderItems) return;

        const updatedRows = packingData?.orderItems?.map(
            (orderItem: any, index: number) => ({
                rowIndex: index + 1, // Use the index from `map` to ensure unique row index
                className: "",
                content: [
                    {
                        columnIndex: 0,
                        className: "",
                        content: orderItem?.productCode?.toString() ?? " "
                    },
                    {
                        columnIndex: 1,
                        className: "",
                        content: orderItem?.productName?.toString() ?? " "
                    },
                    {
                        columnIndex: 2,
                        className: "",
                        content: orderItem?.manufactureBy?.toString() ?? " "
                    },
                    {
                        columnIndex: 3,
                        className: "",
                        content: orderItem?.batchNumber?.toString() ?? " "
                    },
                    {
                        columnIndex: 4,
                        className: "",
                        content: orderItem?.manufacturingDate?.toString() ?? " "
                    },
                    {
                        columnIndex: 5,
                        className: "",
                        content: orderItem?.expiry?.toString() ?? " "
                    },
                    {
                        columnIndex: 6,
                        className: "",
                        content: orderItem?.quantity?.toString() ?? " "
                    },
                    {
                        columnIndex: 7,
                        className: "",
                        content: orderItem?.cartoonSize?.toString() ?? " "
                    },
                    {
                        columnIndex: 8,
                        className: "",
                        content: orderItem?.schemeandBonus?.toString() ?? " "
                    },
                    {
                        columnIndex: 9,
                        className: "",
                        content: renderTick(orderItem?.picked)
                    },
                    {
                        columnIndex: 10,
                        className: "",
                        content: renderTick(orderItem?.packed)
                    }
                ]
            })
        );

        // Update rows state only once
        seDsTableRows(updatedRows);
    }, [packingData]);

    useEffect(() => {
        handleFetch();
    }, []);

    //packing list details
    const packingListNo = `${packingData?.id ?? " "}`;
    const packingListGenerationDate = `${packingData?.generationDate ?? " "}`;
    const invoiceNumber = `${packingData?.invoiceNumber ?? " "}`;
    const invoiceDate = `${packingData?.invoiceDate ?? " "}`;

    //customer details
    const customerCode = `${packingData?.customer?.code ?? " "}  `;
    const customerName = `${packingData?.customer?.name ?? " "}`;
    const customerTelephone = `${packingData?.customer?.name ?? " "}`;
    const customerAddress = `${packingData?.customer?.address?.telePhoneNumber ?? " "
        }`;
    const customerMobile =
        packingData?.customer?.address?.phoneNumber?.join(", ") ?? "-";

    //company details
    const companyName = `${packingData?.depo?.name ?? " "}`;
    const companyAddress = `${packingData?.depo?.address?.Address1 ?? " "}`;
    const companyEmail = `${packingData?.depo?.address?.email ?? " "}`;
    const companyMobile = `${packingData?.depo?.address?.phoneNumber.join(", ") ?? " "
        }`;
    // const roadOff =
    //   "48. Kandivali Industrial Estate, Kandivali (West) Mumbai - 400067.";
    // const phno = "022-66474444 / 66474400";
    // const fax = "022-28686613 ";
    // const email2 = "ipca@ipca.com";
    // const website = "www.ipcalabs.com.";
    return (
        <>
            <div className={styles.packingList_Container}>
                <div className={styles.packingList_Head}>
                    <h2>Packing List - {packingListNo}</h2>
                    <span>
                        <Image src={IpcaLogo} alt="icon" />
                    </span>
                </div>
                <div className={styles.packingList_Head}>
                    <h3>
                        {customerCode} - {customerName}
                    </h3>
                    <h3>{companyName}</h3>
                </div>
                <div className={styles.packingList_Head}>
                    <div className={styles.head_menu}>
                        {" "}
                        <DsInfoDisplay startIcon={<Image src={locationIcon} alt="icon" />}>
                            {customerAddress}
                        </DsInfoDisplay>
                        <DsInfoDisplay startIcon={<Image src={phoneCallIcon} alt="icon" />}>
                            {customerTelephone}
                        </DsInfoDisplay>
                        <DsInfoDisplay startIcon={<Image src={phoneCallIcon} alt="icon" />}>
                            {customerMobile}
                        </DsInfoDisplay>
                    </div>
                    <div className={styles.head_menu}>
                        {" "}
                        <DsInfoDisplay startIcon={<Image src={locationIcon} alt="icon" />}>
                            {companyAddress}
                        </DsInfoDisplay>
                        <DsInfoDisplay startIcon={<Image src={gmail} alt="icon" />}>
                            {companyEmail}
                        </DsInfoDisplay>
                        <DsInfoDisplay startIcon={<Image src={phoneCallIcon} alt="icon" />}>
                            {companyMobile}
                        </DsInfoDisplay>
                    </div>
                </div>
                <div className={styles.packingList_details}>
                    <DsInfoDisplay detailOf="Packing List Generation Date">
                        {packingListGenerationDate}
                    </DsInfoDisplay>
                    <div className={buttonStyles.right_separator}></div>
                    <DsInfoDisplay detailOf="Invoice Number">
                        {invoiceNumber}
                    </DsInfoDisplay>
                    <div className={buttonStyles.right_separator}></div>
                    <DsInfoDisplay detailOf="Invoice Date">{invoiceDate}</DsInfoDisplay>
                </div>
                <div>
                    <PackingData rows={rows} />
                </div>
                <div>
                    <PackingFooter />
                </div>

                <div className={styles.footer_End}>
                    <Footer />
                </div>
            </div>
        </>
    );
});

export default PackingList;

