import { create } from "zustand";
import { Medicine } from "../interfaces/medicine";

interface MedicineState {
  medicines: Medicine[] | [];
  searchFor: string;
  milligramsList: string[];
  loadMedicines: (
    medicines: Medicine[],
    searchFor: string,
    milligramsList: string[]
  ) => void;
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
  milligramsList: [],
  loadMedicines: (
    medicines: Medicine[],
    searchFor: string,
    milligramsList: string[]
  ) => set(() => ({ medicines, searchFor, milligramsList })),
}));

const useMedicineGroups = create<MedicineGroup>()((set) => ({
  groups: [],
  loadGroups: (groups: Group[]) => set(() => ({ groups })),
}));

export { useMedicineStore, useMedicineGroups };
