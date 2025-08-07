import React, { useEffect, useState } from "react";
import styles from "./dsStatusLog.module.css";
import Image from "next/image";
import right_arrow from "../../../../Icons/mediumIcons/right_arrow.svg";
import { getAllStatusLogURL } from "../../..@/helpers/constant";
import FetchData from "../../..@/helpers/Method/fetchData";
import comment from "../../../../Icons/smallIcons/comment.svg";
import DsStatusLogComp from "./dsStatusLogComp";
import DsPane from "@/Elements/DsComponents/DsPane/DsPane";

interface StatusLogProps {
  status: "Under Review" | "Under Approval" | "Approved" | "Draft";
  orderId?: string;
}
const DsStatusLog: React.FC<StatusLogProps> = React.memo(({ status, orderId }) => {
  const [fetchedData, setFetchedData] = useState<any>([]); // To store fetched data
  const [currentData, setCurrentData] = useState<any>("");
  const [data, setData] = useState<any>([]);
  const handleFetch = async () => {
    await FetchData({
      url: getAllStatusLogURL,
      // +`/${orderId}`
    }).then((res) => {
      //console.log("Fetched Status:", res.result); // Log the result
      setFetchedData(res.result);
    });
  };

  useEffect(() => {
    handleFetch();
  }, []);
  useEffect(() => {
    setData(fetchedData[0]?.previous);
    setCurrentData(fetchedData[0]?.current);
  }, [fetchedData]);

  return (
    <>
      <DsPane id="statusLogPane" side="right" title="Filter">
        <div>
          <p>
            Current Status:
            <span
              className={`${styles[status.replace(" ", "_").toLowerCase()]} ${styles["highlight"]
                }`}
            >
              {currentData}
            </span>
          </p>
          {data?.map((da: any, index: number) => (
            <div key={index} className={styles.container}>
              <DsStatusLogComp
                current_status={da?.currentStatus}
                previous_status={da?.previousStatus}
                userName={da.user?.name}
                empId={da.user?.empId}
                date={da?.Date}
              />
            </div>
          ))}</div>
      </DsPane>
    </>
  );
});
export default DsStatusLog;
