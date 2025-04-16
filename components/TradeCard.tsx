"use client";

import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import type { Trade } from "../data/tradeData";

interface TradeCardProps {
  trade: Trade;
}

export const TradeCard = ({ trade }: TradeCardProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.cardDark }]}>
      {trade.isTargetHit && (
        <View
          style={[styles.targetHitBadge, { backgroundColor: theme.success }]}
        >
          <Text style={styles.targetHitText}>
            Target Hit: {trade.targetHitDate}
          </Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.leftContent}>
          <View
            style={[
              styles.symbolContainer,
              { backgroundColor: theme.background },
            ]}
          >
            <Text style={[styles.symbolText, { color: theme.text }]}>
              {trade.symbol.charAt(0)}
            </Text>
          </View>
        </View>

        <View style={styles.middleContent}>
          <Text style={[styles.symbol, { color: theme.text }]}>
            {trade.symbol}
          </Text>
          <Text
            style={[styles.companyName, { color: theme.textSecondary }]}
            numberOfLines={1}
          >
            {trade.companyName}
          </Text>

          <View style={styles.tradeInfoContainer}>
            <Ionicons
              name="time-outline"
              size={16}
              color={theme.textSecondary}
              style={styles.infoIcon}
            />
            <Text style={[styles.tradeType, { color: theme.textSecondary }]}>
              {trade.tradeType}
            </Text>
          </View>
        </View>

        <View style={styles.rightContent}>
          <Text style={[styles.returnPercentage, { color: theme.positive }]}>
            <Ionicons name="arrow-up" size={14} color={theme.positive} />{" "}
            {trade.returnPercentage}%
          </Text>
          <Text style={[styles.returnLabel, { color: theme.textSecondary }]}>
            Returns
          </Text>

          <View style={[styles.tradeBadge, { backgroundColor: "#9D4EDD" }]}>
            <Text style={styles.tradeBadgeText}>{trade.tradeSource}</Text>
          </View>

          <Text style={[styles.timestamp, { color: theme.textSecondary }]}>
            {trade.timestamp}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
  },
  targetHitBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    // borderTopLeftRadius: 16,
    // borderTopRightRadius: 16,
    width: "70%",
  },
  targetHitText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
  },
  content: {
    flexDirection: "row",
    padding: 16,
  },
  leftContent: {
    marginRight: 12,
  },
  symbolContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  symbolText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  middleContent: {
    flex: 1,
    justifyContent: "center",
  },
  symbol: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  companyName: {
    fontSize: 14,
    marginBottom: 8,
  },
  tradeInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    marginRight: 4,
  },
  tradeType: {
    fontSize: 14,
  },
  rightContent: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  returnPercentage: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  returnLabel: {
    fontSize: 12,
    marginBottom: 8,
  },
  tradeBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 4,
  },
  tradeBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  timestamp: {
    fontSize: 12,
  },
});
