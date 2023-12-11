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
import {printersArray} from '../redux/printersReducers';

const Discovery = () => {
  const {start, printerError, isDiscovering, printers} = usePrintersDiscovery();
  const navigation = useNavigation();

  const [printerBluetoothData, setPrinterBluetoothData] = useState([]);
  const [selectedPrinters, setSelectedPrinters] = useState([]);
  const [selected, setSelected] = useState('');
  const [printersSelect, setPrintersSelect] = useState([
    'Main Printer',
    'Printer 1',
    'Printer 2',
  ]);

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
      {...printer, ...{printer: selected}},
    ]);
  };

  const handleSaveData = () => {
    storeData(selectedPrinters);
    dispatch(printersArray(selectedPrinters));
    navigation.navigate('PrinterInformation');
  };

  const checkData = async () => {
    const value = await AsyncStorage.getItem('printer');
    const parseValue = JSON.parse(value);
    if (parseValue) {
      navigation.navigate('PrinterInformation', {data: parseValue});
    }
  };

  useEffect(() => {
    checkData();
  }, []);
  return (
    <SafeAreaView style={styles.saveAreaViewContainer}>
      <View style={styles.container}>
        <View>
          <SelectDropdown
            data={printersSelect}
            onSelect={(selectedItem, index) => {
              setSelected(selectedItem);
            }}
          />
        </View>
        <ScrollView>
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
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
