"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./DsDeviationPane.module.css";
import deviationSVG from "@/Common/SalesIcons/smallIcons/deviation.svg";
import DsDeviations from "@/Elements/DsComponents/DsDeviations/DsDeviations";
import DsPane, { DisplayPane } from "@/Elements/DsComponents/DsPane/DsPane";
import PopupOpenButton from "@/Elements/DsComponents/dsPopup/popupOpenButton";
import { BasicCreditData, DeviationProps } from "@/helpers/types";
import DsApprovalPopup from "@/Elements/ERPComponents/DsApprovalPopups/DsApprovalPopups";
class ActionStatus {
    notiType: "success" | "bonus" | "info" | "error" | "cross" = "success";
    notiMsg: string = "";
    showNotification: boolean = false;
}

interface DsPaneProps {
    basicDeviationdata?: BasicCreditData; // Update the type for the prop
    isPaneOpen?: boolean;
    // setIsPaneOpen?: (open: boolean) => void;
    paneId: string;
    title?: string;
    setActionStatus: (actionStatus: ActionStatus) => void;
}

export const DsDeviationPane: React.FC<DsPaneProps> = ({
    basicDeviationdata,
    isPaneOpen,
    // setIsPaneOpen,
    paneId,
    title,
    setActionStatus
}) => {
    console.log("DsDeviationPane props:", { basicDeviationdata, isPaneOpen, paneId });
    console.log("basic check : ", basicDeviationdata?.basicCheck);
    console.log("creadit check : ", basicDeviationdata?.creditCheck);

    const [customerId, setCustomerId] = useState<number>();

    useEffect(() => {
        if (isPaneOpen) {
            console.log(`Opening pane with id: ${paneId}`);
            DisplayPane(paneId);
        }
        if (basicDeviationdata?.customerId) {
            setCustomerId(basicDeviationdata?.customerId);
        }
    }, [basicDeviationdata?.basicCheck, basicDeviationdata?.customerId, isPaneOpen, paneId]);

    const handleClosePane = () => {
        // setIsPaneOpen(false);
        console.log("Pane closed");
    };

    // Updated checkForDeviations function
    const checkForDeviations = (data?: BasicCreditData): DeviationProps | null => {


        console.log("Running checkForDeviations with data:", data);


        // Check if basicCheck or licenses exist in the data
        if (!data || !data.license) {
            console.warn("No data or licenses found in basicDeviationdata.");
            return null;
        }



        const licenses = data.license;
        console.log("Licenses found:", licenses);

        // Filter licenses with expired status
        const expiredLicenses = licenses.filter(
            (License) => License.expirationStatus.toLowerCase() === "expired"
        );

        if (expiredLicenses.length > 0) {
            const reasons = expiredLicenses.map(
                (License) =>
                    `${License.licenseName.replace("License", "")}  no. has expired.`
            );

            console.log("Expired licenses:", expiredLicenses);
            return {
                Title: (
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <Image
                            src={deviationSVG} // Replace with the correct image path
                            alt="deviation"
                            width="20"
                            height="20"
                            style={{ marginRight: "10px" }}
                        />
                        {title}
                    </div>
                ),
                Reasons: reasons,
                status: "Approval Pending",
                Actions: [

                    <PopupOpenButton
                        key="rejectBtn"
                        id="rejectBtn"
                        buttonText="Reject"
                        className={styles.rejectBtn}
                        popupId="reject"
                        // buttonColor="btnDanger"
                        buttonViewStyle="btnOutlined"
                    />,
                    <PopupOpenButton
                        key="approveBtn"
                        id="approveBtn"
                        buttonText="Approve"
                        className={styles.approveBtn}
                        popupId="approve"
                    />,

                ],
            };
        }

        console.log("No expired licenses found.");
        return null;

    };

    // Call the checkForDeviations function with the updated data
    const deviation = checkForDeviations(basicDeviationdata);

    useEffect(() => {
        console.log("deviation Reason : ", deviation)
    }, [deviation])

    return (
        <>
            <DsPane
                id={paneId}
                type="overlay"
                side="right"
                title="Deviations"
                isBackdrop={true}
                onClose={handleClosePane}
            >
                {deviation && (
                    <DsDeviations
                        Actions={deviation.Actions}
                        Reasons={deviation.Reasons}
                        Title={deviation.Title}
                        status={deviation.status}
                    />
                )}
            </DsPane>


            <DsApprovalPopup position="center" id={"reject"} popupType={"Reject"} buttonColor={"btnDanger"} toasterMessage={""} customerId={customerId} setActionStatus={setActionStatus} />
            <DsApprovalPopup position="center" id={"approve"} popupType={"Approve"} buttonColor={"btnPrimary"} toasterMessage={""} customerId={customerId} setActionStatus={setActionStatus} />

            {/* <DsPopup
                id={"reject"}
                position="center"
                type="standard"
                title={"Reason of Rejection"}>
                <div className={styles.popContentContainer}>
                    <div className={styles.selectpopContainer}>
                        <DsSingleSelect
                            id="selectId"
                            label="Please Select"
                            placeholder="Please Select"
                            className={styles.selectPopUp}
                            // type={"single"}
                            // onChange={(e: React.ChangeEvent<HTMLElement>) => {
                            //     throw new Error("Function not implemented.");
                            // }}
                            options={[]}
                        />
                    </div>

                    <div className={styles.comments}>
                        <h4>Comments</h4>
                        <DsTextArea
                            placeholder="Please Type Here"
                            label="label"
                            disable={false}
                            minRows={5}
                            className={styles.commentField}
                        />
                    </div>
                    <div className={styles.popupFooter}>
                        <DsButton
                            id="rejectButton"
                            label="Reject"
                            buttonViewStyle="btnContained"
                            buttonColor="btnDanger"
                        />
                    </div>
                </div>
            </DsPopup> */}

        </>
    );
};

