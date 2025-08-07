export const calculateBasicValue = (
    MRP: string | number,
    dispatchQuantity: string | number
  ) => {
    return Number(MRP ?? 0) * Number(dispatchQuantity ?? 0);
  };
   
  export const calculateDiscountQuantity=(discountPercent:number|string,dispatchQuantity:string|number)=>{
   
    return Number(discountPercent ?? 0) * Number(dispatchQuantity ?? 0);
   
  };
   
  export const calculateBonusAmount = (
    bonusQuantity: string | number,
    MRP: string | number
  ) => {
    return Number(bonusQuantity ?? 0) * Number(MRP ?? 0);
  };
   
  export const calculateDiscountAmount = (
    discountQuantity: string | number,
    actualAmount: string | number
  ) => {
    return Number(discountQuantity ?? 0) * Number(actualAmount ?? 0);
  };
   
  export const calculateNetAmount = (
    basicValue: string | number,
    bonusAmount: string | number,
    discountAmount: string | number
  ) => {
    return (
      Number(basicValue ?? 0) -
      (Number(bonusAmount ?? 0) + Number(discountAmount ?? 0))
    );
  };
   
  export const calculateEsvAmount = (
    basicAmount: string | number,
    discountAmount: string | number
  ) => {
    return Number(basicAmount ?? 0) - Number(discountAmount ?? 0);
  };
   
  export const calculateNetMrp = (
    mrpRate: string | number,
    gstPercent: string | number
  ) => {
    return (Number(mrpRate ?? 0) / Number(gstPercent ?? 0)) * 100;
  };
   
  export const calculatePriceToRetailer = (netMrp: string | number) => {
    return (Number(netMrp ?? 0) * 20) / 100;
  };
   
  export const calculatePriceToStockiest = (PTR: string | number) => {
    return (Number(PTR ?? 0) * 10) / 100;
  };
   
  export const calculateCashDiscountAmount = (
    cashDiscountPercentage: string | number,
    basicValue: string | number
  ) => {
    return Number(cashDiscountPercentage ?? 0) * Number(basicValue ?? 0);
  };
   
  export const calculateIGSTAmount = (
    totalAmount: string | number,
    igstPercent: string | number
  ) => {
    return (Number(totalAmount) * Number(igstPercent) / 100);
  };
   
  export const calculateCGSTAmount = (
    totalAmount: string | number,
    cgstPercent: string | number
  ) => {
    return (Number(totalAmount) * Number(cgstPercent) / 100);
  };
   
  export const calculateSGSTAmount = (
    totalAmount: string | number,
    sgstPercent: string | number
  ) => {
    return (Number(totalAmount) * Number(sgstPercent) / 100);
  };
   