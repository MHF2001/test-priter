import React from 'react';
import {RootNavigator} from './components/navigation';
import {store} from './redux/store';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persister} from './redux/store';
import CaptureHtmlToBitmap from './components/MyWebView';
import WebView from 'react-native-webview';

const App = () => {
  return (
    <>
      <ReduxProvider store={store}>
        <PersistGate persistor={persister} loading={null}>
          <RootNavigator />
          {/* <CaptureHtmlToBitmap /> */}
        </PersistGate>
      </ReduxProvider>
    </>
  );
};

export default App;
