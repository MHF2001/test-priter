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
// import RNRestart from 'react-native-restart';
import ThermalPrinterModule from '../components/ThermalPrinterModule';
import CaptureHtmlToBitmap from '../components/MyWebView';
import {clearData} from '../redux/printersReducers';
import {useNavigation} from '@react-navigation/native';

const PrinterInformation = () => {
  const [printing, setPrinting] = useState(false);

  const state = useSelector(state => state.printerReducers);

  const navigation = useNavigation();

  const printSimpleReceipt = async () => {
    setPrinting(true);

    const text2 = 'Nard Printer';
    state?.forEach(async element => {
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
    });
    setPrinting(false);
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
                clearData();
                deleteAllData();
                navigation.goBack();
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
              {/* <Button title="Main Test print" onPress={handlePrintMain} />
              <Button title="Printer 1 Test print" onPress={handlePrint1} />
              <Button title="Printer 2 Test print" onPress={handlePrint2} /> */}

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
