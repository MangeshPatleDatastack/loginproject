import fetchData from "@/helpers/Method/fetchData";
import { datalistOptions } from "@/helpers/types";
import DsDataList, {
  DataListProps,
} from "@/Elements/DsComponents/DsInputs/dsDatalist";
import { debounce } from "@/helpers/Method/optimization";
import React from "react";


export interface searchProps extends DataListProps {
  options: datalistOptions[] | undefined;
  setOptions: (values: unknown[]) => void;
  setSearchUrl: (searchTerm: string) => string;
  setSelectedOption: (option: datalistOptions) => void;
}
const DsSearchComponent = ({
  id,
  placeholder,
  initialValue,
  label,
  className,
  containerClasses,
  dataListId,
  starticon,
  iconEnd,
  customAttributes,
  disable,
  onClick,
  onFocus,
  onBlur,
  onDoubleClick,
  onMouseOut,
  onMouseHover,
  onChange,
  options,
  onSaveButtonClicked,
  setOptions,
  setSearchUrl,
  setSelectedOption,
}: searchProps) => {
  const handleOnSelect = (option: datalistOptions) => {
    //console.log("opt i = ", option);
    if (option) {
      setSelectedOption(option);
    }
  };
  const handleKeyUp = debounce(async (e: React.KeyboardEvent<HTMLElement>) => {
    const input = e.target as HTMLInputElement;
    const searchTerm = input.value;
    if (searchTerm.trim().length > 2) {
      const URL = setSearchUrl(searchTerm);
      await fetchData({
        url: URL,
      }).then((data) => {
        // //console.log("result = ", data);
        if (data.code == 200) {
          setOptions(data.result);

        }
      });
    }
  }, 500);
  return (
    <DsDataList
    containerClasses={containerClasses}
      initialValue={initialValue}
      onSaveButtonClicked={onSaveButtonClicked}
      options={options}
      onOptionSelect={handleOnSelect}
      id={id}
      dataListId={dataListId}
      className={className}
      label={label}
      placeholder={placeholder}
      onMouseHover={(e) => {
        if (onMouseHover) onMouseHover(e);
      }}
      customAttributes={customAttributes ? customAttributes : undefined}
      disable={disable ? disable : undefined}
      onChange={(e) => {
        if (onChange) onChange(e);
      }}
      iconEnd={iconEnd ? iconEnd : undefined}
      onBlur={(e) => {
        if (onBlur) onBlur(e);
      }}
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
      onDoubleClick={(e) => {
        if (onDoubleClick) onDoubleClick(e);
      }}
      onFocus={(e) => {
        if (onFocus) onFocus(e);
      }}
      onMouseOut={(e) => {
        if (onMouseOut) onMouseOut(e);
      }}
      starticon={starticon ? starticon : undefined}
      onKeyUp={handleKeyUp}
    />
  );
};
export default DsSearchComponent;


