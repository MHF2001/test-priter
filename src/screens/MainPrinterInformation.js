import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import PrinterInfo from '../components/PrinterInfo/PrinterInfo';
import {Button} from '../components/Button';
import {useSelector} from 'react-redux';
import ThermalPrinterModule from '../components/ThermalPrinterModule';
import {useNavigation} from '@react-navigation/native';

const MainPrinterInformation = ({setNewPrinter}) => {
  const [printing, setPrinting] = useState(false);

  const {mainPrinter} = useSelector(state => state.printerReducers);

  const navigation = useNavigation();

  const printSimpleReceipt = async () => {
    setPrinting(true);

    const text2 = 'Nard Printer';
    mainPrinter?.forEach(async element => {
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
    <ScrollView>
      <View style={styles.containerView}>
        <TouchableOpacity
          onPress={async () => {
            setNewPrinter(true);
          }}>
          <Text
            style={{
              color: '#000',
            }}>
            Add New Printer
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {mainPrinter &&
          mainPrinter?.map((ele, i) => <PrinterInfo key={i} printer={ele} />)}

        <View style={styles.contentCotainer}>
          <Button title="Test All Printer" onPress={printSimpleReceipt} />
          <Text style={styles.errorText} />
        </View>
        <View style={styles.button}>
          <Button title="Go To NardPos" onPress={handleGoToNard} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  saveAreaViewContainer: {flex: 1, backgroundColor: '#fcf9f9'},
  container: {
    backgroundColor: '#fcf9f9',
    alignItems: 'center',
  },
  contentCotainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    margin: 10,
  },
  containerView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fcf9f9',
    width: '100%',
  },
});

export default MainPrinterInformation;
