"use client";

import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import type { Trade } from "../data/tradeData";

interface TradeCardProps {
  trade: Trade;
  onPress?: () => void;
}

export const TradeCard = ({ trade, onPress }: TradeCardProps) => {
  const { theme } = useTheme();

  // Determine if return is positive or negative
  const isPositive = !String(trade.returnPercentage ?? "").includes("-");
  const returnColor = isPositive ? theme.positive : theme.negative;
  const returnIcon = isPositive ? "arrow-up" : "arrow-down";

  return (
    <Pressable onPress={onPress}>
      <LinearGradient
        colors={["rgba(157, 78, 221, 0.15)", "rgba(59, 28, 136, 0.05)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gradientBorder,
          { borderColor: "rgba(157, 78, 221, 0.3)" },
        ]}
      >
        <View
          style={[
            styles.container,
            { backgroundColor: "rgba(30, 30, 30, 0.7)" },
          ]}
        >
          <View style={styles.badgesContainer}>
            {trade.isTargetHit && (
              <LinearGradient
                colors={["#34D399", "#10B981"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.targetHitBadge}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={12}
                  color="white"
                  style={styles.targetIcon}
                />
                <Text style={styles.targetHitText} numberOfLines={1}>
                  Target Hit: {trade.targetHitDate}
                </Text>
              </LinearGradient>
            )}

            <LinearGradient
              colors={theme.primaryGradient as [string, string]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.tradeBadge}
            >
              <Text style={styles.tradeBadgeText} numberOfLines={1}>
                {trade.tradeSource}
              </Text>
            </LinearGradient>
          </View>

          <View style={styles.mainContent}>
            <View style={styles.leftSection}>
              <LinearGradient
                colors={theme.lighterPrimaryGradient}
                style={styles.symbolContainer}
              >
                <Text style={styles.symbolText}>{trade.symbol.charAt(0)}</Text>
              </LinearGradient>
            </View>

            <View style={styles.middleSection}>
              <View style={styles.stockInfo}>
                <Text style={[styles.symbol, { color: theme.text }]}>
                  {trade.symbol}
                </Text>
                <View
                  style={[
                    styles.returnContainer,
                    { backgroundColor: `${returnColor}20` },
                  ]}
                >
                  <Ionicons name={returnIcon} size={14} color={returnColor} />
                  <Text
                    style={[styles.returnPercentage, { color: returnColor }]}
                  >
                    {trade.returnPercentage}%
                  </Text>
                </View>
              </View>

              <Text
                style={[styles.companyName, { color: theme.textSecondary }]}
                numberOfLines={1}
              >
                {trade.companyName}
              </Text>

              <View style={styles.bottomRow}>
                <View
                  style={[
                    styles.tradeTypeContainer,
                    { backgroundColor: "rgba(157, 78, 221, 0.15)" },
                  ]}
                >
                  <Ionicons
                    name="time-outline"
                    size={14}
                    color={theme.primary}
                    style={styles.infoIcon}
                  />
                  <Text style={[styles.tradeType, { color: theme.primary }]}>
                    {trade.tradeType}
                  </Text>
                </View>

                <View style={styles.timestampContainer}>
                  <Text
                    style={[styles.timestamp, { color: theme.textSecondary }]}
                  >
                    {trade.timestamp}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  gradientBorder: {
    borderRadius: 20,
    padding: 1,
    marginBottom: 16,
    borderWidth: 1,
  },
  container: {
    borderRadius: 19,
    overflow: "hidden",
    padding: 16,
  },
  badgesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    gap: 8,
  },
  targetHitBadge: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },
  targetIcon: {
    marginRight: 4,
  },
  targetHitText: {
    color: "white",
    fontWeight: "600",
    fontSize: 13,
    flex: 1,
  },
  tradeBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    minWidth: 0,
  },
  tradeBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "500",
  },
  mainContent: {
    flexDirection: "row",
  },
  leftSection: {
    marginRight: 14,
  },
  symbolContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  symbolText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  middleSection: {
    flex: 1,
  },
  stockInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  symbol: {
    fontSize: 18,
    fontWeight: "bold",
  },
  returnContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  returnPercentage: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 2,
  },
  companyName: {
    fontSize: 14,
    marginBottom: 12,
    opacity: 0.8,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tradeTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  infoIcon: {
    marginRight: 4,
  },
  tradeType: {
    fontSize: 13,
    fontWeight: "500",
  },
  timestampContainer: {
    alignItems: "flex-end",
  },
  timestamp: {
    fontSize: 12,
    opacity: 0.7,
  },
});
