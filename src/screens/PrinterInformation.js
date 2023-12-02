import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getData} from '../components/storeData';
import PrinterInfo from '../components/PrinterInfo/PrinterInfo';
import {Button} from '../components/Button';
import ThermalPrinterModule from 'react-native-thermal-printer';

const PrinterInformation = ({route}) => {
  const {data} = route.params;
  const [printerData, setPrinterData] = useState(data || []);
  const [printing, setPrinting] = useState(false);

  const getPrinterData = () => {
    const result = getData();

    setPrinterData(result);
  };

  const printSimpleReceipt = async () => {
    setPrinting(true);

    const text =
      '[C]<img>https://c8.alamy.com/comp/2RBE3KC/person-taking-picture-by-reflex-camera-man-with-black-photo-camera-in-warm-summer-day-2RBE3KC.jpg</img>\n' +
      '[L]mOHAMMED' +
      '[L]محمد فرحان\n' +
      '[L]tEST\n' +
      '[L]\n';

    printerData?.forEach(async element => {
      if (element?.ipAddress) {
        await ThermalPrinterModule.printTcp({
          ip: element?.ipAddress,
          payload: text,
        });
      } else {
        // await ThermalPrinterModule.getBluetoothDeviceList();
        // await ThermalPrinterModule.printBluetooth({
        //   payload: text,
        //   macAddress: element.macAddress,
        // });
      }
    });
    setPrinting(false);
  };

  useEffect(() => {
    if (!data) {
      getPrinterData();
    }
  }, []);
  return (
    <View style={styles.container}>
      {printerData?.map(ele => (
        <PrinterInfo printer={ele} />
      ))}

      <View style={styles.contentCotainer}>
        <Button
          loading={printing}
          title="Test print"
          onPress={printSimpleReceipt}
        />
        <Text style={styles.errorText} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf9f9',
    alignItems: 'center',
  },
  contentCotainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PrinterInformation;
