"use client";

import { useEffect, useState } from "react";
import DsTableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import { tcolumn, DsTableRow } from "@/helpers/types";
import React from "react";

export interface pakingDataProps {
    rows: DsTableRow[];
}
// eslint-disable-next-line react/display-name
const PackingData: React.FC<pakingDataProps> = React.memo(({ rows }) => {
    // Define column headers using tcolumn class
    const columns: tcolumn[] = [
        { columnIndex: 0, columnHeader: "Prod Code" },
        { columnIndex: 1, columnHeader: "Product Name" },
        { columnIndex: 2, columnHeader: "Mfg. By" },
        { columnIndex: 3, columnHeader: "Batch No." },
        { columnIndex: 4, columnHeader: "Mfg" },
        { columnIndex: 5, columnHeader: "Expiry" },
        { columnIndex: 6, columnHeader: "Qty" },
        { columnIndex: 7, columnHeader: "Carton Size" },
        { columnIndex: 8, columnHeader: "Scheme & Bonus" },
        { columnIndex: 9, columnHeader: "Picked" },
        { columnIndex: 10, columnHeader: "Packed" }
    ];

    const newRows: DsTableRow[] = [...rows].map((row: DsTableRow) => ({
        rowIndex: row.rowIndex,
        className: row.className ?? "",
        content: row.content ?? []
    }));

    const [packingData, setPackingData] = useState<{
        columns: tcolumn[];
        rows: DsTableRow[];
    }>({
        columns: [],
        rows: []
    });
    useEffect(() => {
        setPackingData({
            columns: columns,
            rows: [...rows].map((row: DsTableRow) => ({
                rowIndex: row.rowIndex,
                className: row.className ?? "",
                content: row.content ?? []
            }))
        });
    }, [rows]);

    return (
        <>
            <DsTableComponent
                className={" "}
                id={"pakig-data-table"}
                columns={packingData.columns}
                rows={packingData.rows}
                type={"NonInterActive"}
                isFooterRequired={false}
            ></DsTableComponent>
        </>
    );
});

export default PackingData;

