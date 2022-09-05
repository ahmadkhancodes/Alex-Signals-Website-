import { createSlice } from "@reduxjs/toolkit";

const initialDataState = {
  allData: new Array(),
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialDataState,
  reducers: {
    addData(state, actions) {
      var temp = state.allData;
      temp.push(actions.payload);
      state.allData = temp;
    },
    setAllData(state, actions) {
      state.allData = actions.payload;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
