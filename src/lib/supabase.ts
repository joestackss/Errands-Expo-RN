import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// console.log(SUPABASE_URL, SUPABASE_ANON_KEY);

// const SUPABASE_URL = process.env.EXPO_PUBLIC_API_SUPABASEURL;
// const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_API_SUPABASEANONKEY;

const SUPABASE_URL = "https://ftcmqkitueqxhfscouhs.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0Y21xa2l0dWVxeGhmc2NvdWhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUyOTg4MTAsImV4cCI6MjA1MDg3NDgxMH0.lVt82ANDOFY04TbOKNRw4TR4_zBNEpSDlRdz6q-NuxA";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("Missing env variable SUPABASE_URL");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
