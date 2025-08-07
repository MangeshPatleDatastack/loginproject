import { FetchDataProps } from "../types";

const fetchData = async ({
  url,
  method = "GET",
  dataObject,
}: FetchDataProps) => {
  try {
    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json" },
      body: method === "GET" ? null : JSON.stringify(dataObject),
    };
 
    const response = await fetch(url, options)
   
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error occurred: ${error.message}`);
    }
    throw error;
  }
};
 
export default fetchData;

