import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, PermissionsAndroid } from 'react-native';
import BleManager from 'react-native-ble-manager';

const BluetoothApp = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    initializeBluetooth();

    return () => {
      BleManager.stopScan();
    };
  }, []);

  const initializeBluetooth = async () => {
    try {
      await BleManager.start({ showAlert: false });
      console.log('Bluetooth initialized');

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error initializing Bluetooth:', error);
    }
  };

  const startScan = () => {
    console.log("come here")
    setIsScanning(true);
    setDevices([]);

    BleManager.scan([], 5, true)
      .then(() => console.log('Scanning started'))
      .catch((error) => console.error('Error starting scan:', error));
  };

  const stopScan = () => {
    setIsScanning(false);
    BleManager.stopScan();
    console.log('Scanning stopped');
  };

  const handleConnectToDevice = (device) => {
    BleManager.connect(device.id)
      .then(() => console.log('Connected to device:', device.name))
      .catch((error) => console.error('Error connecting to device:', error));
  };

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
      <Button
        title="Connect"
        onPress={() => handleConnectToDevice(item)}
      />
    </View>
  );

  return (
    <View>
      <Button
        title={isScanning ? 'Stop Scan' : 'Start Scan'}
        onPress={isScanning ? stopScan : startScan}
      />
      <FlatList
        data={devices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default BluetoothApp;
