import React, {useRef, useState} from 'react';
import {View, Button, useWindowDimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import {captureScreen} from 'react-native-view-shot';
import ThermalPrinterModule from '../ThermalPrinterModule';
import {base} from './htmlContant';
const MyWebView = ({htmlContent, onLoad, onLoadEnd}) => {
  const {height, width, scale, fontScale} = useWindowDimensions();

  return (
    <WebView
      source={{uri: 'http://192.168.1.20:6520'}}
      onLoad={onLoad}
      onLoadEnd={onLoadEnd}
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

  const capture = async () => {
    // Adding a short delay to ensure the WebView is fully loaded
    setTimeout(async () => {
      if (webViewLoaded) {
        try {
          const text2 = `[L]<img>${base}</img>\n`;
          await ThermalPrinterModule.printBluetooth({
            ip: '192.168.1.113',
            payload: text2,
          });
          // await ThermalPrinterModule.getBluetoothDeviceList();
          // await ThermalPrinterModule.printBluetooth({
          //   payload: text2,
          //   macAddress: '44:09:32:29:34:28',
          // });
          // You can save or use the captured image as needed
        } catch (error) {
          console.error('Capture error:', error);
        }
      }
    }, 1000); // You can adjust the delay as needed
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <MyWebView
          htmlContent={HTMLCONTANT}
          ref={webViewRef}
          onLoad={onLoad}
          onLoadEnd={onLoadEnd}
        />
      </View>

      <Button title="Capture" onPress={capture} />
    </>
  );
};

export default CaptureHtmlToBitmap;
