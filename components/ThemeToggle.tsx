"use client";

import React from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export const ThemeToggle = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const translateX = React.useRef(new Animated.Value(isDark ? 28 : 0)).current;

  React.useEffect(() => {
    Animated.spring(translateX, {
      toValue: isDark ? 28 : 0,
      friction: 6,
      tension: 80,
      useNativeDriver: true,
    }).start();
  }, [isDark]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleTheme}
      style={[
        styles.container,
        { backgroundColor: isDark ? theme.primary : "#E0E0E0" },
      ]}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name="sunny"
          size={16}
          color={isDark ? "rgba(255,255,255,0.5)" : "#FDB813"}
        />
        <Ionicons
          name="moon"
          size={16}
          color={isDark ? "#FFFFFF" : "rgba(0,0,0,0.3)"}
        />
      </View>
      <Animated.View
        style={[
          styles.thumb,
          {
            backgroundColor: isDark ? "#FFFFFF" : "#FFFFFF",
            transform: [{ translateX }],
          },
        ]}
      >
        <Ionicons
          name={isDark ? "moon" : "sunny"}
          size={14}
          color={isDark ? "#7B2CBF" : "#FDB813"}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 28,
    borderRadius: 14,
    padding: 2,
    justifyContent: "center",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 7,
  },
  thumb: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
});
