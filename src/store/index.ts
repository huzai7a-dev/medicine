import { create } from 'zustand';
import { Medicine } from '../entities/medincine';

interface MedicineState {
    medicines: Medicine[] | [],
    searchFor: string,
    loadMedicines: (medicines: Medicine[], searchFor: string) => void
}

const useMedinceStore = create<MedicineState>()((set) => ({
    medicines: [],
    searchFor: "",
    loadMedicines: (medicines: Medicine[], searchFor: string) => set(() => ({ medicines, searchFor }))
}));

export { useMedinceStore }