import MedicinesTable from "../components/MedicinesTable";
import { useMedicineGroups } from "../store";

const SearchPrescription = () => {
  const { groups } = useMedicineGroups((state) => ({
    groups: state.groups,
    loadGroups: state.loadGroups,
  }));

  return (
    <>
      {groups.map(({ brands:medicines,brandName:searchFor }) => (
        <MedicinesTable medicines={medicines} searchFor={searchFor} />
      ))}
    </>
  );
};
export default SearchPrescription;
