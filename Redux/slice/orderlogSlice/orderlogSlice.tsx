import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderLogState {
  selectedRowIds: number[]; 
  statusCounts: Record<string, number[]>; 
  orders: any[];
  filteredRows: any[]; // Stores filtered rows based on selection
}

const initialState: OrderLogState = {
  selectedRowIds: [],
  statusCounts: {},
  orders: [],
  filteredRows: [],
};

const orderLogSlice = createSlice({
  name: "orderLog",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<any[]>) => {
      state.orders = action.payload; 
    },

    toggleRowSelection: (
      state,
      action: PayloadAction<{ rowIndex: number; rowStatus: string }>
    ) => {
      const { rowIndex, rowStatus } = action.payload;

      const isSelected = state.selectedRowIds.includes(rowIndex);

      if (isSelected) {
       
        state.selectedRowIds = state.selectedRowIds.filter(
          (id) => id !== rowIndex
        );

        // Remove row from statusCounts
        if (state.statusCounts[rowStatus]) {
          state.statusCounts[rowStatus] = state.statusCounts[rowStatus].filter(
            (id) => id !== rowIndex
          );

          // If no rows left for this status, remove key
          if (state.statusCounts[rowStatus].length === 0) {
            delete state.statusCounts[rowStatus];
          }
        }
      } else {
        // Add row to selectedRowIds 
        state.selectedRowIds.push(rowIndex);

        // Add row to statusCounts
        if (!state.statusCounts[rowStatus]) {
          state.statusCounts[rowStatus] = [];
        }
        state.statusCounts[rowStatus].push(rowIndex);
      }
    },
    setFilteredRows: (state, action: PayloadAction<any[]>) => {
      state.filteredRows = action.payload; // Store filtered rows
    },
    clearSelections: (state) => {
      state.selectedRowIds = [];
      state.statusCounts = {};
      state.filteredRows = [];
    },
  },
});

export const { setOrders, toggleRowSelection, setFilteredRows, clearSelections } =
  orderLogSlice.actions;

export default orderLogSlice.reducer;






















































// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface OrderLogState 
// {
//   selectedRowIds: number[]; // Stores selected row indices
//   statusCounts: Record<string, number[]>; // Tracks selected row count by status
//   orders: any[]; // Stores API-fetched orders
//   filteredRows: any[]; // Stores filtered rows based on selection
// }
// const initialState: OrderLogState = {
//   selectedRowIds: [],
//   statusCounts: {},
//   orders: [],
//   filteredRows: [],
// };

// const orderLogSlice = createSlice({
//   name: "orderLog",
//   initialState,
//   reducers: {
//     setOrders: (state, action: PayloadAction<any[]>) => {
//       state.orders = action.payload; // Store fetched order data
//     },

//     toggleRowSelection: (
//       state,
//       action: PayloadAction<{ rowIndex: number; rowStatus: string }>
//     ) => {
//       const { rowIndex, rowStatus } = action.payload;

//       // Check if row is already selected
//       const isSelected = state.selectedRowIds.includes(rowIndex);

//       if (isSelected) {
//         // Remove row from selectedRowIds
//         state.selectedRowIds = state.selectedRowIds.filter(
//           (id) => id !== rowIndex
//         );

//         // Remove row from statusCounts
//         if (state.statusCounts[rowStatus]) {
//           state.statusCounts[rowStatus] = state.statusCounts[rowStatus].filter(
//             (id) => id !== rowIndex
//           );

//           // If no rows left for this status, remove key
//           if (state.statusCounts[rowStatus].length === 0) {
//             delete state.statusCounts[rowStatus];
//           }
//         }
//       } else {
//         // Add row to selectedRowIds
//         state.selectedRowIds.push(rowIndex);

//         // Add row to statusCounts
//         if (!state.statusCounts[rowStatus]) {
//           state.statusCounts[rowStatus] = [];
//         }
//         state.statusCounts[rowStatus].push(rowIndex);
//       }
//     },
//     setFilteredRows: (state, action: PayloadAction<any[]>) => {
//       state.filteredRows = action.payload; // Store filtered rows
//     },
//     clearSelections: (state) => {
//       state.selectedRowIds = [];
//       state.statusCounts = {};
//       state.filteredRows = [];
//     },
//   },
// });

// export const { setOrders, toggleRowSelection, setFilteredRows, clearSelections } =
//   orderLogSlice.actions;

// export default orderLogSlice.reducer;
