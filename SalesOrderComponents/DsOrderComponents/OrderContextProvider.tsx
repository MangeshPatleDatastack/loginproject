/* eslint-disable @typescript-eslint/no-explicit-any */
import { showToaster } from "@/Elements/DsComponents/DsToaster/DsToaster";
import {
  closeTimeForSalesOrder,
  DsStatus,
  dsStatus,
  getCustomersURL,
  getCustomerURL,
  getOrderById,
  getProductURL,
  getTransporterURL,
  saveOrderURL,
} from "@/helpers/constant";
import fetchData from "@/helpers/Method/fetchData";
import { generatePatchDocument } from "@/helpers/Method/UpdatePatchObjectCreation";
import { bankDetail, getProduct, searchProducts } from "@/helpers/types";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

// Define types for your data - keep these in your file
interface Address {
  id: number;
  address1: string;
  address2: string | null;
  address3: string | null;
  address4: string | null;
  city: string;
  state: string;
  pinCode: string;
  isPrimary: string;
}

export interface Product {
  type: string;
  productCode: string;
  productName: string;
  cartonSize: number | null;
  specialRate: number | null;
  actualRate: number | null;
  hsnCode: string | null;
  discountPercentage: number | null;
  dispatchQuantity: number | null;
  bonusQuantity: number | null;
  isTieUpProduct: boolean | null;
  igstRate: number | null;
  cgstRate: number | null;
  sgstRate: number | null;
  expiryDate?: string | undefined;
}

export interface Transporter {
  type: string;
  id: number;
  name: string;
  code: string;
}

interface Customer {
  type: string;
  id: number;
  name: string;
  code: string;
  panNumber: string;
  gstInNumber: string;
  drugLicenseNumber: string;
  drugExpiryDate: string;
  fdaLicenseNumber: string;
  fdaExpiryDate: string;
  fssaiLicenseNumber: string;
  fssaiExpiryDate: string;
  address: any;
  bank: bankDetail;
}

export interface OrderItem {
  id?: number | null;
  productId: number;
  requestedQuantity: number;
  requestedExpiryInDays: number;
  product?: Product;
  mrpRate?: number; //new
  batch?: Batch | null; //new
}
//new
export interface Batch {
  batchNo: number | null;
  type: string;
  batchId: number | null;
  batchNumber: string | null;
  batchExpiryDate: string | null;
  mrpRate: number | null;
  basicRate: number | null;
}

interface BillingAddress {
  type: string;
  to: Address;
  from: Address;
}

interface ShippingAddress {
  type: string;
  to: Address;
  from: Address;
}

export interface OrderData {
  id?: number;
  customerId?: number;
  createdBy?: number;
  lastUpdatedBy?: number;
  transporterId: number | null;
  billToAddressId: number;
  billFromAddressId: number;
  shipToAddressId: number;
  shipFromAddressId: number;
  purchaseOrderNumber: string;
  purchaseOrderDate: string;
  transportMode: string;
  transportVehicleType: string;
  transportVehicleNumber: string;
  transporterDocumentNumber: string;
  transportationDate: string;
  ewayBillStatus?: string;
  status: string;
  parentOrders?: any;
  customer?: Customer;
  transporter?: Transporter;
  billingAddress: BillingAddress;
  shippingAddress: ShippingAddress;
  orderItems?: OrderItem[];
  validation?: any[];
}

class ActionStatus {
  notiType: "success" | "bonus" | "info" | "error" | "cross" = "success";
  notiMsg: string = "";
  showNotification: boolean = false;
}

// Define the context type
interface OrderDataContextType {
  actionStatus: ActionStatus;
  originalOrderData: OrderData | null | undefined; // Original fetched data
  orderDataCopy: OrderData | null; // Editable copy of the data
  updateShippingFromAddress: (address: Address) => void;
  updateShippingToAddress: (address: Address) => void;
  updateBillingFromAddress: (address: Address) => void;
  updateBillingToAddress: (address: Address) => void;
  updateOrderDataField: (
    key: keyof Omit<OrderData, "id" | "orderItems">,
    value: any
  ) => void;
  addOrderItem: (productId: number, requestedQuantity: number) => Promise<void>;
  updateOrderItem: (
    id: number,
    key: keyof Omit<OrderItem, "id">,
    value: any
  ) => Promise<void>;
  removeOrderItem: (id: number) => void;
  saveOrder: (status: dsStatus) => Promise<void>;
  submitOrder: () => Promise<void>;
  updateOrder: () => Promise<void>;
  fetchAndSetOriginalOrder: (orderId: number) => Promise<void>;
}

// Create context
const OrderDataContext = createContext<OrderDataContextType | undefined>(
  undefined
);

interface OrderDataProviderProps {
  children: React.ReactNode;
}

// Create provider component
export const OrderDataProvider: React.FC<OrderDataProviderProps> = ({
  children,
}) => {
  const [actionStatus, setActionStatus] = useState<ActionStatus>({
    notiMsg: "",
    notiType: "success",
    showNotification: false,
  });
  const [originalOrderData, setOriginalOrderData] = useState<
    OrderData | null | undefined
  >();
  const [orderDataCopy, setOrderDataCopy] = useState<OrderData | null>({
    transporterId: null,
    billToAddressId: 0,
    billFromAddressId: 1,
    shipToAddressId: 0,
    shipFromAddressId: 1,
    purchaseOrderNumber: "",
    purchaseOrderDate: "", // Today's date
    transportMode: "",
    transportVehicleType: "",
    transportVehicleNumber: "",
    transporterDocumentNumber: "",
    transportationDate: "", // Today's date
    status: DsStatus.DRFT.toUpperCase(),
    billingAddress: {
      type: "read-only",
      to: {
        id: 0,
        address1: "",
        address2: null,
        address3: null,
        address4: null,
        city: "",
        state: "",
        pinCode: "",
        isPrimary: "N",
      },
      from: {
        id: 0,
        address1: "",
        address2: null,
        address3: null,
        address4: null,
        city: "",
        state: "",
        pinCode: "",
        isPrimary: "N",
      },
    },
    shippingAddress: {
      type: "read-only",
      to: {
        id: 0,
        address1: "",
        address2: null,
        address3: null,
        address4: null,
        city: "",
        state: "",
        pinCode: "",
        isPrimary: "N",
      },
      from: {
        id: 0,
        address1: "",
        address2: null,
        address3: null,
        address4: null,
        city: "",
        state: "",
        pinCode: "",
        isPrimary: "N",
      },
    },
  });

  // Using useRef to keep track of the latest orderDataCopy
  const orderDataCopyRef = useRef(orderDataCopy);

  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  // Update the ref whenever orderDataCopy changes
  useEffect(() => {
    orderDataCopyRef.current = orderDataCopy;
  }, [orderDataCopy]);

  const fetchProduct = useCallback(
    async (productId: number): Promise<getProduct> => {
      try {
        const data = await fetchData({ url: `${getProductURL}${productId}` });
        if (data.code === 200) {
          setActionStatus({
            notiMsg: "The product has been added",
            notiType: "success",
            showNotification: true,
          });
          showToaster("create-order-toaster");
        } else {
          setActionStatus({
            notiMsg: "The product could not be added",
            notiType: "error",
            showNotification: true,
          });
          showToaster("create-order-toaster");
        }
        return data.result as getProduct; // Explicitly assert the type here
      } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
      }
    },
    [fetchData]
  );

  const fetchTransporter = useCallback(
    async (transporterId: number): Promise<Transporter> => {
      try {
        const data = await fetchData({
          // url: `${getTransportURL}${transporterId}`,
          url: `${getTransporterURL}`,
        });
        return data.result as Transporter; // Explicitly assert the type here
      } catch (error) {
        console.error("Error fetching transporter:", error);
        throw error;
      }
    },
    [fetchData]
  );

  const fetchCustomer = useCallback(
    async (customerId: number): Promise<Customer> => {
      try {
        // const data = await fetchData({ url: `/api/customer/${customerId}` });
        const data = await fetchData({
          url: `${getCustomersURL}${customerId}`,
        });

        return data.result as Customer; // Explicitly assert the type here
      } catch (error) {
        console.error("Error fetching customer:", error);
        throw error;
      }
    },
    [fetchData]
  );

  // Update address methods
  const updateShippingFromAddress = useCallback(
    (address: Address) => {
      setOrderDataCopy((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          shippingAddress: {
            ...prev.shippingAddress,
            type: "read-only",
            from: address,
          },
          shipFromAddressId: address.id,
        };
      });
    },
    [orderDataCopy, originalOrderData]
  );

  const updateShippingToAddress = useCallback(
    (address: Address) => {
      setOrderDataCopy((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          shippingAddress: {
            ...prev.shippingAddress,
            type: "read-only",
            to: address,
          },
          shipToAddressId: address.id,
        };
      });
    },
    [orderDataCopy, originalOrderData]
  );

  const updateBillingFromAddress = useCallback(
    (address: Address) => {
      setOrderDataCopy((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          billingAddress: {
            ...prev.billingAddress,
            type: "read-only",
            from: address,
          },
          billFromAddressId: address.id,
        };
      });
    },
    [orderDataCopy, originalOrderData]
  );

  const updateBillingToAddress = useCallback(
    (address: Address) => {
      setOrderDataCopy((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          billingAddress: {
            ...prev.billingAddress,
            type: "read-only",
            to: address,
          },
          billToAddressId: address.id,
        };
      });
    },
    [orderDataCopy, originalOrderData]
  );

  const addOrderItem = useCallback(
    async (productId: number, requestedQuantity: number) => {
      if (
        orderDataCopy?.orderItems?.some((item) => item.productId === productId)
      ) {
        setActionStatus({
          notiMsg: "The product has already been added",
          notiType: "info",
          showNotification: true,
        });
        showToaster("create-order-toaster");
      } else {
        const newProduct = await fetchProduct(productId);
        // console.log("product id:", productId);
        const newOrderItem: OrderItem = {
          productId: productId,
          requestedQuantity: requestedQuantity,
          requestedExpiryInDays: 30,
          product: {
            type: "read-only",
            productCode: newProduct.code,
            productName: newProduct.name,
            cartonSize: newProduct.cartonSize,
            specialRate: null,
            actualRate: null,
            hsnCode: null,
            discountPercentage: null,
            dispatchQuantity: null,
            bonusQuantity: null,
            isTieUpProduct: null,
            igstRate: null,
            cgstRate: null,
            sgstRate: null,
          },
          batch: {
            batchNo: null,
            type: "read-only",
            batchId: null,
            batchNumber: null,
            batchExpiryDate: null,
            mrpRate: newProduct.mrpRate,
            basicRate: newProduct.basicRate,
          },
        };

        setOrderDataCopy((prev) => ({
          ...prev!,
          orderItems: [...(prev!.orderItems || []), newOrderItem],
        }));
      }
    },

    [fetchProduct, orderDataCopy, originalOrderData]
  );

  // Method to update an existing order item
  const updateOrderItem = useCallback(
    async (id: number, key: keyof Omit<OrderItem, "id">, value: any) => {
      setOrderDataCopy((prev) => {
        // Create a deep copy of the orderItems array
        const updatedOrderItems = prev!.orderItems?.map((item) => {
          if (item.productId === id) {
            const updatedItem = { ...item, [key]: value };

            // Conditionally fetch and update product details
            // if (key === "productId") {
            //     fetchProduct(value).then((product) => {
            //         updatedItem.product = { ...updateItem, type: "read-only" };
            //     });
            // }
            return updatedItem;
          }
          return item;
        });

        return {
          ...prev!,
          orderItems: updatedOrderItems,
        };
      });
    },
    [fetchProduct, orderDataCopy, originalOrderData]
  );

  // Method to remove an order item (optional, in case you want to delete items)
  const removeOrderItem = useCallback(
    (id: number) => {
      setOrderDataCopy((prev) => ({
        ...prev!,
        orderItems: prev!.orderItems?.filter((item) => item.productId !== id),
      }));
      setActionStatus({
        notiMsg: "Product line item has been deleted",
        notiType: "cross",
        showNotification: true,
      });
      showToaster("create-order-toaster");
    },
    [orderDataCopy, originalOrderData]
  );

  // Update function
  const updateOrderDataField = useCallback(
    async (
      key: keyof Omit<OrderData, "id" | "orderItems">,
      value: any
    ): Promise<void> => {
      // Handle ID-based updates and API calls
      switch (key) {
        case "customerId":
          fetchCustomer(value).then((customer) => {
            setOrderDataCopy((prev) => ({
              ...prev!,
              //   customerId: value,
              customerId: customer.id,
              customer: { ...customer, type: "read-only" },
            }));
          });

          break;
        case "transporterId":
          fetchTransporter(value).then((transporter) => {
            setOrderDataCopy((prev) => ({
              ...prev!,
              transporterId: value,
              transporter: { ...transporter, type: "read-only" },
            }));
          });

          break;
        // case "orderItems":
        //     // Assuming value is an array of OrderItem
        //     const updatedOrderItems = (value as OrderItem[]).map(
        //         (orderItem) => {
        //             const updatedOrderItem = { ...orderItem }; // Create a copy to avoid modifying directly

        //             if (orderItem.productId) {
        //                 fetchProduct(orderItem.productId).then((product) => {
        //                     updatedOrderItem.product = { ...product, type: "read-only" };
        //                 });
        //             }

        //             return updatedOrderItem;
        //         }
        //     );
        //     setOrderDataCopy((prev) => ({
        //         ...prev!,
        //         orderItems: updatedOrderItems,
        //     }));
        //     break;
        case "shipToAddressId":
          // console.log("fetched = ", originalOrderData);
          setOrderDataCopy((prev) => ({
            ...prev!,
            shipToAddressId: value.id,
            shippingAddress: {
              ...prev!.shippingAddress,
              to: value, // Correctly updating the 'to' property
            },
          }));

          break;
        case "billToAddressId":
          setOrderDataCopy((prev) => ({
            ...prev!,
            billToAddressId: value.id,
            billingAddress: {
              ...prev!.billingAddress,
              to: value, // Correctly updating the 'to' property
            },
          }));

          break;
        default:
          setOrderDataCopy((prev) => ({ ...prev!, [key]: value }));
          break;
      }
    },
    [fetchProduct, fetchTransporter, fetchCustomer]
  );
  // //update transport details
  // const updateTransportDetails = useCallback(
  //   (key: keyof Transport, value: any) => {
  //     setOrderDataCopy((prevOrderDataCopy) => {
  //       if (!prevOrderDataCopy) return null;
  //       return {
  //         ...prevOrderDataCopy,
  //         transport: { ...prevOrderDataCopy.transport, [key]: value },
  //       };
  //     });
  //   },
  //   [orderDataCopy]
  // );
  const fetchAndSetOriginalOrder = useCallback(
    async (orderId: number) => {
      try {
        // const response = await fetchData({ url: `/api/order/${orderId}` }); // Replace with your actual API endpoint
        const response = await fetchData({ url: `${getOrderById}${orderId}` }); // Replace with your actual API endpoint
        const orderData = response.result as OrderData; // Adjust type if necessary
        setOriginalOrderData((prev) => {
          return { ...prev, ...orderData, status: "", lastUpdatedBy: -1,ewayBillStatus: "NAVL" };
        });
        setOrderDataCopy((prev) => {
          return { ...prev, ...orderData,ewayBillStatus: "NAVL" };
        });
      } catch (error) {
        console.error("Error fetching order:", error); // Handle error appropriately (e.g., display an error message)
      }
    },
    [fetchData]
  );

  // Helper function to strip "read-only" properties
  const stripReadOnlyProperties = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map((item) => stripReadOnlyProperties(item));
    }

    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    const newObj: any = {};
    for (const key in obj) {
      if (obj[key] && typeof obj[key] === "object") {
        if (obj[key].type?.toLowerCase() !== "read-only") {
          newObj[key] = stripReadOnlyProperties(obj[key]);
        }
      } else {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };
  // Save Order API Call
  const saveOrder = useCallback(
    async (status: dsStatus) => {
      if (!orderDataCopy) return;
      // console.log("sAVEEEE", orderDataCopy);

      const dataToSend = stripReadOnlyProperties({
        ...orderDataCopy,
        status: status.toUpperCase(),
        createdBy: 3,
      });

      // console.log("sAVEEEE", dataToSend);
      try {
        await fetchData({
          url: saveOrderURL,
          method: "POST",
          dataObject: dataToSend,
        }).then((res) => {
          // console.log("res = ",res);
          if (res.code === 200) {
            setActionStatus({
              notiMsg: "Order Created Successfully",
              notiType: "success",
              showNotification: true,
            });
            showToaster("create-order-toaster");
            setTimeout(() => {
              goBack();
            }, closeTimeForSalesOrder);
          } else {
            setActionStatus({
              notiMsg: "Order could not be saved",
              notiType: "error",
              showNotification: true,
            });
            showToaster("create-order-toaster");
          }
        });

        // console.log("result  = ", result);
        //console.log("Order saved successfully");
      } catch (error) {
        // console.error("Error saving order:", error);
      }
    },
    [orderDataCopy, fetchData]
  );

  // Submit Order API Call
  const submitOrder = useCallback(async () => {
    if (!originalOrderData || !orderDataCopy) return;
    // console.log("original data = ", originalOrderData);
    // console.log("order data copy = ", orderDataCopy);
    const patches = generatePatchDocument(originalOrderData, {
      ...orderDataCopy,
      status: DsStatus.SBMT.toUpperCase(),
      lastUpdatedBy: 3,
    });
    // console.log("patch data = ", patches);

    try {
      await fetchData({
        url: `${saveOrderURL}s/${orderDataCopy.id}`,
        method: "PATCH",
        dataObject: patches,
      }).then((res) => {
        if (res.code === 200) {
          setActionStatus({
            notiMsg: "Order Submitted Successfully",
            notiType: "success",
            showNotification: true,
          });
          showToaster("create-order-toaster");
          setOriginalOrderData({
            ...orderDataCopy,
            status: "",
            lastUpdatedBy: -1,
          });
        } else {
          setActionStatus({
            notiMsg: "Order could not be send for submit",
            notiType: "error",
            showNotification: true,
          });
          showToaster("create-order-toaster");
        }
      });

      //console.log("Order updated successfully");
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  }, [originalOrderData, orderDataCopy, fetchData, generatePatchDocument]);

  // Update Order API Call
  const updateOrder = useCallback(async () => {
    if (!originalOrderData || !orderDataCopy) return;
    // console.log("original data = ", originalOrderData);
    // console.log("order data copy = ", orderDataCopy);

    const patches = generatePatchDocument(originalOrderData, {
      ...orderDataCopy,
      lastUpdatedBy: 3,
    });
    // console.log("patch data = ", patches);

    try {
      await fetchData({
        url: `${saveOrderURL}s/${orderDataCopy.id}`,
        method: "PATCH",
        dataObject: patches,
      }).then((res) => {
        if (res.code === 200) {
          setActionStatus({
            notiMsg: "Order Updated Successfully",
            notiType: "success",
            showNotification: true,
          });
          showToaster("create-order-toaster");
          setOriginalOrderData({
            ...orderDataCopy,
            status: "",
            lastUpdatedBy: -1,
          });
        } else {
          setActionStatus({
            notiMsg: "Order could not be updated",
            notiType: "error",
            showNotification: true,
          });
          showToaster("create-order-toaster");
        }
      });

      //console.log("Order updated successfully");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  }, [originalOrderData, orderDataCopy, fetchData, generatePatchDocument]);

  const value: OrderDataContextType = {
    actionStatus,
    originalOrderData,
    orderDataCopy,
    updateShippingFromAddress,
    updateShippingToAddress,
    updateBillingFromAddress,
    updateBillingToAddress,
    updateOrderDataField,
    addOrderItem,
    updateOrderItem,
    removeOrderItem,
    saveOrder,
    submitOrder,
    updateOrder,
    fetchAndSetOriginalOrder,
  };

  return (
    <OrderDataContext.Provider value={value}>
      {children}
    </OrderDataContext.Provider>
  );
};

// Create custom hook
export const useOrderData = () => {
  const context = useContext(OrderDataContext);
  if (!context) {
    throw new Error("useOrderData must be used within a OrderDataProvider");
  }
  return context;
};
