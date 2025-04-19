import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";

interface StockCardProps {
  name: string;
  ticker: string;
  price: number;
  change: number;
  changeAmount: number;
  logo: string;
  description: string;
  recommendation: string;
  isDarkMode: boolean;
}

export function StockCard({
  name,
  ticker,
  price,
  change,
  changeAmount,
  logo,
  description,
  recommendation,
  isDarkMode,
}: StockCardProps) {
  return (
    <Animated.View
      style={[
        styles.card,
        { backgroundColor: isDarkMode ? "#1E1E1E" : "#F5F5F5" },
      ]}
    >
      <View style={styles.cardHeader}>
        <Image
          source={{ uri: logo }}
          style={styles.companyLogo}
          resizeMode="contain"
        />
        <View style={styles.cardTitleContainer}>
          <Animated.Text
            style={[
              styles.cardTitle,
              { color: isDarkMode ? "#FFFFFF" : "#000000" },
            ]}
          >
            {name}
          </Animated.Text>
          <View style={styles.tickerContainer}>
            <Animated.Text
              style={[
                styles.tickerText,
                { color: isDarkMode ? "#FFFFFF" : "#000000" },
              ]}
            >
              {ticker}
            </Animated.Text>
            <View
              style={[
                styles.recommendationBadge,
                {
                  backgroundColor:
                    recommendation === "Buy" ? "#4CAF50" : "#FFC107",
                },
              ]}
            >
              <Text style={styles.recommendationText}>{recommendation}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Animated.Text
          style={[
            styles.cardDescription,
            { color: isDarkMode ? "#FFFFFF" : "#000000" },
          ]}
        >
          {description}
        </Animated.Text>

        <View style={styles.priceInfoContainer}>
          <View>
            <Animated.Text
              style={[
                styles.priceLabel,
                { color: isDarkMode ? "#AAAAAA" : "#666666" },
              ]}
            >
              Current Price
            </Animated.Text>
            <Animated.Text
              style={[
                styles.priceValue,
                { color: isDarkMode ? "#FFFFFF" : "#000000" },
              ]}
            >
              ${price.toFixed(2)}
            </Animated.Text>
          </View>

          <View>
            <Animated.Text
              style={[
                styles.changeLabel,
                { color: isDarkMode ? "#AAAAAA" : "#666666" },
              ]}
            >
              Today's Change
            </Animated.Text>
            <View style={styles.changeRow}>
              <Ionicons
                name={change > 0 ? "arrow-up" : "arrow-down"}
                size={16}
                color={change > 0 ? "#4CAF50" : "#F44336"}
              />
              <Text
                style={[
                  styles.changeText,
                  { color: change > 0 ? "#4CAF50" : "#F44336" },
                ]}
              >
                {Math.abs(change).toFixed(2)}%
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.viewButton}>
        <Animated.Text
          style={[
            styles.viewButtonText,
            { color: isDarkMode ? "#FFFFFF" : "#000000" },
          ]}
        >
          View {ticker}
        </Animated.Text>
        <Ionicons name="chevron-forward" size={16} color="#4CAF50" />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: 16,
    marginBottom: 8,
  },
  cardHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  companyLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  tickerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tickerText: {
    fontSize: 14,
    fontWeight: "500",
    marginRight: 8,
  },
  recommendationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  recommendationText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  cardBody: {
    marginBottom: 16,
  },
  cardDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  priceInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceLabel: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  changeLabel: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
  },
  changeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    marginTop: 8,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 4,
  },
});
