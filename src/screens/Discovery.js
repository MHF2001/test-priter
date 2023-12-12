import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {usePrintersDiscovery} from 'react-native-esc-pos-printer';
import {NativeModules} from 'react-native';
import {Button} from '../components/Button';
import {PrintersList} from '../components/PrintersList';
import {storeData} from '../components/storeData';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {printersArray, setPrinters} from '../redux/printersReducers';

const Discovery = ({printerName}) => {
  const {start, printerError, isDiscovering, printers} = usePrintersDiscovery();
  const navigation = useNavigation();

  const [printerBluetoothData, setPrinterBluetoothData] = useState([]);
  const [selectedPrinters, setSelectedPrinters] = useState([]);
  const [selected, setSelected] = useState('');

  const dispatch = useDispatch();

  const handelSetPrinterData = async () => {
    // Start search wifi printers
    await start();

    // Get all Bluetooth connected device
    const bluetoothPrinters =
      await NativeModules.ThermalPrinterModule.getBluetoothDeviceList();
    // Set printer list
    setPrinterBluetoothData(bluetoothPrinters);
  };

  const handelSelectPrinter = printer => {
    setSelectedPrinters([
      ...selectedPrinters,
      {...printer, ...{printer: printerName}},
    ]);
  };

  const handleSaveData = async () => {
    storeData('printer', selectedPrinters);
    dispatch(setPrinters(selectedPrinters));
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <PrintersList
          onPress={printer => {
            if (printer) {
              handelSelectPrinter(printer);
            }
          }}
          printers={[...printers, ...printerBluetoothData]}
        />
      </View>
      <View style={styles.contentContainer}>
        {selectedPrinters?.length !== 0 ? (
          <Button
            loading={isDiscovering}
            title="Next"
            onPress={() => handleSaveData()}
            style={styles.text}
          />
        ) : (
          <Button
            loading={isDiscovering}
            title="Search"
            onPress={() => handelSetPrinterData()}
            style={styles.text}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  saveAreaViewContainer: {flex: 1},
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
    marginVertical: 10,
  },

  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 50,
  },
  text: {
    color: '#000',
    fontSize: 16,
    marginTop: 30,
  },
});

export default Discovery;
