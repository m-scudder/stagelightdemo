import { NativeModules } from 'react-native';

const { BluetoothModule } = NativeModules;

export const getDevices = async () => {
  try {
    const devices = await BluetoothModule.getDevices();
    return devices;
  } catch (error) {
    throw new Error('Error fetching devices: ' + error);
  }
};

export const connectToDevice = async (device) => {
  try {
    await BluetoothModule.connectToDevice(device);
    // Perform any additional actions after connecting to the device
  } catch (error) {
    throw new Error('Error connecting to device: ' + error);
  }
};
