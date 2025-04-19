"use client";

import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  VictoryLine,
  VictoryChart,
  VictoryAxis,
  VictoryArea,
  VictoryScatter,
} from "victory-native";
import { useTheme } from "../context/ThemeContext";
import {
  portfolioGrowthData,
  timeRanges,
  getGrowthPercentage,
  getProjectedGrowthPercentage,
} from "../data/graphData";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export const PortfolioGraph = () => {
  const { theme, isDark } = useTheme();
  const [selectedRange, setSelectedRange] = useState("6m");

  const actualData = portfolioGrowthData.actual;
  const projectedData = portfolioGrowthData.projected;
  const growthPercentage = getGrowthPercentage();
  const projectedGrowthPercentage = getProjectedGrowthPercentage();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          {/* <Text style={[styles.title, { color: theme.textSecondary }]}>
            Portfolio Value
          </Text> */}
          <Text style={[styles.value, { color: theme.text }]}>
            ₹{actualData[actualData.length - 1].y.toLocaleString()}
          </Text>
          <View style={styles.growthContainer}>
            <Ionicons name="arrow-up" size={16} color={theme.positive} />
            <Text style={[styles.growthText, { color: theme.positive }]}>
              {growthPercentage}%{" "}
              <Text
                style={[styles.growthPeriod, { color: theme.textSecondary }]}
              >
                this year
              </Text>
            </Text>
          </View>
        </View>
        {/* <View style={styles.projectionContainer}>
          <Text
            style={[styles.projectionTitle, { color: theme.textSecondary }]}
          >
            Projected Growth
          </Text>
          <Text style={[styles.projectionValue, { color: theme.primary }]}>
            +{projectedGrowthPercentage}%
          </Text>
        </View> */}
      </View>

      <View style={styles.chartContainer}>
        <VictoryChart
          padding={{ top: 20, bottom: 30, left: 40, right: 20 }}
          height={220}
          width={350}
        >
          <VictoryAxis
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: { fill: theme.textSecondary, fontSize: 10 },
            }}
          />
          <VictoryAxis
            dependentAxis
            style={{
              axis: { stroke: "transparent" },
              grid: {
                stroke: isDark
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(94, 75, 75, 0.05)",
              },
              ticks: { stroke: "transparent" },
              tickLabels: { fill: theme.textSecondary, fontSize: 10 },
            }}
            tickFormat={(t) => `₹${t / 1000}k`}
          />

          {/* Actual data area with gradient */}
          <VictoryArea
            data={actualData}
            style={{
              data: {
                fill: "url(#gradientActual)",
                stroke: theme.primary,
                strokeWidth: 2,
              },
            }}
            interpolation="monotoneX"
          />

          {/* Projected data line */}
          <VictoryLine
            data={projectedData}
            style={{
              data: {
                stroke: theme.primary,
                strokeWidth: 2,
                strokeDasharray: "5,5",
              },
            }}
            interpolation="monotoneX"
          />

          {/* Current point marker */}
          <VictoryScatter
            data={[actualData[actualData.length - 1]]}
            size={8}
            style={{
              data: {
                fill: theme.primary,
                stroke: "white",
                strokeWidth: 2,
              },
            }}
          />
        </VictoryChart>

        {/* Gradient definition for the area chart */}
        <View style={styles.gradientContainer}>
          <LinearGradient
            colors={[theme.primary + "80", theme.primary + "00"]}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        </View>
      </View>

      <View style={styles.timeRangeContainer}>
        {timeRanges.map((range) => (
          <TouchableOpacity
            key={range.value}
            style={[
              styles.timeRangeButton,
              selectedRange === range.value && [
                styles.selectedTimeRange,
                { backgroundColor: theme.primary },
              ],
            ]}
            onPress={() => setSelectedRange(range.value)}
          >
            <Text
              style={[
                styles.timeRangeText,
                {
                  color:
                    selectedRange === range.value
                      ? "white"
                      : theme.textSecondary,
                },
              ]}
            >
              {range.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    padding: 10,
    // backgroundColor: "red",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  growthContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  growthText: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 2,
  },
  growthPeriod: {
    fontSize: 12,
    fontWeight: "normal",
  },
  projectionContainer: {
    alignItems: "flex-end",
  },
  projectionTitle: {
    fontSize: 12,
    marginBottom: 4,
  },
  projectionValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  chartContainer: {
    position: "relative",
    height: 220,
  },
  gradientContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  gradient: {
    width: "100%",
    height: "100%",
  },
  timeRangeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  timeRangeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  selectedTimeRange: {
    backgroundColor: "#7B2CBF",
  },
  timeRangeText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
