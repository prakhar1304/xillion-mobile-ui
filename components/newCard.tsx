"use client";

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { MiniChart } from "./MiniChart";

interface StockCardProps {
  stock: {
    id: string;
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercentage: string;
    recommendation: string;
    targetPrice: number;
    stopLoss: number;
  };
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  index: number;
  totalCards: number;
  gradientColors: string[];
}

export const NewCard = ({
  stock,
  onSwipeLeft,
  onSwipeRight,
  index,
  totalCards,
  gradientColors,
}: StockCardProps) => {
  const pan = React.useRef(new Animated.ValueXY()).current;
  const scale = React.useRef(new Animated.Value(1)).current;

  // Calculate position based on index
  const positionY = 10 * index;
  const positionX = 5 * index;
  const zIndex = totalCards - index;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Animated.spring(scale, {
          toValue: 0.98,
          friction: 7,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        Animated.spring(scale, {
          toValue: 1,
          friction: 7,
          useNativeDriver: true,
        }).start();

        if (gestureState.dx > 50) {
          Animated.timing(pan, {
            toValue: { x: 500, y: 0 },
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            pan.setValue({ x: 0, y: 0 });
            onSwipeRight();
          });
        } else if (gestureState.dx < -50) {
          Animated.timing(pan, {
            toValue: { x: -500, y: 0 },
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            pan.setValue({ x: 0, y: 0 });
            onSwipeLeft();
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const cardStyle = {
    transform: [
      { translateX: pan.x },
      { translateY: positionY },
      { scale },
      { translateX: positionX },
    ],
    zIndex,
    opacity: index === 0 ? 1 : 1 - index * 0.15,
  };

  const isPositive = stock.change >= 0;
  const changeColor = isPositive ? "#4ADE80" : "#F87171";
  const changeIcon = isPositive ? "arrow-up" : "arrow-down";

  return (
    <Animated.View
      style={[styles.cardContainer, cardStyle]}
      {...(index === 0 ? panResponder.panHandlers : {})}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        <BlurView intensity={15} tint="dark" style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.symbolContainer}>
              <Text style={styles.symbol}>{stock.symbol}</Text>
              <Text style={styles.name} numberOfLines={1}>
                {stock.name}
              </Text>
            </View>

            <View style={styles.recommendationBadge}>
              <Text style={styles.recommendationText}>
                {stock.recommendation}
              </Text>
            </View>
          </View>

          <View style={styles.chartAndPriceContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                ₹{stock.price.toLocaleString("en-IN")}
              </Text>
              <View
                style={[
                  styles.changeContainer,
                  { backgroundColor: `${changeColor}20` },
                ]}
              >
                <Ionicons name={changeIcon} size={14} color={changeColor} />
                <Text style={[styles.change, { color: changeColor }]}>
                  {stock.change.toFixed(2)} ({stock.changePercentage})
                </Text>
              </View>
            </View>

            <View style={styles.miniChartContainer}>
              <MiniChart isPositive={isPositive} />
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.targetContainer}>
            <View style={styles.targetItem}>
              <Text style={styles.targetLabel}>Target</Text>
              <Text style={styles.targetValue}>
                ₹{stock.targetPrice.toLocaleString("en-IN")}
              </Text>
              <Text style={[styles.targetPercentage, { color: "#4ADE80" }]}>
                +
                {(
                  ((stock.targetPrice - stock.price) / stock.price) *
                  100
                ).toFixed(1)}
                %
              </Text>
            </View>

            <View style={styles.targetItem}>
              <Text style={styles.targetLabel}>Stop Loss</Text>
              <Text style={styles.targetValue}>
                ₹{stock.stopLoss.toLocaleString("en-IN")}
              </Text>
              <Text style={[styles.targetPercentage, { color: "#F87171" }]}>
                {(((stock.stopLoss - stock.price) / stock.price) * 100).toFixed(
                  1
                )}
                %
              </Text>
            </View>

            <TouchableOpacity
              style={styles.watchlistButton}
              activeOpacity={0.7}
            >
              <Ionicons name="add-circle-outline" size={16} color="#fff" />
              <Text style={styles.actionButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
    // marginBottom: 10,
  },
  cardGradient: {
    borderRadius: 20,
    padding: 1,
  },
  card: {
    borderRadius: 19,
    padding: 16,
    height: 250,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  symbolContainer: {
    flex: 1,
  },
  symbol: {
    fontSize: 20,
    // fontWeight: "bold",
    color: "white",
    marginBottom: 2,
    fontFamily: "SUBOLD",
  },
  name: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    width: "90%",
    fontFamily: "SUB",
  },
  recommendationBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(224, 122, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(224, 122, 255, 0.3)",
  },
  recommendationText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#e07aff",
  },
  chartAndPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 24,
    // fontWeight: "bold",
    color: "white",
    marginBottom: 6,
    fontFamily: "SUB",
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  change: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  miniChartContainer: {
    width: 80,
    height: 40,
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 12,
  },
  targetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // height: 50,
    marginBottom: 10,
  },
  targetItem: {
    flex: 1,
  },
  targetLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    marginBottom: 4,
  },
  targetValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginBottom: 2,
  },
  targetPercentage: {
    fontSize: 12,
    fontWeight: "500",
  },
  watchlistButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: "rgba(224, 122, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(224, 122, 255, 0.3)",
    height: 36,
  },
  actionButtonText: {
    color: "white",
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "500",
  },
});
