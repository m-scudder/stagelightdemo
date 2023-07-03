import React, { useEffect } from 'react';
import { Button, Platform } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import { BluetoothStatus } from 'react-native-bluetooth-status';

const openBluetoothSettings = () => {
    BluetoothStatus.getState()
      .then((bluetoothState) => {
        if (bluetoothState !== 'on') {
          if (Platform.OS === 'android') {
            request(PERMISSIONS.ANDROID.BLUETOOTH_ADMIN).then((result) => {
              if (result === 'granted') {
                IntentLauncher.startActivityAsync(IntentLauncher.ACTION_BLUETOOTH_SETTINGS);
              }
            });
          } else {
            // For iOS, you can navigate to Bluetooth settings through app settings
            Linking.openSettings();
          }
        }
      });
  };
  const BluetoothSettingsScreen = () => {
    useEffect(() => {
      openBluetoothSettings();
    }, []);
  
    return (
      // Render your component's UI
      <Button title="Open Bluetooth Settings" onPress={openBluetoothSettings} />
    );
  };
  
  export default BluetoothSettingsScreen;
    