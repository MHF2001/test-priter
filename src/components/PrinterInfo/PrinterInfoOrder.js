import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {removeMainPrinter, removePrinter} from '../../redux/printersReducers';
import {useDispatch} from 'react-redux';

const PrinterInfoOrder = ({printer}) => {
  const dispatch = useDispatch();
  const renderPrinterInfo = () => {
    return Object.keys(printer).map(key => {
      return (
        <View>
          <Text style={styles.text}>
            <Text style={[styles.text, styles.bold]}>{key}</Text>:{' '}
            {printer[key]}
          </Text>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      {renderPrinterInfo()}
      <TouchableOpacity
        onPress={() => {
          dispatch(removePrinter(printer.deviceName));
        }}
        style={{
          backgroundColor: '#fff',
          width: '70%',
          height: 45,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#000',
          paddingHorizontal: 10,
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text style={styles.text}>Forget Printer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrinterInfoOrder;
