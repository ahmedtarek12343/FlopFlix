"use client";
import { useQuery } from "@tanstack/react-query";
import { collectionOptions } from "../lib/queryOptions/collection.options";

export const useGetCollection = (id: number) => {
  return useQuery(collectionOptions(id));
};
