import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

interface StockData {
  name: string;
  amount: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

interface StockPieChartProps {
  data: StockData[];
  totalAmount: number;
}

const StockPieChart = ({ data, totalAmount }: StockPieChartProps) => {
  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        width={screenWidth - 40}
        height={220}
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
      <View style={styles.centerContent}>
        <Text style={styles.totalAmount}>
          ${totalAmount.toLocaleString("en-US")}
        </Text>
        <Text style={styles.label}>Your investments</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  centerContent: {
    position: "absolute",
    alignItems: "center",
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
});

export default StockPieChart;
