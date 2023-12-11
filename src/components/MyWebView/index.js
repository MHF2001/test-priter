import React, {useRef, useState} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import ThermalPrinterModule from '../ThermalPrinterModule';
import {base} from './htmlContant';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {WEBSITE_URL} from '../../Env';

const MyWebView = ({onLoad, onLoadEnd}) => {
  const {height, width, scale, fontScale} = useWindowDimensions();
  const state = useSelector(state => state.printerReducers);
  const [printers, setPrinters] = useState([
    {name: 'Main Printer', key: 'main_printer'},
    {name: 'Printer 1', key: 'printer_1'},
    {name: 'Printer 2', key: 'printer_2'},
  ]);
  // Navigation
  const navigation = useNavigation();

  /*
   What we we should do The forntend to send the data from URL to the app and the base46

    const downloadElement = () => {
      The data will be JSON with tow keys (image, printerSettings)
    window.ReactNativeWebView.postMessage(data );
  };


  some style for the HTML in the html element
          style={{
          margin: 0,
          padding: 0,
          width: "100%",
          backgroundColor: "#ffff",
        }}
  */
  const onMessage = async event => {
    const data = event.nativeEvent.data;
    console.log('====================================');
    console.log(data);
    console.log('====================================');
    const parseData = JSON.parse(data);

    if (parseData.isPrinterSetting) {
      navigation.navigate('Discovery');
    } else {
      const text2 = `[L]<img>${parseData.image}</img>\n`;

      state?.forEach(async element => {
        for (const printer of printers) {
          // Check if the printer.name === the printer info
          if (printer.name === element.printer) {
            if (element?.ipAddress) {
              await ThermalPrinterModule.printTcp({
                ip: element?.ipAddress,
                payload: text2, // or `image-${printer.key}`
              });
            } else {
              await ThermalPrinterModule.getBluetoothDeviceList();
              await ThermalPrinterModule.printBluetooth({
                payload: text2, // or `image-${printer.key}`
                macAddress: element.macAddress,
              });
            }
          }
        }
      });
    }
  };

  return (
    <WebView
      source={{uri: WEBSITE_URL}}
      onLoad={onLoad}
      onLoadEnd={onLoadEnd}
      javascriptenabled={true}
      onMessage={onMessage}
      style={{
        height: height,
        width: width,
      }}
    />
  );
};

const CaptureHtmlToBitmap = () => {
  const webViewRef = useRef();
  const [webViewLoaded, setWebViewLoaded] = useState(false);

  const onLoad = () => {
    // This event is triggered when the initial HTML content is loaded
    console.log('WebView loaded.');
  };

  const onLoadEnd = () => {
    // This event is triggered when the WebView has fully loaded, including any additional resources
    console.log('WebView fully loaded.');
    setWebViewLoaded(true);
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}>
        <MyWebView ref={webViewRef} onLoad={onLoad} onLoadEnd={onLoadEnd} />
        {/* <Button title="Print" onPress={onMessage} /> */}
      </View>
    </>
  );
};

export default CaptureHtmlToBitmap;
