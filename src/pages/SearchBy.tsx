import MedicinesTable from "../components/MedicinesTable";
import { useLoader, useMedicineStore } from "../store";
import Loader from "../components/Loader";

const SearchBy = () => {
  const isLoading = useLoader((store) => store.isLoading);
  const { searchFor, medicines } = useMedicineStore((store) => store);

  if (isLoading) return <Loader />;

  return <MedicinesTable medicines={medicines} searchFor={searchFor} />;
};

export default SearchBy;
