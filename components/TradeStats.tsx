import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import type { TradeStats as TradeStatsType } from "../data/tradeData";

interface TradeStatsProps {
  stats: TradeStatsType;
}

export const TradeStats = ({ stats }: TradeStatsProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.cardDark }]}>
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

        <View style={styles.hitRateContainer}>
          <Text style={[styles.hitRateText, { color: "white" }]}>
            {stats.hitRate}%
          </Text>
          <Text style={styles.hitRateLabel}>hit rate</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
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
    borderRadius: 40,
    backgroundColor: "#4ADE80",
    justifyContent: "center",
    alignItems: "center",
  },
  hitRateText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  hitRateLabel: {
    fontSize: 12,
    color: "white",
  },
});
