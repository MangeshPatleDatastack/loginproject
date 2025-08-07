import DsTableComponent from "@/Elements/DsComponents/DsTablecomponent/DsTableComponent";
import {
    tcolumn,
    DsTableRow,
} from "@/helpers/types";
import React from "react";

export type tieUpItems = {
    id: number;
    quantity: number;
    name: string;
    date: string;
    amount: number;
}
export interface tieupProps {
    tieupDetails: tieUpItems[];
}

const DsInvoiceTieup: React.FC<tieupProps> = React.memo(({ tieupDetails }) => {

    function formatDate(inputDate: string) {
        // Split the date string by "/"
        const parts = inputDate.split('/');
        // Check if the format is DD/MM/YYYY
        if (parts.length === 3) {
            const [day, month, year] = parts; // Extract day, month, year
            // Create a valid date object for DD/MM/YYYY
            const date = new Date(`${year}-${month}-${day}`);
            if (!isNaN(date.getTime())) {
                const monthShort = date.toLocaleString('default', { month: 'short' }); // Short month name
                const yearShort = year.slice(-2); // Last two digits of the year
                return `${monthShort}${yearShort}`;
            }
        }
        return "Invalid Date Format"; // Return this if parsing fails
    }
    if (!tieupDetails || tieupDetails.length === 0) {
        return null;
    }
    // Define column headers using tcolumn class
    const columns: tcolumn[] = [
        { columnIndex: 1, columnHeader: "ID" },
        { columnIndex: 2, columnHeader: "Item" },
        { columnIndex: 3, columnHeader: "Amount" },
    ];

    // Define row data using trow and cellData classes
    const rows: DsTableRow[] = tieupDetails.map((item, index) => ({
        rowIndex: index + 1,
        content: [
            { columnIndex: 1, content: item.id },
            { columnIndex: 2, content: (item.quantity) + " " + (item.name) + " " + (formatDate(item.date)) },
            { columnIndex: 3, content: item.amount },
        ],
    }))
    return (
        <>
            <DsTableComponent
                className={" "}
                id={" "}
                type="NonInterActive"
                columns={columns}
                rows={rows}
                // alignment={"center"}
                isFooterRequired={false}
            ></DsTableComponent>
        </>
    );
});

export default DsInvoiceTieup;
