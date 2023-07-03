import BleManager from 'react-native-ble-manager';

export function initializeBluetooth() {
  return new Promise((resolve, reject) => {
    BleManager.start({ showAlert: false })
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function startScan() {
  return new Promise((resolve, reject) => {
    BleManager.scan([], 5, true)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function stopScan() {
  return new Promise((resolve, reject) => {
    BleManager.stopScan()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function retrieveConnectedDevices() {
  return new Promise((resolve, reject) => {
    BleManager.getConnectedPeripherals([])
      .then((peripheralsArray) => {
        resolve(peripheralsArray);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
