import React, {useRef, useState} from 'react';
import {View, Button, useWindowDimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import ThermalPrinterModule from '../ThermalPrinterModule';
import {base} from './htmlContant';
const MyWebView = ({onLoad, onLoadEnd}) => {
  const {height, width, scale, fontScale} = useWindowDimensions();

  // What we we should do The forntend to send the data from URL to the app and the base46
  /*
    const downloadElement = () => {
    window.ReactNativeWebView.postMessage(state);
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
    const userAgent = event.nativeEvent.data;
    const text2 = `[L]<img>${base}</img>\n`;
    await ThermalPrinterModule.printBluetooth({
      ip: '192.168.1.113',
      payload: text2,
    });
  };

  return (
    <WebView
      source={{uri: 'https://nardpos.com/'}}
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

  const onMessage = async event => {
    const userAgent = event.nativeEvent.data;
    const text2 = `[L]<img>${base}</img>\n`;
    await ThermalPrinterModule.printTcp({
      ip: '192.168.1.142',
      payload: text2,
    });
    await ThermalPrinterModule.printBluetooth({
      ip: '192.168.1.142',
      payload: text2,
    });
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}>
        {/* <MyWebView ref={webViewRef} onLoad={onLoad} onLoadEnd={onLoadEnd} /> */}
        <Button
          title="dddddddddddddddddddddddddddddddddddddd"
          onPress={onMessage}
        />
      </View>
    </>
  );
};

export default CaptureHtmlToBitmap;
