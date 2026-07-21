import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useColorScheme } from "@/hooks/use-color-scheme";
import "@/i18n";

export const unstable_settings = {
  anchor: "(tabs)",
};
const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="modal"
              options={{ presentation: "modal", title: "Modal" }}
            />
            <Stack.Screen
              name="inventory/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="inventory/[id]"
              options={{ headerShown: false }}
            />

            <Stack.Screen name="brands" options={{ headerShown: false }} />
            <Stack.Screen
              name="nomenclature"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="product/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="practice" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
