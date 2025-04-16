"use client";

import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import type { TradeStats as TradeStatsType } from "../data/tradeData";

interface TradeStatsProps {
  stats: TradeStatsType;
}

export const TradeStats = ({ stats }: TradeStatsProps) => {
  const { theme } = useTheme();

  return (
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
        style={[styles.container, { backgroundColor: "rgba(30, 30, 30, 0.7)" }]}
      >
        <Text style={[styles.title, { color: theme.text }]}>
          POSITIONAL TRADE HISTORY
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Avg duration
            </Text>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {stats.avgDuration} days
            </Text>
          </View>

          <View style={styles.statItem}>
            <View style={styles.statLabelContainer}>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Avg return
              </Text>
              <Ionicons
                name="information-circle-outline"
                size={16}
                color={theme.textSecondary}
                style={styles.infoIcon}
              />
            </View>
            <Text style={[styles.statValue, { color: theme.positive }]}>
              <Ionicons name="arrow-up" size={16} color={theme.positive} />
              {stats.avgReturn}%
            </Text>
          </View>

          <LinearGradient
            colors={["#4ADE80", "#10B981"]}
            style={styles.hitRateContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.hitRateText}>{stats.hitRate}%</Text>
            <Text style={styles.hitRateLabel}>hit rate</Text>
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
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
    padding: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
  },
  statLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoIcon: {
    marginLeft: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  hitRateContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  hitRateText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  hitRateLabel: {
    fontSize: 12,
    color: "white",
  },
});
