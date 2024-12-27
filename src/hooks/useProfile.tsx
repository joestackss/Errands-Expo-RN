import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

type Profile = {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  role: "requester" | "runner" | "both";
};

export const useProfile = () => {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        console.log("data from profiles", data);
        setProfile(data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
      return { data, error: null };
    } catch (e) {
      return { data: null, error: e as Error };
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
  };
};
