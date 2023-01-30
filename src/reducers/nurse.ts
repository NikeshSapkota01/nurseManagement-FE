import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  AddNurseValue,
  FetchNurseDataType,
  GetNurseResponseData,
} from "src/constants/interface";
import endpoints from "src/constants/endpoint";

import { withToastForError } from "@/utils/withToastForError";
import { get, remove, interpolate, post } from "@/utils/httpUtils";

export const fetchAllNurse = createAsyncThunk("nurse/fetchAll", async () => {
  const response = await get(endpoints.nurse.getAllNurse);
  return response?.data;
});

export const fetchNurseById = createAsyncThunk<GetNurseResponseData, number>(
  "nurse/fetchById",
  async (payload) => {
    const response = await get(
      interpolate(endpoints.nurse.getAllNurseById, { nurseId: payload })
    );
    return response?.data;
  }
);

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
    individualData: [],
  } as FetchNurseDataType,
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
      // fetch nurse by id
      .addCase(fetchNurseById.fulfilled, (state, action) => {
        state.individualDataStatus = "succeeded";
        state.individualData = action.payload?.data[0];
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
