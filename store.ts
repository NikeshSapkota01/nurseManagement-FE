import { configureStore } from "@reduxjs/toolkit";
import reducers from "./src/reducers";

const store = configureStore({
  reducer: reducers,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
