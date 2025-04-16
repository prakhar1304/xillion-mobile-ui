"use client";

import type React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Header } from "../components/Header";
import { StockCard } from "../components/StockCard";
import { ExecuteButton } from "../components/ExecuteButton";
import { useTheme } from "../context/ThemeContext";
import { dummyRecommendations, portfolioData } from "../data/stockData";

export const HomeScreen: React.FC = () => {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar style={isDark ? "light" : "dark"} />

      <Header
        portfolioValue={portfolioData.currentValue}
        unusedFunds={portfolioData.unusedFunds}
      />

      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Today's Recommendations
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {dummyRecommendations.map((stock) => (
            <StockCard key={stock.id} stock={stock} />
          ))}

          <View style={[styles.infoCard, { backgroundColor: theme.cardDark }]}>
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              On executing this basket, buy orders along with stop loss and
              targets will be placed.
            </Text>
          </View>
        </ScrollView>
      </View>

      <ExecuteButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 16,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
});
