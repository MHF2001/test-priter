import React, {useRef, useState} from 'react';
import {View, Button, useWindowDimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import {captureScreen} from 'react-native-view-shot';
import ThermalPrinterModule from '../ThermalPrinterModule';
import {base} from './htmlContant';
const MyWebView = ({onLoad, onLoadEnd}) => {
  const {height, width, scale, fontScale} = useWindowDimensions();

  // What we we should do The forntend to send the data from URL to the app and the base46
  /* 
    const downloadElement = () => {
    window.ReactNativeWebView.postMessage(state);
  };
  */
  const onMessage = async event => {
    const userAgent = event.nativeEvent.data;
    const text2 = `[L]<img>${userAgent}</img>\n`;
    await ThermalPrinterModule.printBluetooth({
      ip: '192.168.1.113',
      payload: text2,
    });
  };

  return (
    <WebView
      source={{uri: 'http://192.168.1.20:4200'}}
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
          backgroundColor: 'white',
        }}>
        <MyWebView ref={webViewRef} onLoad={onLoad} onLoadEnd={onLoadEnd} />
      </View>
    </>
  );
};

export default CaptureHtmlToBitmap;
