"use client";
import { View, StyleSheet } from "react-native";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

interface MiniChartProps {
  isPositive: boolean;
}

export const MiniChart = ({ isPositive }: MiniChartProps) => {
  // Generate random data points for the chart
  const generateData = () => {
    const points = [];
    const numPoints = 20;
    let prevY = 50 + Math.random() * 10;

    for (let i = 0; i < numPoints; i++) {
      // For positive trend, more likely to go up
      // For negative trend, more likely to go down
      const change = isPositive
        ? Math.random() * 10 - 3 // More likely to be positive
        : Math.random() * 10 - 7; // More likely to be negative

      prevY = Math.max(10, Math.min(90, prevY + change));
      points.push({ x: (i / (numPoints - 1)) * 100, y: prevY });
    }

    return points;
  };

  const data = generateData();

  // Create SVG path from data points
  const createPath = () => {
    const width = 80;
    const height = 40;

    let path = `M 0 ${height - (data[0].y / 100) * height}`;
    for (let i = 1; i < data.length; i++) {
      const x = (data[i].x / 100) * width;
      const y = height - (data[i].y / 100) * height;
      path += ` L ${x} ${y}`;
    }

    return path;
  };

  const chartPath = createPath();
  const chartColor = isPositive ? "#4ADE80" : "#F87171";
  const gradientId = isPositive ? "positiveGradient" : "negativeGradient";

  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%" viewBox="0 0 80 40">
        <Defs>
          <LinearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={chartColor} stopOpacity="0.5" />
            <Stop offset="1" stopColor={chartColor} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Path d={chartPath} stroke={chartColor} strokeWidth="1.5" fill="none" />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});
