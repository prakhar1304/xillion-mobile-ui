// "use client";

// import type React from "react";
// import { createContext, useContext, useState, useEffect } from "react";
// import { useColorScheme } from "react-native";

// type Theme = "light" | "dark";

// interface ThemeContextType {
//   theme: Theme;
//   setTheme: (theme: Theme) => void;
//   toggleTheme: () => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export function ThemeProvider({ children }: { children: React.ReactNode }) {
//   const deviceTheme = useColorScheme() as Theme;
//   const [theme, setTheme] = useState<Theme>(deviceTheme || "light");

//   useEffect(() => {
//     if (deviceTheme) {
//       setTheme(deviceTheme);
//     }
//   }, [deviceTheme]);

//   const toggleTheme = () => {
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export function useTheme() {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error("useTheme must be used within a ThemeProvider");
//   }
//   return context;
// }
