import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Button} from '../components/Button';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import ThermalPrinterModule from '../components/ThermalPrinterModule';
import {useNavigation} from '@react-navigation/native';
import PrinterInfoOrder from '../components/PrinterInfo/PrinterInfoOrder';
import {base} from '../components/MyWebView/htmlContant';

const PrinterInformation = ({filterData}) => {
  const [printing, setPrinting] = useState(false);

  const navigation = useNavigation();

  const printSimpleReceipt = async () => {
    setPrinting(true);

    const text2 = 'Nard Printer';
    filterData?.forEach(async element => {
      if (element?.ipAddress) {
        await ThermalPrinterModule.printTcp({
          ip: element?.ipAddress,
          /*  payload:
            '[L]\n' +
            `[C]<u><font>NARD POS Printer => ${element.printer}</font></u>\n` +
            '[L]\n', */
          payload: `[C]<img>${base}</img>\n`,
        });
      } else {
        await ThermalPrinterModule.getBluetoothDeviceList();
        await ThermalPrinterModule.printBluetooth({
          /*  payload:
            '[L]\n' +
            `[C]<u><font>NARD POS Printer => ${element.printer}</font></u>\n` +
            '[L]\n', */
          payload: `[C]<img>${base}</img>\n`,
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
          <View style={styles.container}>
            {filterData &&
              filterData?.map((ele, i) => (
                <PrinterInfoOrder key={i} printer={ele} />
              ))}

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
