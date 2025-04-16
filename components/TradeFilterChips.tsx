"use client";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";

interface TradeFilterChipsProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const TradeFilterChips = ({
  selectedFilter,
  onFilterChange,
}: TradeFilterChipsProps) => {
  const { theme } = useTheme();

  const filters = [
    { id: "all", label: "All" },
    { id: "shortTerm", label: "Short Term" },
    { id: "mediumTerm", label: "Medium Term" },
    { id: "longTerm", label: "Long Term" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter) => {
          const isSelected = selectedFilter === filter.id;

          return isSelected ? (
            <LinearGradient
              key={filter.id}
              colors={theme.primaryGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.selectedChip}
            >
              <TouchableOpacity
                onPress={() => onFilterChange(filter.id)}
                style={styles.chipTouchable}
              >
                <Text style={styles.selectedChipText}>{filter.label}</Text>
              </TouchableOpacity>
            </LinearGradient>
          ) : (
            <TouchableOpacity
              key={filter.id}
              onPress={() => onFilterChange(filter.id)}
              style={[
                styles.chip,
                {
                  backgroundColor: "rgba(157, 78, 221, 0.1)",
                  borderColor: "rgba(157, 78, 221, 0.3)",
                },
              ]}
            >
              <Text style={[styles.chipText, { color: theme.textSecondary }]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  scrollContent: {
    paddingRight: 20,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  selectedChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  chipTouchable: {
    width: "100%",
    alignItems: "center",
  },
  chipText: {
    fontWeight: "500",
  },
  selectedChipText: {
    color: "white",
    fontWeight: "600",
  },
});
