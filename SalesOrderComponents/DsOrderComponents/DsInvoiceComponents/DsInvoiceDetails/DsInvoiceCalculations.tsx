import React, { useEffect } from "react";
import styles from "../invoicePage.module.css";

export interface invoiceCalculationProps {
    totalAmount: number;
    totalTax: number;
    taxableValue: number;
    setTotalNetAmount: (amount: number) => void;
}
const DsInvoiceCalculations: React.FC<invoiceCalculationProps> = React.memo(({ totalAmount, taxableValue, totalTax, setTotalNetAmount }) => {
    const gross_Value = (taxableValue + totalTax);
    const total = (gross_Value - totalAmount);
    const totalNetAmount = (total % 1 >= 0.5) ? Math.ceil(total) : Math.floor(total);
    useEffect(() => {
        setTotalNetAmount(totalNetAmount);
    }, [totalNetAmount, setTotalNetAmount]);
    return (
        <>
            <div className={styles.invoice_container}>
                <div className={styles.row}>
                    <span className={styles.label}>Material Value:</span>
                    <span className={styles.value}>{taxableValue.toFixed(2)}</span>
                </div>
                <div className={styles.row}>
                    <span className={styles.label}>Tax Amount:</span>
                    <span className={styles.value}>{totalTax.toFixed(2)}</span>
                </div>
                <div className={styles.row}>
                    <span className={styles.label}>Gross Value:</span>
                    <span className={styles.value}>{gross_Value.toFixed(2)}</span>
                </div>
                <div className={styles.row}>
                    <span className={styles.label}>Less Adjustment:</span>
                    <span className={styles.value}>{totalAmount.toFixed(2)}</span>
                </div>
                <div className={styles.row3}>
                    <span className={styles.value}>{total.toFixed(2)}</span>
                </div>
                <div className={styles.row}>
                    <span className={styles.label}>Round Off:</span>
                    <span className={styles.value}>{(totalNetAmount - total).toFixed(2)}</span>
                </div>
                <div className={`${styles.row1}`}>
                    <span className={styles.label}>Net Amount:</span>
                    <span className={`${styles.value} ${styles.total}`}>
                        {totalNetAmount.toFixed(2)}
                    </span>
                </div>
            </div>
        </>
    );
});
export default DsInvoiceCalculations;