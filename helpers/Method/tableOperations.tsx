import DsStateChange from "@/Elements/DsComponents/dsStatus/dsStatusIndicator";
import { cellData, filterType, selectOptions, tcolumn, DsTableRow, DsSelectOption } from "@/helpers/types";
import React from "react";
import statusStyles from "@/Elements/DsComponents/dsStatus/dsStatus.module.css";
import Image from "next/image";
import commentIcon from "..//..//Icons/smallIcons/commenticon.svg"


export const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  
  export const convertToDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed
  };
  
  export const parseFormattedNumber = (value: string): number => {
    return Number(value?.replace(/,/g, "")); // Remove commas and convert to number
  };
  
  export const trackMergedCells = (rows: DsTableRow[]) => {
    const track: Array<[number, number]> = []; // Track row ranges for merged cells
  if(rows){

    rows.forEach((row, rowIndex) => {
      row.content?.forEach((cell) => {
        if (cell?.rowSpan ?? 1 > 1) {
          // If the cell has rowspan > 1, track its range
          track.push([rowIndex, rowIndex + (cell?.rowSpan ?? 1 ) - 1]);
        }
      });
    });
  }
  
    return track;
  };
  
  
  export const maintainMergedCells = (
    rows: DsTableRow[],
    ranges: number[][]
  ): DsTableRow[] => {
    const finalRows: DsTableRow[] = [];
    const includedRows = new Set<number>(); // To track rows that have already been added
  
    // Create a map for quick access to merged ranges
    const rangeMap = new Map<number, Set<number>>(); // Maps a rowIndex to its range
    ranges.forEach(([start, end]) => {
      const rangeSet = new Set<number>();
      for (let i = start; i <= end; i++) {
        rangeSet.add(i);
      }
      for (let i = start; i <= end; i++) {
        rangeMap.set(i, rangeSet);
      }
    });
  
    // Process rows in the given order
    [...rows].forEach((row) => {
      if (!includedRows.has(row?.rowIndex ?? 1)) {
        // Check if the row is part of a merged range
        const range = rangeMap.get(row?.rowIndex ??1);
        if (range) {
          // Add all rows in the merged range in their relative order
          range.forEach((index) => {
            if (!includedRows.has(index)) {
              const mergedRow = rows.find((r) => r.rowIndex === index);
              if (mergedRow) {
                finalRows.push(mergedRow);
                includedRows.add(index);
              }
            }
          });
        } else {
          // If not part of a range, add the row directly
          finalRows.push(row);
          includedRows.add(row?.rowIndex ??1);
        }
      }
    });
  // //console.log("final rows = " , finalRows)
    return finalRows;
  };
  
  export const maintainMergedCellsInputSearch = (
    rows: DsTableRow[],
    filteredRows: DsTableRow[],
    track: Array<[number, number]>
  ) => {
    let mergedRows: DsTableRow[] = [];
    const addedGroups = new Set<number>(); // To track merged groups already added
  
    if (rows && filteredRows && track.length>0) {
      // Iterate over filtered rows
      filteredRows.forEach((frow) => {
        // Find the corresponding original row by rowIndex
        const originalRow = rows.find((row) => row.rowIndex === frow.rowIndex);
  
        if (originalRow) {
          // Check if the rowIndex exists in the track (indicating it's part of a merged row)
          const mergedGroup = track.find(
            ([start, end]) => (frow.rowIndex ?? 1 ) >= start && (frow.rowIndex ?? 1) <= end
          );
  
          if (mergedGroup) {
            const [start, end] = mergedGroup;
  
            // Add the merged group only if it hasn't been added yet
            if (!addedGroups.has(start)) {
              const group = rows.filter(
                (row) => (row?.rowIndex ?? 1) >= start && (row?.rowIndex ?? 1) <= end
              );
              mergedRows.push(...group);
              addedGroups.add(start); // Mark this group as added
            }
          } else {
            // Add the single row if it's not part of a merged group
            mergedRows.push(frow);
          }
        }
      });
    }
    else{
      mergedRows=filteredRows;
    }
  
    // Return the array of merged rows
    return mergedRows;
  };
  
  
  // export const determineFilterType = (columns: tcolumn[]) => {
  //   const filterTypes: filterType[] = [{
  //     columnIndex: 0,
  //     columnHeader: undefined,
  //     filterType: ""
  //   }];
  //   let type = "";
  //   columns.map((col) => {
  //     if (col.columnContentType === "string") {
  //       type = "CSV";
  //     } else if (col.columnContentType === "number") {
  //       type = "NRF";
  //     } else if (col.columnContentType === "date") {
  //       type = "DRF";
  //     } else {
  //       type = "DDF";
  //     }
  //     const obj = {
  //       columnIndex: col.columnIndex,
  //       columnHeader: col.columnHeader,
  //       filterType: type,
  //     };
  //     filterTypes.push(obj);
  //   });
  //   return filterTypes;
  // };
  
  export const getSelectOptions = (columnIndex: number, rows: DsTableRow[]) => {
    const options: DsSelectOption[] = [];
    const addedValues = new Set<string>(); // To track unique content values
  
    [...rows].forEach((row) => {
      row.content?.forEach((cell) => {
        if (
          cell?.columnIndex === columnIndex &&
          !React.isValidElement(cell?.filterValue) // Ensure content is not a React element
        ) {
          const contentString = cell?.filterValue?.toString();
          if (contentString && !addedValues.has(contentString)) {
            options.push({
              label: contentString,
              value: contentString,
            });
            addedValues.add(contentString); // Mark this value as added
          }
        }
      });
    });
    //console.log("optionssss",options);
    return options;
  };
  
  
  export const getColSpan = (rows: DsTableRow[]): DsTableRow[] => {
    // Clone the rows array to avoid mutating the original
    const newRows = [...rows].map((row) => {
      // If row content is undefined, skip processing
      if (!row.content) return row;
  
      // Process each cell in the row
      row.content = row.content.map((cell, index, contentArray) => {
        // Set default columnIndex if undefined
        const currentColumnIndex = cell.columnIndex ?? index + 1;
  
        // Determine the columnIndex of the next cell (if it exists)
        const nextColumnIndex = contentArray[index + 1]?.columnIndex ?? currentColumnIndex + 1;
  
        // Calculate colSpan based on the difference between column indices
        const colSpan = nextColumnIndex - currentColumnIndex;
  
        // Return the updated cell with the calculated colSpan
        return {
          ...cell,
          columnIndex: currentColumnIndex, // Ensure columnIndex is set
          colSpan: colSpan > 1 ? colSpan : 1, // colSpan must be at least 1
        };
      });
  
      return row;
    });
  
    // //console.log(newRows);
    return newRows;
  };
  
  export const getRowSpan = ( rows: DsTableRow[]): DsTableRow[] => {
    // Clone the rows array to avoid mutating the original
    const newRows = [...rows].map((row, rowIndex) => {
      if (!row.content) return row; // Skip if row content is undefined
  
      // Process each cell in the row
      row.content = row.content.map((cell, colIndex) => {
        // Set default columnIndex if undefined
        const currentColumnIndex = cell.columnIndex ?? colIndex + 1;
  
        // Determine the rowSpan for the cell
        let rowSpan = 1;
  
        // Check subsequent rows to see if they share the same column index
        for (let i = rowIndex + 1; i < rows.length; i++) {
          const nextRow = rows[i];
  
          if (!nextRow.content) break;
  
          // Check if the cell in the same column matches the current columnIndex
          const overlappingCell = nextRow.content.find(
            (nextCell) => (nextCell.columnIndex ?? colIndex + 1) === currentColumnIndex
          );
  
          // If overlapping cell exists and its content is empty or "merges," increase rowSpan
          if (!overlappingCell || overlappingCell.content == null) {
            rowSpan++;
          } else {
            break; // Stop if there's content in the overlapping cell
          }
        }
  
        // Return the updated cell with the calculated rowSpan
        return {
          ...cell,
          columnIndex: currentColumnIndex, // Ensure columnIndex is set
          rowSpan: rowSpan > 1 ? rowSpan : 1, // rowSpan must be at least 1
        };
      });
  
      return row;
    });
  // //console.log(newRows);
    return newRows;
  };
  export const getIconValues = (rows: DsTableRow[]): DsSelectOption[] => {
    let iconOptions:DsSelectOption[] = [];
 
    rows?.forEach((row)=>
      {
      const value=  row?.customAttributes?.iconValue?.toString() ?? "";
      const findvalue = iconOptions.find((iconValue)=>iconValue?.value === value);
      if(findvalue === null || findvalue === undefined){
        iconOptions.push({label:value,value:value})
      }
    }
    )
     
    return iconOptions;
     
  };
   
  export const convertIntoRow = (data: any[]): DsTableRow[] => {
    let count = 0;
  
    if (data !== undefined && data !== null) {
      const rows: DsTableRow[] = [];
  
      data.forEach((element) => {
        const content: cellData[] =
          element.content?.map((cell: any) => ({
            columnIndex: count++,
            className: cell.className || "",
            content: cell.content || "",
            contentType: cell.contentType || "text",
            colSpan: cell.colSpan || 1,
            rowSpan: cell.rowSpan || 1,
          })) || [];
  
        rows.push({
          rowIndex: element.rowIndex,
          className: element.className || "",
          content,
        });
      });
  
      return rows;
    }
  
    return [];
  };
  
  // export const renderStatus=(state:string)=>{
  
  //   if(state==="Approved"){
  //   return(
  //     <>
  //        <DsStateChange
  //           className={statusStyles.statusIndicator}
  //           type="user_defined"
  //           id="state1"
  //           status={"Approved"}
  //           label="approved"
  //           status_icon={<Image src={commentIcon} alt="icon" />}
  //           comment="Justification and Comments"
  //           />
  //       </>
  //     )
  //   }
  
  //   if(state==="Submitted"){
  //     return(
  //       <>
  //         <DsStateChange
  //           className={statusStyles.statusIndicator}
  //           type="system_default"
  //           id="state4"
  //           status="Submitted"
  //           label="Open"
  //           btn_label="Quantity unavailable"
  //         />
  //         </>
  //       )
  //     }
  // }
  
  
  // export const renderImage=(rowIndex:number)=>{
  // return(
  //   <Image src={commentIcon} alt={""} />
  // )
  // };
   // const [dropDownOptions, setDropDownOptions] = useState<string[]>([]);
    // const filterOnDropdown = (columnIndex: number) => {
    //   const filteredRows = [...newRows].filter((row) =>
    //     row.content?.some(
    //       (cell) =>
    //         typeof cell.content === "string" &&
    //         cell.contentType === "string" &&
    //         cell.columnIndex === columnIndex &&
    //         dropDownOptions.some((item) =>
    //           cell.content
    //             ?.toString()
    //             .toLowerCase()
    //             .includes(item.toString().toLowerCase())
    //         )
    //     )
    //   );
    
    //   setNewRows(filteredRows);
    // };
  
   
  // export const maintainMergedCells = (
  //   rows: trow[],
  //   ranges: number[][]
  // ): trow[] => {
  
  //   let arrangerowIndex = rows.map((row, index) => index);
  //   ranges.forEach((x) => {
  //     let grouprowsInd = [];
  //     for (let i = x[0]; i <= x[1]; i++) {
  //       const rowindex = rows.indexOf(rows.find((row) => row.rowIndex == i));
  //       if (rowindex) grouprowsInd.push(rowindex);
  //     }
  //     grouprowsInd.sort((a, b) => a - b);
  //     arrangerowIndex.splice;
  //   });
  // };
  
  // export const getIconForRow = (row: trow, columnIndex: number) => {
  //   const cell = row.content?.find((cell) => cell.columnIndex === columnIndex);
  
  //   if (cell?.content === "Draft") {
  //     return <Image src={correctSign} alt="Draft Icon" />;
  //   }
  
  //   return null; // Return null if no matching content
  // };
  