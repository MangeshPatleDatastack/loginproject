import { useEffect, useState } from "react";
import styles from "../DsInvoiceComponents/invoicePage.module.css";
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import fetchData from "@/helpers/Method/fetchData";
import { getFooterAddress } from "@/helpers/constant";
import React from "react";

interface Phno {
    phonenumber1: string;
    phonenumber2: string;
}
interface Address {
    roadOf: string;
    phonenumber: Phno;
    fax: string;
    email: string;
    website: string;
}

// eslint-disable-next-line react/display-name
const Footer: React.FC = React.memo(() => {
    const [footerAddress, setFooterAddress] = useState<Address>();
    const handleFetch = async () => {
        try {
            await fetchData({ url: getFooterAddress }).then((res) => {
                if ((res.code = 200)) {
                    setFooterAddress(res.result);
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
        handleFetch();
    }, []);

    const roadOff = footerAddress?.roadOf;
    const phno =
        footerAddress?.phonenumber?.phonenumber1 +
        " " +
        footerAddress?.phonenumber?.phonenumber2;
    const fax = footerAddress?.fax;
    const email = footerAddress?.website;
    const website = footerAddress?.email;
    return (
        <>
            <div className={styles.footer_End}>
                <DsInfoDisplay detailOf="Road Off">{roadOff}</DsInfoDisplay>
                <DsInfoDisplay detailOf="Ph. No.">{phno}</DsInfoDisplay>
                <DsInfoDisplay detailOf="Fax.">{fax}</DsInfoDisplay>
                <DsInfoDisplay detailOf="Website">{website}</DsInfoDisplay>
                <DsInfoDisplay detailOf="E-mail Address">{email}</DsInfoDisplay>
            </div>
        </>
    );
});

export default Footer;