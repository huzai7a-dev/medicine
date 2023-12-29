import { create } from "zustand";

interface AppLoader {
  isLoading: boolean;
  setLoading: (state: boolean) => void;
}

const useLoader = create<AppLoader>()((set) => ({
  isLoading: false,
  setLoading: (state: boolean) => set(() => ({ isLoading: state })),
}));

export { useLoader };
