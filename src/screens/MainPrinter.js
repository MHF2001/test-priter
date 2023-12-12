import {View, Text} from 'react-native';
import React, {useState} from 'react';
import MainDiscovery from './MainDiscovery';
import {useSelector} from 'react-redux';
import MainPrinterInformation from './MainPrinterInformation';
import SelectDropdown from 'react-native-select-dropdown';
import WifiDiscovery from './WifiDiscovery';

const Main = () => {
  const {mainPrinter} = useSelector(state => state.printerReducers);
  const printerTypes = ['Sunmi', 'Wifi', 'IMEN', 'Others'];
  const [selected, setSelected] = useState('');
  const [newPrinter, setNewPrinter] = useState(false);
  return (
    <View>
      {mainPrinter && mainPrinter?.length > 0 && !newPrinter ? (
        <>
          <MainPrinterInformation
            setNewPrinter={setNewPrinter}
            newPrinter={newPrinter}
          />
        </>
      ) : (
        <>
          <View>
            <SelectDropdown
              data={printerTypes}
              onSelect={(selectedItem, index) => {
                setSelected(selectedItem);
              }}
              defaultButtonText="Select Printer Type"
              buttonStyle={{
                backgroundColor: '#fff',
                width: '20%',
                height: 40,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#000',
                paddingHorizontal: 10,
                marginTop: 10,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}
            />
          </View>
          {selected === 'Sunmi' ? (
            <MainDiscovery />
          ) : selected === 'Wifi' ? (
            <WifiDiscovery />
          ) : selected === 'IMEN' ? (
            <MainDiscovery />
          ) : selected === 'Others' ? (
            <MainDiscovery setNewPrinter={setNewPrinter} />
          ) : (
            <></>
          )}
        </>
      )}
    </View>
  );
};

export default Main;
