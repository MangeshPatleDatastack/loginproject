import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import styles from "./packing.module.css";
import React from "react";

const PackingFooter: React.FC = React.memo(() => {
    return (
        <>
            <div className={styles.footer_menu}>
                <div className={styles.signature}>
                    <h4>Signature </h4>
                    <div className={styles.authSign}>(Autorised Signatory)</div>
                </div>
                <div className={styles.date}>Date</div>
            </div>

            <div className={styles.notes}>
                <h4>Notes</h4>
                <DsTextField
                    placeholder="placeholder"
                    label="label"
                    // size="medium"
                    // labelsize="medium-label"
                    disable={false}
                // onClick={false}
                //   type="multiline"
                //   minRows={5}
                // icon="Test"
                // iconEnd="📋"
                />
            </div>
        </>
    );
});

export default PackingFooter;

