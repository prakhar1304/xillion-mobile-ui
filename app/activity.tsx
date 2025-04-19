"use client";

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const screenWidth = Dimensions.get("window").width;

// Stock logos
const stockLogos = {
  AAPL: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  TSLA: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
  MSFT: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  AMZN: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
};

// Dummy data for stocks with additional information
const stockData = [
  {
    name: "AAPL",
    fullName: "Apple Inc.",
    amount: 1250,
    color: "#7B61FF", // Purple
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
    change: "+2.4%",
    positive: true,
    shares: 5,
  },
  {
    name: "TSLA",
    fullName: "Tesla, Inc.",
    amount: 850,
    color: "#9F8BFF", // Light purple
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
    change: "-1.2%",
    positive: false,
    shares: 2,
  },
  {
    name: "MSFT",
    fullName: "Microsoft Corporation",
    amount: 650,
    color: "#2E4374", // Dark blue
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
    change: "+0.8%",
    positive: true,
    shares: 3,
  },
  {
    name: "AMZN",
    fullName: "Amazon.com, Inc.",
    amount: 450,
    color: "#0F1035", // Navy
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
    change: "+1.5%",
    positive: true,
    shares: 1,
  },
];

// Calculate total investment
const totalInvestment = stockData.reduce((sum, stock) => sum + stock.amount, 0);

const ActivityScreen = () => {
  const [timeFrame, setTimeFrame] = useState("Month");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("Month");
  const timeFrames = ["Day", "Week", "Month", "Year", "All"];

  const [showTimeFrameDropdown, setShowTimeFrameDropdown] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Activity</Text>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="clipboard-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <LinearGradient
          colors={["#ffffff", "#d4cef4", "#b2aefd"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientCard}
        >
          {/* balance */}
          <View style={styles.balanceCard}>
            <View style={styles.balanceInfo}>
              <Text style={styles.balanceLabel}>Current Portfolio</Text>
              <Text style={styles.balanceAmount}>
                $
                {totalInvestment.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                style={styles.timeFrameButton}
                onPress={() => setShowTimeFrameDropdown(!showTimeFrameDropdown)}
              >
                <Text style={styles.timeFrameText}>{selectedTimeFrame}</Text>
                <Ionicons
                  name={showTimeFrameDropdown ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#333"
                  style={{ marginLeft: 5 }}
                />
              </TouchableOpacity>

              {showTimeFrameDropdown && (
                <View style={styles.timeFrameDropdown}>
                  {timeFrames.map((time) => (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.timeFrameOption,
                        selectedTimeFrame === time && styles.selectedTimeFrame,
                      ]}
                      onPress={() => {
                        setSelectedTimeFrame(time);
                        setShowTimeFrameDropdown(false);
                      }}
                    >
                      <Text
                        style={[
                          styles.timeFrameOptionText,
                          selectedTimeFrame === time &&
                            styles.selectedTimeFrameText,
                        ]}
                      >
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* Chart Section */}
          <View style={styles.chartContainer}>
            <PieChart
              data={stockData}
              width={screenWidth - 10}
              height={400}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#ffffff",
                backgroundGradientTo: "#ffffff",
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="0"
              absolute={false}
              hasLegend={false}
              center={[screenWidth / 4, 0]}
            />
            <View style={styles.chartCenter}>
              <View style={styles.chartCenterCircle}>
                <Text style={styles.chartCenterAmount}>
                  ${totalInvestment.toLocaleString("en-US")}
                </Text>
                <Text style={styles.chartCenterLabel}>Your investments</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Menu Section */}
        <View style={styles.quickMenuSection}>
          <View style={styles.quickMenuHeader}>
            <Text style={styles.quickMenuTitle}>Quick Menu</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.quickMenuCards}>
            {/* Quick Action Cards */}
            <TouchableOpacity style={styles.quickCard}>
              <LinearGradient
                colors={["#7B61FF", "#9F8BFF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickCardGradient}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name="trending-up" size={24} color="white" />
                </View>
                <Text style={styles.quickCardText}>Buy stocks</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickCard}>
              <LinearGradient
                colors={["#2E4374", "#4A5FC1"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickCardGradient}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name="pie-chart" size={24} color="white" />
                </View>
                <Text style={styles.quickCardText}>Portfolio</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.quickCard}>
              <LinearGradient
                colors={["#0F1035", "#2E4374"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.quickCardGradient}
              >
                <View style={styles.iconContainer}>
                  <Ionicons name="card" size={24} color="white" />
                </View>
                <Text style={styles.quickCardText}>Sell stocks</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Stock Details Cards */}
          <View style={styles.stocksHeader}>
            <Text style={styles.sectionTitle}>Your Stocks</Text>
            <TouchableOpacity style={styles.sortButton}>
              <Ionicons name="filter" size={18} color="#7B61FF" />
              <Text style={styles.sortText}>Sort</Text>
            </TouchableOpacity>
          </View>

          {stockData.map((stock, index) => (
            <TouchableOpacity key={index} style={styles.stockCard}>
              <View style={styles.stockCardContent}>
                <View style={styles.stockLogoContainer}>
                  <View
                    style={[
                      styles.stockLogo,
                      { backgroundColor: stock.color + "20" },
                    ]}
                  >
                    <Text
                      style={[styles.stockLogoText, { color: stock.color }]}
                    >
                      {stock.name.charAt(0)}
                    </Text>
                  </View>
                </View>

                <View style={styles.stockInfo}>
                  <View style={styles.stockNameContainer}>
                    <Text style={styles.stockName}>{stock.name}</Text>
                    <Text style={styles.stockFullName}>{stock.fullName}</Text>
                  </View>

                  <View style={styles.stockDetails}>
                    <Text style={styles.stockAmount}>
                      ${stock.amount.toLocaleString("en-US")}
                    </Text>
                    <View style={styles.stockMetrics}>
                      <Text style={styles.stockShares}>
                        {stock.shares} shares
                      </Text>
                      <View
                        style={[
                          styles.changeContainer,
                          {
                            backgroundColor: stock.positive
                              ? "#E6F7EF"
                              : "#FFEAEA",
                          },
                        ]}
                      >
                        <Ionicons
                          name={
                            stock.positive ? "trending-up" : "trending-down"
                          }
                          size={12}
                          color={stock.positive ? "#34C77C" : "#FF4D4D"}
                          style={{ marginRight: 2 }}
                        />
                        <Text
                          style={[
                            styles.changeText,
                            { color: stock.positive ? "#34C77C" : "#FF4D4D" },
                          ]}
                        >
                          {stock.change}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <TouchableOpacity style={styles.stockMoreButton}>
                  <Ionicons name="chevron-forward" size={20} color="#999" />
                </TouchableOpacity>
              </View>

              {/* Progress bar showing percentage of portfolio */}
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${(stock.amount / totalInvestment) * 100}%`,
                      backgroundColor: stock.color,
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add some bottom padding */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fd",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 25,
    // fontWeight: "700",
    color: "#333",
    fontFamily: "Tittle-bold",
  },
  gradientCard: {
    borderRadius: 24,
    margin: 20,
    elevation: 5,
    shadowColor: "#7B61FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  balanceCard: {
    borderRadius: 16,
    marginTop: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  balanceInfo: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 20,
    color: "#333",
    marginBottom: 5,
    // fontWeight: "500",
    fontFamily: "SUB",
  },
  balanceAmount: {
    fontSize: 28,
    // fontWeight: "bold",
    color: "#000",
    fontFamily: "SUBOLD",
  },
  timeFrameButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timeFrameText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  timeFrameDropdown: {
    position: "absolute",
    top: 50,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 5,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1000,
  },
  timeFrameOption: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  selectedTimeFrame: {
    backgroundColor: "#f0f0f0",
  },
  timeFrameOptionText: {
    fontSize: 14,
    color: "#333",
  },
  selectedTimeFrameText: {
    fontWeight: "600",
    color: "#7B61FF",
  },
  chartContainer: {
    position: "relative",
    alignItems: "center",
  },
  chartCenter: {
    position: "absolute",
    top: "25%",
    left: "23.8%",
    alignItems: "center",
  },
  chartCenterCircle: {
    backgroundColor: "white",
    height: 200,
    width: 200,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#7B61FF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  chartCenterAmount: {
    fontSize: 24,
    // fontWeight: "bold",
    color: "#333",
    fontFamily: "SUBOLD",
  },
  chartCenterLabel: {
    fontSize: 15,
    color: "#666",
    marginTop: 4,
    fontFamily: "SUBOLD",
  },
  quickMenuSection: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  quickMenuHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  quickMenuTitle: {
    fontSize: 20,
    // fontWeight: "700",
    color: "#333",
    fontFamily: "SUBOLD",
  },
  seeAllText: {
    fontSize: 14,
    color: "#7B61FF",
    fontWeight: "600",
  },
  quickMenuCards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  quickCard: {
    width: "31%",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#7B61FF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickCardGradient: {
    padding: 15,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginBottom: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  quickCardText: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  stocksHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  sortText: {
    fontSize: 14,
    color: "#7B61FF",
    fontWeight: "600",
    marginLeft: 4,
  },
  stockCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 15,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  stockCardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  stockLogoContainer: {
    marginRight: 12,
  },
  stockLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  stockLogoText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  stockInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stockNameContainer: {
    flex: 1,
  },
  stockName: {
    fontSize: 18,
    // fontWeight: "700",
    color: "#333",
    fontFamily: "Tittle-bold",
  },
  stockFullName: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  stockDetails: {
    alignItems: "flex-end",
  },
  stockAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  stockMetrics: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  stockShares: {
    fontSize: 13,
    color: "#888",
    marginRight: 8,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
  },
  changeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  stockMoreButton: {
    marginLeft: 10,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    marginTop: 12,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 2,
  },
});

export default ActivityScreen;
