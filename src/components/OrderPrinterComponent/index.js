import {View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import PrinterInformation from '../../screens/PrinterInformation';
import Discovery from '../../screens/Discovery';
import WifiDiscovery from '../../screens/WifiDiscovery';

const OrderPrinterComponent = ({printerName}) => {
  const {printers} = useSelector(state => state.printerReducers);
  const printerTypes = ['Sunmi', 'Wifi', 'IMEN', 'Others'];
  const [selected, setSelected] = useState('');

  const filterData = printers?.filter(
    element => element.printer === printerName,
  );
  return (
    <View>
      {filterData && filterData?.length > 0 ? (
        <>
          <PrinterInformation filterData={filterData} />
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
            <Discovery printerName={printerName} />
          ) : selected === 'Wifi' ? (
            <WifiDiscovery printerName={printerName} />
          ) : selected === 'IMEN' ? (
            <Discovery printerName={printerName} />
          ) : selected === 'Others' ? (
            <Discovery printerName={printerName} />
          ) : (
            <></>
          )}
        </>
      )}
    </View>
  );
};

export default OrderPrinterComponent;
