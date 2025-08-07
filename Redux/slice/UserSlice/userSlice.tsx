import { createSlice, PayloadAction } from "@reduxjs/toolkit";
 
export type UserRole = {
  roleId: string;
  roleName: string;
};
 
export type UserState = {
  userRoles: UserRole[]; // Array to store roles
  role: string; // Single role or other status (depending on your use case)
};
 
const initialState: UserState = {
  userRoles: [], // Initialize with an empty array
  role: "" // Initialize with an empty string
};
 
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserRoles: (state, action: PayloadAction<UserRole[]>) => {
      state.userRoles = action.payload; // Set the payload as the userRoles array
      return state;
    },
    setUserRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload; // Update roles to the new string value
      return state;
    }
  }
});
 
export const { setUserRoles, setUserRole } = userSlice.actions;
export default userSlice.reducer;