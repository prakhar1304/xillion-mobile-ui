import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

interface TradeHistoryHeaderProps {
  activeTab: "positional" | "flash" | "mytrades";
  onTabChange: (tab: "positional" | "flash" | "mytrades") => void;
}

export const TradeHistoryHeader = ({
  activeTab,
  onTabChange,
}: TradeHistoryHeaderProps) => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <LinearGradient
      colors={theme.primaryGradient}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "positional" && styles.activeTab,
            {
              backgroundColor:
                activeTab === "positional"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "transparent",
            },
          ]}
          onPress={() => onTabChange("positional")}
        >
          <Text style={styles.tabText}>Positional</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "flash" && styles.activeTab,
            {
              backgroundColor:
                activeTab === "flash"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "transparent",
            },
          ]}
          onPress={() => onTabChange("flash")}
        >
          <Text style={styles.tabText}>Flash</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "mytrades" && styles.activeTab,
            {
              backgroundColor:
                activeTab === "mytrades"
                  ? "rgba(255, 255, 255, 0.2)"
                  : "transparent",
            },
          ]}
          onPress={() => onTabChange("mytrades")}
        >
          <Text style={styles.tabText}>My trades</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    borderRadius: 30,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  tabText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
