// import { useState, useRef, useEffect } from "react";
// import { getOrderById, DsStatus } from "@/helpers/constant";
// import fetchData from "@/helpers/Method/fetchData";
// import { closeAllContext } from "@/Elements/DsComponents/dsContextHolder/dsContextHolder";
// import CustomerDetails from "./CustomerDetails";
// import ProductDetails from "./ProductDetails";
// import ShippingDetails from "./ShippingDetails";
// import TransporterDetails from "./TransportDetails";
// import {
//   customer,
//   DsSelectOption,
//   product,
//   transport,
//   location,
//   order,
//   orderItems,
//   saveOrder,
// } from "@/helpers/types";
// import pagestyles from "@/app/page.module.css";
// import styles from "@/app/order/order.module.css";
// import OrderFooter from "./orderFooter";
// import { combinedOrder, saveOrderItem } from "@/helpers/types";
// import React from "react";

// export interface orderIdPageProps {
//   orderId?: string | number;
//   orderStatus?: string;
//   combinedOrders?: combinedOrder[];
// }

// const OrderIdPage: React.FC<orderIdPageProps> = React.memo(({ orderId, orderStatus, combinedOrders }) => {
//   // const orderId: string | number = param?.params?.orderId; //dependeing on order Id specific pages will be displayed
//   //   //if orderId is new -> create new trade order page will be displayed
//   //   //if orderId is valid order id ## -> exsisting order page will be displayed
//   //   //if orderId is not valid -> Order Not Found Page will displayed

//   //   //order status
//   //   const orderStatus = param?.searchParams?.status;
//   // const [combinedOrders,setCombinedOrders] =useState<number>(0);//for creating purchase order component





//   const [displayFlag, setDisplayFlag] = useState<"New" | "Existing">(
//     "Existing"
//   ); //will only change on the orderId chnage any other change won't make any changes in this flag
//   const appTitle = useRef<string>("New"); //Page Title for the page -> New Order / Order <orderId> (<orderType>)

//   const [orderType, setOrderType] = useState<"TRADE" | "INSTITUTIONAL">(
//     "TRADE"
//   ); //Typed of Order ->B2B/B2C/...
//   const [order, setOrder] = useState<order>(); // All exsisting order data
//   const [selectedCustomer, setSelectedCustomer] = useState<customer>(); //If exsisting order is previously selected customer is populated

//   // If not User have to select the customer
//   const [purchaseOrderNo, setPurchaseOrderNo] = useState<string>();
//   const [purchaseOrderDate, setPurchaseOrderDate] = useState<string>();
//   const [customerLocations, setCustomerLocations] = useState<location[]>(); //location for shipping and billing addresses
//   const [locationOptions, setLocationOptions] = useState<DsSelectOption[]>([]);

//   //product details
//   const [productsDetails, setProductDetails] = useState<product[]>([]);
//   const [orderItems, setOrderItems] = useState<saveOrderItem[]>([]);

//   //shipping details
//   // const [selectedShippingLocation, setSelectedShippingLocation] = useState<location>(); //selected location for shipping
//   // const [shippingLocations, setShippingLocations] = useState<location>();
//   const [shippingFrom, setShippingFrom] = useState(1);
//   const [billingFrom, setBillingFrom] = useState(1);
//   const [shippingAddress, setShippingAddress] = useState<string>("");

//   //billing details
//   // const [billingLocations, setBillingLocations] = useState<location>();
//   const [billingAddress, setBillingAddress] = useState<string>("");
//   // const [selectedBillingLocation, setSelectedBillingLocation] =useState<location>(); //selected location for  billing
//   //transport details
//   const [transportDetails, setTransportDetails] = useState<transport>();

//   // const [notiType, setNotiType] = useState<
//   //   "success" | "bonus" | "info" | "error"
//   // >("success");
//   // const [notiMsg, setNotiMsg] = useState<string>("");
//   // const [showNotification, setShowNotification] = useState<boolean>(false);
//   // const [pos, setPos] = useState<
//   //   | "top"
//   //   | "topleft"
//   //   | "topright"
//   //   | "middle"
//   //   | "bottom"
//   //   | "bottomleft"
//   //   | "bottomright"
//   // >("top");

//   //save order function
//   const saveOrder = async () => {
//     const orderData: saveOrder = {
//       transaction_type: "CREATE",
//       orderId: Number(orderId),
//       orderType: orderType ?? "TRADE",
//       customerId: selectedCustomer?.id ?? 0,
//       // customerName: selectedCustomer?.name ?? "",
//       purchaseOrderNumber: purchaseOrderNo ?? "",
//       purchaseOrderDate: purchaseOrderDate ?? "",
//       billingAddress: {
//         toLocationId: parseInt(billingAddress),
//         fromLocationId: billingFrom,
//       },
//       shippingAddress: {
//         toLocationId: parseInt(shippingAddress),
//         fromLocationId: shippingFrom,
//       },
//       orderItems: orderItems,
//       deleteOrderItemIds: [],
//     };
//     //console.log("order data save = ", orderData);
//   };

//   //fetches existing order
//   const handleFetch = async (orderId: number) => {
//     await fetchData({
//       url: getOrderById,
//       //  + `/ ${orderId}`
//     }).then((res) => {
//       if ((res.statusCode = 200)) {
//         // //console.log("res result = ", res?.result);
//         setOrder(res?.result);
//         setSelectedCustomer(res?.result?.customer);
//         setDisplayFlag("Existing");
//         setPurchaseOrderNo(res?.result?.purchaseOrderNumber);
//         setPurchaseOrderDate(res?.result?.purchaseOrderDate);
//         // setCombinedOrders(res?.result?.combinedOrders?.length);   for creating purchase order component
//         const locationArray = [];
//         locationArray.push(res?.result?.shippingAddress?.to);
//         locationArray.push(res?.result?.billingAddress?.to);
//         locationArray.push(res?.result?.customer?.address);

//         setCustomerLocations(locationArray);
//         appTitle.current = `Order-${res?.result?.id} (${res?.result?.type})`;
//       }
//     });
//   };

//   useEffect(() => {
//     if (orderId?.toString() == "new") {
//       setDisplayFlag("New");
//       appTitle.current = "New Order";
//     } else if (Number(orderId) > 0) {
//       handleFetch(Number(orderId));
//     } else {
//       ////Page not Found
//     }
//   }, [orderId]);

//   useEffect(() => {
//     if (customerLocations) {
//       const l: DsSelectOption[] = customerLocations?.map((value) => {
//         return {
//           value: value?.id?.toString(),
//           label: `${value?.address1 ? value.address1 + ", " : ""}${value?.address2 ? value?.address2 + ", " : ""
//             }${value?.address3 ? value?.address3 + ", " : ""}${value?.address4 ? value?.address4 + ", " : ""
//             }${value?.city}, ${value?.state}, ${value?.pinCode}`,
//         };
//       });
//       setLocationOptions(l);
//     }
//   }, [customerLocations]);

//   //shipping details
//   // const shippingAdrressFrom =
//   //   order?.shipping?.from?.address1?.toString();
//   // //biling details
//   // const billingAddressFrom = order?.billing?.from?.address1?.toString();

//   // useEffect(()=>{
//   //   //console.log("shipping address = ",shippingAddress);
//   //   //console.log("billing address = ",billingAddress);
//   //   //console.log("customer  details = ",selectedCustomer);
//   //   //console.log("transport  details = ",transportDetails);
//   //   //console.log("customer  locations = ",customerLocations);
//   //   },[customerLocations,setCustomerLocations,setShippingAddress,setBillingAddress,shippingAddress,billingAddress,selectedCustomer,setSelectedCustomer,transportDetails,setTransportDetails])
//   // //console.log("order = ",order);

//   //console.log("order id = ", order);

//   return (
//     <>
//       <div className={pagestyles.container} onScroll={() => closeAllContext()}>
//         <CustomerDetails
//           combinedOrders={combinedOrders}//for creating purchase order component
//           customerDetails={selectedCustomer}
//           orderStatus={
//             order && order?.status?.statusValue
//               ? order?.status?.statusValue
//               : DsStatus.DRFT
//           }
//           purchaseOrderNo={purchaseOrderNo}
//           purchaseOrderDate={purchaseOrderDate}
//           setSelectedCustomer={setSelectedCustomer}
//           setPurchaseOrderNo={setPurchaseOrderNo}
//           setPurchaseOrderDate={setPurchaseOrderDate}
//           setCustomerLocations={setCustomerLocations}
//         ></CustomerDetails>
//         <ProductDetails
//           orderStatus={orderStatus}
//           productDetails={productsDetails}
//           setOrderItems={setOrderItems}
//         ></ProductDetails>

//         <div className={styles.shippingBillingDetails}>
//           <ShippingDetails
//             key={"Shipping"}
//             detailsOf={`Shipping`}
//             fromToLocations={locationOptions}
//             addressFrom={shippingFrom?.toString()}
//             setShippingAddress={setShippingAddress}
//           ></ShippingDetails>
//           <ShippingDetails
//             key={"Billing"}
//             detailsOf={`Billing`}
//             fromToLocations={locationOptions}
//             addressFrom={billingFrom.toString()}
//             setShippingAddress={setBillingAddress}
//           ></ShippingDetails>
//         </div>
//         <TransporterDetails
//           transportDetails={transportDetails}
//           setTransportDetails={setTransportDetails}
//         ></TransporterDetails>
//         <OrderFooter saveOrder={saveOrder} />
//       </div>
//     </>
//   );
// });

// export default OrderIdPage;
