import React from "react";
import { View, Text } from "react-native";
import styles from "./LoadingScreen.style";

const LoadingScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Loading...</Text>
  </View>
);

export default LoadingScreen;
