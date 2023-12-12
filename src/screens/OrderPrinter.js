import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Accordion from 'react-native-collapsible/Accordion';
import OrderPrinterComponent from '../components/OrderPrinterComponent';

const OrderPrinter = () => {
  const printersSelect = [
    {
      id: 1,
      title: 'Printer 1',
      content: <OrderPrinterComponent printerName={'Printer 1'} />,
    },
    {
      id: 2,
      title: 'Printer 2',
      content: <OrderPrinterComponent printerName={'Printer 2'} />,
    },
    {
      id: 3,
      title: 'Printer 3',
      content: <OrderPrinterComponent printerName={'Printer 3'} />,
    },
    {
      id: 4,
      title: 'Printer 4',
      content: <OrderPrinterComponent printerName={'Printer 4'} />,
    },
    {
      id: 5,
      title: 'Printer 5',
      content: <OrderPrinterComponent printerName={'Printer 5'} />,
    },
    {
      id: 6,
      title: 'Printer 6',
      content: <OrderPrinterComponent printerName={'Printer 6'} />,
    },
  ];
  const [activeSections, setActiveSections] = useState([]);

  const renderHeader = section => {
    return (
      <View>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const updateSections = activeSections => {
    setActiveSections([...activeSections]);
  };

  const renderContent = section => {
    return <View key={section.title}>{section.content}</View>;
  };
  return (
    <ScrollView>
      <Accordion
        sections={printersSelect}
        activeSections={activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
        sectionContainerStyle={styles.sectionContainerStyle}
        underlayColor="none"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  sectionContainerStyle: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 10,
    marginTop: 10,
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
  },
});

export default OrderPrinter;
