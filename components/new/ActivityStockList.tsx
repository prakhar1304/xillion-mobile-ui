"use client";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { StockCard } from "./StockCard";

interface Stock {
  name: string;
  amount: number;
  color: string;
}

interface ActivityStockListProps {
  stocks: Stock[];
  onStockPress?: (stock: Stock) => void;
}

export const ActivityStockList = ({
  stocks,
  onStockPress,
}: ActivityStockListProps) => {
  // Calculate total investment
  const totalInvestment = stocks.reduce((sum, stock) => sum + stock.amount, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Stocks</Text>
        <Text style={styles.totalText}>
          Total:{" "}
          <Text style={styles.totalAmount}>
            ${totalInvestment.toLocaleString()}
          </Text>
        </Text>
      </View>

      <FlatList
        data={stocks}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <StockCard
            stock={item}
            onPress={() => onStockPress && onStockPress(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  totalText: {
    fontSize: 14,
    color: "#AAAAAA",
  },
  totalAmount: {
    color: "#9D4EDD",
    fontWeight: "bold",
  },
});
