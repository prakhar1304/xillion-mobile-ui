"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { TradeHistoryHeader } from "../components/TradeHistoryHeader";
import { TradeStats } from "../components/TradeStats";
import { TradeFilterChips } from "../components/TradeFilterChips";
import { TradeCard } from "../components/TradeCard";
import { tradeHistory, tradeStats } from "../data/tradeData";

export default function TradeHistoryScreen() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<
    "positional" | "flash" | "mytrades"
  >("positional");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Filter trades based on selected filter
  const filteredTrades = tradeHistory.filter((trade) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "shortTerm") return trade.tradeType === "Short Term";
    if (selectedFilter === "mediumTerm")
      return trade.tradeType === "Medium Term";
    if (selectedFilter === "longTerm") return trade.tradeType === "Long Term";
    return true;
  });

  const listHeader = () => (
    <>
      <TradeStats stats={tradeStats} />

      <TradeFilterChips
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      <View style={styles.tradesHeader}>
        <Text style={[styles.tradesCount, { color: theme.text }]}>
          {tradeStats.totalTrades} trades
        </Text>

        <TouchableOpacity style={styles.sortButton}>
          <Text style={[styles.sortText, { color: theme.textSecondary }]}>
            Sort
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <TradeHistoryHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <View style={styles.content}>
        <FlatList
          data={filteredTrades}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TradeCard trade={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={listHeader}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  tradesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  tradesCount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortText: {
    fontSize: 16,
    fontWeight: "500",
  },
  listContent: {
    paddingBottom: 20,
  },
});
