import React, { useEffect, useState } from "react";
import styles from "./dsStatusLog.module.css";
import Image from "next/image";
import right_arrow from "../../../Icons/mediumIcons/right_arrow.svg";
import comment from "../../../Icons/smallIcons/comment.svg";
import { dsStatus } from "@/helpers/constant";
import { current, previous } from "@/helpers/types";

interface statusLogComProps {
  previous_status:
  previous;
  current_status:
  current;
  userName: string;
  empId: string;
  date: string;
  comments?: string;
}
const DsStatusLogComp: React.FC<statusLogComProps> = React.memo(({
  previous_status,
  current_status,
  userName,
  empId,
  date,
  comments,
}) => {
  const handleStatus = (previous: string, current: string) => {
    switch (previous) {
      case "Draft":
        if (previous == "Draft" && current == "Under Review") {
          return "Created by";
        } else if (previous == "Draft" && current == "Cancelled") {
          return "Cancelled by";
        }
        break;
      case "Under Review":
        if (previous == "Under Review" && current == "Under Approval") {
          return "Reviewed by";
        } else if (previous == "Under Review" && current == "Cancelled") {
          return "Cancelled by";
        }
        break;
      case "Under Approval":
        if (previous == "Under Approval" && current == "Approved") {
          return "Approved by";
        } else if (previous == "Under Approval" && current == "Cancelled") {
          return "Cancelled by";
        }
        break;
      case "Approved":
        if (previous == "Approved" && current == "Ready to dispatch") {
          return "Rejected by";
        } else if (previous == "Approved" && current == "Cancelled") {
          return "Cancelled by";
        }
        break;
      case "Ready to dispatch":
        if (previous == "Ready to dispatch" && current == "Cancelled") {
          return "Cencelled by";
        }
        break;
      default:
        return "Rejected by";
    }
  };

  return (
    <>
      <div className={`${styles.container} `}>
        <div className={styles.box}>
          <div>
            <div className={`${styles.first}`}>
              <p
                className={`${styles[previous_status?.replace(" ", "_").toLowerCase()]
                  } `}
              >
                {previous_status}
              </p>
              <Image src={right_arrow} alt="Right Arrow" />
              <p
                className={`${styles[current_status?.replace(" ", "_").toLowerCase()]
                  } `}
              >
                {current_status}
              </p>
            </div>
            <div className={styles.second}>
              {handleStatus(previous_status, current_status)} {userName} (EMP ID
              {empId}) On
            </div>
            <div className={styles.first}>{date}</div>
            {previous_status !== "Draft" && comments && (
              <Image
                src={comment}
                alt={"comment Icon"}
                className={styles.comment}
              />
            )}{" "}
          </div>
          <div>
            {previous_status !== "Draft" && comments && (
              <p className={styles.comment_para}>{comments}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
});
export default DsStatusLogComp;
