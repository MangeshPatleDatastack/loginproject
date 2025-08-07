import { ImgProps } from "next/dist/shared/lib/get-img-props";

export const changeImage = (
  e: React.MouseEvent<HTMLElement>,
  imgSrc: ImgProps
) => {
  //console.log(imgSrc);
  const icon = (e.target as HTMLElement).querySelector(
    ".icon > div > img"
  ) as HTMLImageElement;
  if (icon) {
    icon.src = imgSrc.src;
  }
};
export const parseCsv = async (file: File): Promise<string[][]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result as string;
      const rows = text.trim().split("\n");
      const data = rows.map((x) => x.split(",").map((header) => header.trim()));

      resolve(data);
    };

    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};
export const convertDateFormat = (date: string) => {
  const [day, month, year] = date.split('/'); // Split the input string by "/"
  return `${year}-${month}-${day}`; // Return in "yyyy-mm-dd" format
}
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  // Get the day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  // Return the formatted date as dd/mm/yyyy
  return `${day}/${month}/${year}`;
}
