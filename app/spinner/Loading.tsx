import React from "react";
import { StyleSheet, View } from "react-native";

import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";

const Loading = () => (
  <View style={[styles.container, styles.horizontal]}>
    <BallIndicator animating={true} color={"#236bfd"} count={8} size={40} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  spiner: {
    fontSize: 30,
  },
});

export default Loading;
