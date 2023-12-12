import {createSlice} from '@reduxjs/toolkit';

export const printerReducer = createSlice({
  name: 'printers',
  initialState: {
    printers: [],
    mainPrinter: [],
  },

  reducers: {
    setPrinters: (state, action) => {
      console.log('====================================');
      console.log(action.payload);
      console.log('====================================');
      state.printers = [...state.printers, ...action.payload];
    },
    setMainPrinter: (state, action) => {
      state.mainPrinter = [...state.mainPrinter, ...action.payload];
    },
    removePrinter: (state, action) => {
      state.printers = state.printers.filter(
        item => item.deviceName !== action.payload,
      );
    },

    removeMainPrinter: (state, action) => {
      state.mainPrinter = state.mainPrinter.filter(
        item => item.deviceName !== action.payload,
      );
    },
  },
});

export const {setPrinters, setMainPrinter, removePrinter, removeMainPrinter} =
  printerReducer.actions;

export default printerReducer.reducer;
