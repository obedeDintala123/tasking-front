"use client";

import { Task, User } from "@/types/types";
import { api } from "./api";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get("/me");
      return response.data;
    },
  });
};

export const useAnalysisDashbaord = () => {
  return useQuery({
    queryKey: ["analysis-dashboard"],
    queryFn: async () => {
      const response = await api.get("/analysis/dashboard");
      return response.data;
    },
  });
};

export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await api.get("/task");
      return response.data;
    },
  });
};

export const useTaskById = (id: string) => {
  return useQuery({
    queryKey: ["task", id],
    queryFn: async () => {
      const response = await api.get(`/task/${id}`);
      return response.data;
    },
  });
};
