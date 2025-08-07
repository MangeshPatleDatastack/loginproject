/* eslint-disable react/display-name */
"use client";
import styles from "@/app/Order/order.module.css";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import TransportSearch from "./transportSearch";
import DsDataList from "@/Elements/DsComponents/DsInputs/dsDatalist";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsDatePicker from "@/Elements/DsComponents/DsDatePicker/DsDatePicker";

import { OrderData, useOrderData } from "./OrderContextProvider";
import { formatDate } from "@/helpers/Method/conversion";

export interface transportDetailsProps {
  orderData: OrderData | null;
  updateOrderDataField: (key: any, value: any) => void;
  // updateTransportDetails: (key: keyof Transport, value: any) => void; // Update top-level fields
}

/**
 * Shipping Details component displays shipping details
 * @param {transport} transportDetails-transportDetails used for displaying or setting transport details.
 * @param { (e: React.ChangeEvent<HTMLElement>) => void} [setTransportDetails] - Function to handle setting and retiriving the transport details.
 *
 */
const TransporterDetails: React.FC<transportDetailsProps> = React.memo(
  ({ orderData, updateOrderDataField }) => {
    const transporterDetails = orderData?.transporter;
    const transportDetails = {
      mode: orderData?.transportMode,
      vehicleType: orderData?.transportVehicleType,
      vehicleNumber: orderData?.transportVehicleNumber,
      transporterDocumentNumber: orderData?.transporterDocumentNumber,
      transportationDate: orderData?.transportationDate ?? "",
    };
    const [initialTransportationDate, setInitTransportDate] = useState<string>(
      orderData?.transportationDate || ""
    );
    const transporterIdName = `${transporterDetails?.code ?? ""}  ${
      transporterDetails?.name ?? ""
    } `;
    const setTransportIdName = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const transportIdAttr = (e.target as HTMLElement)?.getAttribute(
        "data-transport-id"
      );
      const transportId = transportIdAttr
        ? parseInt(transportIdAttr, 10)
        : null;
      const transporterName = (e.target as HTMLInputElement)?.value;
      updateOrderDataField("transporterId", {
        ...transporterDetails,
        id: transportId,
        name: transporterName,
      });
    };
    function convertStringToDateFormat(dateStr: string): string {
      dateStr = dateStr.replace(/[^\d-]/g, ""); // Remove non-numeric and non-dash characters
      dateStr = dateStr.replace(/\//g, "-"); // Replace slashes with dashes

      let parts = dateStr.split("-").filter(Boolean); // Split and remove empty parts
      let [year, month, day] = parts.map((p) => parseInt(p, 10) || 0);

      if (!day || day > 31) day = 24; // Default to 24 if invalid
      if (!month || month > 12) month = 3; // Default to 03 if invalid

      // Ensure year is properly formatted
      if (year && year < 100) {
        year = 2000 + year; // Convert '04' to '2004'
      } else if (!year) {
        year = 2004; // Default year if missing
      }
      if (day && year && month)
        return `${String(day).padStart(2, "0")}-${String(month).padStart(
          2,
          "0"
        )}-${String(year).padStart(4, "0")}`;
      else return "";
    }
    function convertDateFormat(dateStr: Date): string {
      // Split the date string into day, month, and year parts
      const day = dateStr.getDate();
      const month = dateStr.getMonth() + 1;
      const year = dateStr.getFullYear();

      // Reformat the date into yyyy-mm-dd format
      return `${year}-${month}-${day}`;
    }
    // useEffect(() => {
    //   if (transportDetails.transportationDate) {
    //     const d = convertStringToDateFormat(transportDetails?.transportationDate);
    //     setInitTransportDate(d);
    //     console.log("date  =  ", initialTransportationDate);
    //   }
    // }, [{ ...transportDetails }]);

    return (
      <>
        {orderData && orderData.customerId && orderData?.customerId != 0 && (
          <div className={styles.transportDetails}>
            {orderData.ewayBillStatus == "AVAL" ? (
              <DsDataList
                id={"transporter-id-name"}
                className={" mx-0 "}
                initialValue={transporterIdName || ""}
                disable={true}
                dataListId={"transport-id-name-datalist"}
                onChange={setTransportIdName}
                label="Transport ID & name"
              />
            ) : (
              <TransportSearch
                containerClasses=" mx-0"
                initialValue={transporterIdName || ""}
                updateOrderDataField={updateOrderDataField}
              />
            )}

            <DsTextField
              id={"transportMode"}
              containerClasses={" mx-0 "}
              initialValue={transportDetails?.mode || ""}
              onChange={(e) => {
                updateOrderDataField("transportMode", e.target.value);
              }}
              // disable={true}
              label="Mode of Transport"
            />
            <DsDatePicker
              id={"transportationDate"}
              containerClasses={" mx-0 "}
              initialDate={
                convertStringToDateFormat(
                  transportDetails.transportationDate
                ) || ""
              }
              className={" mx-0 "}
              setDateValue={(date) => {
                if (typeof date !== "string") {
                  updateOrderDataField(
                    "transportationDate",
                    convertDateFormat(date)
                  );
                } else {
                  updateOrderDataField("transportationDate", date);
                }
              }}
              // disable={true}
              label="Transportation Date"
              // inputType="date"
            />
            <DsTextField
              id={"vehicleType"}
              containerClasses={" mx-0 "}
              initialValue={transportDetails?.vehicleType || ""}
              onChange={(e) => {
                updateOrderDataField("transportVehicleType", e.target.value);
              }}
              // disable={true}
              label="Vehicle Type"
            />
            <DsTextField
              id={"vehicleNumber"}
              containerClasses={"  mx-0 "}
              initialValue={transportDetails?.vehicleNumber || ""}
              onChange={(e) => {
                updateOrderDataField("transportVehicleNumber", e.target.value);
              }}
              // disable={true}
              label="Vehicle Number"
            />
            <DsTextField
              id={"transportDocumentNumber"}
              containerClasses={" mx-0 "}
              initialValue={transportDetails?.transporterDocumentNumber || ""}
              onChange={(e) => {
                updateOrderDataField(
                  "transporterDocumentNumber",
                  e.target.value
                );
              }}
              // disable={true}
              label="Transport Document Number"
            />
          </div>
        )}
      </>
    );
  }
);
export default TransporterDetails;
