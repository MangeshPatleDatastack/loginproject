"use client";
import styles from "@/app/page.module.css";
// import Image from "next/image";
// import ipca from "@/lib/Common/SalesIcons/ipca logo SVG.svg";
import btnStyles from "@/Elements/DsComponents/DsButtons/dsButton.module.css";
import { useSearchParams } from "next/navigation"; 
import {useEffect, useState } from "react";
import IconFactory from "@/Elements/IconComponent";
import DsTextField from "@/Elements/DsComponents/DsInputs/dsTextField";
import DsPasswordField from "@/Elements/DsComponents/DsInputs/dsPasswordField";
import DsButton from "@/Elements/DsComponents/DsButtons/dsButton";
function loginPage() {
    const searchParams = useSearchParams();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [client, setClient] = useState("");
   const [redirectUrl, setRedirectUrl] = useState("");

useEffect(() => {
  const hostname = window.location.hostname;
  let detectedClient = "";
  let detectedRedirectUrl = "";

  if (hostname === "localhost") {
    detectedClient = "SalesOrder";
    // detectedRedirectUrl = "http://localhost:3000";
    detectedRedirectUrl = "http://localhost:3001";

  } else if (hostname === "172.145.1.103") {
    detectedClient = "SalesOrder";
    // detectedRedirectUrl = "http://172.145.1.103:7008";
    detectedRedirectUrl = "http://localhost:3000";

  }

  const redirectParam = searchParams.get("redirect");
  if (redirectParam) {
    detectedRedirectUrl = redirectParam;
  }

  setClient(detectedClient);
  setRedirectUrl(detectedRedirectUrl);
}, [searchParams]);



// THEN check for token only after redirectUrl is ready
useEffect(() => {
  if (!redirectUrl) return; // wait for it to be set

  const token = localStorage.getItem("access_token");
  if (token) {
    window.location.href = redirectUrl;
  }
}, [redirectUrl]);

const handleSubmit = async () => {
  if (!username || !password) {
    alert("Please enter both username and password.");
    return;
  }

  // You need to set the client secret for confidential clients
  // For public clients, you can omit client_secret
  const clientSecrets = {
    SalesReturn: "wY470Du3kF8r2A7PLrsddJupDf8XFpZW",
    SalesOrder: "NXtMVbPuQ8AQUhHn773kxMgIwqXAmTGv",
    // Add more as needed
  };

  const params = new URLSearchParams();
  params.append("grant_type", "password");
  params.append("client_id", client);
  params.append("username", username);
  params.append("password", password);

  // If our client is confidential, add client_secret
  if (clientSecrets[client]) {
    params.append("client_secret", clientSecrets[client]);
  }

  try {
    const response = await fetch("http://172.145.1.103:8080/realms/ERP_Project/protocol/openid-connect/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const data = await response.json();

    if (data.access_token) {
      // Store the token (localStorage, sessionStorage, or cookie)
     localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("refresh_token", data.refresh_token); // ✅ ADD THIS LINE

  window.location.href = redirectUrl;
    } else {
      alert(data.error_description || "Login failed. Please check your credentials.");
    }
  } catch (err) {
    alert("Error connecting to authentication server.");
  }
};
 return (
    <div className={styles.container}>
      {/* Left branding section */}
      <div className={styles.leftcolumn}>
        <div className={styles.leftContent}>
          <IconFactory name="Ipca_Logo_Large" className={styles.logo} />
          <div className={styles.labelforaiPharma}>
            <span className={styles.ai}>ai</span>
            <span className={styles.pharma}>Pharma</span>
          </div>
          <label className={styles.PharmaReinvented}>
            Pharma Reinvented: Excellence Through AI-Integrated Operation
          </label>
        </div>
        <div className={styles.bottomdiv}>
          <label>Version: 1.0</label>
          <label>Released On: 24/09/2024</label>
        </div>
      </div>

      {/* Right login section */}
      <div className={styles.rightcolumn}>
        <div className={styles.rightContent}>
          <label className={styles.labelforlogin}>Login</label>
          <label className={styles.label}>Enter your username and password</label>
          <div className={styles.mainDiv}>
            <DsTextField
              placeholder="Username"
              initialValue={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <DsPasswordField
              placeholder="Password"
              initialValue={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && handleSubmit()}
            />
            <div className={styles.logindiv}>
              <DsButton
                id="loginBtn"
                buttonColor="btnInfo"
                buttonSize="btnMedium"
                buttonViewStyle="btnContained"
                className={btnStyles.btnAutoWidth}
                label="Login"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </div>
        <div className={styles.cornerDiv}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4em" }}>
            <span className={styles.poweredclass}>Powered by:</span>
            <div style={{ width: "1.2em", height: "1.2em" }}>
              <IconFactory name="datastackLogo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default loginPage;






//   useEffect(() => {
//     // Check if already logged in
//       const token = localStorage.getItem("access_token");
//   if (token) {
//     window.location.href = redirectUrl;
//     return;
//   }
//    // Detect client from URL (salesorder, salesreturn, tender, etc.)
//   const hostname = window.location.hostname; // e.g., 172.145.1.102
//   let detectedClient = "";
//   let detectedRedirectUrl = "";

//   //  if (hostname === "172.145.1.102") {
//   //   detectedClient = "salesreturn";
//   //   detectedRedirectUrl = "http://172.145.1.102:7019";
//   // } else if (hostname === "localhost" || hostname === "http://localhost:3001") {
//   //   detectedClient = "SalesOrder";
//   //   detectedRedirectUrl = "http://localhost:3001"; 
//   // }

//   if (hostname === "localhost") {
//     detectedClient = "SalesOrder";
//     detectedRedirectUrl = "http://localhost:3001";
//   } else if (hostname === "172.145.1.103") {
//     detectedClient = "SalesOrder";
//     detectedRedirectUrl = "http://172.145.1.103:7008";
//   }

//    const redirectParam = searchParams.get("redirect");
//   if (redirectParam) {
//     detectedRedirectUrl = redirectParam;
//   }

//   setClient(detectedClient);
//   setRedirectUrl(detectedRedirectUrl);
// }, [searchParams]);

