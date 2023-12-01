import MedicinesTable from "../components/MedicinesTable";
import { useMedicineStore } from "../store";

const SearchBy = ()=> {
    const {searchFor,medicines} = useMedicineStore((store) =>  store);
    return (
        <MedicinesTable
            medicines={medicines}
            searchFor={searchFor}
        />
    )
};

export default SearchBy;