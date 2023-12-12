import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('====================================');
    console.log(`Error while save Data: ${e}`);
    console.log('====================================');
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    const parseValue = JSON.parse(value);
    if (parseValue !== null) {
      return parseValue;
    } else {
      return null;
    }
  } catch (e) {
    // error reading value
    console.log('====================================');
    console.log(`Error while get Data: ${e}`);
    console.log('====================================');
  }
};

export const deleteAllData = async key => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
    console.log('====================================');
    console.log(`Error while delete Data: ${e}`);
    console.log('====================================');
  }

  console.log('Done.');
};
