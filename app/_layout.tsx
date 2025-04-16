// //

// "use client";

// import { Stack } from "expo-router";
// import { ThemeProvider } from "../context/ThemeContext";
// import { useTheme } from "../context/ThemeContext";
// import { StatusBar } from "expo-status-bar";
// import { useFonts } from "expo-font";
// import { SplashScreen } from "expo-router";
// import { useEffect } from "react";

// export default function RootLayout() {
//   const [loaded] = useFonts({
//     // You can add custom fonts here if needed
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider>
//       <RootLayoutNav />
//     </ThemeProvider>
//   );
// }

// function RootLayoutNav() {
//   const { theme, isDark } = useTheme();

//   return (
//     <>
//       <StatusBar style={isDark ? "light" : "dark"} />
//       <Stack>
//         <Stack.Screen
//           name="index"
//           options={{
//             headerShown: false,
//           }}
//         />
//       </Stack>
//     </>
//   );
// }

"use client";

import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import { useTheme } from "../context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "App-Name": require("../assets/fonts/wonderella.otf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  // const [loaded] = useFonts({
  //   // You can add custom fonts here if needed
  // });

  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { theme, isDark } = useTheme();

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
