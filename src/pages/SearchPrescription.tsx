import { useEffect } from "react";
import Loader from "../components/Loader";
import MedicinesTable from "../components/MedicinesTable";
import { useLoader } from "../store/app";
import { useMedicineGroups } from "../store/medicine";

const SearchPrescription = () => {
  const { groups, loadGroups } = useMedicineGroups((state) => ({
    groups: state.groups,
    loadGroups: state.loadGroups,
  }));

  useEffect(() => {
    return () => {
      loadGroups([]);
    };
  }, [loadGroups]);
  const isLoading = useLoader((store) => store.isLoading);
  if (isLoading)
    return (
      <>
        <Loader />
        <Loader />
        <Loader />
      </>
    );
  return (
    <>
      {groups.map(({ brands: medicines, brandName: searchFor }) => (
        <MedicinesTable medicines={medicines} searchFor={searchFor} />
      ))}
    </>
  );
};
export default SearchPrescription;
