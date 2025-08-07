import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitState, DsTableRow } from "@/helpers/types";

export const initialState: InitState = {
  rows: [],
};
// Redux Slice
export const activeObjectSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<DsTableRow[]>) => {
      state.rows = action.payload;
      return state;
    },
    
  },
});

export const { setRows } = activeObjectSlice.actions;

export default activeObjectSlice.reducer;
