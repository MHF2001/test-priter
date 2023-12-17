import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import ThermalPrinterModule from '../ThermalPrinterModule';
import {base} from './htmlContant';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {WEBSITE_URL} from '../../Env';
import ViewShot, {captureRef} from 'react-native-view-shot';

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

const CaptureHtmlToBitmap = () => {
  const webViewRef = useRef();
  const [webViewLoaded, setWebViewLoaded] = useState(false);
  const {height, width, scale, fontScale} = useWindowDimensions();
  const {mainPrinter, printers} = useSelector(state => state.printerReducers);
  const [printersInfo, setPrintersInfo] = useState([
    {name: 'Main Printer', key: 'main_printer'},
    {name: 'Printer 1', key: 'printer_1'},
    {name: 'Printer 2', key: 'printer_2'},
    {name: 'Printer 3', key: 'printer_3'},
    {name: 'Printer 4', key: 'printer_4'},
    {name: 'Printer 5', key: 'printer_5'},
    {name: 'Printer 6', key: 'printer_6'},
  ]);
  const [html, setHtml] = useState('');
  const viewShotRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  // Navigation
  const navigation = useNavigation();
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
    const data = event.nativeEvent.data;

    const parseData = JSON.parse(data);
    setHtml(parseData?.html);
    if (parseData.isPrinterSetting) {
      navigation.navigate('TopNavigation');
    } else {
      setTimeout(async () => {
        if (viewShotRef.current && contentHeight > 0) {
          viewShotRef.current.capture().then(uri => {
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
              }
            });
            setHtml('');
            setContentHeight(0);
          });
        }
      }, 1000);
    }
  };

  const onMessageHeigh = event => {
    try {
      const messageData = JSON.parse(event.nativeEvent.data);
      if (messageData.type === 'height') {
        console.log('====================================');
        console.log(messageData.height);
        console.log('====================================');
        setContentHeight(messageData.height); // Set the content height
      }
    } catch (error) {
      console.error('Failed to parse message from WebView:', error);
    }
  };

  const injectedJavaScript = `
      const height = document.body.scrollHeight;
      window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'height', height }));
    true; // this line is important for injectedJavaScript to work
  `;

  return (
    <>
      <WebView
        source={{uri: WEBSITE_URL}}
        onLoad={onLoad}
        javascriptenabled={true}
        onMessage={onMessage}
        style={{
          height: height,
          width: width,
        }}
      />
      <ViewShot
        options={{format: 'png', quality: 0.9}}
        ref={viewShotRef}
        style={styles.hidden}>
        <WebView
          source={{html: html}}
          injectedJavaScript={injectedJavaScript}
          onMessage={onMessageHeigh}
          scalesPageToFit={true}
          style={{width: 340, padding: 0, margin: 0, height: contentHeight}}
        />
      </ViewShot>
    </>
  );
};

const styles = StyleSheet.create({
  hidden: {
    position: 'absolute',
    left: -10000, // Move the off-screen to ensure it doesn't interfere with the layout
    backgroundColor: 'white',
    // height: '100%',
  },
});

export default CaptureHtmlToBitmap;
