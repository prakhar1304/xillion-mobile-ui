"use client";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

interface HeaderProps {
  portfolioValue: number;
  unusedFunds: number;
}

export const Header = ({ portfolioValue, unusedFunds }: HeaderProps) => {
  const { theme } = useTheme();

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN")}`;
  };

  return (
    <LinearGradient
      colors={
        [
          theme.primaryGradient[0],
          theme.primaryGradient[1],
          theme.primaryGradient[2],
        ] as const
      }
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.topBar}>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>XILLION</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.portfolioContainer}>
        <Text style={styles.portfolioLabel}>Current Portfolio</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.portfolioValue}>
            {formatCurrency(portfolioValue)}
          </Text>
          <TouchableOpacity style={styles.refreshButton}>
            <Ionicons name="refresh" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.unusedFunds}>Unused Funds</Text>
        <Text style={styles.unusedFundsValue}>
          {formatCurrency(unusedFunds)}
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="wallet-outline" size={20} color="white" />
          <Text style={styles.actionButtonText}>Portfolio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={20}
            color="white"
          />
          <Text style={styles.actionButtonText}>Ask AI</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 15,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    fontFamily: "App-Name",
  },
  portfolioContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  portfolioLabel: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 5,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  portfolioValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
  refreshButton: {
    marginLeft: 10,
  },
  unusedFunds: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 10,
  },
  unusedFundsValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    // backgroundColor: "red",
    position: "absolute",
    bottom: -25,
    alignItems: "center",
    left: 35,
    // marginHorizontal: 5,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(14,4,35,255)",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  actionButtonText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "600",
  },
});
