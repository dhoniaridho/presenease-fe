import { Users } from "@prisma/client";
import { create } from "zustand";
import { getUser } from "../_services/actions";

type Store = {
  user: Users | undefined;
  setUser: (user: Users) => void;
};

export const useAuth = async () => {
  const user = await getUser();
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
