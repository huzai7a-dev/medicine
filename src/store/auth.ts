import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserData } from "../interfaces/common";

interface AuthStore {
  authToken: string | null;
  storeToken: (token: string) => void;
  authUser: UserData | null;
  storeUser: (user: UserData) => void;
}
const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      authToken: null,
      storeToken: (token: string) => set({ authToken: token }),
      authUser: null,
      storeUser: (user) => set({ authUser: user }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export { useAuthStore };
