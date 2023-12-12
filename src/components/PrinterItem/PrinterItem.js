import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';

import {Pressable, Text} from 'react-native';
import {DeviceInfo} from 'react-native-esc-pos-printer';
import {styles} from './styles';

export const PrinterItem = ({printer, onPress}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    onPress(printer);
    setIsPressed(!isPressed);
  };
  return (
    <Pressable
      onPress={() => handlePress()}
      // disabled={isPressed}
      style={{
        ...styles.container,
      }}>
      <Text style={{color: isPressed ? 'red' : '#000'}}>
        {printer.deviceName}
      </Text>
      <Text style={styles.subtitle}>
        {printer.ipAddress
          ? 'IP:' + printer.ipAddress
          : 'MacAddress' + printer.macAddress}
      </Text>
    </Pressable>
  );
};
