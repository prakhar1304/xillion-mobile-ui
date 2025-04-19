"use client";

import { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import type { StockRecommendation } from "../data/stockData";

const { width } = Dimensions.get("window");
const SWIPE_THRESHOLD = 120;

interface SwipeableStockCardProps {
  stock: StockRecommendation;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  index: number;
  totalCards: number;
}

export const SwipeableStockCard = ({
  stock,
  onSwipeLeft,
  onSwipeRight,
  index,
  totalCards,
}: SwipeableStockCardProps) => {
  const { theme } = useTheme();
  const position = useRef(new Animated.ValueXY()).current;
  const swipeOpacity = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
    outputRange: [0.5, 1, 0.5],
  });
  const swipeRotation = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });
  const scale = useRef(new Animated.Value(1)).current;

  // Calculate z-index based on card position in stack
  const zIndex = totalCards - index;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        Animated.spring(scale, {
          toValue: 1.05,
          friction: 5,
          useNativeDriver: true,
        }).start();
      },
      onPanResponderMove: (_, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },
      onPanResponderRelease: (_, gestureState) => {
        Animated.spring(scale, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }).start();

        if (gestureState.dx > SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: width + 100, y: gestureState.dy },
            duration: 250,
            useNativeDriver: true,
          }).start(() => {
            onSwipeRight();
            position.setValue({ x: 0, y: 0 });
          });
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          Animated.timing(position, {
            toValue: { x: -width - 100, y: gestureState.dy },
            duration: 250,
            useNativeDriver: true,
          }).start(() => {
            onSwipeLeft();
            position.setValue({ x: 0, y: 0 });
          });
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Calculate offset for stacked appearance
  const stackOffset = index * 4;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            { rotate: swipeRotation },
            { scale },
          ],
          opacity: swipeOpacity,
          zIndex,
          top: stackOffset,
          marginBottom: stackOffset,
        },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.header}>
        <Text style={[styles.stockName, { color: theme.text }]}>
          {stock.name}
        </Text>
        <View style={styles.gainContainer}>
          <Ionicons name="trending-up" size={18} color={theme.positive} />
          <Text style={[styles.gainPercentage, { color: theme.positive }]}>
            +{stock.potentialGain}%
          </Text>
        </View>
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      <View style={styles.detailsContainer}>
        <View style={styles.detailColumn}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
            Buy Range
          </Text>
          <Text style={[styles.detailValue, { color: theme.text }]}>
            ₹{stock.buyRange.min}-{stock.buyRange.max}
          </Text>
        </View>

        <View style={[styles.separator, { backgroundColor: theme.border }]} />

        <View style={styles.detailColumn}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
            Stop Loss
          </Text>
          <Text style={[styles.detailValue, { color: theme.negative }]}>
            ₹{stock.stopLoss}
          </Text>
        </View>

        <View style={[styles.separator, { backgroundColor: theme.border }]} />

        <View style={styles.detailColumn}>
          <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
            Target
          </Text>
          <Text style={[styles.detailValue, { color: theme.positive }]}>
            ₹{stock.target}
          </Text>
        </View>
      </View>

      <View style={styles.swipeHintContainer}>
        <View style={[styles.swipeHint, { backgroundColor: theme.border }]}>
          <Ionicons
            name="arrow-back"
            size={16}
            color={theme.textSecondary}
            style={styles.swipeIcon}
          />
          <Text style={[styles.swipeText, { color: theme.textSecondary }]}>
            Swipe to navigate
          </Text>
          <Ionicons
            name="arrow-forward"
            size={16}
            color={theme.textSecondary}
            style={styles.swipeIcon}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    position: "absolute",
    width: width - 40,
    left: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  stockName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  gainContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  gainPercentage: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
  },
  divider: {
    height: 1,
    width: "100%",
    marginBottom: 15,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  detailColumn: {
    flex: 1,
    alignItems: "center",
  },
  separator: {
    width: 1,
    height: "100%",
  },
  detailLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  swipeHintContainer: {
    alignItems: "center",
  },
  swipeHint: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  swipeIcon: {
    opacity: 0.7,
  },
  swipeText: {
    fontSize: 12,
    marginHorizontal: 8,
  },
});
