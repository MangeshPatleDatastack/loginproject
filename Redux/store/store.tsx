import { configureStore } from "@reduxjs/toolkit";
import tableSlice from "../slice/TableSlice/tableSlice";
import userSlice from "../slice/UserSlice/userSlice";
import permissionSlice from "../slice/PermissionSlice/permissionSlice";
import   selectionReducer from "../slice/orderlogSlice/orderlogSlice";
 
export const store = configureStore({
  reducer: {
    table: tableSlice,
    user: userSlice,
    permissions: permissionSlice,
    selection: selectionReducer, 
  }
});
 
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
 
export default store;