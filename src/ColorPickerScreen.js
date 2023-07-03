import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';
import { sendColorToDevice } from './BluetoothModule';

const ColorPickerScreen = ({ route }) => {
  const { device } = route.params;
  const [selectedColor, setSelectedColor] = useState('#000000');

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSendColor = () => {
    sendColorToDevice(device, selectedColor)
      .then(() => {
        console.log('Color sent successfully');
      })
      .catch((error) => {
        console.log('Error sending color:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.selectedColorText}>Selected Color: {selectedColor}</Text>
      <ColorPicker
        onColorChange={handleColorChange}
        style={styles.colorPicker}
        color={selectedColor}
      />
      <Button title="Send Color" onPress={handleSendColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedColorText: {
    fontSize: 20,
    marginBottom: 16,
  },
  colorPicker: {
    width: '80%',
    height: 300,
  },
});

export default ColorPickerScreen;
