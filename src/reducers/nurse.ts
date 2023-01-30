import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import endpoints from "src/constants/endpoint";
import { AddNurseValue } from "src/constants/interface";
import { withToastForError } from "@/utils/withToastForError";
import { get, remove, interpolate, post } from "@/utils/httpUtils";

export interface FetchDataType {
  data: any;
  status: "idle" | "loading" | "succeeded" | "failed" | "fullfilled";
  error: string | null | undefined;
}

export const fetchAllNurse = createAsyncThunk("nurse/fetchAll", async () => {
  const response = await get(endpoints.nurse.getAllNurse);
  return response?.data;
});

export const addNurse = createAsyncThunk(
  "nurse/add",
  withToastForError(async (payload: AddNurseValue) => {
    const response = await post(endpoints.nurse.createNurse, {
      ...payload,
    });
    return response?.data;
  })
);

export const deleteNurse = createAsyncThunk(
  "nurse/delete",
  async (payload: number) => {
    const { data: response } = await remove(
      interpolate(endpoints.nurse.deleteNurse, { nurseId: payload })
    );
    return response;
  }
);

const nurseSlice = createSlice({
  name: "nurse",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  } as FetchDataType,
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
      })
      // add nurse
      .addCase(addNurse.fulfilled, (state, action) => {
        state.status = "fullfilled";
        const nurse = action.payload.data[0];
        state.data = [...state.data, nurse];
      })
      // delete nurse
      .addCase(deleteNurse.fulfilled, (state, action) => {
        const { nurseId } = action.payload;
        const nurseData = state.data.filter(
          ({ id }: { id: number }) => id !== +nurseId
        );

        state.status = "succeeded";
        state.data = nurseData;
      });
  },
});

// export const {} = nurseSlice.actions;
export default nurseSlice.reducer;
