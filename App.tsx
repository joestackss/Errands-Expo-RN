import React from "react";
import "./global.css";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootNavigation } from "./src/navigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AuthProvider>
          <RootNavigation />
        </AuthProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
