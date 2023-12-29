import { create } from "zustand";
import { Medicine } from "../interfaces/medicine";

interface MedicineState {
  medicines: Medicine[] | [];
  searchFor: string;
  loadMedicines: (medicines: Medicine[], searchFor: string) => void;
}

interface Group {
  brandName: string;
  brands: Medicine[];
}
interface MedicineGroup {
  groups: Group[] | [];
  loadGroups: (groups: Group[]) => void;
}

const useMedicineStore = create<MedicineState>()((set) => ({
  medicines: [],
  searchFor: "",
  loadMedicines: (medicines: Medicine[], searchFor: string) =>
    set(() => ({ medicines, searchFor })),
}));

const useMedicineGroups = create<MedicineGroup>()((set) => ({
  groups: [],
  loadGroups: (groups: Group[]) => set(() => ({ groups })),
}));

export { useMedicineStore, useMedicineGroups };
