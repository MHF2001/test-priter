import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useRef, useCallback} from 'react';
import PrinterInfo from '../components/PrinterInfo/PrinterInfo';
import {Button} from '../components/Button';
import {useSelector} from 'react-redux';
import ThermalPrinterModule from '../components/ThermalPrinterModule';
import {useNavigation} from '@react-navigation/native';
import {base, base2, html} from '../components/MyWebView/htmlContant';
import ViewShot from 'react-native-view-shot';
import WebView from 'react-native-webview';
const MainPrinterInformation = ({setNewPrinter}) => {
  const [printing, setPrinting] = useState(false);

  const viewShotRef = useRef(null);

  const {mainPrinter, printers} = useSelector(state => state.printerReducers);

  const navigation = useNavigation();

  const onCapture = useCallback(() => {
    if (viewShotRef.current) {
      viewShotRef.current.capture().then(uri => {
        console.log('Image captured', uri);

        mainPrinter?.forEach(async element => {
          if (element?.ipAddress) {
            await ThermalPrinterModule.printTcp({
              ip: element?.ipAddress,
              payload: `[C]<img>${uri}</img>\n`,
            });
          } else {
            await ThermalPrinterModule.getBluetoothDeviceList();
            await ThermalPrinterModule.printBluetooth({
              payload: `[C]<img>${uri}</img>\n`,
              macAddress: element.macAddress,
            });
            // await ThermalPrinterModu
          }
        });
      });
    }
  }, [viewShotRef]);

  const printSimpleReceipt = async () => {
    setPrinting(true);

    const text2 = 'Nard Printer';
    mainPrinter?.forEach(async element => {
      if (element?.ipAddress) {
        await ThermalPrinterModule.printTcp({
          ip: element?.ipAddress,
          /*  payload:
            '[L]\n' +
            `[C]<u><font>NARD POS Printer => ${element.printer}</font></u>\n` +
            '[L]\n', */
          payload: `[C]<img>${base}</img>\n`,
        });
        await ThermalPrinterModule.printTcp({
          ip: '192.168.1.142',
          /*  payload:
            '[L]\n' +
            `[C]<u><font>NARD POS Printer => ${element.printer}</font></u>\n` +
            '[L]\n', */
          payload: `[C]<img>${base2}</img>\n`,
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

  const printAll = () => {
    setPrinting(true);
    mainPrinter?.forEach(async element => {
      if (element?.ipAddress) {
        await ThermalPrinterModule.printTcp({
          ip: element?.ipAddress,
          payload: `[C]<img>${base2}</img>\n`,
        });
        await ThermalPrinterModule.printTcp({
          ip: element?.ipAddress,
          payload: `[C]<img>${base2}</img>\n`,
        });
      } else {
        await ThermalPrinterModule.getBluetoothDeviceList();
        await ThermalPrinterModule.printBluetooth({
          payload: `[C]<img>${base}</img>\n`,

          macAddress: element.macAddress,
        });
      }
    });
    printers?.forEach(async element => {
      if (element?.ipAddress) {
        // await ThermalPrinterModule.printTcp({
        //   ip: element?.ipAddress,
        //   payload: `[C]<img>${base}</img>\n`,
        // });
        // await ThermalPrinterModule.printTcp({
        //   ip: element?.ipAddress,
        //   payload: `[C]<img>${base2}</img>\n`,
        // });
      } else {
        await ThermalPrinterModule.getBluetoothDeviceList();
        await ThermalPrinterModule.printBluetooth({
          payload:
            '[L]\n' +
            `[C]<u><font>NARD POS Printer => ${element.printer}</font></u>\n` +
            '[L]\n',
          macAddress: element.macAddress,
        });
      }
    });
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

        <ViewShot
          ref={viewShotRef}
          options={{format: 'png', quality: 1}}
          style={styles.hidden}>
          {/* React Native components you want to capture */}
          <WebView
            source={{html: html}}
            style={{width: 340, padding: 0, margin: 0}}
          />
        </ViewShot>

        <View style={styles.contentCotainer}>
          <Button title="Test All Main Printer" onPress={onCapture} />
          <Text style={styles.errorText} />
        </View>
        <View style={styles.button}>
          <Button title="Go To NardPos" onPress={handleGoToNard} />
        </View>
      </View>
      <View style={styles.contentCotainer}>
        <Button title="Test All Printer" onPress={printAll} />
        <Text style={styles.errorText} />
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
  hidden: {
    position: 'absolute',
    left: -10000, // Move the off-screen to ensure it doesn't interfere with the layout
    // backgroundColor: 'white',
    height: '100%',
  },
});

export default MainPrinterInformation;
