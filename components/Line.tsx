import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';

interface LineProps {
  color?: string;
  thickness?: number;
  style?: ViewStyle;
}

const Line: React.FC<LineProps> = ({ color = 'black', thickness = 1, style }) => {
  const lineStyles = StyleSheet.create({
    line: {
      width: '100%',
      height: thickness, // Use the specified thickness or default to 1
      backgroundColor: color, // Use the specified color or default to black
      ...style, // Apply additional custom styles
    },
  });

  return <View style={lineStyles.line} />;
};

export default Line;
