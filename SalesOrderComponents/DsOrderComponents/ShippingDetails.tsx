"use client";
// import DsSelect from "@/Elements/DsComponents/dsSelect/dsSelect";
import { DsSelectOption } from "@/helpers/types";
import styles from "@/app/Order/order.module.css";

// import Image from "next/image";
import React, { useEffect, useState } from "react";
// import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";
import { OrderData } from "./OrderContextProvider";
import DsAddressSelect from "@/Elements/DsComponents/dsSelect/dsAddressSelect";
import DsSingleSelect from "@/Elements/DsComponents/dsSelect/dsSingleSelect";

export interface shippingDetailsProps {
  detailsOf?: string;
  fromToLocations: DsSelectOption[];
  addressFrom?: DsSelectOption;
  setShippingAddress?: (value: string) => void;
  orderData: OrderData | null;
  selectedLocation?: DsSelectOption;
  updateOrderDataField: (
    key: keyof Omit<OrderData, "id" | "orderItems">,
    value: any
  ) => void;
}

/**
 * Shipping Details component displays shipping details
 * @param {string} detailsOf-detailsOf used for displaying or setting location name.
 * @param {location} fromToLocations-fromToLocations used for displaying or setting location details.
 * @param {string} addressFrom - Set the address from.
 * @param {(e: React.FormEvent<HTMLElement>) => void} [setShippingAddress] - Function to handle setting and retiriving the data.
 * @param {(options: string[]) => void} [setSelectedOption] - Function to handle retiriving the selected option.
 *
 */

// eslint-disable-next-line react/display-name
const ShippingDetails: React.FC<shippingDetailsProps> = React.memo(
  ({
    detailsOf,
    fromToLocations,
    addressFrom,
    setShippingAddress,
    selectedLocation,
    orderData,
    updateOrderDataField,
  }) => {
    const [selectedOption, setSelectedOption] = useState<DsSelectOption>();
    const [addressVisible, setAddressVisible] = useState<boolean>(false);

    const handleOnChange = (e: React.FormEvent<HTMLElement>) => {
      if (selectedOption && setShippingAddress) {
        setShippingAddress(selectedOption?.value?.toString());
      }
    };

    useEffect(() => {
      if (orderData?.customerId && orderData?.customerId != 0) {
        setAddressVisible(true);
      }
    }, [orderData?.customerId]);

    // useEffect(() => {
    //   if (detailsOf && fromToLocations && orderData?.customer?.id) {
    //     const id = document.getElementById(detailsOf.toString());
    //     if (id) {
    //       (id as HTMLTextAreaElement).value = "";
        
    //       (id as HTMLTextAreaElement).textContent = "";
    //     }
    //   }
    //   if (!detailsOf) {
    //     setSelectedOption(undefined);
    //   }
    // }, [orderData?.customer?.id, fromToLocations]);

    return (
      <>
        {addressVisible && (
          <div className={styles.shipping}>
            <div className={styles.shippingDetails}>
              <div className={styles.title}>{detailsOf} Details</div>
              <div className={styles.ToFrom}>
                <div className={styles.shipFrom}>
                  <div className={styles.subtitle}>From</div>
                  <div>{addressFrom?.label}</div>
                </div>
                <div className={styles.shipTo}>
                  <div className={styles.subtitle}>To</div>
                  <div className={styles.locationField}>
                    <DsAddressSelect
                      id={detailsOf || ""}
                      // className={styles.shippingSelect}
                      selectedOption={selectedLocation}
                      options={fromToLocations ? [...fromToLocations] : []}
                      placeholder={""}
                      onChange={handleOnChange}
                      className={styles.addressContainer}
                      setSelectOption={(selectedOption) =>
                        setSelectedOption(selectedOption)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
);

export default ShippingDetails;
