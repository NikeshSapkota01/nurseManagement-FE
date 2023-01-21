import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { get } from "@/utils/httpUtils";
import endpoints from "src/constants/endpoint";

export interface FetchDataType {
  data: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

export const fetchAllNurse = createAsyncThunk("nurse/fetchAll", async () => {
  const response = await get(endpoints.nurse.getAllNurse);
  return response?.data;
});

const nurseSlice = createSlice({
  name: "nurse",
  initialState: { data: [], status: "idle", error: null } as FetchDataType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNurse.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllNurse.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload?.data;
      })
      .addCase(fetchAllNurse.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// export const {} = nurseSlice.actions;
export default nurseSlice.reducer;
