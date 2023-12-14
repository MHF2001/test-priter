import React from 'react';
import {View, Image, StyleSheet, Text, ScrollView} from 'react-native';

const Invoice = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: 300,
        position: 'relative',
        right: 20,
      }}>
      <View style={styles.container}>
        <View style={styles.invoiceBody}>
          <Text style={styles.header}>Sale Invoice</Text>
          <View style={styles.titleSection}>
            <Text style={styles.title}>3-4-3</Text>
            <Text style={styles.title}>3</Text>
            <Text style={styles.title}>2023-11-22 03:32 PM</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.customCenter}>
            <View style={styles.table}>
              {/* Table headers */}
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Product</Text>
                <Text style={styles.tableHeader}>QTY</Text>
                <Text style={styles.tableHeader}>Price</Text>
                <Text style={styles.tableHeader}>Tax</Text>
                <Text style={styles.tableHeader}>Total</Text>
              </View>
              {/* Table data */}
              <View style={styles.tableRow}>
                <Text style={styles.tableData}>IZZO 1</Text>
                <Text style={styles.tableData}>1</Text>
                <Text style={styles.tableData}>0.00</Text>
                <Text style={styles.tableData}>0</Text>
                <Text style={styles.tableData}>0.00</Text>
              </View>
              {/* SN */}
              <Text style={styles.tableData} colSpan={5}>
                SN: 8088
              </Text>
              {/* Another table row */}
              <View style={styles.tableRow}>
                <Text style={styles.tableData}>ابو احمد</Text>
                <Text style={styles.tableData}>1</Text>
                <Text style={styles.tableData}>70.00</Text>
                <Text style={styles.tableData}>0</Text>
                <Text style={styles.tableData}>70.00</Text>
              </View>
              {/* UPC */}
              <Text style={styles.tableData} colSpan={5}>
                UPC: 100000004
              </Text>
            </View>
          </View>
          <View style={styles.separator} />
          {/* Additional sections */}
          {/* Subtotal, Discount, Tax, Total */}
          {/* Paid Amount, Remaining */}
          {/* Cash */}
          <View style={styles.separator} />
          {/* Served By */}
          <Text style={styles.servedBy}>You Served By: admin</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    // justifyContent: 'center',
    padding: 10,
  },
  invoiceBody: {
    margin: 'auto',
    padding: 5,
  },
  header: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 19,
    color: '#000',
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontSize: 14,
    fontWeight: '900',
    padding: 0,
    margin: 0,
    color: '#000',
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '900',
    padding: 0,
    margin: 0,
    color: '#000',
  },
  separator: {
    backgroundColor: 'black',
    height: 1,
    margin: 0,
  },
  customCenter: {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  tableHeader: {
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 13,
    width: '20%',
    color: '#000',
  },
  tableData: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '900',
    width: '20%',
    color: '#000',
  },
  servedBy: {
    flexDirection: 'column',
    margin: 0.5,
    padding: 1,
    whiteSpace: 'normal',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  image: {
    width: '50%',
    height: '50%',
  },
});

export default Invoice;
