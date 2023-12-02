import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator, View} from 'react-native';
import {styles} from './styles';

export const Button = ({onPress, title, loading}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.container}
      disabled={loading}>
      <Text style={[styles.text, loading && styles.hidden]}>{title}</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
