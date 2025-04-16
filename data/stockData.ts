export interface StockRecommendation {
    id: string
    name: string
    buyRange: {
        min: number
        max: number
    }
    stopLoss: number
    target: number
    potentialGain: number
}

export const dummyRecommendations: StockRecommendation[] = [
    {
        id: "1",
        name: "ASHOKA",
        buyRange: {
            min: 248,
            max: 251,
        },
        stopLoss: 223,
        target: 273,
        potentialGain: 10,
    },
    {
        id: "2",
        name: "IOLCP",
        buyRange: {
            min: 460,
            max: 470,
        },
        stopLoss: 350,
        target: 520,
        potentialGain: 19,
    },
    {
        id: "3",
        name: "GENESYS",
        buyRange: {
            min: 775,
            max: 786,
        },
        stopLoss: 698,
        target: 852,
        potentialGain: 8.3,
    },
    {
        id: "4",
        name: "INFOTECH",
        buyRange: {
            min: 1250,
            max: 1275,
        },
        stopLoss: 1180,
        target: 1350,
        potentialGain: 7.5,
    },
    {
        id: "5",
        name: "SUNPHARMA",
        buyRange: {
            min: 980,
            max: 995,
        },
        stopLoss: 940,
        target: 1050,
        potentialGain: 6.8,
    },
]

export const portfolioData = {
    currentValue: 1278653,
    unusedFunds: 118261,
}
