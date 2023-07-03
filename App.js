import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { initializeBluetooth, startScan, stopScan, retrieveConnectedDevices } from './src/BluetoothModule';
import {NavigationContainer} from '@react-navigation/native';
import ColorPickerScreen from './src/ColorPickerScreen';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const App = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    initializeBluetooth()
      .then(() => {
        retrieveConnectedDevices()
          .then((connectedDevices) => {
            setDevices(connectedDevices);
          })
          .catch((error) => {
            console.log('Error retrieving connected devices:', error);
          });
      })
      .catch((error) => {
        console.log('Error initializing Bluetooth:', error);
      });
  }, []);

  const handleScanButtonPress = () => {
    startScan()
      .then(() => {
        setTimeout(() => {
          stopScan()
            .then(() => {
              console.log('Scan stopped');
            })
            .catch((error) => {
              console.log('Error stopping scan:', error);
            });
        }, 5000);
      })
      .catch((error) => {
        console.log('Error starting scan:', error);
      });
  };

  const handleDeviceSelect = (device) => {
    navigation.navigate('ColorPicker', { device });
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="DeviceList" options={{ title: 'Bluetooth Devices' }}>
          {() => (
            <View style={styles.container}>
              <Button title="Scan" onPress={handleScanButtonPress} />
              <FlatList
                data={devices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.deviceContainer}>
                    <Text
                      style={styles.deviceName}
                      onPress={() => handleDeviceSelect(item)}
                    >
                      {item.name}
                    </Text>
                    <Text style={styles.deviceAddress}>{item.id}</Text>
                  </View>
                )}
              />
            </View>
          )}
        </Stack.Screen>
        {/* <Stack.Screen
          name="ColorPicker"
          component={ColorPickerScreen}
          options={({ route }) => ({ title: route.params?.device.name })}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  deviceContainer: {
    marginBottom: 8,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: 'blue',
  },
  deviceAddress: {
    fontSize: 12,
    color: 'gray',
  },
});

export default App;
