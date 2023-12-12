import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {removeMainPrinter} from '../../redux/printersReducers';
import {useDispatch} from 'react-redux';

const PrinterInfo = ({printer}) => {
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
          dispatch(removeMainPrinter(printer.deviceName));
        }}>
        <Text style={styles.text}>Forget Printer</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PrinterInfo;
