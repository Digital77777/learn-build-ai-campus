import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { iconMap } from "@/lib/iconMap";
import { EarningOpportunity } from "@/types/earnings";

export function useEarningOpportunities() {
  const [data, setData] = useState<EarningOpportunity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data, error } = await supabase
        .from("earning_opportunities")
        .select("*");
      if (error) {
        setError(error.message);
        setData(null);
      } else {
        setData(
          (data || []).map((item: Tables<"earning_opportunities">) => ({
            ...item,
            icon: iconMap[item.icon] || iconMap["Coins"],
          }))
        );
        setError(null);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  return { data, loading, error };
}
