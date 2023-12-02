import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {usePrintersDiscovery} from 'react-native-esc-pos-printer';
import ThermalPrinterModule from 'react-native-thermal-printer';
import {Button} from '../components/Button';
import {PrintersList} from '../components/PrintersList';
import {getData, storeData} from '../components/storeData';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Discovery = () => {
  const {start, printerError, isDiscovering, printers} = usePrintersDiscovery();
  const navigation = useNavigation();

  const [printerBluetoothData, setPrinterBluetoothData] = useState([]);
  const [selectedPrinters, setSelectedPrinters] = useState([]);

  const handelSetPrinterData = async () => {
    // Start search wifi printers
    await start();

    // Get all Bluetooth connected device
    const bluetoothPrinters =
      await ThermalPrinterModule.getBluetoothDeviceList();
    // Set printer list
    setPrinterBluetoothData(bluetoothPrinters);
  };

  const handelSelectPrinter = printer => {
    setSelectedPrinters([...selectedPrinters, printer]);
  };

  const handleSaveData = () => {
    storeData(selectedPrinters);

    if (getData()) {
      navigation.navigate('PrinterInformation', {data: selectedPrinters});
    }
  };

  const checkData = async () => {
    const value = await AsyncStorage.getItem('printer');
    const parseValue = JSON.parse(value);
    if (parseValue) {
      console.log({parseValue});
      navigation.navigate('PrinterInformation', {data: parseValue});
    }
  };

  useEffect(() => {
    checkData();
  }, []);
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
        {selectedPrinters?.length > 0 ? (
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
  container: {
    flex: 1,
    backgroundColor: '#fcf9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
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
