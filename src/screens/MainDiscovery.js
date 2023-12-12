import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {usePrintersDiscovery} from 'react-native-esc-pos-printer';
import {NativeModules} from 'react-native';
import {Button} from '../components/Button';
import {PrintersList} from '../components/PrintersList';
import {storeData} from '../components/storeData';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {setMainPrinter} from '../redux/printersReducers';

const MainDiscovery = ({setNewPrinter}) => {
  const {start, printerError, isDiscovering, printers} = usePrintersDiscovery();

  const [printerBluetoothData, setPrinterBluetoothData] = useState([]);
  const [selectedPrinters, setSelectedPrinters] = useState([]);

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
      {...printer, ...{printer: 'Main printer'}},
    ]);
  };
  const handleSaveData = () => {
    storeData('mainPrinter', selectedPrinters);
    dispatch(setMainPrinter(selectedPrinters));
    setNewPrinter(false);
  };

  return (
    <>
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
      </View>
      <View style={styles.buttonContainer}>
        {selectedPrinters && selectedPrinters?.length > 0 ? (
          <>
            <Button
              loading={isDiscovering}
              title="Next"
              onPress={() => handleSaveData()}
              style={styles.text}
            />
          </>
        ) : (
          <Button
            loading={isDiscovering}
            title="Search for main printer"
            onPress={() => handelSetPrinterData()}
            style={styles.text}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  container: {
    flex: 1,
    backgroundColor: '#fcf9f9',
  },

  buttonContainer: {
    paddingHorizontal: 20,
    position: 'absolute',
    top: 500,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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

export default MainDiscovery;
