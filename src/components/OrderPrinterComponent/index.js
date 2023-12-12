import {View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import PrinterInformation from '../../screens/PrinterInformation';
import Discovery from '../../screens/Discovery';
import WifiDiscovery from '../../screens/WifiDiscovery';

const OrderPrinterComponent = ({printerType}) => {
  const {printers} = useSelector(state => state.printerReducers);
  const printerTypes = ['Sunmi', 'Wifi', 'IMEN', 'Others'];
  const [selected, setSelected] = useState('');
  return (
    <View>
      {printers && printers?.length > 0 ? (
        <>
          <PrinterInformation />
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
            <Discovery printerTyp={printerType} />
          ) : selected === 'Wifi' ? (
            <WifiDiscovery printerType={printerType} />
          ) : selected === 'IMEN' ? (
            <Discovery printerType={printerType} />
          ) : selected === 'Others' ? (
            <Discovery printerType={printerType} />
          ) : (
            <></>
          )}
        </>
      )}
    </View>
  );
};

export default OrderPrinterComponent;
