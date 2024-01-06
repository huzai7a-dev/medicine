import MedicinesTable from "../components/MedicinesTable";
import { useMedicineStore } from "../store/medicine";
import Loader from "../components/Loader";
import { useQuery } from "@tanstack/react-query";
import { getAllMedicines } from "../services";
import { useEffect, useState } from "react";
import { useLoader } from "../store/app";

const SearchBy = () => {
  const isLoading = useLoader((store) => store.isLoading);
  const [page, setPage] = useState(1);
  const {
    searchFor,
    medicines,
    milligramsList: searchMilligramsList,
    loadMedicines,
  } = useMedicineStore((store) => store);
  const { data: allMedicines, isLoading: isAllMedicineLoading } = useQuery({
    queryFn: () => getAllMedicines(page),
    queryKey: ["medicine", page],
    refetchOnMount: true,
  });

  useEffect(() => {
    return () => {
      loadMedicines([], "", []);
    };
  }, [loadMedicines]);

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrev = () => {
    setPage(page - 1);
  };

  if (isLoading || isAllMedicineLoading) return <Loader />;

  const renderMilligramsList =
    searchFor.length > 0
      ? searchMilligramsList || []
      : allMedicines?.milligramsList || [];

  const renderMedicines =
    searchFor.length > 0 ? medicines : allMedicines?.data || [];

  return (
    <MedicinesTable
      milligramsList={renderMilligramsList}
      medicines={renderMedicines}
      searchFor={searchFor}
      pagination={!searchFor ? allMedicines?.pagination : undefined}
      onNext={handleNextPage}
      onPrev={handlePrev}
    />
  );
};

export default SearchBy;
