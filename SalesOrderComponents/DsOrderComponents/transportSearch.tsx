import { searchTransporterURL, getTransporterURL } from "@/helpers/constant";
import fetchData from "@/helpers/Method/fetchData";
import {  datalistOptions, searchTransport } from "@/helpers/types";
import DsSearchComponent from "./searchComponent";
import { Dispatch, SetStateAction, useState } from "react";
import React from "react";
import { OrderData,  useOrderData } from "./OrderContextProvider";

export interface TransportSearchProps {initialValue?: string;
  containerClasses?: string;
  updateOrderDataField: (
    key: keyof Omit<OrderData, "id" | "orderItems">,
    value: any
  ) => void;
}

export function areSearchTransporters(
  value: unknown
): value is searchTransport[] {
  return Array.isArray(value) && value.every(isSearchTransporter);
}

export function isSearchTransporter(value: unknown): value is searchTransport {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "code" in value &&
    "name" in value &&
    typeof (value as unknown as searchTransport).id === "number" &&
    typeof (value as unknown as searchTransport).code === "string" &&
    typeof (value as unknown as searchTransport).name === "string"
  );
}
// export function isTransporter(value: unknown): value is transport {
//   return (
//     typeof value === "object" &&
//     value !== null &&
//     "transportId" in value &&
//     "transporterName" in value &&
//     "mode" in value &&
//     "vehicleType" in value &&
//     "vehicleNumber" in value &&
//     "transporterDocumentNumber" in value &&
//     "transportationDate" in value &&
//     typeof (value as unknown as transport).transporterId === "number" &&
//     typeof (value as unknown as transport).transporterName === "string" &&
//     typeof (value as unknown as transport).mode === "string" &&
//     typeof (value as unknown as transport).vehicleType === "string" &&
//     typeof (value as unknown as transport).vehicleNumber === "string" &&
//     typeof (value as unknown as transport).transporterDocumentNumber ===
//       "string" &&
//     typeof (value as unknown as transport).transportationDate === "string"
//   );
// }

export function isTransporter(value: unknown): value is searchTransport {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "code" in value &&
    "name" in value &&
    typeof (value as unknown as searchTransport).id === "number" &&
    typeof (value as unknown as searchTransport).code === "string" &&
    typeof (value as unknown as searchTransport).name === "string"
  );
}

const TransportSearch: React.FC<TransportSearchProps> = React.memo(
  ({initialValue,containerClasses, updateOrderDataField }) => {
    const [transporters, setTransporters] = useState<datalistOptions[]>();

    const setOptions = (values: unknown[]) => {
      if (areSearchTransporters(values)) {
        const transporters: datalistOptions[] = values.map(
          (x: { id: number; code: string; name: string }) => {
            return {
              id: x?.id?.toString(),
              value: `${x?.code?.toString()} - ${x?.name?.toString()}`,
              attributes: { "transporter-id": x?.id?.toString() },
            };
          }
        );
        setTransporters(transporters);
      }
    };

    const setSelectedOption = async (option: datalistOptions) => {
      const selectedTransportId = option.id;
      updateOrderDataField("transporterId", selectedTransportId);
      // if (selectedTransportId) {
      //   await fetchData({
      //     url: getTransporterURL,
      //     // + selectedTransportId,
      //   }).then(async (transporter) => {
      //     if (transporter?.code === 200) {
      //       if (isTransporter(transporter?.result)) {
      //         //console.log("customer result = ", transporter?.result);
      //         setSelectedTransporter((prev) => ({
      //           ...prev,
      //           transporterId: transporter?.result?.id,
      //           transporterName: transporter?.result?.name,
      //         }));
      //       }
      //     }
      //   });
      // }
    };

    return (
      <DsSearchComponent
      containerClasses={containerClasses}
        id="transportSearch"
        initialValue={initialValue}
        dataListId="transportSearchDatalist"
        label={"Transport ID and Name"}
        options={transporters ? transporters : undefined}
        setOptions={setOptions}
        setSearchUrl={(searchTerm: string) => {
          return searchTransporterURL + searchTerm;
        }}
        setSelectedOption={setSelectedOption}
      />
    );
  }
);
export default TransportSearch;
