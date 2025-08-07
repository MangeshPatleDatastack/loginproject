type Operation = "add" | "replace" | "remove";
 
export interface PatchOperation {
  op: Operation;
  path: string;
  value?: any;
}
 
export function generatePatchDocument(
  original: any,
  updated: any
): PatchOperation[] {
  const patches: PatchOperation[] = [];
 
  function compareObjects(originalObj: any, updatedObj: any, path = "") {
    for (const key in originalObj) {
      const originalValue = originalObj[key];
      const updatedValue = updatedObj[key];
 
      // Condition 1: Ignore objects with type "read-only"
      if (
        typeof originalValue === "object" &&
        originalValue?.type === "read-only"
      ) {
        continue;
      }
 
      // Condition 4 & 5: Handle empty string or null values as "remove"
      if (
        (updatedValue === "" || updatedValue === null) &&
        originalValue !== updatedValue
      ) {
        patches.push({
          op: "remove",
          path: `${path}/${key}`,
        });
        continue;
      }
 
      // Compare nested objects
      if (typeof originalValue === "object" && !Array.isArray(originalValue)) {
        compareObjects(originalValue, updatedValue, `${path}/${key}`);
      } else if (Array.isArray(originalValue)) {
        handleArrayDifferences(
          originalValue,
          updatedValue,
          `${path}/${key}`
        );
      } else if (originalValue !== updatedValue) {
        // Condition 2 & 3: Replace modified values
        patches.push({
          op: "replace",
          path: `${path}/${key}`,
          value: updatedValue,
        });
      }
    }
 
    // Add new keys from the updated object
    for (const key in updatedObj) {
      if (!(key in originalObj)) {
        patches.push({
          op: "add",
          path: `${path}/${key}`,
          value: updatedObj[key],
        });
      }
    }
  }
 
  function handleArrayDifferences(
    originalArray: any[],
    updatedArray: any[],
    path: string
  ) {
    const originalIds = new Set(originalArray.map((item) => item.id));
    const updatedIds = new Set(updatedArray.map((item) => item.id));
 
    // Handle additions
    updatedArray.forEach((item, index) => {
      if (!item.id) {
        patches.push({
          op: "add",
          path: `${path}/${index}`,
          value: item,
        });
      } else if (!originalIds.has(item.id)) {
        patches.push({
          op: "add",
          path: `${path}/${index}`,
          value: item,
        });
      }
    });
 
    // Handle removals and replacements
    originalArray.forEach((item) => {
      if (!updatedIds.has(item.id)) {
        patches.push({
          op: "replace",
          path: `${path}/${item.id}/status`,
          value: "INAC",
        });
      } else {
        const updatedItem = updatedArray.find((u) => u.id === item.id);
        compareObjects(item, updatedItem, `${path}/${item.id}`);
      }
    });
  }
 
  compareObjects(original, updated);
  return patches;
}
 
 