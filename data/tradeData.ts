export interface Trade {
    id: string
    symbol: string
    companyName: string
    targetHitDate: string
    returnPercentage: number
    tradeType: "Short Term" | "Medium Term" | "Long Term"
    tradeSource: string
    timestamp: string
    isTargetHit: boolean
}

export interface TradeStats {
    avgDuration: number
    avgReturn: number
    hitRate: number
    totalTrades: number
}

export const tradeStats: TradeStats = {
    avgDuration: 59,
    avgReturn: 7.74,
    hitRate: 83,
    totalTrades: 244,
}

export const tradeHistory: Trade[] = [
    {
        id: "1",
        symbol: "CDSL",
        companyName: "Central Depository Services (India) Ltd.",
        targetHitDate: "15 Oct 2024 09:16 am",
        returnPercentage: 10.8,
        tradeType: "Medium Term",
        tradeSource: "Liquide (SEBI RA)",
        timestamp: "9 Oct 2024 11:39 am",
        isTargetHit: true,
    },
    {
        id: "2",
        symbol: "CGPOWER",
        companyName: "CG Power and Industrial Solutions Ltd.",
        targetHitDate: "10 Oct 2024 09:40 am",
        returnPercentage: 6.3,
        tradeType: "Short Term",
        tradeSource: "Liquide (SEBI RA)",
        timestamp: "8 Oct 2024 13:51 pm",
        isTargetHit: true,
    },
    {
        id: "3",
        symbol: "HDFCBANK",
        companyName: "HDFC Bank Ltd.",
        targetHitDate: "12 Oct 2024 14:30 pm",
        returnPercentage: 5.2,
        tradeType: "Medium Term",
        tradeSource: "Liquide (SEBI RA)",
        timestamp: "5 Oct 2024 10:15 am",
        isTargetHit: true,
    },
    {
        id: "4",
        symbol: "INFY",
        companyName: "Infosys Ltd.",
        targetHitDate: "",
        returnPercentage: 3.7,
        tradeType: "Long Term",
        tradeSource: "Liquide (SEBI RA)",
        timestamp: "2 Oct 2024 09:30 am",
        isTargetHit: false,
    },
    {
        id: "5",
        symbol: "RELIANCE",
        companyName: "Reliance Industries Ltd.",
        targetHitDate: "",
        returnPercentage: 4.9,
        tradeType: "Medium Term",
        tradeSource: "Liquide (SEBI RA)",
        timestamp: "1 Oct 2024 14:45 pm",
        isTargetHit: false,
    },
    {
        id: "6",
        symbol: "TCS",
        companyName: "Tata Consultancy Services Ltd.",
        targetHitDate: "8 Oct 2024 11:20 am",
        returnPercentage: 7.1,
        tradeType: "Short Term",
        tradeSource: "Liquide (SEBI RA)",
        timestamp: "30 Sep 2024 10:05 am",
        isTargetHit: true,
    },
]
