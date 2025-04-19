export interface GraphPoint {
    x: string; // Date
    y: number; // Value
}

export interface GraphData {
    actual: GraphPoint[];
    projected: GraphPoint[];
}

export const portfolioGrowthData: GraphData = {
    actual: [
        { x: "Jan", y: 100000 },
        { x: "Feb", y: 105000 },
        { x: "Mar", y: 112000 },
        { x: "Apr", y: 108000 },
        { x: "May", y: 115000 },
        { x: "Jun", y: 125000 },
        { x: "Jul", y: 130000 },
        { x: "Aug", y: 128000 },
        { x: "Sep", y: 135000 },
        { x: "Oct", y: 142000 },
        { x: "Nov", y: 150000 },
        { x: "Today", y: 155000 },
    ],
    projected: [
        { x: "Today", y: 155000 },
        { x: "Dec", y: 165000 },
        { x: "Jan", y: 178000 },
        { x: "Feb", y: 190000 },
    ],
};

export const timeRanges = [
    { label: "1W", value: "1w" },
    { label: "1M", value: "1m" },
    { label: "3M", value: "3m" },
    { label: "6M", value: "6m" },
    { label: "1Y", value: "1y" },
    { label: "All", value: "all" },
];

export const getGrowthPercentage = (): number => {
    const firstValue = portfolioGrowthData.actual[0].y;
    const lastValue = portfolioGrowthData.actual[portfolioGrowthData.actual.length - 1].y;
    return parseFloat(((lastValue - firstValue) / firstValue * 100).toFixed(2));
};

export const getProjectedGrowthPercentage = (): number => {
    const currentValue = portfolioGrowthData.actual[portfolioGrowthData.actual.length - 1].y;
    const projectedValue = portfolioGrowthData.projected[portfolioGrowthData.projected.length - 1].y;
    return parseFloat(((projectedValue - currentValue) / currentValue * 100).toFixed(2));
};
