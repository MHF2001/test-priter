import React, {useRef, useState} from 'react';
import {View, Button} from 'react-native';
import {WebView} from 'react-native-webview';
import {captureScreen} from 'react-native-view-shot';
import ThermalPrinterModule from '../ThermalPrinterModule';

const MyWebView = ({htmlContent, onLoad, onLoadEnd}) => {
  return (
    <WebView
      source={{html: htmlContent}}
      onLoad={onLoad}
      onLoadEnd={onLoadEnd}
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
          const result = await captureScreen({
            format: 'jpg',
            quality: 0.8,
          });

          console.log('Captured image:', result);
          const text2 = `[L]<img>${result}</img>\n`;
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
          htmlContent={`
        <html dir="ltr" lang="en">
        <head>
          <meta charset="UTF-8" />
          <style>
            .invoice-body {
              width: 100%;
              display: table;
              margin: 0 auto;
              padding: 5px;
              position: absolute;
            }
          </style>
          <style>
            .custom-center {
              display: flex !important;
              justify-content: center !important;
              align-items: center !important;
            }
          </style>
          <style>
            p {
              margin: 0;
            }
          </style>
        </head>
        <body class="invoice-body">
          <div style="text-align: center; margin: 0; padding: 0"></div>
          <p
            style="
              margin: 0;
              padding: 0;
              text-align: center;
              font-weight: 900;
              font-size: 19px;
              direction: ltr;
            "
          >
            Sale Invoice
          </p>
          <div
            id="title-section"
            style="
              text-align: center;
              font-size: 14px;
              font-weight: 900;
              padding: 0;
              margin: 0px;
              direction: ltr;
            "
          >
            3-4-3
          </div>
          <div
            id="title-section"
            style="
              text-align: center;
              font-size: 14px;
              font-weight: 900;
              padding: 0;
              margin: 0px;
              direction: ltr;
            "
          >
            3
          </div>
          <div
            id="title-section"
            style="
              text-align: center;
              font-size: 14px;
              font-weight: 900;
              padding: 0;
              margin: 0px;
              direction: ltr;
            "
          >
            2023-11-22 03:32 PM
          </div>
          <hr style="background-color: black; height: 1px; margin: 0" />
          <div class="custom-center" style="width: 100%; text-align: center">
            <table
              cellpadding="0"
              cellspacing="0"
              border="1"
              style="
                width: 100%;
                text-align: center;
                font-weight: bold;
                font-size: 13px;
                direction: ltr;
              "
            >
              <thead>
                <tr>
                  <th
                    class="table-border"
                    style="
                      text-align: center;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                      font-size: 13px;
                      width: 40%;
                    "
                  >
                    Product
                  </th>
                  <th
                    class="table-border"
                    style="
                      text-align: center;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                      font-size: 13px;
                      width: 12%;
                    "
                  >
                    QTY
                  </th>
                  <th
                    class="table-border"
                    style="
                      text-align: center;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                      font-size: 13px;
                      width: 12%;
                    "
                  >
                    Price
                  </th>
                  <th
                    class="table-border"
                    style="
                      text-align: center;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                      font-size: 13px;
                      width: 12%;
                    "
                  >
                    Tax
                  </th>
                  <th
                    class="table-border"
                    style="
                      text-align: center;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                      font-size: 13px;
                      width: 12%;
                    "
                  >
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    class="table-border"
                    style="
                      text-align: center;
                      font-size: 13px;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                      width: 40%;
                    "
                  >
                    IZZO 1
                  </td>
                  <td
                    class="table-border"
                    style="
                      text-align: center;
                      font-size: 13px;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                      width: 12%;
                    "
                  >
                    1
                  </td>
                  <td
                    class="table-border"
                    style="
                      text-align: center;
                      font-size: 13px;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                      width: 12%;
                    "
                  >
                    0.00
                  </td>
                  <td
                    class="table-border"
                    style="
                      text-align: center;
                      font-size: 13px;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                      width: 12%;
                    "
                  >
                    0
                  </td>
                  <td
                    class="table-border"
                    style="
                      text-align: center;
                      font-size: 13px;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                      width: 12%;
                    "
                  >
                    0.00
                  </td>
                </tr>
                <tr>
                  <td
                    class="table-border"
                    style="
                      text-align: center;
                      font-size: 13px;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                    "
                    colspan="5"
                  >
                    SN: 8088
                  </td>
                </tr>
                <tr>
                  <td
                    class="table-border"
                    style="
                      text-align: center;
                      font-size: 13px;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                      width: 40%;
                    "
                  >
                    Barcode 4
                  </td>
                  <td
                    class="table-border"
                    style="
                      text-align: center;
                      font-size: 13px;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                      width: 12%;
                    "
                  >
                    1
                  </td>
                  <td
                    class="table-border"
                    style="
                      text-align: center;
                      font-size: 13px;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                      width: 12%;
                    "
                  >
                    70.00
                  </td>
                  <td
                    class="table-border"
                    style="
                      text-align: center;
                      font-size: 13px;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                      width: 12%;
                    "
                  >
                    0
                  </td>
                  <td
                    class="table-border"
                    style="
                      text-align: center;
                      font-size: 13px;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                      width: 12%;
                    "
                  >
                    70.00
                  </td>
                </tr>
                <tr>
                  <td
                    class="table-border"
                    style="
                      text-align: center;
                      font-size: 13px;
                      font-weight: 900;
                      padding: 0;
                      margin: 0px;
                    "
                    colspan="5"
                  >
                    UPC: 100000004
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr style="background-color: black; height: 1px; margin: 0" />
          <div class="custom-center" style="width: 100%; text-align: center">
            <table
              cellpadding="0"
              cellspacing="0"
              class="table-border"
              style="width: 95%; font-size: 14px; direction: ltr; font-weight: bold"
            >
              <tbody>
                <tr>
                  <td style="width: 50%">Subtotal</td>
                  <td style="width: 50%">70.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="custom-center" style="width: 100%; text-align: center">
            <table
              cellpadding="0"
              cellspacing="0"
              class="table-border"
              style="width: 95%; font-size: 14px; direction: ltr; font-weight: bold"
            >
              <tbody>
                <tr>
                  <td style="width: 50%">Discount</td>
                  <td style="width: 50%">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="custom-center" style="width: 100%; text-align: center">
            <table
              cellpadding="0"
              cellspacing="0"
              class="table-border"
              style="width: 95%; font-size: 14px; direction: ltr; font-weight: bold"
            >
              <tbody>
                <tr>
                  <td style="width: 50%">Tax</td>
                  <td style="width: 50%">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="custom-center" style="width: 100%; text-align: center">
            <table
              cellpadding="0"
              cellspacing="0"
              class="table-border"
              style="width: 95%; font-size: 30px; direction: ltr; font-weight: bold"
            >
              <tbody>
                <tr>
                  <td style="width: 50%">Total</td>
                  <td style="width: 50%">70.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="custom-center" style="width: 100%; text-align: center">
            <table
              cellpadding="0"
              cellspacing="0"
              class="table-border"
              style="width: 95%; font-size: 14px; direction: ltr; font-weight: bold"
            >
              <tbody>
                <tr>
                  <td style="width: 50%">Paid Amount</td>
                  <td style="width: 50%">70.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="custom-center" style="width: 100%; text-align: center">
            <table
              cellpadding="0"
              cellspacing="0"
              class="table-border"
              style="width: 95%; font-size: 14px; direction: ltr; font-weight: bold"
            >
              <tbody>
                <tr>
                  <td style="width: 50%">Remaining</td>
                  <td style="width: 50%">0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr style="background-color: black; height: 1px; margin: 0" />
          <div class="custom-center" style="width: 100%; text-align: center">
            <table
              cellpadding="0"
              cellspacing="0"
              class="table-border"
              style="width: 95%; font-size: 14px; direction: ltr; font-weight: bold"
            >
              <tbody>
                <tr>
                  <td style="width: 50%">Cash</td>
                  <td style="width: 50%">70</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr style="background-color: black; height: 1px; margin: 0" />
          <div
            class="custom-center"
            style="
              flex-direction: column;
              margin: 0.5px;
              padding: 1px;
              white-space: normal;
              text-align: center;
              font-size: 14px;
              font-weight: bold;
              direction: ltr;
            "
          >
            You Served By: admin
          </div>
          <div
            class="custom-center"
            style="
              flex-direction: column;
              margin: 0.5px;
              padding: 1px;
              white-space: normal;
              text-align: center;
              font-size: 14px;
              font-weight: bold;
              direction: ltr;
            "
          ></div>
          <div
            class="custom-center"
            style="
              flex-direction: column;
              margin: 0.5px;
              padding: 1px;
              white-space: normal;
              text-align: center;
              font-size: 14px;
              font-weight: bold;
              direction: ltr;
            "
          ></div>
        </body>
      </html>
            
        `}
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
