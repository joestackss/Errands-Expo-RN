import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export const useRealtime = (table: string, userId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase.channel("db-changes");

    // Handle order updates
    const orderSubscription = channel.on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "orders",
        filter: `requester_id=eq.${userId}`,
      },
      (payload) => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        queryClient.invalidateQueries({
          queryKey: ["order", payload.new.id],
        });
      }
    );

    // Handle new messages
    const messageSubscription = channel.on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
        filter: `receiver_id=eq.${userId}`,
      },
      (payload) => {
        // Handle new message notification
        queryClient.invalidateQueries({
          queryKey: ["messages", payload.new.order_id],
        });
      }
    );

    channel.subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [userId]);
};
