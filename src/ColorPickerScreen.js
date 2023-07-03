import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ColorPicker } from 'react-native-color-picker';

const ColorPickerScreen = ({ route }) => {
  const { device } = route.params;
  const [selectedColor, setSelectedColor] = useState('#000000');

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSendColor = () => {
    // Send the selected color (selectedColor) to the connected device (device)
    // Implement your code here to send the color via Bluetooth to the device
    console.log('Sending color', selectedColor, 'to device:', device.name);
  };

  return (
    <View>
      <Text>Select a color:</Text>
      <ColorPicker
        style={{ flex: 1 }}
        defaultColor={selectedColor}
        onColorChange={handleColorChange}
        hideSliders={true}
        hideControls={true}
      />
      <Button title="Send Color" onPress={handleSendColor} />
    </View>
  );
};

export default ColorPickerScreen;
