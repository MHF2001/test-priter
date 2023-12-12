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
import ThermalPrinterModule from '../components/ThermalPrinterModule';
import {clearData} from '../redux/printersReducers';
import {useNavigation} from '@react-navigation/native';
import RNRestart from 'react-native-restart';

const PrinterInformation = () => {
  const [printing, setPrinting] = useState(false);

  const {printers} = useSelector(state => state.printerReducers);

  const navigation = useNavigation();

  const printSimpleReceipt = async () => {
    setPrinting(true);

    const text2 = 'Nard Printer';
    printers?.forEach(async element => {
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

  const handleGoToNard = () => {
    navigation.navigate('webView');
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
            <TouchableOpacity
              onPress={() => {
                clearData();
                deleteAllData();
                RNRestart.Restart();
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
            {/* {printers && printers?.map(ele => <PrinterInfo printer={ele} />)} */}

            <View style={styles.contentCotainer}>
              <Button title="Test All Printer" onPress={printSimpleReceipt} />
              <Text style={styles.errorText} />
            </View>
            <View style={styles.button}>
              <Button title="Go To NardPos" onPress={handleGoToNard} />
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
  button: {
    margin: 10,
  },
});

export default PrinterInformation;
