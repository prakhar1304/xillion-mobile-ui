"use client";

import { View, StyleSheet, ScrollView, Text, SafeAreaView } from "react-native";
import { Header } from "../components/Header";
import { StockCard } from "../components/StockCard";
import { ExecuteButton } from "../components/ExecuteButton";
import { useTheme } from "../context/ThemeContext";
import { dummyRecommendations, portfolioData } from "../data/stockData";
import {
  Inter_900Black,
  useFonts,
  Inter_500Medium,
} from "@expo-google-fonts/inter";
// import { Inter_900Black, useFonts, Inter_500Medium } from "@expo-google-fonts/sa";

export default function HomeScreen() {
  const { theme } = useTheme();
  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    alignSelf: "center",
    fontFamily: "Inter_500Medium",
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
