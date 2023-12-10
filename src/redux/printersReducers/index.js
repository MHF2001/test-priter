import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  printer: [],
};

const printerReducers = createSlice({
  name: 'usePrinter',
  initialState,
  reducers: {
    printersArray: (state, action) => {
      return action.payload;
    },

    addPrinter: (state, action) => {
      return [...state, action.payload];
    },
    deletePrinter: (state, action) => {
      return state.filter(item => item.id !== action.payload.id);
    },
    clearData: (state, action) => {
      return initialState;
    },
  },
});
export const {printersArray, addPrinter, deletePrinter, clearData} =
  printerReducers.actions;
export const reducer = printerReducers.reducer;
