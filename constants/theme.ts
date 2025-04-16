export const lightTheme = {
    // Primary colors
    primary: "#7B2CBF",
    // primaryGradient: ["#9D4EDD", "#7B2CBF"],
    primaryGradient: ["#D946EF", "#9D4EDD", "#3B1C88"],
    secondary: "#240046",

    // UI elements
    background: "#F8F9FA",
    card: "#FFFFFF",
    cardDark: "#F0F0F0",
    text: "#1A1A2E",
    textSecondary: "#4A4A68",
    border: "#E0E0E0",

    // Action colors
    positive: "#22C55E",
    negative: "#EF4444",
    warning: "#F59E0B",
    execute: "#E0E0E0",
    executeIcon: "#7B2CBF",

    // Status
    success: "#10B981",
    error: "#EF4444",
    info: "#3B82F6",
}

export const darkTheme = {
    // Primary colors
    primary: "#9D4EDD",
    // primaryGradient: ["#C77DFF", "#9D4EDD"], //"#6920e8"
    // primaryGradient: ["#D946EF", "#9D4EDD", "#3B1C88"],
    primaryGradient: ["#c825f9", "#7323eb", "#3d1edc"],

    darkerPrimaryGradient: ["#3e2f60", "#39127b", "#1f0e84"],
    lighterPrimaryGradient: ["#e07aff", "#a17aff", "#6b63ff"],
    secondary: "#10002B",

    // UI elements
    // background: "#121212",
    background: "#201831",

    card: "#1E1E1E",
    cardDark: "#2A2A2A",
    text: "#FFFFFF",
    textSecondary: "#AAAAAA",
    border: "#333333",

    // Action colors
    positive: "#4ADE80",
    negative: "#F87171",
    warning: "#FBBF24",
    execute: "#333333",
    executeIcon: "#9D4EDD",

    // Status
    success: "#34D399",
    error: "#F87171",
    info: "#60A5FA",
}

export type ThemeType = typeof darkTheme
