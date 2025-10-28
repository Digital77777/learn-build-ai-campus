import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ActiveMember {
  user_id: string;
  full_name: string | null;
  email: string | null;
  contributions: number;
  is_top_contributor: boolean;
  joined_at: string;
}

export const useActiveMembers = (searchQuery?: string) => {
  return useQuery({
    queryKey: ["active-members", searchQuery],
    queryFn: async () => {
      // Fetch all profiles
      let query = supabase
        .from("profiles")
        .select("user_id, full_name, email, created_at")
        .not("user_id", "is", null);

      if (searchQuery && searchQuery.trim()) {
        query = query.or(
          `full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`
        );
      }

      const { data: profiles, error } = await query;

      if (error) throw error;

      // For each profile, get their contributions using RPC
      const membersWithContributions = await Promise.all(
        profiles.map(async (profile) => {
          const { data: contributions, error: rpcError } = await supabase.rpc(
            "get_user_contributions",
            { p_user_id: profile.user_id }
          );

          if (rpcError) {
            console.error("Error fetching contributions:", rpcError);
            return {
              user_id: profile.user_id,
              full_name: profile.full_name,
              email: profile.email,
              contributions: 0,
              is_top_contributor: false,
              joined_at: profile.created_at,
            };
          }

          return {
            user_id: profile.user_id,
            full_name: profile.full_name,
            email: profile.email,
            contributions: contributions || 0,
            is_top_contributor: (contributions || 0) >= 10,
            joined_at: profile.created_at,
          };
        })
      );

      // Sort by contributions
      return membersWithContributions.sort(
        (a, b) => b.contributions - a.contributions
      );
    },
  });
};
