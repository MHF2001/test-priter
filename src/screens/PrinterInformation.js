import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {deleteAllData} from '../components/storeData';
import PrinterInfo from '../components/PrinterInfo/PrinterInfo';
import {Button} from '../components/Button';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import RNRestart from 'react-native-restart';
import ThermalPrinterModule from '../components/ThermalPrinterModule';

const PrinterInformation = () => {
  const [printing, setPrinting] = useState(false);

  const state = useSelector(state => state.printerReducers);

  const printSimpleReceipt = async () => {

    setPrinting(true);

    const text =
      '[C]<img>https://c8.alamy.com/comp/2RBE3KC/person-taking-picture-by-reflex-camera-man-with-black-photo-camera-in-warm-summer-day-2RBE3KC.jpg</img>\n' +
      '[L]\n' +
      "[C]<u><font size='big'>ORDER N°045</font></u>\n" +
      '[L]\n' +
      '[C]================================\n' +
      '[L]\n' +
      '[L]<b>BEAUTIFUL SHIRT</b>[R]9.99e\n' +
      '[L]  + Size : S\n' +
      '[L]\n' +
      '[L]<b>AWESOME HAT</b>[R]24.99e\n' +
      '[L]  + Size : 57/58\n' +
      '[L]\n' +
      '[C]--------------------------------\n' +
      '[R]TOTAL PRICE :[R]34.98e\n' +
      '[R]TAX :[R]4.23e\n' +
      '[L]\n' +
      '[C]================================\n' +
      '[L]\n' +
      "[L]<font size='tall'>Customer :</font>\n" +
      '[L]Raymond DUPONT\n' +
      '[L]5 rue des girafes\n' +
      '[L]31547 PERPETES\n' +
      '[L]Tel : +33801201456\n' +
      '[L]\n' +
      "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
      "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>\n" +
      '[L]\n' +
      '[L]\n' +
      '[L]\n';

    const text2 =
      '[C]<img>https://c8.alamy.com/comp/2RBE3KC/person-taking-picture-by-reflex-camera-man-with-black-photo-camera-in-warm-summer-day-2RBE3KC.jpg</img>\n' +
      '[L]\n' +
      "[C]<u><font size='big'> Kitchen 045</font></u>\n" +
      '[L]\n' +
      '[C]================================\n' +
      "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
      "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>\n" +
      '[L]\n' +
      '[L]\n' +
      '[L]\n';

    state?.forEach(async element => {
      if (element?.ipAddress) {
        await ThermalPrinterModule.printTcp({
          ip: element?.ipAddress,
          payload: element.printer === 'Printer 1' ? text2 : text,
        });
      } else {
        await ThermalPrinterModule.getBluetoothDeviceList();
        await ThermalPrinterModule.printBluetooth({
          payload: element.printer === 'Printer 1' ? text2 : text,
          macAddress: element.macAddress,
        });
      }
    });
    setPrinting(false);
  };

  const handlePrintMain = async () => {
    const text =
      '[C]<img>https://c8.alamy.com/comp/2RBE3KC/person-taking-picture-by-reflex-camera-man-with-black-photo-camera-in-warm-summer-day-2RBE3KC.jpg</img>\n' +
      '[L]\n' +
      "[C]<u><font size='big'>ORDER N°045</font></u>\n" +
      '[L]\n' +
      '[C]================================\n' +
      '[L]\n' +
      '[L]<b>BEAUTIFUL SHIRT</b>[R]9.99e\n' +
      '[L]  + Size : S\n' +
      '[L]\n' +
      '[L]<b>AWESOME HAT</b>[R]24.99e\n' +
      '[L]  + Size : 57/58\n' +
      '[L]\n' +
      '[C]--------------------------------\n' +
      '[R]TOTAL PRICE :[R]34.98e\n' +
      '[R]TAX :[R]4.23e\n' +
      '[L]\n' +
      '[C]================================\n' +
      '[L]\n' +
      "[L]<font size='tall'>Customer :</font>\n" +
      '[L]Raymond DUPONT\n' +
      '[L]5 rue des girafes\n' +
      '[L]31547 PERPETES\n' +
      '[L]Tel : +33801201456\n' +
      '[L]\n' +
      "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
      "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>\n" +
      '[L]\n' +
      '[L]\n' +
      '[L]\n';

    state?.forEach(async element => {
      if (element.printer === 'Main Printer') {
        if (element?.ipAddress) {
          await ThermalPrinterModule.printTcp({
            ip: element?.ipAddress,
            payload: text,
          });
        } else {
          await ThermalPrinterModule.getBluetoothDeviceList();
          await ThermalPrinterModule.printBluetooth({
            payload: text,
            macAddress: element.macAddress,
          });
        }
      }
    });
  };

  const handlePrint1 = async () => {
    const text2 =
      '[C]<img>https://c8.alamy.com/comp/2RBE3KC/person-taking-picture-by-reflex-camera-man-with-black-photo-camera-in-warm-summer-day-2RBE3KC.jpg</img>\n' +
      '[L]\n' +
      "[C]<u><font size='big'> Kitchen 045</font></u>\n" +
      '[L]\n' +
      '[C]================================\n' +
      "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
      "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>\n" +
      '[L]\n' +
      '[L]\n' +
      '[L]\n';

    state?.forEach(async element => {
      if (element.printer === 'Printer 1') {
        if (element?.ipAddress) {
          await ThermalPrinterModule.printTcp({
            ip: element?.ipAddress,
            payload: text2,
          });
        } else {
          await ThermalPrinterModule.getBluetoothDeviceList();
          await ThermalPrinterModule.printBluetooth({
            payload: text2,
            macAddress: element.macAddress,
          });
        }
      }
    });
  };

  const handlePrint2 = async () => {
    const text2 =
      '[C]<img>https://c8.alamy.com/comp/2RBE3KC/person-taking-picture-by-reflex-camera-man-with-black-photo-camera-in-warm-summer-day-2RBE3KC.jpg</img>\n' +
      '[L]\n' +
      "[C]<u><font size='big'> Kitchen 045</font></u>\n" +
      '[L]\n' +
      '[C]================================\n' +
      "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
      "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>\n" +
      '[L]\n' +
      '[L]\n' +
      '[L]\n';

    state?.forEach(async element => {
      if (element.printer === 'Printer 2') {
        if (element?.ipAddress) {
          await ThermalPrinterModule.printTcp({
            ip: element?.ipAddress,
            payload: text2,
          });
        } else {
          await ThermalPrinterModule.getBluetoothDeviceList();
          await ThermalPrinterModule.printBluetooth({
            payload: text2,
            macAddress: element.macAddress,
          });
        }
      }
    });
  };

  return (
    <>
      <SafeAreaView style={styles.saveAreaViewContainer}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              padding: 10,
              backgroundColor: '#fcf9f9',
              width: '100%',
            }}>
            {/* }}> */}
            <TouchableOpacity
              onPress={() => {
                deleteAllData();
                RNRestart.restart();
              }}>
              <Text
                style={{
                  color: '#000',
                }}>
                Clear Data
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            {state && state?.map(ele => <PrinterInfo printer={ele} />)}

            <View style={styles.contentCotainer}>
              <Button title="All Test print" onPress={printSimpleReceipt} />
              <Button title="Main Test print" onPress={handlePrintMain} />
              <Button title="Printer 1 Test print" onPress={handlePrint1} />
              <Button title="Printer 2 Test print" onPress={handlePrint2} />

              <Text style={styles.errorText} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  container: {
    flex: 1,
    backgroundColor: '#fcf9f9',
    alignItems: 'center',
  },
  contentCotainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

export default PrinterInformation;
