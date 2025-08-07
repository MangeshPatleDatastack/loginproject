/* eslint-disable react/display-name */
import {
  searchCustomerURL,
  getCustomerURL,
  getAllCustomerLocationsURL,
  getCustomersURL,
} from "@/helpers/constant";
import fetchData from "@/helpers/Method/fetchData";
import {
  customer,
  bankDetail,
  datalistOptions,
  location,
} from "@/helpers/types";
import DsSearchComponent from "./searchComponent";
import { Dispatch, SetStateAction, useState } from "react";
import React from "react";
import { OrderData, useOrderData } from "./OrderContextProvider";
export interface CustomerSearchProps {
  orderData: OrderData | null;
  setSelectedCustomer?: Dispatch<SetStateAction<customer | undefined>>;
  setCustomerLocations?: Dispatch<SetStateAction<location[] | undefined>>;
}
export function areBankDetails(value: unknown): value is bankDetail {
  return (
    typeof value === "object" &&
    value !== null &&
    "name" in value &&
    "accountNumber" in value &&
    "ifscCode" in value &&
    "branchName" in value &&
    typeof (value as unknown as bankDetail).name === "string" &&
    typeof (value as unknown as bankDetail).accountNumber === "string" &&
    typeof (value as unknown as bankDetail).ifscCode === "string" &&
    typeof (value as unknown as bankDetail).branchName === "string"
  );
}
export function isLocation(value: unknown): value is location {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "address1" in value &&
    "address2" in value &&
    "address3" in value &&
    "address4" in value &&
    "city" in value &&
    "state" in value &&
    "pinCode" in value &&
    "isPrimary" in value &&
    typeof (value as unknown as location).id === "number" &&
    typeof (value as unknown as location).address1 === "string" &&
    typeof (value as unknown as location).address2 === "string" &&
    typeof (value as unknown as location).address3 === "string" &&
    typeof (value as unknown as location).address4 === "string" &&
    typeof (value as unknown as location).city === "string" &&
    typeof (value as unknown as location).state === "string" &&
    typeof (value as unknown as location).pinCode === "string" &&
    typeof (value as unknown as location).isPrimary === "string"
  );
}
export function isCustomer(value: unknown): value is customer {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "code" in value &&
    "panNumber" in value &&
    "gstInNumber" in value &&
    "drugLicenseNumber" in value &&
    "fdaLicenseNumber" in value &&
    "fssaiLicenseNumber" in value &&
    "drugExpiryDate" in value &&
    "fdaExpiryDate" in value &&
    "fssaiExpiryDate" in value &&
    "address" in value &&
    "bank" in value &&
    typeof (value as unknown as customer).id === "number" &&
    typeof (value as unknown as customer).name === "string" &&
    typeof (value as unknown as customer).code === "string" &&
    typeof (value as unknown as customer).panNumber === "string" &&
    typeof (value as unknown as customer).gstInNumber === "string" &&
    typeof (value as unknown as customer).drugLicenseNumber === "string" &&
    typeof (value as unknown as customer).fdaLicenseNumber === "string" &&
    typeof (value as unknown as customer).fssaiLicenseNumber === "string" &&
    typeof (value as unknown as customer).drugExpiryDate === "string" &&
    typeof (value as unknown as customer).fdaExpiryDate === "string" &&
    typeof (value as unknown as customer).fssaiExpiryDate === "string" &&
    isLocation((value as unknown as customer).address) &&
    areBankDetails((value as unknown as customer).bank)
  );
}
export function isSearchCustomer(value: unknown): value is customer {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "code" in value &&
    typeof (value as unknown as customer).id === "number" &&
    typeof (value as unknown as customer).name === "string" &&
    typeof (value as unknown as customer).code === "string"
  );
}
export function areSearchCustomers(value: unknown): value is customer[] {
  return Array.isArray(value) && value.every(isSearchCustomer);
}
const CustomerSearch: React.FC<{
  customer: string;
  updateOrderDataField: (
    key: keyof Omit<OrderData, "id" | "orderItems">,
    value: any
  ) => void;
}> = React.memo(({ customer, updateOrderDataField }) => {
  const [customers, setCustomers] = useState<datalistOptions[]>();


  async function setSelectedOptions(option: datalistOptions): Promise<void> {
    const selectedCustomerId = option.id;
    // const getCustomerByCustomerId = getCustomersURL + ;
    updateOrderDataField("customerId", selectedCustomerId);
  }
  function setOptions(values: unknown) {
    if (areSearchCustomers(values)) {
      const customers: datalistOptions[] = values.map(
        (x: { id: number; code: string; name: string }) => {
          return {
            id: x?.id?.toString(),
            value: x?.code.toUpperCase() + " - " + x.name,
            attributes: { "customer-id": x.id.toString() },
          };

        }

      );
      setCustomers(customers);
    }
  }


  return (
    <DsSearchComponent
      id="customerSearch"
      initialValue={customer}
      dataListId="customerSearchDatalist"
      label={"Customer ID and Name"}
      options={customers ? customers : undefined}
      setOptions={setOptions}
      setSearchUrl={(searchTerm: string) => {

        return searchCustomerURL + searchTerm;
      }}
      setSelectedOption={setSelectedOptions}
    />
  );
});
export default CustomerSearch;
