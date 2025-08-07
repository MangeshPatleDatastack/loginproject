import React from "react";
import { dsStatus } from "./constant";

// import dsStatus from "./constant";

export interface NavProp extends DSButtonProps {
  location?: string;
  children?: React.ReactNode;
}
export interface DetailProp {
  detailOf?: string;
  children?: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  style?: string;
  value?: string | number;
}
export interface advancedFilterComponent {
  id?: string;
  className?: string;
  columns?: tcolumn[];
  rows: DsTableRow[];
  filterTypes: filterType[];
  customAttributes?: Record<string, string | number | boolean>;
  handleApplyFilter?: (
    e: React.MouseEvent<HTMLElement>,
    rows: DsTableRow[]
  ) => void;
}

export interface AccordionProps {
  id: string;
  title: string; // The title of the accordion
  children: string | React.ReactElement; // The content inside the accordion, can be a string or a React element
}

export interface DSButtonProps {
  children?: React.ReactNode;
  id?: string;
  label?: string;
  tooltip?: string;

  type?:
  | "standard"
  | "split"
  | "toggle"
  | "icon_image"
  | "button_icon"
  | "upload"
  | "tab"
  | "count"
  | "round";
  buttonSize?: "btnSmall" | "btnMedium" | "btnLarge";
  iconSize?: "iconSmall" | "iconMedium" | "iconLarge";
  buttonColor?:
  | "btnPrimary"
  | "btnSecondary"
  | "btnDanger"
  | "btnWarning"
  | "btnDark"
  | "btnInfo";
  buttonViewStyle?: "btnText" | "btnContained" | "btnOutlined";
  disable?: boolean;
  className?: string;
  count?: string | "00";
  position?: "top" | "left" | "bottom" | "right";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  img?: string;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  spliticon?: React.ReactElement;
  onHover?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
  onBlur?: (e: React.MouseEvent<HTMLElement>) => void;
  handelSplitClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface DSButtonGroupProps {
  children?: React.ReactNode;
  id?: string;
  label?: string;
  tooltip?: string;
  type?: string;
  buttonSize?: "btnSmall" | "btnMedium" | "btnLarge";
  iconSize?: "iconSmall" | "iconMedium" | "iconLarge";
  buttonColor?:
  | "btnPrimary"
  | "btnSecondary"
  | "btnDanger"
  | "btnWarning"
  | "btnDark"
  | "btnInfo";
  className?: string;
  img?: string;
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  spliticon?: React.ReactElement;
  onHover?: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface Ds_Tablemenu_Props {
  type?: string;
  position?: "top" | "center" | "bottom";
}

export interface CheckboxProp {
  id: string;
  className?: string;
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
  isChecked?: boolean;
  isAriaChecked?: boolean;
  ariaChecked?: boolean | "mixed";
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onChange?: (
    e:
      | React.MouseEventHandler<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export interface ContextMenuProps {
  id: string; // Unique ID for the context menu
  content?: string | React.ReactElement; // Content to be displayed in the context menu
  showArrow: boolean; // Whether to display an arrow pointing to the target element
}

//remaining
export interface DeviationProps {
  Title: string | React.ReactNode; // Title of the deviation
  Reasons: string[]; // Array of reasons for the deviation
  status: string; // The current status of the deviation
  Actions?: React.ReactNode[]; //array of actions to be displayed
  type?: string;
}
export interface DeviationVariationProps {
  Title: string; // Title of the deviationvariation
  Reasons: string[]; // Array of reasons for the deviationvariation
  status: string; // The current status of the deviationvariation
}
export interface DocumentSelectorProps {
  headerTitle: string;
  headerNumber: string;
  initialDocuments: string[];
}
export interface addressProps {
  address: string; // User's location
}

export interface InfoCardProps {
  title: string; // The title of the info card
  quantity: string; // The quantity value displayed in the info card
  Subquantity?: string; // Optional subquantity value to display
  startIcon?: React.ReactElement; // Optional icon displayed in the card,for non-highlighted state
  startIconwhite?: React.ReactElement; // Optional white icon for highlighted state
  startIcondisable?: React.ReactElement; // Optional icon for disabled state
  Highlight: boolean; // Highlight to decide whether to highlight the card or not
  type?: "Active" | "disabled"; // Type of the info card, either "Active" or "disabled"
  classForQuantity?: string; // Optional custom CSS class for the quantity display
  onClick?: (e: React.MouseEvent<HTMLElement>) => void; // Optional click event handler
  onHover?: (e: React.MouseEvent<HTMLElement>) => void; // Optional hover event handler
  handleMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void; // Optional mouse leave event handler
}

export interface dsInputTypeRangeProps {
  id: string;
  columnIndex: number;
  className: string;
  minValue: number;
  maxValue: number;
  leftLabel: string;
  rightLabel: string;
  onChange: (
    rangeValues: { min: number; max: number },
    columnIndex: number
  ) => void;
}
export interface locationProps {
  id: string; // User's location
  location: location;
}
export interface DsPaneProps {
  id?: string;
  type?: "inset" | "overlay";
  side?: "left" | "right";
  className?: string;
  title?: string;
  width?: string;
  isBackdrop?: boolean;
  paneMenus?: React.ReactNode;
  children?: React.ReactNode;
  onClose?: () => void;
}

export interface DsPopupProps {
  id: string;
  type?: "standard" | "document" | "upload";
  size?: "small" | "medium" | "large";
  position?: "top" | "center";
  className?: string;
  title: string;
  children: React.ReactNode;
}

export interface PaneOpenButtonProps extends DSButtonProps {
  paneId: string;
}
export interface PopupOpenButtonProps extends DSButtonProps {
  children?: React.ReactNode;
  id?: string;
  popupId: string;
  buttonText?: string;
  className?: string;
  img?: string;
  beforeIcon?: React.ReactElement;
  afterIcon?: React.ReactElement;
  onHover?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface DsOptionProps {
  selectId?: string;
  id?: string;
  label?: string;
  isOpen: boolean;
  options: DsSelectOption[];
  onSelect: (value: DsSelectOption) => void;
  selectedOption?: DsSelectOption;
  isSearchable: boolean;
}

export interface DsSelectOption {
  label: string;
  value: string | DsSelectOption[];
}
export interface RadioCheckOption {
  customAttribute?: Record<string, string>;
  id: string;
  type: "radio" | "checkbox";
  value: string;
  code: string;
  className?: string;
  selectedOption?: string[];
}
export interface SelectProps {
  id: string;
  options: DsSelectOption[];
  type: "single" | "multi" | "twolevel";
  placeholder: string;
  label?: string;
  disable?: boolean;
  customAttributes?: Record<string, string>;
  starticon?: React.ReactElement;
  className?: string;
  isSearchable?: boolean;
  onChange?: (e: React.FormEvent<HTMLElement>) => void;
  setSelectOptions?: (options: DsSelectOption[]) => void;
}
export interface SpotlightSearchProps {
  data: string[];
  handleKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  inputId: string;

  className: string;
  customAttributes?: Record<string, string>;
}
export interface DsStatusIndicatorProps {
  status?: orderStatus;
  className?: string;
  id?: string;
  label?: string;
  type?: string;
  status_icon?: React.ReactElement;
  btn_label?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onHover?: (e: React.MouseEvent<HTMLElement>) => void;
  tooltip?: string;
  positionProp?: "top" | "bottom" | "left" | "right";
  showArrow?: boolean;
  comment?: string;
}
export interface countProps {
  Title: string; // The title of the summary
  Value: string; // The overall value for the summary
  statusValues: Array<{
    addimage: any; status?: string; value?: string 
}>; // An array of objects containing status and its respective value
}
export interface countVariationProps {
  Title: string; // The title of the summary
  Value: string; // The overall value for the summary
  statusValues: Array<{ status: string; value: string }>; // An array of objects containing status and its respective value
}
export interface Ds_Tablemenu_Props {
  type?: string;
  position?: "top" | "center" | "bottom";
}

export interface TabsProps {
  selectedTabId: string;
  tabs: tab[];
  children: React.ReactNode;
  menus?: React.ReactNode;
}

export interface tab {
  tabId: string;
  tabName: string;
  count?: number | "00";
  disable?: boolean;
  customAttributes?: Record<string, string | number | boolean>;
  onClick?: (tab: tab) => void;
}
export interface TabNavProps {
  selectedTabId: string;
  tabs: tab[];
  menus?: React.ReactNode;
}

export interface TabContextType {
  selectedTabId: string;
  setSelectedTabId: React.Dispatch<React.SetStateAction<string>>;
  //   tabs: string;
  //   setTabs: Dispatch<SetStateAction<string>>;
}
export interface TabsProviderProps {
  children: React.ReactNode;
}
export interface TabProps {
  tabId: string;
  children: React.ReactNode;
}

export interface datalistOptions {
  //datalist attributes
  attributes: Record<string, string>;
  id: string;
  value?: string;
  secondaryValue?: string | React.ReactNode;
}

export interface InputTextAreaProps {
  //input textfield and textArea propes
  handleInputChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLElement>) => void;
  onDoubleClick?: (e: React.MouseEvent<HTMLElement>) => void;
  handleKeyUp?: (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  Onmousehover?: (
    e: React.MouseEvent<HTMLTextAreaElement | HTMLFieldSetElement>
  ) => void;
  onMouseOver?: (
    e: React.MouseEvent<HTMLTextAreaElement | HTMLFieldSetElement>
  ) => void;
  onMouseOut?: (
    e: React.MouseEvent<HTMLTextAreaElement | HTMLFieldSetElement>
  ) => void;
  onOptionSelect?: (e: React.MouseEvent<HTMLElement>) => void;
  options?: datalistOptions[];
  id?: string;
  className?: string;
  placeholder?: string | undefined;
  label?: string;
  initialValue?: string;
  dataListId?: string;
  disable?: boolean;
  customAttributes?: Record<string, string>;
  type?: "singleline" | "multiline";
  showshadow?: "shadow" | " ";
  inputType?: "text" | "number";
  starticon?: React.ReactElement;
  iconEnd?: React.ReactElement;
  rows?: number;
  cols?: number;
  minRows?: number;
}
export interface ToasterProps {
  id?: string;
  message: string;
  isOkayButton?: boolean;
  type: "success" | "bonus" | "info" | "error" | "cross";
  handleClose: () => void;
  position:
  | "top"
  | "topleft"
  | "topright"
  | "middle"
  | "bottom"
  | "bottomleft"
  | "bottomright";
  duration?: number;
}
export interface menuprops {
  column: tcolumn;
  className: string;
  children?: React.ReactNode;
  sortDataOnlyOnSpecifiedColumn: (columnIndex: number) => void;
  clearSortOnColumn: (e: React.MouseEvent, columnIndex: number) => void;
  sortDataUsingInputValueOnlyOnSpecifiedColumn: (
    e: React.ChangeEvent<HTMLElement>,
    columnIndex?: number
  ) => void;
  manageColumns?: () => void;
  hideShowColumn: (columnIndex: string | number) => void;
  sortTableOnNumber?: (columnIndex: number, sortType: "ASC" | "DESC") => void;
}

export interface tbodyprops {
  className: string;
  children?: React.ReactNode;
}
export interface tdprops {
  className: string;
  children?: React.ReactNode;
  content?: string | React.ReactNode;
  filterValue?: string | number;
  type: string;
  colSpan?: number;
  rowSpan?: number;
  rowIndex: number;
  columnIndex: number;
  isEditable?: boolean;
  hasComponent?: boolean;
  componentType?: string;
  isInputRequired?: boolean;
  isDataListRequired?: boolean;
  options?: datalistOptions[];
  alignment?: "left" | "right" | "center";
  handleValueUpdation?: (
    e: React.MouseEvent<HTMLElement>,
    rowIndex: number,
    columnIndex: number,
    value: string | number
  ) => void;
  onClick?: (rowIndex: number, columnIndex: number) => void;
  handleMouseOver?: (e: React.MouseEvent<HTMLElement>) => void;
  customAttributes?: Record<string, string | number | boolean>;
}
export interface trprops {
  type?: "InterActive" | "NonInterActive";
  className?: string;
  children?: React.ReactNode;
  content?: string;
  rowIndex: number;
  onRowClick?: (e: React.MouseEvent<HTMLElement>, rowIndex: number) => void;
  handleRowDoubleClick?: (
    e: React.MouseEvent<HTMLElement>,
    rowIndex: number
  ) => void;
  handleRowRightClick?: (
    e: React.MouseEvent<HTMLElement>,
    rowIndex: number
  ) => void;
  handleRowHover?: (e: React.MouseEvent<HTMLElement>, rowIndex: number) => void;
  handleRowHoverOut?: (
    e: React.MouseEvent<HTMLElement>,
    rowIndex: number
  ) => void;
  customAttributes?: Record<string, string | number | boolean>;
}
export interface tfooterprops {
  className: string;
  children?: React.ReactNode;
  type?: string;
}
export interface thprops {
  className: string;
  children?: React.ReactNode;
  content?: string | React.ReactNode;
  columnHeader?: React.ReactNode | string;
  columnIndex?: number;
  type?: "InterActive" | "NonInterActive" | string;
  alignment?: "left" | "right" | "center";
  customAttributes?: Record<string, string | number | boolean>;
}
export interface theaderprops {
  className: string;
  children?: React.ReactNode;
  type?: string;
}
export interface TableComponentProps {
  className: string;
  id: string;
  sort?: columnSort[];
  type?: "InterActive" | "NonInterActive";
  isSelectAble?: boolean; //second column checkbox
  hasIcons?: boolean; //first column
  isCheckBoxVisible?: boolean;
  isSortable?: boolean;
  hasSearch?: boolean;
  isEditable?: boolean;
  isFooterRequired?: boolean;
  columns: tcolumn[];
  rows: DsTableRow[];
  footer?: string | number | React.ReactNode;
  handleValueUpdation?: (
    e: React.MouseEvent<HTMLElement>,
    rowIndex: number,
    columnIndex: number,
    value: string
  ) => void;
  handleCheckboxClick?: (
    e: React.MouseEvent<HTMLElement>,
    rowIndex: number,
    isChecked: boolean
  ) => void;
  handleAddIcon?: (rowIndex: number) => React.ReactNode;
  handleRowClick?: (e: React.MouseEvent<HTMLElement>, rowIndex: number) => void;
  handleRowDoubleClick?: (
    e: React.MouseEvent<HTMLElement>,
    rowIndex: number
  ) => void;
  handleRowRightClick?: (
    e: React.MouseEvent<HTMLElement>,
    rowIndex: number
  ) => void;
  handleRowHover?: (e: React.MouseEvent<HTMLElement>, rowIndex: number) => void;
  handleRowHoverOut?: (
    e: React.MouseEvent<HTMLElement>,
    rowIndex: number
  ) => void;
  handleCellClick?: (rowIndex: number, columnIndex: number) => void;
  customAttributes?: Record<string, string | number | boolean>;
}
export interface menuprops {
  column: tcolumn;
  className: string;
  children?: React.ReactNode;
  sortDataOnlyOnSpecifiedColumn: (columnIndex: number) => void;
  clearSortOnColumn: (e: React.MouseEvent, columnIndex: number) => void;
  sortDataUsingInputValueOnlyOnSpecifiedColumn: (
    e: React.ChangeEvent<HTMLElement>,
    columnIndex?: number
  ) => void;
  manageColumns?: () => void;
  hideShowColumn: (columnIndex: string | number) => void;
  sortTableOnNumber?: (columnIndex: number, sortType: "ASC" | "DESC") => void;
}
export interface filterComponentProps {
  column: tcolumn;
  sortDataUsingInputValueOnlyOnSpecifiedColumn: (
    e: React.ChangeEvent<HTMLElement>,
    columnIndex: number
  ) => void;
}

export interface MenuDividerProps {
  classNames?: string;
}

export interface RadioCheckProps {
  groupName: string;
  options: RadioCheckOption[];
  selectedOption?: string[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface sortprops {
  columnIndex: number;
  sortTable: (
    e: React.MouseEvent,
    columnIndex: number,
    type: "ASC" | "DESC"
  ) => void;
}
export interface MenuItemProps {
  children?: React.ReactNode;
  id?: string;
  menu?: string;
  classNames?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
export interface userprops {
  user: {
    // Defining the structure of the user object
    name: string; // User's name
    email: string; // User's email
    Id: string; // User's unique ID
    Company: string; // User's company
    Department: string; // User's department
    Location: string; // User's location
  };
  onProfileClick: () => void;
  // A function to handle the click event when the profile is clicked
}
//
export interface ApplicationProps {
  children: React.ReactNode;
  appMenu?: React.ReactNode;
  hasPrevious?: boolean;
  appTitle: string;
  tabs?: tab[];
  selectedTabId?: string;
  isDataTable?: boolean;
  tabLevelMenu?: React.ReactNode;
}

export interface ApplicationHeaderProps {
  children: React.ReactNode;
  appTitle: string;
  hasPrevious: boolean;
}
export interface demoProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}
export interface ElLayoutProps {
  children: React.ReactNode;
}

//table

export class tcolumn {
  columnIndex?: number = 1;
  className?: string;
  columnHeader: React.ReactNode | string = "";
  isHidden?: boolean = false;
  sort?: string;
  columnContentType?: string;
  customAttributes?: Record<string, string | number | boolean>;
  alignment?: "center" | "right" | "left";
  hasSort?: boolean = false;
}

export class cellData {
  columnIndex?: number = 1;
  className?: string;
  content?: React.ReactNode | string | number |React.ReactElement;
  filterValue?: string | number;
  contentType?: string;
  colSpan?: number = 1;
  rowSpan?: number = 1;
  onHover?: (e: React.MouseEvent<HTMLElement>) => void;
  isInputRequired?: boolean = false;
  isDataListRequired?: boolean = false;
  alignment?: "left" | "right" | "center";
  customAttributes?: Record<string, string | number | boolean>;
  editableContent?: string | undefined;
}
export class tableData {
  [x: string]: any;
  className: string = "";
  id: string = "";
  type: "InterActive" | "NonInterActive" = "InterActive";
  isSortable: boolean = false;
  hasSearch: boolean = false;
  columns: tcolumn[] = [];
  rows: DsTableRow[] = [];
}

export class DsTableRow {
  rowIcon?: React.ReactNode;
  rowIndex: number = 1;
  className?: string;
  content?: cellData[];
  customAttributes?: Record<string, string | number | boolean>;
  tag?: string;
}

export class filterType {
  columnIndex: number = 0;
  columnHeader: React.ReactNode | string = "";
  filterType: string = "";
}

export class DsFilterValues {
  columnIndex: number = 0;
  columnHeader: string = "";
  values: any[] = [];
}

export class columnSort {
  columnIndex?: number;
  columnHeader?: string;
  sortType: "ASC" | "DESC" | "NONE" = "NONE";
}

export class selectOptions {
  label?: string;
  value?: string;
}

export type InitState = {
  rows: DsTableRow[];
};

// types
export type bankDetail = {
  name: string;
  accountNumber: string;
  ifscCode: string;
  branchName: string;
};
export type address = {
  id: number;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  state: string;
  pinCode: string;
  isPrimary: string;
};
export type location = {
  id: number;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  city: string;
  state: string;
  pinCode: string;
  isPrimary: string;
};

export type customer = {
  id: number;
  name: string;
  code: string;
  panNumber: string;
  gstInNumber: string;
  drugLicenseNumber: string;
  fdaLicenseNumber: string;
  fssaiLicenseNumber: string;
  drugExpiryDate: string;
  fdaExpiryDate: string;
  fssaiExpiryDate: string;
  address: address;
  bank: bankDetail;
};
export type tieUpProduct = {
  productId: number;
  productCode: string;
  productName: string;
  batchId: number;
  batchNumber: string;
  expiryDate: string;
  quantity?: number;
};
export type product = {
  id: number;
  name?: string;
  code?: string;
  discountPercent?: number;
  dispatchQuantity?: number;
  mrpRate?: string | undefined;
  cartonSize?: number;
  quantity?: number;
  batchId?: number;
  batchNumber?: string;
  expiryDate?: string;
  requestedExpiryDays: number;
  basicValue?: number;
  specialRate?: string;
  salesQuantity?: number;
  mrp?: number;
  netAmount?: number;
  esvAmount?: number;
  bonusQuantity?: number;
  igstValue?: number;
  cgstValue?: number;
  sgstValue?: number;
  hsnCode?: string;
  isSampleProduct?: string;
  tieUpProduct?: tieUpProduct;
};
export type addressToFrom = {
  to: location;
  from: location;
};
export type orderStatus = {
  allocationStatus: string;//
  orderStatus: dsStatus;
  messageType: string;
  message: string;
  statusValue: dsStatus;
};
export type transport = {
  transporterId: string | number;
  transporterName: string;
  mode: string;
  vehicleType: string;
  vehicleNumber: string;
  transporterDocumentNumber: string;
  transportationDate: string;
};
export type licenseExpiry = {
  customerId: number;
  licenseNumber: string;
  expiryDate: string;
  displayMessage: string;
  isExpired: boolean;
};
export type validations = {
  basic: {
    drugLicenseExpiry: licenseExpiry;
    fdaLicenseExpiry: licenseExpiry;
    foodLicenseExpiry: licenseExpiry;
    flag: boolean;
  };
  credit: {
    overDue: {
      message: string;
      flag: boolean;
    };
    creditLimit: {
      value: number;
      limit: number;
      flag: boolean;
    };
  };
};
export type combinedOrder = {
  orderId: number;
  purchaseOrderNumber: string;
  purchaseOrderDate: string;
  itemsCount: number;
};
export type newOrder = {
  orderId: number;
  // orderType: string;
  // orderDate: string;
  purchaseOrderNumber: string;
  purchaseOrderDate: string;
  customer: customer;
  orderItems: orderItems[];
  shipping: addressToFrom;
  billing: addressToFrom;
  transport?: transport;
  validations?: validations;
  status?: string;
  combinedOrders?: combinedOrder[];
};
export type order = {
  id: number;
  type: "Trade" | "Institutional" | "Corporate";
  orderDate: string;
  purchaseOrderNumber: string;
  purchaseOrderDate: string;
  status: orderStatus;
  customer?: customer;
  orderItems?: orderItems[];
  shipping?: addressToFrom;
  billing?: addressToFrom;
  transport?: transport;
  combineOrders?: combinedOrder[];
  source?: string;
  netAmount?: number; //order log
  grossAmount?: number; //order log
  invoiceId?: string; //order log
};
export type orderItems = {
  transactionType?: "CREATE" | "UPDATE";
  orderItemId?: number;
  productId: number;
  productCode?: string;
  productName?: string;
  cartonSize?: number;
  quantity?: number;
  batchId?: number;
  batchNumber?: string;
  expiryDate?: string;
  basicValue?: number;
  specialRate?: string;
  salesQuantity?: number;
  dispatchQuantity?: number;
  mrp?: number;
  netAmount?: number;
  esvAmount?: number;
  bonusQuantity?: number;
  igstValue?: number;
  cgstValue?: number;
  sgstValue?: number;
  hsnCode?: string;
  isSampleProduct?: string;
  tieUpProduct?: tieUpProduct;
  requestedExpiryDays: number;
  requestedQuantity: number;
};
export type saveOrder = {
  transaction_type: "CREATE" | "UPDATE";
  orderId?: number;
  orderType: "TRADE" | "INSTITUTIONAL";
  customerId: number;
  // createdBy: number;
  purchaseOrderNumber: string;
  purchaseOrderDate: string;
  status?: string;
  billingAddress: {
    toLocationId: number;
    fromLocationId: number;
  };
  shippingAddress: {
    toLocationId: number;
    fromLocationId: number;
  };
  transportDetails?: {
    transporterId?: number | null;
    mode?: string | null;
    transportDate?: string | null;
    vehicleType?: string | null;
    vehicleNumber?: string | null;
    transporterDocumentNumber?: string | null;
  };
  orderItems: saveOrderItem[];
  deleteOrderItemIds?: number[];
};
export type saveOrderItem = {
  productId: number;
  requestedExpiryDays: number;
  quantity: number;
  batchId?: number;
  salesQuantity?: number;
  dispatchQuantity?: number;
  expiryDate?: string;
};
export interface CurrencyProps {
  format: "IND" | "UK";
  id: string;
  amount: number;
  type: "short" | "full";
}

// export interface Order {
//   status: {
//     orderStatus: string;
//     messageType: string;
//     message: string;
//     statusValue: string;
//   };
//   label: string;
// }

export interface FetchDataProps {
  url: string;
  method?: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
  dataObject?: unknown;
}

export interface correctSignProps {
  handleOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
export interface DsSummaryViewProps {
  data: any; // Accept data as a prop
}
export interface DsStockistViewProps {
  data: any; // Accept data as a prop
}
export interface CplProps {
  ids: number[];
}

export interface DsCorrectSignProps {
  handleOnClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
// export interface DsCplHeaderProps{

// }

export interface cplmenu {
  id: number;
  name: string;
}

export interface TotalValuesProps {
  data: Array<order>;
}
export interface TotalOrdersProps {
  data: Array<order>;
}



export type createOrderItems = {
  productId: number;
  requestedQuantity?: number;
  requestedExpiryDays?: number;
};

export type createOrder = {
  // transaction_type: "CREATE" | "UPDATE";
  orderType: "TRADE" | "INSTITUTIONAL";
  orderId?: number;
  customerId: number;
  purchaseOrderNumber: string;
  purchaseOrderDate: string;
  createdBy: number;
  status?: string;
  billingAddress: {
    toLocationId: number;
    fromLocationId: number;
  };
  shippingAddress: {
    toLocationId: number;
    fromLocationId: number;
  };
  transportDetails?: transport;
  orderItems: createOrderItems[];
  // deleteOrderItemIds?: number[];
};
export type getProduct = {
  id: number;
  code: string;
  name: string;
  cartonSize: number;
  basicRate: number;
  mrpRate: number;
};
export type searchTransport = {
  id: number;
  code: string;
  name: string;
};
export type searchProducts = {
  id: number;
  code: string;
  name: string;
  batchNumber: string;
  quantity: number;
};

export type License = {
  licenseName: string;
  licenseNumber: string;
  expirationDate: string;
  expirationStatus: string;
};

export type BasicCheck = {
  license: License[];
};

export type CreditCheck = {
  creditLimit: number;
  creditUsed: number;
  totalSales: number;
  avgPaymentDays: number;
  category: string;
};

export type BasicCreditData = {
  customerId: number;
  flag: boolean;
  basicCheck: BasicCheck;
  license: License[];
  creditCheck: CreditCheck;
};

export type DeviationData = {
  code: number;
  message: string;
  result: BasicCreditData;
  error: null | string;
};


export type previous =
  | "Under Review"
  | "Under Approval"
  | "Approved"
  | "Draft"
  | "Cancelled"
  | "Submit"
  | "Ready to dispatch ";

export type current =
  | "Under Review"
  | "Under Approval"
  | "Approved"
  | "Draft"
  | "Cancelled"
  | "Submit"
  | "Ready to dispatch ";
export interface menuprops {
  column: tcolumn;
  className: string;
  children?: React.ReactNode;
  sortDataOnlyOnSpecifiedColumn: (columnIndex: number) => void;
  clearSortOnColumn: (e: React.MouseEvent, columnIndex: number) => void;
  sortDataUsingInputValueOnlyOnSpecifiedColumn: (
    e: React.ChangeEvent<HTMLElement>,
    columnIndex?: number
  ) => void;
  manageColumns?: () => void;
  hideShowColumn: (columnIndex: string | number) => void;
  sortTableOnNumber?: (columnIndex: number, sortType: "ASC" | "DESC") => void;
}



export type AllocationStatus =
  | "UNDER APPROVAL"
  | "DRAFT"
  | "APPROVED"
  | "REJECTED"
  | "NULLIFIED";

export type AllocationCategory =
  | "FINISHED_GOODS"
  | "NEW_PRODUCTS"
  | "PROMOTIONAL_SAMPLES";

export type TotalAllocationCounts = {
  [key in AllocationCategory]: {
    [status in AllocationStatus]?: number;
  };
};

export type stock = {
  allocationType: string;
  cycleLot: string | number | Date;
  id: number;
  stockAllocationRequestId: string;
  criticalStock: string;
  date: Date;
  fromOrganizationUnitName: string;
  toOrganizationUnitName: [];
  totalItems: number;
  allocationStatus: string;

  allocationTypeCounts: {
    FINISHED_GOODS: number;
    NEW_PRODUCTS: number;
    PROMOTIONAL_SAMPLES: number;
  };

  totalAllocationCounts: TotalAllocationCounts;

  correspondingSTOAndStatus: string;

  setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
  // setFilteredData: React.Dispatch<React.SetStateAction<stock[]>>;
};

// export type stock = {
//   allocationType: string;
//   cycleLot: string | number | Date;
//   id:number;
//   stockAllocationRequestId: string;
//   criticalStock: string;
//   date: Date;
//   fromOrganizationUnitName: string;
//   toOrganizationUnitName: [];
//   totalItems: number;
//   allocationStatus: string;
//   allocationTypeCounts: {
//     FINISHED_GOODS: number;
//     NEW_PRODUCTS: number;
//     PROMOTIONAL_SAMPLES: number;
//   };
//   totalAllocationCounts: {
//     FINISHED_GOODS :{};
//     NEW_PRODUCTS: number;
//     PROMOTIONAL_SAMPLES: number;
//   };
//   correspondingSTOAndStatus: string;

//   setIsFiltered: React.Dispatch<React.SetStateAction<boolean>>;
//   // setFilteredData: React.Dispatch<React.SetStateAction<stock[]>>;

// }

