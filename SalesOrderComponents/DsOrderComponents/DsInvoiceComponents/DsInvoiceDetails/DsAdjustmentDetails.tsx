import DsTableComponent from "../../../../Elements/DsComponents/DsTablecomponent/DsTableComponent";
import {
  tcolumn,
  DsTableRow,
  cellData,
} from "@/helpers/types";
import styles from "../invoicePage.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store/store";
import Image from "next/image";
import edit from "../../../../Icons/smallIcons/edit.svg";
import save from "../../../../Icons/smallIcons/save.svg";
import DsIconButton from "../../../../Elements/DsComponents/DsButtons/dsIconButton";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import add from "../../../../Icons/smallIcons/add.svg";
import DsInfoDisplay from "@/Elements/ERPComponents/DsInfoDisplay/DsInfoDisplay";
import React from "react";

export type adjustmentItems = {
  type: string;
  docNumber: string;
  docDate: string;
  amount: string;
}
export interface adjustmentProps {
  adjutmentDetails: adjustmentItems[];
  setTotalAmount: (amount: number) => void;
}
const DsAdjustmentDetails: React.FC<adjustmentProps> = React.memo(({ adjutmentDetails, setTotalAmount }) => {
  const editAdjustmentTableVisible = useSelector((state: RootState) => state.permissions.editAdjustmentTableVisible);
  const [isEditable, setIsEditable] = useState(false);
  const [rows, setRows] = useState<DsTableRow[]>([]);

  useEffect(() => {
    // Initialize rows with incoming adjustmentDetails data
    const newRows = adjutmentDetails.map((item, index) => ({
      rowIndex: index + 1,
      content: [
        { columnIndex: 1, content: item.type, filterValue: item.type },
        { columnIndex: 2, content: item.docNumber, filterValue: item.docNumber },
        { columnIndex: 3, content: item.docDate, filterValue: item.docDate },
        { columnIndex: 4, content: item.amount, filterValue: item.amount },
      ],
    }));
    setRows(newRows);
  }, [adjutmentDetails]);

  const addRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        rowIndex: prevRows.length + 1,
        content: [
          { columnIndex: 1, content: "", filterValue: "" },
          { columnIndex: 2, content: "", filterValue: "" },
          { columnIndex: 3, content: "", filterValue: "" },
          { columnIndex: 4, content: "", filterValue: "" },
        ],
      },
    ]);
  };

  const handleInputChange = (rowIndex: number, columnIndex: number, value: string) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.rowIndex === rowIndex
          ? {
            ...row,
            content: row.content?.map((cell: cellData) =>
              cell.columnIndex === columnIndex
                ? { ...cell, filterValue: value }
                : cell
            ),
          }
          : row
      )
    );
  };

  const saveChanges = () => {
    // Update all rows' content to reflect the editable values
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        content: row.content?.map((cell: cellData) => ({
          ...cell,
          content: cell.filterValue || cell.content,
        })),
      }))
    );
    setIsEditable(false);
  };

  const totalAmount = rows.reduce((total, row) => {
    const amountCell = row.content?.find((cell: cellData) => cell.columnIndex === 4);
    return total + (Number(amountCell?.filterValue) || 0);
  }, 0);

  useEffect(() => {
    setTotalAmount(totalAmount);
  }, [totalAmount, setTotalAmount]);

  // Define columns and mapped rows outside the return
  const columns = [
    { columnIndex: 1, columnHeader: "Type" },
    { columnIndex: 2, columnHeader: "Doc. Number" },
    { columnIndex: 3, columnHeader: "Doc Date" },
    { columnIndex: 4, columnHeader: "Amt.(₹)" },
  ];

  const mappedRows = rows.map((row) => ({
    ...row,
    content: row.content?.map((cell: cellData) => ({
      ...cell,
      content: isEditable ? (
        <DsTextField
          initialValue={cell.filterValue?.toString()}
          onChange={(e) =>
            handleInputChange(row.rowIndex, cell.columnIndex ?? 1, e.target.value)
          }
        />
      ) : (
        cell.content
      ),
    })),
  }));

  return (
    <>
      <div className={styles.permission}>
        Adjustment Details
        {editAdjustmentTableVisible && (
          <div>
            {!isEditable && (
              <DsIconButton
                id="editBtn"
                buttonSize="btnSmall"
                startIcon={<Image src={edit} alt="edit" />}
                tooltip="Edit"
                onClick={() => setIsEditable(true)}
              />
            )}
            {isEditable && (
              <div className={styles.save}>
                <DsIconButton
                  id="addBtn"
                  buttonSize="btnSmall"
                  startIcon={<Image src={add} alt="add" />}
                  tooltip="Add Row"
                  onClick={addRow}
                />
                <DsIconButton
                  id="saveBtn"
                  buttonSize="btnSmall"
                  startIcon={<Image src={save} alt="save" />}
                  tooltip="Save"
                  onClick={saveChanges}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.table1}>
        <DsTableComponent
          className={""}
          id={" "}
          type="NonInterActive"
          columns={columns}
          rows={mappedRows}
          isFooterRequired={false}
        /></div>
      <div style={{ fontSize: "1.4rem" }}>
        <DsInfoDisplay
          detailOf="Adjustment Amount:"
          className={styles.adjustment}
        >
          {totalAmount.toFixed(2)}
        </DsInfoDisplay>
      </div>
    </>
  );
});

export default DsAdjustmentDetails;
