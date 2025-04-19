"use client"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useTheme } from "../context/ThemeContext"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"

interface MarketSummaryProps {
  marketData: {
    nifty: {
      value: number
      change: number
      changePercentage: string
    }
    sensex: {
      value: number
      change: number
      changePercentage: string
    }
    topGainer: {
      symbol: string
      changePercentage: string
    }
    topLoser: {
      symbol: string
      changePercentage: string
    }
  }
}

export const MarketSummaryCard = ({ marketData }: MarketSummaryProps) => {
  const { theme } = useTheme()

  const isNiftyPositive = marketData.nifty.change >= 0
  const isSensexPositive = marketData.sensex.change >= 0

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Market Summary</Text>
        <TouchableOpacity style={styles.refreshButton}>
          <Ionicons name="refresh-outline" size={18} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={["rgba(157, 78, 221, 0.15)", "rgba(59, 28, 136, 0.05)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradientBorder, { borderColor: "rgba(157, 78, 221, 0.3)" }]}
      >
        <View style={[styles.card, { backgroundColor: "rgba(30, 30, 30, 0.7)" }]}>
          <View style={styles.indexRow}>
            <View style={styles.indexItem}>
              <Text style={[styles.indexName, { color: theme.textSecondary }]}>NIFTY 50</Text>
              <Text style={[styles.indexValue, { color: theme.text }]}>
                {marketData.nifty.value.toLocaleString("en-IN")}
              </Text>
              <View style={styles.changeRow}>
                <Ionicons
                  name={isNiftyPositive ? "arrow-up" : "arrow-down"}
                  size={14}
                  color={isNiftyPositive ? theme.positive : theme.negative}
                />
                <Text style={[styles.indexChange, { color: isNiftyPositive ? theme.positive : theme.negative }]}>
                  {isNiftyPositive ? "+" : ""}
                  {marketData.nifty.change.toFixed(2)} ({marketData.nifty.changePercentage})
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.indexItem}>
              <Text style={[styles.indexName, { color: theme.textSecondary }]}>SENSEX</Text>
              <Text style={[styles.indexValue, { color: theme.text }]}>
                {marketData.sensex.value.toLocaleString("en-IN")}
              </Text>
              <View style={styles.changeRow}>
                <Ionicons
                  name={isSensexPositive ? "arrow-up" : "arrow-down"}
                  size={14}
                  color={isSensexPositive ? theme.positive : theme.negative}
                />
                <Text style={[styles.indexChange, { color: isSensexPositive ? theme.positive : theme.negative }]}>
                  {isSensexPositive ? "+" : ""}
                  {marketData.sensex.change.toFixed(2)} ({marketData.sensex.changePercentage})
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.moversRow}>
            <View style={styles.moverItem}>
              <Text style={[styles.moverLabel, { color: theme.textSecondary }]}>Top Gainer</Text>
              <View style={styles.moverContent}>
                <Text style={[styles.moverSymbol, { color: theme.text }]}>{marketData.topGainer.symbol}</Text>
                <Text style={[styles.moverChange, { color: theme.positive }]}>
                  +{marketData.topGainer.changePercentage}
                </Text>
              </View>
            </View>

            <View style={styles.moverItem}>
              <Text style={[styles.moverLabel, { color: theme.textSecondary }]}>Top Loser</Text>
              <View style={styles.moverContent}>
                <Text style={[styles.moverSymbol, { color: theme.text }]}>{marketData.topLoser.symbol}</Text>
                <Text style={[styles.moverChange, { color: theme.negative }]}>
                  {marketData.topLoser.changePercentage}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  refreshButton: {
    padding: 8,
  },
  gradientBorder: {
    borderRadius: 20,
    padding: 1,
    borderWidth: 1,
  },
  card: {
    borderRadius: 19,
    padding: 16,
  },
  indexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  indexItem: {
    flex: 1,
  },
  indexName: {
    fontSize: 14,
    marginBottom: 4,
  },
  indexValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  changeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  indexChange: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  divider: {
    width: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: 16,
  },
  moversRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  moverItem: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
  },
  moverLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  moverContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moverSymbol: {
    fontSize: 16,
    fontWeight: "bold",
  },
  moverChange: {
    fontSize: 14,
    fontWeight: "500",
  },
})
