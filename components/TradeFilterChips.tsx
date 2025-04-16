import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface TradeFilterChipsProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export const TradeFilterChips = ({
  selectedFilter,
  onFilterChange,
}: TradeFilterChipsProps) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TouchableOpacity
          style={[
            styles.chip,
            selectedFilter === "all" && styles.selectedChip,
            {
              backgroundColor:
                selectedFilter === "all" ? theme.primary : "transparent",
              borderColor: theme.border,
            },
          ]}
          onPress={() => onFilterChange("all")}
        >
          <Ionicons
            name="checkmark-circle"
            size={16}
            color={selectedFilter === "all" ? "white" : theme.textSecondary}
            style={styles.chipIcon}
          />
          <Text
            style={[
              styles.chipText,
              {
                color: selectedFilter === "all" ? "white" : theme.textSecondary,
              },
            ]}
          >
            All positional Liquide trades
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.chip,
            selectedFilter === "shortTerm" && styles.selectedChip,
            {
              backgroundColor:
                selectedFilter === "shortTerm" ? theme.primary : "transparent",
              borderColor: theme.border,
            },
          ]}
          onPress={() => onFilterChange("shortTerm")}
        >
          <Text
            style={[
              styles.chipText,
              {
                color:
                  selectedFilter === "shortTerm"
                    ? "white"
                    : theme.textSecondary,
              },
            ]}
          >
            Short Term
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.chip,
            selectedFilter === "mediumTerm" && styles.selectedChip,
            {
              backgroundColor:
                selectedFilter === "mediumTerm" ? theme.primary : "transparent",
              borderColor: theme.border,
            },
          ]}
          onPress={() => onFilterChange("mediumTerm")}
        >
          <Text
            style={[
              styles.chipText,
              {
                color:
                  selectedFilter === "mediumTerm"
                    ? "white"
                    : theme.textSecondary,
              },
            ]}
          >
            Medium Term
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.chip,
            selectedFilter === "longTerm" && styles.selectedChip,
            {
              backgroundColor:
                selectedFilter === "longTerm" ? theme.primary : "transparent",
              borderColor: theme.border,
            },
          ]}
          onPress={() => onFilterChange("longTerm")}
        >
          <Text
            style={[
              styles.chipText,
              {
                color:
                  selectedFilter === "longTerm" ? "white" : theme.textSecondary,
              },
            ]}
          >
            Long Term
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scrollContent: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  selectedChip: {
    borderWidth: 0,
  },
  chipIcon: {
    marginRight: 6,
  },
  chipText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
