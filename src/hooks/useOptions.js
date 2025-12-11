import { useQuery } from "@tanstack/react-query";
import {
  getOptionsByCategoryId,
  getOptionsByCategorySlug,
} from "services/option";

// Getting options based on categoryId
export const useOptionsByCategoryId = (categoryId) => {
  return useQuery({
    queryKey: ["options", "category", categoryId],
    queryFn: () => getOptionsByCategoryId(categoryId),
    enabled: !!categoryId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useOptionsByCategorySlug = (slug) => {
  return useQuery({
    queryKey: ["options", "slug", slug],
    queryFn: () => getOptionsByCategorySlug(slug),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
};
