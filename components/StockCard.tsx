"use client";

import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import type { StockRecommendation } from "../data/stockData";
import { LinearGradient } from "expo-linear-gradient";

interface StockCardProps {
  stock: StockRecommendation;
}

export const StockCard = ({ stock }: StockCardProps) => {
  const { theme } = useTheme();

  return (
    <LinearGradient
      colors={
        [
          theme.darkerPrimaryGradient[0],
          theme.darkerPrimaryGradient[1],
          theme.darkerPrimaryGradient[2],
        ] as const
      }
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* <View style={[styles.container, { backgroundColor: theme.card }]}> */}
      <View style={styles.header}>
        <Text style={[styles.stockName, { color: theme.text }]}>
          {stock.name}
        </Text>
        <Text style={[styles.gainPercentage, { color: theme.positive }]}>
          +{stock.potentialGain}%
        </Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailColumn}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
            Buy
          </Text>
          <Text style={[styles.detailValue, { color: theme.text }]}>
            ₹{stock.buyRange.min}-{stock.buyRange.max}
          </Text>
        </View>

        <View style={styles.detailColumn}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
            Stop Loss
          </Text>
          <Text style={[styles.detailValue, { color: theme.text }]}>
            ₹{stock.stopLoss}
          </Text>
        </View>

        <View style={styles.detailColumn}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
            Target
          </Text>
          <Text style={[styles.detailValue, { color: theme.text }]}>
            ₹{stock.target}
          </Text>
        </View>
      </View>
      {/* </View> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  stockName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Lato",
  },
  gainPercentage: {
    fontSize: 15,
    fontWeight: "bold",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailColumn: {
    alignItems: "center",
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 11,
    fontWeight: "600",
  },
});
