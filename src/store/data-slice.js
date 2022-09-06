import { createSlice } from "@reduxjs/toolkit";
import { set, ref } from "firebase/database";
import { db } from "../firebase";

const initialDataState = {
  allData: [],
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
    saveToFirebase(state) {
      set(ref(db), {
        DATA_FROM_STORE: JSON.parse(JSON.stringify(state.allData)),
      });
    },
    updateData(state, actions) {
      for (let i = 0; i < state.allData.length; i++) {
        if (state.allData[i].id === actions.payload?.id) {
          state.allData[i]["action"] = actions.payload?.action;
          state.allData[i]["instrument"] = actions.payload?.instrument;
          state.allData[i]["isactive"] = actions.payload?.isactive;
          state.allData[i]["open_price"] = actions.payload?.open_price;
          state.allData[i]["close_price"] = actions.payload?.close_price;
          state.allData[i]["profit"] = actions.payload?.profit;
          state.allData[i]["take_profit"] = actions.payload?.take_profit;
          state.allData[i]["open_date_and_time"] = String(
            actions.payload?.open_date_and_time
          );
          state.allData[i]["close_date_and_time"] = String(
            actions.payload?.close_date_and_time
          );
          state.allData[i]["risk_factor_in_points"] =
            actions.payload?.risk_factor_in_points;
          state.allData[i]["stop_loss"] = actions.payload?.stop_loss;
        }
      }
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
