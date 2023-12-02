import { create } from 'zustand';
import { Medicine } from '../entities/medicine';


interface MedicineState {
    medicines: Medicine[] | [],
    searchFor: string,
    loadMedicines: (medicines: Medicine[], searchFor: string) => void
}

interface Group {
    brandName:string,
    brands: Medicine[]
}
interface MedicineGroup {
    groups: Group[] | [],
    loadGroups: (groups:Group[])=> void
}

interface AppLoader {
    isLoading:boolean,
    setLoading: (state:boolean)=> void
}

const useMedicineStore = create<MedicineState>()((set) => ({
    medicines: [],
    searchFor: "",
    loadMedicines: (medicines: Medicine[], searchFor: string) => set(() => ({ medicines, searchFor }))
}));

const useMedicineGroups = create<MedicineGroup>()((set)=> ({
    groups:[],
    loadGroups:(groups:Group[])=> set(()=> ({groups})),
}))

const useLoader = create<AppLoader>()((set)=> ({
        isLoading:false,
        setLoading:(state:boolean)=> set(()=> ({isLoading:state}))
}))

export { useMedicineStore,useMedicineGroups,useLoader }