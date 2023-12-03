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
  },
});
export const {printersArray, addPrinter} = printerReducers.actions;
export const reducer = printerReducers.reducer;
