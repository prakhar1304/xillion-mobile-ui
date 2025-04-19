"use client";

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

interface PortfolioData {
  currentValue: number;
  unusedFunds: number;
}

const formatCurrency = (amount: number) => {
  return `$${amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const CreditCard = () => {
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [portfolioData, setPortfolioData] = React.useState<PortfolioData>({
    currentValue: 24850.75,
    unusedFunds: 1250.5,
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setPortfolioData({
        currentValue:
          portfolioData.currentValue * (1 + (Math.random() * 0.1 - 0.05)),
        unusedFunds: portfolioData.unusedFunds,
      });
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <View style={styles.cardWrapper}>
      <LinearGradient
        colors={["#2A2D3E", "#5A189A", "#7B2CBF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Shine effect */}
        <View style={styles.shineEffect} />

        {/* Card chip */}
        <View style={styles.chipContainer}>
          <View style={styles.chip}>
            <View style={styles.chipLine} />
            <View style={styles.chipLine} />
            <View style={styles.chipLine} />
          </View>
        </View>

        <View style={styles.portfolioHeader}>
          <Text style={styles.portfolioLabel}>Current Portfolio</Text>
          <TouchableOpacity
            style={[styles.refreshButton, isRefreshing && styles.refreshing]}
            onPress={handleRefresh}
            activeOpacity={0.7}
          >
            <Ionicons name="refresh" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.portfolioValue}>
          {formatCurrency(portfolioData.currentValue)}
        </Text>

        <View style={styles.portfolioFooter}>
          <View>
            <Text style={styles.unusedFundsLabel}>Unused Funds</Text>
            <Text style={styles.unusedFundsValue}>
              {formatCurrency(portfolioData.unusedFunds)}
            </Text>
          </View>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => console.log("Add funds")}
              activeOpacity={0.7}
            >
              <Ionicons name="add-circle-outline" size={18} color="white" />
              <Text style={styles.actionButtonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => console.log("Withdraw funds")}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-down-outline" size={18} color="white" />
              <Text style={styles.actionButtonText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Card number dots */}
        {/* <View style={styles.cardNumberContainer}>
          <View style={styles.cardNumberDot} />
          <View style={styles.cardNumberDot} />
          <View style={styles.cardNumberDot} />
          <View style={styles.cardNumberDot} />
          <View style={styles.cardNumberDot} />
          <View style={styles.cardNumberDot} />
          <View style={styles.cardNumberDot} />
          <View style={styles.cardNumberDot} />
          <Text style={styles.cardNumberText}>8942</Text>
        </View> */}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: width - 32,
    height: 200,
    borderRadius: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 15,
  },
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    padding: 20,
    overflow: "hidden",
    position: "relative",
    borderWidth: 1,
    borderColor: "rgba(165, 29, 29, 0.1)",
  },
  shineEffect: {
    position: "absolute",
    top: -150,
    left: -150,
    width: 300,
    height: 300,
    backgroundColor: "rgba(221, 185, 221, 0.12)",
    borderRadius: 150,
    transform: [{ rotate: "35deg" }],
  },
  chipContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  chip: {
    width: 40,
    height: 30,
    backgroundColor: "#E6C06A",
    borderRadius: 5,
    padding: 5,
    justifyContent: "center",
  },
  chipLine: {
    height: 3,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    marginVertical: 2,
    borderRadius: 1,
  },
  portfolioHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  portfolioLabel: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "SUB",
  },
  refreshButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  refreshing: {
    transform: [{ rotate: "180deg" }],
  },
  portfolioValue: {
    color: "white",
    fontSize: 36,
    // fontWeight: "bold",
    marginTop: 12,
    letterSpacing: 1,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    fontFamily: "Tittle-bold",
  },
  portfolioFooter: {
    marginTop: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  unusedFundsLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
  },
  unusedFundsValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  actionButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  cardNumberContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  cardNumberDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginRight: 4,
  },
  cardNumberText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
});
