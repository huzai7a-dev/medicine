import { create } from "zustand";
import { Medicine, MedicineSuggest } from "../interfaces/medicine";

interface MedicineState {
  medicines: Medicine[] | [];
  searchFor: string;
  milligramsList: string[];
  suggest?: MedicineSuggest;

  loadMedicines: (
    medicines: Medicine[],
    searchFor: string,
    milligramsList: string[],
    suggest: MedicineState["suggest"] | undefined
  ) => void;
}

export interface Group {
  brandName: string;
  brands: Medicine[];
  suggestedResult?: {
    brand: string;
    dosageForm: string;
  };
}
interface MedicineGroup {
  groups: Group[] | [];
  loadGroups: (groups: Group[]) => void;
}

const useMedicineStore = create<MedicineState>()((set) => ({
  medicines: [],
  searchFor: "",
  milligramsList: [],
  suggest: undefined,
  loadMedicines: (
    medicines: Medicine[],
    searchFor: string,
    milligramsList: string[],
    suggest: MedicineState["suggest"]
  ) => set(() => ({ medicines, searchFor, milligramsList, suggest })),
}));

const useMedicineGroups = create<MedicineGroup>()((set) => ({
  groups: [],
  loadGroups: (groups: Group[]) => set(() => ({ groups })),
}));

export { useMedicineStore, useMedicineGroups };
